import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";

export default function Events() {
  return (
    <Layout>
      <PostsGrid type="event" title="Events" />
    </Layout>
  );
}
