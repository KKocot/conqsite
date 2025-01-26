import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";
import { Roles } from "@/lib/get-data";
import AddDialog from "./add-dialog";
import { useDeleteRoleMutation } from "@/components/hooks/use-roles-mutation";

interface WikiRolesProps {
  data: Roles[];
}
const house = "test";
const WikiRoles: FC<WikiRolesProps> = ({ data }) => {
  const deleteRoleMutation = useDeleteRoleMutation();
  const onDelete = (discordId: string) => {
    deleteRoleMutation.mutate({
      discordId,
      house,
    });
  };
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Wiki Roles</CardTitle>
        <CardDescription>List of users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Roles for wiki list: Reviewer, Trusted, Banned
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.discordNick}</TableCell>
                <TableCell>{user.discordId}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(user.discordId)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AddDialog />
      </CardFooter>
    </Card>
  );
};
export default WikiRoles;
