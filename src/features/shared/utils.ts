import { isServer } from "@tanstack/react-query";

const baseUrl = !isServer ? window.location.origin : process.env.ORIGIN;

export const getUrl = (
  endpoint: string,
  searchParams: Record<string, string> = {}
) => {
  const resolvedUrl = new URL(endpoint, baseUrl);
  Object.entries(searchParams).forEach(([keys, value]) =>
    resolvedUrl.searchParams.set(keys, value)
  );
  return resolvedUrl;
};
