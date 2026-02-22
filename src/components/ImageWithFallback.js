import { useEffect, useMemo, useState } from 'react';
import { getImageCandidates } from './ImageCha';


const ImageWithFallback = ({
  src,
  alt,
  className,
  loading = 'lazy',
  fill = false,
  onLoadingComplete,
  onLoad,
  style,
  ...rest
}) => {
  const candidates = useMemo(() => getImageCandidates(src), [src]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [src]);

  const handleError = () => {
    setIndex((current) =>
      current < candidates.length - 1 ? current + 1 : current
    );
  };

  return (
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={(e) => {
        if (onLoad) onLoad(e);
        if (onLoadingComplete) onLoadingComplete(e.currentTarget);
      }}
      style={
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              ...style,
            }
          : style
      }
      {...rest}
    />
  );
};

export default ImageWithFallback;
