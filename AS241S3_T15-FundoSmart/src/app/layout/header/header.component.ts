import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]})
export class HeaderComponent {
  showCategoriesPanel = false;

  toggleCategoriesPanel(): void {
    this.showCategoriesPanel = !this.showCategoriesPanel;
  }

  @HostListener('document:click', ['$event'])
  closePanelOnOutsideClick(event: Event): void {
    // Si el panel está abierto, y se da click fuera del botón, lo cerramos
    if (this.showCategoriesPanel) {
      this.showCategoriesPanel = false;
    }
  }
}
