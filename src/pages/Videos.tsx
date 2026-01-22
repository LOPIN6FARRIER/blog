import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Videos() {
  return (
    <Layout>
      <SEO
        title="Videos - Vinicio Esparza"
        description="Colección de videos, tutoriales y contenido multimedia sobre desarrollo y tecnología."
        keywords="videos, tutoriales, contenido, multimedia, tecnología"
        type="website"
      />
      <PostsGrid type="video" title="Videos" />
    </Layout>
  );
}
