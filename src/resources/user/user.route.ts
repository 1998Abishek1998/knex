import { Router } from "express";
import { authenticated } from "../../middleware/jwt.middleware";
import AppRouter from "../../utils/interface/appRouter.interface";
import { addPerson, createPerson, GetPerson, loginPerson } from "./user.controller";

class PersonRouter implements AppRouter{
    public path = '/person'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/login`, loginPerson) 
        this.router.route(`${this.path}`)
            .post(createPerson) 
        this.router.route(`${this.path}/:id`)
            .get(authenticated, GetPerson)
            .put(authenticated, addPerson)
    }
}

export default PersonRouter