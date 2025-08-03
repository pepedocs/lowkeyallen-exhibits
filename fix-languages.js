#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const exhibitsDir = './exhibits';

// Function to extract first language from compound language entries
function getFirstLanguage(languageText) {
    const text = languageText.trim();
    
    // Handle special cases
    if (text.includes('/')) {
        return text.split('/')[0].trim();
    }
    if (text.includes(' with ')) {
        return text.split(' with ')[0].trim();
    }
    if (text.includes(' (')) {
        return text.split(' (')[0].trim();
    }
    
    return text;
}

// Function to fix language in a single exhibit file  
function fixLanguage(filePath) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Find and fix language section (using single # format)
    const languageMatch = content.match(/# language\s*\n(.+?)(?=\n\n|\n#|$)/s);
    if (languageMatch) {
        const currentLanguageContent = languageMatch[1].trim();
        const firstLanguage = getFirstLanguage(currentLanguageContent);
        
        if (firstLanguage !== currentLanguageContent) {
            const newLanguageSection = `# language\n${firstLanguage}`;
            content = content.replace(languageMatch[0], newLanguageSection);
            changed = true;
            console.log(`  - Fixed language: "${currentLanguageContent}" → "${firstLanguage}"`);
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
    console.log('🔧 Starting language fixes...\n');
    
    const files = fs.readdirSync(exhibitsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(exhibitsDir, file));
    
    let totalChanged = 0;
    
    files.forEach(file => {
        if (fixLanguage(file)) {
            totalChanged++;
        }
        console.log('');
    });
    
    console.log(`\n✅ Complete! Fixed ${totalChanged} files out of ${files.length} total.`);
}

main();
