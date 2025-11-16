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

        {/* Article List - Magazine Editorial Style */}
        <section
          id="article-list"
          className="container mx-auto px-6 md:px-8 lg:px-12 py-24 animate-fade-in animate-delay-300"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header - Editorial Style */}
            <div className="mb-20">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-border/30">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-4">
                    Latest Articles
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
                    {selectedKeyword ? (
                      <>
                        <span className="gradient-text-kpop">{selectedKeyword}</span>
                        <br />
                        <span className="text-foreground/60">관련 글</span>
                      </>
                    ) : (
                      "모든 글"
                    )}
                  </h2>
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-12">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[400px] w-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-16">
                {filteredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 80}ms` }}
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

      {/* Magazine-style footer */}
      <footer className="border-t border-border/20 py-20 mt-32">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
                  덕질로 배운 비즈니스
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  팬덤과 비즈니스의 교차점에서 발견한 인사이트
                </p>
              </div>
              <div className="flex items-center justify-start md:justify-end">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium">Editorial Magazine</p>
                  <p>© 2025 Fan Biz Insights</p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-border/20">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 text-center">
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
