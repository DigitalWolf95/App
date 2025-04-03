//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires

const { composePlugins, withNx } = require('@nx/next');
const { join } = require('path');
const { buildSync } = require('esbuild');
const fs = require('fs');
const path = require('path');

/**
 * @param {any} a
 */
function testPlugin(a) {
  const swDestPath = path.join(__dirname, './public/service-worker.js');
  const envCacheName = `seven-arch-cache-v-${process.env.NEXT_PUBLIC_SW_CACHE_VERSION}` || 'default-cache';

  buildSync({
    // minify: true,
    // minifySyntax: true,
    bundle: true,
    entryPoints: ['./src/service-worker.ts'],
    outfile: join(__dirname, 'public', 'service-worker.js'),
  });
  

  if (fs.existsSync(swDestPath)) {
    let swContent = fs.readFileSync(swDestPath, 'utf-8');
    swContent = swContent.replace('__CACHE_NAME__', envCacheName);
    fs.writeFileSync(swDestPath, swContent, 'utf-8');
  }

  return a;
}

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    VARCEL_API_TOKEN: process.env.VARCEL_API_TOKEN,
    VARCEL_PROJECT_ID: process.env.VARCEL_PROJECT_ID,
    API_URL: process.env.API_URL,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digital-wolf-storage.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
    // ['']
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  testPlugin,
];

module.exports = composePlugins(...plugins)(nextConfig);
