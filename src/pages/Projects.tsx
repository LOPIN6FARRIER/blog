import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Projects() {
  return (
    <Layout>
      <SEO
        title="Projects - Vinicio Esparza"
        description="Descubre mis proyectos de desarrollo web y software. Portfolio de aplicaciones React, TypeScript, Node.js y más."
        keywords="proyectos, portfolio, desarrollo web, React, TypeScript, Node.js, aplicaciones"
        type="website"
      />
      <PostsGrid type="project" title="Projects" />
    </Layout>
  );
}
