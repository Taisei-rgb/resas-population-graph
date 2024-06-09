interface ImportMetaEnv {
  VITE_RESAS_API_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

export {};

declare global {
  interface Global {
    importMeta: ImportMeta;
  }
}
