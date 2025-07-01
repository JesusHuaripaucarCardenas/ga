import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../../../core/services/sales-data.service';
import { Sell } from '../../../core/interfaces/sell';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../layout/header/header.component";
import { FooterComponent } from "../../../layout/footer/footer.component";
import { FormsModule } from '@angular/forms'; // 👈 necesario para ngModel

@Component({
  selector: 'app-citricos-cliente',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './citricos-cliente.component.html',
  styleUrls: ['./citricos-cliente.component.scss']
})
export class CitricosClienteComponent implements OnInit {
  sales: Sell[] = [];
  filteredSales: Sell[] = []; // para mostrar la lista ordenada
  selectedSort: string = 'recomendado';

  constructor(
    private salesData: SalesDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salesData.sales$.subscribe(list => {
      this.sales = list.filter(s => s.categoria === 'citricos');
      this.sortSales(); // aplicar orden inicial
    });
  }

  sortSales() {
    this.filteredSales = [...this.sales]; // copia para no mutar original

    switch (this.selectedSort) {
      case 'precioAsc':
        this.filteredSales.sort((a, b) => a.firstSelection - b.firstSelection);
        break;
      case 'precioDesc':
        this.filteredSales.sort((a, b) => b.firstSelection - a.firstSelection);
        break;
      case 'az':
        this.filteredSales.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        this.filteredSales.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // recomendado u orden original
        this.filteredSales = [...this.sales];
    }
  }

  openDetails(sale: Sell) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/fruit-data-client', (sale as any).id])
    );
    window.open(url, '_blank');
  }
}
