import clsx from "clsx";
import { MoveRight } from "lucide-react";

const Steper = ({
  tooltips,
  step,
  maxSteps,
  className,
}: {
  tooltips: string[];
  step: number;
  maxSteps: number;
  className?: string;
}) => {
  return (
    <ul className={clsx("flex gap-4 text-accent", className)}>
      {Array.from({ length: maxSteps }).map((_, i) => (
        <li key={i} className="flex items-center gap-4">
          <div
            className={clsx("rounded-full", {
              "border-4 border-accent font-bold": step === i + 1,
            })}
          >
            <Item
              tooltip={
                i === 0
                  ? tooltips[0]
                  : i === 1
                  ? tooltips[1]
                  : i === 2
                  ? tooltips[2]
                  : tooltips[3]
              }
              page={i + 1}
            />
          </div>
          {i !== maxSteps - 1 ? <MoveRight /> : null}
        </li>
      ))}
    </ul>
  );
};

export default Steper;

const Item = ({ tooltip, page }: { tooltip: string; page: number }) => {
  return (
    <div
      title={tooltip}
      className="border-2 rounded-full w-10 h-10 flex items-center justify-center text-accent border-accent"
    >
      {page}
    </div>
  );
};
