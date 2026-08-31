import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const repairSteps = [
  {
    number: "01",
    title: "Find a partner",
    description:
      "Search repair professionals based on location, service and product type.",
  },
  {
    number: "02",
    title: "Share your product",
    description:
      "Connect your Digital Product Passport so the repair partner can understand its history.",
  },
  {
    number: "03",
    title: "Get it repaired",
    description:
      "Choose a suitable repair option and keep the repair event connected to your product.",
  },
];

function RepairPartners() {
  const [search, setSearch] = useState("");

  const [repairPartners, setRepairPartners] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
   * Load approved repair partners from MongoDB
   * through the public providers API.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadPartners() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/providers`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );

        const data = await response.json().catch(() => []);

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load repair partners.",
          );
        }

        if (!cancelled) {
          setRepairPartners(
            Array.isArray(data) ? data : [],
          );
        }
      } catch (err) {
        if (!cancelled) {
          console.error(
            "Failed to load repair partners:",
            err,
          );

          setError(
            err?.message ||
              "Unable to load repair partners.",
          );

          setRepairPartners([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPartners();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPartners = useMemo(() => {
    if (!search.trim()) {
      return repairPartners;
    }

    const term = search.trim().toLowerCase();

    return repairPartners.filter((partner) => {
      const location =
        String(partner.location || "").toLowerCase();

      const name =
        String(partner.name || "").toLowerCase();

      const category =
        String(partner.category || "").toLowerCase();

      const services = Array.isArray(partner.services)
        ? partner.services.join(" ").toLowerCase()
        : "";

      return (
        location.includes(term) ||
        name.includes(term) ||
        category.includes(term) ||
        services.includes(term)
      );
    });
  }, [search, repairPartners]);

  return (
    <main className="min-h-screen overflow-hidden bg-reloop-ivory text-reloop-espresso">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-reloop-espresso text-white">
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

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
                ReLoop Repair Network
              </p>
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Repair it
              <br />
              before you
              <br />
              <span className="text-reloop-chartreuse">
                replace it.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
              Find trusted repair partners, understand your
              options and keep every repair connected to your
              product's digital lifecycle.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#repair-network"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-reloop-chartreuse px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-reloop-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Find a repair partner

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
              >
                How ReLoop works
              </Link>
            </div>
          </motion.div>

          {/* Hero visual */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 -rotate-2 rounded-[2rem] bg-reloop-chartreuse/[0.05]" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#29221f] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-6">
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                      Repair recommendation
                    </p>

                    <h2 className="mt-2 font-display text-2xl font-semibold">
                      Dell XPS 15
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                    <Wrench size={18} />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
                      Product health
                    </span>

                    <span className="font-mono text-[9px] text-reloop-chartreuse">
                      82 / 100
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                    <div className="h-full w-[82%] rounded-full bg-reloop-chartreuse" />
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-reloop-chartreuse p-5 text-reloop-espresso">
                  <div className="flex items-center gap-2">
                    <Check size={15} strokeWidth={3} />

                    <p className="text-xs font-semibold">
                      Repair recommended
                    </p>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-reloop-espresso/65">
                    Estimated repair cost is lower than
                    replacing the product.
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.07] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={14}
                      className="text-reloop-chartreuse"
                    />

                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
                      Passport connected
                    </span>
                  </div>

                  <span className="font-mono text-[8px] text-white/25">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="relative overflow-hidden bg-reloop-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full border border-reloop-espresso/[0.06]"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-reloop-orange/[0.04]"
                aria-hidden="true"
              />

              <div className="relative max-w-sm">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-reloop-orange" />

                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                    A connected repair experience
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-reloop-neutral p-5 shadow-[0_20px_60px_rgba(33,26,23,0.07)] sm:p-6">
                  <div className="flex items-center justify-between border-b border-reloop-espresso/10 pb-5">
                    <div>
                      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-reloop-espresso/30">
                        Lifecycle event
                      </p>

                      <h3 className="mt-2 font-display text-xl font-semibold">
                        Repair completed
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                      <Wrench size={17} />
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-reloop-espresso/10 bg-reloop-ivory p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                          Product
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Dell XPS 15
                        </p>
                      </div>

                      <span className="rounded-full bg-reloop-chartreuse px-2.5 py-1 font-mono text-[6px] font-semibold uppercase tracking-[0.1em]">
                        Active
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-reloop-neutral p-3">
                        <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-reloop-espresso/25">
                          Health
                        </p>

                        <p className="mt-1 font-mono text-sm font-semibold">
                          82 / 100
                        </p>
                      </div>

                      <div className="rounded-xl bg-reloop-neutral p-3">
                        <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-reloop-espresso/25">
                          Event
                        </p>

                        <p className="mt-1 text-xs font-semibold">
                          Repair
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative my-3 flex items-center justify-center">
                    <div className="h-8 w-px bg-reloop-espresso/10" />

                    <div className="absolute flex h-7 w-7 items-center justify-center rounded-full border border-reloop-espresso/10 bg-reloop-ivory">
                      <ArrowRight
                        size={11}
                        className="rotate-90 text-reloop-orange"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-reloop-espresso p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                          <ShieldCheck size={15} />
                        </div>

                        <div>
                          <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/30">
                            Digital Product Passport
                          </p>

                          <p className="mt-1 text-xs font-semibold">
                            History updated
                          </p>
                        </div>
                      </div>

                      <Check
                        size={15}
                        className="text-reloop-chartreuse"
                        strokeWidth={2.5}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
                      <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/30">
                        Repair event
                      </span>

                      <span className="font-mono text-[7px] text-reloop-chartreuse">
                        MAY 2026
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-reloop-espresso/10 bg-reloop-ivory px-4 py-3 shadow-xl sm:block"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                    <span className="font-mono text-[7px] font-medium uppercase tracking-[0.1em] text-reloop-espresso/45">
                      Passport synced
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Your repair should
                <br />
                become part of the
                <br />
                <span className="text-reloop-orange">
                  product's story.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-6 text-reloop-espresso/50 sm:text-base">
                ReLoop does more than help you find a repair shop.
                Completed repairs can become lifecycle events inside
                your Digital Product Passport.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-reloop-espresso/10 bg-white/40 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-reloop-chartreuse text-reloop-espresso">
                      <Check size={12} strokeWidth={2.5} />
                    </span>

                    <span className="font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-reloop-espresso/50">
                      Connected
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-reloop-espresso/45">
                    Every completed repair can become part of
                    your product's lifecycle history.
                  </p>
                </div>

                <div className="rounded-2xl border border-reloop-espresso/10 bg-white/40 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-reloop-espresso text-white">
                      <ShieldCheck size={12} />
                    </span>

                    <span className="font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-reloop-espresso/50">
                      Transparent
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-reloop-espresso/45">
                    Keep your product's repair history available
                    for its next decision or owner.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          REPAIR NETWORK
      ====================================================== */}

      <section
        id="repair-network"
        className="scroll-mt-20 bg-reloop-neutral py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-reloop-chartreuse" />

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                  Repair partners
                </p>
              </div>

              <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                Find someone
                <br />
                who can
                <br />
                <span className="text-reloop-orange">
                  keep it going.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-reloop-espresso/50">
              Explore repair professionals and choose based on
              location, expertise, ratings and the services they
              offer.
            </p>
          </div>

          {/* Search */}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MapPin
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-reloop-espresso/30"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, area or service..."
                className="h-12 w-full rounded-full border border-reloop-espresso/10 bg-reloop-ivory pl-11 pr-5 text-sm text-reloop-espresso outline-none placeholder:text-reloop-espresso/30 focus:border-reloop-orange/40"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("partner-cards")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-reloop-espresso px-6 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-reloop-orange"
            >
              Search network

              <ArrowRight size={13} />
            </button>
          </div>

          {/* =====================================================
              LOADING
          ====================================================== */}

          {loading && (
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-[1.75rem] border border-reloop-espresso/10 bg-reloop-ivory p-6"
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-reloop-espresso/10" />

                    <div className="flex-1">
                      <div className="h-5 w-1/2 rounded bg-reloop-espresso/10" />

                      <div className="mt-2 h-3 w-1/3 rounded bg-reloop-espresso/10" />
                    </div>
                  </div>

                  <div className="mt-6 h-10 rounded-xl bg-reloop-espresso/10" />

                  <div className="mt-5 h-12 rounded-xl bg-reloop-espresso/10" />
                </div>
              ))}
            </div>
          )}

          {/* =====================================================
              API ERROR
          ====================================================== */}

          {!loading && error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
              <p className="text-sm font-semibold text-red-700">
                Unable to load repair partners
              </p>

              <p className="mt-2 text-xs text-red-600/80">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-full bg-red-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* =====================================================
              PARTNER CARDS
          ====================================================== */}

          {!loading && !error && (
            <div
              id="partner-cards"
              className="mt-10 grid gap-4 lg:grid-cols-2"
            >
              {filteredPartners.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-reloop-espresso/15 py-16 text-center">
                  <Wrench
                    size={28}
                    className="mx-auto text-reloop-espresso/20"
                  />

                  <p className="mt-4 text-sm font-semibold text-reloop-espresso/60">
                    {repairPartners.length === 0
                      ? "No verified repair partners yet."
                      : `No repair partners match "${search}".`}
                  </p>

                  <p className="mt-2 text-xs text-reloop-espresso/40">
                    {repairPartners.length === 0
                      ? "Approved repair partners will appear here automatically."
                      : "Try a different area, city or service."}
                  </p>
                </div>
              )}

              {filteredPartners.map((partner, index) => (
                <motion.article
                  key={partner.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="group rounded-[1.75rem] border border-reloop-espresso/10 bg-reloop-ivory p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(33,26,23,0.08)] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-reloop-espresso text-white">
                        <Wrench size={18} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-xl font-semibold">
                            {partner.name}
                          </h3>

                          {partner.verified && (
                            <span className="flex items-center gap-1 rounded-full bg-reloop-chartreuse px-2 py-1 text-reloop-espresso">
                              <ShieldCheck size={10} />

                              <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.1em]">
                                Verified
                              </span>
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-reloop-espresso/40">
                          {partner.category}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star
                          size={12}
                          fill="currentColor"
                          className="text-reloop-orange"
                        />

                        <span className="font-mono text-xs font-semibold">
                          {partner.rating || "0.0"}
                        </span>
                      </div>

                      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-reloop-espresso/30">
                        {partner.repairs || 0} repairs
                      </p>
                    </div>
                  </div>

                  {/* Services */}

                  {Array.isArray(partner.services) &&
                    partner.services.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {partner.services.map(
                          (service, serviceIndex) => (
                            <span
                              key={`${service}-${serviceIndex}`}
                              className="rounded-full border border-reloop-espresso/10 px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-reloop-espresso/45"
                            >
                              {service}
                            </span>
                          ),
                        )}
                      </div>
                    )}

                  <div className="mt-5 grid gap-3 border-t border-reloop-espresso/10 pt-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={13}
                        className="text-reloop-orange"
                      />

                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-reloop-espresso/25">
                          Location
                        </p>

                        <p className="mt-0.5 text-xs text-reloop-espresso/60">
                          {partner.location ||
                            "Location not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3
                        size={13}
                        className="text-reloop-orange"
                      />

                      <div>
                        <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-reloop-espresso/25">
                          Response
                        </p>

                        <p className="mt-0.5 text-xs text-reloop-espresso/60">
                          {partner.response ||
                            "Usually responds within 24 hrs"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-reloop-espresso px-5 py-3 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-reloop-orange"
                  >
                    Sign in to request repair

                    <ArrowRight size={13} />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-reloop-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-reloop-orange" />

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-reloop-espresso/40">
                Simple process
              </p>
            </div>

            <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
              Repair without
              <br />
              losing the
              <br />
              <span className="text-reloop-orange">
                product history.
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-reloop-espresso/10 bg-reloop-espresso/10 md:grid-cols-3">
            {repairSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="bg-reloop-neutral p-6 sm:p-7"
              >
                <span className="font-mono text-[8px] tracking-[0.15em] text-reloop-espresso/25">
                  {step.number}
                </span>

                <h3 className="mt-10 font-display text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-5 text-reloop-espresso/45">
                  {step.description}
                </p>

                <div className="mt-7 h-px bg-reloop-espresso/10" />

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-reloop-chartreuse" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-reloop-espresso/30">
                    Connected to your passport
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-reloop-ivory pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-[2.5rem] bg-reloop-espresso px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.07]" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-reloop-chartreuse/[0.035]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Keep the loop going
                </p>

                <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                  Don't replace it
                  <br />
                  until you've
                  <br />
                  <span className="text-reloop-chartreuse">
                    checked the options.
                  </span>
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-6 text-white/45">
                  Register your product with ReLoop and let its
                  health, history and lifecycle guide your next
                  decision.
                </p>
              </div>

              <Link
                to="/register"
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-reloop-chartreuse px-6 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-reloop-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Create your passport

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default RepairPartners;