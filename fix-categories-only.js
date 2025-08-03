#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const exhibitsDir = './exhibits';

// Function to fix categories to only use the user's suggested categories
function fixCategories(filePath) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Map incorrect categories to correct ones
    // User's valid categories: Mission-Critical, Cyber Security, Educational, Software & Computing, Integration
    const categoryFixes = [
        { from: /# category\s*\nComputing History/g, to: '# category\nSoftware & Computing' },
        { from: /# category\s*\nHistorical/g, to: '# category\nSoftware & Computing' },
        { from: /# category\s*\nNumeric/g, to: '# category\nSoftware & Computing' },
        { from: /# category\s*\nSecurity$/gm, to: '# category\nCyber Security' },
    ];
    
    categoryFixes.forEach(fix => {
        if (fix.from.test(content)) {
            const beforeMatch = content.match(fix.from);
            if (beforeMatch) {
                content = content.replace(fix.from, fix.to);
                changed = true;
                console.log(`  - Fixed category: "${beforeMatch[0].split('\n')[1]}" → "${fix.to.split('\n')[1]}"`);
            }
        }
    });
    
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
    console.log('🔧 Fixing categories to only use suggested categories...\n');
    console.log('Valid categories: Mission-Critical, Cyber Security, Educational, Software & Computing, Integration\n');
    
    const files = fs.readdirSync(exhibitsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(exhibitsDir, file));
    
    let totalChanged = 0;
    
    files.forEach(file => {
        if (fixCategories(file)) {
            totalChanged++;
        }
        console.log('');
    });
    
    console.log(`\n✅ Complete! Fixed ${totalChanged} files out of ${files.length} total.`);
    
    // Show final category distribution
    console.log('\n📊 Final category distribution:');
    const categories = {};
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const match = content.match(/# category\s*\n(.+?)(?=\n\n|\n#|$)/s);
        if (match) {
            const category = match[1].trim();
            categories[category] = (categories[category] || 0) + 1;
        }
    });
    
    Object.entries(categories)
        .sort(([,a], [,b]) => b - a)
        .forEach(([category, count]) => {
            console.log(`  ${category}: ${count} exhibits`);
        });
}

main();
