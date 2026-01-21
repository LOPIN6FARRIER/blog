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
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
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
