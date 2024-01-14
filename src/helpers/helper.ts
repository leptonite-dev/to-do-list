export function toTitleCase(str: string) {
  return str
    .toLocaleLowerCase()
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(" ");
}
