import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { SurveyProps, Unit, WeaponsTypes } from "@/lib/type";
import clsx from "clsx";

export function Autocompleter({
  value,
  onChange,
  units,
  users,
  weapons,
  user,
  placeholder,
}: {
  value: string;
  onChange: (e: string) => void;
  units?: Unit[];
  users?: string[];
  weapons?: WeaponsTypes[];
  user?: SurveyProps;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const handleInputFocus = () => {
    setIsOpen(true);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === "Tab") {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const unit = units?.find((unit) => unit.name === value);
  const weapon = weapons?.find((weapon) => weapon.name === value);
  function findUserPrefences(user?: SurveyProps, unit?: Unit) {
    switch (unit?.era) {
      case "golden":
        return user?.units.golden.find((u) => u.id === unit?.id);
      case "heroic":
        return user?.units.heroic.find((u) => u.id === unit?.id);
      default:
        return user?.units.low.find((u) => u.id === unit?.id);
    }
  }
  const user_preferences = findUserPrefences(user, unit);
  return (
    <Command className="w-full border h-fit" ref={autocompleteRef}>
      <div className="flex">
        {units ? (
          <Avatar className="h-8 w-8 rounded-none">
            <AvatarImage alt={unit?.name} src={unit?.icon} />
          </Avatar>
        ) : weapon ? (
          <Avatar className="h-8 w-8 rounded-none">
            <AvatarImage alt={weapon.name} src={weapon?.src} />
          </Avatar>
        ) : (
          <div className="w-9" />
        )}

        <CommandInput
          placeholder={placeholder}
          className="h-6 py-0"
          ref={inputRef}
          onFocus={handleInputFocus}
          value={value}
          onValueChange={(e) => onChange(e)}
        />
        {unit ? (
          <span
            className={clsx("p-1", {
              "bg-yellow-800": user_preferences?.value === "4",
              "bg-purple-800": user_preferences?.value === "3",
              "bg-blue-800": user_preferences?.value === "2",
              "bg-green-800": user_preferences?.value === "1",
            })}
          >
            {unit.leadership}
          </span>
        ) : null}
      </div>
      <CommandList>
        {isOpen && (
          <CommandGroup className="absolute max-h-60 p-0 w-52 overflow-scroll bg-slate-200 shadow-md dark:bg-blue-900 z-10">
            {units
              ? units.map((item) => {
                  const characterLevel = Number(user?.characterLevel);
                  if (
                    characterLevel === 1 ||
                    (item.pref !== "0" && characterLevel > 1)
                  ) {
                    return renderCommandItem(item, onChange, setIsOpen);
                  }
                  return null;
                })
              : null}
            {users
              ? users.map((item) => (
                  <CommandItem
                    key={item}
                    className="p-0 cursor-pointer"
                    onSelect={() => onChange(item)}
                  >
                    <div
                      onClick={() => {
                        onChange(item), setIsOpen(false);
                      }}
                      className="w-56 px-2 py-1 even:bg-black"
                      title={item}
                    >
                      <span>{item}</span>
                    </div>
                  </CommandItem>
                ))
              : null}
            {weapons
              ? weapons.map((item) => (
                  <CommandItem
                    key={item.id + item.name}
                    className="p-0 cursor-pointer"
                    onSelect={() => onChange(item.name)}
                  >
                    <div
                      onClick={() => {
                        onChange(item.name), setIsOpen(false);
                      }}
                      className="w-56 px-2 py-1 even:bg-black flex items-center gap-2"
                      title={item.name}
                    >
                      <Avatar className="h-8 w-8" title={item.name}>
                        <AvatarImage alt={item.name} src={item.src} />
                        <AvatarFallback>W</AvatarFallback>
                      </Avatar>
                      <span>{item.name}</span>
                    </div>
                  </CommandItem>
                ))
              : null}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

const renderCommandItem = (
  item: Unit,
  onChange: OnChange,
  setIsOpen: SetIsOpen
) => (
  <CommandItem
    key={item.id + item.name}
    className="p-0 cursor-pointer"
    onSelect={() => onChange(item.name)}
  >
    <div
      onClick={() => {
        onChange(item.name);
        setIsOpen(false);
      }}
      className={clsx(
        "w-56 px-2 py-1 flex items-center gap-2 hover:bg-slate-600 dark:bg-slate-800 bg-slate-300",
        {
          "to-40% bg-gradient-to-r from-yellow-700 dark:to-slate-800 to-slate-300 hover:to-yellow-700":
            item.pref === "4",
          "to-40% bg-gradient-to-r from-purple-700 dark:to-slate-800 to-slate-300 hover:to-purple-700":
            item.pref === "3",
          "to-40% bg-gradient-to-r from-blue-700 dark:to-slate-800 to-slate-300 hover:to-blue-700":
            item.pref === "2",
          "to-40% bg-gradient-to-r from-green-700 dark:to-slate-800 to-slate-300 hover:to-green-700":
            item.pref === "1",
          "to-40% bg-gradient-to-r from-gray-700 dark:to-slate-800 to-slate-300 hover:to-gray-700":
            item.pref === "0",
        }
      )}
      title={item.name}
    >
      <Avatar className="h-8 w-8 rounded-none" title={item.name}>
        <AvatarImage alt={item.name} src={item.icon} />
        <AvatarFallback className="rounded-none">U</AvatarFallback>
      </Avatar>
      <span>{item.name}</span>
    </div>
  </CommandItem>
);

type OnChange = (name: string) => void;
type SetIsOpen = (isOpen: boolean) => void;
