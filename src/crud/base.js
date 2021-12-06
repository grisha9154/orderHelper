const fs = require('fs');

class BaseCRUD {
    constructor(entityName) {
        this._filePath = `.\\data\\${entityName}.json`;
    }

    create(json) {
        const data = this.read();
        data.push(json);
        const text = JSON.stringify(data);
        fs.writeFileSync(this._filePath, text);
    }

    read() {
        const data = fs.readFileSync(this._filePath, {flag: 'a+'});
        const totalText = data.toString();
        const totalJSON = totalText === '' ? [] : JSON.parse(totalText);
        return totalJSON;
    }
}

module.exports = BaseCRUD;
