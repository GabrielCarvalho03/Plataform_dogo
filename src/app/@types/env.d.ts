declare namespace NodeJS {
  interface ProcessEnv {
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_CLIENT_ID: string;
    FIREBASE_AUTH_URI: string;
    FIREBASE_TOKEN_URI: string;
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
    FIREBASE_CLIENT_X509_CERT_URL: string;
    FIREBASE_PRIVATE_KEY_ID: string;

    //firebase client

    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;

    //Mercado pago

    NEXT_PUBLIC_MP_PUBLIC_KEY: string;
    NEXT_PUBLIC_MP_ACCESS_TOKEN: string;
    NEXT_PUBLIC_MP_CLIENT_ID: string;
    NEXT_PUBLIC_MP_CLIENT_SECRET: string;
    NEXT_PUBLIC_MP_WEBHOOK_SECRET: string;
    NEXT_PUBLIC_MP_PUBLIC_KEY: string;

    //stripe

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    NEXT_PUBLIC_STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_WEBHOOK_KEY: string;
  }
}
