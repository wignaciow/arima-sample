
const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

export const buildHttpResource = <T extends Record<string, string>>(opts: {
  serviceHost: string;
  serviceEndpoint: T;
}): T => {
  const host = trimSlashes(opts.serviceHost);

  const updatedPath = {} as Record<string, string>;

  Object.entries(opts.serviceEndpoint).forEach(([key, path]) => {
    updatedPath[key] = `${host}/${trimSlashes(path)}`;
  });

  return updatedPath as T;
};