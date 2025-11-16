import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Article } from "@/hooks/useArticles";

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t">
      <h2 className="text-2xl font-display font-bold mb-8">추천 글</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link to={`/article/${article.id}`} key={article.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              {article.thumbnail && (
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                />
              )}
              <CardContent className="p-4">
                <Badge
                  variant="secondary"
                  className={cn(
                    "mb-2 text-xs",
                    article.category === "K-POP"
                      ? "bg-kpop-100 text-kpop-700"
                      : "bg-mcu-100 text-mcu-700"
                  )}
                >
                  {article.category}
                </Badge>
                <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
