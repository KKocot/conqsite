"use client";

import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SurveyProps } from "@/lib/type";
import Link from "next/link";

export default function Component() {
  const [surveys, setSurveys] = useState<SurveyProps[]>();

  const fetchSurveys = async () => {
    try {
      const response = await fetch(`/api/survey`);
      const data = await response.json();
      setSurveys(data.surveys);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  const sort_by_level = surveys?.sort((a, b) => {
    return Number(b.characterLevel) - Number(a.characterLevel);
  });
  useEffect(() => {
    fetchSurveys();
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Ranking KoP</h1>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gracz</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Profil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sort_by_level
                ? sort_by_level.map((e, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {index + 1 + ". " + e.inGameNick}
                      </TableCell>
                      <TableCell>{e.characterLevel}</TableCell>
                      <TableCell>
                        <Link target="_blank" href={`/profile/${e.discordId}`}>
                          <Button size="sm" variant="outline">
                            Pokaz profil
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
