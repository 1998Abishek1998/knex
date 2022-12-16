import { RequestHandler } from "express";
import AppError from "../../utils/appError";
import { catchAsync, responseHandler } from "../../utils/catchAsync";
import db from "../../db/dbConfig";

export const addLocation: RequestHandler = catchAsync(async(req, res, next) => {
    const { user_id, address_text, postal_code, lat, lng, country} = req.body
    if(!user_id || !address_text || !postal_code || !lat || !lng || !country) return next(
        new AppError(400, 'Please enter all the fields')
    )

    const person = await db('person').select('id').where('id', user_id)
    if(!person) return next(new AppError(404, 'User not found'))
    
    const location = await db('location').insert({
        user_id,
        address_text,
        postal_code,
        lat,
        lng,
        country
    })

    responseHandler('Your location has been created successfully', location, res, 201)
})