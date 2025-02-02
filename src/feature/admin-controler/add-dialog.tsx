import { useAddRoleMutation } from "@/components/hooks/use-roles-mutation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const roles = ["Reviewer", "Trusted", "Banned"];

const AddDialog = () => {
  const [value, setValue] = useState({
    discordNick: "",
    discordId: "",
    role: "",
  });
  const [open, setOpen] = useState(false);
  const addRoleMutation = useAddRoleMutation();
  const onAdd = () => {
    addRoleMutation.mutate({
      ...value,
      house: "test",
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="success" className="text-white">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Wiki Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nick
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={value.discordNick}
              onChange={(e) =>
                setValue({ ...value, discordNick: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              ID
            </Label>
            <Input
              id="id"
              className="col-span-3"
              value={value.discordId}
              onChange={(e) =>
                setValue({ ...value, discordId: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Role
            </Label>
            <Select
              value={value.role}
              onValueChange={(e) => setValue({ ...value, role: e })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roles.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onAdd}
            disabled={!value.discordNick || !value.discordId || !value.role}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
