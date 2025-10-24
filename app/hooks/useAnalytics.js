"use client";

import { useCallback } from 'react';

// Custom hook for Google Analytics
export const useAnalytics = () => {
  const trackEvent = useCallback((action, category, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  const trackPageView = useCallback((url) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  }, []);

  const trackContactForm = useCallback((formType) => {
    trackEvent('contact_form_submit', 'engagement', formType);
  }, [trackEvent]);

  const trackProjectView = useCallback((projectName) => {
    trackEvent('project_view', 'engagement', projectName);
  }, [trackEvent]);

  const trackBlogView = useCallback((blogTitle) => {
    trackEvent('blog_view', 'engagement', blogTitle);
  }, [trackEvent]);

  const trackDownload = useCallback((fileName) => {
    trackEvent('file_download', 'engagement', fileName);
  }, [trackEvent]);

  const trackSocialClick = useCallback((platform) => {
    trackEvent('social_click', 'engagement', platform);
  }, [trackEvent]);

  const trackSkillClick = useCallback((skillName) => {
    trackEvent('skill_click', 'engagement', skillName);
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackContactForm,
    trackProjectView,
    trackBlogView,
    trackDownload,
    trackSocialClick,
    trackSkillClick,
  };
};
