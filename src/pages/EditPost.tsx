import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import PostForm from "../components/forms/PostForm";
import { usePostById } from "../Api/usePosts";
import { usePostMutations } from "../Api/usePosts";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = usePostById(id);
  const { updatePost, uploadPostImage, uploadPostImages, loading } =
    usePostMutations();

  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (formData: Record<string, unknown>) => {
    if (!id || !post) return;

    setErrorMessage("");
    setSavedMessage("");

    try {
      // Prepare base data
      const base = {
        title: formData.title as string,
        tags: formData.tags as string[],
        category: formData.category as string,
        featured: formData.featured as boolean,
        draft: formData.draft as boolean,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let postData: any;

      switch (post.type) {
        case "article":
          postData = {
            ...base,
            excerpt: formData.excerpt,
            content: formData.content,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
            cover_image_alt: formData.coverImageAlt || formData.title,
            read_time: formData.readTime,
          };
          break;

        case "photo":
          postData = {
            ...base,
            image_url: formData.photoImageFile
              ? undefined
              : formData.photoImageUrl,
            image_alt: formData.photoImageAlt || formData.title,
          };
          break;

        case "gallery":
          postData = {
            ...base,
            description: formData.description,
            layout: formData.layout,
            columns: formData.columns,
            images: formData.galleryImageUrlsCsv
              ? (formData.galleryImageUrlsCsv as string)
                  .split(",")
                  .map((url) => url.trim())
                  .filter(Boolean)
                  .map((url) => ({ url, alt: "" }))
              : undefined,
          };
          break;

        case "thought":
          postData = {
            ...base,
            content: formData.content,
            source: formData.source,
            style: formData.style,
          };
          break;

        case "music":
          postData = {
            ...base,
            audio_url: formData.audioUrl,
            audio_title: formData.audioTitle,
            audio_artist: formData.audioArtist,
            audio_album: formData.audioAlbum,
            audio_genre: formData.audioGenre,
            audio_duration: formData.audioDuration,
            audio_cover_url: formData.audioCoverFile
              ? undefined
              : formData.audioCoverUrl,
            description: formData.description,
            music_type: formData.musicType,
            spotify_url: formData.spotifyUrl,
            apple_music_url: formData.appleMusicUrl,
            youtube_url: formData.youtubeUrl,
          };
          break;

        case "video":
          postData = {
            ...base,
            video_url: formData.videoUrl,
            embed_code: formData.embedCode,
            thumbnail_url: formData.thumbnailFile
              ? undefined
              : formData.thumbnailUrl,
            duration: formData.duration,
            provider: formData.provider,
          };
          break;

        case "project":
          postData = {
            ...base,
            description: formData.description,
            content: formData.content,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
            technologies: formData.technologies,
            live_url: formData.liveUrl,
            repo_url: formData.repoUrl,
            status: formData.status,
            role: formData.role,
            client: formData.client,
            year: formData.year,
          };
          break;

        case "link":
          postData = {
            ...base,
            url: formData.url,
            site_name: formData.siteName,
            favicon_url: formData.faviconUrl,
            image_url: formData.imageUrl,
            description: formData.description,
          };
          break;

        case "announcement":
          postData = {
            ...base,
            content: formData.content,
            priority: formData.priority,
            cta_text: formData.ctaText,
            cta_url: formData.ctaUrl,
          };
          break;

        case "event":
          postData = {
            ...base,
            description: formData.description,
            content: formData.content,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
            start_date: formData.startDate,
            end_date: formData.endDate,
            location_name: formData.locationName,
            location_address: formData.locationAddress,
            location_url: formData.locationUrl,
            registration_url: formData.registrationUrl,
            price: formData.price,
            capacity: formData.capacity,
          };
          break;

        case "recommendation":
          postData = {
            ...base,
            subject_title: formData.subjectTitle,
            recommendation_type: formData.recommendationType,
            description: formData.description,
            rating: formData.rating,
            external_url: formData.externalUrl,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
          };
          break;

        case "rating":
          postData = {
            ...base,
            subject_title: formData.subjectTitle,
            item_type: formData.itemType,
            rating: formData.rating,
            liked: formData.liked,
            comment: formData.comment,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
          };
          break;

        case "ranking":
          postData = {
            ...base,
            description: formData.description,
            items: formData.items,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
          };
          break;
      }

      // Update post
      await updatePost.mutateAsync({ postId: id, updates: postData });

      // Upload images based on type
      if (post.type === "article" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post actualizado con cover image");
      } else if (post.type === "photo" && formData.photoImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.photoImageFile as File,
        });
        setSavedMessage("Post actualizado con imagen");
      } else if (post.type === "gallery" && formData.galleryImageFiles) {
        await uploadPostImages.mutateAsync({
          postId: id,
          files: formData.galleryImageFiles as File[],
        });
        setSavedMessage("Post actualizado con imágenes");
      } else if (post.type === "music" && formData.audioCoverFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.audioCoverFile as File,
        });
        setSavedMessage("Post actualizado con cover");
      } else if (post.type === "project" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post actualizado con cover");
      } else if (post.type === "event" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post actualizado con cover");
      } else if (post.type === "recommendation" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post actualizado con cover");
      } else if (post.type === "rating" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post actualizado con cover");
      } else if (post.type === "ranking" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId: id,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post actualizado con cover");
      } else {
        setSavedMessage("Post actualizado exitosamente");
      }

      setTimeout(() => {
        setSavedMessage("");
        navigate(`/post/${id}`);
      }, 2000);
    } catch (err) {
      setErrorMessage("Error al actualizar el post: " + String(err));
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Oops!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Error al cargar el post
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`Editar: ${post.title}`}
        description="Editar publicación"
        type="website"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Editar Post</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tipo: <span className="font-semibold capitalize">{post.type}</span>
          </p>
        </div>

        <PostForm
          type={post.type}
          onSubmit={handleFormSubmit}
          loading={loading}
          initialData={post}
        />

        {savedMessage && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
            {savedMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </Layout>
  );
}
