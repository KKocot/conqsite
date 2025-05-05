import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnitObject } from "@/lib/get-data";
import { PlusCircle, PlusSquare, Trash2 } from "lucide-react";
import { FC } from "react";
import ImagePickerDialog from "./image-picker-dialog";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import Image from "next/image";

const skills: string[] = [
  "fenriryskill.png",
  "skill12.png",
  "skill13.png",
  "skill14.png",
  "skill15.png",
  "skill16.png",
  "skill17.png",
  "skill18.png",
  "skill19.png",
  "skill20.png",
  "skill21.png",
  "skill22.png",
  "pleace-armata.png",
  "bulletsv1.png",
  "guns.png",
  "bulets.png",
  "karabiny.png",
  "armata.png",
  "shield_rush.png",
  "sprint.png",
  "charge.png",
  "recover.png",
  "attack-area.png",
  "throw-javelin.png",
  "advance-shielded.png",
  "rally-to-me.png",
  "hearts-of-bravery.png",
  "unbending-spirit.png",
  "performing.png",
  "brace_weapons.png",
  "arrow-rain.png",
  "bodkin-arrows.png",
  "hunt.png",
  "six-way-staff.png",
  "windmill-strike.png",
  "charge-ronin.png",
  "iaido-strike.png",
  "shock-attack.png",
  "gallop.png",
  "poison-arrows.png",
  "wuxing-blast.png",
  "healing-hands.png",
  "move-and-fire.png",
  "fiery-blast.png",
  "firestorm.png",
  "scorched-earth.png",
  "blinding-smoke.png",
  "first-aid.png",
  "advance-stalwarts.png",
  "advance.png",
  "AresFlurry.webp",
  "assault.png",
  "barricade.png",
  "BashThrust.webp",
  "baton-bolts.png",
  "battle-charge.png",
  "battle-prayer.png",
  "beast.png",
  "berserker-assault.png",
  "blast.png",
  "blessed-arrows.png",
  "bludgeon.png",
  "boar-snout.png",
  "brace-halberds.png",
  "brace-stalwarts.png",
  "burning-plains.png",
  "carnage.png",
  "charge-banner-guards.png",
  "charge-camel.png",
  "charge-greyhair.png",
  "charge-onna.png",
  "charge-united.png",
  "Charge_Counter.webp",
  "Chevaliers_Assault.webp",
  "claymore-strike.png",
  "close-to-the-edge.png",
  "colossal-strike.png",
  "counterstrike.png",
  "cover-commander-maiden.png",
  "covering-fire.png",
  "Cover_Commander.webp",
  "crescent-moon.png",
  "croupade.png",
  "Dashing_Blades.webp",
  "deadly-epicycle.png",
  "deathstrike.png",
  "decapitate.png",
  "devastation.png",
  "direct-fire.png",
  "Disciplined_Assault.webp",
  "disrupting-sweep.png",
  "doom-throw.png",
  "double-axe.png",
  "double-shot.png",
  "double-strike.png",
  "Eviscerate.webp",
  "flaming-arrow.png",
  "for-freedom.png",
  "frenzy.png",
  "freyjas-charge.png",
  "full-assault.png",
  "gathering-storm.png",
  "get-em.png",
  "get-over-here.png",
  "great-sweep.png",
  "guard-the-throne.png",
  "guardian.png",
  "heroic-charge.png",
  "highland-charge.png",
  "hobbling-shots.png",
  "honed-edge.png",
  "hunting-stance.png",
  "huskarl-charge.png",
  "indomitable.png",
  "Knight.webp",
  "knights-defence.webp",
  "lance-thrust.png",
  "last-stand.png",
  "marksmen.png",
  "Meteor_Strike.webp",
  "modao-advance.png",
  "modao-march.png",
  "mounting-dread.png",
  "myrmillos-guard.png",
  "odins-charge.png",
  "on-watch.png",
  "onslaught.png",
  "overwatch.png",
  "plant-the-banner.png",
  "predator.png",
  "prefecture-drill.png",
  "prepared-stance.png",
  "prepared-volley.png",
  "Prepared_Stance.webp",
  "prowl.png",
  "Prowl.webp",
  "quick-charge.png",
  "raging-onslaught.png",
  "rain-of-fire.png",
  "ride-like-the-wind.png",
  "Run.webp",
  "rushing-blow.png",
  "Ruthless.webp",
  "sabre-combo.png",
  "sea-surge.png",
  "serrated-arrow.png",
  "set-up-weapons.png",
  "shatter-shields.png",
  "shield-charge.png",
  "siccae-lunge.png",
  "siccae-torrent.png",
  "skalds-song.png",
  "smoke-bomb.png",
  "Smoke_Bomb.webp",
  "spearfishing.png",
  "stab-and-hook.png",
  "throw-axes.png",
  "throw-grenades.png",
  "throw-knives.png",
  "throw.png",
  "Thunder_Charge.webp",
  "Tiger_step.webp",
  "toggle-shields.png",
  "trident-charge.png",
  "triple-strike.png",
  "turn-and-charge.png",
  "unbreakable.png",
  "volley-fire.png",
  "wield-spears.png",
  "wield-sword.png",
  "wolfs-leap.png",
  "Ammo_Cache.webp",
  "Ammo_Depot.webp",
  "Berserker_Assault.webp",
  "Blessed_Arrows.webp",
  "Brace_Halberds.webp",
  "Brutal_Sweep.webp",
  "Burning_Plains.webp",
  "Camel_Lancers_Barricade.webp",
  "Camel_Lancers_Charge.webp",
  "ChargeThrow.webp",
  "Cheval_de_Frise.webp",
  "Claymore_Strike.webp",
  "Conquest.webp",
  "Crescent_Moon.webp",
  "Croupade.webp",
  "Deadly_Epicycle.webp",
  "Directed_Throw.webp",
  "Flaming_Arrow.webp",
  "Frenzy.webp",
  "Full_Assault.webp",
  "Gale_Strike.webp",
  "Greyhair_Garrison_Charge.webp",
  "Honed_Edge.webp",
  "Impassioned.webp",
  "IPG_Advance.webp",
  "Long_Range_Throw.webp",
  "Loyal_Strike.webp",
  "Meteor_Strike.webp",
  "Naginata_Charge.webp",
  "No_Retreat.webp",
  "OdinCharge.webp",
  "Overwatch.webp",
  "Pure_Attack.webp",
  "Quarry.webp",
  "Rain_of_Fire.webp",
  "Rampage.webp",
  "Roar_of_Powder.webp",
  "Running_Strikes.webp",
  "Say_Cheese.webp",
  "Second_Charge.webp",
  "Shield_Charge.webp",
  "Siccae_Lunge.webp",
  "Siccae_Torrent.webp",
  "Sipahis_Charge.webp",
  "Soul-Breaker.webp",
  "Sprint_Charge.webp",
  "Sprint_Strike.webp",
  "Stab_and_Hook.webp",
  "Storm_Pound.webp",
  "Sudden_Storm.webp",
  "Tearing_Strike.webp",
  "Third_Charge.webp",
  "ThrowZykalian.webp",
  "Throw_Knives.webp",
  "Tiger_step.webp",
  "Triple_Shooting.webp",
  "Tseregs_Charge.webp",
  "Volley.webp",
  "Zephyr_Blade.webp",
  "logo.png",
];

