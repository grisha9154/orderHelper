const fs = require('fs');

class BaseCRUD {
    constructor(entityName) {
        const fileSeparator = process.platform === 'win32' ? '\\' : '/';
        this._filePath = `.${fileSeparator}data${fileSeparator}${entityName}.json`;
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
