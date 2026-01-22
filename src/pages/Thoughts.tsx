import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Thoughts() {
  return (
    <Layout>
      <SEO
        title="Thoughts - Vinicio Esparza"
        description="Pensamientos, reflexiones y notas rápidas sobre desarrollo, tecnología y vida."
        keywords="pensamientos, reflexiones, notas, ideas, blog personal"
        type="website"
      />
      <PostsGrid type="thought" title="Thoughts" />
    </Layout>
  );
}
