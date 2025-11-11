import * as zod from "zod"
import type { Usre_ValidationSchema } from "../../Middlewares/Register.validation.ts"
declare global {
    namespace Express{
        interface Request {
            validation? : z.infer<typeof Usre_ValidationSchema>,
            user? : z.infer<typeof Usre_ValidationSchema>
        }
    }
}

// import * as express from 'express';
// import { JwtPayload } from "jsonwebtoken";


// declare global {
//     namespace Express {
//     interface Request {
//         cookies?:  Record<string, string>
//     }
//     }
// }