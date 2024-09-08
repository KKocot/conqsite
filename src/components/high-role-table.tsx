import { Roles } from "@/app/(owner)/settings/page";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import clsx from "clsx";

interface RolesTableProps {
  rolesList: Roles[];
  house: string;
  onDelete: (discordId: string) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({
  rolesList,
  house,
  onDelete,
}) => (
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nick</TableHead>
          <TableHead>Role</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ItemsList
          roles={rolesList.filter((e) => e.house === house)}
          role="HouseLeader"
          handleDelete={onDelete}
        />
        <ItemsList
          roles={rolesList.filter((e) => e.house === house)}
          role="RightHand"
          handleDelete={onDelete}
        />
        <ItemsList
          roles={rolesList.filter((e) => e.house === house)}
          role="HighCommand"
          handleDelete={onDelete}
        />
      </TableBody>
    </Table>
  </div>
);

interface ItemsListProps {
  roles: Roles[];
  role: string;
  handleDelete: (discordId: string) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ roles, role, handleDelete }) => (
  <>
    {roles
      ?.filter((e) => e.role === role)
      .map((role) => (
        <TableRow
          key={role._id}
          className={clsx({
            "bg-yellow-500 text-secondary hover:text-white":
              role.role === "HouseLeader",
            "bg-purple-500": role.role === "RightHand",
            "bg-blue-500": role.role === "HighCommand",
          })}
        >
          <TableCell className="font-bold p-2" title={role.discordId}>
            {role.discordNick}
          </TableCell>
          <TableCell className="p-2">{role.role}</TableCell>
          <TableCell className="p-2">
            <Button
              variant="destructive"
              className="rounded-none"
              onClick={() => handleDelete(role.discordId)}
              disabled={role.role === "HouseLeader"}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
  </>
);

export default RolesTable;
