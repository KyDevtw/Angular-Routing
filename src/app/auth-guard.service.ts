import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router" 
import { Observable } from "rxjs/Observable"
import { AuthService } from "./auth.service"


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return  this.authService.isAuthenticated()
    .then(
      (auth: boolean) => {
        if(auth) {
          return true
        }else {
          this.router.navigate(['/'])
        }
      }
    )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // 邏輯都一樣直接可以 return 
    return this.canActivate(childRoute, state);
  }
}