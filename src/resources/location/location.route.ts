import { Router } from "express";
import { authenticated } from "../../middleware/jwt.middleware";
import AppRouter from "../../utils/interface/appRouter.interface";
import { addLocation } from "./location.controller";

class LocationRouter implements AppRouter{
    public path = '/location'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes():void {
        this.router.route(`${this.path}`)
            .post(authenticated, addLocation)
            .get(authenticated)
        
        this.router.route(`${this.path}/:id`)
            .patch(authenticated)
            .get(authenticated)
            .delete(authenticated)
    }
}

export default LocationRouter