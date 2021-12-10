import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { environment } from 'src/environments/environment';
import axios from "axios"
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    protected urlLogin:string;
    validLogin: Subject<boolean> = new BehaviorSubject<boolean>(false);
    constructor()
    {
        this.urlLogin = environment.apiurl + 'auth/';
    }

    get loginVar$()
    {
        return this.validLogin.asObservable();
    }

    async logout()
    {
        return await axios.get(this.urlLogin+'logout',
        {
            withCredentials: true
        });
    }

    async loginPost(login:Login)
    {
        return await (axios.post(this.urlLogin+'login', 
        login, 
        {
            withCredentials:true
        }));
    }

    async checkLogin()
    {
        return await axios.get(this.urlLogin+"checklogin",{
            withCredentials:true
        });
    }
}