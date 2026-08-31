import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleCheck,
  FileText,
  Heart,
  Leaf,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const lifecycleSteps = [
  {
    number: "01",
    title: "Register",
    description:
      "Create a digital identity for your physical product and keep its important information in one place.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Track",
    description:
      "Monitor product health, maintenance, repairs, upgrades and other important lifecycle events.",
    icon: Search,
  },
  {
    number: "03",
    title: "Maintain",
    description:
      "Use product history and health information to understand when maintenance is needed.",
    icon: RefreshCw,
  },
  {
    number: "04",
    title: "Repair",
    description:
      "Find repair options and keep every repair event connected to your product passport.",
    icon: Wrench,
  },
  {
    number: "05",
    title: "Upgrade",
    description:
      "Extend useful life by upgrading components instead of replacing the entire product.",
    icon: RotateCcw,
  },
  {
    number: "06",
    title: "Resell",
    description:
      "Pass the product to its next owner with its history and condition information intact.",
    icon: ArrowRight,
  },
  {
    number: "07",
    title: "Donate",
    description:
      "When resale is not the right option, give the product another purpose through donation.",
    icon: Heart,
  },
  {
    number: "08",
    title: "Recycle",
    description:
      "When a product reaches the end of its useful life, make a more responsible disposal decision.",
    icon: Leaf,
  },
];

const passportFeatures = [
  "Product identity and registration details",
  "Purchase and ownership history",
  "Maintenance and repair records",
  "Product health and condition",
  "Lifecycle events and decisions",
  "Resale, donation and recycling history",
];

const decisions = [
  {
    label: "REPAIR",
    title: "Keep it running.",
    description:
      "When repair makes more sense than replacement, ReLoop helps you understand the next step.",
    icon: Wrench,
  },
  {
    label: "RESELL",
    title: "Give it another owner.",
    description:
      "A verified product history makes it easier to pass useful products to their next chapter.",
    icon: ArrowRight,
  },
  {
    label: "DONATE",
    title: "Give it another purpose.",
    description:
      "Products that still have value can continue helping someone else instead of sitting unused.",
    icon: Heart,
  },
  {
    label: "RECYCLE",
    title: "Close the loop.",
    description:
      "When a product is no longer useful, make a more informed end-of-life decision.",
    icon: Leaf,
  },
];

