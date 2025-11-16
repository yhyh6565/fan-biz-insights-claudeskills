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
      <header className="sticky top-0 z-50 w-full glass border-b border-border/20 animate-slide-up">
        <nav className="container mx-auto px-6 md:px-8 lg:px-12 py-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo / Title */}
            <button
              onClick={handleTitleClick}
              className="text-2xl md:text-3xl font-display font-bold tracking-tight hover:opacity-70 transition-all duration-300 cursor-pointer"
              aria-label="Home - 덕질로 배운 비즈니스"
            >
              덕질로 배운 비즈니스
            </button>

            {/* Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:opacity-70 transition-smooth group"
              aria-label={isExpanded ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isExpanded}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                Menu
              </span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 text-muted-foreground transition-all duration-300 group-hover:text-foreground",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
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
