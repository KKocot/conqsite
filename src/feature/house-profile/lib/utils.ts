import { HouseDetails, Roles } from "@/lib/get-data";

export interface HouseCard {
  houseDetails: HouseDetails;
  houseLeader: Roles | undefined;
}
