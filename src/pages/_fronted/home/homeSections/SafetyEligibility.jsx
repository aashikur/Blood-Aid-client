import { Link } from "react-router";

const SAFETY_TIPS = [
  {
    icon: "📋",
    title: "Eligibility Checklist",
    text: "Must be 18-65, weigh over 50kg, and be in good health.",
    ctaText: "Full Checklist",
    ctaLink: "/eligibility",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: "💧",
    title: "Hydrate Well",
    text: "Drink plenty of water before and after your donation.",
    ctaText: "Learn More",
    ctaLink: "/blog/donation-preparation",
    color: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: "🍎",
    title: "Eat a Healthy Meal",
    text: "Have a nutritious meal a few hours before donating.",
    ctaText: "See Tips",
    ctaLink: "/blog/donation-preparation",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    icon: "🆔",
    title: "Bring an ID",
    text: "A valid photo ID is required to verify your identity.",
    ctaText: "Why?",
    ctaLink: "/faq",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
];

export default function SafetyEligibility() {
  return (
    <section className="w-full py-20 relative">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
            Your Health First
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold">
            Safety & <span className="text-gradient">Eligibility</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            We prioritize your well-being. Here’s what you need to know before you donate.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_TIPS.map((tip) => (
            <div
              key={tip.title}
              className={`glass-panel p-6 rounded-2xl border ${tip.borderColor} hover:bg-white/5 transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${tip.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">{tip.title}</h3>
              <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">{tip.text}</p>
              <div className="text-center">
                 <Link 
                  to={tip.ctaLink} 
                  className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                    {tip.ctaText}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                 </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/eligibility" 
            className="btn-primary-gradient px-8 py-3 rounded-full font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
          >
            Take the Quick Eligibility Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}