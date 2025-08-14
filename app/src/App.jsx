import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Car,
  CheckCircle2,
  Shield,
  MessageCircle,
  LogIn,
  User,
  Building2,
  Globe,
  HelpCircle,
  Sun,
  Moon,
  MapPin,
  Phone,
  Mail,
  Lock,
  ChevronRight,
  Sparkles,
  Wallet,
  Languages,
  HandCoins,
  Star,
  Clock3,
  ArrowRight,
  Share2,
  FileText,
  QrCode,
  Camera,
  RotateCcw,
} from "lucide-react";

/**
 * HUSTLR – Mobile App Concept Prototype (v2)
 *
 * New in v2
 * - iPhone 14 Pro Max mock device frame
 * - Build-out of the "Next Stage" features:
 *   • Hustlr Passport
 *   • Price Shield
 *   • Proof-of-Trust Ledger
 *   • Low-Data Mode+
 *   • 360° Showroom Lite
 *   • Concierge Chat upgrades
 */

const colors = {
  primary: "#FCA311", // Hustlr orange
  navy: "#000B27",
  gray: "#E5E5E5",
  black: "#000000",
  white: "#FFFFFF",
};

const screens = [
  { id: "home", label: "Home" },
  { id: "cars", label: "Cars" },
  { id: "chat", label: "AI Chat" },
  { id: "faq", label: "FAQ" },
  { id: "loginUser", label: "Customer" },
  { id: "loginDealer", label: "Dealer" },
  { id: "confirm", label: "Confirm" },
  { id: "future", label: "Next" },
  { id: "passport", label: "Passport" },
  { id: "priceShield", label: "Shield" },
  { id: "ledger", label: "Ledger" },
  { id: "showroom", label: "Showroom" },
  { id: "lowDataPlus", label: "LowData+" },
];

function Logo({ type = "full", size = 28, color = colors.primary }) {
  if (type === "mark") {
    return (
      <div
        aria-label="Hustlr"
        className="inline-flex items-center justify-center rounded-xl font-black"
        style={{ width: size, height: size, background: color }}
      >
        <span className="text-white text-lg leading-none">h</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Logo type="mark" size={28} />
      <span
        className="font-extrabold tracking-tight"
        style={{ color, fontSize: 22 }}
      >
        hustlr
      </span>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} />}
        <h3 className="font-semibold text-[15px]">{title}</h3>
      </div>
      {action}
    </div>
  );
}

function Pill({ children, onClick, selected = false }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-[12px] border transition ${
        selected
          ? "bg-black text-white border-black"
          : "bg-white text-black border-black/10"
      }`}
    >
      {children}
    </button>
  );
}

function Tag({ children }) {
  return (
    <span className="px-2 py-[2px] rounded-full text-[10px] bg-black/5 text-black">
      {children}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-black">
      <Shield size={12} className="text-green-600" /> Verified dealer
    </span>
  );
}

const carData = [
  {
    id: 1,
    title: "Aston Martin Vantage",
    year: 2022,
    price: "R2 799 000",
    km: "9 800 km",
    location: "Sandton, GP",
    tags: ["Escrow", "DEKRA report"],
    fair: "R2.74m – R2.89m",
  },
  {
    id: 2,
    title: "VW Polo 1.0 TSI Comfortline",
    year: 2021,
    price: "R279 900",
    km: "31 200 km",
    location: "Umhlanga, KZN",
    tags: ["Best value", "Finance ready"],
    fair: "R265k – R290k",
  },
  {
    id: 3,
    title: "Toyota Hilux 2.8 GD-6 Legend 4x4",
    year: 2023,
    price: "R789 000",
    km: "12 500 km",
    location: "Centurion, GP",
    tags: ["Popular", "Escrow"],
    fair: "R770k – R815k",
  },
  {
    id: 4,
    title: "BMW X3 xDrive20d M Sport",
    year: 2020,
    price: "R599 000",
    km: "58 000 km",
    location: "Cape Town, WC",
    tags: ["DEKRA report", "New tyres"],
    fair: "R580k – R615k",
  },
];

function PlaceholderImage({ ratio = "16/9", lowData, angle = 0 }) {
  // gradient shifts a bit with angle to mimic 360 viewer
  const shift = (angle % 360) / 360;
  return (
    <div
      className={`w-full rounded-2xl overflow-hidden ${lowData ? "h-24" : "h-36"}`}
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(${120 + shift * 60}deg, ${colors.navy}, ${colors.primary})`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <Car color="white" size={lowData ? 28 : 36} style={{ transform: `rotateY(${angle}deg)` }} />
      </div>
    </div>
  );
}

