import React from "react";
import type { AnnouncementPost } from "../../types/posts/post";

const AnnouncementCard: React.FC<AnnouncementPost> = ({
  title,
  content,
  priority = "normal",
  ctaText = "",
  expiresAt,
  id,
}) => {
  const priorityConfig = {
    low: {
      bg: "bg-gray-100 dark:bg-gray-800",
      border: "border-blue-200 dark:border-gray-600",
      icon: "info",
      iconColor: "text-gray-500",
      badge: "bg-zinc-200 dark:bg-zinc-600 text-gray-700 dark:text-gray-300",
    },
    normal: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "campaign",
      iconColor: "text-blue-500",
      badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    },
    high: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      icon: "priority_high",
      iconColor: "text-amber-500",
      badge:
        "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    },
    urgent: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      icon: "warning",
      iconColor: "text-red-500",
      badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
    },
  };

  const config = priorityConfig[priority] || priorityConfig.normal;

  const isExpiringSoon = (): boolean => {
    if (!expiresAt) return false;
    const expires = new Date(expiresAt);
    const now = new Date();
    const hoursUntilExpiry =
      (expires.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilExpiry > 0 && hoursUntilExpiry <= 24;
  };

  const expiringSoon = isExpiringSoon();

  const getExpirationIndicator = () => {
    if (!expiresAt) return null;
    const expires = new Date(expiresAt);
    const now = new Date();
    const hoursUntilExpiry = Math.ceil(
      (expires.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    if (hoursUntilExpiry <= 0) return null;

    return (
      <span className="text-xs text-red-500">
        {hoursUntilExpiry} hours left
      </span>
    );
  };

  return (
    <div className="masonry-item rounded-xl overflow-hidden relative hover:shadow-xl transition-shadow">
      <a
        href={`/posts/${id}`}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
        title="Ver detalles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className="fill-zinc-700 dark:fill-zinc-300"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </a>
      <div className={`${config.bg} border-2 ${config.border} shadow-sm`}>
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`shrink-0 w-10 h-10 rounded-full ${config.bg} border ${config.border} flex items-center justify-center`}
            >
              <span
                className={`material-symbols-outlined ${config.iconColor} text-xl`}
              >
                {config.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${config.badge} px-2 py-0.5 rounded-full`}
                >
                  {priority === "urgent"
                    ? "Urgent"
                    : priority === "high"
                      ? "Important"
                      : "Announcement"}
                </span>
                {expiringSoon && (
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full animate-pulse">
                    Expiring Soon
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold leading-snug text-[#111418] dark:text-white mt-2">
                {title}
              </h4>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {content}
          </p>

          <div className="flex items-center justify-between mt-3">
            <span className={`${config.badge} text-xs px-2 py-1 rounded`}>
              {priority}
            </span>
            {getExpirationIndicator()}
          </div>

          {ctaText && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
                {ctaText}
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
