import { motion } from "framer-motion";
import {
  ShoppingBag,
  Fingerprint,
  Wrench,
  Hammer,
  ArrowUpRight,
  Repeat2,
  HeartHandshake,
  Recycle,
} from "lucide-react";

const lifecycleStages = [
  {
    number: "01",
    title: "Buy",
    description: "Start with a product worth keeping.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Register",
    description: "Give your product a digital identity.",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Maintain",
    description: "Keep it healthy for longer.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Repair",
    description: "Fix problems before replacing.",
    icon: Hammer,
  },
  {
    number: "05",
    title: "Upgrade",
    description: "Improve what you already own.",
    icon: ArrowUpRight,
  },
  {
    number: "06",
    title: "Resell",
    description: "Pass it on to another owner.",
    icon: Repeat2,
  },
  {
    number: "07",
    title: "Donate",
    description: "Give useful products another purpose.",
    icon: HeartHandshake,
  },
  {
    number: "08",
    title: "Recycle",
    description: "Close the loop responsibly.",
    icon: Recycle,
  },
];

function LifecycleStrip() {
  return (
    <section className="overflow-hidden bg-reloop-espresso py-24 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-reloop-chartreuse">
            The ReLoop lifecycle
          </p>

          <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            One product.
            <br />
            <span className="text-reloop-clay">
              Many possible futures.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
            ReLoop helps you make better decisions at every stage of
            a product's life — so useful things stay useful for longer.
          </p>
        </motion.div>

        {/* Lifecycle */}
        <div className="relative mt-16">
          {/* Connecting line — desktop */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[2.4rem] hidden h-px bg-white/15 lg:block"
            aria-hidden="true"
          />

          {/* Mobile scroll container */}
          <div className="overflow-x-auto pb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 lg:overflow-visible">
            <div className="flex min-w-max gap-3 lg:grid lg:min-w-0 lg:grid-cols-8 lg:gap-2">
              {lifecycleStages.map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <motion.div
                    key={stage.title}
                    initial={{
                      opacity: 0,
                      y: 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                    }}
                    className="group relative w-40 lg:w-auto"
                  >
                    {/* Number + icon */}
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-reloop-espresso transition-all duration-300 group-hover:border-reloop-chartreuse group-hover:bg-reloop-chartreuse">
                        <Icon
                          size={19}
                          strokeWidth={1.7}
                          className="text-white transition-colors duration-300 group-hover:text-reloop-espresso"
                        />
                      </div>

                      <span className="font-mono text-[10px] text-white/30 lg:hidden">
                        {stage.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-5 pr-3">
                      <div className="hidden font-mono text-[10px] text-white/25 lg:block">
                        {stage.number}
                      </div>

                      <h3 className="mt-1 font-display text-lg font-semibold">
                        {stage.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-white/40">
                        {stage.description}
                      </p>
                    </div>

                    {/* Active indicator */}
                    <div className="mt-5 h-1 w-0 rounded-full bg-reloop-chartreuse transition-all duration-500 group-hover:w-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-6 text-white/45">
              The goal isn't to keep products forever. It's to make
              their next step smarter.
            </p>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Keep products in circulation
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LifecycleStrip;