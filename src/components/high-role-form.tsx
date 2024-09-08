import { Roles } from "@/app/(owner)/settings/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface UserFormProps {
  user: Roles;
  setUser: React.Dispatch<React.SetStateAction<Roles>>;
  disabled: boolean;
  onAdd: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  setUser,
  disabled,
  onAdd,
}) => (
  <div className="flex gap-2 my-6">
    <div>
      <Input
        className="w-[120px]"
        placeholder="Nick"
        value={user.discordNick}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, discordNick: e.target.value }))
        }
      />
    </div>
    <div>
      <Input
        className="w-[120px]"
        placeholder="Discord ID"
        value={user.discordId}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, discordId: e.target.value }))
        }
      />
    </div>
    <div>
      <Select onValueChange={(e) => setUser((prev) => ({ ...prev, role: e }))}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Pick a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HighCommand">HighCommand</SelectItem>
          <SelectItem value="RightHand">RightHand</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button disabled={disabled} className="w-fit self-end" onClick={onAdd}>
      Add To List
    </Button>
  </div>
);

export default UserForm;
