import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SCERT,
});

const upLoadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on Cloudinary
    const reponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // file has been uploaded
    console.log('file is uploaded on Cloudinary', response.url);
    return reponse;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary files as the upload operation got failed
    return null;
  }
};
export { upLoadOnCloudinary };
