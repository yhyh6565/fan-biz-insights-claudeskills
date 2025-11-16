import Navigation from "@/components/Navigation";
import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/useArticles";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const McuPage = () => {
  const { data: articles = [], isLoading } = useArticles("MCU");
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <div className="border-b bg-mcu-50/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-mcu-700 mb-4">MCU</h1>
              <p className="text-lg text-muted-foreground">
                마블 시네마틱 유니버스의 비즈니스 전략을 탐구합니다
              </p>
            </div>
          </div>
        </div>
        
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">전체 {articles.length}개의 글</h2>
            </div>
            {isLoading ? (
              <div className="flex flex-col gap-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    summary={article.summary}
                    category={article.category}
                    date={new Date(article.published_at).toLocaleDateString('ko-KR')}
                    views={article.views}
                    likes={article.likes}
                    keywords={article.keywords}
                    thumbnail={article.thumbnail || undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
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

export default McuPage;
