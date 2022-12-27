import { weightUnitRegex } from ".";

export const mapWeight = (weightText: string) => {
  const match = weightText.match(weightUnitRegex);
  if (match === null) {
    throw new Error("Не верный формат записи веса");
  }
  const { count } = match.groups!;

  return Number(count.replace(/,/g, "."));
};
