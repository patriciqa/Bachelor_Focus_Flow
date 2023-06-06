//@ts-nocheck
import { useEffect, useRef } from "react";
import Tag from "./Tag";

const HorizontalCarousel = ({
  entries,
  setVisibleComponentId,
}: {
  entries: any;
  setVisibleComponentId: (d: number) => void;
}) => {
  const carouselRef = useRef(null);
  const options = {
    threshold: 0.4,
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleComponentId(entry.target.id);
        }
      });
    }, options);

    const components = carouselRef.current.children;

    Array.from(components).forEach((component) => {
      observer.observe(component);
    });

    return () => {
      Array.from(components).forEach((component) => {
        observer.unobserve(component);
      });
    };
  });
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden horizontal-carousel snap-x snap-mandatory ">
      <div ref={carouselRef} className="flex carousel-container">
        <div className="flex invisible bg-transparent ">placeholder</div>

        {entries?.map((entry: any) => (
          <div key={entry.timer.startTime} id={entry.timer.startTime}>
            <Tag entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
