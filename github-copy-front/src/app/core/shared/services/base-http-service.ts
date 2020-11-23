import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class HttpServiceBase {
    protected readonly baseEndPoint = environment.endPoint;

    protected generateQueryParams(params: any) {
        const reduceParamsByKeys = (httpParams: HttpParams, key:string ): HttpParams => {   
            return httpParams.set(key,params[key]);
        }
        const httpParams = Object
            .keys(params)
            .reduce(reduceParamsByKeys, new HttpParams());
        return { params: httpParams };
    }

}