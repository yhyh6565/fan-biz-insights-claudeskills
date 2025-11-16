import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleContentProps {
  content: string;
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  // Remove duplicate captions that appear after images in markdown
  const cleanContent = content.replace(
    /!\[([^\]]+)\]\([^)]+\)\n+\1(?=\n|$)/g,
    (match, caption) => match.replace(`\n${caption}`, '')
  );

  return (
    <div className="article-content prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <figure className="my-8">
              <img
                src={src}
                alt={alt || ""}
                className="w-full max-w-xl mx-auto rounded-lg"
              />
              {alt && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
};
