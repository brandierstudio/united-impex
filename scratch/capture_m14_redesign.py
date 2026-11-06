import subprocess
import os
import tempfile
import time
from PIL import Image

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
artifact_dir = r"C:\Users\S.Tech\.gemini\antigravity\brain\b1be57c8-cd94-4ae0-94fe-cc74973aa89c"

tests = [
    # 1. Three Hero Banners (Desktop 1440x900)
    {
        'name': 'm14_hero_slide1_blush_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&hero_slide=0'
    },
    {
        'name': 'm14_hero_slide2_sand_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&hero_slide=1'
    },
    {
        'name': 'm14_hero_slide3_pearl_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&hero_slide=2'
    },
    # 2. 5-Stage Zigzag Cup Flight (Desktop 1440x900)
    {
        'name': 'm14_cup_stage0_hero_right_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&cup_progress=0.0'
    },
    {
        'name': 'm14_cup_stage1_charcoal_left_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&cup_progress=0.20'
    },
    {
        'name': 'm14_cup_stage2_blush_right_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&cup_progress=0.40'
    },
    {
        'name': 'm14_cup_stage3_cream_left_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&cup_progress=0.60'
    },
    {
        'name': 'm14_cup_stage4_pearl_right_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&cup_progress=0.80'
    },
    {
        'name': 'm14_cup_stage5_pedestal_landed_1440.png',
        'width': 1440,
        'height': 900,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&section=table&cup_progress=1.0'
    },
    # 3. Mobile Responsive captures (390x844)
    {
        'name': 'm14_mobile_hero_390.png',
        'width': 390,
        'height': 844,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&hero_slide=0'
    },
    {
        'name': 'm14_mobile_cup_waypoint1_390.png',
        'width': 390,
        'height': 844,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&cup_progress=0.20'
    },
    {
        'name': 'm14_mobile_pedestal_landed_390.png',
        'width': 390,
        'height': 844,
        'url': 'http://127.0.0.1:5173/?intro_stage=homepage&section=table&cup_progress=1.0'
    }
]

captured = {}
for t in tests:
    out_file = os.path.join(artifact_dir, t['name'])
    temp_dir = tempfile.mkdtemp()
    print(f"Capturing {t['name']}...")
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--user-data-dir={temp_dir}",
        f"--window-size={t['width']},{t['height']}",
        f"--screenshot={out_file}",
        t['url']
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if os.path.exists(out_file) and os.path.getsize(out_file) > 10000:
        size = os.path.getsize(out_file)
        print(f"  -> SUCCESS: {t['name']} ({size} bytes)")
        captured[t['name']] = out_file
    else:
        print(f"  -> FAILED: {t['name']}")

# Build Comprehensive Composite Contact Sheet
hero_keys = [
    'm14_hero_slide1_blush_1440.png',
    'm14_hero_slide2_sand_1440.png',
    'm14_hero_slide3_pearl_1440.png'
]

journey_keys = [
    'm14_cup_stage0_hero_right_1440.png',
    'm14_cup_stage1_charcoal_left_1440.png',
    'm14_cup_stage2_blush_right_1440.png',
    'm14_cup_stage3_cream_left_1440.png',
    'm14_cup_stage4_pearl_right_1440.png',
    'm14_cup_stage5_pedestal_landed_1440.png'
]

print("Generating Master Contact Sheet...")
# Target cell dimensions
w_hero = 640
h_hero = int(900 * (w_hero / 1440)) # 400

w_journey = 420
h_journey = int(900 * (w_journey / 1440)) # 262

# Sheet structure:
# Top Section: 3 Hero Slides side-by-side or stacked
# Let's do width = 1320
total_w = 1320
padding = 20

# Row 1 & 2: Hero Slides (Slide 1 and Slide 2 on row 1, Slide 3 on row 2 + Mobile Hero)
# Row 3 & 4: 6 Journey Waypoints (3 per row: Stage 0, 1, 2 / Stage 3, 4, 5)
# Row 5: Mobile Waypoints side-by-side

total_h = (h_hero + padding) * 2 + (h_journey + padding) * 2 + 380 + padding * 2
sheet = Image.new("RGB", (total_w, total_h), (245, 245, 248))

# Paste Hero Slides:
if all(k in captured for k in hero_keys):
    img_h0 = Image.open(captured[hero_keys[0]]).resize((w_hero, h_hero), Image.Resampling.LANCZOS)
    img_h1 = Image.open(captured[hero_keys[1]]).resize((w_hero, h_hero), Image.Resampling.LANCZOS)
    img_h2 = Image.open(captured[hero_keys[2]]).resize((w_hero, h_hero), Image.Resampling.LANCZOS)
    
    sheet.paste(img_h0.convert("RGB"), (padding, padding))
    sheet.paste(img_h1.convert("RGB"), (w_hero + padding * 2, padding))
    sheet.paste(img_h2.convert("RGB"), (padding, h_hero + padding * 2))

    # Next to slide 3, paste mobile hero preview
    if 'm14_mobile_hero_390.png' in captured:
        mob_hero = Image.open(captured['m14_mobile_hero_390.png'])
        w_mob = int(mob_hero.width * (h_hero / mob_hero.height))
        mob_hero_res = mob_hero.resize((w_mob, h_hero), Image.Resampling.LANCZOS)
        sheet.paste(mob_hero_res.convert("RGB"), (w_hero + padding * 2, h_hero + padding * 2))

# Paste 6 Journey Frames (3 cols x 2 rows)
y_journey_start = (h_hero + padding) * 2 + padding
for idx, j_key in enumerate(journey_keys):
    if j_key in captured:
        col = idx % 3
        row = idx // 3
        x = padding + col * (w_journey + 15)
        y = y_journey_start + row * (h_journey + padding)
        j_img = Image.open(captured[j_key]).resize((w_journey, h_journey), Image.Resampling.LANCZOS)
        sheet.paste(j_img.convert("RGB"), (x, y))

# Paste Mobile Waypoints at bottom
y_mob_start = y_journey_start + (h_journey + padding) * 2 + padding
mob_keys = ['m14_mobile_hero_390.png', 'm14_mobile_cup_waypoint1_390.png', 'm14_mobile_pedestal_landed_390.png']
mob_w = int(390 * (340 / 844)) # ~157
for m_idx, m_k in enumerate(mob_keys):
    if m_k in captured:
        m_im = Image.open(captured[m_k]).resize((mob_w, 340), Image.Resampling.LANCZOS)
        sheet.paste(m_im.convert("RGB"), (padding + m_idx * (mob_w + 30), y_mob_start))

sheet_out = os.path.join(artifact_dir, "milestone14_hero_cup_journey_contact_sheet.jpg")
sheet.save(sheet_out, quality=88)
print(f"Generated {sheet_out} ({total_w}x{total_h}, {os.path.getsize(sheet_out)} bytes)")
