import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white antialiased min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-[#1a242f] technical-border rounded-xl p-8 flex flex-col items-center gap-6 shadow-[4px_4px_0px_0px_rgba(19,127,236,1)]">
        <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary">
          <span
            className="material-symbols-outlined !text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Error 403
          </p>
          <h1 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight">
            Restricted Access
          </h1>
          <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-relaxed max-w-[280px]">
            Your current permissions do not allow viewing this module. Please
            authenticate or contact the system administrator.
          </p>
        </div>
        <div className="w-full h-px bg-[#f0f2f4] dark:bg-gray-700 my-2"></div>
        <div className="w-full space-y-4">
          <div className="group flex items-stretch justify-between gap-4 rounded-lg technical-border p-4 bg-white dark:bg-[#1a242f] hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-[#111418] dark:text-white text-base font-bold leading-tight">
                Log In
              </p>
              <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">
                Access your account to view content
              </p>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="flex size-10 items-center justify-center rounded-lg bg-primary text-white"
              >
                <span className="material-symbols-outlined">login</span>
              </Link>
            </div>
          </div>
          <div className="group flex items-stretch justify-between gap-4 rounded-lg technical-border p-4 bg-white dark:bg-[#1a242f] hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-[#111418] dark:text-white text-base font-bold leading-tight">
                Request Access
              </p>
              <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">
                Send a request to the administrator
              </p>
            </div>
            <div className="flex items-center">
              <button className="flex size-10 items-center justify-center rounded-lg bg-[#f0f2f4] dark:bg-gray-700 text-[#111418] dark:text-white">
                <span className="material-symbols-outlined">mail</span>
              </button>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="mt-4 text-sm font-bold text-[#617589] hover:text-primary transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
