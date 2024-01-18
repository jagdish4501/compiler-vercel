export function printConsole(arg1, arg2 = '') {
  if (arg2 === '') {
    console.log(`${arg1} - - - - - - - - - - - - -\n`);
  } else {
    console.log(`${arg1} - - - - - - - - - - - - -\n`, arg2, '\n- - - - - - - - - - - - -');
  }
}
