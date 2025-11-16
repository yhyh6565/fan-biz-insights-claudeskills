import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
 * NEO-BRUTALIST CYBER-POP NAVIGATION
 *
 * Features:
 * - BOLD black bar with cyber pink accents
 * - Sharp edges (zero border radius)
 * - Glitch effect on logo
 * - Dramatic hover states
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
      <header className="sticky top-0 z-50 w-full bg-foreground border-b-4 border-primary">
        <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo with GLITCH effect */}
            <button
              onClick={handleTitleClick}
              className="relative text-2xl md:text-3xl font-display font-bold tracking-tight text-background hover:text-primary transition-colors duration-200 cursor-pointer uppercase"
              aria-label="Home - 덕질로 배운 비즈니스"
              data-text="덕질로 배운 비즈니스"
            >
              <span className="relative z-10">덕질로 배운 비즈니스</span>
            </button>

            {/* Menu Toggle - BOLD ICON */}
            <button
              onClick={toggleMenu}
              className="p-3 bg-primary text-primary-foreground hover:bg-background hover:text-primary border-2 border-primary transition-all duration-200 hover-pop"
              aria-label={isExpanded ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <X className="h-6 w-6 font-bold" strokeWidth={3} />
              ) : (
                <Menu className="h-6 w-6 font-bold" strokeWidth={3} />
              )}
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
