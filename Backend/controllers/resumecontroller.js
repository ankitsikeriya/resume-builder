import Resume from "../models/resumeModel.js";

export const createResume = async (req, res) => {
//   try {
//     const resume = new Resume(req.body);
//     await resume.save();
//     res.status(201).json(resume);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
    try {
        const {title}= req.body;

        //Default resume data
         const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],

            interests: [''],
        };
        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body, // Merge with any additional data from the request body
        });
        res.status(201).json(newResume);
            
     }catch (error) {
        console.error("Error creating resume:", error);
        res.status(500).json({ message: "Internal server error" });
     }

}
// get all resumes
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// get a single resume by id
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
} 
// update a resume by id
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne(
      { _id: req.params.id, userId: req.user._id },
      
    );
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    
    Object.assign(resume, req.body);
    const savedResume = await resume.save();  
    res.status(200).json(savedResume);  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// delete a resume by id
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    //upload in uploads folder
    const uploadsFolder = Path.join(process.cwd(), 'uploads');
if(resume.thumbnailLink) {
    const oldThumbnail = Path.join(uploadsFolder,path.basename(resume.thumbnailLink));
    if (fs.existsSync(oldThumbnail)) {
      fs.unlinkSync(oldThumbnail); // Delete the old thumbnail file
    }
} 
    if(resume.profileInfo.profilePreviewUrl){
        const oldProfile=path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
        if (fs.existsSync(oldProfile)) {
            fs.unlinkSync(oldProfile); // Delete the old profile preview file
        }
    }
    // Delete the resume file if it exists
    const deleted= await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }
    // if (resume.profileInfo.profileImg) { 
    //   const filePath = `uploads/${resume.profileInfo.profileImg}`;
    //   if (fs.existsSync(filePath)) {
    //     fs.unlinkSync(filePath); 
    //   }
    // }
    // Delete the resume document
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

