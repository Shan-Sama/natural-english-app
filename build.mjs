import {copyFile,readFile,writeFile} from 'node:fs/promises';
for(const file of ['index.html','app.js','engine.js','review.js','style.css','icon192.png','icon512.png','manifest.webmanifest'])await copyFile(new URL('./web/'+file,import.meta.url),new URL('./extension/'+file,import.meta.url));
const html=await readFile(new URL('./web/index.html',import.meta.url),'utf8');
for(const [file,surface] of [['popup.html','popup'],['sidepanel.html','panel']])await writeFile(new URL('./extension/'+file,import.meta.url),html.replace('<body>','<body data-surface="'+surface+'">').replace('<link rel="manifest" href="manifest.webmanifest">',''));
console.log('Extension assets updated: popup.html + sidepanel.html');