function HowItWorks() {
  return (
    <main className="overflow-hidden bg-reloop-ivory text-reloop-espresso">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-reloop-espresso text-white">
        {/* Decorative shapes */}

        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-white/[0.06]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-reloop-chartreuse/[0.12]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-reloop-chartreuse/[0.035]"
          aria-hidden="true"
        />

        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          {/* Hero content */}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">
                How ReLoop works
              </p>
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              A product's life
              <br />
              doesn't end
              <br />
              <span className="text-reloop-chartreuse">
                at purchase.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
              ReLoop gives every physical product a digital lifecycle.
              Register it, understand its condition, make smarter
              decisions and keep it useful for longer.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-reloop-chartreuse px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-reloop-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Start your product journey

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#lifecycle"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
              >
                Explore the lifecycle
              </a>
            </div>
          </motion.div>

          {/* Hero visual */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Back card */}

              <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-reloop-chartreuse/[0.06]" />

              {/* Main passport */}

              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#29221f] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-6">
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                      Digital Product Passport
                    </p>

                    <h2 className="mt-2 font-display text-2xl font-semibold">
                      Dell XPS 15
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                    <RefreshCw size={17} />
                  </div>
                </div>

                {/* Health */}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/25">
                      Product health
                    </p>

                    <p className="mt-2 font-mono text-3xl font-semibold text-reloop-chartreuse">
                      82
                    </p>

                    <p className="mt-1 text-[9px] text-white/30">
                      / 100 healthy
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/25">
                      Lifecycle
                    </p>

                    <p className="mt-2 font-display text-lg font-semibold">
                      Active
                    </p>

                    <p className="mt-1 text-[9px] text-white/30">
                      Ready for next decision
                    </p>
                  </div>
                </div>

                {/* Timeline */}

                <div className="mt-5 rounded-2xl border border-white/[0.07] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/25">
                      Product journey
                    </p>

                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-chartreuse">
                      LIVE
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      ["Purchased", "MAR 2024", true],
                      ["Maintenance", "JAN 2026", true],
                      ["Repair", "MAY 2026", true],
                      ["Next decision", "NOW", false],
                    ].map(([title, date, completed]) => (
                      <div
                        key={title}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                            completed
                              ? "bg-reloop-chartreuse"
                              : "border border-reloop-chartreuse"
                          }`}
                        />

                        <div className="flex flex-1 items-center justify-between">
                          <span className="text-xs text-white/65">
                            {title}
                          </span>

                          <span className="font-mono text-[7px] text-white/25">
                            {date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}

                <div className="mt-4 rounded-2xl bg-reloop-chartreuse p-4 text-reloop-espresso">
                  <div className="flex items-center gap-2">
                    <CircleCheck size={14} />

                    <p className="text-[10px] font-semibold">
                      ReLoop recommendation
                    </p>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-reloop-espresso/65">
                    Repair is currently more economical than replacement.
                  </p>
                </div>
              </div>

              {/* Floating label */}

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/[0.08] bg-[#332a26] px-4 py-3 shadow-xl sm:block"
              >
                <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/25">
                  Lifecycle status
                </p>

                <p className="mt-1 text-xs font-semibold text-white">
                  Ready for next chapter
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

   {/* =====================================================
    INTRO
====================================================== */}

<section className="relative overflow-hidden bg-reloop-ivory py-24 sm:py-28">
  {/* Decorative background */}
  <div
    className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-reloop-chartreuse/10 blur-3xl"
    aria-hidden="true"
  />

  <div
    className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-reloop-orange/[0.04] blur-3xl"
    aria-hidden="true"
  />

  <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">

      {/* =================================================
          LEFT — CONNECTED PRODUCT STORY VISUAL
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65 }}
        className="relative"
      >
        {/* Small section label */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-reloop-orange" />

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
            One connected system
          </p>
        </div>

        {/* Main visual */}
        <div className="relative overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-white p-5 shadow-[0_25px_70px_rgba(33,26,23,0.08)] sm:p-6">

          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-reloop-espresso/[0.06]"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-reloop-chartreuse/[0.08]"
            aria-hidden="true"
          />

          {/* Card header */}
          <div className="relative flex items-center justify-between border-b border-reloop-espresso/10 pb-5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-reloop-espresso/35">
                Product lifecycle
              </p>

              <h3 className="mt-2 font-display text-xl font-semibold text-reloop-espresso">
                Dell XPS 15
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
              <RefreshCw size={17} />
            </div>
          </div>

          {/* Connected history */}
          <div className="relative mt-6">

            {/* Vertical connection line */}
            <div
              className="absolute left-[15px] top-4 bottom-4 w-px bg-reloop-espresso/10"
              aria-hidden="true"
            />

            <div className="space-y-5">

              {/* Registered */}
              <div className="relative flex gap-4">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-reloop-chartreuse text-reloop-espresso">
                  <FileText size={13} />
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-reloop-espresso/[0.08] bg-reloop-neutral/60 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-reloop-espresso">
                      Product registered
                    </p>

                    <span className="font-mono text-[7px] text-reloop-espresso/30">
                      MAR 2024
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-reloop-espresso/45">
                    Digital identity created
                  </p>
                </div>
              </div>

              {/* Maintenance */}
              <div className="relative flex gap-4">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-reloop-espresso text-white">
                  <RefreshCw size={13} />
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-reloop-espresso/[0.08] bg-reloop-neutral/60 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-reloop-espresso">
                      Maintenance recorded
                    </p>

                    <span className="font-mono text-[7px] text-reloop-espresso/30">
                      JAN 2026
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-reloop-espresso/45">
                    Product history updated
                  </p>
                </div>
              </div>

              {/* Repair */}
              <div className="relative flex gap-4">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-reloop-orange text-white">
                  <Wrench size={13} />
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-reloop-espresso/[0.08] bg-reloop-neutral/60 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-reloop-espresso">
                      Repair completed
                    </p>

                    <span className="font-mono text-[7px] text-reloop-espresso/30">
                      MAY 2026
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-reloop-espresso/45">
                    Battery replaced and verified
                  </p>
                </div>
              </div>

              {/* Next decision */}
              <div className="relative flex gap-4">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-reloop-chartreuse bg-reloop-ivory text-reloop-espresso">
                  <CircleCheck size={13} />
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-reloop-chartreuse/30 bg-reloop-chartreuse/10 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-reloop-espresso">
                      Next decision
                    </p>

                    <span className="font-mono text-[7px] font-medium text-reloop-espresso/40">
                      NOW
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-reloop-espresso/50">
                    Repair, resell, donate or recycle
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status */}
          <div className="relative mt-6 flex items-center justify-between rounded-xl bg-reloop-espresso px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />

              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/50">
                Product story connected
              </span>
            </div>

            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-reloop-chartreuse">
              LIVE
            </span>
          </div>
        </div>

        {/* Floating status */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-reloop-espresso/10 bg-white px-4 py-3 shadow-xl sm:block lg:-right-5"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-reloop-chartreuse text-reloop-espresso">
              <ShieldCheck size={12} />
            </span>

            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                Digital history
              </p>

              <p className="mt-0.5 text-[10px] font-semibold text-reloop-espresso">
                Always connected
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* =================================================
          RIGHT — INTRO CONTENT
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <h2 className="max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
          From the moment you
          <br />
          <span className="text-reloop-orange">
            register a product,
          </span>
          <br />
          its story stays connected.
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-reloop-espresso/55 sm:text-base">
          ReLoop turns scattered product information into one
          continuous lifecycle. Every important event becomes
          part of the product's digital history.
        </p>

        {/* Supporting points */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-reloop-espresso/10 bg-white/60 px-4 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-reloop-chartreuse text-reloop-espresso">
              <Check size={13} strokeWidth={2.5} />
            </span>

            <span className="text-xs font-medium text-reloop-espresso/60">
              One connected history
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-reloop-espresso/10 bg-white/60 px-4 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-reloop-chartreuse text-reloop-espresso">
              <Check size={13} strokeWidth={2.5} />
            </span>

            <span className="text-xs font-medium text-reloop-espresso/60">
              Better lifecycle decisions
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
      {/* =====================================================
          LIFECYCLE
      ====================================================== */}

      <section
        id="lifecycle"
        className="scroll-mt-20 bg-reloop-espresso py-24 text-white sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  The complete lifecycle
                </p>
              </div>

              <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                One product.
                <br />
                <span className="text-reloop-chartreuse">
                  Many possible futures.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-5 text-white/35">
              ReLoop helps you make better decisions at every stage
              instead of treating replacement as the default answer.
            </p>
          </div>

          {/* Lifecycle grid */}

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {lifecycleSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="group min-h-56 bg-[#211b18] p-6 transition-colors duration-300 hover:bg-[#2a221f]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[8px] tracking-[0.15em] text-white/20">
                      {step.number}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/40 transition-all duration-300 group-hover:border-reloop-chartreuse/30 group-hover:bg-reloop-chartreuse group-hover:text-reloop-espresso">
                      <Icon size={15} />
                    </span>
                  </div>

                  <h3 className="mt-10 font-display text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-5 text-white/35">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DIGITAL PASSPORT
      ====================================================== */}

      <section className="bg-reloop-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Text */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                  Digital Product Passport
                </p>
              </div>

              <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                Your product
                <br />
                gets a
                <br />
                <span className="text-reloop-orange">
                  permanent story.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-6 text-reloop-espresso/55">
                Instead of losing product information between owners,
                repairs and upgrades, ReLoop keeps the important
                details connected to the product.
              </p>

              <div className="mt-7 space-y-3">
                {passportFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-reloop-chartreuse text-reloop-espresso">
                      <Check size={12} strokeWidth={2.5} />
                    </span>

                    <span className="text-xs font-medium text-reloop-espresso/65">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Passport visual */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-reloop-espresso p-5 text-white shadow-[0_25px_70px_rgba(33,26,23,0.16)] sm:p-7">
                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-white/[0.06]" />

                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                        Product passport
                      </p>

                      <p className="mt-2 font-display text-xl font-semibold">
                        Dell XPS 15
                      </p>
                    </div>

                    <ShieldCheck
                      size={21}
                      className="text-reloop-chartreuse"
                    />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Product ID", "RL-8F29X"],
                      ["Registered", "MAR 2024"],
                      ["Health", "82 / 100"],
                      ["Status", "Active"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
                      >
                        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/25">
                          {label}
                        </p>

                        <p className="mt-2 text-xs font-semibold text-white/75">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-white/[0.07] p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/25">
                        Lifecycle events
                      </p>

                      <span className="font-mono text-[7px] text-reloop-chartreuse">
                        04 EVENTS
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      {[
                        "Product registered",
                        "Maintenance completed",
                        "Battery replaced",
                        "Repair recommended",
                      ].map((event, index) => (
                        <div
                          key={event}
                          className="flex items-center gap-3"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-reloop-chartreuse text-reloop-espresso">
                            <Check size={9} strokeWidth={3} />
                          </span>

                          <span className="flex-1 text-xs text-white/50">
                            {event}
                          </span>

                          <span className="font-mono text-[7px] text-white/20">
                            0{index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-reloop-chartreuse px-4 py-3 text-reloop-espresso">
                    <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em]">
                      Passport active
                    </span>

                    <CircleCheck size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DECISION ENGINE
      ====================================================== */}

      <section className="bg-reloop-neutral py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-reloop-orange" />

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                  Smarter decisions
                </p>
              </div>

              <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                Know what to do
                <br />
                <span className="text-reloop-orange">
                  next.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-reloop-espresso/55">
              ReLoop connects product health and lifecycle history to
              help you understand whether the next move should be
              repair, resale, donation or recycling.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decisions.map((decision, index) => {
              const Icon = decision.icon;

              return (
                <motion.div
                  key={decision.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group rounded-[1.5rem] border border-reloop-espresso/10 bg-reloop-ivory p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(33,26,23,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] font-medium tracking-[0.16em] text-reloop-espresso/30">
                      {decision.label}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-reloop-espresso text-white transition-colors duration-300 group-hover:bg-reloop-chartreuse group-hover:text-reloop-espresso">
                      <Icon size={15} />
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-xl font-semibold">
                    {decision.title}
                  </h3>

                  <p className="mt-3 text-xs leading-5 text-reloop-espresso/45">
                    {decision.description}
                  </p>

                  <div className="mt-7 h-px bg-reloop-espresso/10" />

                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />

                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                      Part of the lifecycle
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SIMPLE FLOW
      ====================================================== */}

      <section className="bg-reloop-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-reloop-espresso/30">
            The simple idea
          </p>

          <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
            Don't replace
            <br />
            <span className="text-reloop-orange">
              before you understand.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-reloop-espresso/50">
            ReLoop gives you the information to make a better
            decision about what happens next.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2">
            {["Register", "Understand", "Decide", "Continue"].map(
              (step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-2"
                >
                  <span className="rounded-full border border-reloop-espresso/10 bg-white px-5 py-3 font-mono text-[9px] font-medium uppercase tracking-[0.12em]">
                    {step}
                  </span>

                  {index < 3 && (
                    <ArrowRight
                      size={13}
                      className="hidden text-reloop-espresso/20 sm:block"
                    />
                  )}

                  {index < 3 && (
                    <ArrowDown
                      size={13}
                      className="text-reloop-espresso/20 sm:hidden"
                    />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-reloop-ivory pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] bg-reloop-espresso px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.07]" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-reloop-chartreuse/[0.035]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-reloop-chartreuse text-reloop-espresso">
                    <Leaf size={14} />
                  </span>

                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                    Give it another life
                  </p>
                </div>

                <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                  Ready to start your
                  <br />
                  product's
                  <br />
                  <span className="text-reloop-chartreuse">
                    next chapter?
                  </span>
                </h2>
              </div>

              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-reloop-chartreuse px-6 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-reloop-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Create your passport

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;