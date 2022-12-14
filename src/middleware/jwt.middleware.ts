import { RequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import db from "../dbConfig";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import Token from "../utils/interface/token.interface";
import { verifyToken } from "../utils/token";

export const authenticated: RequestHandler = catchAsync(async (req, res,next) => {
    const bearer = req.headers.authorization
    if(!bearer || !bearer.startsWith('Bearer ')) return next(new AppError(401, 'Token not found, or Token error'))
    const accessToken = bearer.split('Bearer ')[1].trim()

    const payload: Token | JsonWebTokenError = await verifyToken(accessToken)
    if(payload instanceof JsonWebTokenError) return next(new AppError(401, 'Unauthorized'))
    const user = await db('person').where('id', payload.id)
    if(user.length < 1) return next(new AppError(404, 'User not encrypted with this id'))
    req.user = user[0]
    next()
})

// export const adminAuthenticate: RequestHandler = catchAsync(async (req, res, next) => {
//     const bearer = req.headers.authorization
//     if(!bearer || !bearer.startsWith('Bearer ')) return next(new AppError(401, 'Token not found, or Token error'))
//     const accessToken = bearer.split('Bearer ')[1].trim()

//     const payload: Token | JsonWebTokenError = await verifyToken(accessToken)
//     if(payload instanceof JsonWebTokenError) return next(new AppError(401, 'Unauthorized'))
//     const user = await User.findByPk(payload.id)
//     if(!user) return next(new AppError(404, 'User not encrypted with this id'))
//     if(user.role === 'admin') {
//         req.user = user
//         next()
//     }
//     else return next(new AppError(403, 'You are not verified for this request'))
// })