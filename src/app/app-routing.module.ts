import { ErrorPageComponent } from './error-page/error-page.component';
import { CanComponentDeactivate, CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerResolver } from './servers/server/server-resolver.service';

// routes 物件包含 path, component
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    // pass dymanic string to path 
    {path: ':id/:name', component: UserComponent},
  ]},
  // canActivate 確保 servers and servers children 僅在 AuthGuard return true 時作用
  // canActivateChild 確保 servers children 僅在 AuthGuard return true 時作用
  {
    path: 'servers', 
    // canActivate: [AuthGuard] ,
    canActivateChild: [AuthGuard] ,
    component: ServersComponent, 
    children: [
      // resolver guard is passed by resolve as an object
    {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
    // canDeactivate angualr 會在要離開 path 時 run CanDeactivateGuard
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}]
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  // data pass static data with the Url
  {path: 'not-found', component: ErrorPageComponent, data: {
    message: 'Page Not Found!'
  }},
  // ** means catch all route that not be found, always put it in the last
  // redirectTo 重新導向至 path
  {path: "**", redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // {useHash: true} 讓 網址如下 http://localhost:4200/#/ 井號前讓伺服器端進行路由處理 抓到 index.html 警號後路由 才由 angular 處理
    // RouterModule.forRoot(appRoutes, {useHash: true}),
    RouterModule.forRoot(appRoutes)
  ],
  // 要有 export 才可以被 app.module.ts import 
  exports: [RouterModule]
})

export class AppRoutingModule {

}