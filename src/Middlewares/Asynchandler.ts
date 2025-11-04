import type { NextFunction, Request, Response } from "express"

export const AsyncHandler = async (requestHandler: (req: Request, res: Response, next: NextFunction)=> Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}
