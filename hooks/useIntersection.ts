import { useEffect } from "react";

const listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    });
  }
  return observer;
}

function handleIntersections(entries: any) {
  entries.forEach((entry: any) => {
    if (listenerCallbacks.has(entry.target)) {
      const cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

export function useIntersection(ref: any, callback: any) {
  useEffect(() => {
    const target = ref.current;
    let observer = getIntersectionObserver();

    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, [ref, callback]);
}
