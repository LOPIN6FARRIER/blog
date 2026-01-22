import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Links() {
  return (
    <Layout>
      <SEO
        title="Links - Vinicio Esparza"
        description="Enlaces útiles, recursos recomendados y referencias importantes."
        keywords="enlaces, links, recursos, referencias, recomendaciones"
        type="website"
      />
      <PostsGrid type="link" title="Links" />
    </Layout>
  );
}
