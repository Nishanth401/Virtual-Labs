import re

with open('frontend/data/labs.ts', encoding='utf-8') as f:
    text = f.read()

# Match each object in LABS_DATA
lab_blocks = text.split('id: "')
print(f"Total blocks: {len(lab_blocks)-1}")
for b in lab_blocks[1:]:
    lid = b.split('"')[0]
    name_m = re.search(r'name:\s*"([^"]+)"', b)
    sem_m = re.search(r'semester:\s*"([^"]+)"', b)
    code_m = re.search(r'code:\s*"([^"]+)"', b)
    name = name_m.group(1) if name_m else 'N/A'
    sem = sem_m.group(1) if sem_m else 'N/A'
    code = code_m.group(1) if code_m else 'N/A'
    print(f"- [{code}] {lid} | {name} | {sem}")
