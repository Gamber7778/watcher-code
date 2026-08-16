"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const PIXEL_ID = "1512472939689278";

type PixelParams = Record<string, string | number | boolean | string[] | undefined>;

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export function fbTrack(event: string, params?: PixelParams) {
    window.fbq?.("track", event, params);
}

export function fbTrackCustom(event: string, params?: PixelParams) {
    window.fbq?.("trackCustom", event, params);
}

export function FacebookPixel() {
    return (
        <>
            <Script id="fb-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window,document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${PIXEL_ID}');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt=""
                    src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
}

/**
 * Fires ViewContent on mount, then scroll-depth and time-on-page milestones.
 * Each milestone is sent at most once per page load.
 */
export function usePixelEngagement(contentName: string) {
    const sent = useRef(new Set<string>());

    useEffect(() => {
        const fired = sent.current;
        const once = (key: string, run: () => void) => {
            if (fired.has(key)) return;
            fired.add(key);
            run();
        };

        once("ViewContent", () =>
            fbTrack("ViewContent", { content_name: contentName, content_type: "landing_page" })
        );

        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;
            const percent = (window.scrollY / scrollable) * 100;
            for (const milestone of [25, 50, 75, 90]) {
                if (percent >= milestone) {
                    once(`scroll-${milestone}`, () =>
                        fbTrackCustom("ScrollDepth", { content_name: contentName, percent: milestone })
                    );
                }
            }
        };

        const timers = [30, 60, 120].map((seconds) =>
            window.setTimeout(
                () =>
                    once(`time-${seconds}`, () =>
                        fbTrackCustom("TimeOnPage", { content_name: contentName, seconds })
                    ),
                seconds * 1000
            )
        );

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            timers.forEach(window.clearTimeout);
        };
    }, [contentName]);
}
