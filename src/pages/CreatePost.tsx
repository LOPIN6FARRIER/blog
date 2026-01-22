import { useState, useMemo } from "react";
import Layout from "../layouts/Layout";
import SEO from "../components/SEO";
import FeedRenderer from "../components/Ui/FeedRenderer";
import ImageUpload from "../components/Ui/ImageUpload";
import MultiImageUpload from "../components/Ui/MultiImageUpload";
import { usePosts } from "../Api/usePosts";
import type { Post, PostType, FeedItem } from "../types/posts/post";

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
  const {
    createPost,
    createMusicPostFromSpotify,
    uploadPostImage,
    uploadPostImages,
    loading,
  } = usePosts();

  // Base fields
  const [type, setType] = useState<PostType>("article");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [importingFromSpotify, setImportingFromSpotify] = useState(false);

  // Article fields
  const [articleCoverUrl, setArticleCoverUrl] = useState("");
  const [articleCoverAlt, setArticleCoverAlt] = useState("");
  const [articleReadTime, setArticleReadTime] = useState("");
  const [articleCoverFile, setArticleCoverFile] = useState<File | null>(null);
  const [articleUseUpload, setArticleUseUpload] = useState(false);

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

  // Preview item
  const previewItem: FeedItem = useMemo(() => {
    const base = {
      id: "preview",
      slug: title.toLowerCase().replace(/\s+/g, "-") || "preview",
      title: title || "Sin título",
      createdAt: new Date().toISOString(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt,
    };

    let post: Post;

    switch (type) {
      case "photo":
        post = {
          ...base,
          type: "photo",
          image: {
            url: photoImageFile
              ? URL.createObjectURL(photoImageFile)
              : photoImageUrl || "",
            alt: photoImageAlt || title,
          },
          description: photoDescription,
          camera: photoCamera,
          lens: photoLens,
          settings: photoSettings,
          location: photoLocation,
        } as Post;
        break;
      case "gallery":
        post = {
          ...base,
          type: "gallery",
          images: galleryImagesCsv
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
            .map((url) => ({ url, alt: title })),
          layout: galleryLayout,
          columns: galleryColumns,
        } as Post;
        break;
      case "music":
        post = {
          ...base,
          type: "music",
          audio: {
            url: audioUrl,
            title: audioTitle || title,
            artist: audioArtist,
            album: audioAlbum,
            genre: audioGenre,
            duration: audioDuration,
            coverUrl: audioCoverFile
              ? URL.createObjectURL(audioCoverFile)
              : audioCoverUrl,
          },
          description: musicDescription,
          musicType: musicType,
          spotifyUrl: spotifyUrl,
          appleMusicUrl: appleMusicUrl,
          youtubeUrl: youtubeUrl,
          releaseDate: releaseDate,
          totalTracks: totalTracks ? parseInt(totalTracks) : undefined,
        } as Post;
        break;
      case "thought":
        post = {
          ...base,
          type: "thought",
          content: thoughtContent || excerpt || content,
          source: thoughtSource,
          style: thoughtStyle,
        } as Post;
        break;
      case "video":
        post = {
          ...base,
          type: "video",
          video: {
            url: videoUrl,
            embedUrl: videoEmbed,
            thumbnail: videoThumbFile
              ? URL.createObjectURL(videoThumbFile)
              : videoThumb,
            duration: videoDuration,
            provider: videoProvider,
          },
        } as Post;
        break;
      case "project":
        post = {
          ...base,
          type: "project",
          description: projectDescription || excerpt,
          content: projectContent,
          coverImage: projectCoverFile
            ? { url: URL.createObjectURL(projectCoverFile), alt: title }
            : projectCover
              ? { url: projectCover, alt: title }
              : undefined,
          technologies: projectTechnologiesCsv
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          liveUrl: projectLiveUrl,
          repoUrl: projectRepoUrl,
          status: projectStatus,
          role: projectRole,
          client: projectClient,
          year: projectYear ? parseInt(projectYear) : undefined,
        } as Post;
        break;
      case "link":
        post = {
          ...base,
          type: "link",
          url: linkUrl,
          description: linkDescription,
          siteName: linkSiteName,
          favicon: linkFavicon,
          image: linkImageUrl ? { url: linkImageUrl, alt: title } : undefined,
        } as Post;
        break;
      case "announcement":
        post = {
          ...base,
          type: "announcement",
          content: announcementContent || excerpt,
          priority: announcementPriority,
          ctaText: announcementCtaText,
          ctaUrl: announcementCtaUrl,
        } as Post;
        break;
      case "event":
        post = {
          ...base,
          type: "event",
          description: eventDescription || excerpt,
          content: eventContent,
          coverImage: eventCoverFile
            ? { url: URL.createObjectURL(eventCoverFile), alt: title }
            : eventCover
              ? { url: eventCover, alt: title }
              : undefined,
          startDate: eventStart,
          endDate: eventEnd,
          location: {
            name: eventLocationName,
            address: eventLocationAddress,
            url: eventLocationUrl,
          },
          registrationUrl: eventRegistration,
          price: eventPrice,
          capacity: eventCapacity ? parseInt(eventCapacity) : undefined,
        } as Post;
        break;
      case "recommendation":
        post = {
          ...base,
          type: "recommendation",
          subjectTitle: recommendationSubject || title,
          recommendationType,
          description: recommendationDescription || excerpt,
          compact,
          coverImage: recommendationCoverFile
            ? {
                url: URL.createObjectURL(recommendationCoverFile),
                alt: recommendationSubject || title,
              }
            : recommendationCoverUrl
              ? {
                  url: recommendationCoverUrl,
                  alt: recommendationSubject || title,
                }
              : undefined,
          rating: recommendationRating
            ? parseFloat(recommendationRating)
            : undefined,
          externalUrl: recommendationExternalUrl,
        } as Post;
        break;
      case "rating":
        post = {
          ...base,
          type: "rating",
          subjectTitle: ratingSubject || title,
          itemType: ratingItemType,
          rating: ratingValue ? parseFloat(ratingValue) : 0,
          liked: ratingLiked,
          comment: ratingComment,
          coverImage: ratingCoverFile
            ? {
                url: URL.createObjectURL(ratingCoverFile),
                alt: ratingSubject || title,
              }
            : ratingCoverUrl
              ? { url: ratingCoverUrl, alt: ratingSubject || title }
              : undefined,
        } as Post;
        break;
      case "ranking": {
        let items = [];
        if (rankingUseVisualEditor) {
          items = rankingItems;
        } else {
          try {
            items = rankingItemsJson ? JSON.parse(rankingItemsJson) : [];
          } catch {
            items = [];
          }
        }
        post = {
          ...base,
          type: "ranking",
          description: rankingDescription || excerpt,
          items: items,
          coverImage: rankingCoverFile
            ? { url: URL.createObjectURL(rankingCoverFile), alt: title }
            : rankingCoverUrl
              ? { url: rankingCoverUrl, alt: title }
              : undefined,
        } as Post;
        break;
      }
      default:
        // Article
        post = {
          ...base,
          type: "article",
          excerpt,
          content,
          coverImage: articleCoverFile
            ? {
                url: URL.createObjectURL(articleCoverFile),
                alt: articleCoverAlt || title,
              }
            : articleCoverUrl
              ? { url: articleCoverUrl, alt: articleCoverAlt || title }
              : undefined,
          readTime: articleReadTime,
        } as Post;
    }

    return { post, size: "medium" };
  }, [
    type,
    title,
    excerpt,
    content,
    tags,
    articleCoverUrl,
    articleCoverAlt,
    articleReadTime,
    articleCoverFile,
    photoImageUrl,
    photoImageAlt,
    photoDescription,
    photoCamera,
    photoLens,
    photoSettings,
    photoLocation,
    photoImageFile,
    galleryImagesCsv,
    galleryLayout,
    galleryColumns,
    audioUrl,
    audioTitle,
    audioArtist,
    audioAlbum,
    audioGenre,
    audioDuration,
    audioCoverUrl,
    audioCoverFile,
    musicDescription,
    musicType,
    spotifyUrl,
    appleMusicUrl,
    youtubeUrl,
    releaseDate,
    totalTracks,
    thoughtContent,
    thoughtSource,
    thoughtStyle,
    videoUrl,
    videoEmbed,
    videoThumb,
    videoDuration,
    videoProvider,
    videoThumbFile,
    projectDescription,
    projectContent,
    projectCover,
    projectTechnologiesCsv,
    projectLiveUrl,
    projectRepoUrl,
    projectStatus,
    projectRole,
    projectClient,
    projectYear,
    projectCoverFile,
    linkUrl,
    linkSiteName,
    linkFavicon,
    linkImageUrl,
    linkDescription,
    announcementContent,
    announcementPriority,
    announcementCtaText,
    announcementCtaUrl,
    eventDescription,
    eventContent,
    eventCover,
    eventStart,
    eventEnd,
    eventLocationName,
    eventLocationAddress,
    eventLocationUrl,
    eventRegistration,
    eventPrice,
    eventCapacity,
    eventCoverFile,
    recommendationSubject,
    recommendationType,
    recommendationDescription,
    recommendationRating,
    recommendationExternalUrl,
    recommendationCoverUrl,
    recommendationCoverFile,
    compact,
    ratingSubject,
    ratingItemType,
    ratingValue,
    ratingLiked,
    ratingComment,
    ratingCoverUrl,
    ratingCoverFile,
    rankingDescription,
    rankingItemsJson,
    rankingCoverUrl,
    rankingCoverFile,
    rankingUseVisualEditor,
    rankingItems,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSavedMessage("");

    const base = {
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      excerpt,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    // Using snake_case for API compatibility - eslint-disable for type safety
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let postData: any;

    switch (type) {
      case "photo":
        postData = {
          ...base,
          type: "photo",
          image_url: photoImageFile ? undefined : photoImageUrl,
          image_alt: photoImageAlt || title,
          camera: photoCamera,
          lens: photoLens,
          settings: photoSettings,
          location: photoLocation,
        };
        break;
      case "gallery":
        postData = {
          ...base,
          type: "gallery",
          images: galleryImagesCsv
            .split(",")
            .map((url, i) => ({
              image_url: url.trim(),
              image_alt: title,
              sort_order: i,
            }))
            .filter((img) => img.image_url),
          layout: galleryLayout,
          columns: galleryColumns,
        };
        break;
      case "music":
        postData = {
          ...base,
          type: "music",
          audio: {
            url: audioUrl,
            title: audioTitle || title,
            artist: audioArtist,
            album: audioAlbum,
            genre: audioGenre,
            duration: audioDuration,
            coverUrl: audioCoverFile ? undefined : audioCoverUrl,
          },
        };
        break;
      case "thought":
        postData = {
          ...base,
          type: "thought",
          content: thoughtContent || excerpt || content,
          source: thoughtSource,
          style: thoughtStyle,
        };
        break;
      case "video":
        postData = {
          ...base,
          type: "video",
          video_url: videoUrl,
          embed_url: videoEmbed,
          thumbnail_url: videoThumbFile ? undefined : videoThumb,
          duration: videoDuration,
          provider: videoProvider,
        };
        break;
      case "project":
        postData = {
          ...base,
          type: "project",
          description: projectDescription || excerpt,
          content: projectContent,
          cover_image_url: projectCoverFile ? undefined : projectCover,
          cover_image_alt: title,
          technologies: projectTechnologiesCsv
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          live_url: projectLiveUrl,
          repo_url: projectRepoUrl,
          status: projectStatus,
          role: projectRole,
          client: projectClient,
          year: projectYear ? parseInt(projectYear) : undefined,
        };
        break;
      case "link":
        postData = {
          ...base,
          type: "link",
          url: linkUrl,
          description: linkDescription,
          site_name: linkSiteName,
          favicon: linkFavicon,
          image_url: linkImageUrl,
        };
        break;
      case "announcement":
        postData = {
          ...base,
          type: "announcement",
          content: announcementContent || excerpt,
          priority: announcementPriority,
          cta_text: announcementCtaText,
          cta_url: announcementCtaUrl,
        };
        break;
      case "event":
        postData = {
          ...base,
          type: "event",
          description: eventDescription || excerpt,
          content: eventContent,
          cover_image_url: eventCoverFile ? undefined : eventCover,
          cover_image_alt: title,
          start_date: eventStart,
          end_date: eventEnd,
          location_name: eventLocationName,
          location_address: eventLocationAddress,
          is_virtual: !!eventLocationUrl,
          virtual_url: eventLocationUrl,
          registration_url: eventRegistration,
          price: eventPrice,
          capacity: eventCapacity ? parseInt(eventCapacity) : undefined,
        };
        break;
      case "recommendation":
        postData = {
          ...base,
          type: "recommendation",
          subject_title: recommendationSubject || title,
          recommendation_type: recommendationType,
          description: recommendationDescription || excerpt,
          compact,
          cover_image_url: recommendationCoverFile
            ? undefined
            : recommendationCoverUrl,
          cover_image_alt: recommendationSubject || title,
          rating: recommendationRating
            ? parseFloat(recommendationRating)
            : undefined,
          external_url: recommendationExternalUrl,
        };
        break;
      case "rating":
        postData = {
          ...base,
          type: "rating",
          subject_title: ratingSubject || title,
          item_type: ratingItemType,
          rating: ratingValue ? parseFloat(ratingValue) : 0,
          liked: ratingLiked,
          comment: ratingComment,
          cover_image_url: ratingCoverFile ? undefined : ratingCoverUrl,
          cover_image_alt: ratingSubject || title,
        };
        break;
      case "ranking": {
        let items = [];
        if (rankingUseVisualEditor) {
          items = rankingItems.map((item) => ({
            rank: item.rank,
            subject_title: item.subjectTitle,
            item_type: item.itemType,
            rating: item.rating ? parseFloat(item.rating) : undefined,
            description: item.description || undefined,
          }));
        } else {
          try {
            items = rankingItemsJson ? JSON.parse(rankingItemsJson) : [];
          } catch {
            items = [];
          }
        }
        postData = {
          ...base,
          type: "ranking",
          description: rankingDescription || excerpt,
          items: items,
          cover_image_url: rankingCoverFile ? undefined : rankingCoverUrl,
          cover_image_alt: title,
        };
        break;
      }
      default:
        postData = {
          ...base,
          type: "article",
          content,
          cover_image_url: articleCoverFile ? undefined : articleCoverUrl,
          cover_image_alt: articleCoverAlt || title,
          read_time: articleReadTime,
        };
    }

    try {
      const createdPost = await createPost(postData as Omit<Post, "id">);
      setSavedMessage("Post creado exitosamente");

      // Upload images if needed
      if (createdPost?.id) {
        const postId = createdPost.id;

        if (type === "article" && articleCoverFile) {
          await uploadPostImage(postId, articleCoverFile);
          setSavedMessage("Post creado con imagen");
        } else if (type === "photo" && photoImageFile) {
          await uploadPostImage(postId, photoImageFile);
          setSavedMessage("Post creado con imagen");
        } else if (type === "gallery" && galleryImageFiles.length > 0) {
          await uploadPostImages(postId, galleryImageFiles);
          setSavedMessage(
            `Post creado con ${galleryImageFiles.length} imágenes`,
          );
        } else if (type === "music" && audioCoverFile) {
          await uploadPostImage(postId, audioCoverFile);
          setSavedMessage("Post creado con cover");
        } else if (type === "video" && videoThumbFile) {
          await uploadPostImage(postId, videoThumbFile);
          setSavedMessage("Post creado con thumbnail");
        } else if (type === "project" && projectCoverFile) {
          await uploadPostImage(postId, projectCoverFile);
          setSavedMessage("Post creado con cover");
        } else if (type === "event" && eventCoverFile) {
          await uploadPostImage(postId, eventCoverFile);
          setSavedMessage("Post creado con cover");
        } else if (type === "recommendation" && recommendationCoverFile) {
          await uploadPostImage(postId, recommendationCoverFile);
          setSavedMessage("Post creado con cover");
        } else if (type === "rating" && ratingCoverFile) {
          await uploadPostImage(postId, ratingCoverFile);
          setSavedMessage("Post creado con cover");
        } else if (type === "ranking" && rankingCoverFile) {
          await uploadPostImage(postId, rankingCoverFile);
          setSavedMessage("Post creado con cover");
        }
      }

      setTimeout(() => setSavedMessage(""), 3500);
    } catch (err) {
      setErrorMessage("Error al crear el post: " + String(err));
    }
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    setArticleCoverUrl("");
    setArticleCoverAlt("");
    setArticleReadTime("");
    setArticleCoverFile(null);
    setPhotoImageUrl("");
    setPhotoImageAlt("");
    setPhotoImageFile(null);
  };

  const inputClass =
    "w-full rounded p-2 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-1";
  const labelClass = "block text-sm font-medium";

  const renderImageUploadSection = (
    label: string,
    useUpload: boolean,
    setUseUpload: (v: boolean) => void,
    url: string,
    setUrl: (v: string) => void,
    file: File | null,
    setFile: (f: File | null) => void,
  ) => (
    <div className="border-t border-blue-200 dark:border-gray-700 pt-3 mt-3">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="flex items-center gap-4 mb-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!useUpload}
            onChange={() => setUseUpload(false)}
            className="accent-blue-500"
          />
          <span className="text-sm">URL externa</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={useUpload}
            onChange={() => setUseUpload(true)}
            className="accent-blue-500"
          />
          <span className="text-sm">Subir imagen</span>
        </label>
      </div>

      {useUpload ? (
        <ImageUpload
          label={`Subir ${label.toLowerCase()}`}
          previewUrl={file ? URL.createObjectURL(file) : ""}
          onSelect={(f) => {
            setFile(f);
            setUrl(URL.createObjectURL(f));
          }}
          onClear={() => {
            setFile(null);
            setUrl("");
          }}
        />
      ) : (
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      )}
    </div>
  );

  return (
    <Layout>
      <SEO
        title="Create Post - Vinicio Esparza"
        description="Crear una nueva publicación en el blog de Vinicio Esparza"
        type="website"
      />
      <h1 className="text-3xl font-bold mb-6">Crear Post</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type selector */}
          <div>
            <label className={labelClass}>Tipo de Post</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PostType)}
              className={inputClass}
            >
              {postTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Base fields */}
          <div>
            <label className={labelClass}>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tags (separados por coma)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Contenido (Markdown)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className={`${inputClass} font-mono text-sm`}
            />
          </div>

          {/* Type-specific fields */}
          {type === "article" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Article Fields
              </h4>
              {renderImageUploadSection(
                "Cover Image",
                articleUseUpload,
                setArticleUseUpload,
                articleCoverUrl,
                setArticleCoverUrl,
                articleCoverFile,
                setArticleCoverFile,
              )}
              <div>
                <label className={labelClass}>Cover Alt Text</label>
                <input
                  type="text"
                  value={articleCoverAlt}
                  onChange={(e) => setArticleCoverAlt(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Read Time</label>
                <input
                  type="text"
                  value={articleReadTime}
                  onChange={(e) => setArticleReadTime(e.target.value)}
                  placeholder="5 min read"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {type === "photo" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Photo Fields
              </h4>
              {renderImageUploadSection(
                "Image",
                photoUseUpload,
                setPhotoUseUpload,
                photoImageUrl,
                setPhotoImageUrl,
                photoImageFile,
                setPhotoImageFile,
              )}
              <div>
                <label className={labelClass}>Alt Text</label>
                <input
                  type="text"
                  value={photoImageAlt}
                  onChange={(e) => setPhotoImageAlt(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={photoDescription}
                  onChange={(e) => setPhotoDescription(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Camera</label>
                  <input
                    type="text"
                    value={photoCamera}
                    onChange={(e) => setPhotoCamera(e.target.value)}
                    placeholder="Canon EOS R5"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Lens</label>
                  <input
                    type="text"
                    value={photoLens}
                    onChange={(e) => setPhotoLens(e.target.value)}
                    placeholder="RF 50mm f/1.2"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Settings</label>
                <input
                  type="text"
                  value={photoSettings}
                  onChange={(e) => setPhotoSettings(e.target.value)}
                  placeholder="f/2.8, 1/500s, ISO 100"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={photoLocation}
                  onChange={(e) => setPhotoLocation(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {type === "gallery" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Gallery Fields
              </h4>

              {/* Toggle between URL input and file upload */}
              <div className="flex items-center gap-4 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={
                      galleryImageFiles.length === 0 && galleryImagesCsv !== ""
                    }
                    onChange={() => setGalleryImageFiles([])}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">URLs externas</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={
                      galleryImageFiles.length > 0 || galleryImagesCsv === ""
                    }
                    onChange={() => setGalleryImagesCsv("")}
                    className="accent-blue-500"
                  />
                  <span className="text-sm">Subir imágenes</span>
                </label>
              </div>

              {galleryImageFiles.length === 0 && galleryImagesCsv !== "" ? (
                <div>
                  <label className={labelClass}>
                    Image URLs (comma separated)
                  </label>
                  <textarea
                    value={galleryImagesCsv}
                    onChange={(e) => setGalleryImagesCsv(e.target.value)}
                    rows={3}
                    className={inputClass}
                  />
                </div>
              ) : (
                <MultiImageUpload
                  label="Agregar imágenes"
                  files={galleryImageFiles}
                  onSelect={(files) => setGalleryImageFiles(files)}
                  onRemove={(index) =>
                    setGalleryImageFiles((files) =>
                      files.filter((_, i) => i !== index),
                    )
                  }
                  onClear={() => setGalleryImageFiles([])}
                  maxFiles={20}
                />
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Layout</label>
                  <select
                    value={galleryLayout}
                    onChange={(e) =>
                      setGalleryLayout(
                        e.target.value as "grid" | "masonry" | "carousel",
                      )
                    }
                    className={inputClass}
                  >
                    <option value="grid">Grid</option>
                    <option value="masonry">Masonry</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Columns</label>
                  <select
                    value={galleryColumns}
                    onChange={(e) =>
                      setGalleryColumns(parseInt(e.target.value) as 2 | 3 | 4)
                    }
                    className={inputClass}
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {type === "music" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Music Fields
              </h4>

              {/* Quick Import from Spotify */}
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <label className={labelClass + " mb-2"}>
                  🎵 Quick Import from Spotify
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Spotify URL (track or album)"
                    className={inputClass + " flex-1"}
                    id="spotifyImportUrl"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      const input = document.getElementById(
                        "spotifyImportUrl",
                      ) as HTMLInputElement;
                      const url = input.value.trim();
                      if (!url) {
                        alert("Please paste a Spotify URL");
                        return;
                      }

                      try {
                        setImportingFromSpotify(true);
                        await createMusicPostFromSpotify({
                          url,
                          title,
                          tags: tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                          category,
                          status: "draft",
                        });
                        alert("Music post created successfully from Spotify!");
                        // Optionally reset form or redirect
                      } catch (error) {
                        alert("Failed to import from Spotify: " + error);
                      } finally {
                        setImportingFromSpotify(false);
                      }
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    disabled={importingFromSpotify}
                  >
                    {importingFromSpotify ? "Importing..." : "Import"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Automatically fills all fields from Spotify (track info,
                  cover, release date, etc.)
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-blue-50 dark:bg-gray-900/50 text-gray-500">
                    Or fill manually
                  </span>
                </div>
              </div>

              <div>
                <label className={labelClass}>Audio URL</label>
                <input
                  type="text"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Title</label>
                  <input
                    type="text"
                    value={audioTitle}
                    onChange={(e) => setAudioTitle(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Artist</label>
                  <input
                    type="text"
                    value={audioArtist}
                    onChange={(e) => setAudioArtist(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Album</label>
                  <input
                    type="text"
                    value={audioAlbum}
                    onChange={(e) => setAudioAlbum(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Genre</label>
                  <input
                    type="text"
                    value={audioGenre}
                    onChange={(e) => setAudioGenre(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Duration</label>
                <input
                  type="text"
                  value={audioDuration}
                  onChange={(e) => setAudioDuration(e.target.value)}
                  placeholder="3:42"
                  className={inputClass}
                />
              </div>
              {renderImageUploadSection(
                "Cover Image",
                audioUseUpload,
                setAudioUseUpload,
                audioCoverUrl,
                setAudioCoverUrl,
                audioCoverFile,
                setAudioCoverFile,
              )}
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={musicDescription}
                  onChange={(e) => setMusicDescription(e.target.value)}
                  rows={3}
                  placeholder="Descripción de la canción o álbum"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Music Type</label>
                  <select
                    value={musicType}
                    onChange={(e) =>
                      setMusicType(e.target.value as "track" | "album")
                    }
                    className={inputClass}
                  >
                    <option value="track">Track</option>
                    <option value="album">Album</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Total Tracks (if album)</label>
                  <input
                    type="number"
                    value={totalTracks}
                    onChange={(e) => setTotalTracks(e.target.value)}
                    placeholder="10"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Release Date</label>
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelClass}>Spotify URL</label>
                  <input
                    type="text"
                    value={spotifyUrl}
                    onChange={(e) => setSpotifyUrl(e.target.value)}
                    placeholder="https://open.spotify.com/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Apple Music URL</label>
                  <input
                    type="text"
                    value={appleMusicUrl}
                    onChange={(e) => setAppleMusicUrl(e.target.value)}
                    placeholder="https://music.apple.com/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>YouTube URL</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {type === "thought" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Thought Fields
              </h4>
              <div>
                <label className={labelClass}>Thought Content</label>
                <textarea
                  value={thoughtContent}
                  onChange={(e) => setThoughtContent(e.target.value)}
                  rows={4}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Source (if quote)</label>
                <input
                  type="text"
                  value={thoughtSource}
                  onChange={(e) => setThoughtSource(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Style</label>
                <select
                  value={thoughtStyle}
                  onChange={(e) =>
                    setThoughtStyle(e.target.value as "quote" | "note" | "idea")
                  }
                  className={inputClass}
                >
                  <option value="note">Note</option>
                  <option value="quote">Quote</option>
                  <option value="idea">Idea</option>
                </select>
              </div>
            </div>
          )}

          {type === "video" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Video Fields
              </h4>
              <div>
                <label className={labelClass}>Video URL</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Embed URL</label>
                <input
                  type="text"
                  value={videoEmbed}
                  onChange={(e) => setVideoEmbed(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Provider</label>
                  <select
                    value={videoProvider}
                    onChange={(e) =>
                      setVideoProvider(
                        e.target.value as "youtube" | "vimeo" | "self",
                      )
                    }
                    className={inputClass}
                  >
                    <option value="self">Self</option>
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Duration</label>
                  <input
                    type="text"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(e.target.value)}
                    placeholder="3:42"
                    className={inputClass}
                  />
                </div>
              </div>
              {renderImageUploadSection(
                "Thumbnail",
                videoUseUpload,
                setVideoUseUpload,
                videoThumb,
                setVideoThumb,
                videoThumbFile,
                setVideoThumbFile,
              )}
            </div>
          )}

          {type === "project" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Project Fields
              </h4>
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className={inputClass}
                />
              </div>
              {renderImageUploadSection(
                "Cover Image",
                projectUseUpload,
                setProjectUseUpload,
                projectCover,
                setProjectCover,
                projectCoverFile,
                setProjectCoverFile,
              )}
              <div>
                <label className={labelClass}>
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={projectTechnologiesCsv}
                  onChange={(e) => setProjectTechnologiesCsv(e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Live URL</label>
                  <input
                    type="text"
                    value={projectLiveUrl}
                    onChange={(e) => setProjectLiveUrl(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Repo URL</label>
                  <input
                    type="text"
                    value={projectRepoUrl}
                    onChange={(e) => setProjectRepoUrl(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={projectStatus}
                    onChange={(e) =>
                      setProjectStatus(
                        e.target.value as
                          | "in_progress"
                          | "completed"
                          | "archived",
                      )
                    }
                    className={inputClass}
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Role</label>
                  <input
                    type="text"
                    value={projectRole}
                    onChange={(e) => setProjectRole(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input
                    type="number"
                    value={projectYear}
                    onChange={(e) => setProjectYear(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {type === "link" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Link Fields
              </h4>
              <div>
                <label className={labelClass}>URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={linkDescription}
                  onChange={(e) => setLinkDescription(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Site Name</label>
                  <input
                    type="text"
                    value={linkSiteName}
                    onChange={(e) => setLinkSiteName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Favicon URL</label>
                  <input
                    type="text"
                    value={linkFavicon}
                    onChange={(e) => setLinkFavicon(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  type="text"
                  value={linkImageUrl}
                  onChange={(e) => setLinkImageUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {type === "announcement" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Announcement Fields
              </h4>
              <div>
                <label className={labelClass}>Content</label>
                <textarea
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <select
                  value={announcementPriority}
                  onChange={(e) =>
                    setAnnouncementPriority(
                      e.target.value as "low" | "normal" | "high" | "urgent",
                    )
                  }
                  className={inputClass}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>CTA Text</label>
                  <input
                    type="text"
                    value={announcementCtaText}
                    onChange={(e) => setAnnouncementCtaText(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>CTA URL</label>
                  <input
                    type="text"
                    value={announcementCtaUrl}
                    onChange={(e) => setAnnouncementCtaUrl(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {type === "event" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Event Fields
              </h4>
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className={inputClass}
                />
              </div>
              {renderImageUploadSection(
                "Cover Image",
                eventUseUpload,
                setEventUseUpload,
                eventCover,
                setEventCover,
                eventCoverFile,
                setEventCoverFile,
              )}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="datetime-local"
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="datetime-local"
                    value={eventEnd}
                    onChange={(e) => setEventEnd(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Location Name</label>
                <input
                  type="text"
                  value={eventLocationName}
                  onChange={(e) => setEventLocationName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <input
                  type="text"
                  value={eventLocationAddress}
                  onChange={(e) => setEventLocationAddress(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Virtual URL</label>
                <input
                  type="text"
                  value={eventLocationUrl}
                  onChange={(e) => setEventLocationUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Registration URL</label>
                <input
                  type="text"
                  value={eventRegistration}
                  onChange={(e) => setEventRegistration(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Price</label>
                  <input
                    type="text"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                    placeholder="$50 or Free"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Capacity</label>
                  <input
                    type="number"
                    value={eventCapacity}
                    onChange={(e) => setEventCapacity(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {type === "recommendation" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Recommendation Fields
              </h4>
              <div>
                <label className={labelClass}>Subject Title</label>
                <input
                  type="text"
                  value={recommendationSubject}
                  onChange={(e) => setRecommendationSubject(e.target.value)}
                  placeholder="Nombre de la serie, película, libro, etc."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select
                  value={recommendationType}
                  onChange={(e) =>
                    setRecommendationType(
                      e.target.value as
                        | "serie"
                        | "película"
                        | "libro"
                        | "podcast"
                        | "otro",
                    )
                  }
                  className={inputClass}
                >
                  <option value="serie">Serie</option>
                  <option value="película">Película</option>
                  <option value="libro">Libro</option>
                  <option value="podcast">Podcast</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={recommendationDescription}
                  onChange={(e) => setRecommendationDescription(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Rating (0-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={recommendationRating}
                    onChange={(e) => setRecommendationRating(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>External URL</label>
                  <input
                    type="text"
                    value={recommendationExternalUrl}
                    onChange={(e) =>
                      setRecommendationExternalUrl(e.target.value)
                    }
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="compactCheck"
                  checked={compact}
                  onChange={(e) => setCompact(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-gray-800 dark:border-gray-600"
                />
                <label
                  htmlFor="compactCheck"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Compact view (smaller card)
                </label>
              </div>
              {renderImageUploadSection(
                "Cover Image",
                recommendationUseUpload,
                setRecommendationUseUpload,
                recommendationCoverUrl,
                setRecommendationCoverUrl,
                recommendationCoverFile,
                setRecommendationCoverFile,
              )}
            </div>
          )}

          {type === "rating" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Rating Fields
              </h4>
              <div>
                <label className={labelClass}>Subject Title</label>
                <input
                  type="text"
                  value={ratingSubject}
                  onChange={(e) => setRatingSubject(e.target.value)}
                  placeholder="Nombre de lo que calificas"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select
                  value={ratingItemType}
                  onChange={(e) =>
                    setRatingItemType(
                      e.target.value as
                        | "serie"
                        | "película"
                        | "libro"
                        | "podcast"
                        | "otro",
                    )
                  }
                  className={inputClass}
                >
                  <option value="serie">Serie</option>
                  <option value="película">Película</option>
                  <option value="libro">Libro</option>
                  <option value="podcast">Podcast</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Rating (0-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={ratingValue}
                    onChange={(e) => setRatingValue(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ratingLiked}
                      onChange={(e) => setRatingLiked(e.target.checked)}
                      className="accent-blue-500"
                    />
                    <span className="text-sm">Me gustó ❤️</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Comment</label>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  rows={3}
                  placeholder="Tu opinión sobre esto..."
                  className={inputClass}
                />
              </div>
              {renderImageUploadSection(
                "Cover Image",
                ratingUseUpload,
                setRatingUseUpload,
                ratingCoverUrl,
                setRatingCoverUrl,
                ratingCoverFile,
                setRatingCoverFile,
              )}
            </div>
          )}

          {type === "ranking" && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Ranking Fields
              </h4>
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={rankingDescription}
                  onChange={(e) => setRankingDescription(e.target.value)}
                  placeholder="Descripción del ranking"
                  className={inputClass}
                />
              </div>

              {/* Toggle entre editor visual y JSON */}
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-950 rounded border border-blue-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setRankingUseVisualEditor(true)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    rankingUseVisualEditor
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Editor Visual
                </button>
                <button
                  type="button"
                  onClick={() => setRankingUseVisualEditor(false)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    !rankingUseVisualEditor
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  JSON
                </button>
              </div>

              {rankingUseVisualEditor ? (
                <div className="space-y-3">
                  {/* Lista de items */}
                  <div className="space-y-2">
                    {rankingItems.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white dark:bg-gray-950 rounded border border-blue-200 dark:border-gray-700 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">
                                Rank
                              </label>
                              <input
                                type="number"
                                value={item.rank}
                                onChange={(e) => {
                                  const newItems = [...rankingItems];
                                  newItems[index].rank = parseInt(
                                    e.target.value,
                                  );
                                  setRankingItems(newItems);
                                }}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">
                                Tipo
                              </label>
                              <select
                                value={item.itemType}
                                onChange={(e) => {
                                  const newItems = [...rankingItems];
                                  newItems[index].itemType = e.target
                                    .value as any;
                                  setRankingItems(newItems);
                                }}
                                className={inputClass}
                              >
                                <option value="serie">Serie</option>
                                <option value="película">Película</option>
                                <option value="libro">Libro</option>
                                <option value="podcast">Podcast</option>
                                <option value="otro">Otro</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-gray-500 dark:text-gray-400">
                                Título
                              </label>
                              <input
                                type="text"
                                value={item.subjectTitle}
                                onChange={(e) => {
                                  const newItems = [...rankingItems];
                                  newItems[index].subjectTitle = e.target.value;
                                  setRankingItems(newItems);
                                }}
                                placeholder="Breaking Bad"
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">
                                Rating (opcional)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={item.rating || ""}
                                onChange={(e) => {
                                  const newItems = [...rankingItems];
                                  newItems[index].rating = e.target.value;
                                  setRankingItems(newItems);
                                }}
                                placeholder="9.5"
                                className={inputClass}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-xs text-gray-500 dark:text-gray-400">
                                Descripción (opcional)
                              </label>
                              <textarea
                                value={item.description || ""}
                                onChange={(e) => {
                                  const newItems = [...rankingItems];
                                  newItems[index].description = e.target.value;
                                  setRankingItems(newItems);
                                }}
                                rows={2}
                                placeholder="La mejor serie de todos los tiempos..."
                                className={inputClass}
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = rankingItems.filter(
                                (_, i) => i !== index,
                              );
                              setRankingItems(newItems);
                            }}
                            className="shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            title="Eliminar item"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón añadir item */}
                  <button
                    type="button"
                    onClick={() => {
                      setRankingItems([
                        ...rankingItems,
                        {
                          rank: rankingItems.length + 1,
                          subjectTitle: "",
                          itemType: "serie",
                          rating: "",
                          description: "",
                        },
                      ]);
                    }}
                    className="w-full px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded border-2 border-dashed border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Añadir Item
                  </button>
                </div>
              ) : (
                <div>
                  <label className={labelClass}>Items (JSON format)</label>
                  <textarea
                    value={rankingItemsJson}
                    onChange={(e) => setRankingItemsJson(e.target.value)}
                    rows={8}
                    placeholder='[{"rank":1,"subjectTitle":"Breaking Bad","itemType":"serie","rating":9.5,"description":"La mejor serie"}]'
                    className={`${inputClass} font-mono text-xs`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formato: Array de objetos con rank, subjectTitle, itemType,
                    rating (opcional), description (opcional)
                  </p>
                </div>
              )}

              {renderImageUploadSection(
                "Cover Image",
                rankingUseUpload,
                setRankingUseUpload,
                rankingCoverUrl,
                setRankingCoverUrl,
                rankingCoverFile,
                setRankingCoverFile,
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Reset
            </button>
            {savedMessage && (
              <span className="text-sm text-green-600">{savedMessage}</span>
            )}
            {errorMessage && (
              <span className="text-sm text-red-600">{errorMessage}</span>
            )}
          </div>
        </form>

        {/* Preview */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vista previa</h3>
            <span className="text-sm text-gray-500">Tipo: {type}</span>
          </div>

          <div className="rounded-xl p-4 border border-blue-200 dark:border-gray-900 bg-white dark:bg-gray-950">
            <h1 className="text-xl font-bold mb-1">{title || "Sin título"}</h1>
            {excerpt && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {excerpt}
              </p>
            )}

            <div>
              <FeedRenderer item={previewItem} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
