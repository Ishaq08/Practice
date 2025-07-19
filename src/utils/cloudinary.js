import cloudinary from 'cloudinary'
import fs from 'fs'
import { response } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_key: process.env.CLOUDINARY_API_KEY,
  cloud_scret: process.env.CLOUDINARY_API_SCERT
});
const upLondONCloudinary = async (localFailPath) => {
  try {
    if (!localFailPath) return null;

    const response = await cloudinary.uploadar.upload(localFailPath, {
      resource_type: "atuo"
    })

    console.log("File is upload on cloudinary", response.url);
 fs.unlinkSync(localFailPath);
    return response;
    
  } catch (error) {
    fs.unlinkSync(localFailPath)
    return null
  }
}
export { upLondONCloudinary }