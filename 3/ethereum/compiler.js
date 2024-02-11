const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const camaingPath = path.resolve(__dirname, "contracts", "Compaing.sol");
const source = fs.readFileSync(camaingPath, "utf-8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); //create that build folder

console.log(output);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + ".json"),//.replace(':', '') -  пишемом щоб перед назвою файлу не було знаку ':', тому що на windows не створиться файл напр. ":Campaign.json"
    output[contract]
  );
}