function CarCard({ car, lowData, onPriceShield }) {
  return (
    <motion.div layout className="rounded-2xl border border-black/10 p-3 bg-white shadow-sm">
      <PlaceholderImage lowData={lowData} />
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-[15px] leading-tight">{car.title}</h4>
          <div className="text-[12px] text-black/70">{car.year} • {car.km}</div>
          <div className="text-[12px] text-black/70 flex items-center gap-1 mt-1">
            <MapPin size={12} /> {car.location}
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold">{car.price}</div>
          <VerifiedBadge />
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 items-center">
        {car.tags.map((t, i) => (
          <Tag key={i}>{t}</Tag>
        ))}
        <Tag>Price Shield</Tag>
        <span className="text-[11px] text-black/60 ml-auto">Fair: {car.fair}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="px-3 py-2 rounded-xl text-[13px] font-medium border border-black/10">Save</button>
        <button className="px-3 py-2 rounded-xl text-[13px] font-semibold text-white" style={{ background: colors.black }}>Contact dealer</button>
      </div>
      <button onClick={() => onPriceShield && onPriceShield(car)} className="mt-2 w-full px-3 py-2 rounded-xl text-[13px] border border-black/10 flex items-center justify-center gap-2">
        <Shield size={16} /> Activate Price Shield
      </button>
    </motion.div>
  );
}

