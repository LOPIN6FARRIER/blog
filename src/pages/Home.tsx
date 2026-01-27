import Masonry from "react-masonry-css";
import { usePosts } from "../Api/usePosts";
import { useAboutMe } from "../Api/useAboutMe";
import AboutMe from "../components/Ui/AboutMe";
import SpotifySocket from "../components/Ui/SpotifySocket";
import FeedRenderer from "../components/Ui/FeedRenderer";
import Section from "../components/Ui/Section";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const POSTS_PER_PAGE = 12;

export default function Home() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ limit: POSTS_PER_PAGE });

  const {
    data: aboutMeData,
    isLoading: aboutMeLoading,
    error: aboutMeError,
  } = useAboutMe();

  // Flatten de páginas
  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const loading = isLoading || isFetchingNextPage;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Layout>
      <SEO
        title="Vinicio Esparza - Desarrollador Full Stack"
        description="Blog personal de Vinicio Esparza. Desarrollador Full Stack especializado en React, TypeScript, Node.js, Angular y .NET. Proyectos, artículos y experiencias sobre desarrollo web moderno."
        keywords="Vinicio Esparza, desarrollador full stack, react, typescript, node.js, angular, .net, C#, desarrollo web, programación, blog"
        type="website"
      />
      <StructuredData
        type="WebSite"
        data={{
          name: "Vinicio Esparza",
          url: "https://vinicioesparza.dev",
          description:
            "Blog personal de Vinicio Esparza - Desarrollador Full Stack",
        }}
      />
      <StructuredData
        type="Person"
        data={{
          name: "Vinicio Esparza",
          url: "https://vinicioesparza.dev",
          jobTitle: "Full Stack Developer",
          description:
            "Desarrollador Full Stack especializado en React, TypeScript, Node.js, Angular y .NET",
          sameAs: [
            "https://github.com/vinicioesparza",
            "https://linkedin.com/in/vinicioesparza",
          ],
        }}
      />
      <Section py="py-0">
        {aboutMeLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando perfil...</p>
          </div>
        ) : aboutMeError ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error al cargar perfil</p>
          </div>
        ) : aboutMeData ? (
          <AboutMe
            name={aboutMeData.name}
            title={aboutMeData.title}
            location={aboutMeData.location}
            bio={aboutMeData.bio}
            skills={aboutMeData.skills}
            email={aboutMeData.email}
            interests={aboutMeData.interests}
            quote={aboutMeData.quote}
            image={aboutMeData.image}
            socials={aboutMeData.socials}
          />
        ) : null}
      </Section>

      <Section py="py-6">
        <SpotifySocket />
      </Section>

      {error && (
        <p className="text-red-500 text-center py-4">Error: {error.message}</p>
      )}

      <Section title="Últimos Posts" py="py-8">
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

        {!loading && hasNextPage && (
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
      </Section>
    </Layout>
  );
}
