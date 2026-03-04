import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lab-blue-dark text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lab info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/images/logos/aran-lab-logo.png"
                alt="Aran Lab"
                width={40}
                height={40}
                className="w-10 h-10 brightness-0 invert"
              />
              <h3 className="text-lg font-serif font-bold text-white">
                Biomedical Data Science Lab
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              Faculty of Biology
              <br />
              Technion &ndash; Israel Institute of Technology
              <br />
              Haifa, Israel
            </p>
            {/* Institutional logo */}
            <div className="flex items-center gap-4 mt-4">
              <Image
                src="/images/logos/cs-faculty.png"
                alt="Taub Faculty of Computer Science"
                width={120}
                height={30}
                className="h-6 w-auto brightness-0 invert opacity-60"
              />
            </div>
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
                  href="mailto:aran.lab.technion@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  aran.lab.technion@gmail.com
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
          &copy; {new Date().getFullYear()} Biomedical Data Science Lab, Technion. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
