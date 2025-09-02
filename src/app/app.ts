import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Nav } from './shared/nav/nav';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
  currentUrl: string = '';

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  // Check if URL matches /project/:title
  isProjectRoute(): boolean {
    return /^\/projects\/[^\/]+$/.test(this.currentUrl);
  }
}
