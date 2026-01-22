import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Events() {
  return (
    <Layout>
      <SEO
        title="Events - Vinicio Esparza"
        description="Próximos eventos, conferencias y actividades. Mantén al tanto de mis participaciones."
        keywords="eventos, conferencias, meetups, actividades, charlas"
        type="website"
      />
      <PostsGrid type="event" title="Events" />
    </Layout>
  );
}
