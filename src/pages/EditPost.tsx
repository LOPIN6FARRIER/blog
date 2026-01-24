import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import { usePosts } from "../Api/usePosts";
import type { Post, PostType } from "../types/posts/post";

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

  type PostTypeOption = {
    value: PostType;
    label: string;
  };

  const postTypes: PostTypeOption[] = [
    { value: "article", label: "Article" },
    { value: "photo", label: "Photo" },
    { value: "gallery", label: "Gallery" },
    { value: "thought", label: "Thought" },
    { value: "music", label: "Music" },
    { value: "video", label: "Video" },
    { value: "project", label: "Project" },
    { value: "link", label: "Link" },
    { value: "announcement", label: "Announcement" },
    { value: "event", label: "Event" },
    { value: "recommendation", label: "Recommendation" },
    { value: "ranking", label: "Ranking" },
    { value: "rating", label: "Rating" },
  ];

  // Base fields
  const [type, setType] = useState<PostType>("article");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [importingFromSpotify, setImportingFromSpotify] = useState(false);
  const [draft, setDraft] = useState<boolean>(false);
  const [featured, setFeatured] = useState<boolean>(false);

  // Article fields
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [articleReadTime, setArticleReadTime] = useState("");
  const [articleUseUpload, setArticleUseUpload] = useState(false);
  const [articleCoverUrl, setArticleCoverUrl] = useState("");
  const [articleCoverAlt, setArticleCoverAlt] = useState("");
  const [articleCoverFile, setArticleCoverFile] = useState<File | null>(null);

  // Photo fields
  const [photoImageUrl, setPhotoImageUrl] = useState("");
  const [photoImageAlt, setPhotoImageAlt] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoCamera, setPhotoCamera] = useState("");
  const [photoLens, setPhotoLens] = useState("");
  const [photoSettings, setPhotoSettings] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  const [photoImageFile, setPhotoImageFile] = useState<File | null>(null);
  const [photoUseUpload, setPhotoUseUpload] = useState(false);

  // Gallery fields
  const [galleryImagesCsv, setGalleryImagesCsv] = useState("");
  const [galleryLayout, setGalleryLayout] = useState<
    "grid" | "masonry" | "carousel"
  >("grid");
  const [galleryColumns, setGalleryColumns] = useState<2 | 3 | 4>(2);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);

  // Music fields
  const [audioUrl, setAudioUrl] = useState("");
  const [audioTitle, setAudioTitle] = useState("");
  const [audioArtist, setAudioArtist] = useState("");
  const [audioAlbum, setAudioAlbum] = useState("");
  const [audioGenre, setAudioGenre] = useState("");
  const [audioDuration, setAudioDuration] = useState("");
  const [audioCoverUrl, setAudioCoverUrl] = useState("");
  const [audioCoverFile, setAudioCoverFile] = useState<File | null>(null);
  const [audioUseUpload, setAudioUseUpload] = useState(false);
  const [musicDescription, setMusicDescription] = useState("");
  const [musicType, setMusicType] = useState<"track" | "album">("track");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [appleMusicUrl, setAppleMusicUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [totalTracks, setTotalTracks] = useState("");

  // Thought fields
  const [thoughtContent, setThoughtContent] = useState("");
  const [thoughtSource, setThoughtSource] = useState("");
  const [thoughtStyle, setThoughtStyle] = useState<"quote" | "note" | "idea">(
    "note",
  );

  // Video fields
  const [videoUrl, setVideoUrl] = useState("");
  const [videoEmbed, setVideoEmbed] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoProvider, setVideoProvider] = useState<
    "youtube" | "vimeo" | "self"
  >("self");
  const [videoThumbFile, setVideoThumbFile] = useState<File | null>(null);
  const [videoUseUpload, setVideoUseUpload] = useState(false);

  // Project fields
  const [projectDescription, setProjectDescription] = useState("");
  const [projectContent, setProjectContent] = useState("");
  const [projectCover, setProjectCover] = useState("");
  const [projectTechnologiesCsv, setProjectTechnologiesCsv] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectRepoUrl, setProjectRepoUrl] = useState("");
  const [projectStatus, setProjectStatus] = useState<
    "in_progress" | "completed" | "archived"
  >("in_progress");
  const [projectRole, setProjectRole] = useState("");
  const [projectClient, setProjectClient] = useState("");
  const [projectYear, setProjectYear] = useState("");
  const [projectCoverFile, setProjectCoverFile] = useState<File | null>(null);
  const [projectUseUpload, setProjectUseUpload] = useState(false);

  // Link fields
  const [linkUrl, setLinkUrl] = useState("");
  const [linkSiteName, setLinkSiteName] = useState("");
  const [linkFavicon, setLinkFavicon] = useState("");
  const [linkImageUrl, setLinkImageUrl] = useState("");
  const [linkDescription, setLinkDescription] = useState("");

  // Announcement fields
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementPriority, setAnnouncementPriority] = useState<
    "low" | "normal" | "high" | "urgent"
  >("normal");
  const [announcementCtaText, setAnnouncementCtaText] = useState("");
  const [announcementCtaUrl, setAnnouncementCtaUrl] = useState("");

  // Event fields
  const [eventDescription, setEventDescription] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventCover, setEventCover] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventLocationName, setEventLocationName] = useState("");
  const [eventLocationAddress, setEventLocationAddress] = useState("");
  const [eventLocationUrl, setEventLocationUrl] = useState("");
  const [eventRegistration, setEventRegistration] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [eventCoverFile, setEventCoverFile] = useState<File | null>(null);
  const [eventUseUpload, setEventUseUpload] = useState(false);

  // Recommendation fields
  const [recommendationSubject, setRecommendationSubject] = useState("");
  const [recommendationType, setRecommendationType] = useState<
    "serie" | "película" | "libro" | "podcast" | "otro"
  >("serie");
  const [recommendationDescription, setRecommendationDescription] =
    useState("");
  const [recommendationRating, setRecommendationRating] = useState("");
  const [recommendationExternalUrl, setRecommendationExternalUrl] =
    useState("");
  const [recommendationCoverUrl, setRecommendationCoverUrl] = useState("");
  const [recommendationCoverFile, setRecommendationCoverFile] =
    useState<File | null>(null);
  const [recommendationUseUpload, setRecommendationUseUpload] = useState(false);

  // Rating fields
  const [ratingSubject, setRatingSubject] = useState("");
  const [ratingItemType, setRatingItemType] = useState<
    "serie" | "película" | "libro" | "podcast" | "otro"
  >("serie");
  const [ratingValue, setRatingValue] = useState("");
  const [ratingLiked, setRatingLiked] = useState(false);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingCoverUrl, setRatingCoverUrl] = useState("");
  const [ratingCoverFile, setRatingCoverFile] = useState<File | null>(null);
  const [ratingUseUpload, setRatingUseUpload] = useState(false);

  // Ranking fields
  const [rankingDescription, setRankingDescription] = useState("");
  const [rankingItemsJson, setRankingItemsJson] = useState("");
  const [rankingCoverUrl, setRankingCoverUrl] = useState("");
  const [rankingCoverFile, setRankingCoverFile] = useState<File | null>(null);
  const [rankingUseUpload, setRankingUseUpload] = useState(false);
  const [rankingUseVisualEditor, setRankingUseVisualEditor] = useState(true);
  const [rankingItems, setRankingItems] = useState<
    {
      rank: number;
      subjectTitle: string;
      itemType: "serie" | "película" | "libro" | "podcast" | "otro";
      rating?: string;
      description?: string;
    }[]
  >([]);
  const [compact, setCompact] = useState(false);

  // Messages
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Cargar el post
  useEffect(() => {
    if (!id) return;

    const loadPost = async () => {
      const postData: Post | null = await fetchPostById(id);
      if (postData) {
        setPost(postData);

        //base fields
        setType(postData.type);
        setTitle(postData.title);
        setTags(postData.tags ? postData.tags.join(", ") : "");
        setCategory(postData.category || "");
        setTags(postData.tags ? postData.tags.join(", ") : "");
        setCategory(postData.category || "");
        setFeatured(postData.featured || false);
        setDraft(postData.draft ?? true);

        switch (postData.type) {
          case "article":
            setExcerpt(postData.excerpt || "");
            setContent(postData.content || "");
            setArticleCoverAlt(postData.coverImage?.alt || "");
            setArticleCoverUrl(postData.coverImage?.url || "");
            setArticleReadTime(postData.readTime || "");
            break;
            case "photo":
            setPhotoDescription(postData.image.caption || "");
            setPhotoImageAlt(postData.image.alt || "");
            setPhotoImageUrl(postData.image.url || "");
            setPhotoCamera(postData.image.metadata?.camera || "");
            setPhotoLens(postData.image.metadata?.lens || "");
            setPhotoSettings(postData.image.metadata?.settings || "");
            setPhotoLocation(postData.image.metadata?.location || "");
            break;
          // Agrega casos para otros tipos de post según sea necesario      
        }

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
