import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

const repairPartners = [
  {
    name: "Circuit Care",
    specialty: "Laptop & Electronics",
    location: "Islamabad",
    rating: "4.9",
    jobs: "248",
    response: "Usually within 2 hrs",
    verified: true,
  },
  {
    name: "HomeFix Workshop",
    specialty: "Home Appliances",
    location: "Rawalpindi",
    rating: "4.8",
    jobs: "186",
    response: "Usually within 4 hrs",
    verified: true,
  },
  {
    name: "TechRevive",
    specialty: "Phones & Tablets",
    location: "Lahore",
    rating: "4.7",
    jobs: "321",
    response: "Usually within 3 hrs",
    verified: true,
  },
];

function RepairNetworkPreview() {
  return (
    <section className="overflow-hidden bg-reloop-ivory py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section introduction */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-reloop-burnt-orange">
              ReLoop repair network
            </p>

            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1] tracking-[-0.04em] text-reloop-espresso sm:text-5xl lg:text-6xl">
              When something breaks,
              <span className="text-reloop-burnt-orange">
                {" "}
                keep it moving.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:justify-self-end lg:max-w-xl"
          >
            <p className="text-sm leading-6 text-reloop-espresso/60 sm:text-base">
              Connect your product with verified repair partners,
              share its lifecycle history, and keep every repair
              connected to its digital passport.
            </p>

            <Link
              to="/repair-partners"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-reloop-espresso transition-colors duration-300 hover:text-reloop-burnt-orange"
            >
              Explore repair network
              <ArrowRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Network overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mt-14 overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-white"
        >
          {/* Network header */}
          <div className="border-b border-reloop-espresso/10 bg-reloop-espresso px-5 py-5 text-white sm:px-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-reloop-chartreuse">
                  <Wrench
                    size={19}
                    strokeWidth={1.8}
                    className="text-reloop-espresso"
                  />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                    Verified repair network
                  </p>

                  <h3 className="mt-1 font-display text-lg font-semibold">
                    Trusted hands for your next repair
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start rounded-full border border-reloop-chartreuse/20 bg-reloop-chartreuse/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-reloop-chartreuse">
                  Network active
                </span>
              </div>
            </div>
          </div>

          {/* Partner cards */}
          <div className="grid divide-y divide-reloop-espresso/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {repairPartners.map((partner, index) => (
              <motion.article
                key={partner.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group p-5 transition-colors duration-300 hover:bg-reloop-ivory sm:p-7"
              >
                {/* Partner identity */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-reloop-espresso text-reloop-chartreuse">
                    <Wrench size={19} strokeWidth={1.7} />
                  </div>

                  {partner.verified && (
                    <div className="flex items-center gap-1.5 rounded-full bg-reloop-chartreuse/15 px-2.5 py-1.5">
                      <BadgeCheck
                        size={13}
                        className="text-reloop-espresso"
                      />

                      <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-reloop-espresso">
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                <h4 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-reloop-espresso">
                  {partner.name}
                </h4>

                <p className="mt-1 text-xs text-reloop-espresso/45">
                  {partner.specialty}
                </p>

                {/* Location */}
                <div className="mt-5 flex items-center gap-2 text-xs text-reloop-espresso/55">
                  <MapPin size={14} strokeWidth={1.6} />

                  <span>{partner.location}</span>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-reloop-ivory p-3">
                    <div className="flex items-center gap-1.5">
                      <Star
                        size={13}
                        className="fill-current text-reloop-burnt-orange"
                      />

                      <span className="font-mono text-[9px] text-reloop-espresso/40">
                        RATING
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-sm text-reloop-espresso">
                      {partner.rating}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-reloop-ivory p-3">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck
                        size={13}
                        className="text-reloop-burnt-orange"
                      />

                      <span className="font-mono text-[9px] text-reloop-espresso/40">
                        JOBS
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-sm text-reloop-espresso">
                      {partner.jobs}
                    </p>
                  </div>
                </div>

                {/* Response */}
                <div className="mt-5 flex items-center gap-2 border-t border-reloop-espresso/10 pt-5">
                  <Clock3
                    size={14}
                    strokeWidth={1.6}
                    className="text-reloop-espresso/35"
                  />

                  <span className="text-[11px] text-reloop-espresso/45">
                    {partner.response}
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-reloop-espresso/35">
                    View partner
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-reloop-espresso/10 transition-all duration-300 group-hover:border-reloop-burnt-orange group-hover:bg-reloop-burnt-orange group-hover:text-white">
                    <ArrowRight
                      size={14}
                      strokeWidth={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Bottom network information */}
          <div className="border-t border-reloop-espresso/10 bg-reloop-ivory px-5 py-5 sm:px-7">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-reloop-espresso/30">
                  Network size
                </p>

                <p className="mt-2 font-mono text-lg text-reloop-espresso">
                  120+
                </p>

                <p className="mt-1 text-[10px] text-reloop-espresso/40">
                  verified repair partners
                </p>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-reloop-espresso/30">
                  Coverage
                </p>

                <p className="mt-2 font-mono text-lg text-reloop-espresso">
                  14 cities
                </p>

                <p className="mt-1 text-[10px] text-reloop-espresso/40">
                  and growing
                </p>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-reloop-espresso/30">
                  Average rating
                </p>

                <p className="mt-2 font-mono text-lg text-reloop-espresso">
                  4.8 / 5
                </p>

                <p className="mt-1 text-[10px] text-reloop-espresso/40">
                  across completed jobs
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lifecycle connection */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col gap-4 rounded-3xl border border-reloop-espresso/10 bg-reloop-chartreuse p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-reloop-espresso">
              <ShieldCheck
                size={18}
                className="text-reloop-chartreuse"
              />
            </div>

            <div>
              <p className="font-display text-sm font-semibold text-reloop-espresso">
                Repairs become part of the product's history.
              </p>

              <p className="mt-1 max-w-xl text-xs leading-5 text-reloop-espresso/55">
                Every completed repair can update the Digital Product
                Passport, helping owners understand what happened and
                what their product may need next.
              </p>
            </div>
          </div>

          <ArrowRight
            size={20}
            className="hidden text-reloop-espresso/40 sm:block"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default RepairNetworkPreview;