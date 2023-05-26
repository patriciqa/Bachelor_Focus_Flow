// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Tag from "./Tag";
const HorizontalCarousel = ({
  entries,
  selectedDate,
  jumpId,
}: {
  entries: any;
  selectedDate: Date;
  jumpId: number;
}) => {
  return (
    <div className="w-full overflow-x-auto horizontal-carousel snap-x snap-mandatory ">
      <div className="flex carousel-container">
        {entries !== undefined &&
          entries.map((entry: any) => (
            <div key={entry.timer.startTime}>
              <Tag entry={entry} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
