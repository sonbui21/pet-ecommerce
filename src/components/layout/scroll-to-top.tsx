"use client";

import { useEffect, useRef, useCallback } from "react";

export const ScrollToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const stickyHeaderRef = useRef<HTMLElement | null>(null);
  const scrollToTargetRef = useRef<Element | null>(null);
  const headerFixedHeightRef = useRef<HTMLElement | null>(null);

  const SCROLL_THRESHOLD = 245;

  const throttle = useCallback((func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return () => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func();
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func();
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!stickyHeaderRef.current) {
      stickyHeaderRef.current = document.getElementById("sticky-header");
    }
    if (!scrollToTargetRef.current) {
      scrollToTargetRef.current = document.querySelector(".scroll-to-target");
    }
    if (!headerFixedHeightRef.current) {
      headerFixedHeightRef.current = document.getElementById("header-fixed-height");
    }

    const scroll = window.scrollY || window.pageYOffset;

    if (scroll < SCROLL_THRESHOLD) {
      stickyHeaderRef.current?.classList.remove("sticky-menu");
      scrollToTargetRef.current?.classList.remove("open");
      headerFixedHeightRef.current?.classList.remove("active-height");
    } else {
      stickyHeaderRef.current?.classList.add("sticky-menu");
      scrollToTargetRef.current?.classList.add("open");
      headerFixedHeightRef.current?.classList.add("active-height");
    }
  }, []);

  const handleClick = useCallback((e: Event) => {
    e.preventDefault();
    const target = (e.currentTarget as HTMLElement).getAttribute("data-target");

    if (target) {
      const targetElement = document.querySelector(target);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else if (target === "html") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const throttledHandleScroll = throttle(handleScroll, 100);

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    const button = buttonRef.current;
    if (button) {
      button.addEventListener("click", handleClick);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, [handleScroll, handleClick, throttle]);

  return (
    <button ref={buttonRef} className='scroll__top scroll-to-target' data-target='html' aria-label='Scroll to top'>
      <i className='fas fa-angle-up'></i>
    </button>
  );
};
