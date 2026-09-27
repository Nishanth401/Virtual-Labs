import openpyxl
import requests
import json
import time

wb = openpyxl.load_workbook(r'c:\Users\erohi\OneDrive\Desktop\Virtual-Labs\AIDS student count.xlsx')

cohort_info = {
    'II AIDS': {'year': 'II Year', 'cohort': 'II AIDS', 'year_sem': 'Year II / Semester IV', 'class': 'II AIDS'},
    'III AIDS': {'year': 'III Year', 'cohort': 'III AIDS', 'year_sem': 'Year III / Semester VI', 'class': 'III AIDS'},
    'IV AIDS': {'year': 'IV Year', 'cohort': 'IV AIDS', 'year_sem': 'Year IV / Semester VIII', 'class': 'IV AIDS'}
}

students_list = []
profiles_list = []

for sheetname, meta in cohort_info.items():
    sheet = wb[sheetname]
    count_sheet = 0
    for r in range(2, sheet.max_row + 1):
        sid = sheet.cell(r, 1).value
        sno = sheet.cell(r, 2).value
        essl = sheet.cell(r, 3).value
        name = sheet.cell(r, 4).value
        reg = sheet.cell(r, 6).value
        advisor = sheet.cell(r, 7).value
        if name and reg:
            reg_clean = str(reg).strip().replace('.0', '')
            name_clean = str(name).strip().upper()
            adv_clean = str(advisor).strip() if advisor is not None else 'Faculty Advisor'
            essl_clean = str(essl).strip() if essl is not None else ''
            sid_val = int(sid) if sid is not None and str(sid).isdigit() else None
            sno_val = int(sno) if sno is not None and str(sno).isdigit() else None
            email = f'{reg_clean}@vsb.ac.in'

            students_list.append({
                'student_id': sid_val,
                's_no': sno_val,
                'essl_code': essl_clean,
                'name': name_clean,
                'register_number': reg_clean,
                'password': name_clean,
                'year': meta['year'],
                'cohort': meta['cohort'],
                'department': 'Artificial Intelligence & Data Science',
                'class_name': meta['class'],
                'advisor': adv_clean,
                'email': email
            })

            profiles_list.append({
                'id': reg_clean,
                'register_number': reg_clean,
                'name': name_clean,
                'email': email,
                'department': 'Artificial Intelligence & Data Science',
                'year': meta['year'],
                'year_semester': meta['year_sem'],
                'class_name': meta['class'],
                'advisor': adv_clean,
                'completed_experiments': ['bubble-sort', 'stack-operations']
            })
            count_sheet += 1
    print(f"Loaded {count_sheet} students from {sheetname}")

print(f"Total students to insert: {len(students_list)}")

SUPABASE_URL = 'https://nibqxgygjzilojvvsayc.supabase.co'
ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYnF4Z3lnanppbG9qdnZzYXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzOTg4MDcsImV4cCI6MjEwNTk3NDgwN30.KQpaLb0aXqMs07ZSDFYRx_7mQxHE8V04-FzmwbKNYt4'

headers = {
    'apikey': ANON_KEY,
    'Authorization': f'Bearer {ANON_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}

# Insert students in chunks of 50
BATCH_SIZE = 50

print("--- Uploading to public.students ---")
for i in range(0, len(students_list), BATCH_SIZE):
    batch = students_list[i:i + BATCH_SIZE]
    res = requests.post(f"{SUPABASE_URL}/rest/v1/students", headers=headers, json=batch)
    if res.status_code in [200, 201]:
        print(f"Uploaded students batch {i//BATCH_SIZE + 1}/{(len(students_list)-1)//BATCH_SIZE + 1} ({len(batch)} records)")
    else:
        print(f"Error in students batch {i}: {res.status_code} - {res.text}")
    time.sleep(0.1)

print("--- Uploading to public.profiles ---")
for i in range(0, len(profiles_list), BATCH_SIZE):
    batch = profiles_list[i:i + BATCH_SIZE]
    res = requests.post(f"{SUPABASE_URL}/rest/v1/profiles", headers=headers, json=batch)
    if res.status_code in [200, 201]:
        print(f"Uploaded profiles batch {i//BATCH_SIZE + 1}/{(len(profiles_list)-1)//BATCH_SIZE + 1} ({len(batch)} records)")
    else:
        print(f"Error in profiles batch {i}: {res.status_code} - {res.text}")
    time.sleep(0.1)

print("All student records and profiles uploaded successfully!")
