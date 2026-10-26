import { createUserService,
    getallUserService,
    updateUserByIDService,
    getUserByIDService,
    deleteUserByIDService,

 } from "../model/userModel.js";
//Standardise respone

export const handleResponse = (res, status, message, data=null ) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createUser = async(req, res, next) => {
    const {name, email} = req.body;
    
    try {
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, "User Created Successfully", newUser);
    } catch(err) {
        next(err);
    }
    
};

export const getAllUser = async(req, res, next) => {

    try {
        const user = await getallUserService();
        handleResponse(res, 200, "User Fetched Successfully", user);
    } catch(err) {
        next(err);
    }
    
};

export const updateUser = async(req, res, next) => {
    const {name, email} = req.body;
    const {id} = req.params;
    try {
        const user = await updateUserByIDService(name, email, id);
        if(!user) {
            return handleResponse(res, 404, "User Not Found");
        }
        handleResponse(res, 200, "User Updated Successfully", user);
    } catch(err) {
        next(err);
    }
    
};

export const getUser = async(req, res, next) => {
    const {id} = req.params;
    try {
        const user = await getUserByIDService(id);
        if(!user) {
            return handleResponse(res, 404, "User Not Found");
        }
        handleResponse(res, 200, "User Fetched Successfully", user);
    } catch(err) {
        next(err);
    }
    
};

export const deleteUser = async(req, res, next) => {
    const {id} = req.params;
    try {
        const user = await deleteUserByIDService(id);
        if(!user) {
            return handleResponse(res, "404", "User Not Found");
        }
        handleResponse(res, 200, "User Deleted Successfully", user);
    } catch(err) {
        next(err);
    }
    
};