function HeroSearch({ lowData, setScreen }) {
  return (
    <div className="rounded-3xl p-4" style={{ background: colors.navy }}>
      <div className="flex items-center justify-between">
        <Logo />
        <span className="text-white/80 text-[12px]">Low‑data: {lowData ? "On" : "Off"}</span>
      </div>
      <div className="mt-4 flex items-center gap-2 bg-white rounded-2xl p-2">
        <Search size={18} />
        <input className="flex-1 bg-transparent outline-none text-[14px]" placeholder="Search make, model, or variant" />
        <button className="px-3 py-1 rounded-xl text-[12px] font-semibold text-white" style={{ background: colors.primary }}>Find</button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {["≤ R200k", "SUV", "Under 60k km", "Auto", "4x4", "Diesel"].map((f) => (
          <span key={f} className="px-3 py-1 rounded-full bg-white/10 text-white text-[12px] border border-white/20">{f}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Budget", icon: Wallet },
          { label: "Body type", icon: Car },
          { label: "Location", icon: MapPin },
        ].map((i) => (
          <button key={i.label} className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 text-white py-3">
            <i.icon size={16} />
            <span className="text-[12px]">{i.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={() => setScreen("chat")} className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-black font-semibold" style={{ background: colors.primary }}>
          <Sparkles size={18} /> Smart Match (AI)
        </button>
        <p className="text-white/70 text-[12px] mt-2">Instant recommendations from verified dealers. Protected by escrow & DEKRA‑backed reports.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => setScreen("passport")} className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white text-[13px]">Create Passport</button>
          <button onClick={() => setScreen("priceShield")} className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white text-[13px]">Price Shield</button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ lowData, setScreen }) {
  return (
    <div className="space-y-6">
      <HeroSearch lowData={lowData} setScreen={setScreen} />

      <div className="px-1">
        <SectionTitle icon={Car} title="Fresh picks near you" action={<button onClick={() => setScreen("cars")} className="text-[12px] text-black/60 flex items-center gap-1">See all <ChevronRight size={14} /></button>} />
        <div className="grid grid-cols-2 gap-3">
          {carData.slice(0, 4).map((c) => (
            <CarCard key={c.id} car={c} lowData={lowData} onPriceShield={() => setScreen("priceShield")} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white border border-black/10">
        <SectionTitle icon={Shield} title="Trust layer" />
        <ul className="text-[13px] text-black/80 space-y-2">
          <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16} /> Verified, FICA/CPA‑compliant dealers only</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16} /> Escrow checkout — zero scams, zero stress</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16} /> DEKRA vehicle condition reports</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16} /> Immutable reviews and dispute support</li>
        </ul>
      </div>

      <div className="rounded-2xl p-4 border border-black/10 bg-[conic-gradient(at_top_left,var(--tw-gradient-stops))] from-white via-[#FFF6E6] to-white">
        <SectionTitle icon={MessageCircle} title="Need a hand?" />
        <p className="text-[13px] text-black/80">Chat to Hustlr — your AI buying assistant. Speak, type, or use WhatsApp.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => setScreen("chat")} className="px-3 py-2 rounded-xl border border-black/10 text-[13px] font-medium">Open chat</button>
          <button onClick={() => setScreen("future")} className="px-3 py-2 rounded-xl text-[13px] font-semibold text-white" style={{ background: colors.black }}>See what’s next</button>
        </div>
      </div>
    </div>
  );
}

function CarsScreen({ lowData, setScreen }) {
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("relevance");
  const [filters, setFilters] = useState({ escrow: true, verified: true, price: "Any" });
  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 -mx-4 px-4 pt-2 pb-3 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl border border-black/10 px-3 py-2 bg-white">
            <Search size={18} />
            <input className="flex-1 outline-none text-[14px]" placeholder="Search cars" />
            <button className="text-[12px] px-2 py-1 rounded-lg border border-black/10">{sort}</button>
          </div>
          <button className="px-3 py-2 rounded-2xl border border-black/10"><Filter size={18} /></button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
          <Pill selected={filters.verified} onClick={() => setFilters({ ...filters, verified: !filters.verified })}>Verified only</Pill>
          <Pill selected={filters.escrow} onClick={() => setFilters({ ...filters, escrow: !filters.escrow })}>Escrow</Pill>
          <Pill>≤ R300k</Pill>
          <Pill>Under 80k km</Pill>
          <Pill>Automatic</Pill>
        </div>
      </div>

      <div className={`grid ${view === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
        {carData.concat(carData).map((c, i) => (
          <CarCard key={`${c.id}-${i}`} car={c} lowData={lowData} onPriceShield={() => setScreen("priceShield")} />
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I’m Hustlr. Tell me your budget & needs and I’ll shortlist safe options from verified dealers." },
    { role: "user", text: "SUV, automatic, under R300k, low mileage." },
    { role: "ai", text: "Got it. I’ll filter by verified dealers and escrow‑ready cars. Want finance pre‑approval?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input.trim() },
      { role: "ai", text: "Thanks — I’ve updated your preferences. I’ll ping dealers now, negotiate and share 3 matches within minutes." },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-[14px] ${m.role === "ai" ? "bg-black/5" : "bg-black text-white ml-auto"}`}>{m.text}</div>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 p-2 rounded-2xl border border-black/10 bg-white">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 outline-none text-[14px]" />
          <button onClick={send} className="px-3 py-2 rounded-xl text-[13px] font-semibold text-white" style={{ background: colors.primary }}>Send</button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
          {["Get finance pre‑approval", "Request quotes from dealers", "Share my location", "Show escrow‑only"].map((q) => (
            <button key={q} onClick={() => setInput(q)} className="px-3 py-1 rounded-full border border-black/10 text-[12px]">{q}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQScreen() {
  const items = [
    { q: "What makes Hustlr safer?", a: "We only list verified, FICA/CPA‑compliant dealers. Payments run through escrow and every car can include a DEKRA report." },
    { q: "How does escrow work?", a: "Your funds are held by a trusted third‑party and released to the dealer only after you confirm delivery and condition." },
    { q: "Is Hustlr free?", a: "Browsing is free. Optional services like delivery, extended warranties, and finance carry transparent fees." },
    { q: "Do you support local languages?", a: "Yes. We’re rolling out isiZulu, isiXhosa, Sesotho, Afrikaans, and more — including voice chat." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-black/10 bg-white overflow-hidden">
          <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-3">
            <span className="text-left font-medium text-[14px]">{it.q}</span>
            <ChevronRight className={`transition ${open === i ? "rotate-90" : ""}`} size={18} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-3 pb-3 text-[13px] text-black/80">{it.a}</motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function InputField({ icon: Icon, type = "text", placeholder }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black/10 bg-white">
      {Icon && <Icon size={16} className="text-black/60" />}
      <input type={type} placeholder={placeholder} className="flex-1 outline-none text-[14px]" />
    </div>
  );
}

function LoginCustomer() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Logo />
        <h2 className="text-xl font-bold mt-2">Welcome back</h2>
        <p className="text-black/60 text-[13px]">Sign in to sync favourites and bookings</p>
      </div>
      <InputField icon={Phone} placeholder="Mobile number" />
      <button className="w-full px-3 py-3 rounded-xl text-[14px] font-semibold text-white" style={{ background: colors.black }}>Continue with OTP</button>
      <div className="flex items-center gap-2 text-[12px] text-black/60"><div className="flex-1 h-px bg-black/10"/><span>or</span><div className="flex-1 h-px bg-black/10"/></div>
      <InputField icon={Mail} type="email" placeholder="Email address" />
      <InputField icon={Lock} type="password" placeholder="Password" />
      <button className="w-full px-3 py-3 rounded-xl text-[14px] font-semibold text-white" style={{ background: colors.primary }}>Sign in</button>
      <p className="text-[12px] text-black/60 text-center">By continuing you agree to our Terms and Privacy Policy.</p>
    </div>
  );
}

function LoginDealer() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Logo />
        <h2 className="text-xl font-bold mt-2">Dealer sign‑in</h2>
        <p className="text-black/60 text-[13px]">Access leads, listings & performance tools</p>
      </div>
      <InputField icon={Building2} placeholder="Dealership / Group" />
      <InputField icon={Mail} type="email" placeholder="Work email" />
      <InputField icon={Lock} type="password" placeholder="Password" />
      <button className="w-full px-3 py-3 rounded-xl text-[14px] font-semibold text-white" style={{ background: colors.black }}>Sign in</button>
      <button className="w-full px-3 py-3 rounded-xl text-[14px] font-semibold border border-black/10">Become a verified dealer</button>
      <ul className="text-[12px] text-black/70 space-y-1">
        <li className="flex items-center gap-2"><Shield size={14} className="text-green-600"/> FICA/CPA compliance required</li>
        <li className="flex items-center gap-2"><Star size={14}/> Reputation & reviews dashboard</li>
        <li className="flex items-center gap-2"><HandCoins size={14}/> Escrow payouts, fast</li>
      </ul>
    </div>
  );
}

function ConfirmationScreen() {
  return (
    <div className="text-center space-y-3">
      <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: colors.primary }}>
        <CheckCircle2 size={40} className="text-black" />
      </div>
      <h2 className="text-xl font-bold">Request sent to dealer</h2>
      <p className="text-[13px] text-black/70">We’ve shared your details securely. The dealership will contact you within 2 hours. Your number is hidden until you accept.</p>
      <div className="rounded-2xl p-3 border border-black/10 text-left bg-white">
        <div className="flex items-center justify-between text-[13px]"><span>Vehicle</span><strong>VW Polo 1.0 TSI</strong></div>
        <div className="flex items-center justify-between text-[13px]"><span>Dealer</span><strong>Hustlr Verified Motors</strong></div>
        <div className="flex items-center justify-between text-[13px]"><span>Ref</span><strong>#HX43928</strong></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="px-3 py-2 rounded-xl border border-black/10">View matches</button>
        <button className="px-3 py-2 rounded-xl text-white font-semibold" style={{ background: colors.black }}>Chat to Hustlr</button>
      </div>
    </div>
  );
}

// ---------- Next-stage feature build-outs ----------
function PassportScreen() {
  const [kyc, setKyc] = useState({ id: false, licence: false, address: false, finance: true });
  const complete = Object.values(kyc).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4" style={{ background: colors.navy }}>
        <h2 className="text-white text-xl font-bold">Hustlr Passport</h2>
        <p className="text-white/80 text-[13px] mt-1">A portable, verified profile for one‑tap applications across dealers.</p>
      </div>
      <div className="rounded-2xl p-4 border border-black/10 bg-white">
        <div className="flex items-center justify-between">
          <strong>Verification progress</strong>
          <span className="text-[12px]">{complete}/4</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => setKyc({ ...kyc, id: true })} className={`px-3 py-2 rounded-xl border text-left ${kyc.id ? "border-green-500" : "border-black/10"}`}>
            <div className="text-[12px]">South African ID</div>
            <div className="text-[11px] text-black/60">Scan with camera</div>
          </button>
          <button onClick={() => setKyc({ ...kyc, licence: true })} className={`px-3 py-2 rounded-xl border text-left ${kyc.licence ? "border-green-500" : "border-black/10"}`}>
            <div className="text-[12px]">Driver’s licence</div>
            <div className="text-[11px] text-black/60">Upload front/back</div>
          </button>
          <button onClick={() => setKyc({ ...kyc, address: true })} className={`px-3 py-2 rounded-xl border text-left ${kyc.address ? "border-green-500" : "border-black/10"}`}>
            <div className="text-[12px]">Proof of address</div>
            <div className="text-[11px] text-black/60">PDF or photo</div>
          </button>
          <button onClick={() => setKyc({ ...kyc, finance: true })} className={`px-3 py-2 rounded-xl border text-left ${kyc.finance ? "border-green-500" : "border-black/10"}`}>
            <div className="text-[12px]">Finance preferences</div>
            <div className="text-[11px] text-black/60">Budget, term, deposit</div>
          </button>
        </div>
        <button className="mt-3 w-full px-3 py-3 rounded-xl text-white font-semibold" style={{ background: colors.black }}>One‑tap apply to dealers</button>
      </div>
      <div className="rounded-2xl p-4 border border-black/10 bg-white">
        <strong className="block">Share as QR</strong>
        <p className="text-[13px] text-black/70">Let dealers scan your Passport securely in‑store.</p>
        <div className="mt-2 flex items-center gap-2">
          <button className="px-3 py-2 rounded-xl border border-black/10 flex items-center gap-2"><QrCode size={16}/> Generate</button>
          <button className="px-3 py-2 rounded-xl border border-black/10 flex items-center gap-2"><Share2 size={16}/> Share link</button>
        </div>
      </div>
    </div>
  );
}

