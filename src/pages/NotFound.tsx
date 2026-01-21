import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen paper-texture flex flex-col items-center justify-center">
      <header className="flex items-center bg-transparent p-4 pb-2 justify-between">
        <div
          className="text-primary flex size-12 shrink-0 items-center cursor-pointer"
          onClick={() => window.history.back()}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            arrow_back
          </span>
        </div>
        <h2 className="text-[#111418] dark:text-white text-sm font-medium leading-tight tracking-widest uppercase flex-1 text-center pr-12 opacity-60">
          Status: 404
        </h2>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full px-4">
        <section className="w-full text-center py-8">
          <h1 className="text-[#111418] dark:text-white tracking-tighter text-[120px] font-bold leading-none select-none">
            404
          </h1>
          <h2 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight mt-[-10px]">
            Lost in the Chaos?
          </h2>
          <div className="h-1 w-12 bg-primary mx-auto mt-4 rounded-full"></div>
        </section>
        <div className="w-full flex flex-col gap-4 mt-8">
          <div className="p-4 w-full">
            <div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-[#1c2632] border border-black/5 dark:border-white/5 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: "20px" }}
                >
                  lightbulb
                </span>
                <p className="text-[#111418] dark:text-white text-base font-bold leading-tight">
                  Random Thought
                </p>
              </div>
              <p className="text-[#617589] dark:text-gray-400 text-lg italic leading-relaxed font-light">
                "Sometimes getting lost is the only way to find something new."
              </p>
            </div>
          </div>
          <div className="px-4 pb-8">
            <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1c2632] p-5 shadow-sm border border-black/5 dark:border-white/5">
              <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[#111418] dark:text-white text-base font-bold leading-tight">
                    Back to Home
                  </p>
                  <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                    Return to our curated workspace
                  </p>
                </div>
                <Link
                  to="/"
                  className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 flex-row bg-primary text-white gap-2 text-sm font-bold leading-normal w-fit hover:bg-primary/90 transition-colors"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    home
                  </span>
                  <span className="truncate">Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
