import { useState } from "react";
import Navigation from "@/components/Navigation";
import FeaturedSection from "@/components/FeaturedSection";
import KeywordSection from "@/components/KeywordSection";
import ArticleListCard from "@/components/ArticleListCard";
import { useArticles } from "@/hooks/useArticles";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Skeleton } from "@/components/ui/skeleton";

const BUSINESS_KEYWORDS = [
  "안정성",
  "독점성",
  "애정의 실체화",
  "큰 그림",
  "세계관",
  "원팀(One Team)",
  "공간경험",
  "인재 유입",
  "탈덕의 순간",
  "몰입 설계",
  "하나의 메세지",
  "수익구조",
];

const Home = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const { data: articles = [], isLoading } = useArticles(undefined, selectedKeyword || undefined);
  useScrollToTop();

  // Featured articles - 최신순 4개
  const topArticles = [...articles]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 4);
  
  // Filtered articles - 좋아요순
  const filteredArticles = [...articles].sort((a, b) => b.likes - a.likes);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pb-16">
        {/* Featured Section */}
        {isLoading ? (
          <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16 animate-fade-in">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        ) : (
          <div className="animate-fade-in animate-delay-100">
            <FeaturedSection articles={topArticles} />
          </div>
        )}

        {/* Keyword Section */}
        <div className="animate-fade-in animate-delay-200">
          <KeywordSection
            keywords={BUSINESS_KEYWORDS}
            selectedKeyword={selectedKeyword}
            onKeywordSelect={setSelectedKeyword}
          />
        </div>

        {/* Article List - Clean Magazine Style */}
        <section
          id="article-list"
          className="container mx-auto px-4 md:px-6 py-16 md:py-20 animate-fade-in animate-delay-300"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header - Clean and minimal */}
            <div className="mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-border/40">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                    Latest Articles
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    {selectedKeyword ? (
                      <>
                        <span className="gradient-text-kpop">{selectedKeyword}</span> 관련 글
                      </>
                    ) : (
                      "모든 글"
                    )}
                  </h2>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {filteredArticles.length}개의 글
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-8">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[300px] w-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {filteredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <ArticleListCard
                      id={article.id}
                      title={article.title}
                      summary={article.summary}
                      category={article.category}
                      date={new Date(article.published_at).toLocaleDateString('ko-KR')}
                      views={article.views}
                      likes={article.likes}
                      keywords={article.keywords}
                      thumbnail={article.thumbnail || "/placeholder.svg"}
                      author={{
                        name: article.author_name,
                        avatar: article.author_avatar,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Clean footer */}
      <footer className="border-t border-border/40 py-16 mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  덕질로 배운 비즈니스
                </h3>
                <p className="text-base text-muted-foreground">
                  팬덤과 비즈니스의 교차점에서 발견한 인사이트
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                © 2025 Fan Biz Insights
              </div>
            </div>
            <div className="pt-6 border-t border-border/30">
              <p className="text-xs text-muted-foreground/60 text-center">
                Designed with Claude Code
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
