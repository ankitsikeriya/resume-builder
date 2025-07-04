import fs from 'fs';
import path from 'path';

import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImages = async (req, res) => {
    try { 
        //configure multer to handle multiple files
        upload.fields([{ name: 'thumbnail'},{name:"profileImage"}])
        (req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(400).json({ message: 'File upload error', error: err.message });
            }

            // 
            const ResumeId = req.params.id;
            const resume = await Resume.findOne({ _id: ResumeId , userId: req.user._id });

            if( !resume ) {
                return res.status(404).json({ message: 'Resume not found' });   
            }
            
            const uploadsFolder = path.join(process.cwd(), 'uploads');
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            const newThumbnail = req.files.thumbnail ?.[0];
            const newProfileImage = req.files.profileImage ?.[0];
            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail= path.join(uploadsFolder,path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail)){
                        fs.unlinkSync(oldThumbnail); // Delete the old thumbnail file
                    }

                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }
            //Same for profile image
            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewLink){
                    const oldProfile= path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
                    if(fs.existsSync(oldProfile)){
                        fs.unlinkSync(oldProfile); // Delete the old profile image file
                    }
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
            }
            await resume.save();
            res.status(200).json({
                message: 'Resume images uploaded successfully',
                
                    thumbnailLink: resume.thumbnailLink,
                    
                        profilePreviewUrl: resume.profileInfo.profilePreviewUrl
                    
                
            });
        });
    }catch (error) {
        console.error('Error uploading resume images:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}