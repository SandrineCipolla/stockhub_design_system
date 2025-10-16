import re
import sys

files_to_fix = [
    r"C:\Users\sandr\Dev\RNCP7\stockhub_design_system\src\components\atoms\badge\sh-badge.stories.ts",
    r"C:\Users\sandr\Dev\RNCP7\stockhub_design_system\src\components\molecules\button\sh-button.stories.ts",
    r"C:\Users\sandr\Dev\RNCP7\stockhub_design_system\src\components\molecules\card\sh-card.stories.ts",
    r"C:\Users\sandr\Dev\RNCP7\stockhub_design_system\src\components\molecules\status-badge\sh-status-badge.stories.ts",
]

for filepath in files_to_fix:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Remove import { html } from 'lit';
        content = re.sub(r"import \{ html \} from 'lit';\n", '', content)

        # Replace html` with ` (simple template string)
        content = re.sub(r'\bhtml`', '`', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✅ Fixed: {filepath}")
    except Exception as e:
        print(f"❌ Error fixing {filepath}: {e}")

print("\n✅ All files processed!")
