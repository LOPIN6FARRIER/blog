import type { HeaderRoutes } from "../../types/routes";

export default function CategoryChips({ routes }: { routes: HeaderRoutes[] }) {
	return (
		<div className="hide-scrollbar mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-3">
			{routes.map((route) => {
				const isActive = window.location.pathname === route.path;
				return (
					<a
						key={route.path}
						href={route.path}
						className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 ${
							isActive
								? 'bg-primary text-white shadow-sm'
								: 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
						}`}
					>
						<p
							className={`text-sm ${
								isActive
									? 'font-semibold tracking-tight'
									: 'font-medium text-[#111418] dark:text-white'
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