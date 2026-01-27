import Header from "../components/navigation/Header";
import Footer from "../components/Ui/Footer";
import type { HeaderRoutes } from "../types/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const routes: HeaderRoutes[] = [
    { path: "/", name: "Home", order: 1 },
    { path: "/photos", name: "Photos", order: 2 },
    { path: "/music", name: "Music", order: 3 },
    { path: "/articles", name: "Articles", order: 4 },
    { path: "/entertainment", name: "Entertainment", order: 5 },
    { path: "/projects", name: "Projects", order: 6 },
    { path: "/thoughts", name: "Thoughts", order: 7 },
    { path: "/links", name: "Links", order: 8 },
    { path: "/events", name: "Events", order: 9 },
    { path: "/videos", name: "Videos", order: 10 },
    { path: "/announcements", name: "Announcements", order: 11 },
    { path: "/contacto", name: "Contacto", order: 12 },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header routes={routes} />
      <main className="flex-1 pt-6 pb-12">
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
