import { goldenUnits } from "@/assets/golden-units-data";
import { heroicUnits } from "@/assets/heroic-units-data";
import { blueUnits, greenUnits, greyUnits } from "@/assets/low-units-data";
import { SurveyProps } from "@/lib/type";
import { ownedUnits } from "@/lib/utils";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import List from "./unit-list";

const ProfileData = ({ profile }: { profile: SurveyProps }) => {
  const golden = ownedUnits(goldenUnits, profile.units.golden);
  const heroic = ownedUnits(heroicUnits, profile.units.heroic);
  const blue = ownedUnits(blueUnits, profile.units.low);
  const green = ownedUnits(greenUnits, profile.units.low);
  const grey = ownedUnits(greyUnits, profile.units.low);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center px-0">
            Wymaksowana i Preferuje
          </TableHead>
          <TableHead className="text-center px-0">Preferuje</TableHead>
          <TableHead className="text-center px-0">Wymaksowana</TableHead>
          <TableHead className="text-center px-0">Posiadam</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <List units={golden} value="4" />
          <List units={golden} value="3" />
          <List units={golden} value="2" />
          <List units={golden} value="1" />
        </TableRow>
        <TableRow>
          <List units={heroic} value="4" />
          <List units={heroic} value="3" />
          <List units={heroic} value="2" />
          <List units={heroic} value="1" />
        </TableRow>
        <TableRow>
          <List units={blue} value="4" />
          <List units={blue} value="3" />
          <List units={blue} value="2" />
          <List units={blue} value="1" />
        </TableRow>
        <TableRow>
          <List units={green} value="4" />
          <List units={green} value="3" />
          <List units={green} value="2" />
          <List units={green} value="1" />
        </TableRow>
        <TableRow>
          <List units={grey} value="4" />
          <List units={grey} value="3" />
          <List units={grey} value="2" />
          <List units={grey} value="1" />
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProfileData;
