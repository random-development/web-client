import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user/user.service";

export class TokenInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newParams = new HttpParams({fromString: req.params.toString()});
        newParams = newParams.append('access_token', this.userService.token);
        const requestClone = req.clone({
            params: newParams
        });
        return next.handle(requestClone);
    }
}