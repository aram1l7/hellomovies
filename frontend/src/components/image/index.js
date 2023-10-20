import { useEffect, useRef, useState } from "react";

const LazyImage = ({
  placeholderSrc,
  placeholderClassName,
  placeholderStyle,
  src,
  alt,
  className,
  style,
  fallback,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("");
  const placeholderRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setView(src);
        observer.unobserve(placeholderRef.current);
      }
    });

    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && !error && (
        <img
          src={placeholderSrc}
          alt=""
          className={`${placeholderClassName} w-full h-full object-cover`}
          style={placeholderStyle}
          ref={placeholderRef}
        />
      )}
      {error ? (
        <img src={fallback} />
      ) : (
        <img
          src={view}
          className={className}
          style={isLoading ? { display: "none" } : style}
          alt={alt}
          onError={handleError}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </>
  );
};
export default LazyImage;
