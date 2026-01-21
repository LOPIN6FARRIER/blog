import { useMemo } from "react";
import Masonry from "react-masonry-css";
import { usePosts } from "../../Api/usePosts";
import FeedRenderer from "./FeedRenderer";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const POSTS_PER_PAGE = 15;

interface PostsGridProps {
  type?: string;
  title: string;
}

export default function PostsGrid({ type, title }: PostsGridProps) {
  const params = useMemo(
    () => ({
      type,
      limit: POSTS_PER_PAGE,
      status: "published",
    }),
    [type],
  );

  const { posts, loading, error, hasMore, loadMore } = usePosts(params);

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

      {posts.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <FeedRenderer key={post.id} item={{ post }} />
          ))}
        </Masonry>
      )}

      {loading && <p className="text-center py-8 text-gray-500">Cargando...</p>}

      {!loading && hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
          >
            Cargar más
          </button>
        </div>
      )}

      {!loading && posts.length === 0 && !error && (
        <p className="text-center py-8 text-gray-500">
          No hay contenido disponible
        </p>
      )}
    </>
  );
}
