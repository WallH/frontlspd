import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NeedLoggedIn implements CanActivate
{
    constructor(private authDataService:AuthService, private router:Router)
    {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let isLogged = (await this.authDataService.checkLogin()).data.response;
        this.authDataService.validLogin.next(isLogged);
        if(!isLogged)
        {
            this.router.navigateByUrl('auth');
            return false;
        }
        return true;
    }
    
}

@Injectable()
export class NeedLogout implements CanActivate
{
    constructor(private authDataService:AuthService, private router:Router)
    {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let isLogged = (await this.authDataService.checkLogin()).data.response;
        this.authDataService.validLogin.next(isLogged);
        console.log("ASDADA");
        if(isLogged)
        {
            this.router.navigateByUrl('supervisor/valoracionoficial');
            return false;
        }
        return true;
    }
    
}

@Injectable()
export class HavePermission implements CanActivate
{
    mapPermissions = [];
    constructor(private authDataService:AuthService, private router:Router)
    {
    }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let rol = (await this.authDataService.checkLogin()).data.rol;
        if(!route.data.rolNested.includes(rol))
        {
            this.router.navigateByUrl('');
            return false;
        }
        return true;
    }
    
}