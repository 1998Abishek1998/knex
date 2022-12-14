import { IPerson } from "../resources/person/person.interface";

declare global {
    namespace Express {
        export interface Request {
            user: IPerson
        }
    }
}