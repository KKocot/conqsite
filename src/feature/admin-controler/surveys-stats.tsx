import { FilledSurveys } from "@/lib/get-data";

const SurveysStats = ({ stats }: { stats: FilledSurveys }) => {
  return (
    <div className="shadow-lg rounded-lg p-6 max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Surveys Stats</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
          <p className="text-gray-700">Filled surveys:</p>
          <span className="font-semibold text-green-600">
            {stats.filled_surveys}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-red-50 rounded-md">
          <p className="text-gray-700">Not filled surveys:</p>
          <span className="font-semibold text-red-600">
            {stats.not_filled_surveys}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SurveysStats;
