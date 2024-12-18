import { readFileSync } from 'fs';
import { spawn } from 'child_process';

const PATH = 'C:/Users/nulla/Desktop/temp/LLLL/diff.txt';
const output = 'C:/Users/nulla/Desktop/temp/LLLL/_new';
const list = readFileSync(PATH, 'utf-8').split('\n');
for (const name of list) {
  if (name) {
    const adb = spawn('C:/Programs/platform-tools/adb.exe', [
      'pull',
      `sdcard/Android/data/com.oddno.lovelive/files/D/${name.slice(0, 2)}/${name}`,
      output,
    ]);
    adb.stdout.on('data', (data) => {
      console.log(data);
    });
  }
}
