import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, NavbarComponent]
})
export class AppComponent {
  title = "Logan the Developer's Space";
}
