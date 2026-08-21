import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If reduced motion is active, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  return { ref, isVisible: prefersReducedMotion || isVisible };
}
