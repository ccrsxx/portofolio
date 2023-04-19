declare namespace NodeJS {
  interface ProcessEnv {
    // Dev URL
    NEXT_PUBLIC_URL: string;

    // Owner Secret
    NEXT_PUBLIC_OWNER_BEARER_TOKEN: string;

    // Email
    EMAIL_ADDRESS: string;
    EMAIL_PASSWORD: string;
    EMAIL_TARGET: string;

    // OAuth Authentication
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;

    // IP Address Salt
    IP_ADDRESS_SALT: string;

    // Firebase
    API_KEY: string;
    AUTH_DOMAIN: string;
    PROJECT_ID: string;
    STORAGE_BUCKET: string;
    MESSAGING_SENDER_ID: string;
    APP_ID: string;

    // Github
    GITHUB_TOKEN: string;

    // Spotify
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REFRESH_TOKEN: string;
  }
}
