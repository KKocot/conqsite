"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-6 sm:h-full">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center">
        Witam w Kingdom of Poland
      </h1>
      {data ? (
        <>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <p className="text-gray-500 dark:text-gray-400">
              Wypelnij prosze nasz formularz zeby usprawnic nasza wspolprace
            </p>
            <div className="mt-4 flex justify-center">
              <Link href="/form">
                <Button>Przejdz do formularza</Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <p className="text-gray-500 dark:text-gray-400">
              Sprawdz kto jest najlepszy w naszej społecznosci
            </p>
            <div className="mt-4 flex justify-center">
              <Link href="/ranking">
                <Button>Rankinng</Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Sprawdz co wziac na TW
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/">
                <Button>Szara Straz</Button>
              </Link>
              <Link href="/">
                <Button>Przedchoragiewni</Button>
              </Link>
              <Link href="/">
                <Button>Biedna Pierdolona Piechota</Button>
              </Link>
              <Link href="/">
                <Button>Lineup 4</Button>
              </Link>
            </div>
          </div>
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
