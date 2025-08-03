#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const exhibitsDir = './exhibits';

// Function to fix a single exhibit file
function fixExhibit(filePath) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Fix categories (using single # format) - ONLY use user-approved categories
    // User's ACTUAL approved categories: Mission-Critical, Cyber Security, Educational, Software & Computing
    const categoryFixes = [
        { from: /# category\s*\nHistorical/g, to: '# category\nSoftware & Computing' },
        { from: /# category\s*\nNumeric/g, to: '# category\nSoftware & Computing' },
        { from: /# category\s*\nSecurity$/gm, to: '# category\nCyber Security' },
        { from: /# category\s*\nComputing History/g, to: '# category\nSoftware & Computing' },
        { from: /# category\s*\nIntegration/g, to: '# category\nSoftware & Computing' },
    ];
    
    categoryFixes.forEach(fix => {
        if (fix.from.test(content)) {
            content = content.replace(fix.from, fix.to);
            changed = true;
            console.log(`  - Fixed category: ${fix.from} → ${fix.to}`);
        }
    });
    
    // Fix titles - remove dates in parentheses
    const titleMatch = content.match(/^# (.+)\s*\((\d{4})\)$/m);
    if (titleMatch) {
        const oldTitle = titleMatch[0];
        const newTitle = `# ${titleMatch[1]}`;
        content = content.replace(oldTitle, newTitle);
        changed = true;
        console.log(`  - Fixed title: "${oldTitle}" → "${newTitle}"`);
    }
    
    // Fix when field - ensure it only contains the year (using single # format)
    const whenMatch = content.match(/# when\s*\n(.+?)(?=\n\n|\n#|$)/s);
    if (whenMatch) {
        const whenContent = whenMatch[1].trim();
        // Extract just the year (4 digits)
        const yearMatch = whenContent.match(/(\d{4})/);
        if (yearMatch && whenContent !== yearMatch[1]) {
            const newWhenSection = `# when\n${yearMatch[1]}`;
            content = content.replace(whenMatch[0], newWhenSection);
            changed = true;
            console.log(`  - Fixed when field: "${whenContent}" → "${yearMatch[1]}"`);
        }
    }
    
    // Fix language field - split multiple languages into separate tags
    const languageMatch = content.match(/# language\s*\n(.+?)(?=\n\n|\n#|$)/s);
    if (languageMatch) {
        const languageContent = languageMatch[1].trim();
        
        // Check if there are multiple languages (separated by common delimiters)
        const delimiters = [' and ', '/', ' & ', ', ', ' + '];
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
                // Clean up language names
                return lang.replace(/^(and|&)\s+/i, '').trim();
            });
            
            if (languages.length > 1) {
                // Create multiple language tags
                const newLanguageSection = languages.map(lang => `# language\n${lang}`).join('\n\n');
                content = content.replace(languageMatch[0], newLanguageSection);
                changed = true;
                console.log(`  - Split languages: "${languageContent}" → ${languages.length} separate tags: ${languages.join(', ')}`);
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
    console.log('🔧 Starting exhibit fixes...\n');
    
    const files = fs.readdirSync(exhibitsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(exhibitsDir, file));
    
    let totalChanged = 0;
    
    files.forEach(file => {
        if (fixExhibit(file)) {
            totalChanged++;
        }
        console.log('');
    });
    
    console.log(`\n✅ Complete! Fixed ${totalChanged} files out of ${files.length} total.`);
}

main();
