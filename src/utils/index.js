const weightUnitRegex = /(?<count>[0-9]+(,[0-9]+)?)(?<unit>г|кг)/;
const costUnitRegex = /(?<count>[0-9,]+(,[0-9]+)?)(?<unit>р)/;

module.exports = {
    weightRegex: weightUnitRegex,
    costRegex: costUnitRegex,
};