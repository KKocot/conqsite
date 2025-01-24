"use client";

import useDeleteHouseMutation from "@/components/hooks/use-delete-house-mutation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { param }: { param: string } = useParams();
  const house = param.replaceAll("%20", " ");
  const router = useRouter();
  const [name, setName] = useState("");
  const deleteHouseMutation = useDeleteHouseMutation();
  const onDelete = () => {
    confirm("Are you sure you want to delete this house?")
      ? deleteHouseMutation.mutate(house)
      : console.log("cancel");
    router.push("/home");
  };

  return (
    <Card>
      <CardHeader>To delete house write your house name</CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          disabled={house !== name}
          className="self-end"
          variant="destructive"
          onClick={onDelete}
        >
          DELETE HOUSE
        </Button>
      </CardContent>
    </Card>
  );
};
export default Page;
