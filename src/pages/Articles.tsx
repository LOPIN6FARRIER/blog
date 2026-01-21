import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";

export default function Articles() {
  return (
    <Layout>
      <PostsGrid type="article" title="Articles" />
    </Layout>
  );
}
