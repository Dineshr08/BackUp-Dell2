
import JOI from "joi";

const userSchema = JOI.object({
    name: JOI.string().min(3).required(),
    email: JOI.string().email().required(),
});

const validateInputText = (req, res, next) => {
    const {error} = userSchema.validate(req.body);
    if(error) {
         return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }
    next();
};

export default validateInputText;