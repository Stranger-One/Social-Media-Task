import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [20, 'Name cannot exceed 20 characters']
    },
    socialMediaHandle: {
        type: String,
        required: [true, 'Social media handle is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Social media handle must be at least 2 characters long'],
        maxlength: [20, 'Social media handle cannot exceed 20 characters']
    },
    images: [String]
}, {
    timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;
