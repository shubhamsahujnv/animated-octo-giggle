import { createFileRoute } from "@tanstack/react-router";
import { BLOG_FAQS, BlogFooter, BlogHeader, FaqList, faqLd, seo } from "../components/blog-chrome";

export const Route = createFileRoute("/blog/faq")({
  head: () => ({
    ...seo({
      title: "Blog FAQ — The Baseline Journal by TGS",
      description: "Answers about The Baseline Journal: topics, writers, how to contribute, the editorial process, publishing schedule, sharing and contacting the editors.",
      path: "/blog/faq",
    }),
    scripts: [faqLd(BLOG_FAQS)],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The Baseline Journal</p>
        <h1 className="tgs-display mt-3">Frequently asked questions</h1>
        <FaqList faqs={BLOG_FAQS} />
        <p className="mt-8 text-sm">
          Still have a question? Email{" "}
          <a className="font-semibold underline underline-offset-4" href="mailto:info@thegreensolve.com">info@thegreensolve.com</a>.
        </p>
      </main>
      <BlogFooter />
    </div>
  );
}
