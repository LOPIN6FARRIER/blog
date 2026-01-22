import { useEffect } from "react";

interface StructuredDataProps {
  type:
    | "Person"
    | "Article"
    | "WebSite"
    | "BlogPosting"
    | "SoftwareApplication";
  data: {
    // Person
    name?: string;
    url?: string;
    image?: string;
    jobTitle?: string;
    description?: string;
    sameAs?: string[];

    // Article/BlogPosting
    headline?: string;
    datePublished?: string;
    dateModified?: string;
    author?: {
      "@type": string;
      name: string;
      url?: string;
    };
    publisher?: {
      "@type": string;
      name: string;
      logo?: {
        "@type": string;
        url: string;
      };
    };

    // WebSite
    potentialAction?: {
      "@type": string;
      target: string;
      "query-input": string;
    };

    // Additional fields
    keywords?: string;
    articleSection?: string;
    articleBody?: string;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data if any
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data based on type
    let structuredData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": type,
    };

    if (type === "Person") {
      structuredData = {
        ...structuredData,
        name: data.name || "Vinicio Esparza",
        url: data.url || "https://vinicioesparza.dev",
        image: data.image || "https://vinicioesparza.dev/icono.png",
        jobTitle: data.jobTitle || "Full Stack Developer",
        description:
          data.description ||
          "Desarrollador Full Stack especializado en React, TypeScript y Node.js",
        sameAs: data.sameAs || [
          "https://github.com/vinicioesparza",
          "https://linkedin.com/in/vinicioesparza",
        ],
      };
    } else if (type === "Article" || type === "BlogPosting") {
      structuredData = {
        ...structuredData,
        headline: data.headline,
        image: data.image || "https://vinicioesparza.dev/icono.png",
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        author: data.author || {
          "@type": "Person",
          name: "Vinicio Esparza",
          url: "https://vinicioesparza.dev",
        },
        publisher: data.publisher || {
          "@type": "Organization",
          name: "Vinicio Esparza",
          logo: {
            "@type": "ImageObject",
            url: "https://vinicioesparza.dev/icono.png",
          },
        },
        description: data.description,
        keywords: data.keywords,
        articleSection: data.articleSection,
        articleBody: data.articleBody,
      };
    } else if (type === "WebSite") {
      structuredData = {
        ...structuredData,
        name: data.name || "Vinicio Esparza",
        url: data.url || "https://vinicioesparza.dev",
        description: data.description || "Blog personal de Vinicio Esparza",
        potentialAction: data.potentialAction || {
          "@type": "SearchAction",
          target: "https://vinicioesparza.dev/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      };
    }

    // Create and append script tag
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null; // This component doesn't render anything
}
