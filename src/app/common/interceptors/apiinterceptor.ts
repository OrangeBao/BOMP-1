import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/do';
// import { UserService } from '../services/user/user.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    getUrl(url): string {
        return environment.host + url;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 区分请求
        const apiReq = req.clone({
            url: this.getUrl(req.url),
            headers: req.headers.set('User-Id', localStorage.getItem('userId') || '0')
        });
        return next.handle(apiReq).do(event => {
            if (event instanceof HttpResponse) {
                // TODO:
            }
        });
    }
}
