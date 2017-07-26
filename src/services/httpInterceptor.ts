import {Request, Response} from '@angular/http';
import {Inject} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";
import {IHttpInterceptor} from 'angular2-http-interceptor';

@Injectable()
export class HttpService implements IHttpInterceptor {
    constructor(@Inject(Platform) private platform: Platform, private storage: Storage) {

        this.storage.get("lang").then((lang)=>{
            console.log("lang",lang)
        });

    }

    before(request: Request): Request {

            console.log("test");
        return request;
    }
}