import Layout from "../layouts/Layout";
import { usePosts } from "../Api/usePosts";
import AboutMe from "../components/Ui/AboutMe";
import Masonry from "../components/Ui/Masonry";
import FeedRenderer from "../components/Ui/FeedRenderer";

export default function Home() {
  const { posts, loading, error } = usePosts();
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

      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Masonry cols={3} gap={4}>
          {posts.map((post) => (
            <FeedRenderer key={post.id} item={{ post }} />
          ))}
        </Masonry>
      )}
    </Layout>
  );
}
