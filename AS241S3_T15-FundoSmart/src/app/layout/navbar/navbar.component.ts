import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [ CommonModule ],
})
export class NavbarComponent {
  // arranca cerrado
  showDropdown = false;

  constructor(private eRef: ElementRef) {}

  // alterna entre abierto y cerrado
  toggleMenu(): void {
    this.showDropdown = !this.showDropdown;
  }

  // cierra si clicas fuera del componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }
}
