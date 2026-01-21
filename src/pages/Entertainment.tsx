import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";

export default function Entertainment() {
  return (
    <Layout>
      <PostsGrid type="recommendation,rating,ranking" title="Entertainment" />
    </Layout>
  );
}
