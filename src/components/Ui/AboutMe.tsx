import React from "react";
import QuoteCard from "../cards/QuoteCard";
import type { AboutMeProps } from "../../types/AboutMe/AboutMe";

const AboutMe: React.FC<AboutMeProps> = ({
  name,
  title,
  location,
  bio,
  skills,
  email,
  image,
  socials,
  interests,
  quote,
}) => {
  return (
    <section id="sobre-mi" className="py-8">
      {/* Hero Card */}
      <div className="relative rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="h-32 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40"></div>
        <div className="px-6 pb-6">
          <div className="-mt-16 mb-4 flex items-end gap-4">
            <div className="size-28 rounded-xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg bg-zinc-100 dark:bg-zinc-700">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pb-2">
              <h1 className="text-2xl font-bold text-[#111418] dark:text-white leading-tight">
                {name}
              </h1>
              <p className="text-primary text-sm font-medium">{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            <span className="material-symbols-outlined text-lg">
              location_on
            </span>
            <span>{location}</span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
            {bio}
          </p>
          <div className="flex gap-3 mb-6">
            <a
              href="/contacto"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm shadow-sm hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Contactar
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-lg font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                alternate_email
              </span>
              Email
            </a>
          </div>
          {socials.length > 0 && (
            <div className="flex gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-700">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="size-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">code</span>
          <h2 className="text-lg font-bold text-[#111418] dark:text-white">
            Skills & Tecnologías
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      {interests.length > 0 && (
        <div className="mt-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">
              interests
            </span>
            <h2 className="text-lg font-bold text-[#111418] dark:text-white">
              Intereses
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-6">
        <QuoteCard quote={quote} author={name} />
      </div>
    </section>
  );
};

export default AboutMe;
