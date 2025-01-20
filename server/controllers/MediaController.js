import Media from '../models/MediaModel.js';


export default{
    uploadMedia: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ 
                    success: false,
                    message: 'No files uploaded'
                 });
            }
    
            // Extract image URLs from uploaded files
            const imageUrls = req.files.map(file => file.path);
    
            // Check if media with socialMediaHandle already exists
            const existingMedia = await Media.findOne({ socialMediaHandle: req.body.socialMediaHandle });
    
            let savedMedia;
            if (existingMedia) {
                // Update existing document by adding new images
                await Media.findOneAndUpdate(
                    { _id: existingMedia._id },
                    {
                        $set: { name: req.body.name }, // Update name if provided
                        $push: { images: { $each: imageUrls } } // Push new images to array
                    },
                    { new: true }
                );
                savedMedia = await Media.findById(existingMedia._id); // Get updated document
            } else {
                // Create new media document
                const media = new Media({
                    name: req.body.name,
                    socialMediaHandle: req.body.socialMediaHandle,
                    images: imageUrls
                });
                savedMedia = await media.save();
            }
    
            res.status(200).json({
                success: true,
                message: existingMedia 
                    ? 'Files uploaded successfully and added to existing media'
                    : 'Files uploaded successfully and new media created',
                data: savedMedia
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error uploading files', 
                error: error.message });
        }
    },

    getAllMedia: async (req, res) => {
        try {
            const media = await Media.find({})
            res.status(200).json({ 
                success: true,
                message: 'Media retrieval successfull', 
                media 
            });
        } catch (error) {
            console.error('Retrieval error:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error retrieving media', 
                error: error.message 
            });
        }
    },

    getMediaById: async (req, res) => {
        try {
            const id = req.params.id

            const media = await Media.findById(id)
            if(!media){
                return res.status(404).json({
                    success: false,
                    message: "Media Not Found"
                })
            }

            res.status(200).json({
                success: true,
                message: "Media retrive successfully",
                data: media
            })
            
        } catch (error) {
            console.error('Retrieval error:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error retrieving media', 
                error: error.message 
            });
        }
    }
}