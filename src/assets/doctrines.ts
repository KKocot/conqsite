interface Doctrine {
  name: string;
  img: string;
  forUnit: string[];
  stats: string;
}

export const epicDoctrines: Doctrine[] = [
  {
    name: "Barber-Surgeon's doctrine",
    img: "/doctrines/barber-surgeon-doctrine-new-s7.png",
    forUnit: ["all"],

    stats: "Decreases total unit losses in the world by 30%",
  },
  {
    name: "Condottieri Guards Doctrine I",
    img: "/doctrines/condottieri-guards-doctrine-i.png",
    forUnit: ["Condottieri Guards"],

    stats: "Reduces Shock Attacks cooldown by 3 seconds",
  },
  {
    name: "Fortebraccio Pikemens Doctrine II",
    img: "/doctrines/fortebraccio-pikemens-doctrine-ii.png",
    forUnit: ["Fortebraccio Pikemen"],

    stats: "Increases armor penetration vs cavalry by 150",
  },
  {
    name: "Pavise Crossbowmens Doctrine I",
    img: "/doctrines/pavise-crossbowmens-doctrine-i.png",
    forUnit: ["Pavise Crossbowmen"],

    stats: "Reduces melee damage taken by 80",
  },
  {
    name: "Falconettii Gunners Doctrine I",
    img: "/doctrines/falconettii-gunners-doctrine-i.png",
    forUnit: ["Falconetti Gunners"],

    stats: "Increases shooting accuracy by 25%",
  },
  {
    name: "Janissaries Doctrine II",
    img: "/doctrines/janissaries-doctrine-ii.png",
    forUnit: ["Janissaries"],

    stats: "Increases rate of fire by 8%",
  },
  {
    name: "Azaps Doctrine II",
    img: "/doctrines/pavise-crossbowmens-doctrine-i.png",
    forUnit: ["Azaps"],

    stats: "Reduces On Watch cooldown by 4 seconds",
  },
  {
    name: "Sihladars Doctrine II",
    img: "/doctrines/sihladars-doctrine-ii.png",
    forUnit: ["Sihladars"],

    stats: "Increases Get Over Here movement speed by 10%",
  },
  {
    name: "Sipahis Doctrine II",
    img: "/doctrines/siphahis-doctrine-ii.png",
    forUnit: ["Sipahis"],

    stats: "Reduces short charge cooldown by 4 seconds",
  },
  {
    name: "Zykalian Supply Doctrine",
    img: "/doctrines/zykalian-militia-doctrine-i.png",
    forUnit: ["Zykalian Militia"],

    stats: "Increases ammo by 20%",
  },
  {
    name: "Epic Polearm Doctrine I",
    img: "/doctrines/epic-polearm-doctrine-i.png",
    forUnit: ["Polearm Infantry"],

    stats:
      "Increases piercing damage by 80. Increases armor penetration by 120.",
  },
  {
    name: "Epic Sword Doctrine II",
    img: "/doctrines/epic-sword-doctrine-ii.png",
    forUnit: ["Sword & Shield Infantry"],

    stats: "Reduces charge cooldown by 20%",
  },
  {
    name: "Siphonarioi Hellfire Doctrine",
    img: "/doctrines/siphonarioi-doctrine-ii.png",
    forUnit: ["Siphonarioi"],

    stats: "Extends the durationof burn by 2 seconds",
  },
  {
    name: "Paladin Piety Doctrine",
    img: "/doctrines/symmachean-paladins-doctrine-ii.png",
    forUnit: ["Symmachean Paladins"],

    stats: "Reduces Prayer's cooldown by 2 seconds",
  },
  {
    name: "Stalwarts Stamina Doctrine",
    img: "/doctrines/symmachean-stalwarts-doctrine-ii.png",
    forUnit: ["Symmachean Stalwarts"],

    stats: "Reduces Advance's cooldown by 3 seconds",
  },
  {
    name: "Epic Javelin Doctrine III",
    img: "/doctrines/epic-javelin-doctrine-iii.png",
    forUnit: ["Javelin Infantry"],

    stats: "Increases javelin's block break by 200",
  },
  {
    name: "Epic Spear Doctrine II",
    img: "/doctrines/epic-spear-doctrine-ii.png",
    forUnit: ["Spear Infantry"],

    stats: "Increases block by 250. Increases block recovery by 200%",
  },
  {
    name: "Epic Archery Doctrine I",
    img: "/doctrines/epic-archery-doctrine-i.png",
    forUnit: ["Archers"],

    stats: "Increases weapons range by 5 meters.",
  },
  {
    name: "Epic Lance Doctrine I",
    img: "/doctrines/epic-lance-doctrine.png",
    forUnit: ["Lancers"],

    stats: "Increases charge damage by 225.",
  },
  {
    name: "Epic Mounted Archery Doctrine III",
    img: "/doctrines/epic-mounted-archery-doctrine-iii.png",
    forUnit: ["Mounted Archers"],

    stats: "Reduces enemy movement speed by 10% for 3 seconds when firing.",
  },
  {
    name: "Siege Fighter Doctrine",
    img: "/doctrines/siege-fighter-doctrine.png",
    forUnit: ["all"],

    stats:
      "Increases damage inflicted in sieges by 100. The difference between siege damage and field damage is based on the map regardless of matchmaking or territory war modes.",
  },
  {
    name: "Rangers Mobility Doctrine",
    img: "/doctrines/liaos-rangers-melee-doctrine.png",
    forUnit: ["Liaos Rangers"],

    stats:
      "Increases Liao's Rangers movement speed by 7%. Gives a small improvement to the unit's resistance to ranged weapons.",
  },
  {
    name: "Liao's Rangers Melee Doctrine",
    img: "/doctrines/liaos-rangers-melee-doctrine.png",
    forUnit: ["Liaos Rangers"],

    stats: "Every level reduces Bludgeon's cooldown by 3 seconds.",
  },
  {
    name: "Armiger Lancers' Gallop Doctrine",
    img: "/doctrines/armiger-lancers-gallop-doctrine.png",
    forUnit: ["Armiger Lancers"],

    stats: "Reduces the Gallop cooldown by 4 seconds.",
  },
  {
    name: "Landsknecht's Charge Doctrine",
    img: "/doctrines/landsknechts-charge-doctrine.png",
    forUnit: ["Landsknechts"],

    stats: "Reduces charge cooldown by 5 seconds.",
  },
  {
    name: "Open Ground Doctrine",
    img: "/doctrines/open-ground-doctrine.png",
    forUnit: ["all"],

    stats:
      "Increases damage inflicted in field battles by 100. The difference between siege damage and field damage is based on the map regardless of matchmaking or territory war modes.",
  },
  {
    name: "Logistics Doctrine",
    img: "/doctrines/logistics-doctrine.png",
    forUnit: ["all"],

    stats: "Reduces food consumption by 60%.",
  },
  {
    name: "Healing Arts Doctrine",
    img: "/doctrines/healing-arts-doctrine.png",
    forUnit: ["all"],

    stats: "The unit can heal anywhere in the world at any time.",
  },
  {
    name: "Labor Doctrine",
    img: "/doctrines/labor-doctrine.png",
    forUnit: ["all"],

    stats: "Increases labor by 0.05.",
  },
  {
    name: "Epic Assassination Doctrine",
    img: "/doctrines/epic-assassination-doctrine.png",
    forUnit: ["all"],

    stats:
      "Increases damage dealt to heroes by 115. If an Empyrean unit equips this Doctrine, the effect changes to: Increases damage vs heroes by 13%.",
  },
  {
    name: "Epic Spear Doctrine I",
    img: "/doctrines/epic-spear-doctrine-i.png",
    forUnit: ["Spear Infantry"],

    stats: "Increases block by 400.",
  },
  {
    name: "Epic Sword Doctrine IV",
    img: "/doctrines/epic-sword-doctrine-iv.png",
    forUnit: ["Sword & Shield Infantry"],

    stats:
      "Unlocks Ironsides. Increases piercing, slashing, and blunt defence by 150 for 10 seconds.",
  },
  {
    name: "Epic Sword Doctrine III",
    img: "/doctrines/epic-sword-doctrine-iii.png",
    forUnit: ["Sword & Shield Infantry"],

    stats: "Increases charge damage by 180.",
  },
  {
    name: "Epic Sword Doctrine I",
    img: "/doctrines/epic-sword-doctrine-i.png",
    forUnit: ["Sword & Shield Infantry"],

    stats: "Increases slashing damage by 70. Increases blunt damage by 70.",
  },
  {
    name: "Epic Battle Line Doctrine",
    img: "/doctrines/epic-battle-line-doctrine.png",
    forUnit: ["all"],

    stats:
      "Increases damage dealt to units by 125. If an Empyrean unit equips this Doctrine, the effect changes to: Increases damage vs units by 14%.",
  },
  {
    name: "Epic Spear Doctrine III",
    img: "/doctrines/epic-spear-doctrine-iii.png",
    forUnit: ["Spear Infantry"],

    stats:
      "Increases slashing defence by 100. Increases piercing defence by 100. Increases blunt defence by 100",
  },
  {
    name: "Epic Spear Doctrine IV",
    img: "/doctrines/epic-spear-doctrine-iv.png",
    forUnit: ["Spear Infantry"],

    stats: "Reduces damage taken by 30.",
  },
  {
    name: "Epic Spear Doctrine V",
    img: "/doctrines/epic-spear-doctrine-v.png",
    forUnit: ["Spear Infantry"],

    stats:
      "Unlocks Regeneration. Restores 150 health every second for 10 seconds.",
  },
  {
    name: "Epic Polearm Doctrine II",
    img: "/doctrines/epic-polearm-doctrine-ii.png",
    forUnit: ["Polearm Infantry"],

    stats: "Bracing weapons stuns enemies.",
  },
  {
    name: "Epic Polearm Doctrine III",
    img: "/doctrines/epic-polearm-doctrine-iii.png",
    forUnit: ["Polearm Infantry"],

    stats:
      "Allows the unit to use Charge order, but does not deal extra damage.",
  },
  {
    name: "Epic Arquebus Doctrine I",
    img: "/doctrines/epic-arquebus-doctrine-i.png",
    forUnit: ["Arquebusiers"],

    stats: "Increases shooting accuracy by 20%.",
  },
  {
    name: "Epic Archery Doctrine V",
    img: "/doctrines/epic-archery-doctrine-v.png",
    forUnit: ["Archers"],

    stats:
      "Unlocks Arrow Rain, deals 65% of the unit's base piercing damage with each hit.",
  },
  {
    name: "Epic Archery Doctrine IV",
    img: "/doctrines/epic-archery-doctrine-iv.png",
    forUnit: ["Archers"],

    stats: "Increases piercing damage by 100.",
  },
  {
    name: "Epic Archery Doctrine III",
    img: "/doctrines/epic-archery-doctrine-iii.png",
    forUnit: ["Archers"],

    stats: "Increases ammo by 50%.",
  },
  {
    name: "Epic Archery Doctrine II",
    img: "/doctrines/epic-archery-doctrine-ii.png",
    forUnit: ["Archers"],

    stats:
      "Increases piercing damage by 100. Increases armour penetration by 50.",
  },
  {
    name: "Epic Arquebus Doctrine II",
    img: "/doctrines/epic-arquebus-doctrine-ii.png",
    forUnit: ["Arquebusiers"],

    stats: "Increases rate of fire by 16%.",
  },
  {
    name: "Epic Arquebus Doctrine III",
    img: "/doctrines/epic-arquebus-doctrine-iii.png",
    forUnit: ["Arquebusiers"],

    stats:
      "Increases slashing defence by 50. Increases piercing defence by 50. Increases blunt defence by 50. Increases health by 100",
  },
  {
    name: "Epic Crossbow Doctrine I",
    img: "/doctrines/epic-crossbow-doctrine-i.png",
    forUnit: ["Crossbowmen"],

    stats: "Increases ammo by 25%.",
  },
  {
    name: "Epic Crossbow Doctrine II",
    img: "/doctrines/epic-crossbow-doctrine-ii.png",
    forUnit: ["Crossbowmen"],

    stats:
      "Increases piercing damage by 50. Increases armour penetration by 200.",
  },
  {
    name: "Epic Crossbow Doctrine III",
    img: "/doctrines/epic-crossbow-doctrine-iii.png",
    forUnit: ["Crossbowmen"],

    stats: "Increases rate of fire by 23%.",
  },
  {
    name: "Epic Lance Doctrine II",
    img: "/doctrines/epic-lance-doctrine-ii.png",
    forUnit: ["Lancers"],

    stats: "Reduces damage taken while charging by 40%.",
  },
  {
    name: "Epic Javelin Doctrine II",
    img: "/doctrines/epic-javelin-doctrine-ii.png",
    forUnit: ["Javelin Infantry"],

    stats:
      "Increases piercing damage by 60. Increases armour penetration by 180.",
  },
  {
    name: "Epic Javelin Doctrine I",
    img: "/doctrines/epic-javelin-doctrine-i.png",
    forUnit: ["Javelin Infantry"],

    stats: "Increases javelin damage by 180.",
  },
  {
    name: "Epic Crossbow Doctrine V",
    img: "/doctrines/epic-crossbow-doctrine-v.png",
    forUnit: ["Crossbowmen"],

    stats:
      "Unlocks Double Shot. Fires 2 arrows per shot for 8 seconds. Cannot be used with Focus Fire. Cooldown 45 seconds. Rattan Marksmen with this doctrine gain a passive enabling them to launch one extra arrow with every shot.",
  },
  {
    name: "Epic Crossbow Doctrine IV",
    img: "/doctrines/epic-crossbow-doctrine-iv.png",
    forUnit: ["Crossbowmen"],

    stats: "Increases shooting accuracy by 20%.",
  },
  {
    name: "Epic Lance Doctrine III",
    img: "/doctrines/epic-lance-doctrine-iii.png",
    forUnit: ["Lancers"],

    stats: "Reduces charge cooldown by 10 seconds.",
  },
  {
    name: "Epic Sword Cavalry Doctrine",
    img: "/doctrines/epic-melee-cavalry-doctrine.png",
    forUnit: ["Sword Cavalry"],

    stats: "Increases damage dealt to infantry by 150.",
  },
  {
    name: "Epic Mounted Archery Doctrine I",
    img: "/doctrines/epic-mounted-archery-doctrine-i.png",
    forUnit: ["Mounted Archers"],

    stats: "Increases shooting accuracy by 50%.",
  },
  {
    name: "Epic Mounted Archery Doctrine II",
    img: "/doctrines/epic-mounted-archery-doctrine-ii.png",
    forUnit: ["Mounted Archers"],

    stats: "When shooting, there is a 10% chance to fire flaming arrows.",
  },
  {
    name: "Epic Mobility Doctrine",
    img: "/doctrines/epic-mobility-doctrine.png",
    forUnit: ["all"],

    stats: "Unlocks Sprint. Increases movement speed by 15% for 8 seconds.",
  },
  {
    name: "Attack Doctrine",
    img: "/doctrines/attack-doctrine.png",
    forUnit: ["Shieldmaidens"],

    stats: "Reduces Freyja's Charge cooldown by 5 seconds.",
  },
  {
    name: "Berserker's Doctrine",
    img: "/doctrines/berserkers-doctrine.png",
    forUnit: ["Berserkers"],

    stats: "Increases health by 360. Reduces ranged damage taken by 50.",
  },
  {
    name: "Resist Arrow Doctrine",
    img: "/doctrines/resist-arrow-doctrine.png",
    forUnit: ["Cavalry", "Melee Infantry"],

    stats:
      "Reduces damage taken from arrows by 100. Increases damage dealt to ranged units by 100",
  },
  {
    name: "Sharpshooter's Doctrine",
    img: "/doctrines/sharpshooter-doctrine.png",
    forUnit: ["Archer Infantry", "Firearm Infantry"],

    stats:
      "Increases damage against heavy shielded units (spear units and Pavise Crossbowmen) by 350.",
  },
  {
    name: "Anti-Cavalry Doctrine",
    img: "/doctrines/anti-cavalry-doctrine.png",
    forUnit: ["Sword & Shield Infantry", "Polearm Infantry"],

    stats: "Increases damage versus cavalry by 120.",
  },
  {
    name: "Epic Slashing Damage Doctrine",
    img: "/doctrines/epic-slashing-damage-doctrine.png",
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
    name: "Epic Blunt Doctrine",
    img: "/doctrines/epic-blunt-doctrine.png",
    forUnit: [
      "Spearman",
      "Sword & Shield Infantry",
      "Iron Reapers",
      "Fire Lancers",
    ],

    stats: "Increases Blunt Armor penetration by 110.",
  },
  {
    name: "Epic Slashing Doctrine",
    img: "/doctrines/epic-slashing-doctrine.png",
    forUnit: [
      "Halberdiers",
      "Cavalry",
      "Sword & Shield Infantry",
      "Tercio Arquebusiers",
    ],

    stats: "Increases Slashing Armor penetration by 110.",
  },
  {
    name: "Epic Piercing Doctrine",
    img: "/doctrines/epic-piercing-doctrine.png",
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
    name: "Epic Blunt Damage Doctrine",
    img: "/doctrines/epic-blunt-damage-doctrine.png",
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

    stats: "Increases health by 360.",
  },
  {
    name: "Epic Piercing Defence Doctrine",
    img: "/doctrines/epic-piercing-defence-doctrine.png",
    forUnit: ["all"],

    stats: "Increases Piercing defence by 105.",
  },
  {
    name: "Epic Slashing Defence Doctrine",
    img: "/doctrines/epic-slashing-defence-doctrine.png",
    forUnit: ["all"],

    stats: "Increases Slashing defence by 105.",
  },
  {
    name: "Epic Blunt Defence Doctrine",
    img: "/doctrines/epic-blunt-defence-doctrine.png",
    forUnit: ["all"],

    stats: "Increases Blunt defence by 105.",
  },
  {
    name: "Greyhair Doctrine II",
    img: "/doctrines/greybeard-doctrine-main.png",
    forUnit: ["Greyhair Garrison"],

    stats:
      "Increases slashing damage by 110 points. Increases piercing damage by 110 points. Increases blunt damage by 110 points.",
  },
  {
    name: "Greyhair Doctrine I",
    img: "/doctrines/greybeard-doctrine-main.png",
    forUnit: ["Greyhair Garrison"],

    stats: "Increases health by 600 points.",
  },
  {
    name: "Guardian Doctrine",
    img: "/doctrines/guardian-doctrine.png",
    forUnit: ["Shieldmaidens"],

    stats: "Reduces Guardian cooldown by 5 seconds.",
  },
  {
    name: "Assault Doctrine",
    img: "/doctrines/berserkers-doctrine.png",
    forUnit: ["Berserkers"],

    stats: "Reduces Berserker Cooldown by 20%.",
  },
  {
    name: "Epic Arquebus Doctrine IV",
    img: "/doctrines/epic-arquebus-doctrine-iv.png",
    forUnit: ["Arquebusiers"],

    stats: "Allows the unit to move and fire.",
  },
  {
    name: "Shenji Doctrine II",
    img: "/doctrines/shenji-doctrine-ii.png",
    forUnit: ["Shenji Grenadiers"],

    stats: "Grenade explosions will now halt enemy cavalry within 4 meters.",
  },
  {
    name: "Agility Doctrine",
    img: "/doctrines/axe-doctrine.png",
    forUnit: ["Axe Raiders"],

    stats: "Reduces melee damage taken by 75 points.",
  },
  {
    name: "Axe Doctrine",
    img: "/doctrines/axe-doctrine.png",
    forUnit: ["Axe Raiders"],

    stats: "The Double Axe skill can now knock down enemy soldiers.",
  },
  {
    name: "Modao Doctrine I",
    img: "/doctrines/modao-doctrine.png",
    forUnit: ["Modao"],

    stats: "Increases damage versus cavalry by 200 points.",
  },
  {
    name: "Modao Doctrine II",
    img: "/doctrines/modao-doctrine.png",
    forUnit: ["Modao"],

    stats: "The unit's ability to stop cavalry is increased by 1 second.",
  },
  {
    name: "Shenji Doctrine I",
    img: "/doctrines/shenji-doctrine-ii.png",
    forUnit: ["Shenji Grenadiers"],

    stats: "Reduces Throw Grenades's cooldown by 2 seconds.",
  },
  {
    name: "Wild Rovers",
    img: "/doctrines/wild-rovers.png",
    forUnit: ["Claymores"],

    stats:
      "Reduces the cooldown of Highland Charge and For Freedom by 2 seconds.",
  },
  {
    name: "Highlanders",
    img: "/doctrines/wild-rovers.png",
    forUnit: ["Claymores"],

    stats: "Increases 'Claymore Strike' damage by 5%.",
  },
  {
    name: "Houndsmen Hunter Doctrine",
    img: "/doctrines/houndsmen-hunter-doctrine.png",
    forUnit: ["Houndsmen"],

    stats: "Increases the bleed damage of the Hunter's Will by 100 points.",
  },
  {
    name: "Houndsmen Kennel Doctrine",
    img: "/doctrines/houndsmen-hunter-doctrine.png",
    forUnit: ["Houndsmen"],

    stats: "Increases Loyal Hound's Slow effect duration by 3 seconds.",
  },
  {
    name: "Huskarl Raider Doctrine",
    img: "/doctrines/huskarl-raider-doctrine.png",
    forUnit: ["Huskarl"],

    stats:
      "Increases movement speed of Huskarls by 10%. Increases Sea Surge's Damage by 15%. Increases Huskarl Charge's damage by 15%.",
  },
  {
    name: "Chevaliers Lance Doctrine",
    img: "/doctrines/chevaliers-defence-doctrine.png",
    forUnit: ["Chevaliers"],

    stats: "Increases Piercing Armor Penetration by 150 points.",
  },
  {
    name: "Chevaliers Defence Doctrine",
    img: "/doctrines/chevaliers-defence-doctrine.png",
    forUnit: ["Chevaliers"],

    stats: "Increases all defence values by 100 points.",
  },
  {
    name: "Banner Guards' Battle Doctrine",
    img: "/doctrines/banner-guards-morale-doctrine.png",
    forUnit: ["Banner Guards"],

    stats: "Increases Banner Guards' Block by 300 points.",
  },
  {
    name: "Banner Guards' Morale Doctrine",
    img: "/doctrines/banner-guards-morale-doctrine.png",
    forUnit: ["Banner Guards"],

    stats: "Reduces Indomitable cooldown by 5 seconds.",
  },
  {
    name: "Huskarl Formation Doctrine",
    img: "/doctrines/huskarl-raider-doctrine.png",
    forUnit: ["Huskarl"],

    stats: "Reduces Boar Snout cooldown by 1 second.",
  },
  {
    name: "Varangian Axe Doctrine",
    img: "/doctrines/varangian-axe-doctrine.png",
    forUnit: ["Varangian Guards"],

    stats: "Increases Shatter Shield's damage by 10%.",
  },
  {
    name: "Pike Defence Doctrine",
    img: "/doctrines/pike-defence-doctrine.png",
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

    stats: "Damage taken is reduced by 30% while charging.",
  },
  {
    name: "Cavalry Assault Doctrine",
    img: "/doctrines/cavalry-assault-doctrine.png",
    forUnit: ["Sword Cavalry"],

    stats:
      "Deal 20% increased damage to cavalry units. Deal 20% reduced damage to ranged and melee infantry units.",
  },
  {
    name: "Varangian Sword Doctrine II",
    img: "/doctrines/varangian-axe-doctrine.png",
    forUnit: ["Varangian Guards"],

    stats: "Reduces Varangian Guards' melee damage taken by 5%.",
  },
  {
    name: "Myrmillones Morale Doctrine",
    img: "/logo.png",
    forUnit: ["Myrmillones"],
    stats: "Reduces Myrmillo's Guard's cooldown by 5 seconds.",
  },
  {
    name: "Retiarii Assault Doctrine",
    img: "/logo.png",
    forUnit: ["Retiarii"],
    stats: "Reduces Spearfishing cooldown by 5 seconds.",
  },
  {
    name: "Camel Lancer Defence Doctrine",
    img: "/logo.png",
    forUnit: ["Camel Lancers"],
    stats:
      "Increases slashing defence by 80 points. Increases piercing defence by 80 points. Increases blunt defence by 80 points.",
  },
  {
    name: "Hashashin Combat Doctrine",
    img: "/logo.png",
    forUnit: ["Hashashins"],
    stats:
      "Increases the number of enemies each Hashashin can attack wit ha single normal strike by 1.",
  },
  {
    name: "Epic Spear Doctrine VI",
    img: "/logo.png",
    forUnit: ["Spear Infantry"],
    stats:
      "Unlocks Stand Fast. Gives control immunity for 2.5 seconds. Cooldown lasts 60 seconds.",
  },
  {
    name: "Epic Valour Doctrine",
    img: "/logo.png",
    forUnit: ["TODO"],
    stats:
      "Adds 200 Health points to the unit, and reduces damage taken by 3%.",
  },
  {
    name: "Epic Damage Doctrine",
    img: "/logo.png",
    forUnit: ["all"],
    stats:
      "Increases health by 200. Increases slashing damage by 90. Increases piercing damage by 90. Increases blunt damage by 90.",
  },
  {
    name: "Epic Penetration Doctrine",
    img: "/logo.png",
    forUnit: ["all"],
    stats:
      "Increases health by 200. Increases slashing armor penetration by 70. Increases piercing armor penetration by 70. Increases blunt armor penetration by 70.",
  },
  {
    name: "Epic Ammo Doctrine",
    img: "/logo.png",
    forUnit: ["TODO"],
    stats: "Increases health by 300. Increases ammo by 15%.",
  },
  {
    name: "Epic Movement Doctrine",
    img: "/logo.png",
    forUnit: ["TODO"],
    stats: "Increases health by 300. Increases movement speed by 10%.",
  },
  {
    name: "Health & Defence Doctrine V (Piercing)",
    img: "/doctrines/health-&-defence-doctrine-v-piercing.png",
    forUnit: ["all"],
    stats:
      "Increases health by 440 points. Increases piercing defence by 125 points.",
  },
  {
    name: "Health & Defence Doctrine V (Slashing)",
    img: "/doctrines/health-&-defence-doctrine-v-slashing.png",
    forUnit: ["all"],
    stats:
      "Increases health by 440 points. Increases slashing defence by 125 points.",
  },
  {
    name: "Health & Defence Doctrine V (Blunt)",
    img: "/doctrines/health-&-defence-doctrine-v-blunt-thumb.png",
    forUnit: ["all"],
    stats:
      "Increases health by 440 points. Increases blunt defence by 125 points.",
  },
  {
    name: "Health & Defence Doctrine V (All)",
    img: "/doctrines/health-&-defence-doctrine-v-all.png",
    forUnit: ["all"],
    stats:
      "Increases health by 440 points. Increases all defences by 40 points.",
  },
  {
    name: "Health & Labor Doctrine V",
    img: "/doctrines/health-&-labor-doctrine-v.png",
    forUnit: ["all"],
    stats:
      "Increases health by 440 points. Increases labor by 0.07 points per living soldier in the unit.",
  },
  {
    name: "Food & Medicine Doctrine V",
    img: "/doctrines/food-&-medicine-doctrine-v.png",
    forUnit: ["all"],
    stats:
      "Reduces food consumption by 60%. Decreases total unit permanent losses from open world battles by 40%. The unit can heal injured soldiers in any fief and in the open world via their unit profile screen",
  },
  {
    name: "Health & Resistance Doctrine V",
    img: "/doctrines/health-&-resistance-doctrine-v.png",
    forUnit: ["all"],
    stats: "Increases health by 300 points. Reduces damage taken by 5%.",
  },
  {
    name: "Defence Doctrine V",
    img: "/doctrines/defence-doctrine-v.png",
    forUnit: ["all"],
    stats: "Increases all defences by 80 points. Reduces damage taken by 5%.",
  },
  {
    name: "Iron Charge Doctrine V",
    img: "/doctrines/iron-charge-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats:
      "Reduces damage taken while charging by 14%. Unlocks Ironsides: increases piercing, slashing, and blunt defence by 175 points for 12 seconds.",
  },
  {
    name: "Assault Doctrine V",
    img: "/doctrines/assault-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats: "Reduces damage taken while charging by 40%.",
  },
  {
    name: "Stamina Doctrine V",
    img: "/doctrines/stamina-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats:
      "Reduces charge cooldown by 24%. Increases the number of charge targets by 1.",
  },
  {
    name: "Mobility Doctrine V",
    img: "/doctrines/mobility-doctrine-v.png",
    forUnit: ["all"],
    stats:
      "Increases movement speed by 7% Unlocks Sprint: increases movement speed by 15% for 12 seconds.",
  },
  {
    name: "Unit Damage Doctrine V",
    img: "/doctrines/unit-damage-doctrine-v.png",
    forUnit: ["all"],
    stats:
      "Increases damage dealt to unit by 120 points. Increases all types of damage by 80 points.",
  },
  {
    name: "Hero Damage Doctrine V",
    img: "/doctrines/hero-damage-doctrine-v.png",
    forUnit: ["all"],
    stats: "Increases damage dealt to heroes by 120 points.",
  },
  {
    name: "Iron Health Doctrine V",
    img: "/doctrines/iron-health-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats:
      "Increases health by 300 points. Unlocks Ironsides: increases piercing, slashing, and blunt defence by 175 points for 12 seconds.",
  },
  {
    name: "Iron Damage Doctrine V",
    img: "/doctrines/iron-damage-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats:
      "Unlocks Ironsides: increases piercing, slashing, and blunt defence by 175 points for 12 seconds. Also, while skill is in effect all types of damage are increased by 120 points.",
  },
  {
    name: "Charge Doctrine V",
    img: "/doctrines/charge-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats:
      "Increases charge damage by 250 points. Increases charge's block break by 450 points.",
  },
  {
    name: "Anti-Infantry Doctrine V",
    img: "/doctrines/anti-infantry-doctrine-v.png",
    forUnit: ["Sword & Shield Infantry"],
    stats:
      "Increases damage dealt to infantry by 200 points. Increases block by 250 points.",
  },
  {
    name: "Anti-Cavalry Doctrine V",
    img: "/doctrines/anti-cavalry-doctrine-v.png",
    forUnit: ["Halberdiers"],
    stats:
      "Reduces damage taken from cavalry when using Brace-type skills by 40%. Increases damage versus cavalry while bracing",
  },
  {
    name: "Slow Doctrine V",
    img: "/doctrines/slow-doctrine-v.png",
    forUnit: ["Halberdiers"],
    stats:
      "Increases slow effects on cavalry by 15%. Increases damage dealt to cavalry by 10%.",
  },
  {
    name: "Javelin Attack Doctrine V",
    img: "/doctrines/javelin-attack-doctrine-v.png",
    forUnit: ["Javelin Infantry"],
    stats:
      "Increases javelin's block break by 300 points. Increases piercing damage by 100 points",
  },
  {
    name: "Javelin Damage Doctrine V",
    img: "/doctrines/javelin-damage-doctrine-v.png",
    forUnit: ["Javelin Infantry"],
    stats: "Increases javelin damage by 250 points. Increases ammo by 30.",
  },
  {
    name: "First Aid Doctrine V",
    img: "/doctrines/first-aid-doctrine-v.png",
    forUnit: ["Spear Infantry"],
    stats:
      "Reduces damage taken when armor pierced by 35%. Unlocks Regeneration: regenerates 150 health every for 15 seconds.",
  },
  {
    name: "Awareness Doctrine V",
    img: "/doctrines/awareness-doctrine-v.png",
    forUnit: ["Spear Infantry"],
    stats:
      "Reduces damage taken from cavalry charges by 500 points. Reduces damage taken from rear attacks by 20%.",
  },
  {
    name: "Defence Doctrine V (Shields)",
    img: "/doctrines/defence-doctrine-v-shields.png",
    forUnit: ["Spear Infantry"],
    stats: "Increases all defences by 130 points. Reduces damage taken by 6%.",
  },
  {
    name: "Block Doctrine V",
    img: "/doctrines/block-doctrine-v.png",
    forUnit: ["Spear Infantry"],
    stats: "Increases block by 300 points. Reduces damage taken by 90 points.",
  },
  {
    name: "Bowmanship Doctrine V",
    img: "/doctrines/bowmanship-doctrine-v.png",
    forUnit: ["Archers"],
    stats:
      "Arrow Rain deals 75% of the unit's base piercing damage with each hit. Increases piercing damage by 150 points.",
  },
  {
    name: "Bowstring Doctrine V",
    img: "/doctrines/bowstring-doctrine-v.png",
    forUnit: ["Archers"],
    stats: "Increases weapons range by 9 meters. Increases rate of fire by 9%.",
  },
  {
    name: "Projectile Doctrine V",
    img: "/doctrines/projectile-doctrine-v.png",
    forUnit: ["Archers"],
    stats:
      "Increases ammo by 60%. Increases piercing armor penetration by 50 points.",
  },
  {
    name: "Precision Doctrine V",
    img: "/doctrines/precision-doctrine-v.png",
    forUnit: ["Archers"],
    stats:
      "Increases piercing damage by 120 points. Increases piercing armor penetration by 80 points. Increases rate of fire by 9%.",
  },
  {
    name: "Fire Discipline Doctrine V",
    img: "/doctrines/fire-discipline-doctrine-v.png",
    forUnit: ["Arquebusiers"],
    stats:
      "Increases rate of fire by 20%. Increases damage dealt to cavalry by 8%.",
  },
  {
    name: "Gun Defence Doctrine V",
    img: "/doctrines/gun-defence-doctrine-v.png",
    forUnit: ["Arquebusiers"],
    stats:
      "Increases all defences by 60 points. Increases health by 200 points. Increases ammo by 10%.",
  },
  {
    name: "Lancer Charge Doctrine V",
    img: "/doctrines/lancer-charge-doctrine-v.png",
    forUnit: ["Lancers"],
    stats:
      "Reduces charge cooldown 14 seconds. Increases piercing damage by 100 points.",
  },
  {
    name: "Pressure Doctrine V",
    img: "/doctrines/pressure-doctrine-v.png",
    forUnit: ["Lancers"],
    stats:
      "Reduces damage taken while charging by 50%. Reduces charge cooldown by 6 seconds.",
  },
  {
    name: "Aggression Doctrine V",
    img: "/doctrines/aggression-doctrine-v.png",
    forUnit: ["Lancers"],
    stats:
      "Reduces damage taken while charging by 50%. Increases movement speed by 9%.",
  },
  {
    name: "Double Fire Doctrine V",
    img: "/doctrines/double-fire-doctrine-v.png",
    forUnit: ["Crossbowmen"],
    stats:
      "Unlocks Double Fire. Cannot be used with Focus Fire. Cooldown lasts 45 seconds. Increases rate of fire by 12%.",
  },
  {
    name: "Gunsight Doctrine V",
    img: "/doctrines/gunsight-doctrine-v.png",
    forUnit: ["Crossbowmen"],
    stats:
      "Increases shooting accuracy by 40%. Increases piercing damage by 80 points.",
  },
  {
    name: "New Ammo Doctrine V",
    img: "/doctrines/new-ammo-doctrine-v.png",
    forUnit: ["Crossbowmen"],
    stats: "Increases ammo by 35%. Increases amor penetration by 140 points.",
  },
  {
    name: "Sword Battle Doctrine V",
    img: "/doctrines/sword-battle-doctrine-v.png",
    forUnit: ["Sword Cavalry"],
    stats:
      "Increases movement speed by 30%. Increases slashing damage by 90 points. Increases slashing armor penetration by 60",
  },
  {
    name: "Carnage Doctrine V",
    img: "/doctrines/carnage-doctrine-v.png",
    forUnit: ["Sword Cavalry"],
    stats:
      "Increases damage dealt to infantry by 250 points. Reduces charge cooldown by 7 seconds.",
  },
  {
    name: "Incendiary Doctrine V",
    img: "/doctrines/incendiary-doctrine-v.png",
    forUnit: ["Mounted Archers"],
    stats:
      "When shooting, there is a 30% chance to fire flaming arrows. Increases rate of fire by 9%.",
  },
  {
    name: "Spoiler Doctrine V",
    img: "/doctrines/spoiler-doctrine-v.png",
    forUnit: ["Mounted Archers"],
    stats:
      "Reduces enemy movement speed by 20% for 3 seconds. Increases rate of fire by 9%.",
  },
];
