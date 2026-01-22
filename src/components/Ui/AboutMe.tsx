import React from "react";
import { Link } from "react-router-dom";
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
      {/* Hero Card - Hybrid Design: Portfolio Layout + Blog Theme */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl border-2 border-blue-200 dark:border-gray-800 hover:shadow-blue-500/20 dark:hover:shadow-cyan-400/20 transition-all duration-500">
        {/* Gradient Background - More Dramatic */}
        <div className="relative min-h-[400px] sm:min-h-[450px] bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzMGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiA2YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Content Container */}
          <div className="relative h-full px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 max-w-6xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 tracking-tight drop-shadow-2xl">
                {name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-white/95 mb-4 drop-shadow-lg">
                {title}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90 mb-6">
                <span className="material-symbols-outlined text-lg">
                  location_on
                </span>
                <span className="text-base font-medium">{location}</span>
              </div>
              <p className="text-white/90 dark:text-gray-300 leading-relaxed mb-8 text-base sm:text-lg max-w-xl">
                {bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-8">
                <Link
                  to="/contacto"
                  className="group/btn relative inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 dark:bg-cyan-400 dark:text-gray-900 rounded-xl font-bold text-base shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-xl">
                    mail
                  </span>
                  <span>Contactar</span>
                </Link>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-xl">
                    alternate_email
                  </span>
                  Email
                </a>
              </div>

              {/* Social Links */}
              {socials.length > 0 && (
                <div className="flex gap-3 justify-center sm:justify-start">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="size-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-blue-600 dark:hover:text-cyan-500 transition-all duration-300 hover:scale-110 transform"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Photo */}
            <div className="relative group/avatar shrink-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400 to-white dark:from-cyan-400 dark:to-purple-400 rounded-3xl blur-2xl opacity-50 group-hover/avatar:opacity-75 transition-opacity"></div>
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-4 border-white/50 dark:border-white/30 shadow-2xl transform group-hover/avatar:scale-105 transition-transform duration-500">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Card - Enhanced Design */}
      <div className="mt-8 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border-2 border-blue-200 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 dark:from-cyan-400 dark:to-blue-500 rounded-xl shadow-lg">
            <span className="material-symbols-outlined text-white text-3xl">
              code
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Skills & Tecnologías
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="group/skill relative px-6 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-blue-700 dark:text-cyan-400 text-base font-bold border-2 border-blue-200 dark:border-cyan-800/50 hover:border-blue-400 dark:hover:border-cyan-500 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover/skill:from-blue-500/10 group-hover/skill:to-cyan-500/10 rounded-xl transition-all duration-300"></span>
              <span className="relative">{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Interests Card - Enhanced Design */}
      {interests.length > 0 && (
        <div className="mt-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border-2 border-blue-200 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-xl shadow-lg">
              <span className="material-symbols-outlined text-white text-3xl">
                interests
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Intereses
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-base font-semibold hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white dark:hover:from-purple-400 dark:hover:to-pink-400 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default border-2 border-gray-200 dark:border-gray-700 hover:border-transparent"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quote Card */}
      <div className="mt-6">
        <QuoteCard quote={quote} author={name} />
      </div>
    </section>
  );
};

export default AboutMe;
