import type { HeaderRoutes } from "../../types/routes";
import CategoryChips from "./CategoryChips";

export default function Header({ routes }: { routes: HeaderRoutes[] }) {
  return (
    <header className="sticky top-0 z-50 safe-top">
      <div className="flex items-center p-4 pb-2 justify-between max-w-6xl mx-auto">
        <CategoryChips routes={routes} />
      </div>
    </header>
  );
}
