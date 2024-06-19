import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  screenHeight: number = 768;
  screenWidth: number = 768;
  navType: string = "nav-other";

  constructor(private router: Router) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.router.url === '/home' || '') { 
      this.navType = "nav-splash";
    }
  }
}
