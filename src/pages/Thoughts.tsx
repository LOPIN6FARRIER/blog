import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";

export default function Thoughts() {
  return (
    <Layout>
      <PostsGrid type="thought" title="Thoughts" />
    </Layout>
  );
}
