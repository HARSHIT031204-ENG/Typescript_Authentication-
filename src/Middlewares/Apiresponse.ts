class ApiResponse {
    statusCode : number
    message : string
    success : boolean
    data? : object | undefined
    constructor(statusCode: number = 200, message: string = "All are okk concept !", data? : object | undefined){
        this.statusCode = statusCode
        this.message = message
        this.success = statusCode < 400
        this.data = data
    }
}

export { ApiResponse }