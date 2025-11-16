import { cn } from "@/lib/utils";

interface KeywordSectionProps {
  keywords: string[];
  selectedKeyword: string | null;
  onKeywordSelect: (keyword: string | null) => void;
}

const KeywordSection = ({ keywords, selectedKeyword, onKeywordSelect }: KeywordSectionProps) => {
  const handleClick = (keyword: string) => {
    const newKeyword = selectedKeyword === keyword ? null : keyword;
    onKeywordSelect(newKeyword);
    
    // Smooth scroll to article list
    if (newKeyword) {
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('article-list')?.offsetTop! - 100,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <section className="py-16 bg-muted/30 border-y">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center font-display">
            덕질로 배운 비즈니스 인사이트
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            팬덤과 콘텐츠 비즈니스에서 발견한 핵심 키워드
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {keywords.map((keyword, index) => (
              <button
                key={keyword}
                onClick={() => handleClick(keyword)}
                className={cn(
                  "px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 animate-fade-in",
                  selectedKeyword === keyword
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "bg-background hover:bg-muted border-border hover:border-primary/50 hover:shadow-md"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {keyword}
              </button>
            ))}
          </div>
          
          {selectedKeyword && (
            <div className="text-center mt-6 animate-fade-in">
              <button
                onClick={() => onKeywordSelect(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                전체 보기
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KeywordSection;
