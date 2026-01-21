import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, RegisterError } from "../services/auth";
import { useUserStore } from "../store/user.store";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setIsLoading(true);

    try {
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ...(formData.full_name ? { full_name: formData.full_name } : {}),
      };

      const response = await register(dataToSend);

      if (response.success) {
        login(response.data.user, response.data.tokens);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof RegisterError) {
        if (error.validationErrors?.length) {
          const fieldErrors: Record<string, string> = {};
          error.validationErrors.forEach((err) => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          setApiError(error.message);
        }
      } else if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Error al registrar usuario");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white antialiased min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
          <div className="w-full max-w-md paper-texture technical-border rounded-xl p-8 flex flex-col gap-8 shadow-[6px_6px_0px_0px_rgba(17,20,24,0.1)]">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight mb-1">
                Create an Account
              </h1>
              <p className="text-[#617589] dark:text-gray-400 text-sm">
                Please fill in the details to register
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#617589] ml-1">
                  Username
                </label>
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#111418] dark:border-white focus:ring-0 focus:border-primary px-1 py-3 text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#617589] ml-1">
                  Email Address
                </label>
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#111418] dark:border-white focus:ring-0 focus:border-primary px-1 py-3 text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
                  placeholder="name@domain.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#617589] ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#111418] dark:border-white focus:ring-0 focus:border-primary px-1 py-3 pr-10 text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
                    placeholder="••••••••"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#617589] hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#617589] ml-1">
                  Full Name (Optional)
                </label>
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#111418] dark:border-white focus:ring-0 focus:border-primary px-1 py-3 text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
                  placeholder="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs">{errors.full_name}</p>
                )}
              </div>
              {apiError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">
                    {apiError}
                  </p>
                </div>
              )}
              <button
                className="w-full mt-4 bg-primary text-white py-4 rounded-lg font-bold text-sm tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Registrando..." : "Sign Up"}
              </button>
            </form>
            <div className="text-center pt-2">
              <p className="text-sm text-[#617589]">
                Already have an account?{" "}
                <a
                  className="text-[#111418] dark:text-white font-bold hover:text-primary transition-colors"
                  href="/login"
                >
                  Log In
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
