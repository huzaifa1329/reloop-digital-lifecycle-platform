import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BatteryMedium,
  CircleDollarSign,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const resaleProducts = [
  {
    name: "MacBook Air M2",
    category: "Laptop",
    condition: "Excellent",
    health: 94,
    price: "PKR 185,000",
    location: "Islamabad",
    age: "1.8 years",
    repairs: "0 repairs",
  },
  {
    name: "Sony WH-1000XM5",
    category: "Audio",
    condition: "Very Good",
    health: 89,
    price: "PKR 54,000",
    location: "Lahore",
    age: "1.2 years",
    repairs: "1 repair",
  },
  {
    name: "iPhone 14 Pro",
    category: "Smartphone",
    condition: "Good",
    health: 86,
    price: "PKR 162,000",
    location: "Karachi",
    age: "2.1 years",
    repairs: "1 repair",
  },
];

function ResalePreview() {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-reloop-chartreuse">
                <RefreshCw
                  size={16}
                  className="text-reloop-espresso"
                />
              </span>

              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-reloop-burnt-orange">
                Give it another life
              </p>
            </div>

            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1] tracking-[-0.045em] text-reloop-espresso sm:text-5xl lg:text-6xl">
              Good products
              <br />
              deserve a
              <span className="text-reloop-burnt-orange">
                {" "}
                second chapter.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:max-w-md lg:justify-self-end"
          >
            <p className="text-sm leading-6 text-reloop-espresso/60 sm:text-base">
              ReLoop makes resale more transparent by carrying a
              product's history forward. Buyers can see condition,
              health, repairs and lifecycle information before making
              a decision.
            </p>

            <Link
              to="/marketplace"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-reloop-espresso transition-colors duration-300 hover:text-reloop-burnt-orange"
            >
              Explore marketplace
              <ArrowRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Marketplace preview */}
        <div className="mt-14">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-reloop-espresso/30">
                Recently re-looped
              </p>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-reloop-espresso">
                Products ready for their next owner
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-reloop-espresso/40">
              <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />
              Lifecycle verified
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {resaleProducts.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                className="group overflow-hidden rounded-[1.75rem] border border-reloop-espresso/10 bg-reloop-ivory transition-all duration-300 hover:-translate-y-1 hover:border-reloop-espresso/20"
              >
                {/* Product visual */}
                <div className="relative flex h-60 items-center justify-center overflow-hidden bg-reloop-espresso">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 opacity-[0.08]">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                  </div>

                  {/* Product shape */}
                  <motion.div
                    whileHover={{ scale: 1.04, rotate: -1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="relative flex h-32 w-44 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/[0.07] shadow-2xl"
                  >
                    <div className="h-20 w-32 rounded-xl border border-white/20 bg-white/[0.06]">
                      <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-white/10" />

                      <div className="mx-auto mt-5 h-8 w-14 rounded-lg bg-reloop-chartreuse/20" />
                    </div>
                  </motion.div>

                  {/* Health badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-reloop-chartreuse/20 bg-reloop-chartreuse/10 px-3 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-reloop-chartreuse">
                      {product.health} health
                    </span>
                  </div>

                  {/* Verified badge */}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <BadgeCheck
                      size={15}
                      className="text-white/70"
                    />
                  </div>
                </div>

                {/* Product information */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-reloop-espresso/30">
                        {product.category}
                      </p>

                      <h4 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-reloop-espresso">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                      <Sparkles
                        size={15}
                        className="text-reloop-burnt-orange"
                      />
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                        Condition
                      </p>

                      <p className="mt-1 text-xs font-medium text-reloop-espresso">
                        {product.condition}
                      </p>
                    </div>

                    <div className="h-8 w-px bg-reloop-espresso/10" />

                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                        Age
                      </p>

                      <p className="mt-1 text-xs font-medium text-reloop-espresso">
                        {product.age}
                      </p>
                    </div>
                  </div>

                  {/* Lifecycle information */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-reloop-espresso/10 p-3">
                      <div className="flex items-center gap-1.5">
                        <WrenchIcon />

                        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-reloop-espresso/30">
                          Repairs
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] text-reloop-espresso/65">
                        {product.repairs}
                      </p>
                    </div>

                    <div className="rounded-xl border border-reloop-espresso/10 p-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          size={12}
                          strokeWidth={1.6}
                          className="text-reloop-espresso/35"
                        />

                        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-reloop-espresso/30">
                          Location
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] text-reloop-espresso/65">
                        {product.location}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-reloop-espresso/10 pt-5">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                        Estimated value
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <CircleDollarSign
                          size={14}
                          className="text-reloop-burnt-orange"
                        />

                        <p className="font-mono text-base text-reloop-espresso">
                          {product.price}
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/marketplace"
                      aria-label={`View ${product.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-reloop-espresso text-white transition-all duration-300 group-hover:bg-reloop-burnt-orange"
                    >
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Transparency message */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Lifecycle verified"
            description="Product history travels with the item instead of disappearing after resale."
          />

          <InfoCard
            icon={<BatteryMedium size={18} />}
            title="Health visible"
            description="Buyers can understand the current condition before making a decision."
          />

          <InfoCard
            icon={<CircleDollarSign size={18} />}
            title="Value informed"
            description="Estimated value considers the product's age, condition and lifecycle."
          />
        </motion.div>
      </div>
    </section>
  );
}

function WrenchIcon() {
  return (
    <Wrench
      size={12}
      strokeWidth={1.6}
      className="text-reloop-espresso/35"
    />
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-reloop-espresso/10 bg-reloop-ivory p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-chartreuse/30 text-reloop-espresso">
        {icon}
      </div>

      <h4 className="mt-5 font-display text-sm font-semibold text-reloop-espresso">
        {title}
      </h4>

      <p className="mt-2 text-[11px] leading-5 text-reloop-espresso/45">
        {description}
      </p>
    </div>
  );
}

export default ResalePreview;