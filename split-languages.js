#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const exhibitsDir = './exhibits';

// Function to split programming languages in exhibit files
function splitLanguages(filePath) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Find all language sections
    const languageMatches = content.matchAll(/# language\s*\n(.+?)(?=\n\n|\n#|$)/gs);
    
    for (const match of languageMatches) {
        const languageContent = match[1].trim();
        
        // Check if there are multiple languages (separated by common delimiters)
        const delimiters = [
            ' and ',    // "C and Assembly"
            '/',        // "C/Assembly"
            ' & ',      // "C & Scripts"  
            ', ',       // "C, Assembly"
            ' + ',      // "C + Assembly"
            ' with ',   // "C with Scripts"
            ' plus '    // "C plus Assembly"
        ];
        
        let foundDelimiter = false;
        let languages = [languageContent];
        
        for (const delimiter of delimiters) {
            if (languageContent.includes(delimiter)) {
                languages = languageContent.split(delimiter).map(lang => lang.trim());
                foundDelimiter = true;
                break;
            }
        }
        
        // If we found multiple languages, create separate tags
        if (foundDelimiter && languages.length > 1) {
            // Filter out empty strings and normalize language names
            languages = languages.filter(lang => lang.length > 0).map(lang => {
                // Clean up language names - remove leading conjunctions
                return lang.replace(/^(and|&|plus|with)\s+/i, '').trim();
            });
            
            if (languages.length > 1) {
                // Create multiple language tags
                const newLanguageSection = languages.map(lang => `# language\n${lang}`).join('\n\n');
                content = content.replace(match[0], newLanguageSection);
                changed = true;
                console.log(`  - Split languages: "${languageContent}" → ${languages.length} separate tags: [${languages.join(', ')}]`);
            }
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Updated: ${filePath}`);
    } else {
        console.log(`  ⏭️  No changes needed: ${filePath}`);
    }
    
    return changed;
}

// Process all markdown files
function main() {
    console.log('🔧 Splitting multiple programming languages into separate tags...\n');
    console.log('Supported delimiters: " and ", "/", " & ", ", ", " + ", " with ", " plus "\n');
    
    const files = fs.readdirSync(exhibitsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(exhibitsDir, file));
    
    let totalChanged = 0;
    
    files.forEach(file => {
        if (splitLanguages(file)) {
            totalChanged++;
        }
        console.log('');
    });
    
    console.log(`\n✅ Complete! Fixed ${totalChanged} files out of ${files.length} total.`);
    
    // Show language distribution after splitting
    console.log('\n📊 Language distribution after splitting:');
    const languages = {};
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.matchAll(/# language\s*\n(.+?)(?=\n\n|\n#|$)/gs);
        for (const match of matches) {
            const language = match[1].trim();
            languages[language] = (languages[language] || 0) + 1;
        }
    });
    
    Object.entries(languages)
        .sort(([,a], [,b]) => b - a)
        .forEach(([language, count]) => {
            console.log(`  ${language}: ${count} exhibits`);
        });
}

main();
