import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  screenHeight: number;
  screenWidth: number;
  navType: string = "nav-other";

  constructor(private router: Router) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.router.url === '') { 
      this.navType = "nav-splash";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}