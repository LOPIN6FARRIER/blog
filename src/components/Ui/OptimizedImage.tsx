import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  thumbnail?: string; // URL del thumbnail (carga primero)
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  overlay?: string; // gradient overlay
  children?: React.ReactNode; // Permitir children
}

export default function OptimizedImage({
  src,
  thumbnail,
  alt = "",
  className = "",
  style = {},
  loading = "lazy",
  overlay,
  children,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(thumbnail || src);

  useEffect(() => {
    // Si hay thumbnail, primero carga el thumbnail, luego la imagen completa
    if (thumbnail && thumbnail !== src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => setHasError(true);
    } else if (loading === "eager") {
      // Preload image si es eager
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }
  }, [src, thumbnail, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const backgroundStyle: React.CSSProperties = {
    ...style,
    backgroundImage: (src && overlay)
      ? `${overlay}, url('${currentSrc}')`
      : src ? `url('${currentSrc}')` : 'none',
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity 0.3s ease-in-out, filter 0.3s ease-in-out",
    opacity: isLoaded || loading === "eager" || thumbnail ? 1 : 0,
    filter: (thumbnail && currentSrc === thumbnail && !isLoaded) ? "blur(10px)" : "none",
  };

  return (
    <div
      className={`relative ${className}`}
      style={backgroundStyle}
      data-alt={alt}
    >
      {/* Skeleton loader mientras carga */}
      {!isLoaded && !hasError && !thumbnail && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Hidden img for lazy loading trigger */}
      {src && (
        <img
          src={thumbnail ? currentSrc : src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className="hidden"
        />
      )}
      
      {/* Render children content (like Link and text overlays) */}
      {children}
    </div>
  );
}
