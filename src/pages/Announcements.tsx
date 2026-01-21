import Layout from "../layouts/Layout";
import PostsGrid from "../components/Ui/PostsGrid";

export default function Announcements() {
  return (
    <Layout>
      <PostsGrid type="announcement" title="Announcements" />
    </Layout>
  );
}
