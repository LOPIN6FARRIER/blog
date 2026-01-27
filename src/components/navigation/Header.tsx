import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryChips from "./CategoryChips";
import { useUserStore } from "../../store/user.store";
import type { HeaderRoutes } from "../../types/header/header";

export default function Header({ routes }: { routes: HeaderRoutes[] }) {
  routes = routes.sort((a, b) => a.order - b.order);
  const { isLoggedIn, user, logout, isAdmin } = useUserStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 safe-top bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b-2 border-blue-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 py-4 pb-5">
        {/* Navigation */}
        <div className="flex-1 min-w-0">
          <CategoryChips routes={routes} />
        </div>

        {/* User Menu */}
        {
          isLoggedIn && user ? (
            <div className="relative shrink-0">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {user.full_name?.charAt(0) ||
                      user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform shrink-0 ${showUserMenu ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-blue-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-blue-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {user.full_name || user.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                      {isAdmin() && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                          Admin
                        </span>
                      )}
                    </div>

                    {isAdmin() && (
                      <Link
                        to="/create-post"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Post
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null
          // (
          //   <Link
          //     to="/login"
          //     className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
          //   >
          //     Login
          //   </Link>
          // )
        }
      </div>
    </header>
  );
}
