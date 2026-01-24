import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import type { HeaderRoutes } from "../../types/header/header";

export default function CategoryChips({ routes }: { routes: HeaderRoutes[] }) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeChipRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeChip = activeChipRef.current;

      const containerWidth = container.offsetWidth;
      const chipLeft = activeChip.offsetLeft;
      const chipWidth = activeChip.offsetWidth;

      // Calcular posición para centrar el chip activo
      const scrollPosition = chipLeft - containerWidth / 2 + chipWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar flex gap-2 overflow-x-auto py-1"
    >
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          ref={location.pathname === route.path ? activeChipRef : null}
          className={({ isActive }) =>
            `flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-900 hover:bg-zinc-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`
          }
        >
          {({ isActive }) => (
            <p
              className={`text-sm whitespace-nowrap ${
                isActive ? "font-semibold" : "font-medium"
              }`}
            >
              {route.name}
            </p>
          )}
        </NavLink>
      ))}
    </div>
  );
}
