#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

def create_icon(size):
    # Create high-res 512x512 canvas for supersampled drawing
    canvas_size = 512
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Outer rounded rectangle (deep slate / dark modern card background)
    pad = 32
    r = 96
    # Gradient-like background: deep navy/indigo to dark cyan
    bg_color = (15, 23, 42, 255) # Slate 900
    border_color = (56, 189, 248, 200) # Cyan 400
    draw.rounded_rectangle(
        [pad, pad, canvas_size - pad, canvas_size - pad],
        radius=r,
        fill=bg_color,
        outline=border_color,
        width=16
    )

    # Draw stylized Archive Vault / Shutter / Lens symbol:
    # Outer circle (cyan glow)
    center = canvas_size // 2
    lens_r = 150
    draw.ellipse(
        [center - lens_r, center - lens_r, center + lens_r, center + lens_r],
        outline=(56, 189, 248, 255),
        width=20
    )

    # Inner lens ring (electric violet / indigo)
    inner_r = 105
    draw.ellipse(
        [center - inner_r, center - inner_r, center + inner_r, center + inner_r],
        fill=(30, 41, 59, 255),
        outline=(129, 140, 248, 255),
        width=14
    )

    # Stylized "A" (Archive) in center of lens with clean geometric lines
    # Triangle apex and base
    apex = (center, center - 60)
    left_leg = (center - 52, center + 55)
    right_leg = (center + 52, center + 55)
    
    draw.line([apex, left_leg], fill=(255, 255, 255, 255), width=18)
    draw.line([apex, right_leg], fill=(255, 255, 255, 255), width=18)
    # Crossbar
    bar_y = center + 15
    draw.line([(center - 32, bar_y), (center + 32, bar_y)], fill=(56, 189, 248, 255), width=16)

    # Resize to requested dimensions with Lanczos filter
    return img.resize((size, size), Image.Resampling.LANCZOS)

output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "icons")
os.makedirs(output_dir, exist_ok=True)

sizes = [16, 32, 48, 128]
for s in sizes:
    icon = create_icon(s)
    target_path = os.path.join(output_dir, f"icon-{s}.png")
    icon.save(target_path, "PNG")
    print(f"Generated {target_path} ({s}x{s})")

print("All icons successfully generated.")
