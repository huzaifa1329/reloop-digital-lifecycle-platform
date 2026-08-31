import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Leaf,
  Plus,
  RefreshCw,
} from "lucide-react";

const benefits = [
  "Create your Digital Product Passport",
  "Track repairs, maintenance and upgrades",
  "Know when to repair, resell or recycle",
];

function FinalCTA() {
  return (
    <section className="overflow-hidden bg-reloop-ivory py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-reloop-espresso px-6 py-12 text-white shadow-[0_24px_70px_rgba(35,27,23,0.18)] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* =========================================
              DECORATIVE BACKGROUND
          ========================================== */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.08]" />

          <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full border border-reloop-chartreuse/[0.12]" />

          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-reloop-chartreuse/[0.035]" />

          <div className="pointer-events-none absolute right-[35%] top-[18%] h-2 w-2 rounded-full bg-reloop-chartreuse/50" />

          <Plus
            size={18}
            className="pointer-events-none absolute right-[22%] top-[22%] text-reloop-chartreuse/25"
          />

          <RefreshCw
            size={52}
            strokeWidth={1}
            className="pointer-events-none absolute bottom-7 right-7 rotate-12 text-white/[0.045] sm:right-14"
          />

          {/* =========================================
              MAIN CONTENT
          ========================================== */}

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            {/* =======================================
                LEFT — CTA CONTENT
            ======================================== */}

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                  <Leaf size={16} strokeWidth={2} />
                </span>

                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">
                  Start your product journey
                </p>
              </div>

              <h2 className="mt-7 max-w-2xl font-display text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Your products
                <br />
                have more life
                <br />
                <span className="text-reloop-chartreuse">
                  left in them.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
                Register your first product and start making better
                decisions about what happens next.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-reloop-chartreuse px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-reloop-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Create your passport

                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                >
                  See how it works
                </Link>
              </div>

              {/* Small supporting line */}
              <div className="mt-7 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />

                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
                  Built for longer product lives
                </span>
              </div>
            </div>

            {/* =======================================
                RIGHT — BENEFITS CARD
            ======================================== */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.045] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-6">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                      ReLoop membership
                    </p>

                    <p className="mt-2 font-display text-lg font-semibold text-white">
                      One place for your products.
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                    <RefreshCw size={17} strokeWidth={2} />
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-5 space-y-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.055] px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.08]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-reloop-chartreuse text-reloop-espresso">
                        <Check size={11} strokeWidth={2.5} />
                      </span>

                      <p className="text-xs leading-5 text-white/65">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Lifecycle */}
                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/10 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                      Lifecycle
                    </span>

                    <span className="font-mono text-[9px] font-medium text-reloop-chartreuse">
                      CONTINUOUS
                    </span>
                  </div>

                  {/* Lifecycle line */}
                  <div className="mt-4 flex items-center gap-1">
                    {["Buy", "Maintain", "Repair", "Reuse", "Recycle"].map(
                      (item, index) => (
                        <div
                          key={item}
                          className="flex min-w-0 flex-1 items-center"
                        >
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-reloop-chartreuse" />

                          {index < 4 && (
                            <div className="mx-1 h-px flex-1 bg-white/15" />
                          )}
                        </div>
                      ),
                    )}
                  </div>

                  {/* Lifecycle labels */}
                  <div className="mt-2 flex justify-between">
                    <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/20">
                      Start
                    </span>

                    <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/20">
                      Continue
                    </span>
                  </div>
                </div>

                {/* Bottom status */}
                <div className="mt-4 flex items-center justify-between px-1">
                  <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/20">
                    Product lifecycle
                  </span>

                  <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-white/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;