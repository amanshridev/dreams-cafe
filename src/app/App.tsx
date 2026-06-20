import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Check, MapPin, Clock, Instagram, Facebook, Twitter, Star, Phone, Globe, ChevronDown, Users, TrendingUp, Coffee } from "lucide-react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const cream = "#E1E0CC";
const creamDim = "rgba(225,224,204,0.6)";
const creamFaint = "rgba(225,224,204,0.08)";
const terracotta = "#C0622F";
const gold = "#E8A84C";
const cardBg = "#101010";
const featureBg = "#1a1a1a";

// ─── Noise SVG ────────────────────────────────────────────────────────────────
const noiseOverlaySvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const bgNoiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── WordsPullUp ──────────────────────────────────────────────────────────────
function WordsPullUp({ text, delay = 0, className = "", style = {} }: {
  text: string; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.22em] ${className}`} style={style}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: 28, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Scroll character reveal ──────────────────────────────────────────────────
function AnimatedChar({ char, index, total, scrollYProgress }: {
  char: string; index: number; total: number; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = (index / total) - 0.08;
  const end = (index / total) + 0.06;
  const opacity = useTransform(scrollYProgress, [Math.max(0, start), Math.min(1, end + 0.04)], [0.12, 1]);
  return <motion.span style={{ opacity }} aria-hidden="true">{char}</motion.span>;
}

function ScrollRevealText({ text, containerRef }: {
  text: string; containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = text.split("");
  return (
    <span aria-label={text}>
      {chars.map((char, i) => (
        <AnimatedChar key={i} char={char} index={i} total={chars.length} scrollYProgress={scrollYProgress} />
      ))}
    </span>
  );
}

// ─── Floating particle ────────────────────────────────────────────────────────
function FloatingParticle({ emoji, x, y, delay, duration, distance }: {
  emoji: string; x: string; y: string; delay: number; duration: number; distance: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, fontSize: "clamp(18px,2.5vw,30px)", zIndex: 5 }}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{ opacity: [0, 0.5, 0.5, 0], y: [-distance, -distance * 2.2], rotate: [0, 12, -8, 4] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(start);
    }, 28);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Menu data (dummy) ────────────────────────────────────────────────────────
const menuItems = [
  {
    name: "Signature Espresso",
    desc: "Double-shot, velvety crema, served with a square of dark chocolate.",
    price: "$5.50",
    tag: "Signature ★",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Truffle Croissant",
    desc: "Laminated dough, black truffle butter, flaked sea salt.",
    price: "$7.00",
    tag: "Bestseller 🔥",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Avocado Toast",
    desc: "Sourdough, smashed avo, chilli flakes, poached egg.",
    price: "$12.00",
    tag: "Fan Fav 🧡",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Cold Brew Float",
    desc: "18-hour cold brew over vanilla bean ice cream. Dangerously good.",
    price: "$8.50",
    tag: "New ✨",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Matcha Latte",
    desc: "Ceremonial-grade matcha, oat milk, a whisper of honey.",
    price: "$6.50",
    tag: "Popular 🍵",
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Smoked Salmon Bagel",
    desc: "House-baked bagel, cream cheese, capers, dill.",
    price: "$14.00",
    tag: "Chef's Pick 👨‍🍳",
    img: "https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Ricotta Pancakes",
    desc: "Fluffy, golden, served with maple syrup and fresh berries.",
    price: "$13.00",
    tag: "Most Loved ❤️",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Seasonal Fruit Bowl",
    desc: "Market-fresh fruit, coconut yoghurt, granola, honey drizzle.",
    price: "$10.00",
    tag: "Fresh 🌿",
    img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop&auto=format",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  { icon: "🍽️", label: "Dine-In" },
  { icon: "☕", label: "Takeaway" },
  { icon: "🛵", label: "Home Delivery" },
  { icon: "📱", label: "Online Ordering" },
  { icon: "🎂", label: "Private Events" },
];

// ─── Ratings ──────────────────────────────────────────────────────────────────
const ratings = [
  { label: "Food Quality",    score: 5 },
  { label: "Value for Money", score: 4 },
  { label: "Service Speed",   score: 4 },
  { label: "Ambience",        score: 5 },
  { label: "Coffee",          score: 5 },
  { label: "Family Friendly", score: 4 },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const reviews = [
  { quote: "The best espresso I've had outside of Naples. The croissant alone is worth the trip.", name: "Sophie L.", tag: "Food writer" },
  { quote: "Quiet, beautiful, unhurried. Exactly what a cafe should feel like on a Saturday morning.", name: "Marcus R.", tag: "Regular since opening" },
  { quote: "Every single item on the menu tastes intentional. The cold brew float is extraordinary.", name: "Aisha T.", tag: "Verified Google review" },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);
  const navLinks = ["Our Story", "Menu", "Reviews", "Location", "Reservations"];

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: cream, fontFamily: "'Almarai', -apple-system, sans-serif", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ height: "100vh", padding: "16px" }} className="relative">
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "1.75rem" }}>

          {/* BG image */}
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&auto=format"
            alt="Warm cafe interior with sunlight streaming through windows"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.42) saturate(0.8)" }}
          />

          {/* Noise */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: noiseOverlaySvg, opacity: 0.6 }} />

          {/* Gradient */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 35%, rgba(0,0,0,0.78) 100%)" }} />

          {/* Floating particles */}
          <FloatingParticle emoji="☕" x="8%"  y="55%" delay={0}   duration={5.5} distance={30} />
          <FloatingParticle emoji="✦"  x="14%" y="40%" delay={1.2} duration={4.8} distance={22} />
          <FloatingParticle emoji="🌿" x="5%"  y="70%" delay={2.4} duration={6.2} distance={35} />
          <FloatingParticle emoji="⭐" x="88%" y="60%" delay={0.6} duration={5.0} distance={28} />
          <FloatingParticle emoji="🍃" x="92%" y="45%" delay={1.8} duration={5.8} distance={32} />
          <FloatingParticle emoji="✦"  x="82%" y="72%" delay={3.0} duration={4.5} distance={20} />
          <FloatingParticle emoji="🌸" x="50%" y="18%" delay={0.9} duration={7.0} distance={40} />
          <FloatingParticle emoji="🫖" x="72%" y="30%" delay={2.1} duration={5.2} distance={26} />

          {/* Pill navbar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center" style={{ backgroundColor: "#000", borderRadius: "0 0 1.5rem 1.5rem", padding: "10px 32px", gap: 44 }}>
              {navLinks.map((l) => (
                <a key={l} href="#"
                  className="text-xs font-light transition-colors duration-200 hidden sm:block whitespace-nowrap"
                  style={{ color: "rgba(225,224,204,0.7)", letterSpacing: "0.03em" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = cream}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(225,224,204,0.7)"}
                >{l}</a>
              ))}
              <button className="sm:hidden text-xs" style={{ color: cream }} onClick={() => setMobileNavOpen(true)}>Menu</button>
            </div>
          </div>

          {/* Rating badge */}
          <motion.div
            className="absolute z-10"
            style={{ top: "18%", right: "5%", backgroundColor: cardBg, borderRadius: 16, padding: "12px 18px", border: `1px solid rgba(232,168,76,0.3)` }}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2">
              <Star size={14} fill={gold} color={gold} />
              <span style={{ color: cream, fontWeight: 700, fontSize: 16 }}>4.8</span>
            </div>
            <p style={{ color: creamDim, fontSize: 10, marginTop: 2 }}>312 reviews</p>
          </motion.div>

          {/* Open badge */}
          <motion.div
            className="absolute z-10 flex items-center gap-2"
            style={{ top: "18%", left: "5%", backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 999, padding: "8px 16px", border: `1px solid rgba(225,224,204,0.12)`, backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
            <span style={{ color: cream, fontSize: 12 }}>Open · Closes 10 PM</span>
          </motion.div>

          {/* Price badge */}
          <motion.div
            className="absolute z-10 hidden lg:flex items-center gap-2"
            style={{ bottom: "30%", right: "4%", backgroundColor: "rgba(0,0,0,0.65)", borderRadius: 999, padding: "8px 16px", border: `1px solid rgba(225,224,204,0.1)`, backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ color: gold, fontSize: 13, fontWeight: 600 }}>$5 – $20</span>
            <span style={{ color: creamDim, fontSize: 11 }}>per person</span>
          </motion.div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 z-10" style={{ padding: "0 2.5rem 2rem" }}>
            <div className="grid grid-cols-12 items-end gap-4">

              {/* Giant heading */}
              <div className="col-span-12 lg:col-span-8">
                <motion.span
                  style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: gold, display: "block", marginBottom: 4, opacity: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  est. 2022 · Downtown
                </motion.span>

                <div style={{ fontSize: "clamp(11vw, 14vw, 15vw)", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.05em", color: cream, overflow: "hidden" }}>
                  <WordsPullUp text="Dream." delay={0} />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <WordsPullUp
                    text="Cafe."
                    delay={0.12}
                    style={{ fontSize: "clamp(6vw,8vw,9vw)", fontWeight: 300, letterSpacing: "-0.04em", color: "rgba(225,224,204,0.4)", lineHeight: 1 }}
                  />
                </div>
              </div>

              {/* Description + CTA */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 pb-1">
                <motion.p
                  style={{ color: creamDim, fontSize: 14, lineHeight: 1.65, maxWidth: 320 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  Where great coffee meets unhurried mornings. A calm corner of the city built for people who believe breakfast deserves to be slow.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    className="group flex items-center gap-2 rounded-full font-medium text-sm transition-all duration-300 hover:gap-4"
                    style={{ backgroundColor: cream, color: "#000", padding: "10px 10px 10px 22px" }}
                  >
                    See the menu
                    <span className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: "#000", width: 36, height: 36 }}>
                      <ArrowRight size={15} color={cream} />
                    </span>
                  </button>
                  <a
                    href="tel:+15550001234"
                    className="flex items-center gap-2 rounded-full text-sm transition-all hover:opacity-80"
                    style={{ border: `1px solid rgba(225,224,204,0.25)`, color: cream, padding: "10px 20px" }}
                  >
                    <Phone size={13} /> Reserve
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Scroll cue */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 2.2, duration: 1 }}
            >
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <ChevronDown size={18} color={cream} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-8"
              style={{ backgroundColor: "#000" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((l, i) => (
                <motion.a key={l} href="#"
                  style={{ color: cream, fontSize: 28, fontWeight: 300 }}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileNavOpen(false)}
                >{l}</motion.a>
              ))}
              <button style={{ color: creamDim, fontSize: 13, marginTop: 16 }} onClick={() => setMobileNavOpen(false)}>✕ Close</button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ height: 56, borderTop: `1px solid ${creamFaint}`, borderBottom: `1px solid ${creamFaint}` }}>
        <div className="flex items-center h-full whitespace-nowrap" style={{ animation: "marquee 18s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: creamDim, paddingRight: 64, display: "inline-flex", gap: 32, alignItems: "center" }}>
              {services.map(s => (
                <span key={s.label} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>{s.icon} {s.label}</span>
              ))}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform:translateX(0) } to { transform:translateX(-25%) } }`}</style>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STORY
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={storyRef as React.RefObject<HTMLDivElement>}
        style={{ backgroundColor: "#000", padding: "100px 24px", position: "relative" }}
      >
        <div className="max-w-6xl mx-auto" style={{ backgroundColor: cardBg, borderRadius: "2rem", padding: "clamp(40px,6vw,88px)" }}>

          <p className="text-center mb-8 text-xs tracking-widest uppercase" style={{ color: cream, opacity: 0.35 }}>
            12 Elm Street · Downtown · Open daily 7 AM – 10 PM
          </p>

          <h2 className="text-center leading-[0.92] mb-10" style={{ fontSize: "clamp(26px,5vw,62px)" }}>
            <WordsPullUp text="Slow mornings." delay={0} style={{ color: cream }} />
            {" "}
            <WordsPullUp text="Honest food." delay={0.2} style={{ color: cream, fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }} />
            {" "}
            <WordsPullUp text="Real coffee." delay={0.4} style={{ color: "rgba(225,224,204,0.35)" }} />
          </h2>

          <div className="max-w-3xl mx-auto text-center">
            <p style={{ color: cream, fontSize: "clamp(13px,1.4vw,16px)", lineHeight: 1.85 }}>
              <ScrollRevealText
                text="The Dream Cafe was built around one simple belief — that the best part of any day is the first quiet hour of it. We source our beans directly from small farms in Ethiopia and Colombia, bake everything fresh before sunrise, and keep our menu short enough that every item on it gets the attention it deserves. Come for the coffee. Stay for the feeling."
                containerRef={storyRef as React.RefObject<HTMLElement | null>}
              />
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {[
              { Icon: Star,       to: 48,  suffix: "/5",  label: "Average rating",  note: "312 reviews" },
              { Icon: Coffee,     to: 20,  suffix: "$",   label: "Max price",       note: "per person" },
              { Icon: Users,      to: 312, suffix: "+",   label: "Happy guests",    note: "& growing" },
              { Icon: TrendingUp, to: 10,  suffix: "PM",  label: "Closing time",    note: "daily" },
            ].map(({ Icon, to, suffix, label, note }, i) => (
              <motion.div
                key={label}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon size={18} color={terracotta} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontSize: "clamp(26px,3.5vw,46px)", fontWeight: 700, color: cream, lineHeight: 1 }}>
                  {suffix === "$"
                    ? <><AnimatedCounter to={to} />{suffix}</>
                    : <><AnimatedCounter to={to} suffix={suffix} /></>
                  }
                </div>
                <div style={{ color: creamDim, fontSize: 12, marginTop: 5 }}>{label}</div>
                <div style={{ color: "rgba(225,224,204,0.3)", fontSize: 11 }}>{note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MENU
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative" style={{ backgroundColor: "#000", padding: "80px 24px 100px" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: bgNoiseSvg, opacity: 0.1 }} />
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="mb-10">
            <h2 style={{ fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 400, lineHeight: 1.2 }}>
              <WordsPullUp text="Fresh daily, sourced" style={{ color: cream }} delay={0} />
            </h2>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 400, lineHeight: 1.2, marginTop: 4 }}>
              <WordsPullUp text="with intention." style={{ color: "rgba(225,224,204,0.28)" }} delay={0.15} />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                className="group flex flex-col overflow-hidden cursor-pointer"
                style={{ backgroundColor: featureBg, borderRadius: 20 }}
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
              >
                {/* Image — clear, no blend mode */}
                <div className="relative overflow-hidden" style={{ height: 190 }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle bottom fade only — keeps image readable */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(26,26,26,0.7) 0%, transparent 55%)" }}
                  />
                  <span
                    className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(0,0,0,0.55)", color: cream, backdropFilter: "blur(6px)" }}
                  >{item.tag}</span>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 style={{ color: cream, fontWeight: 600, fontSize: 16, marginBottom: 5 }}>{item.name}</h3>
                  <p style={{ color: creamDim, fontSize: 12, lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
                  <div className="flex items-center justify-between mt-5">
                    <span style={{ color: gold, fontWeight: 700, fontSize: 18 }}>{item.price}</span>
                    <button
                      className="flex items-center gap-1.5 text-xs font-medium rounded-full px-4 py-2 transition-all hover:opacity-80"
                      style={{ backgroundColor: "rgba(225,224,204,0.1)", color: cream, border: `1px solid rgba(225,224,204,0.1)` }}
                    >
                      Add <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
          >
            <a
              href="#"
              className="group flex items-center gap-2 rounded-full font-medium text-sm transition-all duration-300 hover:gap-4"
              style={{ backgroundColor: cream, color: "#000", padding: "10px 10px 10px 22px" }}
            >
              View full menu
              <span className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: "#000", width: 36, height: 36 }}>
                <ArrowRight size={14} color={cream} />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RATINGS & REVIEWS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#000", padding: "80px 24px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">

            {/* Rating breakdown */}
            <motion.div
              style={{ backgroundColor: cardBg, borderRadius: 20, padding: "clamp(28px,4vw,48px)" }}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 style={{ color: cream, fontSize: 22, fontWeight: 600, marginBottom: 24 }}>How we score</h3>
              <div className="flex flex-col gap-5">
                {ratings.map(({ label, score }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ color: creamDim, fontSize: 13 }}>{label}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} fill={j < score ? gold : "transparent"} color={j < score ? gold : "rgba(225,224,204,0.2)"} />
                        ))}
                      </div>
                    </div>
                    <div style={{ height: 3, backgroundColor: "rgba(225,224,204,0.07)", borderRadius: 99, overflow: "hidden" }}>
                      <motion.div
                        style={{ height: "100%", borderRadius: 99, backgroundColor: score === 5 ? gold : score >= 4 ? terracotta : "rgba(225,224,204,0.3)" }}
                        initial={{ width: 0 }} whileInView={{ width: `${(score / 5) * 100}%` }}
                        viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-8 pt-6" style={{ borderTop: `1px solid rgba(225,224,204,0.07)` }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: cream, lineHeight: 1 }}>4.8</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={gold} color={gold} />)}
                  </div>
                  <p style={{ color: creamDim, fontSize: 12 }}>Based on 312 Google reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Auto-rotating review */}
            <motion.div
              style={{ backgroundColor: cardBg, borderRadius: 20, padding: "clamp(28px,4vw,48px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 style={{ color: cream, fontSize: 22, fontWeight: 600, marginBottom: 28 }}>What they say</h3>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reviewIdx}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={gold} color={gold} />)}
                    </div>
                    <p style={{ color: cream, fontSize: "clamp(15px,1.8vw,19px)", lineHeight: 1.65, fontStyle: "italic", fontFamily: "'Instrument Serif', serif", marginBottom: 20 }}>
                      "{reviews[reviewIdx].quote}"
                    </p>
                    <div>
                      <span style={{ color: terracotta, fontSize: 13, fontWeight: 600 }}>{reviews[reviewIdx].name}</span>
                      <span style={{ color: creamDim, fontSize: 12, marginLeft: 8 }}>— {reviews[reviewIdx].tag}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-2 mt-6">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setReviewIdx(i)} style={{ width: i === reviewIdx ? 24 : 8, height: 8, borderRadius: 99, backgroundColor: i === reviewIdx ? cream : "rgba(225,224,204,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LOCATION
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#000", padding: "0 24px 100px" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="relative overflow-hidden"
            style={{ borderRadius: 20, backgroundColor: featureBg }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Map image */}
              <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=500&fit=crop&auto=format"
                  alt="Aerial city view"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.3, filter: "grayscale(0.5)" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
                    <MapPin size={48} color={terracotta} fill={terracotta} style={{ opacity: 0.9 }} />
                  </motion.div>
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: cream, fontWeight: 600, textAlign: "center" }}>
                    12 Elm Street<br />Downtown District
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "clamp(28px,4vw,52px)" }}>
                <h3 style={{ color: cream, fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Visit us</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <MapPin size={16} color={terracotta} style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ color: cream, fontSize: 14, fontWeight: 500 }}>The Dream Cafe</p>
                      <p style={{ color: creamDim, fontSize: 13, marginTop: 2, lineHeight: 1.6 }}>
                        12 Elm Street, Downtown District<br />City Centre, 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock size={16} color={terracotta} style={{ flexShrink: 0 }} />
                    <div>
                      <p style={{ color: cream, fontSize: 14, fontWeight: 500 }}>Hours</p>
                      <p style={{ color: creamDim, fontSize: 13 }}>Mon – Sun · 7:00 AM – 10:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={16} color={terracotta} style={{ flexShrink: 0 }} />
                    <a href="tel:+15550001234" style={{ color: creamDim, fontSize: 14 }}>+1 (555) 000-1234</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Globe size={16} color={terracotta} style={{ flexShrink: 0 }} />
                    <a href="#" style={{ color: creamDim, fontSize: 14 }}>thedreamscafe.com</a>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {services.map(s => (
                      <span key={s.label} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(225,224,204,0.06)", color: creamDim, border: `1px solid rgba(225,224,204,0.1)` }}>
                        {s.icon} {s.label}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 mt-1" style={{ color: cream }}>
                    Get directions <ArrowRight size={13} style={{ transform: "rotate(-45deg)" }} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 80px" }}>
        <motion.div
          className="max-w-7xl mx-auto relative overflow-hidden"
          style={{ borderRadius: "2rem", background: "linear-gradient(135deg, #1a0c04 0%, #2C1A0E 50%, #1a0c04 100%)", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", border: `1px solid rgba(192,98,47,0.22)` }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-[2rem] overflow-hidden" style={{ backgroundImage: bgNoiseSvg, opacity: 0.07 }} />
          <div className="relative z-10 max-w-xl">
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: gold, display: "block", marginBottom: 10 }}>
              Stay in the loop
            </span>
            <h2 style={{ fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color: cream, lineHeight: 1.1, marginBottom: 14 }}>
              Join the Dream Club
            </h2>
            <p style={{ color: creamDim, fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              New seasonal menus, exclusive offers &amp; early reservations — straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl px-5 text-sm outline-none"
                style={{ height: 52, backgroundColor: "rgba(255,255,255,0.06)", color: cream, border: `1px solid rgba(225,224,204,0.12)`, fontFamily: "'Almarai', sans-serif" }}
              />
              <button className="rounded-xl font-medium text-sm whitespace-nowrap transition-opacity hover:opacity-80" style={{ height: 52, backgroundColor: cream, color: "#000", padding: "0 28px" }}>
                Join Now
              </button>
            </div>
          </div>
          <div className="absolute right-4 bottom-0 pointer-events-none select-none" style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(70px,13vw,170px)", color: "rgba(192,98,47,0.07)", lineHeight: 0.85, fontWeight: 700 }}>
            dreams.
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#000", padding: "56px 24px 28px", borderTop: `1px solid ${creamFaint}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            <div>
              <p style={{ color: cream, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>The Dream Cafe</p>
              <p style={{ color: creamDim, fontSize: 13, lineHeight: 1.7, marginBottom: 4 }}>
                12 Elm Street, Downtown District<br />City Centre, 10001
              </p>
              <p style={{ color: creamDim, fontSize: 13, marginBottom: 14 }}>Open daily · Closes at 10:00 PM</p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="flex items-center justify-center rounded-full transition-opacity hover:opacity-60" style={{ width: 34, height: 34, backgroundColor: "rgba(225,224,204,0.07)", border: `1px solid rgba(225,224,204,0.08)` }}>
                    <Icon size={14} color={creamDim} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={{ color: cream, fontWeight: 600, fontSize: 12, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Quick Links</p>
              <ul className="flex flex-col gap-3">
                {["Home", "Menu", "Our Story", "Events", "Careers"].map(l => (
                  <li key={l}><a href="#" style={{ color: creamDim, fontSize: 13 }} className="hover:text-[#E1E0CC] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p style={{ color: cream, fontWeight: 600, fontSize: 12, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Services</p>
              <ul className="flex flex-col gap-3">
                {services.map(s => (
                  <li key={s.label} className="flex items-center gap-2">
                    <Check size={12} color={terracotta} />
                    <span style={{ color: creamDim, fontSize: 13 }}>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p style={{ color: cream, fontWeight: 600, fontSize: 12, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Contact</p>
              <div className="flex flex-col gap-3">
                <a href="tel:+15550001234" className="flex items-center gap-2" style={{ color: creamDim, fontSize: 13 }}>
                  <Phone size={13} color={terracotta} /> +1 (555) 000-1234
                </a>
                <a href="#" className="flex items-center gap-2" style={{ color: creamDim, fontSize: 13 }}>
                  <Globe size={13} color={terracotta} /> thedreamscafe.com
                </a>
                <a href="#" className="flex items-center gap-2" style={{ color: terracotta, fontSize: 13, fontWeight: 600 }}>
                  <MapPin size={13} /> Get Directions →
                </a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid rgba(225,224,204,0.06)`, paddingTop: 20 }} className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p style={{ color: "rgba(225,224,204,0.22)", fontSize: 11 }}>
              © 2024 The Dream Cafe · All rights reserved
            </p>
            <a href="#" style={{ color: "rgba(225,224,204,0.22)", fontSize: 11 }}>thedreamscafe.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