const SkillsArea: FC<{
  editMode: boolean;
  form: UseFormReturn<UnitObject, any, undefined>;
}> = ({ editMode, form }) => {
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  return (
    <div>
      {fields.length > 0 || editMode ? (
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          Skills
          {editMode && (
            <Button
              className="rounded-full w-fit h-fit p-0"
              variant="custom"
              onClick={() =>
                append({
                  name: "",
                  description: "",
                  image: "",
                })
              }
            >
              <PlusCircle className="w-6 h-6" />
            </Button>
          )}
        </h2>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-5">
                {editMode ? (
                  <ImagePickerDialog
                    images={skills}
                    path="skills"
                    onSetImage={(image) => {
                      update(i, { ...field, image });
                    }}
                    value={field.image}
                  >
                    {field.image ? (
                      <Image
                        width={40}
                        height={40}
                        src={`/skills/${field.image}`}
                        alt={field.name}
                        className="cursor-pointer hover:border-accent border-4"
                      />
                    ) : (
                      <Button
                        variant="outline"
                        className="p-0 h-fit rounded-xl"
                      >
                        <PlusSquare className="w-10 h-10" />
                      </Button>
                    )}
                  </ImagePickerDialog>
                ) : (
                  <Image
                    width={40}
                    height={40}
                    src={`/skills/${field.image}`}
                    alt={field.name}
                    className="object-cover rounded"
                  />
                )}
                {editMode ? (
                  <Input
                    {...form.register(`skills.${i}.name`)}
                    onChange={(e) => {
                      update(i, { ...field, name: e.target.value });
                    }}
                    value={field.name}
                  />
                ) : (
                  <h3 className="font-semibold">{field.name}</h3>
                )}
                {editMode ? (
                  <Button
                    className="rounded-full w-fit h-fit p-0 hover:bg-transparent hover:text-red-500"
                    variant="ghost"
                    onClick={() => remove(i)}
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                ) : null}
              </div>
              {editMode ? (
                <Textarea
                  {...form.register(`skills.${i}.description`)}
                  onChange={(e) => {
                    update(i, { ...field, description: e.target.value });
                  }}
                  value={field.description}
                />
              ) : (
                <p className="text-sm mt-4">{field.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsArea;
