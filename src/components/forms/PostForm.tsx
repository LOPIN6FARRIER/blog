import { useState, useMemo } from "react";
import ImageUpload from "../Ui/ImageUpload";
import MultiImageUpload from "../Ui/MultiImageUpload";
import FeedRenderer from "../Ui/FeedRenderer";
import type { PostType, Post, FeedItem } from "../../types/posts/post";

interface PostFormProps {
  type: PostType;
  onSubmit: (formData: Record<string, unknown>) => void;
  loading: boolean;
  initialData?: Post;
  onSpotifyImport?: (url: string, baseData: { title: string; tags: string[]; category: string }) => Promise<void>;
}

export default function PostForm({
  type,
  onSubmit,
  loading,
  initialData,
  onSpotifyImport,
}: PostFormProps) {
  // Base fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [draft, setDraft] = useState(initialData?.draft || false);

  // Article fields
  const [content, setContent] = useState(
    initialData?.type === "article" ? initialData.content || "" : "",
  );
  const [excerpt, setExcerpt] = useState(
    initialData?.type === "article" ? initialData.excerpt || "" : "",
  );
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData &&
      (initialData.type === "article" ||
        initialData.type === "project" ||
        initialData.type === "event" ||
        initialData.type === "recommendation" ||
        initialData.type === "rating" ||
        initialData.type === "ranking")
      ? initialData.coverImage?.url || ""
      : "",
  );
  const [coverImageAlt, setCoverImageAlt] = useState(
    initialData?.type === "article" ? initialData.coverImage?.alt || "" : "",
  );
  const [readTime, setReadTime] = useState(
    initialData?.type === "article" ? initialData.readTime || "" : "",
  );
  const [useUpload, setUseUpload] = useState(false);

  // Photo fields
  const [photoImageFile, setPhotoImageFile] = useState<File | null>(null);
  const [photoImageUrl, setPhotoImageUrl] = useState(
    initialData?.type === "photo" ? initialData.image?.url || "" : "",
  );
  const [photoImageAlt, setPhotoImageAlt] = useState(
    initialData?.type === "photo" ? initialData.image?.alt || "" : "",
  );

  // Gallery fields
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [galleryImageUrls, _setGalleryImageUrls] = useState<
    Array<{ url: string; alt: string }>
  >(initialData?.type === "gallery" ? initialData.images || [] : []);
  const [galleryImageUrlsCsv, setGalleryImageUrlsCsv] = useState(
    initialData?.type === "gallery"
      ? initialData.images?.map((img) => img.url).join(", ") || ""
      : "",
  );
  const [galleryUseUpload, setGalleryUseUpload] = useState(false);
  const [galleryDescription, setGalleryDescription] = useState(
    initialData?.type === "gallery" ? initialData.description || "" : "",
  );
  const [galleryLayout, setGalleryLayout] = useState<
    "grid" | "masonry" | "carousel"
  >(initialData?.type === "gallery" ? initialData.layout || "grid" : "grid");
  const [galleryColumns, setGalleryColumns] = useState<2 | 3 | 4>(
    initialData?.type === "gallery" ? initialData.columns || 2 : 2,
  );

  // Thought fields
  const [thoughtContent, setThoughtContent] = useState(
    initialData?.type === "thought" ? initialData.content || "" : "",
  );
  const [thoughtSource, setThoughtSource] = useState(
    initialData?.type === "thought" ? initialData.source || "" : "",
  );
  const [thoughtStyle, setThoughtStyle] = useState<"quote" | "note" | "idea">(
    initialData?.type === "thought" ? initialData.style || "note" : "note",
  );

  // Music fields
  const [audioUrl, setAudioUrl] = useState(
    initialData?.type === "music" ? initialData.audio?.url || "" : "",
  );
  const [audioTitle, setAudioTitle] = useState(
    initialData?.type === "music" ? initialData.audio?.title || "" : "",
  );
  const [audioArtist, setAudioArtist] = useState(
    initialData?.type === "music" ? initialData.audio?.artist || "" : "",
  );
  const [audioAlbum, setAudioAlbum] = useState(
    initialData?.type === "music" ? initialData.audio?.album || "" : "",
  );
  const [audioGenre, setAudioGenre] = useState(
    initialData?.type === "music" ? initialData.audio?.genre || "" : "",
  );
  const [audioDuration, setAudioDuration] = useState(
    initialData?.type === "music" ? initialData.audio?.duration || "" : "",
  );
  const [audioCoverUrl, setAudioCoverUrl] = useState(
    initialData?.type === "music" ? initialData.audio?.coverUrl || "" : "",
  );
  const [audioCoverFile, setAudioCoverFile] = useState<File | null>(null);
  const [musicDescription, setMusicDescription] = useState(
    initialData?.type === "music" ? initialData.description || "" : "",
  );
  const [musicType, setMusicType] = useState<"track" | "album">(
    initialData?.type === "music" ? initialData.musicType || "track" : "track",
  );
  const [spotifyUrl, setSpotifyUrl] = useState(
    initialData?.type === "music" ? initialData.spotifyUrl || "" : "",
  );
  const [appleMusicUrl, setAppleMusicUrl] = useState(
    initialData?.type === "music" ? initialData.appleMusicUrl || "" : "",
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    initialData?.type === "music" ? initialData.youtubeUrl || "" : "",
  );
  const [musicMode, setMusicMode] = useState<"spotify" | "manual">("manual");
  const [spotifyImportUrl, setSpotifyImportUrl] = useState("");
  const [importingFromSpotify, setImportingFromSpotify] = useState(false);

  // Video fields
  const [videoUrl, setVideoUrl] = useState(
    initialData?.type === "video" ? initialData.video?.url || "" : "",
  );
  const [videoEmbed, setVideoEmbed] = useState(
    initialData?.type === "video" ? initialData.video?.embedUrl || "" : "",
  );
  const [videoThumb, setVideoThumb] = useState(
    initialData?.type === "video" ? initialData.video?.thumbnail || "" : "",
  );
  const [videoDuration, setVideoDuration] = useState(
    initialData?.type === "video" ? initialData.video?.duration || "" : "",
  );
  const [videoProvider, setVideoProvider] = useState<
    "youtube" | "vimeo" | "self"
  >(
    initialData?.type === "video"
      ? initialData.video?.provider || "self"
      : "self",
  );
  const [videoDescription, setVideoDescription] = useState(
    initialData?.type === "video" ? initialData.description || "" : "",
  );

  // Project fields
  const [projectDescription, setProjectDescription] = useState(
    initialData?.type === "project" ? initialData.description || "" : "",
  );
  const [projectContent, setProjectContent] = useState(
    initialData?.type === "project" ? initialData.content || "" : "",
  );
  const [projectTechnologies, setProjectTechnologies] = useState(
    initialData?.type === "project"
      ? initialData.technologies?.join(", ") || ""
      : "",
  );
  const [projectLiveUrl, setProjectLiveUrl] = useState(
    initialData?.type === "project" ? initialData.liveUrl || "" : "",
  );
  const [projectRepoUrl, setProjectRepoUrl] = useState(
    initialData?.type === "project" ? initialData.repoUrl || "" : "",
  );
  const [projectStatus, setProjectStatus] = useState<
    "in-progress" | "completed" | "archived"
  >(
    initialData?.type === "project"
      ? initialData.status || "in-progress"
      : "in-progress",
  );

  // Link fields
  const [linkUrl, setLinkUrl] = useState(
    initialData?.type === "link" ? initialData.url || "" : "",
  );
  const [linkDescription, setLinkDescription] = useState(
    initialData?.type === "link" ? initialData.description || "" : "",
  );
  const [linkSiteName, setLinkSiteName] = useState(
    initialData?.type === "link" ? initialData.siteName || "" : "",
  );

  // Announcement fields
  const [announcementContent, setAnnouncementContent] = useState(
    initialData?.type === "announcement" ? initialData.content || "" : "",
  );
  const [announcementPriority, setAnnouncementPriority] = useState<
    "low" | "normal" | "high" | "urgent"
  >(
    initialData?.type === "announcement"
      ? initialData.priority || "normal"
      : "normal",
  );
  const [announcementCtaText, setAnnouncementCtaText] = useState(
    initialData?.type === "announcement" ? initialData.ctaText || "" : "",
  );
  const [announcementCtaUrl, setAnnouncementCtaUrl] = useState(
    initialData?.type === "announcement" ? initialData.ctaUrl || "" : "",
  );

  // Event fields
  const [eventDescription, setEventDescription] = useState(
    initialData?.type === "event" ? initialData.description || "" : "",
  );
  const [eventContent, setEventContent] = useState(
    initialData?.type === "event" ? initialData.content || "" : "",
  );
  const [eventStart, setEventStart] = useState(
    initialData?.type === "event"
      ? typeof initialData.startDate === "string"
        ? initialData.startDate
        : initialData.startDate?.toISOString() || ""
      : "",
  );
  const [eventEnd, setEventEnd] = useState(
    initialData?.type === "event"
      ? typeof initialData.endDate === "string"
        ? initialData.endDate
        : initialData.endDate?.toISOString() || ""
      : "",
  );
  const [eventLocationName, setEventLocationName] = useState(
    initialData?.type === "event" ? initialData.location?.name || "" : "",
  );
  const [eventLocationAddress, setEventLocationAddress] = useState(
    initialData?.type === "event" ? initialData.location?.address || "" : "",
  );
  const [eventRegistrationUrl, setEventRegistrationUrl] = useState(
    initialData?.type === "event" ? initialData.registrationUrl || "" : "",
  );

  // Recommendation fields
  const [recommendationSubject, setRecommendationSubject] = useState(
    initialData?.type === "recommendation"
      ? initialData.subjectTitle || ""
      : "",
  );
  const [recommendationType, setRecommendationType] = useState<
    "serie" | "película" | "libro" | "podcast" | "otro"
  >(
    initialData?.type === "recommendation"
      ? initialData.recommendationType || "serie"
      : "serie",
  );
  const [recommendationDescription, setRecommendationDescription] = useState(
    initialData?.type === "recommendation" ? initialData.description || "" : "",
  );
  const [recommendationRating, setRecommendationRating] = useState(
    initialData?.type === "recommendation"
      ? initialData.rating?.toString() || ""
      : "",
  );
  const [recommendationExternalUrl, setRecommendationExternalUrl] = useState(
    initialData?.type === "recommendation" ? initialData.externalUrl || "" : "",
  );

  // Rating fields
  const [ratingSubject, setRatingSubject] = useState(
    initialData?.type === "rating" ? initialData.subjectTitle || "" : "",
  );
  const [ratingItemType, setRatingItemType] = useState<
    "serie" | "película" | "libro" | "podcast" | "otro"
  >(initialData?.type === "rating" ? initialData.itemType || "serie" : "serie");
  const [ratingValue, setRatingValue] = useState(
    initialData?.type === "rating" ? initialData.rating?.toString() || "" : "",
  );
  const [ratingLiked, setRatingLiked] = useState(
    initialData?.type === "rating" ? initialData.liked || false : false,
  );
  const [ratingComment, setRatingComment] = useState(
    initialData?.type === "rating" ? initialData.comment || "" : "",
  );

  // Ranking fields
  const [rankingDescription, setRankingDescription] = useState(
    initialData?.type === "ranking" ? initialData.description || "" : "",
  );
  const [rankingItems, setRankingItems] = useState<
    Array<{
      rank: number;
      subjectTitle: string;
      itemType: "serie" | "película" | "libro" | "podcast" | "otro";
      rating?: number;
      description?: string;
      externalUrl?: string;
    }>
  >(initialData?.type === "ranking" ? initialData.items || [] : []);

  // All states are now initialized directly with initialData, no useEffect needed

  // Build preview data with useMemo - updates automatically when state changes
  const previewItem: FeedItem = useMemo(() => {
    const basePost: Partial<Post> = {
      id: "preview",
      slug: "preview",
      title: title || "Sin título",
      createdAt: new Date().toISOString(),
      category: category || "",
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      draft,
      author: {
        name: "Preview User",
      },
    };

    let specificPost: Post;

    switch (type) {
      case "article":
        specificPost = {
          ...basePost,
          type: "article",
          excerpt: excerpt || "",
          content: content || "",
          coverImage: coverImageFile
            ? {
                url: URL.createObjectURL(coverImageFile),
                alt: coverImageAlt || "",
              }
            : coverImageUrl
              ? {
                  url: coverImageUrl,
                  alt: coverImageAlt || "",
                }
              : { url: "", alt: "" },
          readTime: readTime || "",
        } as Post;
        break;

      case "photo":
        specificPost = {
          ...basePost,
          type: "photo",
          image: photoImageFile
            ? {
                url: URL.createObjectURL(photoImageFile),
                alt: photoImageAlt || "",
              }
            : photoImageUrl
              ? {
                  url: photoImageUrl,
                  alt: photoImageAlt || "",
                }
              : { url: "", alt: "" },
        } as Post;
        break;

      case "gallery":
        specificPost = {
          ...basePost,
          type: "gallery",
          description: galleryDescription || "",
          images:
            galleryImageFiles.length > 0
              ? galleryImageFiles.map((file, index) => ({
                  url: URL.createObjectURL(file),
                  alt: `Image ${index + 1}`,
                }))
              : galleryImageUrlsCsv
                ? galleryImageUrlsCsv
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean)
                    .map((url, index) => ({
                      url,
                      alt: `Image ${index + 1}`,
                    }))
                : galleryImageUrls.length > 0
                  ? galleryImageUrls
                  : [{ url: "", alt: "" }],
          layout: galleryLayout,
          columns: galleryColumns,
        } as Post;
        break;

      case "thought":
        specificPost = {
          ...basePost,
          type: "thought",
          content: thoughtContent || "",
          source: thoughtSource,
          style: thoughtStyle,
        } as Post;
        break;

      case "music":
        specificPost = {
          ...basePost,
          type: "music",
          audio: {
            url: audioUrl || "",
            title: audioTitle || "",
            artist: audioArtist || "",
            album: audioAlbum,
            genre: audioGenre,
            duration: audioDuration,
            coverUrl: audioCoverFile
              ? URL.createObjectURL(audioCoverFile)
              : audioCoverUrl || "",
          },
          description: musicDescription,
          musicType: musicType,
          spotifyUrl,
          appleMusicUrl,
          youtubeUrl,
        } as Post;
        break;

      case "video":
        specificPost = {
          ...basePost,
          type: "video",
          video: {
            url: videoUrl || "",
            embedUrl: videoEmbed,
            thumbnail: videoThumb || "",
            duration: videoDuration,
            provider: videoProvider,
          },
          description: videoDescription,
        } as Post;
        break;

      case "project":
        specificPost = {
          ...basePost,
          type: "project",
          description: projectDescription || "",
          content: projectContent || "",
          technologies: projectTechnologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          liveUrl: projectLiveUrl,
          repoUrl: projectRepoUrl,
          status: projectStatus,
          coverImage: coverImageFile
            ? {
                url: URL.createObjectURL(coverImageFile),
                alt: title || "",
              }
            : coverImageUrl
              ? {
                  url: coverImageUrl,
                  alt: title || "",
                }
              : undefined,
        } as Post;
        break;

      case "link":
        specificPost = {
          ...basePost,
          type: "link",
          url: linkUrl || "",
          description: linkDescription || "",
          siteName: linkSiteName,
        } as Post;
        break;

      case "announcement":
        specificPost = {
          ...basePost,
          type: "announcement",
          content: announcementContent || "",
          priority: announcementPriority,
          ctaText: announcementCtaText,
          ctaUrl: announcementCtaUrl,
        } as Post;
        break;

      case "event":
        specificPost = {
          ...basePost,
          type: "event",
          description: eventDescription || "",
          content: eventContent || "",
          startDate: eventStart || new Date().toISOString(),
          endDate: eventEnd,
          location: {
            name: eventLocationName || "",
            address: eventLocationAddress,
          },
          registrationUrl: eventRegistrationUrl,
          coverImage: coverImageFile
            ? {
                url: URL.createObjectURL(coverImageFile),
                alt: title || "",
              }
            : coverImageUrl
              ? {
                  url: coverImageUrl,
                  alt: title || "",
                }
              : undefined,
        } as Post;
        break;

      case "recommendation":
        specificPost = {
          ...basePost,
          type: "recommendation",
          subjectTitle: recommendationSubject || "",
          recommendationType: recommendationType,
          description: recommendationDescription || "",
          rating: recommendationRating
            ? parseFloat(recommendationRating)
            : undefined,
          externalUrl: recommendationExternalUrl,
          coverImage: coverImageFile
            ? {
                url: URL.createObjectURL(coverImageFile),
                alt: recommendationSubject || "",
              }
            : coverImageUrl
              ? {
                  url: coverImageUrl,
                  alt: recommendationSubject || "",
                }
              : undefined,
        } as Post;
        break;

      case "rating":
        specificPost = {
          ...basePost,
          type: "rating",
          subjectTitle: ratingSubject || "",
          itemType: ratingItemType,
          rating: ratingValue ? parseFloat(ratingValue) : 0,
          liked: ratingLiked,
          comment: ratingComment,
          coverImage: coverImageFile
            ? {
                url: URL.createObjectURL(coverImageFile),
                alt: ratingSubject || "",
              }
            : coverImageUrl
              ? {
                  url: coverImageUrl,
                  alt: ratingSubject || "",
                }
              : undefined,
        } as Post;
        break;

      case "ranking":
        specificPost = {
          ...basePost,
          type: "ranking",
          description: rankingDescription || "",
          items: rankingItems.length > 0 ? rankingItems : [],
          coverImage: coverImageFile
            ? {
                url: URL.createObjectURL(coverImageFile),
                alt: title || "",
              }
            : coverImageUrl
              ? {
                  url: coverImageUrl,
                  alt: title || "",
                }
              : undefined,
        } as Post;
        break;

      default:
        specificPost = {
          ...basePost,
          type: "article",
          excerpt: "",
          content: "",
          coverImage: { url: "", alt: "" },
          readTime: "",
        } as Post;
    }

    return { post: specificPost };
  }, [
    type,
    title,
    category,
    tags,
    featured,
    draft,
    excerpt,
    content,
    coverImageFile,
    coverImageUrl,
    coverImageAlt,
    readTime,
    photoImageFile,
    photoImageUrl,
    photoImageAlt,
    galleryDescription,
    galleryImageFiles,
    galleryImageUrls,
    galleryImageUrlsCsv,
    galleryLayout,
    galleryColumns,
    thoughtContent,
    thoughtSource,
    thoughtStyle,
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
    videoUrl,
    videoEmbed,
    videoThumb,
    videoDuration,
    videoProvider,
    videoDescription,
    projectDescription,
    projectContent,
    projectTechnologies,
    projectLiveUrl,
    projectRepoUrl,
    projectStatus,
    linkUrl,
    linkDescription,
    linkSiteName,
    announcementContent,
    announcementPriority,
    announcementCtaText,
    announcementCtaUrl,
    eventDescription,
    eventContent,
    eventStart,
    eventEnd,
    eventLocationName,
    eventLocationAddress,
    eventRegistrationUrl,
    recommendationSubject,
    recommendationType,
    recommendationDescription,
    recommendationRating,
    recommendationExternalUrl,
    ratingSubject,
    ratingItemType,
    ratingValue,
    ratingLiked,
    ratingComment,
    rankingDescription,
    rankingItems,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Record<string, unknown> = {
      title,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category,
      featured,
      draft,
    };

    // Add type-specific fields based on interfaces
    switch (type) {
      case "article":
        formData.excerpt = excerpt;
        formData.content = content;
        formData.coverImageFile = coverImageFile;
        formData.coverImageUrl = coverImageUrl;
        formData.coverImageAlt = coverImageAlt;
        formData.readTime = readTime;
        break;

      case "photo":
        formData.photoImageFile = photoImageFile;
        formData.photoImageUrl = photoImageUrl;
        formData.photoImageAlt = photoImageAlt;
        break;

      case "gallery":
        formData.description = galleryDescription;
        formData.galleryImageFiles = galleryImageFiles;
        formData.galleryImageUrlsCsv = galleryImageUrlsCsv;
        formData.layout = galleryLayout;
        formData.columns = galleryColumns;
        break;

      case "thought":
        formData.content = thoughtContent;
        formData.source = thoughtSource;
        formData.style = thoughtStyle;
        break;

      case "music":
        formData.audioUrl = audioUrl;
        formData.audioTitle = audioTitle;
        formData.audioArtist = audioArtist;
        formData.audioAlbum = audioAlbum;
        formData.audioGenre = audioGenre;
        formData.audioDuration = audioDuration;
        formData.audioCoverUrl = audioCoverUrl;
        formData.audioCoverFile = audioCoverFile;
        formData.description = musicDescription;
        formData.musicType = musicType;
        formData.spotifyUrl = spotifyUrl;
        formData.appleMusicUrl = appleMusicUrl;
        formData.youtubeUrl = youtubeUrl;
        break;

      case "video":
        formData.videoUrl = videoUrl;
        formData.videoEmbed = videoEmbed;
        formData.videoThumb = videoThumb;
        formData.videoDuration = videoDuration;
        formData.videoProvider = videoProvider;
        formData.description = videoDescription;
        break;

      case "project":
        formData.description = projectDescription;
        formData.content = projectContent;
        formData.technologies = projectTechnologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        formData.liveUrl = projectLiveUrl;
        formData.repoUrl = projectRepoUrl;
        formData.status = projectStatus;
        formData.coverImageFile = coverImageFile;
        formData.coverImageUrl = coverImageUrl;
        break;

      case "link":
        formData.url = linkUrl;
        formData.description = linkDescription;
        formData.siteName = linkSiteName;
        break;

      case "announcement":
        formData.content = announcementContent;
        formData.priority = announcementPriority;
        formData.ctaText = announcementCtaText;
        formData.ctaUrl = announcementCtaUrl;
        break;

      case "event":
        formData.description = eventDescription;
        formData.content = eventContent;
        formData.startDate = eventStart;
        formData.endDate = eventEnd;
        formData.location = {
          name: eventLocationName,
          address: eventLocationAddress,
        };
        formData.registrationUrl = eventRegistrationUrl;
        formData.coverImageFile = coverImageFile;
        formData.coverImageUrl = coverImageUrl;
        break;

      case "recommendation":
        formData.subjectTitle = recommendationSubject;
        formData.recommendationType = recommendationType;
        formData.description = recommendationDescription;
        formData.rating = recommendationRating
          ? parseFloat(recommendationRating)
          : undefined;
        formData.externalUrl = recommendationExternalUrl;
        formData.coverImageFile = coverImageFile;
        formData.coverImageUrl = coverImageUrl;
        break;

      case "rating":
        formData.subjectTitle = ratingSubject;
        formData.itemType = ratingItemType;
        formData.rating = parseFloat(ratingValue);
        formData.liked = ratingLiked;
        formData.comment = ratingComment;
        formData.coverImageFile = coverImageFile;
        formData.coverImageUrl = coverImageUrl;
        break;

      case "ranking":
        formData.description = rankingDescription;
        formData.items = rankingItems;
        formData.coverImageFile = coverImageFile;
        formData.coverImageUrl = coverImageUrl;
        break;
    }

    onSubmit(formData);
  };

  const renderFormFields = () => {
    switch (type) {
      case "article":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Excerpt *
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={10}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setCoverImageFile}
                  onClear={() => setCoverImageFile(null)}
                />
              ) : (
                <>
                  <input
                    type="url"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-3 border rounded-lg mb-2"
                  />
                  <input
                    type="text"
                    value={coverImageAlt}
                    onChange={(e) => setCoverImageAlt(e.target.value)}
                    placeholder="Alt text"
                    className="w-full p-3 border rounded-lg"
                  />
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </>
        );

      case "photo":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Photo Image *
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setPhotoImageFile}
                  onClear={() => setPhotoImageFile(null)}
                />
              ) : (
                <>
                  <input
                    type="url"
                    value={photoImageUrl}
                    onChange={(e) => setPhotoImageUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full p-3 border rounded-lg mb-2"
                    required
                  />
                  <input
                    type="text"
                    value={photoImageAlt}
                    onChange={(e) => setPhotoImageAlt(e.target.value)}
                    placeholder="Alt text"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </>
              )}
            </div>
          </>
        );

      case "gallery":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={galleryDescription}
                onChange={(e) => setGalleryDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images *</label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setGalleryUseUpload(false)}
                  className={`px-3 py-1 rounded ${!galleryUseUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URLs (CSV)
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryUseUpload(true)}
                  className={`px-3 py-1 rounded ${galleryUseUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {galleryUseUpload ? (
                <MultiImageUpload
                  files={galleryImageFiles}
                  onSelect={setGalleryImageFiles}
                  onRemove={(index) =>
                    setGalleryImageFiles(
                      galleryImageFiles.filter((_, i) => i !== index),
                    )
                  }
                  onClear={() => setGalleryImageFiles([])}
                />
              ) : (
                <textarea
                  value={galleryImageUrlsCsv}
                  onChange={(e) => setGalleryImageUrlsCsv(e.target.value)}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Layout</label>
                <select
                  value={galleryLayout}
                  onChange={(e) =>
                    setGalleryLayout(
                      e.target.value as "grid" | "masonry" | "carousel",
                    )
                  }
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="grid">Grid</option>
                  <option value="masonry">Masonry</option>
                  <option value="carousel">Carousel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Columns
                </label>
                <select
                  value={galleryColumns}
                  onChange={(e) =>
                    setGalleryColumns(parseInt(e.target.value) as 2 | 3 | 4)
                  }
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </>
        );

      case "thought":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                value={thoughtContent}
                onChange={(e) => setThoughtContent(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Source</label>
              <input
                type="text"
                value={thoughtSource}
                onChange={(e) => setThoughtSource(e.target.value)}
                placeholder="Author or source"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <select
                value={thoughtStyle}
                onChange={(e) =>
                  setThoughtStyle(e.target.value as "quote" | "note" | "idea")
                }
                className="w-full p-3 border rounded-lg"
              >
                <option value="note">Note</option>
                <option value="quote">Quote</option>
                <option value="idea">Idea</option>
              </select>
            </div>
          </>
        );

      case "music":
        return (
          <>
            {/* Toggle entre Spotify Import y Manual */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🎵 Modo de Entrada
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMusicMode("spotify")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      musicMode === "spotify"
                        ? "bg-green-600 text-white shadow-lg scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Importar de Spotify
                  </button>
                  <button
                    type="button"
                    onClick={() => setMusicMode("manual")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      musicMode === "manual"
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    Llenar Manualmente
                  </button>
                </div>
              </div>
            </div>

            {/* Vista: Importar de Spotify */}
            {musicMode === "spotify" && (
              <div className="space-y-4 p-6 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <label className="block text-sm font-medium mb-2 text-green-800 dark:text-green-300">
                    🎵 Pega la URL de Spotify (track o album)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={spotifyImportUrl}
                      onChange={(e) => setSpotifyImportUrl(e.target.value)}
                      placeholder="https://open.spotify.com/track/..."
                      className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (!spotifyImportUrl.trim()) {
                          alert("Por favor pega una URL de Spotify");
                          return;
                        }

                        if (!onSpotifyImport) {
                          alert("La función de importar desde Spotify no está disponible");
                          return;
                        }

                        try {
                          setImportingFromSpotify(true);
                          
                          // Usar datos base del formulario
                          const baseData = {
                            title: title || "Imported from Spotify",
                            tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [],
                            category: category || "music",
                          };
                          
                          await onSpotifyImport(spotifyImportUrl, baseData);
                          
                          alert("✅ Post de música creado exitosamente desde Spotify!");
                          setSpotifyImportUrl("");
                        } catch (error) {
                          alert("❌ Error al importar de Spotify: " + (error instanceof Error ? error.message : String(error)));
                        } finally {
                          setImportingFromSpotify(false);
                        }
                      }}
                      disabled={importingFromSpotify || !spotifyImportUrl.trim()}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {importingFromSpotify ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Importando...
                        </>
                      ) : (
                        "Importar"
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-2">
                    ✨ Rellena automáticamente todos los campos desde Spotify (título, artista, álbum, cover, duración, etc.)
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-green-300 dark:border-green-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-green-50 dark:bg-green-900/10 text-gray-500 dark:text-gray-400">
                      Los campos se llenarán automáticamente al importar
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Vista: Manual */}
            {musicMode === "manual" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Audio URL *
                    </label>
                    <input
                      type="url"
                      value={audioUrl}
                      onChange={(e) => setAudioUrl(e.target.value)}
                      placeholder="https://example.com/audio.mp3"
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={audioTitle}
                      onChange={(e) => setAudioTitle(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Artist *
                    </label>
                    <input
                      type="text"
                      value={audioArtist}
                      onChange={(e) => setAudioArtist(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Album</label>
                    <input
                      type="text"
                      value={audioAlbum}
                      onChange={(e) => setAudioAlbum(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Genre</label>
                    <input
                      type="text"
                      value={audioGenre}
                      onChange={(e) => setAudioGenre(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={audioDuration}
                      onChange={(e) => setAudioDuration(e.target.value)}
                      placeholder="3:42"
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Image
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setUseUpload(false)}
                      className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseUpload(true)}
                      className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                      Upload
                    </button>
                  </div>
                  {useUpload ? (
                    <ImageUpload
                      onSelect={setAudioCoverFile}
                      onClear={() => setAudioCoverFile(null)}
                    />
                  ) : (
                    <input
                      type="url"
                      value={audioCoverUrl}
                      onChange={(e) => setAudioCoverUrl(e.target.value)}
                      placeholder="https://example.com/cover.jpg"
                      className="w-full p-3 border rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={musicDescription}
                    onChange={(e) => setMusicDescription(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Spotify URL
                    </label>
                    <input
                      type="url"
                      value={spotifyUrl}
                      onChange={(e) => setSpotifyUrl(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Apple Music URL
                    </label>
                    <input
                      type="url"
                      value={appleMusicUrl}
                      onChange={(e) => setAppleMusicUrl(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Music Type
                  </label>
                  <select
                    value={musicType}
                    onChange={(e) =>
                      setMusicType(e.target.value as "track" | "album")
                    }
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="track">Track</option>
                    <option value="album">Album</option>
                  </select>
                </div>
              </>
            )}
          </>
        );

      case "video":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video URL *
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Provider
                </label>
                <select
                  value={videoProvider}
                  onChange={(e) =>
                    setVideoProvider(
                      e.target.value as "youtube" | "vimeo" | "self",
                    )
                  }
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="self">Self</option>
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Embed URL
              </label>
              <input
                type="url"
                value={videoEmbed}
                onChange={(e) => setVideoEmbed(e.target.value)}
                placeholder="Embed URL for YouTube/Vimeo"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={videoThumb}
                  onChange={(e) => setVideoThumb(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value)}
                  placeholder="10:30"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>
          </>
        );

      case "project":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={projectContent}
                onChange={(e) => setProjectContent(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setCoverImageFile}
                  onClear={() => setCoverImageFile(null)}
                />
              ) : (
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full p-3 border rounded-lg"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={projectTechnologies}
                onChange={(e) => setProjectTechnologies(e.target.value)}
                placeholder="React, TypeScript, Node.js"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  value={projectLiveUrl}
                  onChange={(e) => setProjectLiveUrl(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Repository URL
                </label>
                <input
                  type="url"
                  value={projectRepoUrl}
                  onChange={(e) => setProjectRepoUrl(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={projectStatus}
                onChange={(e) =>
                  setProjectStatus(
                    e.target.value as "in-progress" | "completed" | "archived",
                  )
                }
                className="w-full p-3 border rounded-lg"
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </>
        );

      case "link":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">URL *</label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={linkDescription}
                onChange={(e) => setLinkDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={linkSiteName}
                onChange={(e) => setLinkSiteName(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </>
        );

      case "announcement":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Content *
              </label>
              <textarea
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={announcementPriority}
                onChange={(e) =>
                  setAnnouncementPriority(
                    e.target.value as "low" | "normal" | "high" | "urgent",
                  )
                }
                className="w-full p-3 border rounded-lg"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={announcementCtaText}
                  onChange={(e) => setAnnouncementCtaText(e.target.value)}
                  placeholder="Learn More"
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  CTA URL
                </label>
                <input
                  type="url"
                  value={announcementCtaUrl}
                  onChange={(e) => setAnnouncementCtaUrl(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </>
        );

      case "event":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={eventContent}
                onChange={(e) => setEventContent(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setCoverImageFile}
                  onClear={() => setCoverImageFile(null)}
                />
              ) : (
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full p-3 border rounded-lg"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={eventEnd}
                  onChange={(e) => setEventEnd(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location Name
                </label>
                <input
                  type="text"
                  value={eventLocationName}
                  onChange={(e) => setEventLocationName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location Address
                </label>
                <input
                  type="text"
                  value={eventLocationAddress}
                  onChange={(e) => setEventLocationAddress(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Registration URL
              </label>
              <input
                type="url"
                value={eventRegistrationUrl}
                onChange={(e) => setEventRegistrationUrl(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </>
        );

      case "recommendation":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject Title *
              </label>
              <input
                type="text"
                value={recommendationSubject}
                onChange={(e) => setRecommendationSubject(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
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
                className="w-full p-3 border rounded-lg"
              >
                <option value="serie">Serie</option>
                <option value="película">Película</option>
                <option value="libro">Libro</option>
                <option value="podcast">Podcast</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={recommendationDescription}
                onChange={(e) => setRecommendationDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating (0-10)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={recommendationRating}
                  onChange={(e) => setRecommendationRating(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  External URL
                </label>
                <input
                  type="url"
                  value={recommendationExternalUrl}
                  onChange={(e) => setRecommendationExternalUrl(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setCoverImageFile}
                  onClear={() => setCoverImageFile(null)}
                />
              ) : (
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full p-3 border rounded-lg"
                />
              )}
            </div>
          </>
        );

      case "rating":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject Title *
              </label>
              <input
                type="text"
                value={ratingSubject}
                onChange={(e) => setRatingSubject(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Item Type
              </label>
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
                className="w-full p-3 border rounded-lg"
              >
                <option value="serie">Serie</option>
                <option value="película">Película</option>
                <option value="libro">Libro</option>
                <option value="podcast">Podcast</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating (0-10) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={ratingValue}
                  onChange={(e) => setRatingValue(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ratingLiked}
                    onChange={(e) => setRatingLiked(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">Liked</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setCoverImageFile}
                  onClear={() => setCoverImageFile(null)}
                />
              ) : (
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full p-3 border rounded-lg"
                />
              )}
            </div>
          </>
        );

      case "ranking":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={rankingDescription}
                onChange={(e) => setRankingDescription(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Ranking Items *
              </label>
              <div className="space-y-4">
                {rankingItems.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">#{item.rank}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setRankingItems(
                            rankingItems.filter((_, i) => i !== index),
                          )
                        }
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.subjectTitle}
                      onChange={(e) => {
                        const updated = [...rankingItems];
                        updated[index].subjectTitle = e.target.value;
                        setRankingItems(updated);
                      }}
                      placeholder="Title"
                      className="w-full p-2 border rounded"
                    />
                    <select
                      value={item.itemType}
                      onChange={(e) => {
                        const updated = [...rankingItems];
                        updated[index].itemType = e.target.value as
                          | "serie"
                          | "película"
                          | "libro"
                          | "podcast"
                          | "otro";
                        setRankingItems(updated);
                      }}
                      className="w-full p-2 border rounded"
                    >
                      <option value="serie">Serie</option>
                      <option value="película">Película</option>
                      <option value="libro">Libro</option>
                      <option value="podcast">Podcast</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setRankingItems([
                      ...rankingItems,
                      {
                        rank: rankingItems.length + 1,
                        subjectTitle: "",
                        itemType: "serie",
                      },
                    ])
                  }
                  className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-gray-50"
                >
                  + Add Item
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUseUpload(false)}
                  className={`px-3 py-1 rounded ${!useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUseUpload(true)}
                  className={`px-3 py-1 rounded ${useUpload ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Upload
                </button>
              </div>
              {useUpload ? (
                <ImageUpload
                  onSelect={setCoverImageFile}
                  onClear={() => setCoverImageFile(null)}
                />
              ) : (
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full p-3 border rounded-lg"
                />
              )}
            </div>
          </>
        );

      default:
        return <p className="text-gray-500">Select a post type to begin</p>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Base Fields */}
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="react, typescript, tutorial"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Featured</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={draft}
                onChange={(e) => setDraft(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Draft</span>
            </label>
          </div>

          {/* Type-specific fields */}
          {renderFormFields()}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-4 lg:h-fit">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="border rounded-lg p-4 bg-gray-50">
          <FeedRenderer item={previewItem} hideActions={true} />
        </div>
      </div>
    </div>
  );
}
