import { useEffect, useMemo, useState } from 'react';
import { getImageCandidates } from '@/lib/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback = ({ src, alt, className, loading = 'lazy' }: ImageWithFallbackProps) => {
  const candidates = useMemo(() => getImageCandidates(src), [src]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [src]);

  const handleError = () => {
    setIndex((current) => (current < candidates.length - 1 ? current + 1 : current));
  };

  return (
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
