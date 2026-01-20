import type { QuotedCardProps } from "../../types/Cards/cards";

export default function QuoteCard({ quote, author }: QuotedCardProps) {
  return (
    <div className="col-span-1 rounded-xl bg-primary/10 dark:bg-primary/20 p-4 flex flex-col justify-between border border-primary/20 min-h-45">
      <span className="material-symbols-outlined text-primary text-xl">
        format_quote
      </span>
      <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight mt-2 break-words">
        {quote}
      </p>
      <p className="text-primary text-[10px] font-bold uppercase mt-4 tracking-widest truncate">
        — {author}
      </p>
    </div>
  );
}
