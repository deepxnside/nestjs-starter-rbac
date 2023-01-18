import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { response } from "express";
import { ValidationException } from "./validation.exception";


@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter{
    catch(exception: ValidationException, host: ArgumentsHost): any {
        // throw new Error("Method not implemented.");
        const ctx = host.switchToHttp(),
                    res= ctx.getResponse();

        return response.status(400).json({
            statusCode:400,
            createdBy:"ValidatonFilter",
            validationErrors: exception.validationErrors
        })
    }
    
}