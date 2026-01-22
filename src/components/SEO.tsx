import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title = "Vinicio Esparza - Blog Personal",
  description = "Blog personal de Vinicio Esparza. Desarrollador Full Stack especializado en React, TypeScript, Node.js y tecnologías modernas.",
  keywords = "Vinicio Esparza, desarrollador, full stack, react, typescript, node.js, blog, programación",
  image = "/icono.png",
  url = window.location.href,
  type = "website",
  author = "Vinicio Esparza",
  publishedTime,
  modifiedTime,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: boolean,
    ) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag(
      "og:image",
      image.startsWith("http") ? image : `${window.location.origin}${image}`,
      true,
    );
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "Vinicio Esparza Blog", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag(
      "twitter:image",
      image.startsWith("http") ? image : `${window.location.origin}${image}`,
    );
    updateMetaTag("twitter:creator", "@Vinicio_Esparza");

    // Article specific tags
    if (type === "article") {
      if (publishedTime) {
        updateMetaTag("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag("article:modified_time", modifiedTime, true);
      }
      updateMetaTag("article:author", author, true);
    }

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
  ]);

  return null;
}
