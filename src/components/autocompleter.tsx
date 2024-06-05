import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

interface Unit {
  era: string;
  icon: string;
  id: number;
  leadership: number;
  masteryPoints: boolean;
  name: string;
  src: string;
  value: number;
}

export function Autocompleter({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (e: string) => void;
  items: Unit[];
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
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
          <CommandGroup className="absolute max-h-36 overflow-scroll bg-primary">
            {items &&
              items.map((item) => (
                <CommandItem
                  key={item.id + Math.random()}
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
                        <img src={item.src} />
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.name}</span>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
