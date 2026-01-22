import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Announcements() {
  return (
    <Layout>
      <SEO
        title="Announcements - Vinicio Esparza"
        description="Anuncios importantes, novedades y actualizaciones. Últimas noticias y comunicados."
        keywords="anuncios, novedades, actualizaciones, noticias, comunicados"
        type="website"
      />
      <PostsGrid type="announcement" title="Announcements" />
    </Layout>
  );
}
