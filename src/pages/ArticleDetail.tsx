import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";
import { toast } from "@/components/ui/use-toast";
import { useArticle, useRelatedArticles } from "@/hooks/useArticles";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { RelatedArticles } from "@/components/article/RelatedArticles";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading } = useArticle(id!);
  const { data: relatedArticles = [] } = useRelatedArticles(
    id!,
    article?.category || "K-POP",
    3
  );
  const [localLikes, setLocalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useScrollToTop([id]);

  useEffect(() => {
    if (article) {
      setLocalLikes(article.likes);
    }
  }, [article]);

  const handleLike = () => {
    if (isLiked) {
      setLocalLikes(localLikes - 1);
      setIsLiked(false);
      toast({
        title: "좋아요 취소",
      });
    } else {
      setLocalLikes(localLikes + 1);
      setIsLiked(true);
      toast({
        title: "좋아요!",
        description: "이 글을 좋아합니다.",
      });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: url,
      }).then(() => {
        toast({ title: "공유 완료" });
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "링크가 클립보드에 복사되었습니다" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16 max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 md:px-12 lg:px-32 py-12">
        <article className="max-w-6xl mx-auto">
          <ArticleHeader
            article={article}
            localLikes={localLikes}
            isLiked={isLiked}
            onLike={handleLike}
            onShare={handleShare}
          />

          <Separator className="mb-12" />

          <ArticleContent content={article.content} />

          <RelatedArticles articles={relatedArticles} />
        </article>
      </main>

      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p className="mb-2 font-medium">덕질로 배운 비즈니스</p>
            <p>팬덤과 비즈니스의 교차점에서 발견한 인사이트</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;
