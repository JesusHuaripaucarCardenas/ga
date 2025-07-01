import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Seller } from '../../../core/interfaces/seller';
import { SellerService } from '../../../core/services/seller.service';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

@Component({
  selector: 'app-seller-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss']
})
export class SellerListComponent implements OnInit {
  sellers: Seller[] = [];
  mostrarFiltros = false;

  // Modal de edición
  mostrarModalEdit = false;
  selectedSeller: Seller = {} as Seller;

  // Filtro de estado ('A' | 'I' | '')
  estadoFiltro: string = '';

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers(): void {
    this.sellerService.findAll().subscribe({
      next: data => this.sellers = data,
      error: err => console.error('Error al cargar vendedores', err)
    });
  }

  // Getter que aplica el filtro por estado
  get displayedSellers(): Seller[] {
    let arr = [...this.sellers];
    if (this.estadoFiltro) {
      arr = arr.filter(s => s.state === this.estadoFiltro);
    }
    return arr;
  }

  deleteSeller(seller: Seller): void {
    if (!seller.id) return;
    this.sellerService.delete(seller.id)
      .subscribe(() => this.loadSellers());
  }

  restoreSeller(seller: Seller): void {
    if (!seller.id) return;
    this.sellerService.restore(seller.id)
      .subscribe(() => this.loadSellers());
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  filterStatus(status: string): void {
    this.estadoFiltro = status;
    this.mostrarFiltros = false;
  }

  sort(criteria: string): void {
    switch (criteria) {
      case 'nameAsc':
        this.sellers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.sellers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'lastNameAsc':
        this.sellers.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'lastNameDesc':
        this.sellers.sort((a, b) => b.lastName.localeCompare(a.lastName));
        break;
      default:
        console.warn(`Criterio de ordenamiento desconocido: ${criteria}`);
    }
  }

  openEditModal(seller: Seller): void {
    this.selectedSeller = { ...seller };
    this.mostrarModalEdit = true;
  }

  closeEditModal(): void {
    this.mostrarModalEdit = false;
  }

  saveEdit(): void {
    if (!this.selectedSeller.id) return;
    this.sellerService.update(this.selectedSeller)
      .subscribe({
        next: () => {
          this.loadSellers();
          this.closeEditModal();
        },
        error: err => console.error('Error al actualizar vendedor', err)
      });
  }
}
