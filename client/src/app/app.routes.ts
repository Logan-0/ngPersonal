import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: SplashComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', component: NotfoundComponent }
];

