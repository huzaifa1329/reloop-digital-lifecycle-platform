import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CircleCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import Button from "../common/Button";
import Badge from "../common/Badge";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-reloop-ivory">
      {/* Decorative shape */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-reloop-chartreuse/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge variant="orange">
            <Sparkles size={13} />
            Product lifecycle, reimagined
          </Badge>

          <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-reloop-espresso sm:text-6xl lg:text-7xl">
            Don't replace it.
            <br />

            <span className="text-reloop-orange">
              Give it another life.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-reloop-espresso/60 sm:text-lg">
            ReLoop gives every product a digital lifecycle — from
            purchase and maintenance to repair, upgrade, resale,
            donation, or recycling.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start your product journey
                <ArrowRight size={17} />
              </Button>
            </Link>

            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore how it works
              </Button>
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {[
              "Digital Product Passport",
              "Product health tracking",
              "Lifecycle recommendations",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs font-medium text-reloop-espresso/55"
              >
                <CircleCheck
                  size={15}
                  className="text-reloop-orange"
                />

                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Product Passport Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="relative"
        >
          <div className="relative mx-auto max-w-md">
            {/* Background card */}
            <div className="absolute -inset-5 rotate-3 rounded-[2rem] bg-reloop-clay/20" />

            <div className="relative overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-white p-6 shadow-[0_30px_80px_rgba(33,26,23,0.12)]">
              {/* Passport header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                    Digital Product Passport
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold text-reloop-espresso">
                    Dell XPS 15
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-chartreuse">
                  <RotateCcw
                    size={18}
                    className="text-reloop-espresso"
                  />
                </div>
              </div>

              {/* Product ID */}
              <div className="mt-6 rounded-xl bg-reloop-neutral p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-reloop-espresso/40">
                  Product ID
                </p>

                <p className="mt-1 font-mono text-sm font-semibold text-reloop-espresso">
                  RL-8F29X
                </p>
              </div>

              {/* Health */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-reloop-espresso/10 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-reloop-espresso/40">
                    Health
                  </p>

                  <p className="mt-1 font-mono text-2xl font-semibold text-reloop-orange">
                    82
                  </p>

                  <p className="text-xs text-reloop-espresso/45">
                    / 100 Healthy
                  </p>
                </div>

                <div className="rounded-xl border border-reloop-espresso/10 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-reloop-espresso/40">
                    Value
                  </p>

                  <p className="mt-1 font-mono text-lg font-semibold text-reloop-espresso">
                    185K
                  </p>

                  <p className="text-xs text-reloop-espresso/45">
                    PKR estimated
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-reloop-espresso/40">
                  Lifecycle
                </p>

                <div className="mt-4 space-y-4">
                  {[
                    ["Purchased", "Mar 2024", true],
                    ["Maintenance", "Jan 2026", true],
                    ["Repair", "May 2026", true],
                    ["Next decision", "Now", false],
                  ].map(([title, date, completed]) => (
                    <div
                      key={title}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          completed
                            ? "bg-reloop-orange"
                            : "border-2 border-reloop-orange"
                        }`}
                      />

                      <div className="flex flex-1 items-center justify-between">
                        <p className="text-sm font-medium text-reloop-espresso">
                          {title}
                        </p>

                        <p className="font-mono text-[10px] text-reloop-espresso/40">
                          {date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-6 rounded-xl bg-reloop-espresso p-4 text-white">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className="text-reloop-chartreuse"
                  />

                  <p className="text-xs font-semibold">
                    ReLoop recommendation
                  </p>
                </div>

                <p className="mt-2 text-sm leading-5 text-white/70">
                  Repair is currently more economical than
                  replacement.
                </p>
              </div>
            </div>

            {/* Floating label */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-reloop-espresso/10 bg-white px-4 py-3 shadow-xl sm:block"
            >
              <p className="text-[10px] uppercase tracking-wider text-reloop-espresso/40">
                Lifecycle status
              </p>

              <p className="mt-1 text-sm font-bold text-reloop-espresso">
                Ready for next chapter
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;