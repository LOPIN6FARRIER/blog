import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import { usePosts } from "../Api/usePosts";
import type { Post } from "../types/posts/post";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchPostById, updatePost, loading } = usePosts();

  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: [] as string[],
    draft: true,
    featured: false,
  });

  // Cargar el post
  useEffect(() => {
    if (!id) return;

    const loadPost = async () => {
      const postData = await fetchPostById(id);
      if (postData) {
        setPost(postData);

        // Extraer campos según el tipo de post
        const excerpt = "excerpt" in postData ? postData.excerpt : "";
        const content = "content" in postData ? postData.content : "";

        setFormData({
          title: postData.title || "",
          excerpt: excerpt || "",
          content: content || "",
          tags: postData.tags || [],
          draft: postData.draft ?? true,
          featured: postData.featured || false,
        });
      } else {
        alert("Post no encontrado");
        navigate("/");
      }
    };

    loadPost();
  }, [id, fetchPostById, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      await updatePost(id, {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
      });
      alert("Post actualizado exitosamente");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error al actualizar post:", error);
      alert("Error al actualizar el post");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags: tagsArray });
  };

  if (loading || !post) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-gray-600 dark:text-gray-400">Cargando post...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`Edit: ${post.title} - Vinicio Esparza`}
        description="Editar publicación en el blog personal de Vinicio Esparza"
        type="website"
      />
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Editar Post
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tipo: <span className="font-semibold">{post.type}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Excerpt */}
          {(post.type === "article" || post.type === "project") && (
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Extracto
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {/* Content */}
          {(post.type === "article" ||
            post.type === "thought" ||
            post.type === "project") && (
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Contenido
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary font-mono text-sm"
              />
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Tags (separados por comas)
            </label>
            <input
              type="text"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="react, typescript, web"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Estado
            </label>
            <select
              value={formData.draft ? "draft" : "published"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  draft: e.target.value === "draft",
                })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="featured"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Post destacado
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Nota informativa */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Nota:</strong> Esta es una versión simplificada del editor
            que permite editar los campos básicos. Para editar campos
            específicos del tipo "{post.type}" (imágenes, audio, video, etc.),
            considera usar la página de creación completa o un editor
            especializado.
          </p>
        </div>
      </div>
    </Layout>
  );
}
