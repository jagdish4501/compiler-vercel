import { c, cpp, java, node, python } from 'codehelp-compiler';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import { getFileExtension } from '../../utils/quick-compiler/getFileExtension';
import { printConsole } from '../../utils/quick-compiler/printConsole';
import { hasCookie } from 'cookies-next';

function makeDirectory(lang) {
  const path = os.homedir();

  // '\\' is for dev in windows
  // const dir = `${path}\\.compile-run2\\tmp\\${lang}\\${crypto.randomUUID()}`;

  // '/' for prod in linux
  const dir = `${path}/.codehelp-compiler/tmp/${lang}/${crypto.randomUUID()}`;

  try {
    // check if directory already exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      printConsole('Directory is created.');
      return dir;
    } else {
      printConsole('Directory already exists.');
      return dir;
    }
  } catch (err) {
    printConsole('Directory Creation Error', err);
    return null;
  }
}

function makeSourceFile(dir, lang, code) {
  const extension = getFileExtension(lang);

  // '/' is for prod in linux
  let fileName = '';

  if (lang == 'java') fileName = `${dir}/Main.${extension}`;
  else if (lang === 'javascript') fileName = `${dir}/index.${extension}`;
  else fileName = `${dir}/main.${extension}`;

  printConsole('FileName', fileName);
  try {
    fs.writeFileSync(fileName, code);
  } catch (err) {
    printConsole('File Creation Error', err);
    return null;
  }
  return fileName;
}

async function compileCode(lang, file, input) {
  switch (lang) {
    case 'c':
      return c.runFile(file, { stdin: input });
    case 'cpp':
      return cpp.runFile(file, { stdin: input });
    case 'python':
      return python.runFile(file, { stdin: input });
    case 'java':
      return java.runFile(file, { stdin: input });
    case 'javascript':
      return node.runFile(file, { stdin: input });
  }
}

export default async function handler(req, res) {
  if (hasCookie('sessionID', { req, res })) {
    console.log('Cookie Hai 🥳');
  } else {
    console.log('Cookie Gayab Hai 💀');
    return res.status(401).json({ success: false, data: null, messgage: 'Unauthorized Access 💀' });
  }
  printConsole('Body', req.body);
  const { lang, code, input } = req.body;
  // Create Lang Specific Directory
  const myDir = makeDirectory(lang);
  if (myDir === null) res.status(500).json({ message: 'Something Went Wrong' });
  // Create Lang Specific File in the Directory
  const myFile = makeSourceFile(myDir, lang, code);
  if (myFile === null) res.status(500).json({ message: 'Something Went Wrong' });
  // Compile the code
  let codePromise = compileCode(lang, myFile, input);
  codePromise
    .then((result) => {
      printConsole('Compilaton Result', result);
      const op = { ...result, file: myFile };
      try {
        fs.rmSync(myDir, { recursive: true });
        const exeFile = op?.exe;
        if (exeFile !== 'gcc') {
          if (exeFile === 'javac') {
            const folderPath = op?.stderr.split(`/Main.java`)[0];
            console.log('Folder path: ', folderPath);
            fs.rmSync(folderPath, { recursive: true });
          } else {
            printConsole('Exe File', op?.exe);
            fs.rmSync(op?.exe, { recursive: true });
          }
        }
      } catch (err) {
        printConsole('Directory Deletion Err', err);
      }
      res.json({ success: true, op });
    })
    .catch((err) => {
      printConsole('Error', err);
      const op = { ...err, file: myFile };
      try {
        fs.rmSync(myDir, { recursive: true });
      } catch (err) {
        printConsole('Directory Deletion Err', err);
      }
      res.json({ success: false, op });
    });
}
