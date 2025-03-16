import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    await cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
    cloudinary.api.ping()
  .then(response => {
    console.log('Cloudinary connection successful!', response);
  })
  .catch(error => {
    console.error('Error connecting to Cloudinary:', error);
  });
}

export default connectCloudinary;