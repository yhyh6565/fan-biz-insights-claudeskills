import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleListItemProps {
  id: string;
  title: string;
  category: "K-POP" | "MCU";
  views: number;
  image: string;
}

const ArticleListItem = ({ id, title, category, views, image }: ArticleListItemProps) => {
  return (
    <Link to={`/article/${id}`}>
      <div className="flex gap-4 p-4 bg-card rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer border">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-24 h-24 object-cover rounded-md group-hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <Badge
              variant="secondary"
              className={cn(
                "mb-2 text-xs font-medium",
                category === "K-POP"
                  ? "bg-kpop-100 text-kpop-700 hover:bg-kpop-200"
                  : "bg-mcu-100 text-mcu-700 hover:bg-mcu-200"
              )}
            >
              {category}
            </Badge>
            <h4 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h4>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Eye className="h-3 w-3" />
            {views.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleListItem;