function PriceShieldScreen() {
  const [locked, setLocked] = useState(false);
  const [hours, setHours] = useState(48);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4" style={{ background: colors.navy }}>
        <h2 className="text-white text-xl font-bold">Price Shield</h2>
        <p className="text-white/80 text-[13px] mt-1">Lock today’s fair price for 48h. If price drops before handover, you pay the new price.</p>
      </div>
      <div className="rounded-2xl p-4 border border-black/10 bg-white space-y-2">
        <div className="flex items-center justify-between"><span className="text-[13px]">Watchlist</span><Tag>12 cars</Tag></div>
        <div className="rounded-xl p-3 bg-black/5 text-[13px]">Fair price band for VW Polo: <strong>R265k – R290k</strong>. Dealer offer: <strong>R279.9k</strong>.</div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setLocked(true)} className="px-3 py-2 rounded-xl text-white font-semibold" style={{ background: colors.black }}>{locked ? "Locked" : "Lock for 48h"}</button>
          <button className="px-3 py-2 rounded-xl border border-black/10">Add more cars</button>
        </div>
        {locked && <div className="text-[12px] text-black/70">Shield active. Expires in <strong>{hours}h</strong>. We’ll auto‑adjust if the dealer drops price.</div>}
      </div>
    </div>
  );
}

