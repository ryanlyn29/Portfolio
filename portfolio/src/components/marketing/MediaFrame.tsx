import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { MediaAsset } from '../../data/caseStudies';

type MediaInput = MediaAsset | string | undefined;

type MediaFrameProps = {
  media?: MediaInput;
  fallbackIcon: LucideIcon;
  fallbackBg?: string;
  className?: string;
};

function resolveMedia(media: MediaInput) {
  if (!media) return null;

  if (typeof media === 'string') {
    return {
      src: media,
      kind: media.endsWith('.mp4') ? ('video' as const) : ('image' as const),
      alt: '',
      poster: undefined,
      fit: 'cover' as const,
      position: undefined,
    };
  }

  return media;
}

export function MediaFrame({
  media,
  fallbackIcon: Icon,
  fallbackBg = 'var(--color-surface)',
  className = '',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const asset = resolveMedia(media);
  const showFallback = !asset || failed;
  const isVideo = asset?.kind === 'video';
  const objectFit = asset?.fit ?? 'cover';
  const objectPosition = asset?.position;

  return (
    <div
      className={`relative overflow-hidden border border-line bg-surface ${className}`}
      style={showFallback ? { backgroundColor: fallbackBg } : undefined}
    >
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-10 w-10 text-muted" aria-hidden />
        </div>
      ) : isVideo ? (
        <video
          src={asset.src}
          poster={asset.poster}
          className="h-full w-full"
          style={{ objectFit, objectPosition }}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setFailed(true)}
        />
      ) : (
        <img
          src={asset.src}
          alt={asset.alt}
          className="h-full w-full"
          style={{ objectFit, objectPosition }}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
