import { useState } from "react";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import PostForm from "../components/forms/PostForm";
import { usePostMutations } from "../Api/usePosts";
import type { PostType } from "../types/posts/post";
import { v4 as uuidv4 } from "uuid";

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

const CreatePost = () => {
  const { createPost, uploadPostImage, uploadPostImages, loading, createMusicPostFromSpotify } =
    usePostMutations();

  const [type, setType] = useState<PostType>("article");
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSpotifyImport = async (url: string, baseData: { title: string; tags: string[]; category: string }) => {
    try {
      await createMusicPostFromSpotify.mutateAsync({
        url,
        title: baseData.title,
        tags: baseData.tags,
        category: baseData.category,
        status: "draft",
      });
    } catch (error) {
      throw error;
    }
  };

  const handleFormSubmit = async (formData: Record<string, unknown>) => {
    setErrorMessage("");
    setSavedMessage("");

    try {
      // Prepare base data
      const base = {
        slug: uuidv4(),
        title: formData.title as string,
        tags: formData.tags as string[],
        category: formData.category as string,
        featured: formData.featured as boolean,
        draft: formData.draft as boolean,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let postData: any;

      switch (type) {
        case "article":
          postData = {
            ...base,
            type: "article",
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
            type: "photo",
            image_url: formData.photoImageFile
              ? undefined
              : formData.photoImageUrl,
            image_alt: formData.photoImageAlt || formData.title,
          };
          break;

        case "gallery":
          postData = {
            ...base,
            type: "gallery",
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
            type: "thought",
            content: formData.content,
            source: formData.source,
            style: formData.style,
          };
          break;

        case "music":
          postData = {
            ...base,
            type: "music",
            audio_url: formData.audioUrl,
            audio_title: formData.audioTitle || formData.title,
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
            type: "video",
            video_url: formData.videoUrl,
            video_embed: formData.videoEmbed,
            video_thumb: formData.videoThumb,
            video_duration: formData.videoDuration,
            video_provider: formData.videoProvider,
            description: formData.description,
          };
          break;

        case "project":
          postData = {
            ...base,
            type: "project",
            description: formData.description,
            content: formData.content,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
            technologies: formData.technologies,
            live_url: formData.liveUrl,
            repo_url: formData.repoUrl,
            status: formData.status,
          };
          break;

        case "link":
          postData = {
            ...base,
            type: "link",
            url: formData.url,
            description: formData.description,
            site_name: formData.siteName,
          };
          break;

        case "announcement":
          postData = {
            ...base,
            type: "announcement",
            content: formData.content,
            priority: formData.priority,
            cta_text: formData.ctaText,
            cta_url: formData.ctaUrl,
          };
          break;

        case "event":
          postData = {
            ...base,
            type: "event",
            description: formData.description,
            content: formData.content,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
            start_date: formData.startDate,
            end_date: formData.endDate,
            location_name: (formData.location as Record<string, unknown>)
              ?.name as string,
            location_address: (formData.location as Record<string, unknown>)
              ?.address as string,
            registration_url: formData.registrationUrl,
          };
          break;

        case "recommendation":
          postData = {
            ...base,
            type: "recommendation",
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
            type: "rating",
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
            type: "ranking",
            description: formData.description,
            items: formData.items,
            cover_image_url: formData.coverImageFile
              ? undefined
              : formData.coverImageUrl,
          };
          break;
      }

      // Create post
      const result = await createPost.mutateAsync(postData);
      const postId = result.id;

      // Upload images based on type
      if (type === "article" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post creado con cover image");
      } else if (type === "photo" && formData.photoImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.photoImageFile as File,
        });
        setSavedMessage("Post creado con imagen");
      } else if (type === "gallery" && formData.galleryImageFiles) {
        await uploadPostImages.mutateAsync({
          postId,
          files: formData.galleryImageFiles as File[],
        });
        setSavedMessage("Post creado con imágenes");
      } else if (type === "music" && formData.audioCoverFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.audioCoverFile as File,
        });
        setSavedMessage("Post creado con cover");
      } else if (type === "project" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post creado con cover");
      } else if (type === "event" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post creado con cover");
      } else if (type === "recommendation" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post creado con cover");
      } else if (type === "rating" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post creado con cover");
      } else if (type === "ranking" && formData.coverImageFile) {
        await uploadPostImage.mutateAsync({
          postId,
          file: formData.coverImageFile as File,
        });
        setSavedMessage("Post creado con cover");
      } else {
        setSavedMessage("Post creado exitosamente");
      }

      setTimeout(() => setSavedMessage(""), 3500);
    } catch (err) {
      setErrorMessage("Error al crear el post: " + String(err));
    }
  };

  return (
    <Layout>
      <SEO
        title="Crear Post"
        description="Crea un nuevo post en el blog"
        type="website"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Crear Nuevo Post</h1>

        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Tipo de Post
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PostType)}
              className="w-full p-3 border rounded-lg"
            >
              {postTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <PostForm 
            type={type} 
            onSubmit={handleFormSubmit} 
            loading={loading}
            onSpotifyImport={type === "music" ? handleSpotifyImport : undefined}
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
      </div>
    </Layout>
  );
};

export default CreatePost;
