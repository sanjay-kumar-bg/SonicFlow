import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async(req,res)=>{
    try {
        const name = req.body.name;
        const description = req.body.description;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"});

        const albumData = {
            name,
            description,
            bgColour,
            image: imageUpload.secure_url
        }

        const album = albumModel(albumData);
        await album.save();

        res.json({success:true,message:"Album added"});
    } catch (error) {
        res.json({success: false});
    }
}

const listAlbum = async(req,res)=>{
    try {
        const allAlbum = await albumModel.find({});
        res.json({success:true,album: allAlbums});
    } catch (error) {
        res.json({success: false});
    }
}

const removeAlbum = async(req,res)=>{
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "album removed"});
    } catch (error) {
        res.json({success: false});
    }
}

export {addAlbum, listAlbum, removeAlbum};