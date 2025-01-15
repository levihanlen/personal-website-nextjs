import { roadmap } from "../utils/roadmap";
import { Roadmap } from "../utils/types";
import { ProgressBar } from "./Primitives";

export function RoadmapOverview() {
  const sortedRoadmap = roadmap.sort((a, b) => {
    const earliestA = a.items.reduce((earliest, current) =>
      new Date(current.date) < new Date(earliest.date) ? current : earliest
    );
    const earliestB = b.items.reduce((earliest, current) =>
      new Date(current.date) < new Date(earliest.date) ? current : earliest
    );

    return (
      new Date(earliestA.date).getTime() - new Date(earliestB.date).getTime()
    );
  });
  return (
    <div className="p-4 lh-card md:p-8">
      <div className="text-darkest text-2xl font-semibold">Overview</div>
      <p>The problems we must solve</p>
      <div className="space-y-4">
        {sortedRoadmap.map((val, ind) => {
          const earliestItem = val.items.reduce((earliest, current) => {
            return new Date(current.date) < new Date(earliest.date)
              ? current
              : earliest;
          });

          const latestItem = val.items.reduce((earliest, current) => {
            return new Date(current.date) > new Date(earliest.date)
              ? current
              : earliest;
          });
          return (
            <CardRow key={ind} className="justify-between space-x-4">
              <a className="" href={`#${val.title}`}>
                {val.title}
              </a>
              <div className="flex-none text-xs text-dark">
                {new Date(earliestItem.date).getFullYear()} -{" "}
                {new Date(latestItem.date).getFullYear()}
              </div>
            </CardRow>
          );
        })}
      </div>
    </div>
  );
}

export function RoadmapDisp({ roadmap }: { roadmap: Roadmap }) {
  const total = roadmap.items.reduce(
    (acc, item) => acc + (item.done ? 1 : 0),
    0
  );
  const percent = (total / roadmap.items.length) * 100;

  // Function to calculate time difference
  function getTimeDifference(date: Date) {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const isPast = diffMs < 0;
    const diff = Math.abs(diffMs);

    const msInMinute = 60 * 1000;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInMonth = msInDay * 30; // Approximate
    const msInYear = msInDay * 365; // Approximate

    let timeStr = "";
    if (diff >= msInYear) {
      const years = Math.round(diff / msInYear);
      timeStr = `${years} year${years > 1 ? "s" : ""}`;
    } else if (diff >= msInMonth) {
      const months = Math.round(diff / msInMonth);
      timeStr = `${months} month${months > 1 ? "s" : ""}`;
    } else if (diff >= msInDay) {
      const days = Math.round(diff / msInDay);
      timeStr = `${days} day${days > 1 ? "s" : ""}`;
    } else if (diff >= msInHour) {
      const hours = Math.round(diff / msInHour);
      timeStr = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (diff >= msInMinute) {
      const minutes = Math.round(diff / msInMinute);
      timeStr = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      timeStr = "just now";
    }

    if (timeStr === "just now") {
      return timeStr;
    }

    return isPast ? `${timeStr} ago` : `in ${timeStr}`;
  }

  return (
    <div className="p-6 md:p-8 lh-card space-y-6">
      <div className="flex flex-col space-y-1" id={roadmap.title}>
        <ProgressBar percent={percent} />
        <div className="text-xs text-dark">{percent.toFixed(0)}%</div>
      </div>
      <div className="text-2xl font-semibold text-darkest">{roadmap.title}</div>
      <div className="text-dark">{roadmap.desc}</div>

      <details className="mt-4">
        <summary className="cursor-pointer text-lg font-semibold">
          Expand
        </summary>
        <div className="space-y-6 mt-4">
          {roadmap.items
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((item, ind) => {
              const date = new Date(item.date);
              const timeDiffStr = getTimeDifference(date);

              return (
                <CardRow key={ind} className={item.done ? "" : ""}>
                  <div className=" items-center flex flex-row mr-4">
                    <div
                      className={` rounded-full w-4 h-4 flex-none mr-4 lh-border ${
                        item.done ? "bg-darkest border-dark" : ""
                      }`}
                    />
                    <div
                      className={` ${
                        item.done ? "line-through text-dark" : "text-darkest "
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                  <div className="text-sm text-dark flex-none">
                    {timeDiffStr}
                  </div>
                </CardRow>
              );
            })}
        </div>
      </details>
    </div>
  );
}

function CardRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={` flex flex-auto justify-between items-center border-b-pt pb-1 border-light ${className}`}
    >
      {children}
    </div>
  );
}
