import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const healthFactors = [
  {
    label: "Age",
    value: "2.4 years",
    score: 92,
  },
  {
    label: "Condition",
    value: "Good",
    score: 86,
  },
  {
    label: "Maintenance",
    value: "Regular",
    score: 90,
  },
  {
    label: "Repairs",
    value: "2 recorded",
    score: 72,
  },
  {
    label: "Warranty",
    value: "Expired",
    score: 60,
  },
];

const lifecycleActions = [
  {
    title: "Repair",
    description: "Fix the current issue and extend product life.",
    active: true,
  },
  {
    title: "Maintain",
    description: "Keep the product healthy with routine care.",
    active: false,
  },
  {
    title: "Upgrade",
    description: "Improve performance without replacing the product.",
    active: false,
  },
  {
    title: "Resell",
    description: "Pass the product to another owner.",
    active: false,
  },
];

function HealthRecommendation() {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-reloop-burnt-orange">
            Smarter lifecycle decisions
          </p>

          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1] tracking-[-0.04em] text-reloop-espresso sm:text-5xl lg:text-6xl">
            Know when to
            <span className="text-reloop-burnt-orange">
              {" "}
              repair.
            </span>
            <br />
            Know when to move on.
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-6 text-reloop-espresso/60 sm:text-base">
            ReLoop combines product history, condition, maintenance,
            repairs and age to help you make an informed lifecycle
            decision.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Health score */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-reloop-espresso p-6 text-white sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Product health
                </p>

                <h3 className="mt-2 font-display text-xl font-semibold">
                  Dell XPS 15
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Activity
                  size={18}
                  className="text-reloop-chartreuse"
                />
              </div>
            </div>

            {/* Score */}
            <div className="mt-10 flex items-end gap-3">
              <span className="font-display text-7xl font-bold leading-none tracking-[-0.06em]">
                82
              </span>

              <div className="pb-2">
                <span className="text-sm text-white/30">/ 100</span>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-reloop-chartreuse">
                    Healthy
                  </span>
                </div>
              </div>
            </div>

            {/* Score bar */}
            <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "82%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-reloop-chartreuse"
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-white/35">
              Your product is in good condition and has strong
              potential for continued use.
            </p>

            {/* Factors */}
            <div className="mt-8 border-t border-white/10 pt-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Health factors
                </p>

                <span className="font-mono text-[9px] text-white/20">
                  LIVE SCORE
                </span>
              </div>

              <div className="space-y-5">
                {healthFactors.map((factor, index) => (
                  <motion.div
                    key={factor.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.08,
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-white/70">
                          {factor.label}
                        </p>

                        <p className="mt-0.5 text-[10px] text-white/25">
                          {factor.value}
                        </p>
                      </div>

                      <span className="font-mono text-[10px] text-white/45">
                        {factor.score}
                      </span>
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${factor.score}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: 0.2 + index * 0.08,
                        }}
                        className="h-full rounded-full bg-reloop-clay"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col rounded-[2rem] border border-reloop-espresso/10 bg-reloop-ivory p-6 sm:p-8"
          >
            {/* Recommendation header */}
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-burnt-orange">
                  ReLoop recommendation
                </p>

                <h3 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-reloop-espresso sm:text-4xl">
                  Repair is currently the smarter move.
                </h3>
              </div>

              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-reloop-chartreuse sm:flex">
                <Wrench
                  size={21}
                  className="text-reloop-espresso"
                />
              </div>
            </div>

            {/* Recommendation explanation */}
            <div className="mt-8 rounded-3xl border border-reloop-espresso/10 bg-white p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-reloop-chartreuse/20">
                  <CheckCircle2
                    size={19}
                    className="text-reloop-espresso"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-reloop-espresso">
                    Why ReLoop recommends repair
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-reloop-espresso/55">
                    Your product has a healthy overall condition,
                    regular maintenance history and a relatively low
                    repair frequency. Replacing it would currently
                    create more cost than extending its useful life.
                  </p>
                </div>
              </div>

              {/* Savings */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-reloop-ivory p-4">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign
                      size={15}
                      className="text-reloop-burnt-orange"
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                      Estimated repair
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-lg text-reloop-espresso">
                    PKR 18,500
                  </p>
                </div>

                <div className="rounded-2xl bg-reloop-ivory p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={15}
                      className="text-reloop-burnt-orange"
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                      Potential saving
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-lg text-reloop-espresso">
                    PKR 76,500
                  </p>
                </div>
              </div>
            </div>

            {/* Decision cards */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-reloop-espresso/35">
                  Possible next steps
                </p>

                <Clock3
                  size={15}
                  className="text-reloop-espresso/30"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {lifecycleActions.map((action) => (
                  <div
                    key={action.title}
                    className={`group rounded-2xl border p-4 transition-all duration-300 ${
                      action.active
                        ? "border-reloop-burnt-orange bg-reloop-burnt-orange text-white"
                        : "border-reloop-espresso/10 bg-white hover:border-reloop-espresso/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4
                        className={`text-sm font-semibold ${
                          action.active
                            ? "text-white"
                            : "text-reloop-espresso"
                        }`}
                      >
                        {action.title}
                      </h4>

                      <ArrowRight
                        size={15}
                        className={`transition-transform duration-300 group-hover:translate-x-1 ${
                          action.active
                            ? "text-white"
                            : "text-reloop-espresso/30"
                        }`}
                      />
                    </div>

                    <p
                      className={`mt-2 text-[11px] leading-5 ${
                        action.active
                          ? "text-white/65"
                          : "text-reloop-espresso/45"
                      }`}
                    >
                      {action.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8">
              <div className="flex items-center gap-3 border-t border-reloop-espresso/10 pt-5">
                <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                <p className="text-xs text-reloop-espresso/40">
                  Recommendations are based on your product lifecycle
                  data.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HealthRecommendation;