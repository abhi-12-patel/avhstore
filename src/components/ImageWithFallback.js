import { useEffect, useMemo, useState } from "react";
import { getImageCandidates } from "./ImageCha";

const ImageWithFallback = ({
  src,
  alt,
  className,
  loading = "lazy",
  fill = false,
  onLoadingComplete,
  onLoad,
  style,
  ...rest
}) => {
  const candidates = useMemo(() => getImageCandidates(src), [src]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIndex(0);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setIndex((current) =>
      current < candidates.length - 1 ? current + 1 : current
    );
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Loader */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            zIndex: 1,
          }}
        >
          <div className="spinner" />
        </div>
      )}

      <img
        src={candidates[index]}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleError}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
          if (onLoadingComplete) onLoadingComplete(e.currentTarget);
        }}
        style={
          fill
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                ...style,
              }
            : style
        }
        {...rest}
      />
    </div>
  );
};

export default ImageWithFallback;