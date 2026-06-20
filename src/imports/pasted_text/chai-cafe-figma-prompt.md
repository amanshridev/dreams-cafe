Here's a comprehensive, detailed Figma prompt you can use — either with Claude's Figma MCP or paste into any AI-powered Figma plugin (like Magician, Figma AI, etc.):

---

## 🍵 Chai Biscuit Cafe — Figma Design Prompt

---

### **GLOBAL SETUP**

**Design Spec:**
- Frame size: 1440×5500px (desktop), also create a 390×8000px mobile variant
- Color Palette:
  - Primary: `#C0622F` (warm terracotta/burnt orange)
  - Secondary: `#F5E6D3` (soft cream/latte)
  - Accent: `#6B3A2A` (deep chai brown)
  - Background: `#FDF6EE` (off-white warm paper)
  - Text Dark: `#2C1A0E`
  - Text Light: `#FFFFFF`
  - Highlight: `#E8A84C` (golden honey)
- Fonts: **Playfair Display** (headings), **DM Sans** (body), **Caveat** (handwritten accents)
- Rounded corners: 16–24px throughout
- Add subtle grain/noise texture overlay at 5% opacity on background

---

### **SECTION 1 — STICKY NAVIGATION BAR**

Create a fixed top navbar (80px height, full-width) with:
- Background: `#FDF6EE` with bottom border `1px solid rgba(192,98,47,0.15)`
- Left: Logo — hand-lettered text "Chai Biscuit Cafe" in Playfair Display 24px Bold, color `#2C1A0E`, with a small illustrated steam icon beside it
- Center: Nav links — Home / Menu / Our Story / Reservations / Find Us — in DM Sans 15px Medium, `#6B3A2A`, with a warm underline hover state
- Right: CTA button — "Order Now" — pill-shaped, background `#C0622F`, text white, 14px, padding 12×24px

---

### **SECTION 2 — HERO (Scroll-Animated, Centerpiece)**

This is the star section. Create it as a **tall scroll-trigger zone (100vh minimum, set frame to 1440×900px)**.

**Background:** Full-bleed warm gradient — top `#F5E6D3` fading to `#FDF6EE` at bottom. Add a very soft illustrated pattern of leaves, spices (cardamom, cinnamon sticks, star anise) as a repeating tile at 8% opacity.

**Center Stage — Mud Cup (Kulhad):**
- Draw a large, beautifully illustrated **clay kulhad/mud cup** centered on canvas, ~400px tall. Use warm earthy tones: `#B5622A`, `#8C4A1F`, `#D4845A`. Add texture strokes to give it a handmade, rustic feel. Add a subtle shadow (drop shadow: 0px 30px 80px rgba(0,0,0,0.18)).
- **Chai Pour Animation (describe for prototyping):** A golden-amber liquid stream pours from the top of the frame into the cup. The stream has a slight curve/arc. As the user scrolls down, the cup "fills up" — liquid level rises inside the cup, the steam wisps increase. Add 3–4 rising steam curl illustrations above the cup in white/cream.
- Label this frame group: `Hero_Kulhad_Scroll` — mark scroll-trigger states: `State 0` (empty cup, no steam), `State 1` (25% filled, 1 steam wisp), `State 2` (60% filled, 2 wisps), `State 3` (full, 3 wisps, golden shimmer on cup rim).

**Hero Text (layered behind/around cup):**
- Large heading: **"Sip the Soul of India"** — Playfair Display, 80px, Bold Italic, `#2C1A0E`, centered, behind cup but visible on sides
- Sub-text below cup (appears as cup fills): **"Hand-brewed chai. Baked fresh. Served with love."** — DM Sans 20px, `#6B3A2A`
- Scroll CTA: a small pill button — "Explore Our Menu ↓" — outline style, border `#C0622F`, text `#C0622F`
- Add a small handwritten Caveat font label near the cup: *"est. 2024, Indore"*

---

### **SECTION 3 — MARQUEE STRIP**

Full-width scrolling ticker strip (80px tall), background `#C0622F`:
Repeating text in white Caveat 22px: `★ Masala Chai  ✦ Kulhad Special  ★ Bun Maska  ✦ Adrak Chai  ★ Nankhatai  ✦ Irani Chai  ★ Filter Coffee  ✦`
Add left-to-right animation arrow (infinite scroll marquee, horizontal).

---

### **SECTION 4 — OUR STORY (Split Layout)**

Two-column layout (50/50), full-width, padding 120px vertical:

**Left Column:**
- Large handwritten Caveat text in `#C0622F`: *"More than chai..."*
- Playfair Display 48px heading: **"A Cup Full of Stories"**
- DM Sans 17px body text (3–4 lines): *"Born from the busy streets of Indore, Chai Biscuit Cafe is where every sip carries the warmth of a grandmother's kitchen and the buzz of a college adda. We brew slow, serve fresh, and pour our heart into every kulhad."*
- Two icon+stat cards below: `🍵 50+ Chai Varieties` and `📍 3 Locations in Indore` — card style: background `#F5E6D3`, rounded 20px, 200×100px each

**Right Column:**
- Large illustrated image placeholder (600×500px rounded 24px): warm photo of a kulhad chai on a wooden table with biscuits, steam visible. Add a floating badge on top-right: circular, `#E8A84C` background, text *"100% Natural Spices"* in Caveat.

---

### **SECTION 5 — MENU HIGHLIGHTS (Card Grid)**

