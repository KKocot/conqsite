import { Unit } from "@/lib/type";

export const goldenUnits = [
  {
    id: 1,
    name: "Siphonarioi",
    src: "/golden-units/barc-narf-gua-thumb.png",
    leadership: 300,
    masteryPoints: false,
    value: 10,
    era: "golden",
    icon: "/golden-icons/Siphonarioi.webp",
    type: ["ranged", "special"],
    description:
      "Known as a Sipho or Flames. They burn enemies, protect them with a hero and other units like a shields etc.",
    season: { number: 5, name: "Legacy of fire" },
    tree: {
      img: "https://conqhub.com/images/units/siphonarioi/barc-narf-gua-vet-expan.png",
      maxlvl: 30,
      structure: [
        {
          name: "The soldier's life",
          description: "Increases health by 6%",
          img: "/tree-imgs/hp.png",
          prev: null,
          id: 1,
          value: 1,
        },

        {
          name: "Cooldown",
          description: "Each level reduces Firestorm's cooldown by 2 seconds",
          img: "/tree-imgs/clock.png",
          prev: 1,
          id: 2,
          value: 3,
        },
        {
          name: "Fiery Impact",
          description:
            "Each level increases flames' blunt damage against enemies by 100",
          img: "/tree-imgs/fire_up.png",
          prev: 2,
          id: 3,
          value: 3,
        },
        {
          name: "Move as One",
          description: "Increases movement speed by 3%",
          img: "/tree-imgs/aura_man.png",
          prev: 3,
          id: 4,
          value: 1,
        },
        {
          name: "Improved Supplies",
          description: "Each level increases ammo by 20",
          img: "/tree-imgs/ammo.png",
          prev: 4,
          id: 5,
          value: 3,
        },
        {
          name: "Purifyng Hellfire",
          description: "Each level increases fire damage by 80 seconds",
          img: "/tree-imgs/fire_up.png",
          prev: 5,
          id: 6,
          value: 3,
        },
        {
          name: "Cooldown",
          description: "Each level reduces Firestorm's cooldown by 2 seconds",
          img: "/tree-imgs/clock.png",
          prev: 6,
          id: 7,
          value: 3,
        },
        {
          name: "Improved Pump Seals",
          description: "Substantially increases Firestorm's rate of fire",
          img: "/tree-imgs/fire_up.png",
          prev: 7,
          id: 8,
          value: 1,
        },
        {
          name: "Cooldown",
          description:
            "Each level reduces Scorched Earth's cooldown by 2 seconds",
          img: "/tree-imgs/clock.png",
          prev: 8,
          id: 9,
          value: 3,
        },
        {
          name: "Eternal Flame",
          description: "Increases fire damage by 480",
          img: "/tree-imgs/fire_up.png",
          prev: 9,
          id: 10,
          value: 1,
        },
        {
          name: "Improved Supplies",
          description: "Increases ammo by 10%",
          img: "/tree-imgs/ammo.png",
          prev: 1,
          id: 11,
          value: 1,
        },
        {
          name: "Toughen Up",
          description: "Each level increases piercing defence by 3%",
          img: "/tree-imgs/def_slashing.png",
          prev: 11,
          id: 12,
          value: 3,
        },
        {
          name: "Bloodbath",
          description: "Each level increases slashing defence by 3%",
          img: "/tree-imgs/def_slashing.png",
          prev: 12,
          id: 13,
          value: 3,
        },
        {
          name: "A Land of Fire",
          description:
            "Each level increases duration of falmes on the ground by 2 seconds",
          img: "/tree-imgs/fire.png",
          prev: 13,
          id: 14,
          value: 2,
        },
        {
          name: "Refined Hellfire",
          description:
            "Each level increases duration of burning by 1.5 seconds",
          img: "/tree-imgs/fire_hand.png",
          prev: 14,
          id: 15,
          value: 3,
        },
        {
          name: "Improved Pump Seals",
          description: "Slightly increases Firestorm's rate of fire",
          img: "/tree-imgs/fire_up.png",
          prev: 15,
          id: 16,
          value: 1,
        },
        {
          name: "Improved Supplies",
          description: "Each level reduces ranged damage taken by 5%",
          img: "/tree-imgs/shield_with_arrow_down.png",
          prev: 16,
          id: 17,
          value: 2,
        },
        {
          name: "Move as one",
          description: "Each level increases movement speed by 3%",
          img: "/tree-imgs/aura_man.png",
          prev: 17,
          id: 18,
          value: 2,
        },
        {
          name: "Fiery Impact",
          description:
            "Each level increases flames' blunt damage against enemies by 100",
          img: "/tree-imgs/fire_up.png",
          prev: 18,
          id: 19,
          value: 3,
        },
        {
          name: "Thick Armour",
          description: "Increases all defence by 20%",
          img: "/tree-imgs/armored_man.png",
          prev: 19,
          id: 20,
          value: 1,
        },
      ],
    },
  },
  {
    id: 2,
    name: "Cataphract Lancers",
    src: "/golden-units/cata_lan_pre.png",
    leadership: 305,
    masteryPoints: false,
    value: 5,
    era: "golden",
    icon: "/golden-icons/Elite_Cataphract_Lancers.webp",
  },
  {
    id: 3,
    name: "Chevaliers",
    src: "/golden-units/chevaliers_thumb.png",
    leadership: 340,
    masteryPoints: false,
    value: 6,
    era: "golden",
    icon: "/golden-icons/Company_Dordonnance.webp",
  },
  {
    id: 4,
    name: "Falconetti Gunners",
    src: "/golden-units/falco_gun.png",
    leadership: 300,
    masteryPoints: false,
    value: 10,
    era: "golden",
    icon: "/golden-icons/Falconetti_Gunners.webp",
  },
  {
    id: 5,
    name: "Fire Lancers",
    src: "/golden-units/fire_lan_pre.png",
    leadership: 285,
    masteryPoints: false,
    value: 4,
    era: "golden",
    icon: "/golden-icons/Fire_Lancers.webp",
  },
  {
    id: 6,
    name: "Hashashins",
    src: "/golden-units/hashashins_thumb.png",
    leadership: 295,
    masteryPoints: false,
    value: 2,
    era: "golden",
    icon: "/golden-icons/Hashashins.webp",
  },
  {
    id: 7,
    name: "Houndsmen",
    src: "/golden-units/houndsmen_thumb.png",
    leadership: 310,
    masteryPoints: false,
    value: 3,
    era: "golden",
    icon: "/golden-icons/Blood_Hunters.webp",
  },
  {
    id: 8,
    name: "Iron Reapers",
    src: "/golden-units/ir_rea_pre.png",
    leadership: 300,
    masteryPoints: false,
    value: 9,
    era: "golden",
    icon: "/golden-icons/Iron_Reapers.webp",
  },
  {
    id: 9,
    name: "Kheshigs",
    src: "/golden-units/kheshigs.png",
    leadership: 300,
    masteryPoints: false,
    value: 1,
    era: "golden",
    icon: "/golden-icons/Keshigs.webp",
  },
  {
    id: 10,
    name: "Liaos Rangers",
    src: "/golden-units/liaos_rangers_thumb.png",
    leadership: 315,
    masteryPoints: false,
    value: 6,
    era: "golden",
    icon: "/golden-icons/Liaos_rangers.webp",
  },
  {
    id: 11,
    name: "Modao Battalion",
    src: "/golden-units/modao_battalion_thumb.png",
    leadership: 310,
    masteryPoints: false,
    value: 10,
    era: "golden",
    icon: "/golden-icons/Dynastic_Guards.webp",
  },
  {
    id: 12,
    name: "Monastic Knights",
    src: "/golden-units/mona_kni.png",
    leadership: 295,
    masteryPoints: false,
    value: 6,
    era: "golden",
    icon: "/golden-icons/Elite_Monastic_Knights.webp",
  },
  {
    id: 13,
    name: "Orochi Samurai",
    src: "/golden-units/orochi_samurai_thumb.png",
    leadership: 295,
    masteryPoints: false,
    value: 7,
    era: "golden",
    icon: "/golden-icons/Orochi_Samurais.webp",
  },
  {
    id: 14,
    name: "Pavise Crossbowmen",
    src: "/golden-units/pavi_cros.png",
    leadership: 280,
    masteryPoints: false,
    value: 2,
    era: "golden",
    icon: "/golden-icons/Pavise_Crossbowman.webp",
  },
  {
    id: 15,
    name: "Rattan Rangers",
    src: "/golden-units/ratt_ran_pre.png",
    leadership: 295,
    masteryPoints: false,
    value: 1,
    era: "golden",
    icon: "/golden-icons/Rattan_Rangers.webp",
  },
  {
    id: 16,
    name: "Shenji Grenadiers",
    src: "/golden-units/shenji_grenadiers_thumb.png",
    leadership: 315,
    masteryPoints: false,
    value: 7,
    era: "golden",
    icon: "/golden-icons/Shenji_Grenadiers.webp",
  },
  {
    id: 17,
    name: "Shieldmaidens",
    src: "/golden-units/shieldmaidens_thumb.png",
    leadership: 280,
    masteryPoints: false,
    value: 7,
    era: "golden",
    icon: "/golden-icons/Shieldmaidens.webp",
  },
  {
    id: 18,
    name: "Silahdars",
    src: "/golden-units/sihl_thumb.png",
    leadership: 300,
    masteryPoints: false,
    value: 9,
    era: "golden",
    icon: "/golden-icons/Silahdars.webp",
  },
  {
    id: 19,
    name: "Tercio Arquebusiers",
    src: "/golden-units/tercio.png",
    leadership: 280,
    masteryPoints: false,
    value: 4,
    era: "golden",
    icon: "/golden-icons/Tercio_Arquebusiers.webp",
  },
  {
    id: 20,
    name: "Varangian Guards",
    src: "/golden-units/varangian_guards_thumb.png",
    leadership: 290,
    masteryPoints: false,
    value: 2,
    era: "golden",
    icon: "/golden-icons/Kings_Guards.webp",
  },
  {
    id: 21,
    name: "Winged Hussars",
    src: "/golden-units/win_hus_pre.png",
    leadership: 305,
    masteryPoints: false,
    value: 9,
    era: "golden",
    icon: "/golden-icons/Elite_Winged_Hussars.webp",
  },
  {
    id: 22,
    name: "Yanyuedao Cavalry",
    src: "/golden-units/yanyuedao_cav_thumb.png",
    leadership: 320,
    masteryPoints: false,
    value: 9,
    era: "golden",
    icon: "/golden-icons/Yanyudea_enforcers.webp",
  },
  {
    id: 23,
    name: "Zweihanders",
    src: "/golden-units/zweihanders_thumb.png",
    leadership: 310,
    masteryPoints: false,
    value: 8,
    era: "golden",
    icon: "/golden-icons/Bloodied_Zweihanders.webp",
  },
  {
    id: 24,
    name: "Retiarii",
    src: "/golden-units/retiarii_thumb.png",
    leadership: 305,
    masteryPoints: false,
    value: 1,
    era: "golden",
    icon: "/golden-icons/Retiarii.webp",
  },
  {
    id: 25,
    name: "Queens Knights",
    src: "/golden-units/QK.png",
    leadership: 295,
    masteryPoints: false,
    value: 10,
    era: "golden",
    icon: "/golden-icons/Queens_Paladins.webp",
    type: ["infrantry"],
    description: "description",
    season: { number: 18, name: "Avalon" },
    tree: {
      img: "",
      maxlvl: 30,
      structure: [
        {
          name: "Assasult",
          description: "each level increases piercing damage by 2%",
          img: "/tree-imgs/arrowhead_down.png",
          prev: null,
          id: 1,
          value: 3,
        },
        {
          name: "Battle Frenzy",
          description:
            "Each level increases the damage of the 'Blow 'Em Up' skill by 5%",
          img: "/tree-imgs/aura_man.png",
          prev: 1,
          id: 2,
          value: 3,
        },
        {
          name: "strength",
          description:
            "Each level increases armor piercing penetration attacks by 5%.",
          img: "/tree-imgs/circle_with_arrow_down.png",
          prev: 2,
          id: 3,
          value: 3,
        },
        {
          name: "coordination",
          description: "each level increases movement speed by 5%.",
          img: "/tree-imgs/stick_run.png",
          prev: 3,
          id: 4,
          value: 3,
        },
        {
          name: "Life of a Soldier",
          description: "Each level increases health by 3%.",
          img: "/tree-imgs/hp.png",
          prev: 4,
          id: 5,
          value: 3,
        },
        {
          name: "inner energy",
          description:
            "Each level reduces the cooldown of 'Blow 'Em Up' by 1 second.",
          img: "/tree-imgs/clock.png",
          prev: 5,
          id: 6,
          value: 3,
        },
        {
          name: "Without hesitation",
          description:
            "Each level increases 'Blow Em Up' damage against infantry by 8%.",
          img: "/tree-imgs/blocking_man.png",
          prev: 6,
          id: 7,
          value: 3,
        },
        {
          name: "Storm",
          description:
            "The 'Blow Em Up' ability reduces damage taken from enemies by 70% for 3 seconds",
          img: "/tree-imgs/striking_spear.png",
          prev: 7,
          id: 8,
          value: 1,
        },
        {
          name: "Life of a Soldier",
          description: "Each level increases health by 3%.",
          img: "/tree-imgs/hp.png",
          prev: 1,
          id: 9,
          value: 3,
        },
        {
          name: "Hardening",
          description:
            "Each level increases defense against piercing damage by 3%.",
          img: "/tree-imgs/def_pircing.png",
          prev: 9,
          id: 10,
          value: 3,
        },
        {
          name: "Elite soldier",
          description:
            "Each level increases damage by 5% after activating the skill 'Bump and Thrust'.",
          img: "/tree-imgs/aura_man.png",
          prev: 10,
          id: 11,
          value: 3,
        },
        {
          name: "List of the Fallen",
          description:
            "The first hit of the 'bump and thrust' skill stuns the enemy for 1.5 seconds",
          img: "/tree-imgs/chestplate.png",
          prev: 11,
          id: 12,
          value: 1,
        },
        {
          name: "Iron Will",
          description:
            "each level reduces the damage taken by 5% after activating the skill 'Bump and Thrust'.",
          img: "/tree-imgs/shield_with_yellow_arrow.png",
          prev: 12,
          id: 13,
          value: 3,
        },
        {
          name: "Melee attack",
          description: "Reduces damage taken in melee combat by 5%",
          img: "/tree-imgs/armored_man.png",
          prev: 13,
          id: 14,
          value: 3,
        },
        {
          name: "blind-spot",
          description:
            "'Bump and Thrust' causes enemies to be pushed back for a short time after each hit",
          img: "/tree-imgs/viewfinder.png",
          prev: 14,
          id: 15,
          value: 1,
        },
      ],
    },
  },
  {
    id: 26,
    name: "Xuanjia Heavy Cavalr",
    src: "/golden-units/Xuandzia.png",
    leadership: 295,
    masteryPoints: false,
    value: 10,
    era: "golden",
    icon: "/golden-icons/Star_Banner_Cavalry.png",
  },
  {
    id: 27,
    name: "Sunward Phalanx",
    src: "/golden-units/Soneczna_falanga.webp",
    leadership: 290,
    masteryPoints: false,
    value: 9,
    era: "golden",
    icon: "/golden-icons/Soneczna_falanga_icon.webp",
    type: ["infrantry", "antycav"],
    description: "Phalanx",
    season: { number: 7, name: "Season of fire" },
    tree: {
      img: "",
      maxlvl: 30,
      structure: [
        {
          name: "The Solider's Life",
          description: "Each level increases health by 3%",
          img: "/tree-imgs/hp.png",
          prev: null,
          id: 1,
          value: 3,
        },
        {
          name: "Cold Blood",
          description: "Each level increases piercing damage by 2%.",
          img: "/tree-imgs/2x_slash.png",
          prev: 1,
          id: 2,
          value: 3,
        },
        {
          name: "Force",
          description:
            "Each level increases piercing armour penetration by 5%.",
          img: "/tree-imgs/arrowhead_down.png",
          prev: 2,
          id: 3,
          value: 3,
        },
        {
          name: "Inner Energy",
          description:
            "Each level reduces Ares' Flurry's cooldown by 2 seconds.",
          img: "/tree-imgs/clock.png",
          prev: 3,
          id: 4,
          value: 3,
        },
        {
          name: "Battle Frenzy",
          description: "Each level increases Ares' Flurry's damage by 5%.",
          img: "/tree-imgs/aura_man.png",
          prev: 4,
          id: 5,
          value: 3,
        },
        {
          name: "Unwavering",
          description:
            "Each level increases Ares' Flurry's armor penetration by 10%.",
          img: "/tree-imgs/arrowhead_down.png",
          prev: 5,
          id: 6,
          value: 3,
        },
        {
          name: "Move as One",
          description: "Each level increases movement speed by 5%.",
          img: "/tree-imgs/stick_run.png",
          prev: 6,
          id: 7,
          value: 3,
        },
        {
          name: "Butcher's Bill",
          description: "Increases blocking by 120.",
          img: "/tree-imgs/striking_spear.png",
          prev: 7,
          id: 8,
          value: 1,
        },
        {
          name: "Zeus' Fury",
          description:
            "Ares Flurry has 30% chance to knock down the enemies units.",
          img: "/tree-imgs/armored_man.png",
          prev: 8,
          id: 9,
          value: 1,
        },
        {
          name: "Toughen Up",
          description: "Each level increases piercing defence by 3%.",
          img: "/tree-imgs/def_pircing.png",
          prev: 1,
          id: 10,
          value: 3,
        },
        {
          name: "Bloodbath",
          description: "Each level increases slashing defence by 3%.",
          img: "/tree-imgs/def_slashing.png",
          prev: 10,
          id: 11,
          value: 3,
        },
        {
          name: "Anti-Cavalry",
          description: "Each level increases damage dealt to cavalry by 5%.",
          img: "/tree-imgs/aura_man.png",
          prev: 11,
          id: 12,
          value: 3,
        },
        {
          name: "Resilient",
          description: "Each level reduces damage taken from cavalry by 5%.",
          img: "/tree-imgs/shield_with_arrow_up.png",
          prev: 12,
          id: 13,
          value: 3,
        },
        {
          name: "Anti-Cabalry",
          description: "Each level reduces damage taken during Brace by 5%.",
          img: "/tree-imgs/aura_man.png",
          prev: 13,
          id: 14,
          value: 3,
        },
        {
          name: "Melee Attack",
          description: "Each level increases brace weapon damage by 5%.",
          img: "/tree-imgs/def_slashing.png",
          prev: 14,
          id: 15,
          value: 3,
        },
        {
          name: "Spear Array",
          description:
            "Each level reduces damage taken from cavalry when using Brace-type skills by 15%.",
          img: "/tree-imgs/arrowhead_down.png",
          prev: 15,
          id: 16,
          value: 1,
        },
        {
          name: "Titanic",
          description: "Increases the number of enemies Brace can hit by +1.",
          img: "/tree-imgs/fire_hand.png",
          prev: 16,
          id: 17,
          value: 1,
        },
      ],
    },
  },
  {
    id: 28,
    name: "Lionroar Crew",
    src: "/golden-units/armaty.png",
    leadership: 310,
    masteryPoints: false,
    value: 9,
    era: "golden",
    icon: "/golden-icons/New_gold_unit.webp",
    type: ["ranged", "special"],
    description: "Cannons",
    season: {
      number: 22,
      name: "Warfare revolution",
    },
    tree: {
      img: "",
      maxlvl: 30,
      structure: [
        {
          name: "The Soldier's Life",
          description: "Each level increases unit health by 5%.",
          img: "/tree-imgs/hp.png",
          prev: null,
          id: 1,
          value: 3,
        },
        {
          name: "Better Bullets",
          description: "Each level increases ammo by 10%.",
          img: "/tree-imgs/ammo.png",
          prev: 1,
          id: 2,
          value: 3,
        },
        {
          name: "Large Bullets",
          description:
            "Each level increases the blunt armour penetration of projectiles by 5%.",
          img: "/tree-imgs/chestplate.png",
          prev: 2,
          id: 3,
          value: 3,
        },
        {
          name: "Optimizing",
          description:
            "Each level increases the blunt damage of projectiles by 5%.",
          img: "/tree-imgs/chestplate.png",
          prev: 3,
          id: 4,
          value: 3,
        },
        {
          name: "Hailstorm",
          description:
            "Each level increases the piercing defense of cannons by 3%.",
          img: "/tree-imgs/def_piercing.png",
          prev: 4,
          id: 5,
          value: 3,
        },
        {
          name: "Skillful Craftsmanship",
          description: "Each level increases the endurance of cannons by 3%.",
          img: "/tree-imgs/hp.png",
          prev: 5,
          id: 6,
          value: 3,
        },
        {
          name: "Corned Gunpowder",
          description: "Each level increases ammo by 10%.",
          img: "/tree-imgs/ammo.png",
          prev: 6,
          id: 7,
          value: 3,
        },
        {
          name: "Impact",
          description:
            "Increase 5 projectiles for one shot of the cannon. Unit identification changed to: Lionroar Crew - Suppression.",
          img: "/tree-imgs/striking_spear.png",
          prev: 7,
          id: 8,
          value: 1,
        },
        {
          name: "Toughen Up",
          description:
            "Each level increases the slashing defense of cannons by 3%.",
          img: "/tree-imgs/def_slashing.png",
          prev: 1,
          id: 9,
          value: 3,
        },
        {
          name: "Garrison",
          description: "Each level reduces ranged damage taken by 5%.",
          img: "/tree-imgs/def_slashing.png",
          prev: 9,
          id: 10,
          value: 3,
        },
        {
          name: "Toughness",
          description: "Each level increases piercing defense by 3%.",
          img: "/tree-imgs/def_piercing.png",
          prev: 10,
          id: 11,
          value: 3,
        },
        {
          name: "Repetition",
          description: "Each level increases available cannon by 1.",
          img: "/tree-imgs/armored_man.png",
          prev: 11,
          id: 12,
          value: 3,
        },
        {
          name: "Spirited Movement",
          description: "Each level increases movement speed by 3%.",
          img: "/tree-imgs/stick_run.png",
          prev: 12,
          id: 13,
          value: 3,
        },
        {
          name: "Group Training",
          description: "Each level increases reloading speed by 10%.",
          img: "/tree-imgs/clock.png",
          prev: 13,
          id: 14,
          value: 1,
        },
        {
          name: "Unity",
          description:
            "Increase cannon deployment speed by 3s. Unit identification changed to: Lionroar Crew - Contingent.",
          img: "/tree-imgs/striking_spear.png",
          prev: 14,
          id: 15,
          value: 1,
        },
      ],
    },
  },
];
