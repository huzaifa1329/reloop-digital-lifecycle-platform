import {
  ArrowUpRight,
  Mail,
  RefreshCw,
} from "lucide-react";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Repair network", href: "/repair-partners" },
    ],
  },
  {
    title: "Lifecycle",
    links: [
      { label: "Digital passport", href: "/how-it-works" },
      { label: "Product health", href: "/how-it-works" },
      { label: "Resale", href: "/marketplace" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Forgot password", href: "/forgot-password" },
    ],
  },
];

function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-reloop-espresso text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid gap-12 border-b border-white/10 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">

          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="ReLoop home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-reloop-chartreuse text-reloop-espresso">
                <RefreshCw size={17} strokeWidth={2} />
              </span>

              <span className="font-display text-lg font-bold tracking-[-0.03em]">
                ReLoop
              </span>
            </a>

            <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-white/90">
              Don't replace it.
              <br />
              <span className="text-reloop-chartreuse">
                Give it another life.
              </span>
            </p>

            <p className="mt-5 max-w-xs text-xs leading-5 text-white/35">
              A digital lifecycle platform helping products stay
              useful for longer.
            </p>

            <a
              href="mailto:hello@reloop.app"
              className="mt-6 inline-flex items-center gap-2 text-xs text-white/45 transition-colors duration-300 hover:text-white"
            >
              <Mail size={13} />
              hello@reloop.app
            </a>
          </div>

          {/* Navigation groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-white/25">
                {group.title}
              </p>

              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-xs text-white/50 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}

                      <ArrowUpRight
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/20">
              © {currentYear} ReLoop
            </p>

            <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/20">
              Built for longer product lives
            </p>
          </div>

          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/15">
            Don't replace. ReLoop.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;