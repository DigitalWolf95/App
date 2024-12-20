declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeJs.ProcessEnv{
      FIREBASE_API_KEY: string
      FIREBASE_APP_ID: string
      FIREBASE_AUTH_DOMAIN: string
      FIREBASE_MEASUREMENT_ID: string
      FIREBASE_MESSAGING_SENDER_ID: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_STORAGE_BUCKET: string;
      VARCEL_API_TOKEN: string;
      VARCEL_PROJECT_ID: string;
      API_URL: string;
      BLOB_READ_WRITE_TOKEN:string;
      AWS_S3_REGION: string;
      AWS_S3_ACCESS_KEY: string;
      AWS_S3_SECRET_ACCESS_KEY: string;
      AWS_S3_BUCKET_NAME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
