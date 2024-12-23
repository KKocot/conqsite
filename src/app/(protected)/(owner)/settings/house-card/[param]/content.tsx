"use client";

import CreateHouseCard from "@/feature/create-house/create-house-card";
import { HouseDetails } from "@/lib/get-data";
import { useState } from "react";
import { toast } from "react-toastify";

const Content = ({ data }: { data: HouseDetails }) => {
  const [values, setValues] = useState<HouseDetails>({
    name: data.name,
    description: data.description,
    country: data.country,
    discordLink: data.discordLink,
    avatar: data.avatar,
    server: data.server,
  });
  const onSubmit = async () => {
    ``;
    try {
      const response = await fetch(`/api/house?name=${values.name}`, {
        method: "POST",
        body: JSON.stringify({ ...values, id: values.name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("error_occurred", errorData);
      } else {
        console.log("success", await response.json());
        toast.success("house_details_saved");
      }
    } catch (error) {
      console.error("error_adding", error);
    }
  };
  return (
    <CreateHouseCard
      type="edit"
      values={values}
      setValues={setValues}
      onSubmit={onSubmit}
    />
  );
};
export default Content;
