declare namespace NodeJS {
  interface Global {
    jest: typeof import('@jest/globals').jest;
  }
}
