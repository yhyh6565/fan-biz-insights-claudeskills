import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'analytics_session';
const VISITOR_KEY = 'analytics_visitor';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

interface SessionData {
  id: string;
  startTime: number;
  lastActivity: number;
}

const getOrCreateSession = (): { sessionId: string; isNewVisitor: boolean } => {
  const now = Date.now();
  const sessionStr = localStorage.getItem(SESSION_KEY);
  const isNewVisitor = !localStorage.getItem(VISITOR_KEY);

  if (sessionStr) {
    const session: SessionData = JSON.parse(sessionStr);
    if (now - session.lastActivity < SESSION_DURATION) {
      // Update last activity
      session.lastActivity = now;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { sessionId: session.id, isNewVisitor: false };
    }
  }

  // Create new session
  const newSession: SessionData = {
    id: crypto.randomUUID(),
    startTime: now,
    lastActivity: now,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  
  if (isNewVisitor) {
    localStorage.setItem(VISITOR_KEY, 'true');
  }

  return { sessionId: newSession.id, isNewVisitor };
};

export const useAnalytics = () => {
  const location = useLocation();
  const entryTimeRef = useRef<number>(Date.now());
  const trackedRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset on route change
    entryTimeRef.current = Date.now();
    trackedRef.current = false;

    const trackPageView = async () => {
      if (trackedRef.current) return;
      trackedRef.current = true;

      try {
        const { sessionId, isNewVisitor } = getOrCreateSession();
        const path = location.pathname;
        const referrer = document.referrer;
        
        // Extract article ID if on article page
        const articleMatch = path.match(/\/article\/([a-f0-9-]+)/);
        const articleId = articleMatch ? articleMatch[1] : undefined;

        await supabase.functions.invoke('track-analytics', {
          body: {
            sessionId,
            path,
            referrer,
            articleId,
            isNewVisitor,
          },
        });

        console.log('Page view tracked:', { path, articleId, isNewVisitor });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Track after a short delay to ensure page is loaded
    const timer = setTimeout(trackPageView, 1000);

    // Track time spent on page when leaving
    const handleBeforeUnload = async () => {
      const timeSpent = Math.round((Date.now() - entryTimeRef.current) / 1000);
      
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        const { sessionId } = getOrCreateSession();
        const path = location.pathname;
        const referrer = document.referrer;
        const articleMatch = path.match(/\/article\/([a-f0-9-]+)/);
        const articleId = articleMatch ? articleMatch[1] : undefined;

        // Use sendBeacon for reliable tracking on page unload
        navigator.sendBeacon(
          `https://limvajcxxkgleztxrqpx.supabase.co/functions/v1/track-analytics`,
          JSON.stringify({
            sessionId,
            path,
            referrer,
            articleId,
            timeSpent,
            isNewVisitor: false,
          })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);
};
