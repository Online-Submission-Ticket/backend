// Import necessary modules and models

// Function to check if the email belongs to a teacher
export const isTeacher = (email) => {
    return email.includes('@pict.edu');
}

// Validate user function to check if the email exists in the database
export const validateUser = async (email) => {
    try {
        if (isTeacher(email)) {
            const teacher = await Teacher.findOne({ email });
            return !!teacher; // Return true if teacher exists, false otherwise
        } else {
            const student = await Student.findOne({ email });
            return !!student; // Return true if student exists, false otherwise
        }
    } catch (error) {
        console.error("Error validating user:", error);
        return false; // Return false in case of any error
    }
};

// Forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        // Check if email is valid
        if (!(await validateUser(email))) {
            return res.status(400).send({ message: "Invalid email" });
        }

        // Generate reset password token
        const resetPasswordToken = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Redirect user to the new form with reset password token in URL
        res.redirect(`/reset-password?token=${resetPasswordToken}`);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

// Reset password controller
export const resetPasswordFormController = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).send({ message: "Reset password token is required" });
        }

        // Validate reset password token
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

        // Check if token is expired
        const tokenExpiration = new Date(decodedToken.exp * 1000);
        const now = new Date();
        if (now > tokenExpiration) {
            return res.status(400).send({ message: "Reset password token has expired" });
        }

        // Render the reset password form
        res.render('reset-password-form', { token });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

// Login controller remains as it is
