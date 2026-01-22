import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Music() {
  return (
    <Layout>
      <SEO
        title="Music - Vinicio Esparza"
        description="Mi colección de música favorita, playlists y recomendaciones musicales."
        keywords="música, playlists, canciones, álbumes, recomendaciones musicales"
        type="website"
      />
      <PostsGrid type="music" title="Music" />
    </Layout>
  );
}
