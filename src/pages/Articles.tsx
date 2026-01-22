import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Articles() {
  return (
    <Layout>
      <SEO
        title="Articles - Vinicio Esparza"
        description="Explora artículos sobre desarrollo web, programación y tecnología. Tutoriales, guías y mejores prácticas de desarrollo."
        keywords="artículos, desarrollo web, programación, tutoriales, guías, tecnología"
        type="website"
      />
      <PostsGrid type="article" title="Articles" />
    </Layout>
  );
}
