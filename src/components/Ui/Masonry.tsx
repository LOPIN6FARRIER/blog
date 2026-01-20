import type { MasonryProps } from "../../types/Cards/cards";

export default function Masonry({
  children,
  maxWidth = "max-w-screen-lg",
  padding = "p-4",
  cols = 3,
  gap = 4,
}: MasonryProps) {
  return (
    <main className={`${maxWidth} mx-auto ${padding}`}>
      <div className={`grid grid-cols-${cols} gap-${gap}`}>{children}</div>
    </main>
  );
}
