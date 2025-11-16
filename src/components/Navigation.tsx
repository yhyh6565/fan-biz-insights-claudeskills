import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ExpandedMenu from "./ExpandedMenu";

/**
 * Navigation items configuration
 */
const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "K-POP", path: "/kpop" },
  { name: "MCU", path: "/mcu" },
];

/**
 * Main Navigation Component
 *
 * Features:
 * - Glass morphism sticky header
 * - Expandable menu with dropdown
 * - Double-click admin login easter egg
 * - Responsive design with proper ARIA labels
 *
 * @component
 */
const Navigation = () => {
  const navigate = useNavigate();
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTitleClick = (e: React.MouseEvent) => {
    if (e.detail === 1) {
      // Single click - navigate home
      const timer = setTimeout(() => {
        navigate('/');
        setIsExpanded(false);
      }, 300);
      setClickTimer(timer);
    } else if (e.detail === 2) {
      // Double click - admin login
      if (clickTimer) {
        clearTimeout(clickTimer);
        setClickTimer(null);
      }
      navigate('/admin/login');
    }
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const closeMenu = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass border-b border-border/50 animate-slide-up">
        <nav className="container mx-auto px-4 py-6" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-center max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleTitleClick}
                className="text-xl md:text-2xl font-display font-bold tracking-tight hover:opacity-70 transition-smooth cursor-pointer"
                aria-label="Home - 덕질로 배운 비즈니스"
              >
                덕질로 배운 비즈니스
              </button>

              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-accent rounded-md transition-smooth group"
                aria-label={isExpanded ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isExpanded}
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:text-foreground",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <ExpandedMenu
        isOpen={isExpanded}
        onClose={closeMenu}
        navItems={NAV_ITEMS}
      />
    </>
  );
};

export default Navigation;
