"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Component() {
  const { data } = useSession();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Ranking obecnosci na TW</h1>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gracz</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Punkty</TableHead>
                <TableHead>Profil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    Gracz {index + 1}
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{index}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Pokaz profil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
