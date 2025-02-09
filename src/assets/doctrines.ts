export interface Doctrine {
  name: string;
  img: string;
  forUnit: string[];
  dedicated: "all" | "group" | "unit";
  stats: string;
}

export const epicDoctrines: Doctrine[] = [
  {
    name: "Barber-Surgeon's doctrine",
    img: "/doctrines/barber-surgeon-doctrine-new-s7.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Decreases total unit losses in the world by 30%",
  },
  {
    name: "Condottieri Guards Doctrine I",
    img: "/doctrines/condottieri-guards-doctrine-i.png",
    forUnit: ["Condottieri Guards"],
    dedicated: "unit",
    stats: "Reduces Shock Attacks cooldown by 3 seconds",
  },
  {
    name: "Fortebraccio Pikemens Doctrine II",
    img: "/doctrines/fortebraccio-pikemens-doctrine-ii.png",
    forUnit: ["Fortebraccio Pikemen"],
    dedicated: "unit",
    stats: "Increases armor penetration vs cavalry by 150",
  },
  {
    name: "Pavise Crossbowmens Doctrine I",
    img: "/doctrines/pavise-crossbowmens-doctrine-i.png",
    forUnit: ["Pavise Crossbowmen"],
    dedicated: "unit",
    stats: "Reduces melee damage taken by 80",
  },
  {
    name: "Falconettii Gunners Doctrine I",
    img: "/doctrines/falconettii-gunners-doctrine-i.png",
    forUnit: ["Falconetti Gunners"],
    dedicated: "unit",
    stats: "Increases shooting accuracy by 25%",
  },
  {
    name: "Janissaries Doctrine II",
    img: "/doctrines/janissaries-doctrine-ii.png",
    forUnit: ["Janissaries"],
    dedicated: "unit",
    stats: "Increases rate of fire by 8%",
  },
  {
    name: "Azaps Doctrine II",
    img: "/doctrines/pavise-crossbowmens-doctrine-i.png",
    forUnit: ["Azaps"],
    dedicated: "unit",
    stats: "Reduces On Watch cooldown by 4 seconds",
  },
  {
    name: "Silahdars Doctrine II",
    img: "/doctrines/sihladars-doctrine-ii.png",
    forUnit: ["Silahdars"],
    dedicated: "unit",
    stats: "Increases Get Over Here movement speed by 10%",
  },
  {
    name: "Sipahis Doctrine II",
    img: "/doctrines/siphahis-doctrine-ii.png",
    forUnit: ["Sipahis"],
    dedicated: "unit",
    stats: "Reduces short charge cooldown by 4 seconds",
  },
  {
    name: "Zykalian Supply Doctrine",
    img: "/doctrines/zykalian-militia-doctrine-i.png",
    forUnit: ["Zykalian Militia"],
    dedicated: "unit",
    stats: "Increases ammo by 20%",
  },
  {
    name: "Stalwarts Stamina Doctrine",
    img: "/doctrines/symmachean-stalwarts-doctrine-ii.png",
    forUnit: ["Symmachean Stalwarts"],
    dedicated: "unit",
    stats: "Reduces Advance's cooldown by 3 seconds",
  },
  {
    name: "Paladin Piety Doctrine",
    img: "/doctrines/symmachean-paladins-doctrine-ii.png",
    forUnit: ["Symmachean Paladins"],
    dedicated: "unit",
    stats: "Reduces Prayer's cooldown by 2 seconds",
  },
  {
    name: "Siphonarioi Hellfire Doctrine",
    img: "/doctrines/siphonarioi-doctrine-ii.png",
    dedicated: "unit",
    forUnit: ["Siphonarioi"],
    stats: "Increases flame duration by 2 seconds",
  },
  {
    name: "Epic Sword Doctrine II",
    img: "/doctrines/epic-sword-doctrine-ii.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Reduces charge cooldown by 20%",
  },
  {
    name: "Epic Polearm Doctrine I",
    img: "/doctrines/epic-polearm-doctrine-i.png",
    dedicated: "group",
    forUnit: ["Polearm Infantry"],
    stats:
      "Increases piercing damage by 80. Increases armor penetration by 120.",
  },
  {
    name: "Epic Javelin Doctrine III",
    img: "/doctrines/epic-javelin-doctrine-iii.png",
    dedicated: "group",
    forUnit: ["Javelin Infantry"],
    stats: "Increases javelin's block break by 200",
  },
  {
    name: "Epic Spear Doctrine II",
    img: "/doctrines/epic-spear-doctrine-ii.png",
    forUnit: ["Spear Infantry"],
    dedicated: "group",

    stats: "Increases block by 250. Increases block recovery by 200%",
  },
  {
    name: "Epic Archery Doctrine I",
    img: "/doctrines/epic-archery-doctrine-i.png",
    forUnit: ["Archers"],
    dedicated: "group",

    stats: "Increases weapons range by 5 meters.",
  },
  {
    name: "Epic Lance Doctrine I",
    img: "/doctrines/epic-lance-doctrine.png",
    forUnit: ["Lancers"],
    dedicated: "group",

    stats: "Increases charge damage by 225.",
  },
  {
    name: "Epic Mounted Archery Doctrine III",
    img: "/doctrines/epic-mounted-archery-doctrine-iii.png",
    dedicated: "group",
    forUnit: ["Mounted Archers"],
    stats: "Reduces enemy movement speed by 10% for 3 seconds when firing.",
  },
  {
    name: "Landsknecht's Charge Doctrine",
    img: "/doctrines/landsknechts-charge-doctrine.png",
    forUnit: ["Landsknechts"],
    dedicated: "unit",
    stats: "Reduces charge cooldown by 5 seconds.",
  },
  {
    name: "Armiger Lancers' Gallop Doctrine",
    img: "/doctrines/armiger-lancers-gallop-doctrine.png",
    forUnit: ["Armiger Lancers"],
    dedicated: "unit",
    stats: "Reduces the Gallop cooldown by 4 seconds.",
  },
  {
    name: "Liao's Rangers Melee Doctrine",
    img: "/doctrines/liaos-rangers-melee-doctrine.png",
    forUnit: ["Liaos Rangers"],
    dedicated: "unit",
    stats: "Every level reduces Bludgeon's cooldown by 3 seconds.",
  },
  {
    name: "Rangers Mobility Doctrine",
    img: "/doctrines/liaos-rangers-melee-doctrine.png",
    forUnit: ["Liaos Rangers"],
    dedicated: "unit",
    stats:
      "Increases Liao's Rangers movement speed by 7%. Gives a small improvement to the unit's resistance to ranged weapons.",
  },
  {
    name: "Siege Fighter Doctrine",
    img: "/doctrines/siege-fighter-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases damage inflicted in sieges by 100. The difference between siege damage and field damage is based on the map regardless of matchmaking or territory war modes.",
  },
  {
    name: "Open Ground Doctrine",
    img: "/doctrines/open-ground-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases damage inflicted in field battles by 100. The difference between siege damage and field damage is based on the map regardless of matchmaking or territory war modes.",
  },
  {
    name: "Logistics Doctrine",
    img: "/doctrines/logistics-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Reduces food consumption by 60%.",
  },
  {
    name: "Healing Arts Doctrine",
    img: "/doctrines/healing-arts-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "The unit can heal anywhere in the world at any time.",
  },
  {
    name: "Labor Doctrine",
    img: "/doctrines/labor-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",

    stats: "Increases labor by 0.05.",
  },
  {
    name: "Epic Assassination Doctrine",
    img: "/doctrines/epic-assassination-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases damage dealt to heroes by 115. If an Empyrean unit equips this Doctrine, the effect changes to: Increases damage vs heroes by 13%.",
  },
  {
    name: "Epic Battle Line Doctrine",
    img: "/doctrines/epic-battle-line-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases damage dealt to units by 125. If an Empyrean unit equips this Doctrine, the effect changes to: Increases damage vs units by 14%.",
  },
  {
    name: "Epic Sword Doctrine I",
    img: "/doctrines/epic-sword-doctrine-i.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Increases slashing damage by 70. Increases blunt damage by 70.",
  },
  {
    name: "Epic Sword Doctrine III",
    img: "/doctrines/epic-sword-doctrine-iii.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Increases charge damage by 180.",
  },
  {
    name: "Epic Sword Doctrine IV",
    img: "/doctrines/epic-sword-doctrine-iv.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Unlocks Ironsides. Increases piercing, slashing, and blunt defence by 150 for 10 seconds.",
  },
  {
    name: "Epic Spear Doctrine I",
    img: "/doctrines/epic-spear-doctrine-i.png",
    forUnit: ["Spear Infantry"],
    dedicated: "group",
    stats: "Increases block by 400.",
  },

  {
    name: "Epic Spear Doctrine III",
    img: "/doctrines/epic-spear-doctrine-iii.png",
    forUnit: ["Spear Infantry"],

    dedicated: "group",
    stats:
      "Increases slashing defence by 100. Increases piercing defence by 100. Increases blunt defence by 100",
  },
  {
    name: "Epic Spear Doctrine IV",
    img: "/doctrines/epic-spear-doctrine-iv.png",
    forUnit: ["Spear Infantry"],
    dedicated: "group",
    stats: "Reduces damage taken by 30.",
  },
  {
    name: "Epic Spear Doctrine V",
    img: "/doctrines/epic-spear-doctrine-v.png",
    forUnit: ["Spear Infantry"],
    dedicated: "group",
    stats:
      "Unlocks Regeneration. Restores 150 health every second for 10 seconds.",
  },
  {
    name: "Epic Polearm Doctrine II",
    img: "/doctrines/epic-polearm-doctrine-ii.png",
    forUnit: ["Polearm Infantry"],
    dedicated: "group",
    stats: "Bracing weapons stuns enemies.",
  },
  {
    name: "Epic Polearm Doctrine III",
    img: "/doctrines/epic-polearm-doctrine-iii.png",
    forUnit: ["Polearm Infantry"],
    dedicated: "group",
    stats:
      "Allows the unit to use Charge order, but does not deal extra damage.",
  },
  {
    name: "Epic Archery Doctrine II",
    img: "/doctrines/epic-archery-doctrine-ii.png",
    forUnit: ["Archers"],
    dedicated: "group",
    stats:
      "Increases piercing damage by 100. Increases armour penetration by 50.",
  },
  {
    name: "Epic Archery Doctrine III",
    img: "/doctrines/epic-archery-doctrine-iii.png",
    forUnit: ["Archers"],
    dedicated: "group",
    stats: "Increases ammo by 50%.",
  },
  {
    name: "Epic Archery Doctrine V",
    img: "/doctrines/epic-archery-doctrine-v.png",
    forUnit: ["Archers"],
    dedicated: "group",
    stats:
      "Unlocks Arrow Rain, deals 65% of the unit's base piercing damage with each hit.",
  },

  {
    name: "Epic Archery Doctrine IV",
    img: "/doctrines/epic-archery-doctrine-iv.png",
    forUnit: ["Archers"],
    dedicated: "group",

    stats: "Increases piercing damage by 100.",
  },
  {
    name: "Epic Arquebus Doctrine I",
    img: "/doctrines/epic-arquebus-doctrine-i.png",
    forUnit: ["Arquebusiers"],
    dedicated: "group",
    stats: "Increases shooting accuracy by 20%.",
  },
  {
    name: "Epic Arquebus Doctrine II",
    img: "/doctrines/epic-arquebus-doctrine-ii.png",
    dedicated: "group",
    forUnit: ["Arquebusiers"],

    stats: "Increases rate of fire by 16%.",
  },
  {
    name: "Epic Arquebus Doctrine III",
    img: "/doctrines/epic-arquebus-doctrine-iii.png",
    forUnit: ["Arquebusiers"],

    dedicated: "group",
    stats:
      "Increases slashing defence by 50. Increases piercing defence by 50. Increases blunt defence by 50. Increases health by 100",
  },

  {
    name: "Epic Crossbow Doctrine I",
    img: "/doctrines/epic-crossbow-doctrine-i.png",
    forUnit: ["Crossbowmen"],
    dedicated: "group",

    stats: "Increases ammo by 25%.",
  },

  {
    name: "Epic Crossbow Doctrine II",
    img: "/doctrines/epic-crossbow-doctrine-ii.png",
    forUnit: ["Crossbowmen"],

    dedicated: "group",
    stats:
      "Increases piercing damage by 50. Increases armour penetration by 200.",
  },
  {
    name: "Epic Crossbow Doctrine III",
    img: "/doctrines/epic-crossbow-doctrine-iii.png",
    forUnit: ["Crossbowmen"],
    dedicated: "group",
    stats: "Increases rate of fire by 23%.",
  },
  {
    name: "Epic Crossbow Doctrine IV",
    img: "/doctrines/epic-crossbow-doctrine-iv.png",
    dedicated: "group",
    forUnit: ["Crossbowmen"],
    stats: "Increases shooting accuracy by 20%.",
  },
  {
    name: "Epic Crossbow Doctrine V",
    img: "/doctrines/epic-crossbow-doctrine-v.png",
    forUnit: ["Crossbowmen"],
    dedicated: "group",
    stats:
      "Unlocks Double Shot. Fires 2 arrows per shot for 8 seconds. Cannot be used with Focus Fire. Cooldown 45 seconds. Rattan Marksmen with this doctrine gain a passive enabling them to launch one extra arrow with every shot.",
  },
  {
    name: "Epic Javelin Doctrine I",
    img: "/doctrines/epic-javelin-doctrine-i.png",
    forUnit: ["Javelin Infantry"],
    dedicated: "group",
    stats: "Increases javelin damage by 180.",
  },
  {
    name: "Epic Javelin Doctrine II",
    img: "/doctrines/epic-javelin-doctrine-ii.png",
    dedicated: "group",
    forUnit: ["Javelin Infantry"],
    stats:
      "Increases piercing damage by 60. Increases armour penetration by 180.",
  },
  {
    name: "Epic Immobility Doctrine",
    img: "epic2.png",
    forUnit: ["Javelin Infantry"],
    dedicated: "group",
    stats: "Javelins render enemies immobile for 1.5 seconds.",
  },
  {
    name: "Epic Lance Doctrine II",
    img: "/doctrines/epic-lance-doctrine-ii.png",
    forUnit: ["Lancers"],
    dedicated: "group",

    stats: "Reduces damage taken while charging by 40%.",
  },
  {
    name: "Epic Lance Doctrine III",
    img: "/doctrines/epic-lance-doctrine-iii.png",
    forUnit: ["Lancers"],
    dedicated: "group",

    stats: "Reduces charge cooldown by 10 seconds.",
  },
  {
    name: "Epic Sword Cavalry Doctrine",
    img: "/doctrines/epic-melee-cavalry-doctrine.png",
    forUnit: ["Sword Cavalry"],
    dedicated: "group",

    stats: "Increases damage dealt to infantry by 150.",
  },
  {
    name: "Epic Mounted Archery Doctrine I",
    img: "/doctrines/epic-mounted-archery-doctrine-i.png",
    forUnit: ["Mounted Archers"],
    dedicated: "group",

    stats: "Increases shooting accuracy by 50%.",
  },
  {
    name: "Epic Mounted Archery Doctrine II",
    img: "/doctrines/epic-mounted-archery-doctrine-ii.png",
    dedicated: "group",
    forUnit: ["Mounted Archers"],
    stats: "When shooting, there is a 10% chance to fire flaming arrows.",
  },
  {
    name: "Epic Mobility Doctrine",
    img: "/doctrines/epic-mobility-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Unlocks Sprint. Increases movement speed by 15% for 8 seconds.",
  },
  {
    name: "Anti-Cavalry Doctrine",
    img: "/doctrines/anti-cavalry-doctrine.png",
    forUnit: ["Sword & Shield Infantry", "Polearm Infantry"],
    dedicated: "group",
    stats: "Increases damage versus cavalry by 120.",
  },
  {
    name: "Sharpshooter's Doctrine",
    img: "/doctrines/sharpshooter-doctrine.png",
    forUnit: ["Archer Infantry", "Firearm Infantry"],
    dedicated: "group",
    stats:
      "Increases damage against heavy shielded units (spear units and Pavise Crossbowmen) by 350.",
  },
  {
    name: "Resist Arrow Doctrine",
    img: "/doctrines/resist-arrow-doctrine.png",
    forUnit: ["Cavalry", "Melee Infantry"],
    dedicated: "group",
    stats:
      "Reduces damage taken from arrows by 100. Increases damage dealt to ranged units by 100",
  },
  {
    name: "Berserker's Doctrine",
    img: "/doctrines/berserkers-doctrine.png",

    dedicated: "unit",
    forUnit: ["Berserkers"],
    stats: "Increases health by 360. Reduces ranged damage taken by 50.",
  },
  {
    name: "Attack Doctrine",
    img: "/doctrines/attack-doctrine.png",
    forUnit: ["Shieldmaidens"],
    dedicated: "unit",
    stats: "Reduces Freyja's Charge cooldown by 5 seconds.",
  },
  {
    name: "Epic Piercing Doctrine",
    img: "/doctrines/epic-piercing-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Javelineers",
      "Spearman",
      "Pikemen",
      "Halberdiers",
      "Ranged Infantry",
      "Cavalry",
    ],
    stats: "Increases Piercing Armor penetration by 110.",
  },
  {
    name: "Epic Slashing Doctrine",
    img: "/doctrines/epic-slashing-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Halberdiers",
      "Cavalry",
      "Sword & Shield Infantry",
      "Tercio Arquebusiers",
    ],
    stats: "Increases Slashing Armor penetration by 110.",
  },
  {
    name: "Epic Blunt Doctrine",
    img: "/doctrines/epic-blunt-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Spearman",
      "Sword & Shield Infantry",
      "Iron Reapers",
      "Fire Lancers",
    ],
    stats: "Increases Blunt Armor penetration by 110.",
  },
  {
    name: "Epic Slashing Damage Doctrine",
    img: "/doctrines/epic-slashing-damage-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Halberdiers",
      "Cavalry",
      "Sword & Shield Infantry",
      "Tercio Arquebusiers",
    ],

    stats: "Increases Slashing damage by 90.",
  },
  {
    name: "Epic Piercing Damage Doctrine",
    img: "/doctrines/epic-piercing-damage-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Javelineers",
      "Spearman",
      "Pikemen",
      "Halberdiers",
      "Ranged Infantry",
      "Cavalry",
    ],
    stats: "Increases Piercing damage by 90.",
  },

  {
    name: "Epic Blunt Damage Doctrine",
    img: "/doctrines/epic-blunt-damage-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Spearman",
      "Sword & Shield Infantry",
      "Iron Reapers",
      "Fire Lancers",
    ],

    stats: "Increases Blunt damage by 90.",
  },
  {
    name: "Epic Life Doctrine",
    img: "/doctrines/epic-life-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases health by 360.",
  },
  {
    name: "Epic Piercing Defence Doctrine",
    img: "/doctrines/epic-piercing-defence-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases Piercing defence by 105.",
  },
  {
    name: "Epic Slashing Defence Doctrine",
    img: "/doctrines/epic-slashing-defence-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases Slashing defence by 105.",
  },
  {
    name: "Epic Blunt Defence Doctrine",
    img: "/doctrines/epic-blunt-defence-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases Blunt defence by 105.",
  },
  {
    name: "Epic Arquebus Doctrine IV",
    img: "/doctrines/epic-arquebus-doctrine-iv.png",
    forUnit: ["Arquebusiers"],
    dedicated: "group",
    stats: "Allows the unit to move and fire.",
  },
  {
    name: "Assault Doctrine",
    img: "/doctrines/berserkers-doctrine.png",
    forUnit: ["Berserkers"],
    dedicated: "unit",
    stats: "Reduces Berserker Cooldown by 20%.",
  },
  // {
  //   name: "Guardian Doctrine",
  //   img: "/doctrines/guardian-doctrine.png",
  //   forUnit: ["Shieldmaidens"],
  //   dedicated: "unit",
  //   stats: "Reduces Guardian cooldown by 5 seconds.",
  // },
  {
    name: "Greyhair Doctrine II",
    img: "/doctrines/greybeard-doctrine-main.png",
    forUnit: ["Greyhair Garrison"],
    dedicated: "unit",
    stats:
      "Increases slashing damage by 110 points. Increases piercing damage by 110 points. Increases blunt damage by 110 points.",
  },
  {
    name: "Greyhair Doctrine I",
    img: "/doctrines/greybeard-doctrine-main.png",
    forUnit: ["Greyhair Garrison"],
    dedicated: "unit",
    stats: "Increases health by 600 points.",
  },
  {
    name: "Modao Doctrine I",
    img: "/doctrines/modao-doctrine.png",
    forUnit: ["Modao Battalion"],
    dedicated: "unit",
    stats: "Increases damage versus cavalry by 200 points.",
  },
  {
    name: "Modao Doctrine II",
    img: "/doctrines/modao-doctrine.png",
    forUnit: ["Modao Battalion"],
    dedicated: "unit",
    stats: "The unit's ability to stop cavalry is increased by 1 second.",
  },

  {
    name: "Shenji Doctrine II",
    img: "/doctrines/shenji-doctrine-ii.png",
    forUnit: ["Shenji Grenadiers"],
    dedicated: "unit",
    stats: "Grenade explosions will now halt enemy cavalry within 4 meters.",
  },
  {
    name: "Agility Doctrine",
    img: "/doctrines/axe-doctrine.png",
    dedicated: "unit",
    forUnit: ["Axe Raiders"],

    stats: "Reduces melee damage taken by 75 points.",
  },
  {
    name: "Axe Doctrine",
    img: "/doctrines/axe-doctrine.png",
    forUnit: ["Axe Raiders"],
    dedicated: "unit",

    stats: "The Double Axe skill can now knock down enemy soldiers.",
  },

  {
    name: "Shenji Doctrine I",
    img: "/doctrines/shenji-doctrine-ii.png",
    forUnit: ["Shenji Grenadiers"],

    dedicated: "unit",
    stats: "Reduces Throw Grenades's cooldown by 2 seconds.",
  },
  {
    name: "Wild Rovers",
    img: "/doctrines/wild-rovers.png",
    forUnit: ["Claymores"],

    dedicated: "unit",
    stats:
      "Reduces the cooldown of Highland Charge and For Freedom by 2 seconds.",
  },
  {
    name: "Highlanders",
    img: "/doctrines/wild-rovers.png",
    forUnit: ["Claymores"],
    dedicated: "unit",

    stats: "Increases 'Claymore Strike' damage by 5%.",
  },
  {
    name: "Houndsmen Hunter Doctrine",
    img: "/doctrines/houndsmen-hunter-doctrine.png",
    forUnit: ["Houndsmen"],
    dedicated: "unit",

    stats: "Increases the bleed damage of the Hunter's Will by 100 points.",
  },
  {
    name: "Houndsmen Kennel Doctrine",
    img: "/doctrines/houndsmen-hunter-doctrine.png",
    forUnit: ["Houndsmen"],
    dedicated: "unit",

    stats: "Increases Loyal Hound's Slow effect duration by 3 seconds.",
  },
  {
    name: "Huskarl Raider Doctrine",
    img: "/doctrines/huskarl-raider-doctrine.png",
    dedicated: "unit",
    forUnit: ["Huskarl"],

    stats:
      "Increases movement speed of Huskarls by 10%. Increases Sea Surge's Damage by 15%. Increases Huskarl Charge's damage by 15%.",
  },
  {
    name: "Chevaliers Lance Doctrine",
    img: "/doctrines/chevaliers-defence-doctrine.png",
    dedicated: "unit",
    forUnit: ["Chevaliers"],

    stats: "Increases Piercing Armor Penetration by 150 points.",
  },
  {
    name: "Chevaliers Defence Doctrine",
    img: "/doctrines/chevaliers-defence-doctrine.png",
    dedicated: "unit",
    forUnit: ["Chevaliers"],

    stats: "Increases all defence values by 100 points.",
  },
  {
    name: "Banner Guards' Battle Doctrine",
    img: "/doctrines/banner-guards-morale-doctrine.png",
    forUnit: ["Banner Guards"],
    dedicated: "unit",

    stats: "Increases Banner Guards' Block by 300 points.",
  },
  {
    name: "Banner Guards' Morale Doctrine",
    img: "/doctrines/banner-guards-morale-doctrine.png",
    forUnit: ["Banner Guards"],
    dedicated: "unit",

    stats: "Reduces Indomitable cooldown by 5 seconds.",
  },
  {
    name: "Huskarl Formation Doctrine",
    img: "/doctrines/huskarl-raider-doctrine.png",
    forUnit: ["Huskarl"],
    dedicated: "unit",

    stats: "Reduces Boar Snout cooldown by 1 second.",
  },
  {
    name: "Varangian Axe Doctrine",
    img: "/doctrines/varangian-axe-doctrine.png",
    forUnit: ["Varangian Guards"],
    dedicated: "unit",

    stats: "Increases Shatter Shield's damage by 10%.",
  },
  {
    name: "Pike Defence Doctrine",
    img: "/doctrines/pike-defence-doctrine.png",
    dedicated: "group",
    forUnit: [
      "Pike Militia",
      "Fortebraccio Pikemen",
      "Village Watchmen",
      "Demesne Pikemen",
      "Halberdiers",
      "Halberdier Sergeants",
      "Landsknechts",
    ],

    stats:
      "Reduces damage taken from cavalry when using Brace-type skills by 30%.",
  },
  {
    name: "Fearless Charge Doctrine",
    img: "/doctrines/fearless-charge-doctrine.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Damage taken is reduced by 30% while charging.",
  },
  {
    name: "Cavalry Assault Doctrine",
    img: "/doctrines/cavalry-assault-doctrine.png",
    forUnit: ["Sword Cavalry"],
    dedicated: "group",
    stats:
      "Deal 20% increased damage to cavalry units. Deal 20% reduced damage to ranged and melee infantry units.",
  },
  // {
  //   name: "Varangian Sword Doctrine II",
  //   img: "/doctrines/varangian-axe-doctrine.png",
  //   forUnit: ["Varangian Guards"],
  //   dedicated: "unit",

  //   stats: "Reduces Varangian Guards' melee damage taken by 5%.",
  // },
  {
    name: "Myrmillones Morale Doctrine",
    img: "/logo.png",
    forUnit: ["Myrmillones"],
    stats: "Reduces Myrmillo's Guard's cooldown by 5 seconds.",
    dedicated: "unit",
  },
  {
    name: "Retiarii Assault Doctrine",
    img: "/logo.png",
    dedicated: "unit",
    forUnit: ["Retiarii"],
    stats: "Reduces Spearfishing cooldown by 5 seconds.",
  },
  {
    name: "Camel Lancer Defence Doctrine",
    img: "/logo.png",
    forUnit: ["Camel Lancers"],
    dedicated: "unit",
    stats:
      "Increases slashing defence by 80 points. Increases piercing defence by 80 points. Increases blunt defence by 80 points.",
  },
  {
    name: "Hashashin Combat Doctrine",
    img: "/logo.png",
    forUnit: ["Hashashins"],
    dedicated: "unit",
    stats:
      "Increases the number of enemies each Hashashin can attack wit ha single normal strike by 1.",
  },
  {
    name: "Epic Spear Doctrine VI",
    img: "/Epic-polearm-doctrine-vi.png",
    forUnit: ["Spear Infantry"],
    dedicated: "group",
    stats:
      "Unlocks Stand Fast. Gives control immunity for 2.5 seconds. Cooldown lasts 60 seconds.",
  },
  {
    name: "Epic Valor Doctrine",
    img: "/epic5.png",
    forUnit: ["TODO"],
    dedicated: "unit",

    stats:
      "Adds 200 Health points to the unit, and reduces damage taken by 3%.",
  },
  {
    name: "Epic Damage Doctrine",
    img: "/logo.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 200. Increases slashing damage by 90. Increases piercing damage by 90. Increases blunt damage by 90.",
  },
  {
    name: "Epic Penetration Doctrine",
    img: "/logo.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 200. Increases slashing armor penetration by 70. Increases piercing armor penetration by 70. Increases blunt armor penetration by 70.",
  },
  {
    name: "Epic Ammo Doctrine",
    img: "/epic4.png",
    forUnit: ["TODO"],
    dedicated: "unit",
    stats: "Increases health by 300. Increases ammo by 15%.",
  },
  {
    name: "Epic Movement Doctrine",
    img: "/epic3.png",
    forUnit: ["TODO"],
    dedicated: "unit",
    stats: "Increases health by 300. Increases movement speed by 10%.",
  },
  {
    name: "Health & Defence Doctrine V (Piercing)",
    img: "/doctrines/health-&-defence-doctrine-v-piercing.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 440 points. Increases piercing defence by 125 points.",
  },
  {
    name: "Health & Defence Doctrine V (Slashing)",
    img: "/doctrines/health-&-defence-doctrine-v-slashing.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 440 points. Increases slashing defence by 125 points.",
  },
  {
    name: "Health & Defence Doctrine V (Blunt)",
    img: "/doctrines/health-&-defence-doctrine-v-blunt-thumb.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 440 points. Increases blunt defence by 125 points.",
  },
  {
    name: "Health & Defence Doctrine V (All)",
    img: "/doctrines/health-&-defence-doctrine-v-all.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 440 points. Increases all defences by 40 points.",
  },
  {
    name: "Health & Labor Doctrine V",
    img: "/doctrines/health-&-labor-doctrine-v.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases health by 440 points. Increases labor by 0.07 points per living soldier in the unit.",
  },
  {
    name: "Food & Medicine Doctrine V",
    img: "/doctrines/food-&-medicine-doctrine-v.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Reduces food consumption by 60%. Decreases total unit permanent losses from open world battles by 40%. The unit can heal injured soldiers in any fief and in the open world via their unit profile screen",
  },
  {
    name: "Health & Resistance Doctrine V",
    img: "/doctrines/health-&-resistance-doctrine-v.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases health by 300 points. Reduces damage taken by 5%.",
  },
  {
    name: "Defence Doctrine V",
    img: "/doctrines/defence-doctrine-v.png",
    dedicated: "all",
    forUnit: ["all"],
    stats: "Increases all defences by 80 points. Reduces damage taken by 5%.",
  },
  {
    name: "Iron Charge Doctrine V",
    img: "/doctrines/iron-charge-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Reduces damage taken while charging by 14%. Unlocks Ironsides: increases piercing, slashing, and blunt defence by 175 points for 12 seconds.",
  },
  {
    name: "Assault Doctrine V",
    img: "/doctrines/assault-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Reduces damage taken while charging by 40%.",
  },
  {
    name: "Stamina Doctrine V",
    img: "/doctrines/stamina-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Reduces charge cooldown by 24%. Increases the number of charge targets by 1.",
  },
  {
    name: "Mobility Doctrine V",
    img: "/doctrines/mobility-doctrine-v.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases movement speed by 7% Unlocks Sprint: increases movement speed by 15% for 12 seconds.",
  },
  {
    name: "Unit Damage Doctrine V",
    img: "/doctrines/unit-damage-doctrine-v.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases damage dealt to unit by 120 points. Increases all types of damage by 80 points.",
  },
  {
    name: "Hero Damage Doctrine V",
    img: "/doctrines/hero-damage-doctrine-v.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases damage dealt to heroes by 115 points. Increases all armor penetration by 110 points.",
  },
  {
    name: "Iron Health Doctrine V",
    img: "/doctrines/iron-health-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Increases health by 300 points. Unlocks Ironsides: increases piercing, slashing, and blunt defence by 175 points for 12 seconds.",
  },
  {
    name: "Iron Damage Doctrine V",
    img: "/doctrines/iron-damage-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Unlocks Ironsides: increases piercing, slashing, and blunt defence by 175 points for 12 seconds. Also, while skill is in effect all types of damage are increased by 120 points.",
  },
  {
    name: "Charge Doctrine V",
    img: "/doctrines/charge-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Increases charge damage by 250 points. Increases charge's block break by 450 points.",
  },
  {
    name: "Anti-Infantry Doctrine V",
    img: "/doctrines/anti-infantry-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Increases damage dealt to infantry by 200 points. Increases block by 250 points.",
  },
  {
    name: "Anti-Cavalry Doctrine V",
    img: "/doctrines/anti-cavalry-doctrine-v.png",
    forUnit: ["Halberdiers"],
    dedicated: "group",

    stats:
      "Reduces damage taken from cavalry when using Brace-type skills by 40%. Increases damage versus cavalry while bracing by 16%.",
  },
  {
    name: "Slow Doctrine V",
    img: "/doctrines/slow-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Halberdiers"],
    stats:
      "Increases slow effects on cavalry by 15%. Increases damage dealt to cavalry by 10%.",
  },
  {
    name: "Javelin Attack Doctrine V",
    img: "/doctrines/javelin-attack-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Javelin Infantry"],
    stats:
      "Increases javelin's block break by 300 points. Increases piercing damage by 100 points",
  },
  {
    name: "Javelin Damage Doctrine V",
    img: "/doctrines/javelin-damage-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Javelin Infantry"],
    stats: "Increases javelin damage by 250 points. Increases ammo by 30.",
  },
  {
    name: "First Aid Doctrine V",
    img: "/doctrines/first-aid-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Spear Infantry"],
    stats:
      "Reduces damage taken when armor pierced by 35%. Unlocks Regeneration: regenerates 150 health every for 15 seconds.",
  },
  {
    name: "Awareness Doctrine V",
    img: "/doctrines/awareness-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Spear Infantry"],
    stats:
      "Reduces damage taken from cavalry charges by 500 points. Reduces damage taken from rear attacks by 20%.",
  },
  {
    name: "Defence Doctrine V (Shields)",
    img: "/doctrines/defence-doctrine-v-shields.png",
    dedicated: "group",
    forUnit: ["Spear Infantry"],
    stats: "Increases all defences by 130 points. Reduces damage taken by 6%.",
  },
  {
    name: "Block Doctrine V",
    img: "/doctrines/block-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Spear Infantry"],
    stats: "Increases block by 300 points. Reduces damage taken by 90 points.",
  },
  {
    name: "Bowmanship Doctrine V",
    img: "/doctrines/bowmanship-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Archers"],
    stats:
      "Arrow Rain deals 75% of the unit's base piercing damage with each hit. Increases piercing damage by 150 points.",
  },
  {
    name: "Bowstring Doctrine V",
    img: "/doctrines/bowstring-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Archers"],
    stats: "Increases weapons range by 9 meters. Increases rate of fire by 9%.",
  },
  {
    name: "Projectile Doctrine V",
    img: "/doctrines/projectile-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Archers"],
    stats:
      "Increases ammo by 60%. Increases piercing armor penetration by 50 points.",
  },
  {
    name: "Precision Doctrine V",
    img: "/doctrines/precision-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Archers"],
    stats:
      "Increases piercing damage by 120 points. Increases piercing armor penetration by 80 points. Increases rate of fire by 9%.",
  },
  {
    name: "Fire Discipline Doctrine V",
    img: "/doctrines/fire-discipline-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Arquebusiers"],
    stats:
      "Increases rate of fire by 20%. Increases damage dealt to cavalry by 8%.",
  },
  {
    name: "Gun Defence Doctrine V",
    img: "/doctrines/gun-defence-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Arquebusiers"],
    stats:
      "Increases all defences by 60 points. Increases health by 200 points. Increases ammo by 10%.",
  },
  {
    name: "Lancer Charge Doctrine V",
    img: "/doctrines/lancer-charge-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Lancers"],
    stats:
      "Reduces charge cooldown 14 seconds. Increases piercing damage by 100 points.",
  },
  {
    name: "Pressure Doctrine V",
    img: "/doctrines/pressure-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Lancers"],
    stats:
      "Reduces damage taken while charging by 50%. Reduces charge cooldown by 6 seconds.",
  },
  {
    name: "Aggression Doctrine V",
    img: "/doctrines/aggression-doctrine-v.png",
    forUnit: ["Lancers"],
    dedicated: "group",
    stats:
      "Reduces damage taken while charging by 50%. Increases movement speed by 9%.",
  },
  {
    name: "Double Fire Doctrine V",
    img: "/doctrines/double-fire-doctrine-v.png",
    forUnit: ["Crossbowmen"],
    dedicated: "group",
    stats:
      "Unlocks Double Fire. Cannot be used with Focus Fire. Cooldown lasts 45 seconds. Increases rate of fire by 12%.",
  },
  {
    name: "Gunsight Doctrine V",
    img: "/doctrines/gunsight-doctrine-v.png",
    forUnit: ["Crossbowmen"],
    dedicated: "group",
    stats:
      "Increases shooting accuracy by 40%. Increases piercing damage by 80 points.",
  },
  {
    name: "New Ammo Doctrine V",
    img: "/doctrines/new-ammo-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Crossbowmen"],
    stats: "Increases ammo by 35%. Increases amor penetration by 140 points.",
  },
  {
    name: "Sword Battle Doctrine V",
    img: "/doctrines/sword-battle-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Sword Cavalry"],
    stats:
      "Increases movement speed by 30%. Increases slashing damage by 90 points. Increases slashing armor penetration by 60",
  },
  {
    name: "Carnage Doctrine V",
    img: "/doctrines/carnage-doctrine-v.png",
    dedicated: "group",
    forUnit: ["Sword Cavalry"],
    stats:
      "Increases damage dealt to infantry by 250 points. Reduces charge cooldown by 7 seconds.",
  },
  {
    name: "Incendiary Doctrine V",
    img: "/doctrines/incendiary-doctrine-v.png",
    forUnit: ["Mounted Archers"],
    dedicated: "group",
    stats:
      "When shooting, there is a 30% chance to fire flaming arrows. Increases rate of fire by 9%.",
  },
  {
    name: "Spoiler Doctrine V",
    img: "/doctrines/spoiler-doctrine-v.png",
    forUnit: ["Mounted Archers"],
    dedicated: "group",
    stats:
      "Reduces enemy movement speed by 20% for 3 seconds. Increases rate of fire by 9%.",
  },
  {
    name: "Crescent Monks Medical Doctrine",
    img: "/logo.png",
    forUnit: ["Crescent Monks"],
    dedicated: "unit",
    stats:
      "Deadly Epicycle's first hit will restore small amount of health on self.",
  },
  {
    name: "Yanyuedao Resistance Doctrine",
    img: "/logo.png",
    forUnit: ["Yanyuedao Cavalry"],
    dedicated: "unit",
    stats: "While using Mounting Dread, all damage taken is reduced by 15%.",
  },
  {
    name: "Onna-musha Blood Doctrine",
    img: "/logo.png",
    forUnit: ["Onna-musha"],
    dedicated: "unit",
    stats: "Normal attacks apply a 15% health drain effect.",
  },
  {
    name: "Samurai Assault Doctrine",
    img: "/logo.png",
    forUnit: ["Orochi Samurai"],
    dedicated: "unit",
    stats: "Increases Double Strike damage by 15%.",
  },
  {
    name: "Kriegsbruders Battle Doctrine",
    img: "/logo.png",
    forUnit: ["Kriegsruders"],
    dedicated: "unit",
    stats: "Reduces Full Assault's cooldown by 5 seconds.",
  },
  {
    name: "Zweihander Stamina Doctrine",
    img: "/logo.png",
    forUnit: ["Zweihanders"],
    dedicated: "unit",
    stats: "Each level reduces Knight's Gampit's cooldown by 4 seconds.",
  },
  {
    name: "Perceval's Shield Doctrine",
    img: "/logo.png",
    forUnit: ["Perceval"],
    dedicated: "unit",
    stats: "Double the block breaking effect of Charge & Throw.",
  },
  {
    name: "Queen's Knight Battle Doctrine",
    img: "/logo.png",
    forUnit: ["Queens Knights"],
    dedicated: "unit",
    stats: "Block cannot be damaged within 2 seconds of using Run'Em Through.",
  },
  {
    name: "Mansion Guard Medical Doctrine",
    img: "/logo.png",
    forUnit: ["Wuwei Mansion Guard"],
    dedicated: "unit",
    stats: "Using Brutal Sweep restores 10% maximum health.",
  },
  {
    name: "Xuanjia Cavalry Damage Doctrine",
    img: "/logo.png",
    forUnit: ["Xuanjia Heavy Cavalry"],
    dedicated: "unit",
    stats: "Reduces damage taken by 8%",
  },
  {
    name: "Conquest",
    img: "/logo.png",
    forUnit: ["Companion Cavalry"],
    dedicated: "unit",
    stats:
      " Increases the movement speed of hero by 8% as well as piercing, slashing, and blunt damage by 100 for 18 seconds.",
  },
  {
    name: "Overwhelm",
    img: "/logo.png",
    forUnit: ["Sunward Phalanx"],
    dedicated: "unit",
    stats:
      "Unlocks : Divine Gaze, Creates semi-circular totem of 8 meters at distance of 50 meters in any direction. Enemies within ranfe gain a stack of Expose, sracking ip to 10 times, Stacks are lose after 5 seconds. The Sunward Phalanx deals 40$ increased damage aginst enemies with 5 stacks of Expose. Base cooldown: 50 seconds. Base duration: 15 seconds.",
  },
  {
    name: "Lionroar Crew - Veteran",
    img: "/logo.png",
    forUnit: ["Lionroar Crew"],
    dedicated: "unit",
    stats: "Reduces the time of deploying cannon by 2 seconds.",
  },
  {
    name: "Divine Wrath",
    img: "/logo.png",
    forUnit: ["Spartan Chosen"],
    dedicated: "unit",
    stats:
      "When the Spartan Chosen build full momentum, their normal and formation attacks can knock down enemy units",
  },
];
export const rareDoctrines: Doctrine[] = [
  {
    name: "Breakthrough Doctrine",
    img: "/doctrines/breakthrough-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases Damage Dealt to units by 95 If an Empyrean unit equips this Doctrine, the effect changes to: Increases damage vs units by 10%. True damage applied to every hit. It is better than standard piercing/slashing/blunt damage doctrines on low ability multipliers.",
  },
  {
    name: "Assassination Doctrine",
    img: "/doctrines/assassination-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases Damage Dealt to heroes by 85 If an Empyrean unit equips this Doctrine, the effect changes to: Increases damage vs units by 9%. True damage applied to every hit. It is better than standard piercing/slashing/blunt damage doctrines on low ability multipliers.",
  },
  {
    name: "Rare Archery Doctrine",
    img: "/doctrines/rare-archery-doctrine.png",
    forUnit: ["Archers"],
    dedicated: "group",
    stats: "Increases shooting accuracy by 10%.",
  },
  {
    name: "Rare Lance Doctrine",
    img: "/doctrines/rare-lance-doctrine.png",
    forUnit: ["Lancers"],
    dedicated: "group",
    stats: "Increases movement speed by 6%.",
  },
  {
    name: "Rare Mounted Archery Doctrine",
    img: "/doctrines/rare-mounted-archery-doctrine.png",
    forUnit: ["Mounted Archers"],
    dedicated: "group",
    stats: "Increases ammo by 15%.",
  },
  {
    name: "Rare Polearm Doctrine I",
    img: "/doctrines/rare-polearm-doctrine-i.png",
    forUnit: ["Polearm Infantry"],
    dedicated: "group",
    stats: "Increases damage while bracing by 100.",
  },
  {
    name: "Rare Sword Doctrine II",
    img: "/doctrines/rare-sword-doctrine-ii.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Reduces damage taken by 10%.",
  },
  {
    name: "Rare Sword Doctrine",
    img: "/doctrines/rare-sword-doctrine.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats: "Increases block by 140.",
  },
  {
    name: "Rare Javelin Doctrine",
    img: "/doctrines/rare-javelin-doctrine.png",
    forUnit: ["Javelin Infantry"],
    dedicated: "group",
    stats: "Increases ammo by 10%.",
  },
  {
    name: "Rare Crossbow Doctrine",
    img: "/doctrines/rare-crossbow-doctrine.png",
    forUnit: ["Crossbowmen"],
    dedicated: "group",
    stats: "Increases rate of fire by 10%.",
  },
  {
    name: "Rare Polearm Doctrine II",
    img: "/doctrines/rare-polearm-doctrine-ii.png",
    forUnit: ["Polearm Infantry"],
    dedicated: "group",
    stats: "Reduces charge cooldown by 9%.",
  },
  {
    name: "Rare Spear Doctrine I",
    img: "/doctrines/rare-spear-doctrine-i.png",
    forUnit: ["Spear Infantry"],
    dedicated: "group",
    stats: "Increases health by 360.",
  },
  {
    name: "Rare Arquebus Doctrine I",
    img: "/doctrines/rare-arquebus-doctrine-i.png",
    forUnit: ["Arquebusiers"],
    dedicated: "group",
    stats: "Increases health by 360.",
  },
  {
    name: "Rare Sword Cavalry Doctrine I",
    img: "/doctrines/rare-melee-cavalry-doctrine-i.png",
    forUnit: ["Sword Cavalry"],
    dedicated: "group",
    stats: "Reduces food consumption by 35%.",
  },
  {
    name: "Rare Sword Cavalry Doctrine II",
    img: "/doctrines/rare-melee-cavalry-doctrine-ii.png",
    forUnit: ["Sword Cavalry"],
    dedicated: "group",
    stats: "Increases movement speed by 20%.",
  },
  {
    name: "Rare Slashing Damage Doctrine",
    img: "/doctrines/rare-slashing-damage-doctrine.png",
    forUnit: ["Halberdiers"],
    dedicated: "group",
    stats: "Increases Slashing damage by 75.",
  },
  {
    name: "Rare Piercing Damage Doctrine",
    img: "/doctrines/rare-piercing-damage-doctrine.png",
    forUnit: ["Piercing"],
    dedicated: "group",
    stats: "Increases Piercing damage by 75.",
  },
  {
    name: "Rare Blunt Doctrine",
    img: "/doctrines/rare-blunt-doctrine.png",
    forUnit: ["Blunt"],
    dedicated: "group",
    stats: "Increases Blunt damage by 95.",
  },
  {
    name: "Rare Slashing Doctrine",
    img: "/doctrines/rare-slashing-doctrine.png",
    forUnit: ["Slashing"],
    dedicated: "group",
    stats: "Increases slashing armor penetration by 95.",
  },
  {
    name: "Rare Piercing Doctrine",
    img: "/doctrines/rare-piercing-doctrine.png",
    forUnit: ["Piercing"],
    dedicated: "group",
    stats: "Increases piercing armor penetration by 95.",
  },
  {
    name: "Rare Blunt Damage Doctrine",
    img: "/doctrines/rare-blunt-damage-doctrine.png",
    forUnit: ["Blunt"],
    dedicated: "group",
    stats: "Increases blunt damage by 75.",
  },
  {
    name: "Rare Life Doctrine",
    img: "/doctrines/rare-life-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases health by 300.",
  },
  {
    name: "Rare Piercing Defence Doctrine",
    img: "/doctrines/rare-piercing-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases Piercing defence by 80.",
  },
  {
    name: "Rare slashing Defence Doctrine",
    img: "/doctrines/rare-slashing-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases Slashing defence by 80.",
  },
  {
    name: "Rare blunt Defence Doctrine",
    img: "/doctrines/rare-blunt-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases Blunt defence by 80.",
  },
  {
    name: "Paladin Sword Doctrine",
    img: "/doctrines/symmachean-paladins-doctrine-i.png",
    forUnit: ["Paladins"],
    dedicated: "unit",
    stats: "Increases piercing damage by 90.",
  },
  {
    name: "Stalwarts Brace Doctrine",
    img: "/doctrines/symmachean-stalwarts-doctrine-i.png",
    forUnit: ["Stalwarts"],
    dedicated: "unit",
    stats: "Increases Brace damage by 12%.",
  },
  {
    name: "Silahdars Doctrine I",
    img: "/doctrines/sihladars-doctrine-i.png",
    forUnit: ["Silahdars"],
    dedicated: "unit",
    stats: "Reduces ranged damage taken by 50 points.",
  },
  {
    name: "Pavise Crossbowmens Doctrine III",
    img: "/doctrines/pavise-crossbowmens-doctrine-iii.png",
    forUnit: ["Pavise Crossbowmen"],
    dedicated: "unit",
    stats: "Increases piercing damage by 90.",
  },
  {
    name: "Falconettii Gunners Doctrine III",
    img: "/doctrines/falconettii-gunners-doctrine-iii.png",
    forUnit: ["Falconetti Gunners"],
    dedicated: "unit",
    stats: "Increases piercing defence by 100",
  },
  {
    name: "Siphonarioi Flamethrower Doctrine",
    img: "/doctrines/siphonarioi-doctrine-i.png",
    forUnit: ["Siphonarioi"],
    dedicated: "unit",
    stats: "Increases blunt damage by 200 when hellfire strikes target.",
  },
  {
    name: "Armiger Lancers' Weapons Doctrine",
    img: "/doctrines/armiger-lancers-charge-doctrine.png",
    forUnit: ["Armiger Lancers"],
    dedicated: "unit",
    stats: "Increases normal attack damage by 5%.",
  },
  {
    name: "Liao's Rangers Weapons Doctrine",
    img: "/doctrines/liaos-rangers-weapons-doctrine.png",
    forUnit: ["Liaos Rangers"],
    dedicated: "unit",
    stats: "Increases Bludgeon damage by 5%.",
  },
  // {
  //   name: "Rapidity Doctrine",
  //   img: "/doctrines/liaos-rangers-weapons-doctrine.png",
  //   forUnit: ["Liaos Rangers"],
  //   dedicated: "unit",
  //   stats: "Increases Liao's Rangers' movement speed by 7%.",
  // },
  {
    name: "Defence Doctrine",
    img: "/doctrines/defense-doctrine.png",
    forUnit: ["Sword & Shield Infantry"],
    dedicated: "group",
    stats:
      "Increases Piercing defence by 80. Increases Slashing defence by 80.",
  },
  {
    name: "Outrider Doctrine I",
    img: "/doctrines/outrider-doctrine-i.png",
    forUnit: ["Outriders"],
    dedicated: "unit",
    stats: "Reduces Burning Plains cooldown by 4 seconds.",
  },
  {
    name: "Monastic Doctrine II",
    img: "/doctrines/monastic-doctrine.png",
    forUnit: ["Cudgel Monks"],
    dedicated: "unit",
    stats:
      "Increases Blunt damage by 50. Increases Blunt armor penetration by 50.",
  },
  {
    name: "Monastic Doctrine I",
    img: "/doctrines/monastic-doctrine.png",
    forUnit: ["Cudgel Monks"],
    dedicated: "unit",
    stats: "Increases resistance to ranged attacks by 10%.",
  },
  {
    name: "Shield Doctrine",
    img: "/doctrines/shield-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats:
      "Increases slashing defence by 50. Increases piercing defence by 50. Increases blunt defence by 50.",
  },
  {
    name: "Wolf Doctrine",
    img: "/doctrines/wolf-doctrine.png",
    forUnit: ["Wolf"],
    dedicated: "unit",
    stats:
      "Increases slashing damage by 50. Increases slashing armor penetration by 50.",
  },
  {
    name: "Houndsmen Toughness Doctrine",
    img: "/doctrines/houndsmen-toughness-doctrine.png",
    forUnit: ["Houndsmen"],
    dedicated: "unit",
    stats: "Reduces Hunters damage taken by 10%.",
  },
  {
    name: "Bagpiper Marching Doctrine",
    img: "/doctrines/bagpiper-health-doctrine.png",
    forUnit: ["Bagpipers"],
    dedicated: "unit",
    stats: "Increases movement speed by 9%.",
  },
  {
    name: "Bagpiper Health Doctrine",
    img: "/doctrines/bagpiper-health-doctrine.png",
    forUnit: ["Bagpipers"],
    dedicated: "unit",
    stats: "Increases health by 600.",
  },
  {
    name: "Shenji Doctrine III",
    img: "/doctrines/shenji-doctrine-iii.png",
    forUnit: ["Shenji Grenadiers"],
    dedicated: "unit",
    stats: "Increases unit's supply of grenades by 25%.",
  },
  {
    name: "Outrider Doctrine",
    img: "/doctrines/outrider-doctrine-i.png",
    forUnit: ["Outriders"],
    dedicated: "unit",
    stats: "Reduces normal javelin cooldown by 10%.",
  },
  {
    name: "Dimachaeri Agility Doctrine",
    img: "/logo.png",
    forUnit: ["Dimachaeri"],
    dedicated: "unit",
    stats:
      "Increases the max number of targets that can be hit by Siccae Torrent by 1.",
  },
  {
    name: "Varangian Sword Doctrine I",
    img: "/doctrines/varangian-sword-doctrine-i.png",
    forUnit: ["Varangian Guards"],
    dedicated: "unit",
    stats:
      "Increases Varangian Guards' slashing, piercing and blunt damage by 50 points.",
  },
  {
    name: "Chevaliers Marching Doctrine",
    img: "/doctrines/chevaliers-marching-doctrine.png",
    forUnit: ["Chevaliers"],
    dedicated: "unit",
    stats: "Increases unit's movement speed by 10%.",
  },
  {
    name: "Alchemists Mobility Doctrine",
    img: "/doctrines/alchemists-first-aid-doctrine.png",
    forUnit: ["Alchemists"],
    dedicated: "unit",
    stats:
      "After using Blinding Smoke, movement speed is increased by 10% for 8 seconds.",
  },
  {
    name: "Alchemists First Aid Doctrine",
    img: "/doctrines/alchemists-first-aid-doctrine.png",
    forUnit: ["Alchemists"],
    dedicated: "unit",
    stats:
      "Unlocks First Aid. Alchemists give first aid to nearby allies, who will then slowly recover their health for 20 seconds.",
  },
  {
    name: "Retiarii Health Doctrine",
    img: "/logo.png",
    forUnit: ["Retiarii"],
    dedicated: "unit",
    stats: "Increases Retiarii's health by 600 points.",
  },
  {
    name: "Janguju Accuracy Doctrine",
    img: "/logo.png",
    forUnit: ["Jangujus"],
    dedicated: "unit",
    stats: "Increases throwing knife accuracy by 15%.",
  },
  {
    name: "Hashashin Attack Doctrine",
    img: "/logo.png",
    forUnit: ["Hashashins"],
    dedicated: "unit",
    stats:
      "Increases Hashashins piercing armor penetration by 70 points. Increases Hashashins slashing armor penetration by 70 points. Increases Hashashins blunt armor penetration by 70 points.",
  },
  {
    name: "Wuxing Fire Doctrine",
    img: "/logo.png",
    forUnit: ["Wuxing"],
    dedicated: "unit",
    stats: "Increases Fiery Blast's burn damage by 100 points.",
  },
  {
    name: "Yanyuedao Slashing Doctrine",
    img: "/logo.png",
    forUnit: ["Yanyuedao Cavalry"],
    dedicated: "unit",
    stats: "Increases slashing damage by 100 points.",
  },
  {
    name: "Ronin Tactical Doctrine",
    img: "/ronins.png",
    forUnit: ["Ronin"],
    dedicated: "unit",
    stats: "Iaido Strike can damage an additional target.",
  },
  {
    name: "Samurai Defence Doctrine",
    img: "/logo.png",
    forUnit: ["Orochi Samurai"],
    dedicated: "unit",
    stats: "Reduces ranged damage taken by 6%.",
  },
  {
    name: "Schutzdieners Support Doctrine",
    img: "/schutzdieners.png",
    forUnit: ["Schutzdieners"],
    dedicated: "unit",
    stats:
      "Increases all defences for allies that receive healing by 80 points.",
  },
  {
    name: "Zweihander Marching Doctrine",
    img: "/logo.png",
    forUnit: ["Zweihanders"],
    dedicated: "unit",
    stats: "Increases movement speed by 6%.",
  },
  {
    name: "Caradoc's Assault Doctrine",
    img: "/logo.png",
    forUnit: ["Caradoc"],
    dedicated: "unit",
    stats: "Increases piercing armour penetration by 10%.",
  },
  {
    name: "Queen's Knight Shield Doctrine",
    img: "/logo.png",
    forUnit: ["Queens Knights"],
    dedicated: "unit",
    stats: "Each level reduces damage taken when using Bash & Thrust by 18%.",
  },
  {
    name: "Feathered Crossbowmen Attack Doctrine",
    img: "/logo.png",
    forUnit: ["Feathered Crossbowmen"],
    dedicated: "unit",
    stats: "Increases piercing and slashing damage by 60 points.",
  },
  {
    name: "Xuanjia Cavalry Energy Doctrine",
    img: "/logo.png",
    forUnit: ["Xuanjia Heavy Cavalry"],
    dedicated: "unit",
    stats: "Reduces Disciplined Assault's cooldown by 4 seconds.",
  },
  {
    name: "Apollo's Fury",
    img: "/logo.png",
    forUnit: ["Psiloi Slingers"],
    dedicated: "unit",
    stats: "SlingMaster has 50% increased chance to stun enemy units.",
  },
  {
    name: "Storm Formation",
    img: "/logo.png",
    forUnit: ["Sunward Phalanx"],
    dedicated: "unit",
    stats:
      "Divine Gaze applies Expose to enemy units. Uppon reaching 10 stacks, that enemy deals 30% reduced damage to the Pverwhelm attire to take effect.",
  },
  {
    name: "Blood of Iron",
    img: "/logo.png",
    forUnit: ["Lionroar Crew"],
    dedicated: "unit",
    stats: "Reduces the endurance of cannons by 500",
  },
  {
    name: "Formation March",
    img: "/logo.png",
    forUnit: ["Spartan Chosen"],
    dedicated: "unit",
    stats: "Increases movement speed by 6%.",
  },
];
export const uncommonDoctrines: Doctrine[] = [
  {
    name: "Uncommon Piercing Doctrine",
    img: "/doctrines/uncommon-piercing-doctrine.png",
    forUnit: ["Piercing"],
    dedicated: "group",
    stats: "Increases piercing armor penetration by 75.",
  },
  {
    name: "Uncommon Slashing Doctrine",
    img: "/doctrines/uncommon-slashing-doctrine.png",
    forUnit: ["Slashing"],
    dedicated: "group",
    stats: "Increases slashing armor penetration by 75.",
  },
  {
    name: "Uncommon Blunt Doctrine",
    img: "/doctrines/uncommon-blunt-doctrine.png",
    forUnit: ["Blunt"],
    dedicated: "group",
    stats: "Increases blunt armor penetration by 75.",
  },
  {
    name: "Uncommon Piercing Damage Doctrine",
    img: "/doctrines/uncommon-piercing-damage-doctrine.png",
    forUnit: ["Piercing"],
    dedicated: "group",
    stats: "Increases piercing damage by 60.",
  },
  {
    name: "Uncommon Slashing Damage Doctrine",
    img: "/doctrines/uncommon-slashing-damage-doctrine.png",
    forUnit: ["Slashing"],
    dedicated: "group",
    stats: "Increases slashing damage by 60.",
  },
  {
    name: "Uncommon blunt Defence Doctrine",
    img: "/doctrines/uncommon-blunt-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases blunt defence by 65.",
  },
  {
    name: "Uncommon slashing Defence Doctrine",
    img: "/doctrines/uncommon-slashing-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases slashing defence by 65.",
  },
  {
    name: "Uncommon Piercing Defence Doctrine",
    img: "/doctrines/uncommon-piercing-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases piercing defence by 65.",
  },
  {
    name: "Uncommon Life Doctrine",
    img: "/doctrines/uncommon-life-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases health by 250.",
  },
  {
    name: "Uncommon Blunt Damage Doctrine",
    img: "/doctrines/uncommon-blunt-damage-doctrine.png",
    forUnit: ["Blunt"],
    dedicated: "group",
    stats: "Increases blunt damage by 60.",
  },
];
export const commonDoctrines: Doctrine[] = [
  {
    name: "Common Piercing Doctrine",
    img: "/doctrines/common-piercing-doctrine.png",
    forUnit: ["Piercing"],
    dedicated: "group",
    stats: "Increases piercing armor penetration by 60.",
  },
  {
    name: "Common Slashing Doctrine",
    img: "/doctrines/common-slashing-doctrine.png",
    forUnit: ["Slashing"],
    dedicated: "group",
    stats: "Increases slashing armor penetration by 60.",
  },
  {
    name: "Common Blunt Doctrine",
    img: "/doctrines/common-blunt-doctrine.png",
    forUnit: ["Blunt"],
    dedicated: "group",
    stats: "Increases blunt armor penetration by 60.",
  },
  {
    name: "Common Piercing Damage Doctrine",
    img: "/doctrines/common-piercing-damage-doctrine.png",
    forUnit: ["Piercing"],
    dedicated: "group",
    stats: "Increases piercing damage by 50.",
  },
  {
    name: "Common Slashing Damage Doctrine",
    img: "/doctrines/common-slashing-damage-doctrine.png",
    forUnit: ["Slashing"],
    dedicated: "group",
    stats: "Increases slashing damage by 50.",
  },
  {
    name: "Common blunt Defence Doctrine",
    img: "/doctrines/common-blunt-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases blunt defence by 50.",
  },
  {
    name: "Common slashing Defence Doctrine",
    img: "/doctrines/common-slashing-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases slashing defence by 50.",
  },
  {
    name: "Common Piercing Defence Doctrine",
    img: "/doctrines/common-piercing-defense-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases piercing defence by 50.",
  },
  {
    name: "Common Life Doctrine",
    img: "/doctrines/common-life-doctrine.png",
    forUnit: ["all"],
    dedicated: "all",
    stats: "Increases health by 200.",
  },
  {
    name: "Common Blunt Damage Doctrine",
    img: "/doctrines/common-blunt-damage-doctrine.png",
    forUnit: ["Blunt"],
    dedicated: "group",
    stats: "Increases blunt damage by 50.",
  },
];
