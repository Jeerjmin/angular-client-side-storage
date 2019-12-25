const dummyjson = require('dummy-json');
const fs = require('fs');
const JSZip = require("jszip");

const zip = new JSZip();

(async () => {
    const template = fs.readFileSync('json-template.html', 'utf8');
    const result = dummyjson.parse(template);

    fs.writeFileSync('public/data-big.json', result);
    console.log("public/data.json written.");

    // zip.file("data.json", result).generateAsync({ type:"base64" }).then((blob) => {
    //     fs.writeFileSync('public/data.zip', blob);
    //     console.log("public/data.zip written.");
    // });

    // await new Promise(resolve => {
    //     zip.file("data.json", result)
    //         .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    //         .pipe(fs.createWriteStream('public/data.zip'))
    //         .on('finish', () => {
    //             console.log("public/data.zip written.");
    //             resolve();
    //         });
    // });

    // const file = fs.readFileSync("public/data.zip");
    // const loadedZip = await JSZip.loadAsync(file);
    //
    // console.log(await loadedZip.file('data.json').async('string'));


})();
