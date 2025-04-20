import { DoctrineType } from "@/lib/get-data";
import DoctrineTooltip from "./doctrine-tooltip";

interface DoctrineGroupProps {
  doctrines: DoctrineType[];
}

const DoctrinesGroup = ({ doctrines }: DoctrineGroupProps) => {
  return doctrines && doctrines.length > 0 ? (
    <div className="space-y-2">
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          {/* Circle background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full border-2 border-muted" />
            <div className="w-64 h-64 rounded-full border-2 border-muted absolute" />
          </div>

          {/* Icons positioned in a circle */}
          <div className="relative flex items-center justify-center h-96">
            {doctrines.map((doctrine, i) => {
              // Calculate position on the circle
              const angle = i * ((2 * Math.PI) / 5) - Math.PI / 2; // Start from top
              const radius = 140; // Circle radius in pixels
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={i}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <DoctrineTooltip
                    img={doctrine.img}
                    label={doctrine.name}
                    description={doctrine.stats}
                  />
                </div>
              );
            })}

            {/* Center content */}
            <div className="bg-background rounded-full w-24 h-24 flex items-center justify-center shadow-sm">
              <span className="text-lg font-medium text-primary">
                Doctrines
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default DoctrinesGroup;
