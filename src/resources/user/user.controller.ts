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
    const person = await db('user').insert({
        id: randomUUID(),
        email: email,
        password: hashSync(password, 10),
        name: name,
        role: role?.length > 0 ? role : 'user',
    })
    if(!person) return next(new AppError(400, 'Cannot create a person'))
    responseHandler('Person created successfully',{}, res, 201)
})

export const GetPerson: RequestHandler = catchAsync( async(req, res, next) => {
    const person =  await db('user').select('first_name','last_name','id','email','friends').where('id', req.params.id)
    if(!person) return next(new AppError(400, 'Cannot create a person'))
    responseHandler('Person fetched successfully', person, res, 200)
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

export const addPerson: RequestHandler = catchAsync(async(req, res, next) => {
    const FromUser = await db('user').where('id', req.user.id).select()
    const ToUser = await db('user').where('id', req.params.id).select()
    if(ToUser.length < 1) return next(new AppError(404, 'User id not valid.'))
    
    console.log(FromUser[0].friends,'from')
    console.log(ToUser[0].friends,'to')
    await db('user').update({
        friends: JSON.stringify(FromUser[0].id)
    }).where('id', req.params.id)
    await db('user').update({
        friends: JSON.stringify(ToUser[0].id)
    }).where('id', FromUser[0].id)

    responseHandler('Friends Added',{}, res, 200)
})