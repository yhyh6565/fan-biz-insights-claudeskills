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

        {/* Article List */}
        <section
          id="article-list"
          className="container mx-auto px-6 md:px-8 lg:px-12 py-16 animate-fade-in animate-delay-300"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">
                {selectedKeyword ? (
                  <>
                    "<span className="gradient-text-kpop">{selectedKeyword}</span>" 관련 글
                  </>
                ) : (
                  "모든 글"
                )}
              </h2>
              <span className="text-sm text-muted-foreground font-medium">
                총 {filteredArticles.length}개의 글
              </span>
            </div>
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filteredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
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

      <footer className="border-t border-border/50 py-16 mt-24 bg-accent/30">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xl font-display font-bold mb-3 tracking-tight">
              덕질로 배운 비즈니스
            </p>
            <p className="text-muted-foreground">
              팬덤과 비즈니스의 교차점에서 발견한 인사이트
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
