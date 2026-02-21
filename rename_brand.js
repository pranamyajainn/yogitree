const fs = require('fs');
const path = require('path');

const excludeDirs = ['.git', 'node_modules', 'dist', 'build', '.next', 'vendor', '.gemini'];
const excludeFiles = ['package.json', 'package-lock.json', 'docker-compose.yml', 'rename_brand.js', 'rename_brand.py'];
const excludeExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif', '.ico', '.lock'];

function getReplacement(match) {
    const hasPossessive = /['’][sS]/.test(match);
    const isUpper = match.toUpperCase() === match;
    const isLower = match.toLowerCase() === match && match !== match.toUpperCase();

    let base = 'Yogi Tree';
    if (isUpper) {
        base = 'YOGI TREE';
    } else if (isLower) {
        base = 'yogi tree';
    }

    if (hasPossessive) {
        if (match.includes("'s")) base += "'s";
        else if (match.includes("’s")) base += "’s";
        else if (match.includes("'S")) base += "'S";
        else if (match.includes("’S")) base += "’S";
    }
    return base;
}

const pattern = /\bKoko[-_\s]?Maya\b(?:['’][sS])?/gi;

function safeReplace(match) {
    const lower = match.toLowerCase();
    if (lower === 'koko-maya' || lower === 'koko_maya' || lower === 'koko-maya-resort') return match;
    if (lower.includes('kokomaya') && !lower.includes(' ')) return match;
    return getReplacement(match);
}

let totalReplacements = 0;
let filesChanged = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) walk(filepath);
        } else {
            if (excludeFiles.includes(file)) continue;
            if (excludeExts.some(ext => file.endsWith(ext))) continue;

            try {
                let content = fs.readFileSync(filepath, 'utf8');
                let count = 0;

                // Track if content actually changes
                const newContent = content.replace(pattern, (match) => {
                    const replaced = safeReplace(match);
                    if (replaced !== match) count++;
                    return replaced;
                });

                if (count > 0 && newContent !== content) {
                    fs.writeFileSync(filepath, newContent, 'utf8');
                    console.log(`Updated ${filepath}: ${count} replacements`);
                    totalReplacements += count;
                    filesChanged++;
                }
            } catch (e) {
                // skip binary or unreadable files
            }
        }
    }
}

walk('.');
console.log(`\nSummary: ${totalReplacements} replacements across ${filesChanged} files.`);
