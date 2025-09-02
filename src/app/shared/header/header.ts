import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() typewriterEffect: boolean = false;
  name: string = 'Gabriel Adelemoni';
  displayedText: string = '';
  index: number = 0;
  typingSpeed: number = 150; // typing speed (ms)

  ngOnInit() {
    if (this.typewriterEffect) this.type();
    else this.displayedText = this.name;
  }

  type(): void {
    if (this.index < this.name.length) {
      this.displayedText += this.name[this.index];
      this.index++;
      setTimeout(() => this.type(), this.typingSpeed); // typing speed (ms)
    }
  }
}
