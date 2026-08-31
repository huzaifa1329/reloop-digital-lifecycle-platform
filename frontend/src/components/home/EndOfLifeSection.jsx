import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Box,
  HeartHandshake,
  Leaf,
  Recycle,
  RefreshCw,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const lifecyclePaths = [
  {
    number: "01",
    title: "Donate",
    description:
      "Pass a usable product to someone who can continue its journey.",
    icon: HeartHandshake,
    label: "KEEP IT IN USE",
    detail: "Best for working products",
  },
  {
    number: "02",
    title: "Recycle",
    description:
      "Send products that have reached end-of-life into responsible recovery.",
    icon: Recycle,
    label: "RETURN MATERIALS",
    detail: "Best for non-usable products",
  },
];

const recoverySteps = [
  {
    icon: ShieldCheck,
    title: "Assess",
    description: "Understand the product's final condition.",
  },
  {
    icon: Wrench,
    title: "Recover",
    description: "Identify usable parts and components.",
  },
  {
    icon: Recycle,
    title: "Process",
    description: "Route remaining materials responsibly.",
  },
];

function EndOfLifeSection() {
  return (
    <section className="overflow-hidden bg-reloop-espresso py-24 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-reloop-chartreuse">
              <RefreshCw
                size={16}
                className="text-reloop-espresso"
              />
            </span>

            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-reloop-chartreuse">
              End of lifecycle
            </p>
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            When you're done,
            <br />
            <span className="text-reloop-chartreuse">
              the product isn't.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-6 text-white/45 sm:text-base">
            ReLoop helps you choose what comes next. Give a usable
            product another owner, recover valuable components, or
            responsibly recycle what has reached the end of its useful
            life.
          </p>
        </motion.div>

        {/* Main paths */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {lifecyclePaths.map((path, index) => {
            const Icon = path.icon;

            return (
              <motion.article
                key={path.title}
                initial={{
                  opacity: 0,
                  y: 25,
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
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 transition-all duration-500 hover:border-reloop-chartreuse/30 hover:bg-white/[0.07] sm:p-8"
              >
                {/* Background number */}
                <span className="absolute -right-4 -top-8 font-display text-[10rem] font-bold leading-none tracking-[-0.08em] text-white/[0.025] transition-colors duration-500 group-hover:text-reloop-chartreuse/[0.05]">
                  {path.number}
                </span>

                <div className="relative">
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-reloop-chartreuse text-reloop-espresso transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  {/* Label */}
                  <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-chartreuse">
                    {path.label}
                  </p>

                  <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                    {path.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
                    {path.description}
                  </p>

                  {/* Detail */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/25">
                      {path.detail}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-reloop-chartreuse group-hover:bg-reloop-chartreuse group-hover:text-reloop-espresso">
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Parts recovery */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 overflow-hidden rounded-[2rem] border border-white/10 bg-reloop-chartreuse text-reloop-espresso"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Intro */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-reloop-espresso text-reloop-chartreuse">
                <Box size={21} strokeWidth={1.7} />
              </div>

              <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                Parts recovery
              </p>

              <h3 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">
                One product can still have many useful pieces.
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-reloop-espresso/55">
                Before sending a product to recycling, ReLoop can
                identify components that may still have value.
              </p>
            </div>

            {/* Steps */}
            <div className="grid border-t border-reloop-espresso/10 lg:grid-cols-3 lg:border-l lg:border-t-0">
              {recoverySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="relative border-b border-reloop-espresso/10 p-6 last:border-b-0 sm:p-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    <span className="font-mono text-[9px] text-reloop-espresso/30">
                      0{index + 1}
                    </span>

                    <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-espresso/10">
                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        className="text-reloop-espresso"
                      />
                    </div>

                    <h4 className="mt-6 font-display text-base font-semibold">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-reloop-espresso/50">
                      {step.description}
                    </p>

                    {index < recoverySteps.length - 1 && (
                      <ArrowDownRight
                        size={16}
                        className="absolute bottom-6 right-6 hidden text-reloop-espresso/20 lg:block"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Leaf
              size={17}
              className="text-reloop-chartreuse"
            />

            <p className="text-xs text-white/40">
              Less waste. More useful life. Better product decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
            <span>THE LOOP CONTINUES</span>

            <ArrowRight size={13} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default EndOfLifeSection;