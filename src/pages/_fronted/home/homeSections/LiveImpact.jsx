import { useEffect, useMemo, useState } from "react";
import { getDashboardStats, getVerifiedHospitals } from "@/services/publicAPI";

export default function LiveImpact({
  statsEndpoint = "/admin-dashboard-stats",
  hospitalsEndpoint = "/hospitals?verified=true",
}) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [raw, setRaw] = useState(null);
  const [verifiedHospitals, setVerifiedHospitals] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(null);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const [statsResult, hospitalsResult] = await Promise.allSettled([
        getDashboardStats(),
        getVerifiedHospitals(),
      ]);

      if (statsResult.status === "fulfilled" && statsResult.value.success) {
        setRaw(statsResult.value.data);
      } else {
        setRaw(null);
      }

      if (hospitalsResult.status === "fulfilled" && hospitalsResult.value.success) {
        const hJson = hospitalsResult.value.data;
        const count = Array.isArray(hJson)
          ? hJson.filter((i) => i.verified).length
          : typeof hJson?.total === "number"
          ? hJson.total
          : Array.isArray(hJson?.items)
          ? (hJson.items.filter((i) => i.verified).length || hJson.items.length)
          : 0;
        setVerifiedHospitals(count);
      } else {
        setVerifiedHospitals(0);
      }

      setUpdatedAt(new Date());
    } catch (e) {
      setErr("Failed to load live stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [statsEndpoint, hospitalsEndpoint]);

  const { livesSaved, activeDonors, requestsFulfilled, hospitals } = useMemo(
    () => mapMetrics(raw, verifiedHospitals),
    [raw, verifiedHospitals]
  );

  const livesSavedCount = useCountUpNumber(livesSaved);
  const activeDonorsCount = useCountUpNumber(activeDonors);
  const requestsFulfilledCount = useCountUpNumber(requestsFulfilled);
  const hospitalsCount = useCountUpNumber(hospitals);

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl glass-panel p-8 md:p-12">
          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-pink-500/20 blur-[100px]" />

          <div className="relative mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-purple-400 font-semibold mb-2">Live Impact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Every drop makes a difference</h2>
              <p className="text-gray-400 max-w-xl">
                Real-time snapshot from our community and partners. See how we are changing lives together.
              </p>
            </div>
            <button
              onClick={load}
              className="btn-secondary-outline px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              title="Refresh stats"
            >
              <IconRefresh className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {err && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6">
              <span>{err}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <>
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
              </>
            ) : (
              <>
                <StatCard
                  icon={<IconHeart className="w-8 h-8 text-pink-500" />}
                  label="Lives Saved"
                  value={livesSavedCount}
                  subtext="And counting..."
                />
                <StatCard
                  icon={<IconUsers className="w-8 h-8 text-purple-500" />}
                  label="Active Donors"
                  value={activeDonorsCount}
                  subtext="Heroes among us"
                />
                <StatCard
                  icon={<IconCheck className="w-8 h-8 text-green-400" />}
                  label="Requests Fulfilled"
                  value={requestsFulfilledCount}
                  subtext="Successful matches"
                />
                <StatCard
                  icon={<IconHospital className="w-8 h-8 text-blue-400" />}
                  label="Verified Hospitals"
                  value={hospitalsCount}
                  subtext="Trusted partners"
                />
              </>
            )}
          </div>

          <div className="mt-6 text-right text-xs text-gray-500">
            {updatedAt ? `Last updated: ${updatedAt.toLocaleTimeString()}` : "—"}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------- Mapping backend -> UI metrics --------------- */
function mapMetrics(s, hospitalsVerified) {
  if (!s) {
    return {
      livesSaved: 0,
      activeDonors: 0,
      requestsFulfilled: 0,
      hospitals: hospitalsVerified || 0,
    };
  }
  const activeDonors =
    s.totalDonors ??
    s.activeDonors ??
    s.totalUsers ??
    0;

  const requestsFulfilled =
    s.requestsFulfilled ??
    s.totalRequestFulfilled ??
    (typeof s.totalRequest === "number" ? Math.round(s.totalRequest * 0.7) : 0);

  const livesSaved =
    s.livesSaved ??
    Math.max(requestsFulfilled, 0);

  const hospitals =
    s.hospitalsVerified ??
    hospitalsVerified ??
    0;

  return { livesSaved, activeDonors, requestsFulfilled, hospitals };
}

/* --------------- Stat card + skeleton --------------- */

function StatCard({ icon, label, value, subtext }) {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300 group">
      <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{formatNumber(value)}</div>
      <div className="text-sm font-medium text-gray-300 mb-1">{label}</div>
      <div className="text-xs text-gray-500">{subtext}</div>
    </div>
  );
}

function SkeletonStat() {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col items-center animate-pulse">
      <div className="w-12 h-12 rounded-full bg-white/10 mb-4"></div>
      <div className="h-8 w-24 bg-white/10 rounded mb-2"></div>
      <div className="h-4 w-32 bg-white/10 rounded"></div>
    </div>
  );
}

/* --------------- Tiny count-up hook --------------- */

function useCountUpNumber(target, duration = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const from = 0;
    const to = Number(target || 0);
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const val = Math.floor(from + (to - from) * easeOutQuad(p));
      setN(val);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

/* --------------- Small helpers --------------- */

function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/* --------------- Inline icons --------------- */

function IconRefresh(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconHeart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.1 21.3l-.1.1-.1-.1C7.14 17.36 4 14.5 4 11.28 4 9 5.79 7 8.15 7c1.3 0 2.6.62 3.35 1.61C12.25 7.62 13.55 7 14.85 7 17.21 7 19 9 19 11.28c0 3.22-3.14 6.08-6.9 10.02z" />
    </svg>
  );
}
function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconHospital(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}