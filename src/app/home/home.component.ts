import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServers(id: number) {
    // navigate pass arrary as a param
    // queryParams: {key: value} 帶 query string 到 path
    // fragment: 帶 #string 到 path
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: 1}, fragment: "loading"})
  }

  onLogin() {
    this.authService.loggedIn = true;
  }

  onLogout() {
    this.authService.loggedIn = false;
  }
}
