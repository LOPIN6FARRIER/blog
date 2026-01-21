import Masonry from "react-masonry-css";
import { usePosts } from "../Api/usePosts";
import AboutMe from "../components/Ui/AboutMe";
import FeedRenderer from "../components/Ui/FeedRenderer";
import Layout from "../layouts/Layout";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Home() {
  const { posts, loading, error, hasMore, loadMore } = usePosts({});

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <Layout>
      <AboutMe
        name="Vinicio Esparza"
        title="Frontend Developer"
        location="Guadalajara Jal., México"
        bio="Construyo interfaces y apps con SvelteKit, priorizando rendimiento y accesibilidad. Me apasiona crear experiencias web modernas, rápidas y visualmente atractivas."
        skills={[
          "SvelteKit",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "JavaScript",
          "CSS",
        ]}
        email="vinicioesparza15@gmail.com"
        interests={["Fotografía", "Música", "Diseño UI/UX", "Open Source"]}
        quote="El código limpio es como la buena escritura: simple, directo y elegante."
        image="https://res.cloudinary.com/dniyqu7yq/image/upload/v1768759191/blog/Vinicio_Esparza_pi3x1x.webp"
        socials={[
          {
            icon: "code",
            href: "https://github.com/LOPIN6FARRIER",
            label: "GitHub",
          },
          {
            icon: "link",
            href: "https://www.linkedin.com/in/vinicio-samuel-esparza-ortiz/",
            label: "LinkedIn",
          },
          {
            icon: "public",
            href: "https://x.com/vincio_esparza",
            label: "Twitter",
          },
        ]}
      />
      {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

      {posts.length > 0 && (
        <h2 className="text-2xl font-semibold mb-4">Últimos Posts</h2>
      )}
      {posts.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <FeedRenderer key={post.id} item={{ post }} />
          ))}
        </Masonry>
      )}

      {loading && (
        <p className="text-center py-8 text-gray-500">Cargando posts...</p>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
          >
            Cargar más
          </button>
        </div>
      )}

      {!loading && posts.length === 0 && !error && (
        <p className="text-center py-8 text-gray-500">
          No hay posts disponibles
        </p>
      )}
    </Layout>
  );
}
