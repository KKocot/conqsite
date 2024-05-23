"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Witam w Kingdom of Poland
      </h1>
      <div className="mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          Zaloguj sie z Discord zeby uzyskac dostep do naszych uslug
        </p>
        <div className="mt-4 flex justify-center">
          <Link href="/form/test">
            <Button onClick={() => signIn("discord")}>Zaloguj sie</Button>
          </Link>
        </div>
      </div>
      {/* <div className="mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          Wypelnij prosze nasz formularz zeby usprawnic nasza wspolprace
        </p>
        <div className="mt-4 flex justify-center">
          <Link href="/form/test">
            <Button>Przejdz do formularza</Button>
          </Link>
        </div>
      </div> */}
    </main>
  );
}
