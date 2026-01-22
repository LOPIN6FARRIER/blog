interface SectionProps {
  title?: string;
  children: React.ReactNode;
  py?: string;
  px?: string;
  className?: string;
}

export default function Section({
  title,
  children,
  py = "py-6",
  px = "px-0",
  className = "",
}: SectionProps) {
  return (
    <section className={`${py} ${px} ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
