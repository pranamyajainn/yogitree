import os
import re

# Define replacement map mapping matched text to its replacement.
# Case-insensitive match, but we use functions to hold capitalization.
# "Koko Maya" -> "Yogi Tree"
# "KOKO MAYA" -> "YOGI TREE"
# "koko maya" -> "yogi tree"
# "Koko-Maya" -> "Yogi Tree"
# "Koko Maya's" -> "Yogi Tree's"

def get_replacement(match):
    text = match.group(0)
    has_possessive_1 = "'s" in text
    has_possessive_2 = "’s" in text
    has_possessive_3 = "'S" in text
    has_possessive_4 = "’S" in text
    
    # Check case
    is_upper = text.isupper()
    is_lower = text.islower()
    
    base = "Yogi Tree"
    if is_upper:
        base = "YOGI TREE"
    elif is_lower:
        base = "yogi tree"
        
    if has_possessive_1:
        base += "'s"
    elif has_possessive_2:
        base += "’s"
    elif has_possessive_3:
        base += "'S"
    elif has_possessive_4:
        base += "’S"
        
    return base

# (?:['’][sS])? handles the possessive.
pattern = re.compile(r'\bKoko[-_\s]?Maya\b(?:[\'’][sS])?', flags=re.IGNORECASE)

# Exclude directories
exclude_dirs = {'.git', 'node_modules', 'dist', 'build', '.next', 'vendor', '.gemini'}
# Exclude files
exclude_files = {'package.json', 'package-lock.json', 'docker-compose.yml'}
# We don't want to replace inside URLs like kokomaya.com or identifiers like koko_maya,
# however the word boundary \b helps. We also need to be careful with things like koko-maya
# if it is part of a URL or slug.
# The user said: Do not change Slugs or programmatic tokens (e.g., "koko-maya" in routes) unless they are purely human-facing.
# Koko-Maya as a brand name in text should be replaced. "koko-maya" in a slug should not be.
# Thus: if the match is strictly lower-case with a hyphen or underscore (koko-maya, koko_maya), skip it to be safe,
# UNLESS we manually verify later. Let's just skip all lower-case + hyphen/underscore for now.

# We will apply regex, and if the match is exactly "koko-maya" or "koko_maya", we skip it.
def safe_replace(match):
    text = match.group(0)
    if text == "koko-maya" or text == "koko_maya" or text == "koko-maya-resort":
         return text # Skip identifiers/slugs
    if "kokomaya" in text.lower() and " " not in text.lower():
         return text # Skip kokomaya.com or @kokomaya
    return get_replacement(match)

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return 0 # Skip binary or non-utf8
        
    new_content, count = pattern.subn(safe_replace, content)
    
    if count > 0 and new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return count
    return 0

total_replacements = 0
files_changed = 0

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if file in exclude_files:
            continue
        # Also skip images and lock files
        if file.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif', '.ico', '.lock')):
            continue
            
        filepath = os.path.join(root, file)
        count = process_file(filepath)
        if count > 0:
            print(f"Updated {filepath}: {count} replacements")
            total_replacements += count
            files_changed += 1

print(f"\\nSummary: {total_replacements} replacements across {files_changed} files.")
