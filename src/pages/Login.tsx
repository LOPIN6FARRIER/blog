import React, { useState } from "react";
import { useUserStore } from "../store/user.store";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { scheduleTokenRefresh } from "../services/authClient";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const UserLogin = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = await login(email, password);
      const { user, tokens } = payload.data;
      UserLogin(user, tokens);

      // schedule automatic refresh based on access token expiry
      try {
        scheduleTokenRefresh();
      } catch (err) {
        console.warn("scheduleTokenRefresh failed", err);
      }

      navigate("/");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al iniciar sesión");
    }
  };

  return (
    <div
      id="login-page"
      className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white antialiased overflow-hidden h-screen w-screen flex items-center justify-center"
    >
      <div
        id="login-container"
        className="relative flex w-full max-w-screen flex-col items-center justify-center overflow-hidden"
      >
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-0">
          <div className="w-full max-w-md paper-texture technical-border rounded-xl p-8 flex flex-col gap-8 shadow-[6px_6px_0px_0px_rgba(17,20,24,0.1)]">
            <div className="flex flex-col items-center gap-4">
              <div className="size-12 flex items-center justify-center technical-border rounded-full bg-white dark:bg-[#1a242f]">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  architecture
                </span>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight mb-1">
                  Welcome Back
                </h1>
                {!error && (
                  <p className="text-[#617589] dark:text-gray-400 text-sm">
                    Please enter your credentials to continue
                  </p>
                )}
                {error && (
                  <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-lg">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#617589] ml-1">
                  Email Address
                </label>
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#111418] dark:border-white focus:ring-0 focus:border-primary px-1 py-3 text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
                  placeholder="name@domain.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#617589] ml-1">
                    Password
                  </label>
                  <a
                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                    href="#"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#111418] dark:border-white focus:ring-0 focus:border-primary px-1 py-3 pr-10 text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-colors"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>
              <button
                className="w-full mt-4 bg-primary text-white py-4 rounded-lg font-bold text-sm tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none transition-all"
                type="submit"
              >
                Log In
              </button>
            </form>
            <div className="text-center pt-2">
              <p className="text-sm text-[#617589]">
                Don't have an account?{" "}
                <a
                  className="text-[#111418] dark:text-white font-bold hover:text-primary transition-colors"
                  href="/signup"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
