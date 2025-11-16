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

        {/* Article List - CYBER-POP STYLE */}
        <section
          id="article-list"
          className="container mx-auto px-4 md:px-6 py-12 md:py-16 animate-fade-in animate-delay-300"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header - BOLD BRUTALIST */}
            <div className="mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b-4 border-foreground">
                <div>
                  <p className="text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground mb-3">
                    // ALL_ARTICLES
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-none uppercase">
                    {selectedKeyword ? (
                      <>
                        <span className="neon-glow">{selectedKeyword}</span>
                      </>
                    ) : (
                      "모든 글"
                    )}
                  </h2>
                </div>
                <div className="text-sm font-mono font-bold bg-foreground text-background px-4 py-2">
                  {filteredArticles.length} POSTS
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

      {/* CYBER-POP FOOTER */}
      <footer className="bg-foreground text-background border-t-4 border-primary py-12 mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase">
                  덕질로 배운 비즈니스
                </h3>
                <p className="text-lg text-background/80 font-medium">
                  팬덤과 비즈니스의 교차점에서 발견한 인사이트
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end justify-center">
                <div className="text-xs font-mono font-bold mb-2">
                  © 2025 FAN_BIZ_INSIGHTS
                </div>
                <div className="text-xs font-mono bg-primary text-primary-foreground px-3 py-1.5">
                  DESIGNED_WITH_CLAUDE_CODE
                </div>
              </div>
            </div>
            <div className="pt-6 border-t-2 border-primary/30">
              <div className="flex gap-4 flex-wrap">
                <span className="text-xs font-mono font-bold px-3 py-1 border-2 border-primary bg-primary/20">
                  NEO_BRUTALISM
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 border-2 border-primary bg-primary/20">
                  CYBER_POP
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 border-2 border-primary bg-primary/20">
                  MAX_SATURATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
