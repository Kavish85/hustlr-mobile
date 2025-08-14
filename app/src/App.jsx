import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Car,
  CheckCircle2,
  Shield,
  MessageCircle,
  Building2,
  Sun,
  Moon,
  MapPin,
  Phone,
  Mail,
  Lock,
  ChevronRight,
  Sparkles,
  Wallet,
} from "lucide-react";

/**
 * HUSTLR – Mobile App Concept Prototype (v2-classic)
 *
 * Classic look you preferred (screenshot #2):
 * - Deep navy hero with rounded search + chips
 * - Flat buttons (soft radius), light shadows
 * - Compact car cards with gradient thumbnail
 * - Bottom nav as rounded pills
 */

const colors = {
  primary: "#FCA311",
  navy: "#000B27",
  gray: "#E5E5E5",
  black: "#0B0B0B",
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

// ---------- Primitives (flat look) ----------
const R = "rounded-2xl";
const shadow = "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]";

function Btn({ children, className = "", kind = "primary", onClick }) {
  const base = `inline-flex items-center justify-center gap-2 px-4 py-2 ${R} text-[13px] transition`;
  const map = {
    primary: "text-black font-semibold",
    ghost: "bg-white border border-black/10",
    dark: "bg-black text-white font-semibold",
    outline: "border border-black/15 bg-transparent text-white",
  };
  const style = kind === "primary" ? { background: colors.primary } : {};
  return (
    <button onClick={onClick} className={`${base} ${map[kind]} ${className}`} style={style}>
      {children}
    </button>
  );
}

const Chip = ({ children, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 ${R} text-[12px] border transition ${
      selected ? "bg-black text-white border-black" : "bg-white/80 border-black/10 text-black"
    }`}
  >
    {children}
  </button>
);

const Tag = ({ children }) => (
  <span className="px-2 py-[2px] rounded-full text-[10px] bg-black/5 text-black">{children}</span>
);

function Logo({ type = "full", size = 28, color = colors.primary }) {
  if (type === "mark") {
    return (
      <div
        className="inline-flex items-center justify-center rounded-xl"
        style={{ width: size, height: size, background: color }}
      >
        <span className="text-white font-black">h</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Logo type="mark" size={28} />
      <span className="font-extrabold tracking-tight" style={{ color, fontSize: 22 }}>
        hustlr
      </span>
    </div>
  );
}

const SectionTitle = ({ icon: Icon, title, action }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={18} />}
      <h3 className="font-semibold text-[15px] tracking-tight">{title}</h3>
    </div>
    {action}
  </div>
);

// ---------- Data ----------
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

// ---------- Bits ----------
function PlaceholderImage({ lowData, angle = 0 }) {
  const shift = (angle % 360) / 360;
  return (
    <div
      className={`w-full ${R} overflow-hidden ${lowData ? "h-24" : "h-36"}`}
      style={{ background: `linear-gradient(${120 + shift * 60}deg, ${colors.navy}, ${colors.primary})` }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <Car color="white" size={lowData ? 28 : 36} />
      </div>
    </div>
  );
}

function CarCard({ car, lowData, onPriceShield }) {
  return (
    <div className={`bg-white border border-black/10 p-3 ${R} ${shadow}`}>
      <PlaceholderImage lowData={lowData} />
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-[15px] leading-tight tracking-tight">{car.title}</h4>
          <div className="text-[12px] text-black/70">
            {car.year} • {car.km}
          </div>
          <div className="text-[12px] text-black/70 flex items-center gap-1 mt-1">
            <MapPin size={12} /> {car.location}
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold">{car.price}</div>
          <span className="inline-flex items-center gap-1 text-[11px]">
            <Shield size={12} className="text-green-600" /> Verified
          </span>
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
        <Btn kind="ghost">Save</Btn>
        <Btn kind="dark">Contact dealer</Btn>
      </div>
      <Btn onClick={() => onPriceShield && onPriceShield(car)} kind="outline" className="w-full mt-2">
        <Shield size={16} /> Activate Price Shield
      </Btn>
    </div>
  );
}

// ---------- Screens ----------
function HeroSearch({ lowData, setScreen }) {
  return (
    <div className={`p-4 ${R}`} style={{ background: `linear-gradient(160deg, ${colors.navy}, #0A1336)` }}>
      <div className="flex items-center justify-between text-white">
        <Logo />
        <span className="text-white/80 text-[12px]">Low-data: {lowData ? "On" : "Off"}</span>
      </div>
      <div className="mt-4 flex items-center gap-2 bg-white rounded-2xl p-2">
        <Search size={18} />
        <input className="flex-1 bg-transparent outline-none text-[14px]" placeholder="Search make, model, or variant" />
        <Btn>Find</Btn>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {["≤ R200k", "SUV", "Under 60k km", "Auto", "4x4", "Diesel"].map((f) => (
          <span
            key={f}
            className="px-3 py-1 rounded-full bg-white/10 text-white text-[12px] border border-white/15"
          >
            {f}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Budget", icon: Wallet },
          { label: "Body type", icon: Car },
          { label: "Location", icon: MapPin },
        ].map((i) => (
          <button
            key={i.label}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 text-white py-3 border border-white/10"
          >
            <i.icon size={16} />
            <span className="text-[12px]">{i.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-3">
        <div className="w-full bg-white/10 rounded-xl overflow-hidden">
          <div className="bg-[rgba(252,163,17,1)] text-black text-[13px] font-semibold px-3 py-2 flex items-center gap-2">
            <Sparkles size={16} /> Smart Match (AI)
          </div>
        </div>
        <p className="text-white/70 text-[12px] mt-2">
          Instant recommendations from verified dealers. Protected by escrow & DEKRA-backed reports.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Btn kind="outline" className="text-white border-white/20" onClick={() => setScreen("passport")}>
            Create Passport
          </Btn>
          <Btn kind="outline" className="text-white border-white/20" onClick={() => setScreen("priceShield")}>
            Price Shield
          </Btn>
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
        <SectionTitle
          icon={Car}
          title="Fresh picks near you"
          action={
            <button
              onClick={() => setScreen("cars")}
              className="text-[12px] text-black/60 flex items-center gap-1"
            >
              See all <ChevronRight size={14} />
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-3">
          {carData.slice(0, 4).map((c) => (
            <CarCard key={c.id} car={c} lowData={lowData} onPriceShield={() => setScreen("priceShield")} />
          ))}
        </div>
      </div>

      <div className={`bg-white border border-black/10 p-4 ${R} ${shadow}`}>
        <SectionTitle icon={Shield} title="Trust layer" />
        <ul className="text-[13px] text-black/80 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={16} /> Verified, FICA/CPA-compliant dealers only
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={16} /> Escrow checkout — zero scams, zero stress
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={16} /> DEKRA vehicle condition reports
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={16} /> Immutable reviews and dispute support
          </li>
        </ul>
      </div>
    </div>
  );
}

function CarsScreen({ lowData, setScreen }) {
  const [sort] = useState("relevance");
  const [filters, setFilters] = useState({ escrow: true, verified: true });
  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 -mx-4 px-4 pt-2 pb-3 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl border border-black/10 px-3 py-2 bg-white">
            <Search size={18} />
            <input className="flex-1 outline-none text-[14px]" placeholder="Search cars" />
            <span className="text-[12px] px-2 py-1 rounded-lg border border-black/10">{sort}</span>
          </div>
          <button className="px-3 py-2 rounded-2xl border border-black/10">
            <Filter size={18} />
          </button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
          <Chip
            selected={filters.verified}
            onClick={() => setFilters({ ...filters, verified: !filters.verified })}
          >
            Verified only
          </Chip>
          <Chip selected={filters.escrow} onClick={() => setFilters({ ...filters, escrow: !filters.escrow })}>
            Escrow
          </Chip>
          <Chip>≤ R300k</Chip>
          <Chip>Under 80k km</Chip>
          <Chip>Automatic</Chip>
        </div>
      </div>
      <div className={`grid grid-cols-2 gap-3`}>
        {carData.concat(carData).map((c, i) => (
          <CarCard key={`${c.id}-${i}`} car={c} lowData={lowData} onPriceShield={() => setScreen("priceShield")} />
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hey! I’m Hustlr. Tell me your budget & needs and I’ll shortlist safe options from verified dealers.",
    },
    { role: "user", text: "SUV, automatic, under R300k, low mileage." },
    { role: "ai", text: "Got it. I’ll filter by verified dealers and escrow-ready cars. Want finance pre-approval?" },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input.trim() },
      {
        role: "ai",
        text:
          "Thanks — I’ve updated your preferences. I’ll ping dealers now, negotiate and share 3 matches within minutes.",
      },
    ]);
    setInput("");
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-[14px] ${
              m.role === "ai" ? "bg-black/5" : "bg-black text-white ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2 p-2 rounded-2xl border border-black/10 bg-white">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 outline-none text-[14px]"
          />
          <Btn>Send</Btn>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            "Get finance pre-approval",
            "Request quotes from dealers",
            "Share my location",
            "Show escrow-only",
          ].map((q) => (
            <Chip key={q} onClick={() => setInput(q)}>
              {q}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQScreen() {
  const items = [
    {
      q: "What makes Hustlr safer?",
      a:
        "We only list verified, FICA/CPA-compliant dealers. Payments run through escrow and every car can include a DEKRA report.",
    },
    {
      q: "How does escrow work?",
      a:
        "Your funds are held by a trusted third-party and released to the dealer only after you confirm delivery and condition.",
    },
    {
      q: "Is Hustlr free?",
      a: "Browsing is free. Optional services like delivery, extended warranties, and finance carry transparent fees.",
    },
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
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-3 pb-3 text-[13px] text-black/80"
              >
                {it.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function InputField({ icon: Icon, type = "text", placeholder }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-black/10 bg-white">
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
        <h2 className="text-xl font-bold mt-2 tracking-tight">Welcome back</h2>
        <p className="text-black/60 text-[13px]">Sign in to sync favourites and bookings</p>
      </div>
      <InputField icon={Phone} placeholder="Mobile number" />
      <Btn kind="dark" className="w-full">
        Continue with OTP
      </Btn>
      <div className="flex items-center gap-2 text-[12px] text-black/60">
        <div className="flex-1 h-px bg-black/10" />
        <span>or</span>
        <div className="flex-1 h-px bg-black/10" />
      </div>
      <InputField icon={Mail} type="email" placeholder="Email address" />
      <InputField icon={Lock} type="password" placeholder="Password" />
      <Btn className="w-full">Sign in</Btn>
      <p className="text-[12px] text-black/60 text-center">
        By continuing you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}

function LoginDealer() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Logo />
        <h2 className="text-xl font-bold mt-2 tracking-tight">Dealer sign-in</h2>
        <p className="text-black/60 text-[13px]">Access leads, listings & performance tools</p>
      </div>
      <InputField icon={Building2} placeholder="Dealership / Group" />
      <InputField icon={Mail} type="email" placeholder="Work email" />
      <InputField icon={Lock} type="password" placeholder="Password" />
      <Btn kind="dark" className="w-full">
        Sign in
      </Btn>
      <Btn kind="ghost" className="w-full">
        Become a verified dealer
      </Btn>
    </div>
  );
}

function ConfirmationScreen() {
  return (
    <div className="text-center space-y-3">
      <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: colors.primary }}>
        <CheckCircle2 size={40} className="text-black" />
      </div>
      <h2 className="text-xl font-bold tracking-tight">Request sent to dealer</h2>
      <p className="text-[13px] text-black/70">
        We’ve shared your details securely. The dealership will contact you within 2 hours. Your number is hidden until
        you accept.
      </p>
      <div className="rounded-2xl p-3 border border-black/10 text-left bg-white">
        <div className="flex items-center justify-between text-[13px]">
          <span>Vehicle</span>
          <strong>VW Polo 1.0 TSI</strong>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span>Dealer</span>
          <strong>Hustlr Verified Motors</strong>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span>Ref</span>
          <strong>#HX43928</strong>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Btn kind="ghost">View matches</Btn>
        <Btn kind="dark">Chat to Hustlr</Btn>
      </div>
    </div>
  );
}

// ----- Stubs for next-stage screens (kept simple) -----
const PassportScreen = () => <div className="text-[14px]">Passport (stub)</div>;
const PriceShieldScreen = () => <div className="text-[14px]">Price Shield (stub)</div>;
const LedgerScreen = () => <div className="text-[14px]">Ledger (stub)</div>;
const LowDataPlusScreen = () => <div className="text-[14px]">Low-Data+ (stub)</div>;
const ShowroomLiteScreen = () => <div className="text-[14px]">Showroom (stub)</div>;
const FutureScreen = () => <div className="text-[14px]">Next (stub)</div>;

// ---------- Shell + device ----------
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
        return <FutureScreen />;
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
    <div className="min-h-[100dvh] bg-[#EFEFEF] text-black">
      <div className="max-w-md mx-auto px-4 pb-28 pt-5">
        <div className="flex items-center justify-between mb-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Btn kind="ghost" onClick={() => setLowData((v) => !v)} className="px-2 py-1 text-[11px]">
              {lowData ? "Low-data" : "HD"}
            </Btn>
            <Btn kind="ghost" onClick={() => setDark((v) => !v)} className="p-2">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </Btn>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {Screen}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 inset-x-0 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="max-w-md mx-auto px-2 py-2 grid grid-cols-4 gap-2">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setScreen(s.id)}
              className={`px-3 py-2 ${R} text-[12px] border ${
                screen === s.id ? "bg-black text-white border-black" : "bg-white border-black/10"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="max-w-md mx-auto px-4 pb-3">
          <div className="mt-2 h-1 rounded-full" style={{ background: colors.primary }} />
        </div>
      </div>
    </div>
  );
}

function DeviceFrame({ children }) {
  // iPhone 14 Pro Max framing (visual only)
  return (
    <div className="w-full min-h-[100dvh] grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#fff,#ececec)]">
      <div className="relative" style={{ width: 430 + 56, height: 932 + 56 }}>
        {/* Outer body */}
        <div
          className="absolute inset-0 rounded-[56px] shadow-2xl"
          style={{ background: "linear-gradient(135deg,#121212,#2a2a2a)" }}
        />
        {/* Bezel */}
        <div className="absolute inset-[14px] rounded-[46px]" style={{ background: "#0a0a0a" }} />
        {/* Screen */}
        <div className="absolute inset-[20px] rounded-[40px] overflow-hidden bg-black">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-black z-20 shadow" />
          {/* App content */}
          <div className="h-full w-full overflow-hidden">
            <div className="h-full w-full overflow-y-auto no-scrollbar">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HustlrAppDeviceMock() {
  // Inject Inter font so Vercel matches our canvas typography
  useEffect(() => {
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
    document.head.appendChild(link);
  }, []);

  return (
    <DeviceFrame>
      <div
        style={{
          fontFamily:
            'Inter, ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial',
        }}
      >
        <AppShell />
      </div>
    </DeviceFrame>
  );
}
// TEMP: Tailwind CDN fallback if built CSS fails to load on Vercel
useEffect(() => {
  if (!document.querySelector('script[data-hustlr-tailwind]')) {
    const s = document.createElement("script");
    s.src = "https://cdn.tailwindcss.com";
    s.setAttribute("data-hustlr-tailwind", "1");
    document.head.appendChild(s);
  }
}, []);
