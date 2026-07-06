import Script from "next/script";

// Renders nothing but a sized placeholder until NEXT_PUBLIC_ADSENSE_CLIENT_ID
// is set post-approval - so the site works today and "lights up" later with
// no code change. The min-height avoids layout shift either way.
export default function AdSlot({ slot }: { slot: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId) {
    return (
      <div
        className="min-h-[100px] flex items-center justify-center rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 text-xs text-neutral-400"
        aria-hidden
      >
        Ad space
      </div>
    );
  }

  return (
    <div className="min-h-[100px]">
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <ins
        className="adsbygoogle block"
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id={`adsbygoogle-init-${slot}`} strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
