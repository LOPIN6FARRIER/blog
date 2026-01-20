import Header from "../components/navigation/Header";
import Footer from "../components/Ui/Footer";
import type { HeaderRoutes } from "../types/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const routes: HeaderRoutes[] = [
    { path: "/", name: "Home" },
    { path: "/photos", name: "Photos" },
    { path: "/music", name: "Music" },
    { path: "/videos", name: "Videos" },
    { path: "/thoughts", name: "Thoughts" },
    { path: "/articles", name: "Articles" },
    { path: "/projects", name: "Projects" },
    { path: "/events", name: "Events" },
    { path: "/links", name: "Links" },
    { path: "/contacto", name: "Contacto" },
  ];
  return (
    <div>
      <Header routes={routes} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer
        name="Vinicio Esparza"
        year={2025}
        links={[
          { label: "Blog", href: "/blog" },
          { label: "Projects", href: "/projects" },
          { label: "About", href: "/about" },
        ]}
        socials={[
          {
            icon: "code",
            href: "https://github.com/LOPIN6FARRIER",
            label: "GitHub",
          },
          {
            icon: "link",
            href: "https://linkedin.com/in/vinicio-samuel-esparza-ortiz",
            label: "LinkedIn",
          },
        ]}
      />
    </div>
  );
}
