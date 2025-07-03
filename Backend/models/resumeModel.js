import mongoose from "mongoose";
const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    // summary: { type: String, required: true },
    thumbnailLink: { type: String, required: true }, // URL to the thumbnail image
    template:{theme: { type: String, required: true } ,colorPalette:[String]}, // e.g., Modern, Classic, Creative
    
    profileInfo: {
        profilePreviewUrl:String, // URL to the profile preview image
        fullname: { type: String, required: true },
        designation: { type: String, required: true },
        // location: { type: String, required: true },
        // socialLinks: {
        //     linkedin: { type: String, required: true },
        //     github: { type: String, required: true },
        //     website: { type: String, required: true }
        // },
        summary:String
    },
    // contactInfo contains email, phone, location, linkedin, github, and website
    contactInfo: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true },
        linkedin: { type: String, required: true },
        github: { type: String, required: true },
        website: { type: String, required: true }
    },
    //work experience 
    workExperience: [
        {
            companyName: { type: String, required: true },
            role: { type: String, required: true },
            
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            description: { type: String, required: true }
        }
    ],
    // education details
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },

        }
    ],

    //skills section
    skills: [
        {
            skillName: { type: String, required: true },
            progress: { type: Number, required: true } // e.g., Beginner, Intermediate, Expert
        }
    ],
    // projects section
    projects: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            technologies: { type: String, required: true }, // e.g., React, Node.js
            githubLink: { type: String, required: true }, // URL to the GitHub repository
            liveDemo: { type: String, required: true }, // URL to the live demo
            
        }
    ],  
    // certifications section
    certifications: [   
        {
            title: { type: String, required: true },
            issuer: { type: String, required: true },
            year: { type: String, required: true },
            // description: { type: String, required: true }
        }
    ],
    // languages section
    languages: [
        {
            language: { type: String, required: true },
            progress: { type: Number, required: true } // e.g., Beginner, Intermediate, Expert
        }
    ],
    //interests section
    interests: [
        {
            interest: { type: String, required: true }
        }
    ],
    // personalInfo: {
    //     name: { type: String, required: true },
    //     email: { type: String, required: true },
    //     phone: { type: String, required: true }
    // },
    //timestamp for creation and last update
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true  // Automatically manage createdAt and updatedAt fields

    
});

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;
// This model defines the structure of a resume document in MongoDB.
