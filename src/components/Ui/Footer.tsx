interface Social {
  icon: string;
  href: string;
  label: string;
}

interface Link {
  label: string;
  href: string;
}

interface FooterProps {
  name: string;
  year: number;
  socials: Social[];
  links: Link[];
}

export default function Footer({ name, year, socials, links }: FooterProps) {
  return (
    <footer className="border-t border-blue-200 dark:border-gray-900 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-[#111418] dark:text-white">
              {name}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap gap-6">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#111418] dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-blue-200 dark:border-gray-900 my-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {year} {name}. All rights reserved.
          </p>

          {/* Social links */}
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-gray-800 hover:text-[#111418] dark:hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
