import { Router } from "express";
import { authenticated } from "../../middleware/jwt.middleware";
import AppRouter from "../../utils/interface/appRouter.interface";
import { createPerson, loginPerson } from "./user.controller";

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
    }
}

export default PersonRouter