import { HiMiniCheckCircle } from "react-icons/hi2";
import { capitalize } from "../utils/utils";

export function GuidePromise({ data }: { data: string[] }) {
  return (
    <div className="p-6 md:p-8 lh-card flex flex-col gap-2 text-dark">
      <div className="lh-bold lh-darkest">You&apos;ll learn how to</div>
      {data.map((val) => (
        <div key={val} className="lh-card p-4 flex flex-row gap-2 items-center">
          <HiMiniCheckCircle className="lh-icon-size" />
          <div>{capitalize(val)}</div>
        </div>
      ))}
    </div>
  );
}
