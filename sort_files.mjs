import { readdirSync, renameSync } from 'fs';
import { join } from 'path';
import { readChunk } from 'read-chunk';
import asyncPool from 'tiny-async-pool';

const PATH = 'C:/users/nulla/desktop/temp/LLLL/D';
// const file = '2bftssjzgfkoppqxlrsiglrki4';

const main = async () => {
  const fileList = [];
  const folderList = readdirSync(PATH);
  for (const folder of folderList) {
    const files = readdirSync(join(PATH, folder));
    for (const file of files) {
      fileList.push(file);
    }
  }
  for await (const file of asyncPool(3000, fileList, sortFile)) {
  }
};
const sortFile = async (file) => {
  const dir = join(PATH, file.slice(0, 2), file);
  await readChunk(dir, { length: 4 })
    .then((data) => {
      const mstr = String.fromCharCode(...data);
      if (mstr === '@UTF') {
        renameSync(dir, join(PATH, '../sound', file));
      } else if (mstr === 'AFS2') {
        renameSync(dir, join(PATH, '../bgm', file));
      } else if (mstr === 'CRID') {
        renameSync(dir, join(PATH, '../video', file));
      } else if (
        data[0] === 171 &&
        data[1] === 0 &&
        String.fromCharCode(...data.slice(2)) === 'Un'
      ) {
        renameSync(dir, join(PATH, '../assets', file));
      } else {
        renameSync(dir, join(PATH, '../others', file));
      }
    })
    .then(() => console.log(`${file} moved`))
    .catch((e) => console.error(e));
};
main();
