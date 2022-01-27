import { costUnitRegex } from ".";

export const mapCost = (costText: string) => {
    const match = costText.match(costUnitRegex);
    const { count } = match.groups;
    return Number(count.replace(/,/g, '.'));
};
