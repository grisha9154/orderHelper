import { costUnitRegex } from ".";

export const mapCost = (costText: string) => {
  const match = costText.match(costUnitRegex);
  if (!match) {
    throw new Error("Не правильный формат для цены");
  }
  const { count } = match.groups!;
  return Number(count.replace(/,/g, "."));
};
