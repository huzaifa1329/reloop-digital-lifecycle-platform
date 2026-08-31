import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function MarketplaceHero({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <section className="relative overflow-hidden bg-reloop-ivory">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -right-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-reloop-chartreuse/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-reloop-orange/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:py-24">
        {/* =====================================================
            LEFT — HERO CONTENT
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow */}

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-reloop-orange" />

            <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-reloop-espresso/40">
              ReLoop Marketplace
            </p>
          </div>

          {/* Heading */}

          <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.05em] text-reloop-espresso sm:text-6xl lg:text-7xl">
            Buy products
            <br />
            with a{" "}
            <span className="text-reloop-orange">
              story.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-7 max-w-xl text-sm leading-6 text-reloop-espresso/55 sm:text-base">
            Discover products that come with their history, condition
            and lifecycle information — so you know what you're
            actually buying.
          </p>

          {/* Search */}

          <div className="mt-8 max-w-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-reloop-espresso/10 bg-white p-2 shadow-[0_15px_45px_rgba(33,26,23,0.06)]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-reloop-neutral text-reloop-espresso/45">
                <Search size={18} />
              </div>

              <input type="text" value={search} onChange={(event) => setSearch(event.target.value)}
  placeholder="Search products, brands or categories..." 
  className="min-w-0 flex-1 bg-transparent px-1 text-sm text-reloop-espresso outline-none placeholder:text-reloop-espresso/30" />

              <button type="button" onClick={() => { document .getElementById("products") ?.scrollIntoView({
                  behavior: "smooth", block: "start", }); }} >
                Search 
              </button>
            </div>
          </div>

          {/* Quick categories */}

          <div className="mt-5 flex flex-wrap gap-2">
            {["Laptops", "Phones", "Cameras", "Audio", "Gaming"].map(
  (item) => {
    const active = category === item;

    return (
      <button
        key={item}
        type="button"
        onClick={() => {
          setCategory(
            active ? "All products" : item,
          );

          document
            .getElementById("products")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }}
        className={`rounded-full border px-4 py-2 font-mono text-[8px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
          active
            ? "border-reloop-orange bg-reloop-orange text-white"
            : "border-reloop-espresso/10 bg-white text-reloop-espresso/45 hover:border-reloop-orange/30 hover:bg-reloop-orange hover:text-white"
        }`}
      >
        {item}
      </button>
    );
  },
)}
          </div>

          {/* Trust points */}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={14}
                className="text-reloop-orange"
              />

              <span className="text-[10px] font-medium text-reloop-espresso/45">
                Verified product history
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles
                size={14}
                className="text-reloop-orange"
              />

              <span className="text-[10px] font-medium text-reloop-espresso/45">
                Health & condition scores
              </span>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            RIGHT — FEATURED PRODUCT
        ====================================================== */}

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
            {/* Back decorative card */}

            <div className="absolute -inset-5 rotate-3 rounded-[2rem] bg-reloop-clay/20" />

            {/* Product card */}

            <div className="relative overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-white p-5 shadow-[0_30px_80px_rgba(33,26,23,0.12)] sm:p-6">
              {/* Product visual */}

              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[1.5rem] bg-reloop-neutral">
                {/* Decorative circles */}

                <div className="absolute h-44 w-44 rounded-full border border-reloop-espresso/5" />

                <div className="absolute h-32 w-32 rounded-full border border-reloop-espresso/5" />

                {/* Laptop representation */}

                <div className="relative w-52">
                  <div className="rounded-xl border-[5px] border-reloop-espresso bg-[#38302c] p-2 shadow-[0_20px_35px_rgba(33,26,23,0.18)]">
                    <div className="flex h-28 items-center justify-center rounded-md bg-reloop-espresso">
                      <span className="font-display text-3xl font-bold text-reloop-chartreuse">
                        D
                      </span>
                    </div>
                  </div>

                  <div className="mx-auto h-2 w-56 rounded-b-full bg-reloop-espresso" />

                  <div className="mx-auto mt-1 h-1 w-24 rounded-full bg-reloop-espresso/20" />
                </div>

                {/* Health badge */}

                <div className="absolute right-4 top-4 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
                  <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                    Health
                  </p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono text-lg font-semibold text-reloop-orange">
                      92
                    </span>

                    <span className="text-[8px] text-reloop-espresso/35">
                      / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Product information */}

              <div className="mt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-reloop-espresso/30">
                      Verified listing
                    </p>

                    <h2 className="mt-2 font-display text-2xl font-semibold text-reloop-espresso">
                      Dell XPS 15
                    </h2>

                    <p className="mt-1 text-xs text-reloop-espresso/40">
                      2024 · 16GB · 512GB SSD
                    </p>
                  </div>

                  <span className="rounded-full bg-reloop-chartreuse px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-reloop-espresso">
                    Excellent
                  </span>
                </div>

                {/* Product stats */}

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-reloop-neutral p-3">
                    <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-reloop-espresso/30">
                      Health
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold text-reloop-orange">
                      92
                    </p>
                  </div>

                  <div className="rounded-xl bg-reloop-neutral p-3">
                    <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-reloop-espresso/30">
                      Age
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold text-reloop-espresso">
                      1.4Y
                    </p>
                  </div>

                  <div className="rounded-xl bg-reloop-neutral p-3">
                    <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-reloop-espresso/30">
                      Events
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold text-reloop-espresso">
                      06
                    </p>
                  </div>
                </div>

                {/* Price */}

                <div className="mt-5 flex items-end justify-between border-t border-reloop-espresso/10 pt-5">
                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                      Current price
                    </p>

                    <p className="mt-1 font-mono text-xl font-semibold text-reloop-espresso">
                      PKR 185,000
                    </p>
                  </div>

                  <Link
                    to="/marketplace/1"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-espresso text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-reloop-orange"
                    aria-label="View product"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
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
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-reloop-espresso/35">
                Product passport
              </p>

              <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-reloop-espresso">
                <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />
                History verified
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MarketplaceHero;