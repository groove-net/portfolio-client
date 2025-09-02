import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  items: NavItem[] = [
    { label: '> Projects', route: '/projects' },
    { label: '> Art', route: '/art' },
    { label: '> Misc', route: '/misc' },
    { label: '> FAQ', route: '/faq' },
    { label: '> Contact', route: '/contact' }
  ];
}
