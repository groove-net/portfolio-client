import { Component } from '@angular/core';
import { GlobalDataService, GlobalData } from '../../services/data.service';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  globalData: GlobalData | null = null;

  constructor(private globalDataService: GlobalDataService) { }

  ngOnInit() {
    this.globalDataService.data$.subscribe((data) => {
      if (data != null)
        this.globalData = data
    });
  }
}
