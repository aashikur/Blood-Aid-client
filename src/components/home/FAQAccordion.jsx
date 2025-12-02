import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Who can donate blood?",
    answer: "Most healthy adults aged 18-65 who weigh at least 50kg can donate blood. You should be in good health and not have donated in the last 3-4 months.",
  },
  {
    question: "Is blood donation safe?",
    answer: "Yes, it is completely safe. We use sterile, disposable equipment for every donation. There is zero risk of contracting any disease.",
  },
  {
    question: "How long does it take?",
    answer: "The actual donation takes about 10-15 minutes. The entire process, including registration and screening, takes about 45-60 minutes.",
  },
  {
    question: "How often can I donate?",
    answer: "Men can donate every 3 months, and women every 4 months. Platelet donation can be done more frequently, up to 24 times a year.",
  },
  {
    question: "What should I do before donating?",
    answer: "Eat a healthy meal, drink plenty of water, and get a good night's sleep. Avoid alcohol and smoking before donation.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to know about blood donation. Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? "border-purple-500/30 bg-purple-500/5" : "hover:bg-white/5"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className={`text-lg font-medium transition-colors ${
                  openIndex === index ? "text-white" : "text-gray-300"
                }`}>
                  {faq.question}
                </span>
                <span className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? "bg-purple-500 text-white rotate-180" : "bg-white/10 text-gray-400"
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}