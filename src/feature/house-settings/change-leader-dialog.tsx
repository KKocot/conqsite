import { useUpdateLeaderMutation } from "@/components/hooks/use-update-house-leader-mutation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscordUsersProps } from "@/lib/get-data";
import { PenBoxIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const roles = [
  { title: "Right Hand", value: "RightHand" },
  { title: "High Command", value: "HighCommand" },
  { title: "Member", value: "member" },
];

interface ChangeLeaderDialogProps {
  members: DiscordUsersProps;
  highroles: string[];
  noMoreRightHand: boolean;
  noMoreHighCommand: boolean;
  currentLeader: {
    discordId: string;
    discordNick: string;
    house: string;
  };
}
interface Values {
  newLeaderId: string;
  newLeaderName: string;
  newRole: string;
}
const defaultValues = {
  newLeaderId: "",
  newLeaderName: "",
  newRole: "",
};
const ChangeLeaderDialog: React.FC<ChangeLeaderDialogProps> = ({
  members,
  highroles,
  noMoreRightHand,
  noMoreHighCommand,
  currentLeader,
}) => {
  const [values, setValues] = useState<Values>(defaultValues);
  const [open, setOpen] = useState(false);
  const updateLeaderMutation = useUpdateLeaderMutation();
  const onSubmit = () => {
    updateLeaderMutation.mutate({
      exLeaderName: currentLeader.discordNick,
      exLeaderId: currentLeader.discordId,
      exLeaderNewRole: values.newRole,
      newLeaderName: values.newLeaderName,
      newLeaderId: values.newLeaderId,
      house: currentLeader.house,
    });
    setOpen(false);
    setValues(defaultValues);
    updateLeaderMutation.isSuccess && toast.success("Leader updated");
    updateLeaderMutation.isError && toast.error("Failed to update leader");
  };
  console.log(values);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PenBoxIcon className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Change house leader and set your new role
          </DialogDescription>
        </DialogHeader>
        <Label>New house leader</Label>
        <Select
          value={values.newLeaderId}
          onValueChange={(e) => {
            setValues({
              ...values,
              newLeaderName:
                members.users.find((user) => user.id === e)?.username ?? "",
              newLeaderId: e,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select new leader" />
          </SelectTrigger>
          <SelectContent>
            {members.users.map((e, i) => (
              <SelectItem
                key={i + "righthand"}
                value={e.id}
                disabled={highroles.includes(e.id)}
              >
                {e.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={values.newRole}
          onValueChange={(e) => {
            setValues({
              ...values,
              newRole: e,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your new role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((e) => (
              <SelectItem
                key={e.value}
                value={e.value}
                disabled={
                  (e.value === "RightHand" && noMoreRightHand) ||
                  (e.value === "HighCommand" && noMoreHighCommand)
                }
              >
                {e.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter className="flex justify-between items-center">
          <p className="text-red-500 text-xs">
            {values.newLeaderId === "" ? (
              "Please select a new leader"
            ) : values.newRole === "" ? (
              "Please select a new role"
            ) : (
              <div />
            )}
          </p>
          <Button
            type="submit"
            disabled={values.newLeaderId === "" || values.newRole === ""}
            onClick={onSubmit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeLeaderDialog;
