import "express"
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