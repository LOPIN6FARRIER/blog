import { useUserStore } from "../../store/user.store";
import { usePostMutations } from "../../Api/usePosts";
import { useNavigate } from "react-router-dom";

interface PostActionsProps {
  postId: string;
  onDelete?: () => void;
}

export default function PostActions({ postId, onDelete }: PostActionsProps) {
  const { isLoggedIn, isAdmin } = useUserStore();
  const { deletePost: deletePostFn } = usePostMutations();
  const navigate = useNavigate();

  // Solo mostrar si el usuario está logueado y es admin
  if (!isLoggedIn || !isAdmin()) {
    return null;
  }

  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este post?")) {
      return;
    }

    try {
      await deletePostFn.mutateAsync(postId);

      // Llamar callback si existe
      if (onDelete) {
        onDelete();
      }

      // Recargar la página para actualizar la lista
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar post:", error);
      alert("Error al eliminar el post. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="absolute top-2 left-2 z-10 flex gap-2">
      <button
        onClick={handleEdit}
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors"
        title="Editar post"
      >
        <span className="material-symbols-outlined text-base">edit</span>
      </button>
      <button
        onClick={handleDelete}
        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors"
        title="Eliminar post"
      >
        <span className="material-symbols-outlined text-base">delete</span>
      </button>
    </div>
  );
}
