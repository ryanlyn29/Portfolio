import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { MediaAsset } from '../../data/caseStudies';
import { cn } from '../../lib/utils';

interface MediaFrameProps {
  media?: MediaAsset;
  /** Icon to render as fallback when media is missing or fails to load. */
  fallbackIcon?: LucideIcon;
  /** Tailwind classes for the wrapper (controls aspect ratio + size). */
  className?: string;
  /** Fallback background color (matches inner card surface). */
  fallbackBg?: string;
  /** Optional overlay children rendered on top (e.g. traffic-light dots, badges). */
  children?: React.ReactNode;
  /** If true, video will not autoplay — useful for cover where user expects to click. */
  pauseVideo?: boolean;
}

/**
 * Renders a project image or video inside the inner white card of a case study frame.
 * - `<img>` assets lazy-load and gracefully fall back to the icon placeholder on error.
 * - `<video>` assets autoplay muted/looped/inline by default, with an onError fallback.
 * - When `media` is undefined, the icon placeholder is shown immediately.
 */
export function MediaFrame({
  media,
  fallbackIcon: FallbackIcon,
  className,
  fallbackBg = '#FAF5EE',
  children,
  pauseVideo = false,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !media || failed;

  const isVideo = media?.kind === 'video';
  const surfaceBg = isVideo ? '#000000' : fallbackBg;

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={isVideo ? { backgroundColor: surfaceBg } : undefined}
    >
      {!showFallback && media?.kind === 'image' && (
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: media.fit ?? 'cover',
            objectPosition: media.position ?? 'center',
          }}
        />
      )}

      {!showFallback && media?.kind === 'video' && (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay={!pauseVideo}
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: media.fit ?? 'contain',
            objectPosition: media.position ?? 'center',
          }}
          aria-label={media.alt}
        />
      )}

      {showFallback && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: surfaceBg }}
          aria-hidden={!!FallbackIcon}
        >
          {FallbackIcon ? (
            <span className="inline-flex w-20 h-20 items-center justify-center rounded-3xl bg-white border border-stone-200/70 text-[#1C1E26]">
              <FallbackIcon size={32} />
            </span>
          ) : (
            <div className="flex flex-col items-center gap-2 text-stone-400 text-xs">
              <span className="inline-flex w-10 h-10 rounded-xl border border-dashed border-stone-300 bg-white" />
              <span>media coming soon</span>
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
