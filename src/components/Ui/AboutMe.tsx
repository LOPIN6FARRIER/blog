import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuoteCard from "../cards/QuoteCard";
import type { AboutMeProps } from "../../types/AboutMe/AboutMe";
import { useUserStore } from "../../store/user.store";
import {
  useUpdateAboutMe,
  useAddSkill,
  useRemoveSkill,
  useAddInterest,
  useRemoveInterest,
  useAddSocial,
  useRemoveSocial,
} from "../../Api/useAboutMe";

const AboutMe: React.FC<AboutMeProps> = ({
  name: initialName,
  title: initialTitle,
  location: initialLocation,
  bio: initialBio,
  skills: initialSkills,
  email: initialEmail,
  image: initialImage,
  socials: initialSocials,
  interests: initialInterests,
  quote: initialQuote,
}) => {
  const isAdmin = useUserStore((state) => state.isAdmin());
  const [isEditing, setIsEditing] = useState(false);
  const updateMutation = useUpdateAboutMe();

  // Mutations para items individuales
  const addSkillMutation = useAddSkill();
  const removeSkillMutation = useRemoveSkill();
  const addInterestMutation = useAddInterest();
  const removeInterestMutation = useRemoveInterest();
  const addSocialMutation = useAddSocial();
  const removeSocialMutation = useRemoveSocial();

  // Estados editables
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState(initialLocation);
  const [bio, setBio] = useState(initialBio);
  const [email, setEmail] = useState(initialEmail);
  const [image, setImage] = useState(initialImage);
  const [quote, setQuote] = useState(initialQuote);
  const [skills, setSkills] = useState(initialSkills);
  const [interests, setInterests] = useState(initialInterests);
  const [socials, setSocials] = useState(initialSocials);

  // Estados para modales
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddInterest, setShowAddInterest] = useState(false);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newSocial, setNewSocial] = useState({
    icon: "",
    href: "",
    label: "",
  });

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        name,
        title,
        location,
        bio,
        email,
        image,
        quote,
        skills,
        interests,
        socials,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating about me:", error);
      alert("Error al actualizar. Por favor intenta de nuevo.");
    }
  };

  const handleCancel = () => {
    // Restaurar valores originales
    setName(initialName);
    setTitle(initialTitle);
    setLocation(initialLocation);
    setBio(initialBio);
    setEmail(initialEmail);
    setImage(initialImage);
    setQuote(initialQuote);
    setSkills(initialSkills);
    setInterests(initialInterests);
    setSocials(initialSocials);
    setIsEditing(false);
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      await addSkillMutation.mutateAsync(newSkill.trim());
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setShowAddSkill(false);
    } catch (error) {
      alert("Error al agregar skill");
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    if (!confirm(`¿Eliminar "${skill}"?`)) return;
    try {
      await removeSkillMutation.mutateAsync(skill);
      setSkills(skills.filter((s) => s !== skill));
    } catch (error) {
      alert("Error al eliminar skill");
    }
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) return;
    try {
      await addInterestMutation.mutateAsync(newInterest.trim());
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
      setShowAddInterest(false);
    } catch (error) {
      alert("Error al agregar interés");
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    if (!confirm(`¿Eliminar "${interest}"?`)) return;
    try {
      await removeInterestMutation.mutateAsync(interest);
      setInterests(interests.filter((i) => i !== interest));
    } catch (error) {
      alert("Error al eliminar interés");
    }
  };

  const handleAddSocial = async () => {
    if (!newSocial.icon || !newSocial.href || !newSocial.label) return;
    try {
      await addSocialMutation.mutateAsync(newSocial);
      setSocials([...socials, newSocial]);
      setNewSocial({ icon: "", href: "", label: "" });
      setShowAddSocial(false);
    } catch (error) {
      alert("Error al agregar red social");
    }
  };

  const handleRemoveSocial = async (label: string) => {
    if (!confirm(`¿Eliminar "${label}"?`)) return;
    try {
      await removeSocialMutation.mutateAsync(label);
      setSocials(socials.filter((s) => s.label !== label));
    } catch (error) {
      alert("Error al eliminar red social");
    }
  };

  const handleSaveQuote = async () => {
    try {
      await updateMutation.mutateAsync({
        name,
        title,
        location,
        bio,
        email,
        image,
        quote,
        skills,
        interests,
        socials,
      });
      setIsEditingQuote(false);
    } catch (error) {
      alert("Error al actualizar la cita");
    }
  };

  return (
    <section id="sobre-mi" className="py-8">
      {/* Admin Controls */}
      {isAdmin && (
        <div className="mb-4 flex gap-2 justify-end">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Editar
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={updateMutation.isPending}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {updateMutation.isPending ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">
                      progress_activity
                    </span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">
                      save
                    </span>
                    Guardar
                  </>
                )}
              </button>
            </>
          )}
        </div>
      )}

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
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 tracking-tight drop-shadow-2xl bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 w-full border-2 border-white/30 focus:border-white/60 focus:outline-none"
                />
              ) : (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 tracking-tight drop-shadow-2xl">
                  {name}
                </h1>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl sm:text-2xl font-semibold text-white/95 mb-4 drop-shadow-lg bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 w-full border-2 border-white/30 focus:border-white/60 focus:outline-none"
                />
              ) : (
                <p className="text-xl sm:text-2xl font-semibold text-white/95 mb-4 drop-shadow-lg">
                  {title}
                </p>
              )}

              <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90 mb-6">
                <span className="material-symbols-outlined text-lg">
                  location_on
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-base font-medium bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border-2 border-white/30 focus:border-white/60 focus:outline-none text-white"
                  />
                ) : (
                  <span className="text-base font-medium">{location}</span>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={6}
                  className="text-white/90 dark:text-gray-300 leading-relaxed mb-8 text-base sm:text-lg max-w-xl w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border-2 border-white/30 focus:border-white/60 focus:outline-none resize-none"
                />
              ) : (
                <p className="text-white/90 dark:text-gray-300 leading-relaxed mb-8 text-base sm:text-lg max-w-xl">
                  {bio}
                </p>
              )}

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
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-base focus:border-white/60 focus:outline-none"
                  />
                ) : (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-xl">
                      alternate_email
                    </span>
                    Email
                  </a>
                )}
              </div>

              {/* Social Links */}
              {(socials.length > 0 || (isAdmin && !isEditing)) && (
                <div className="flex gap-3 justify-center sm:justify-start flex-wrap items-center">
                  {socials.map((social, index) => (
                    <div key={index} className="relative group/social">
                      <a
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
                      {isAdmin && !isEditing && (
                        <button
                          onClick={() => handleRemoveSocial(social.label)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors opacity-0 group-hover/social:opacity-100"
                          title="Eliminar"
                        >
                          <span className="material-symbols-outlined text-xs">
                            close
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                  {isAdmin && !isEditing && (
                    <button
                      onClick={() => setShowAddSocial(true)}
                      className="size-12 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-blue-600 dark:hover:text-cyan-500 transition-all duration-300 hover:scale-110 transform"
                      title="Agregar red social"
                    >
                      <span className="material-symbols-outlined text-xl">
                        add
                      </span>
                    </button>
                  )}
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
        <div className="flex items-center gap-3 mb-6 justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 dark:from-cyan-400 dark:to-blue-500 rounded-xl shadow-lg">
              <span className="material-symbols-outlined text-white text-3xl">
                code
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Skills & Tecnologías
            </h2>
          </div>
          {isAdmin && !isEditing && (
            <button
              onClick={() => setShowAddSkill(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Agregar skill"
            >
              <span className="material-symbols-outlined text-xl">add</span>
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="group/skill relative px-6 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-blue-700 dark:text-cyan-400 text-base font-bold border-2 border-blue-200 dark:border-cyan-800/50 hover:border-blue-400 dark:hover:border-cyan-500 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover/skill:from-blue-500/10 group-hover/skill:to-cyan-500/10 rounded-xl transition-all duration-300"></span>
              <span className="relative flex items-center gap-2">
                {skill}
                {isAdmin && !isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    title="Eliminar"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Interests Card - Enhanced Design */}
      {(interests.length > 0 || isAdmin) && (
        <div className="mt-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border-2 border-blue-200 dark:border-gray-800 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6 justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl">
                  interests
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Intereses
              </h2>
            </div>
            {isAdmin && !isEditing && (
              <button
                onClick={() => setShowAddInterest(true)}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                title="Agregar interés"
              >
                <span className="material-symbols-outlined text-xl">add</span>
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-base font-semibold hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white dark:hover:from-purple-400 dark:hover:to-pink-400 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default border-2 border-gray-200 dark:border-gray-700 hover:border-transparent flex items-center gap-2"
              >
                {interest}
                {isAdmin && !isEditing && (
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    title="Eliminar"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quote Card - Editable */}
      <div className="mt-6">
        {isEditingQuote ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border-2 border-blue-200 dark:border-gray-800">
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Escribe una cita..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 outline-none resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setQuote(initialQuote);
                  setIsEditingQuote(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveQuote}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group/quote">
            <QuoteCard quote={quote} author={name} />
            {isAdmin && (
              <button
                onClick={() => setIsEditingQuote(true)}
                className="absolute top-4 right-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover/quote:opacity-100"
                title="Editar cita"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Skill Modal */}
      {showAddSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Agregar Skill
            </h3>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Nombre de la skill"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 outline-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowAddSkill(false);
                  setNewSkill("");
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Interest Modal */}
      {showAddInterest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Agregar Interés
            </h3>
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Nombre del interés"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-400 outline-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowAddInterest(false);
                  setNewInterest("");
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddInterest}
                disabled={!newInterest.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Social Modal */}
      {showAddSocial && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Agregar Red Social
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newSocial.icon}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, icon: e.target.value })
                }
                placeholder="Icono (ej: link, github)"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 outline-none"
              />
              <input
                type="url"
                value={newSocial.href}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, href: e.target.value })
                }
                placeholder="URL"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 outline-none"
              />
              <input
                type="text"
                value={newSocial.label}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, label: e.target.value })
                }
                placeholder="Etiqueta"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 outline-none"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowAddSocial(false);
                  setNewSocial({ icon: "", href: "", label: "" });
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSocial}
                disabled={
                  !newSocial.icon.trim() ||
                  !newSocial.href.trim() ||
                  !newSocial.label.trim()
                }
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutMe;
