import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lab-blue-dark text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lab info */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-3">
              Aran Lab
            </h3>
            <p className="text-sm leading-relaxed">
              Faculty of Biology &amp; Taub Faculty of Computer Science
              <br />
              Technion &ndash; Israel Institute of Technology
              <br />
              LS&amp;E Building, Floor 8
              <br />
              Haifa, Israel
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="hover:text-white transition-colors"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/software"
                  className="hover:text-white transition-colors"
                >
                  Software
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:dviraran@technion.ac.il"
                  className="hover:text-white transition-colors"
                >
                  dviraran@technion.ac.il
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/dvir_a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @dvir_a
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dviraran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://scholar.google.com/citations?user=-hr7rD8AAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Google Scholar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-sm text-white/50 text-center">
          &copy; {new Date().getFullYear()} Aran Lab, Technion. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
