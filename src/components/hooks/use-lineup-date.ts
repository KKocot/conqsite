import { useEffect, useState } from "react";

const useLineupDate = (urlDate: string | null, latestDate: string) => {
  const [date, setDate] = useState<string>(urlDate || latestDate || "");

  useEffect(() => {
    if (!urlDate && latestDate) setDate(latestDate);
  }, [latestDate, urlDate]);

  return [date, setDate] as const;
};

export default useLineupDate;
