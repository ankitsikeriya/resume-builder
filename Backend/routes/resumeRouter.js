import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    createResume, 
    getUserResumes, 
    getResumeById, 
    updateResume, 
     
    deleteResume 
} from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';
const resumeRouter = express.Router();
 resumeRouter.post('/',protect,createResume);
 resumeRouter.get('/',protect,getUserResumes);
 resumeRouter.get('/:id', protect, getResumeById); // Assuming this is to get a specific resume by ID

 resumeRouter.put('/:id', protect, updateResume); // Assuming this is to update a specific resume by ID
 resumeRouter.put('/:id/upload-images', protect, uploadResumeImages);

 resumeRouter.delete('/:id', protect, deleteResume); // Assuming this is to delete a specific resume by IDlk
 export default resumeRouter;