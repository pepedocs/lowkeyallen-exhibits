#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const exhibitsDir = './exhibits';

// Function to fix title dates in a single exhibit file
function fixTitleDates(filePath) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Fix title field - remove dates in parentheses
    const titleMatch = content.match(/# title\s*\n(.+?)(?=\n\n|\n#|$)/s);
    if (titleMatch) {
        const currentTitle = titleMatch[1].trim();
        // Remove (YYYY) from title
        const dateMatch = currentTitle.match(/^(.+?)\s*\((\d{4})\)$/);
        if (dateMatch) {
            const newTitle = dateMatch[1].trim();
            const newTitleSection = `# title\n${newTitle}`;
            content = content.replace(titleMatch[0], newTitleSection);
            changed = true;
            console.log(`  - Fixed title: "${currentTitle}" → "${newTitle}"`);
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
    console.log('🔧 Starting title date fixes...\n');
    
    const files = fs.readdirSync(exhibitsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(exhibitsDir, file));
    
    let totalChanged = 0;
    
    files.forEach(file => {
        if (fixTitleDates(file)) {
            totalChanged++;
        }
        console.log('');
    });
    
    console.log(`\n✅ Complete! Fixed ${totalChanged} files out of ${files.length} total.`);
}

main();
