"use client";

import { epicDoctrines, rareDoctrines } from "@/assets/doctrines";
import { useParams } from "next/navigation";
import Content from "./content";
import { getUnit } from "@/lib/utils";
import { Unit } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { getUnitWiki } from "@/lib/get-data";
import LoadingComponent from "@/feature/ifs/loading";
import NoData from "@/feature/ifs/no-data";

// const unitobject = {
//   name: "Siphonarioi", // Uneditable
//   icon: "/golden-icons/Siphonarioi.webp", // Uneditable
//   era: "golden", // Uneditable
//   image: "/golden-units/barc-narf-gua-thumb.png", // Uneditable
//   leadership: 300, // Editable
//   value: [1000, 900], // Editable
//   authors: ["BardDev", "Czarny"], // Editable
//   masteryPoints: false, // Editable
//   maxlvl: 30, // Editable
//   season: { number: 5, name: "Legacy of fire" },
//   description:
//     "Known as a Sipho or Flames. They burn enemies, protect them with a hero and other units like a shields etc.", // Editable
//   kits: [
//     {
//       name: "Siphonarioi kit",
//       description: "The Siphonarioi kit",
//       image: "/kits/sipho_kit.png",
//     },
//   ], // Editable
//   skills: [
//     {
//       name: "Firestorm",
//       description:
//         "The unit sprays a longer blast of hellfire that will set the enemy on fire for some time.",
//       image: "/skills/firestorm.png",
//     },
//     {
//       name: "Scorched Earth",
//       description:
//         "The unit sprays a quick burst of hellfire. Hellfire will continue to burn on the ground for an extended period of time, inflicting lots of burning damage to enemies passing through.",
//       image: "/skills/scorched-earth.png",
//     },
//   ], // Editable
//   formations: [
//     {
//       name: "Line",
//       description:
//         "The unit forms a horizontal line. Good for defending against an oncoming enemy.",
//       image: "/formations/line-single-horizontal.png",
//     },
//     {
//       name: "Cross Formation",
//       description:
//         "The unit stands in two criss-crossing ranks, making it superior at making frontal attacks.",
//       image: "/formations/cross-formation.png",
//     },
//   ], // Editable
//   treeStructure: [
//     {
//       name: "The soldier's life",
//       description: "Increases health by 6%",
//       img: "/tree-imgs/hp.png",
//       prev: null,
//       id: 1,
//       value: 1,
//     },

