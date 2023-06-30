export const SERVER = "http://localhost:4000";

export function createURL(path) {
  return `${SERVER}/${path}`;
}
