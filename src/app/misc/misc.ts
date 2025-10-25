import { Component } from '@angular/core';
import { GlobalDataService, MiscAsHtml } from '../../services/data.service';

@Component({
  selector: 'app-misc',
  imports: [],
  templateUrl: './misc.html',
  styleUrl: './misc.css'
})
export class Misc {
  miscAsHtml: MiscAsHtml | null = null;

  constructor(private globalDataService: GlobalDataService) { }

  ngOnInit() {
    this.globalDataService.misc$.subscribe((data) => {
      if (data != null)
        this.miscAsHtml = data
    });
  }
}