//     {
//       name: "Cooldown",
//       description: "Each level reduces Firestorm's cooldown by 2 seconds",
//       img: "/tree-imgs/clock.png",
//       prev: 1,
//       id: 2,
//       value: 3,
//     },
//     {
//       name: "Fiery Impact",
//       description:
//         "Each level increases flames' blunt damage against enemies by 100",
//       img: "/tree-imgs/fire_up.png",
//       prev: 2,
//       id: 3,
//       value: 3,
//     },
//     {
//       name: "Move as One",
//       description: "Increases movement speed by 3%",
//       img: "/tree-imgs/aura_man.png",
//       prev: 3,
//       id: 4,
//       value: 1,
//     },
//     {
//       name: "Improved Supplies",
//       description: "Each level increases ammo by 20",
//       img: "/tree-imgs/ammo.png",
//       prev: 4,
//       id: 5,
//       value: 3,
//     },
//     {
//       name: "Purifyng Hellfire",
//       description: "Each level increases fire damage by 80 seconds",
//       img: "/tree-imgs/fire_up.png",
//       prev: 5,
//       id: 6,
//       value: 3,
//     },
//     {
//       name: "Cooldown",
//       description: "Each level reduces Firestorm's cooldown by 2 seconds",
//       img: "/tree-imgs/clock.png",
//       prev: 6,
//       id: 7,
//       value: 3,
//     },
//     {
//       name: "Improved Pump Seals",
//       description: "Substantially increases Firestorm's rate of fire",
//       img: "/tree-imgs/fire_up.png",
//       prev: 7,
//       id: 8,
//       value: 1,
//     },
//     {
//       name: "Cooldown",
//       description: "Each level reduces Scorched Earth's cooldown by 2 seconds",
//       img: "/tree-imgs/clock.png",
//       prev: 8,
//       id: 9,
//       value: 3,
//     },
//     {
//       name: "Eternal Flame",
//       description: "Increases fire damage by 480",
//       img: "/tree-imgs/fire_up.png",
//       prev: 9,
//       id: 10,
//       value: 1,
//     },
//     {
//       name: "Improved Supplies",
//       description: "Increases ammo by 10%",
//       img: "/tree-imgs/ammo.png",
//       prev: 1,
//       id: 11,
//       value: 1,
//     },
//     {
//       name: "Toughen Up",
//       description: "Each level increases piercing defence by 3%",
//       img: "/tree-imgs/def_slashing.png",
//       prev: 11,
//       id: 12,
//       value: 3,
//     },
//     {
//       name: "Bloodbath",
//       description: "Each level increases slashing defence by 3%",
//       img: "/tree-imgs/def_slashing.png",
//       prev: 12,
//       id: 13,
//       value: 3,
//     },
//     {
//       name: "A Land of Fire",
//       description:
//         "Each level increases duration of falmes on the ground by 2 seconds",
//       img: "/tree-imgs/fire.png",
//       prev: 13,
//       id: 14,
//       value: 2,
//     },
//     {
//       name: "Refined Hellfire",
//       description: "Each level increases duration of burning by 1.5 seconds",
//       img: "/tree-imgs/fire_hand.png",
//       prev: 14,
//       id: 15,
//       value: 3,
//     },
//     {
//       name: "Improved Pump Seals",
//       description: "Slightly increases Firestorm's rate of fire",
//       img: "/tree-imgs/fire_up.png",
//       prev: 15,
//       id: 16,
//       value: 1,
//     },
//     {
//       name: "Improved Supplies",
//       description: "Each level reduces ranged damage taken by 5%",
//       img: "/tree-imgs/shield_with_arrow_down.png",
//       prev: 16,
//       id: 17,
//       value: 2,
//     },
//     {
//       name: "Move as one",
//       description: "Each level increases movement speed by 3%",
//       img: "/tree-imgs/aura_man.png",
//       prev: 17,
//       id: 18,
//       value: 2,
//     },
//     {
//       name: "Fiery Impact",
//       description:
//         "Each level increases flames' blunt damage against enemies by 100",
//       img: "/tree-imgs/fire_up.png",
//       prev: 18,
//       id: 19,
//       value: 3,
//     },
//     {
//       name: "Thick Armour",
//       description: "Increases all defence by 20%",
//       img: "/tree-imgs/armored_man.png",
//       prev: 19,
//       id: 20,
//       value: 1,
//     },
//   ], // Editable
//   challenges: [
//     {
//       tier: 1,
//       quests: [
//         "Kill 100 enemies with Firestorm",
//         "Kill 100 enemies with Scorched Earth",
//       ],
//     },
//     {
//       tier: 2,
//       quests: [
//         "Kill 200 enemies with Firestorm",
//         "Kill 200 enemies with Scorched Earth",
//       ],
//     },
//     {
//       tier: 3,
//       quests: [
//         "Kill 300 enemies with Firestorm",
//         "Kill 300 enemies with Scorched Earth",
//       ],
//     },
//   ],
// };

const Page = () => {
  const params = useParams();
  const unit = params.unit.toString();
  const era = params.era.toString() as
    | "golden"
    | "heroic"
    | "green"
    | "blue"
    | "grey";
  const found_unit: Unit | null = getUnit(unit, era) ?? null;
  const doctrines = [...epicDoctrines, ...rareDoctrines].filter(
    (doctrine) =>
      doctrine.dedicated === "unit" &&
      doctrine.forUnit.includes(found_unit?.name ?? "")
  );
  const { data, isLoading } = useQuery({
    queryKey: ["unit", found_unit?.name],
    queryFn: () => getUnitWiki(found_unit?.name ?? ""),
    enabled: !!found_unit,
  });
  if (isLoading) return <LoadingComponent />;
  if (!found_unit) return <NoData />;
  return (
    <Content
      entry={data?.[data.length - 1] ?? undefined}
      doctrines={doctrines}
      shortEntry={found_unit}
    />
  );
};
export default Page;
