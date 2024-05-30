"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useParams } from "next/navigation";

export default function Component() {
  const params = useParams();
  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md w-full max-w-2xl">
        <div className="p-8">
          <div className="flex items-center space-x-6">
            <Avatar className="w-16 h-16">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {params.username}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Software Engineer
              </p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-6">BlaBlaBla</p>
          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">
                San Francisco, CA
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400">
                Acme Inc.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
