import { Link } from "@tanstack/react-router";
import { TgsLogo } from "./tgs-brand";
import { POSTS } from "../content/posts";

// Shared header and footer for the public journal pages (blog, articles, authors).
// The home page is a static document (index.html) with its own matching chrome.

const navLink =
  "whitespace-nowrap rounded-full px-3 py-1.5 opacity-85 transition hover:bg-primary-foreground/10 hover:opacity-100";
const navActive = "bg-primary-foreground/15 opacity-100";

export function SiteHeader() {
  return (
    <header className="border-b-2 border-foreground/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-5">
        <a
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Baseline by TheGreensolve, home"
        >
          <span className="rounded-md bg-background p-1">
            <TgsLogo className="w-7" />
          </span>
          <span className="font-display text-sm font-bold tracking-tight">
            Baseline <span className="font-medium opacity-70">by TheGreensolve</span>
          </span>
        </a>
        <nav
          aria-label="Main"
          className="-mx-3 flex w-[calc(100%+1.5rem)] flex-wrap items-center gap-0.5 text-sm font-semibold sm:mx-0 sm:w-auto sm:gap-1"
        >
          <a href="/" className={navLink}>
            Platform
          </a>
          <Link
            to="/blog"
            className={navLink}
            activeOptions={{ exact: true }}
            activeProps={{ className: navActive, "aria-current": "page" }}
          >
            Blog
          </Link>
          <Link
            to="/blog/authors"
            className={navLink}
            activeProps={{ className: navActive, "aria-current": "page" }}
          >
            Authors
          </Link>
          <a href="/netlow" className={navLink}>
            Net-Low
          </a>
          <a
            href="/blog#write"
            className="ml-1 hidden whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-accent-foreground sm:inline-block"
          >
            Write with us
          </a>
        </nav>
      </div>
    </header>
  );
}

const footLink = "underline-offset-4 opacity-85 hover:underline hover:opacity-100";

export function SiteFooter() {
  const latest = POSTS[0];
  return (
    <footer className="border-t-2 border-foreground/10 bg-primary px-4 pb-8 pt-12 text-primary-foreground sm:px-5">
      <div className="mx-auto grid max-w-6xl gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="inline-flex rounded-md bg-background p-1.5">
            <TgsLogo className="w-9" />
          </span>
          <div className="mt-3 font-display text-lg font-bold">Baseline by TheGreensolve</div>
          <p className="mt-2 max-w-sm text-sm leading-6 opacity-80">
            Carbon intelligence for manufacturers, from Scope 1–3 accounting to practical reduction
            and verified carbon-credit workflows.
          </p>
        </div>

        <nav aria-label="Journal footer links">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest opacity-70">
            Blog
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link to="/blog" className={footLink}>
                The Baseline Journal
              </Link>
            </li>
            {latest ? (
              <li>
                <Link to="/blog/$slug" params={{ slug: latest.slug }} className={footLink}>
                  Latest article
                </Link>
              </li>
            ) : null}
            <li>
              <Link to="/blog/authors" className={footLink}>
                Authors
              </Link>
            </li>
            <li>
              <a href="/blog#write" className={footLink}>
                Write for the journal
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Platform footer links">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest opacity-70">
            Platform
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <a href="/" className={footLink}>
                Baseline platform
              </a>
            </li>
            <li>
              <a href="/netlow" className={footLink}>
                Net-Low
              </a>
            </li>
            <li>
              <a
                href="mailto:info@thegreensolve.com?subject=Baseline%20demo%20request"
                className={footLink}
              >
                Book a demo
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest opacity-70">
            Contact
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li className="opacity-70">Send inquiries here</li>
            <li>
              <a href="mailto:info@thegreensolve.com" className={`${footLink} break-all`}>
                info@thegreensolve.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/the-green-solve/"
                target="_blank"
                rel="noreferrer"
                className={footLink}
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-primary-foreground/20 pt-5 text-xs opacity-75 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} TheGreensolve. All rights reserved.</span>
        <p className="max-w-xl sm:text-right">
          Carbon credits do not eliminate emissions and should be used as part of a broader
          decarbonization strategy.
        </p>
      </div>
    </footer>
  );
}

/** Visible breadcrumb trail; pair with `breadcrumbs()` schema on the same page. */
export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-semibold">
      <ol className="flex flex-wrap items-center gap-1.5 opacity-85">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {item.to ? (
              <a href={item.to} className="underline-offset-4 hover:underline">
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="opacity-80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
