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

// routes 物件包含 path, component
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    // pass dymanic string to path 
    {path: ':id/:name', component: UserComponent},
  ]},
  {path: 'servers', component: ServersComponent, children: [
    {path: ':id', component: ServerComponent},
    {path: ':id/edit', component: EditServerComponent}]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  // ** means catch all route that not be found, always put it in the last
  // redirectTo 重新導向至 path
  {path: "**", redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  // 要有 export 才可以被 app.module.ts import 
  exports: [RouterModule]
})

export class AppRoutingModule {

}