function LedgerScreen() {
  const items = [
    { id: "#E3F9", dealer: "Verified Motors", car: "VW Polo 1.0 TSI", amount: "R279 900", status: "Escrow released" },
    { id: "#D7B2", dealer: "City Auto", car: "Toyota Hilux 2.8 GD‑6", amount: "R789 000", status: "In escrow" },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4" style={{ background: colors.navy }}>
        <h2 className="text-white text-xl font-bold">Proof‑of‑Trust Ledger</h2>
        <p className="text-white/80 text-[13px] mt-1">Immutable receipts + verified reviews. Transparent histories for buyers and dealers.</p>
      </div>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl p-3 border border-black/10 bg-white">
            <div className="text-[13px] flex items-center justify-between"><strong>{it.car}</strong><span>{it.amount}</span></div>
            <div className="text-[12px] text-black/70">{it.dealer} • Ref {it.id}</div>
            <div className="text-[12px] mt-1"><Tag>{it.status}</Tag></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LowDataPlusScreen() {
  const [compress, setCompress] = useState(true);
  const [prefetch, setPrefetch] = useState(true);
  const [fallback, setFallback] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4" style={{ background: colors.navy }}>
        <h2 className="text-white text-xl font-bold">Low‑Data Mode+</h2>
        <p className="text-white/80 text-[13px] mt-1">Adaptive compression, offline steps, and USSD/SMS fallback for patchy coverage.</p>
      </div>
      <div className="rounded-2xl p-4 border border-black/10 bg-white space-y-2">
        <label className="flex items-center justify-between text-[14px]"><span>Auto‑compress images & 360</span><input type="checkbox" checked={compress} onChange={() => setCompress(!compress)} /></label>
        <label className="flex items-center justify-between text-[14px]"><span>Prefetch on Wi‑Fi</span><input type="checkbox" checked={prefetch} onChange={() => setPrefetch(!prefetch)} /></label>
        <label className="flex items-center justify-between text-[14px]"><span>Enable USSD/SMS fallback</span><input type="checkbox" checked={fallback} onChange={() => setFallback(!fallback)} /></label>
        {fallback && <div className="text-[12px] text-black/70">Fallback engaged. We’ll switch to SMS updates if the signal dips.</div>}
      </div>
    </div>
  );
}

function ShowroomLiteScreen() {
  const [angle, setAngle] = useState(0);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-4" style={{ background: colors.navy }}>
        <h2 className="text-white text-xl font-bold">360° Showroom Lite</h2>
        <p className="text-white/80 text-[13px] mt-1">Lightweight 360 viewer you can share over WhatsApp — no heavy assets.</p>
      </div>
      <div className="rounded-2xl p-4 border border-black/10 bg-white">
        <PlaceholderImage lowData={false} angle={angle} />
        <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full mt-3" />
        <div className="flex items-center gap-2 mt-2">
          <button className="px-3 py-2 rounded-xl border border-black/10 flex items-center gap-2"><RotateCcw size={16}/> Reset</button>
          <button className="px-3 py-2 rounded-xl border border-black/10 flex items-center gap-2"><Share2 size={16}/> Share WhatsApp</button>
        </div>
      </div>
    </div>
  );
}

