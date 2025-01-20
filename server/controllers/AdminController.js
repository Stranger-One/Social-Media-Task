import Admin from '../models/AdminModel.js';

export default {
    // Admin signup controller
    adminSignup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            // console.log(req.body)

            // Check if admin already exists
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin already exists'
                });
            }

            // Create new admin
            const admin = new Admin({ name, email, password });
            await admin.save();

            // Generate token 
            const token = await admin.generateAuthToken()

            res.status(201).json({
                success: true,
                message: 'Admin created successfully',
                admin, token
            });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({
                success: false,
                message: 'Error signing up admin',
                error: error.message
            });
        }
    },

    // Admin login controller
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find admin by email
            const admin = await Admin.findOne({ email }).select('+password');
            if (!admin) {
                return res.status(404).json({ success: false, message: 'Invalid credentials' });
            }

            // Verify password
            const isMatch = await admin.verifyPassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = admin.generateAuthToken();

            res.status(200).json({ success: true, message: 'Login successful', token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: 'Error logging in admin', error: error.message });
        }
    },
}


