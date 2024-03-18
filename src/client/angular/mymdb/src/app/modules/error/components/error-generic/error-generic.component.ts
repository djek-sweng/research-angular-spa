import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-generic',
  templateUrl: './error-generic.component.html',
  styleUrls: ['./error-generic.component.css'],
})
export class ErrorGenericComponent implements OnInit {
  message = '';

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.message = data['message'];
    });
  }
}
