"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { command_whitelist } from "@/assets/whitelists";

export default function Home() {
  const { data } = useSession();
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-6 sm:h-full my-12">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center">
        Conqueror&lsquo;s Blade
      </h1>
      {data ? (
        <>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex gap-4 justify-center">
              <Link href="/profile">
                <Button>My Profile</Button>
              </Link>
              <Link href="/update-form">
                <Button>Update Form</Button>
              </Link>
            </div>
          </div>

          {command_whitelist.includes(data.user.id) ? (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/lineups/two">
                  <Button>King&lsquo;s Order</Button>
                </Link>
                <Link href="/lineups/three">
                  <Button>Królewska Tarcza</Button>
                </Link>
                <Link href="/lineups/four">
                  <Button>Zielona Piechota</Button>
                </Link>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <p className="text-gray-500 dark:text-gray-400">
            Zaloguj sie z Discord zeby uzyskac dostep do naszych uslug
          </p>
          <div className="mt-4 flex justify-center">
            <Link href="/form">
              <Button onClick={() => signIn("discord")}>Zaloguj sie</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
