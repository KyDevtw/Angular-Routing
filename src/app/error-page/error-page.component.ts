import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage : string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get data object passe with route
    this.errorMessage = this.route.snapshot.data['message'];
  }

}
