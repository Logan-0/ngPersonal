import { Location, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  screenHeight: number;
  screenWidth: number;
  navType: string = "nav-other";
  path:string;

  constructor(private router:Router, private loc:Location) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.path = loc.path();

    if (this.loc.path() === '') { 
      this.navType = "nav-splash";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}