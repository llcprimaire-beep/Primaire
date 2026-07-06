import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16 py-8 text-sm text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col gap-3 max-w-3xl mx-auto px-4">
        <p>
          AI News Hub curates headlines from public RSS feeds of AI-focused publications.
          Every story links back to its original source — we do not reproduce full articles.
          Short summaries and &quot;why it matters&quot; notes are our own commentary.
        </p>
        <p>This site may display ads and, where disclosed, affiliate links that earn us a commission.</p>
        <nav className="flex gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
