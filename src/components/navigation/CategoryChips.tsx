import type { HeaderRoutes } from "../../types/routes";

export default function CategoryChips({ routes }: { routes: HeaderRoutes[] }) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto py-1">
      {routes.map((route) => {
        const isActive = window.location.pathname === route.path;
        return (
          <a
            key={route.path}
            href={route.path}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-900 hover:bg-zinc-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            <p
              className={`text-sm whitespace-nowrap ${
                isActive ? "font-semibold" : "font-medium"
              }`}
            >
              {route.name}
            </p>
          </a>
        );
      })}
    </div>
  );
}
