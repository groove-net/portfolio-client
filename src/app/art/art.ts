import { Component } from '@angular/core';
import { GlobalDataService } from '../shared/data.service';

declare var instgrm: any;

@Component({
  selector: 'app-art',
  imports: [],
  templateUrl: './art.html',
  styleUrl: './art.css'
})

export class Art {
  artworks!: string[];

  constructor(private globalDataService: GlobalDataService) {}

  ngOnInit() {
    this.artworks = this.globalDataService.data!.art;
  }

  ngAfterViewInit() {
    if (typeof instgrm !== 'undefined') {
      instgrm.Embeds.process();
    }
  }
}
