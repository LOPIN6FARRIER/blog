import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";
import SEO from "../components/SEO";

export default function Photos() {
  return (
    <Layout>
      <SEO
        title="Photos - Vinicio Esparza"
        description="Galería de fotos y momentos capturados. Explora mi colección de fotografías."
        keywords="fotos, fotografía, galería, imágenes, momentos"
        type="website"
      />
      <PostsGrid type="photo,gallery" title="Photos" />
    </Layout>
  );
}
