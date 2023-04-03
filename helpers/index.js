const fs = require('fs').promises;

async function getFile() {
    const data = await fs.readFile('./posts.json', 'utf8');
    return JSON.parse(data);
}

async function writeFile(data) {
    await fs.writeFile('./posts.json', JSON.stringify(data, null, 2));
}

module.exports = {
    getFile,
    writeFile
}