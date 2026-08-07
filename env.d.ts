/// <reference types="@rsbuild/core/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly APP_TITLE?: string;
    readonly DEV_PORT?: string;
    readonly SUPABASE_URL?: string;
    readonly SUPABASE_ANON_KEY?: string;
  }
}
