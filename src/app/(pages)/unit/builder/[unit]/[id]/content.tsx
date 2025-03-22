import { UnitData } from "@/lib/get-data";

interface ContentProps {
  data: UnitData;
}
const Content = ({ data }: ContentProps) => {
  return <div>{data.title}</div>;
};

export default Content;
