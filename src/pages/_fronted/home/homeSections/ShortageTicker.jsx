import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getBloodShortageStats } from "@/services/publicAPI";

const BLOOD_TYPES = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
const LS_KEY = "bloodaid_ticker_dismissed_at";

export default function ShortageTicker({
  endpoint = "/stats/shortage",
  maxItems = 8,
  sticky = false,
}) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useState(() => !shouldHideToday());

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const result = await getBloodShortageStats();
        if (active) {
          if (result.success) {
            setRows(Array.isArray(result.data) ? result.data : []);
          } else {
            setRows(MOCK_SHORTAGE);
          }
        }
      } catch {
        if (active) setRows(MOCK_SHORTAGE);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [endpoint]);

  const items = useMemo(() => flattenShortages(rows, maxItems), [rows, maxItems]);

  if (!visible) return null;

  return (
    <section
      className={[
        "w-full py-4",
        sticky ? "sticky top-20 z-40" : "",
      ].join(" ")}
      aria-label="Shortage ticker"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-full glass-panel px-4 py-2 flex items-center gap-4">
          
          {/* Left label + CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Urgent</span>
            </div>
            <Link to="/urgent" className="text-xs font-medium text-gray-300 hover:text-white transition-colors">
              View All
            </Link>
            <div className="h-4 w-px bg-white/10"></div>
          </div>

          {/* Ticker */}
          <Ticker loading={loading} items={items} />

          {/* Dismiss */}
          <button
            type="button"
            aria-label="Dismiss"
            className="ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => {
              localStorage.setItem(LS_KEY, new Date().toDateString());
              setVisible(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* keyframes for marquee */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ----------------- Subcomponents ----------------- */

function Ticker({ loading, items }) {
  if (loading) {
    return (
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 w-32 rounded-full bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="flex-1 text-sm text-gray-400">
        No urgent shortages at the moment.
      </div>
    );
  }

  const loopItems = [...items, ...items];

  return (
    <div className="relative flex-1 overflow-hidden mask-linear-fade">
      <div
        className="flex min-w-max gap-3"
        style={{
          animation: "ticker 30s linear infinite",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {loopItems.map((it, idx) => (
          <Chip key={`${it.district}-${it.blood}-${idx}`} district={it.district} blood={it.blood} score={it.score} />
        ))}
      </div>
    </div>
  );
}

function Chip({ district, blood, score }) {
  return (
    <Link
      to={`/donation-requests?blood=${encodeURIComponent(blood)}&district=${encodeURIComponent(district)}&sort=urgency`}
      className="group flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-white/10 hover:border-purple-500/50 hover:text-white transition-all"
    >
      <span className="font-bold text-red-400">{blood}</span>
      <span className="text-gray-500">•</span>
      <span>{district}</span>
      <span className="ml-1 rounded-full bg-red-500/20 px-1.5 py-0.5 text-[10px] text-red-300">
        {score}
      </span>
    </Link>
  );
}

/* ----------------- Helpers ----------------- */

function flattenShortages(rows, maxItems) {
  const combos = [];
  for (const r of rows || []) {
    for (const bt of BLOOD_TYPES) {
      const score = Number(r?.scores?.[bt] ?? 0);
      if (score > 0) combos.push({ district: r.district, blood: bt, score });
    }
  }
  combos.sort((a, b) => b.score - a.score);
  return combos.slice(0, maxItems);
}

function shouldHideToday() {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v && v === new Date().toDateString();
  } catch {
    return false;
  }
}

/* ----------------- Fallback demo data ----------------- */
const MOCK_SHORTAGE = [
  { district: "Dhaka", scores: { "O+": 92, "A-": 64, "B+": 40, "AB-": 25 } },
  { district: "Chattogram", scores: { "O+": 76, "A-": 55, "AB-": 20 } },
  { district: "Khulna", scores: { "O-": 84, "A+": 35 } },
  { district: "Sylhet", scores: { "B+": 58, "AB+": 22 } },
];