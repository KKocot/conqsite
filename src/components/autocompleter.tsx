import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Unit } from "@/lib/type";

export function Autocompleter({
  value,
  onChange,
  units,
  users,
}: {
  value: string;
  onChange: (e: string) => void;
  units?: Unit[];
  users?: string[];
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
    if (e.key === "Escape" || e.key === "Enter") {
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
  return (
    <Command className="w-full border" ref={autocompleteRef}>
      <CommandInput
        ref={inputRef}
        onFocus={handleInputFocus}
        value={value}
        onValueChange={(e) => onChange(e)}
      />
      <CommandList>
        {isOpen && (
          <CommandGroup className="absolute max-h-60 w-52 overflow-scroll bg-primary">
            {units
              ? units.map((item) => (
                  <CommandItem
                    key={item.id + item.name}
                    className="p-0"
                    onSelect={() => onChange(item.name)}
                  >
                    <div
                      onClick={() => onChange(item.name)}
                      className="w-56 px-2 py-1 even:bg-black flex items-center gap-2"
                      title={item.name}
                    >
                      <Avatar
                        className="h-8 w-8 md:h-12 md:w-12"
                        title={item.name}
                      >
                        <AvatarImage alt={item.name} src={item.icon} />
                        <AvatarFallback>
                          <img src="/logo.png" />
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.name}</span>
                    </div>
                  </CommandItem>
                ))
              : null}
            {users
              ? users.map((item) => (
                  <CommandItem
                    key={item}
                    className="p-0"
                    onSelect={() => onChange(item)}
                  >
                    <div
                      onClick={() => onChange(item)}
                      className="w-56 px-2 py-1 even:bg-black"
                      title={item}
                    >
                      <span>{item}</span>
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
