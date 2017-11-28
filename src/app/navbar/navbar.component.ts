import { Component } from '@angular/core';
import { ClockService } from "./clock.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {  
   time: Date;

  constructor(private clockService: ClockService) {
  }

  ngOnInit() {
    this.clockService.getClock().subscribe(time => this.time = time);
  }
}
