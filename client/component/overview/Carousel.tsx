// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    <div className="w-full overflow-x-auto horizontal-carousel snap-x snap-mandatory ">
      <div ref={carouselRef} className="flex carousel-container">
        {entries?.map((entry: any) => (
          <div key={entry.timer.startTime} id={entry.timer.startTime}>
            {/* {visibleComponentId === entry.timer.startTime
              ? "This component is visible!"
              : "This component is not visible!"} */}
            <Tag entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
