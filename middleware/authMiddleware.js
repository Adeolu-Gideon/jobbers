import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies;
    if (!token || token === "") throw new UnauthenticatedError("Authentication invalid");

    try {
        const {userId, role} = verifyJWT(token);
        req.user = {userId, role};
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid");
    }
}

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
       if (!roles.includes(req.user.role)) throw new UnauthorizedError("Not authorized to view this resource")
        next() 
    }
}