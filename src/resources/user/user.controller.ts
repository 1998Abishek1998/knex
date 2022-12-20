import { compareSync, hashSync } from "bcrypt";
import { RequestHandler } from "express";
import db from "../../db/dbConfig";
import AppError from "../../utils/appError";
import { catchAsync, responseHandler } from "../../utils/catchAsync";
import { createToken } from "../../utils/token";
import { randomUUID } from "crypto";

export const createPerson: RequestHandler = catchAsync(async(req, res, next) => {
    const { email, name, password, photo, role} = req.body
    if(!email || !name || !password) return next(new AppError(400, 'Please provide all the fields'))

    if(photo){
    }else{
        const person = await db('user').insert({
            id: randomUUID(),
            email: email,
            password: hashSync(password, 10),
            name: name,
            role: role?.length > 0 ? role : 'user',
        })
        if(!person) return next(new AppError(400, 'Cannot create a person'))
        responseHandler('Person created successfully',{}, res, 201)
    }
})

export const loginPerson: RequestHandler =  catchAsync(async (req, res, next) => {
    const { email, password} = req.body
    if(!email || !password) return next(new AppError(404,'Email or password cannot be empty'))
    const person = await db('user').where('email', email)
    if(person.length < 1) return next(new AppError(404,'Email address is not valid'))
    if(!compareSync(password, person[0].password)) return next(new AppError(403, 'Passwords did not match'))

    const token = createToken(person[0])
    responseHandler('Person loggedin', {token}, res, 200)
})