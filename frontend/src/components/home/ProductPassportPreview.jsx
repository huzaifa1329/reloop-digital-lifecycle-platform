import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarDays,
  Wrench,
  RefreshCw,
  ArrowUpRight,
  Clock3,
  CircleCheck,
  Cpu,
} from "lucide-react";

const passportEvents = [
  {
    date: "MAR 2024",
    title: "Product registered",
    description: "Digital passport created",
    icon: CircleCheck,
  },
  {
    date: "NOV 2024",
    title: "Maintenance completed",
    description: "Routine system maintenance",
    icon: Wrench,
  },
  {
    date: "JUN 2025",
    title: "Part replaced",
    description: "Battery replacement recorded",
    icon: RefreshCw,
  },
];

function ProductPassportPreview() {
  return (
    <section className="overflow-hidden bg-reloop-ivory py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-reloop-burnt-orange">
              Digital Product Passport
            </p>

            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1] tracking-[-0.04em] text-reloop-espresso sm:text-5xl lg:text-6xl">
              Your product gets
              <span className="text-reloop-burnt-orange">
                {" "}
                a story.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-6 text-reloop-espresso/60 sm:text-base">
              ReLoop turns a physical product into a living digital
              record. Every repair, upgrade and important lifecycle
              event stays connected to the product.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:justify-self-end"
          >
            <div className="flex items-center gap-3 rounded-full border border-reloop-espresso/10 bg-white/60 px-4 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-reloop-chartreuse">
                <ShieldCheck
                  size={15}
                  strokeWidth={2}
                  className="text-reloop-espresso"
                />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-reloop-espresso/60">
                One identity · Every lifecycle event
              </span>
            </div>
          </motion.div>
        </div>

        {/* Passport showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="relative mt-16"
        >
          {/* Decorative background element */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-reloop-chartreuse/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-reloop-espresso p-4 shadow-2xl sm:p-6 lg:p-8">
            {/* Passport header */}
            <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-reloop-chartreuse">
                    <Cpu
                      size={20}
                      strokeWidth={1.8}
                      className="text-reloop-espresso"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                      ReLoop Passport
                    </p>

                    <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                      Dell XPS 15
                    </h3>
                  </div>
                </div>
              </div>

              <div className="self-start rounded-full border border-reloop-chartreuse/30 bg-reloop-chartreuse/10 px-3 py-1.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-reloop-chartreuse">
                  Active
                </span>
              </div>
            </div>

            {/* Main passport grid */}
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
              {/* Product information */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Product identity
                    </p>

                    <div className="mt-4">
                      <p className="font-mono text-xs text-white/45">
                        PRODUCT ID
                      </p>

                      <p className="mt-1 font-mono text-sm tracking-wide text-white">
                        RL-8F29-X15
                      </p>
                    </div>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({ length: 16 }).map((_, index) => (
                        <span
                          key={index}
                          className={`h-1.5 w-1.5 rounded-[1px] ${
                            index % 3 === 0
                              ? "bg-reloop-chartreuse"
                              : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product metadata */}
                <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                      Brand
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Dell
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                      Category
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Laptop
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                      Purchased
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                      <CalendarDays size={14} />
                      Mar 2024
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                      Warranty
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Expired
                    </p>
                  </div>
                </div>

                {/* Health score */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                        Product health
                      </p>

                      <p className="mt-2 font-display text-3xl font-semibold text-white">
                        82
                        <span className="ml-1 text-sm font-normal text-white/30">
                          / 100
                        </span>
                      </p>
                    </div>

                    <span className="rounded-full bg-reloop-chartreuse/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-reloop-chartreuse">
                      Healthy
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "82%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-reloop-chartreuse"
                    />
                  </div>
                </div>
              </div>

              {/* Lifecycle history */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Lifecycle history
                    </p>

                    <h4 className="mt-2 font-display text-lg font-semibold text-white">
                      Product journey
                    </h4>
                  </div>

                  <Clock3
                    size={18}
                    strokeWidth={1.6}
                    className="text-white/30"
                  />
                </div>

                <div className="relative mt-8">
                  {/* Timeline line */}
                  <div className="absolute bottom-4 left-[5px] top-4 w-px bg-white/10" />

                  <div className="space-y-7">
                    {passportEvents.map((event, index) => {
                      const EventIcon = event.icon;

                      return (
                        <motion.div
                          key={event.title}
                          initial={{ opacity: 0, x: 15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.45,
                            delay: 0.2 + index * 0.12,
                          }}
                          className="relative flex gap-4"
                        >
                          <div className="relative z-10 mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-reloop-espresso bg-reloop-chartreuse" />

                          <div className="min-w-0">
                            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                              {event.date}
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                              <EventIcon
                                size={14}
                                strokeWidth={1.7}
                                className="text-reloop-chartreuse"
                              />

                              <h5 className="text-sm font-medium text-white/85">
                                {event.title}
                              </h5>
                            </div>

                            <p className="mt-1 text-xs text-white/35">
                              {event.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated value */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Estimated current value
                    </p>

                    <p className="mt-1 font-mono text-lg text-white">
                      PKR 185,000
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-reloop-chartreuse"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.025] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/35">
                Every event becomes part of your product's permanent
                lifecycle record.
              </p>

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
                ReLoop · Product Passport
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductPassportPreview;