import { useEffect, useState } from "react";
import "./CrossfadeImage.css";

type CrossfadeImageProps = {
  src: string;
  className?: string;
};

export function CrossfadeImage({
  src,
  className = "",
}: CrossfadeImageProps) {
  const [current, setCurrent] = useState(src);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    if (src === current) return;

    setPrevious(current);
    setCurrent(src);

    const timer = window.setTimeout(() => {
      setPrevious(null);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [src, current]);

  return (
    <>
      {previous && (
        <div
          className={`crossfade-image ${className}`}
          style={{ backgroundImage: `url(${previous})` }}
        />
      )}

      <div
        className={`crossfade-image crossfade-image--active ${className}`}
        style={{ backgroundImage: `url(${current})` }}
      />
    </>
  );
}