Section title centered: **"What We Brew"** — Playfair Display 56px
Sub-label: *"Fresh every hour, all day long"* — Caveat 22px `#C0622F`

Create a 3-column card grid (4 cards per row on desktop, 2×4):

**Card Design** (each 340×420px, rounded 24px, background white, shadow: 0 8px 40px rgba(0,0,0,0.08)):
- Top 55%: illustrated/photo image area with warm background gradient fill
- Bottom 45%: padding 24px
  - Category tag pill (e.g., "Bestseller 🔥") — `#F5E6D3` background, `#C0622F` text, 12px
  - Item name: Playfair Display 24px Bold
  - Description: DM Sans 14px, `#6B3A2A`, 2 lines
  - Price: `#C0622F`, DM Sans 20px Bold
  - "Add to Order" button — full width, rounded, `#C0622F` fill, white text

**8 Menu Cards to create:**
1. Kulhad Masala Chai — ₹30
2. Adrak Lemon Chai — ₹35
3. Kesar Milk Chai — ₹50
4. Cold Brew Chai — ₹70
5. Bun Maska (2 pcs) — ₹40
6. Nankhatai Biscuits — ₹45
7. Irani Chai + Osmania — ₹80 (combo badge)
8. Seasonal Special Chai — ₹60

---

### **SECTION 6 — EXPERIENCE BENTO GRID**

Full-width section, background `#2C1A0E` (dark), padding 100px vertical.

Heading: **"The Chai Biscuit Experience"** — Playfair Display 52px, white, centered.

Create a **bento-style asymmetric grid** with 5 cards:

| Card | Size | Content |
|------|------|---------|
| A | 700×340px | Large: "Every cup handcrafted" + illustrated hands holding kulhad |
| B | 380×340px | "Open 7AM–11PM daily" + illustrated sun/moon icon |
| C | 380×340px | "Sourced from Assam & Nilgiris" + illustrated tea leaf |
| D | 380×340px | "50+ Chai Varieties" + illustrated steam swirls |
| E | 700×340px | Large: Customer quote in Caveat italic, gold `#E8A84C` |

All cards: rounded 24px, background `#3D2010`, white text, subtle warm glow inner border.

---

### **SECTION 7 — TESTIMONIALS CAROUSEL**

Background: `#F5E6D3`, padding 80px vertical.
Heading: **"What Our Regulars Say"** — Playfair Display 44px, `#2C1A0E`

Create 3 testimonial cards side by side (380×240px each, white background, rounded 20px, shadow):
- Star rating (5 stars, `#E8A84C`)
- Quote text: DM Sans 16px italic `#2C1A0E`
- Reviewer name + tag: "Priya S. — Regular since 2024" in DM Sans 13px `#C0622F`
- Left-edge accent bar 4px wide, `#C0622F`

Add left/right arrow navigation buttons (circle, outline style).

---

### **SECTION 8 — FIND US / LOCATIONS**

Split layout: Left = map placeholder (700×400px, rounded 24px, `#D4C4B0` fill with illustrated map pin), Right = 3 location cards stacked.

Each location card (450×130px, white, rounded 16px, shadow):
- Location icon `#C0622F`
- Name: **"Chai Biscuit Cafe — Vijay Nagar"** (etc.)
- Address: DM Sans 14px
- Hours: *"7:00 AM – 11:00 PM"*
- "Get Directions →" link text in `#C0622F`

---

### **SECTION 9 — NEWSLETTER / CTA BANNER**

Full-width section, background rich diagonal gradient: `#C0622F` → `#6B3A2A`.
Centered content:
- Caveat 26px white: *"Never miss a new brew"*
- Playfair Display 52px white: **"Join the Chai Club"**
- DM Sans 17px cream: "Get exclusive offers, seasonal menus & early access to specials."
- Email input (480px wide, 56px height, white background, rounded 12px) + "Join Now" pill button (`#E8A84C` fill, `#2C1A0E` text)
- Add illustrated floating spice elements (cardamom, star anise, cinnamon) scattered around the CTA at 30% opacity.

---

### **SECTION 10 — FOOTER**

Background `#2C1A0E`, padding 80px top / 40px bottom.

4-column footer layout:
- **Col 1:** Logo + tagline *"Brewing happiness, one kulhad at a time."* + social icons (Instagram, Facebook, WhatsApp) in `#C0622F` circles
- **Col 2:** Quick Links list — Home, Menu, Our Story, Blog, Careers
- **Col 3:** Visit Us — 3 location addresses in DM Sans 13px cream
- **Col 4:** Hours + Contact — Phone, Email, WhatsApp link

Bottom bar: `1px solid rgba(255,255,255,0.1)`, copyright text centered in DM Sans 12px cream `#F5E6D3`.

---

### **PROTOTYPE / INTERACTION NOTES FOR FIGMA**

Add these Smart Animate connections:
1. **Hero scroll states:** Connect `State 0 → 1 → 2 → 3` on scroll trigger, ease-in-out 600ms
2. **Menu cards:** Hover → card lifts 8px (Y offset), shadow deepens
3. **Nav:** On scroll past hero → nav background becomes solid cream with shadow
4. **Marquee strip:** Create as component with horizontal scroll animation looping

---

This prompt gives you a **complete, production-ready Figma design brief**. You can paste it into Claude's Figma MCP (if you have it connected), or use it section by section with any AI Figma plugin. Want me to go ahead and actually build this in your Figma file directly using the MCP connection?