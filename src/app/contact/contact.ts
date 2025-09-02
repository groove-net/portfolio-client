import { Component } from '@angular/core';
import { GlobalDataService, GlobalData } from '../shared/data.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  globalData: GlobalData | null = null;

  constructor(private globalDataService: GlobalDataService) {}

  ngOnInit() {
    this.globalDataService.data$.subscribe((data) => {
      if (data != null)
        this.globalData = data
    });
  }
}
