import { weightUnitRegex } from ".";

export const mapWeight = (weightText: string) => {
    const match = weightText.match(weightUnitRegex);
    const { unit, count } = match.groups;
    if (unit === 'кг'){
        return Number(count.replace(/,/g, '.')) * 1000;
    } else {
        return Number(count.replace(/,/g, '.'));
    }
};
