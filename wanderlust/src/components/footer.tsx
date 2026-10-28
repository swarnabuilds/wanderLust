import { ArrowUpRight } from "lucide-react";

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"];
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socials = [
  { label: "X (Twitter)", icon: XIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
  { label: "Instagram", icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0c0c0c] text-white">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16">
        <h2 className="font-serif text-5xl font-semibold md:text-6xl">Wanderlast</h2>
        <p className="mt-3 text-sm text-gray-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h3 className="font-serif text-sm text-gray-300 uppercase">Newsletter</h3>
            <p className="mt-3 text-xs text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-3 w-64">
              <input
                type="email"
                placeholder="Enter email"
                className="h-10 w-full rounded-sm bg-[#2a2a2a] px-4 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-white/30"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute top-0 right-0 flex h-full w-10 items-center justify-center text-gray-400 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="font-serif text-sm text-gray-300 uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm text-gray-300 uppercase">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm text-gray-300 uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
              <li>786 901 1622</li>
              <li>info@wanderlast.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">© 2026 Wanderlast. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="text-gray-400 transition-colors hover:text-white"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