function FutureScreen({ setScreen }) {
  const items = [
    { title: "Hustlr Passport", icon: Shield, desc: "A portable, verified profile with your KYC, licence & finance preferences. One‑tap apply anywhere.", to: "passport" },
    { title: "Price Shield", icon: HandCoins, desc: "AI watches the market and locks a fair price for 48h. If the dealer lowers it, you pay the new price.", to: "priceShield" },
    { title: "Proof‑of‑Trust Ledger", icon: Star, desc: "Immutable reviews + transaction receipts. Dealers showcase real service, buyers get transparent history.", to: "ledger" },
    { title: "Low‑Data Mode+", icon: Clock3, desc: "Auto‑compresses media, prefetches on Wi‑Fi, and switches to SMS/USSD where coverage is weak.", to: "lowDataPlus" },
    { title: "360° Showroom Lite", icon: Car, desc: "Tap to open a lightweight 360° viewer. Shareable via WhatsApp links.", to: "showroom" },
    { title: "Concierge Chat", icon: MessageCircle, desc: "Your AI negotiator gathers quotes, books test drives and handles paperwork end‑to‑end.", to: "chat" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-4" style={{ background: colors.navy }}>
        <h2 className="text-white text-xl font-bold">The next evolution</h2>
        <p className="text-white/80 text-[13px] mt-1">From listings to an intelligent, trusted buying flow — built for SA realities.</p>
      </div>
      {items.map((it, i) => (
        <button key={i} onClick={() => setScreen(it.to)} className="rounded-2xl p-4 border border-black/10 bg-white text-left">
          <div className="flex items-start gap-3">
            <it.icon size={18} />
            <div>
              <h4 className="font-semibold">{it.title}</h4>
              <p className="text-[13px] text-black/75">{it.desc}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// --------------------------------------------------
// App shell with iPhone 14 Pro Max mock device frame
// --------------------------------------------------
function AppShell() {
  const [screen, setScreen] = useState("home");
  const [lowData, setLowData] = useState(true);
  const [dark, setDark] = useState(false);

  const Screen = useMemo(() => {
    switch (screen) {
      case "home":
        return <HomeScreen lowData={lowData} setScreen={setScreen} />;
      case "cars":
        return <CarsScreen lowData={lowData} setScreen={setScreen} />;
      case "chat":
        return <ChatScreen />;
      case "faq":
        return <FAQScreen />;
      case "loginUser":
        return <LoginCustomer />;
      case "loginDealer":
        return <LoginDealer />;
      case "confirm":
        return <ConfirmationScreen />;
      case "future":
        return <FutureScreen setScreen={setScreen} />;
      case "passport":
        return <PassportScreen />;
      case "priceShield":
        return <PriceShieldScreen />;
      case "ledger":
        return <LedgerScreen />;
      case "showroom":
        return <ShowroomLiteScreen />;
      case "lowDataPlus":
        return <LowDataPlusScreen />;
      default:
        return null;
    }
  }, [screen, lowData]);

  return (
    <div className={`min-h-[100dvh] ${dark ? "bg-black text-white" : "bg-[#EFEFEF] text-black"}`}>
      <div className="max-w-md mx-auto px-4 pb-28 pt-5">
        {/* Top meta bar */}
        <div className="flex items-center justify-between mb-4">
          <Logo />
          <div className="flex items-center gap-2">
            <button onClick={() => setLowData((v) => !v)} className="px-2 py-1 rounded-lg text-[11px] border border-black/10 bg-white" title="Toggle low‑data mode">{lowData ? "Low‑data" : "HD"}</button>
            <button onClick={() => setDark((v) => !v)} className="p-2 rounded-lg border border-black/10 bg-white" title="Toggle theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
            {Screen}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 inset-x-0 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="max-w-md mx-auto px-2 py-2 grid grid-cols-4 gap-2">
          {screens.slice(0, 4).map((s) => (
            <button key={s.id} onClick={() => setScreen(s.id)} className={`px-3 py-2 rounded-2xl text-[12px] border ${screen === s.id ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>{s.label}</button>
          ))}
          {screens.slice(4).map((s) => (
            <button key={s.id} onClick={() => setScreen(s.id)} className={`px-3 py-2 rounded-2xl text-[12px] border ${screen === s.id ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>{s.label}</button>
          ))}
        </div>
        <div className="max-w-md mx-auto px-4 pb-3"><div className="mt-2 h-1 rounded-full" style={{ background: colors.primary }} /></div>
      </div>
    </div>
  );
}

function DeviceFrame({ children }) {
  // iPhone 14 Pro Max logical size ~430x932
  return (
    <div className="w-full min-h-[100dvh] grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#fff,#e9e9e9)]">
      <div className="relative" style={{ width: 430 + 56, height: 932 + 56 }}>
        {/* Outer body */}
        <div className="absolute inset-0 rounded-[56px] shadow-2xl" style={{ background: "linear-gradient(135deg,#121212,#2a2a2a)" }} />
        {/* Bezel */}
        <div className="absolute inset-[14px] rounded-[46px]" style={{ background: "#0a0a0a" }} />
        {/* Screen */}
        <div className="absolute inset-[20px] rounded-[40px] overflow-hidden bg-black">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-black z-20 shadow" />
          {/* App content */}
          <div className="h-full w-full overflow-hidden">
            <div className="h-full w-full overflow-y-auto no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HustlrAppDeviceMock() {
  return (
    <DeviceFrame>
      <AppShell />
    </DeviceFrame>
  );
}
