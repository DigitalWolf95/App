// import imageCompression from 'browser-image-compression';
//
// export async function imageTOWebp(event: any) {
//   const imageFile = event.target.files[0];
//   console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
//   console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
//
//   const options = {
//     maxSizeMB: 1,
//     maxWidthOrHeight: 1920,
//     useWebWorker: true,
//   };
//   try {
//     const compressedFile = await imageCompression(imageFile, options);
//     console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
//     console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
//
//     return compressedFile;
//   } catch (error) {
//     console.log(error);
//   }
// }
