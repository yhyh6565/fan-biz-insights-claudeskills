import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { X, Mail, Linkedin } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface ExpandedMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const ExpandedMenu = ({ isOpen, onClose, navItems }: ExpandedMenuProps) => {
  const location = useLocation();

  const handleNavLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black animate-fade-in">
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="메뉴 닫기"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Left Section - Intro (2 columns on desktop) */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white leading-relaxed">
                덕질의 시작부터 팬덤의 확산까지,<br />
                사랑받는 아이디어와 콘텐츠의 비즈니스 패턴을 찾아서
              </h1>
              
              <p className="text-lg md:text-xl text-white/70">
                진짜 연대를 이끌어 낼 방법을 탐구합니다
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <a 
                href="mailto:yeonheedo1127@gmail.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">yeonheedo1127@gmail.com</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/yeonhee-do-7283801a5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">@YeonheeDo</span>
              </a>
            </div>
          </div>

          {/* Right Section - Categories (1 column) */}
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
              Categories
            </h2>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavLinkClick}
                  className={cn(
                    "text-2xl font-medium transition-all hover:translate-x-2",
                    location.pathname === item.path
                      ? "text-white font-bold"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedMenu;
