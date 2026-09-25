"""Compose a desktop screenshot (macOS browser window) + mobile screenshot
(iPhone frame) into a clean flat mockup, matching the other project images."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

PUB = os.path.join(os.path.dirname(__file__), "..", "public")
W, H = 1536, 1024

def font(size):
    for p in ("C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius, fill=255)
    return m

def round_img(im, radius):
    im = im.convert("RGBA")
    im.putalpha(rounded_mask(im.size, radius))
    return im

def shadow(canvas, box, radius, blur=40, alpha=90, offset=(0, 24)):
    x, y, w, h = box
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([x + offset[0], y + offset[1], x + w + offset[0], y + h + offset[1]],
                        radius, fill=(15, 20, 34, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(layer)

def cover(im, tw, th, anchor_top=True):
    """Scale to cover (tw,th), crop overflow (top-anchored)."""
    iw, ih = im.size
    s = max(tw / iw, th / ih)
    nw, nh = int(iw * s), int(ih * s)
    im = im.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    top = 0 if anchor_top else (nh - th) // 2
    return im.crop((left, top, left + tw, top + th))

def background():
    bg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    top, bot = (244, 246, 251), (223, 228, 238)
    px = bg.load()
    for y in range(H):
        t = y / H
        r = int(top[0] + (bot[0] - top[0]) * t)
        g = int(top[1] + (bot[1] - top[1]) * t)
        b = int(top[2] + (bot[2] - top[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b, 255)
    # soft blue glow top-left
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([-200, -260, 700, 500], fill=(47, 107, 255, 34))
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    bg.alpha_composite(glow)
    return bg

def browser(shot, w, h):
    """Return an RGBA macOS browser window (title bar + screenshot)."""
    r = 18
    bar = 46
    win = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    d = ImageDraw.Draw(win)
    d.rectangle([0, 0, w, bar], fill=(238, 240, 245, 255))
    # traffic lights
    for i, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        cx = 26 + i * 22
        d.ellipse([cx - 7, bar // 2 - 7, cx + 7, bar // 2 + 7], fill=c)
    # url pill
    pw, ph = int(w * 0.42), 24
    px = (w - pw) // 2
    d.rounded_rectangle([px, bar // 2 - ph // 2, px + pw, bar // 2 + ph // 2], 12,
                        fill=(255, 255, 255, 255))
    # screenshot area
    content = cover(shot, w, h - bar)
    win.paste(content, (0, bar))
    d = ImageDraw.Draw(win)
    d.line([0, bar, w, bar], fill=(220, 223, 230), width=1)
    return round_img(win, r), pw, px, bar

def phone(shot, h):
    """Return an RGBA iPhone with the mobile screenshot."""
    bez = 14
    r = 46
    sw = int((h - 2 * bez) * 0.475)  # screen width from height & aspect
    w = sw + 2 * bez
    body = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(body)
    d.rounded_rectangle([0, 0, w - 1, h - 1], r, fill=(20, 22, 28, 255))
    screen = cover(shot, sw, h - 2 * bez)
    screen = round_img(screen, r - 10)
    body.alpha_composite(screen, (bez, bez))
    # notch pill
    nw, nh = int(w * 0.34), 12
    d.rounded_rectangle([(w - nw) // 2, bez + 8, (w + nw) // 2, bez + 8 + nh], 6,
                        fill=(20, 22, 28, 255))
    return body

def compose(desktop, mobile, url, out):
    canvas = background()
    dshot = Image.open(os.path.join(PUB, desktop)).convert("RGBA")
    mshot = Image.open(os.path.join(PUB, mobile)).convert("RGBA")

    bw, bh = 1150, 748
    bx, by = 60, 96
    shadow(canvas, (bx, by, bw, bh), 18, blur=46, alpha=80, offset=(0, 26))
    win, pw, ppx, bar = browser(dshot, bw, bh)
    canvas.alpha_composite(win, (bx, by))
    # url text
    d = ImageDraw.Draw(canvas)
    f = font(15)
    tw = d.textlength(url, font=f)
    d.text((bx + ppx + (pw - tw) / 2, by + bar // 2 - 9), url, font=f, fill=(90, 98, 117))

    ph_h = 620
    ph = phone(mshot, ph_h)
    px = W - ph.width - 70
    py = H - ph_h - 54
    shadow(canvas, (px, py, ph.width, ph_h), 46, blur=44, alpha=95, offset=(0, 22))
    canvas.alpha_composite(ph, (px, py))

    canvas.convert("RGB").save(os.path.join(PUB, out), quality=92)
    print("wrote", out)

compose("ayoweb.png", "ayomobile.png", "ayococktails.com", "project-ayococktails.png")
compose("beautifymeweb.png", "beautifymemobile.png", "beautifyme.ch", "project-beautifyme.png")
