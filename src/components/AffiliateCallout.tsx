type AffiliateLink = {
  keyword: string;
  label: string;
  url: string;
  disclosure: string;
};

export default function AffiliateCallout({ links }: { links: AffiliateLink[] }) {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-amber-50 dark:bg-amber-950/30 p-2.5 text-xs">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-medium text-amber-800 dark:text-amber-300 hover:underline"
        >
          Try {link.label} →
        </a>
      ))}
      <span className="text-amber-700/70 dark:text-amber-400/70">{links[0].disclosure}</span>
    </div>
  );
}
