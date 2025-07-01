import { Component, OnInit } from '@angular/core';
import { SalesDataService }  from '../../../core/services/sales-data.service';
import { Sell }              from '../../../core/interfaces/sell';
import { Router }            from '@angular/router';
import { CommonModule }      from '@angular/common';
import { HeaderComponent } from "../../../layout/header/header.component";
import { FooterComponent } from "../../../layout/footer/footer.component";

@Component({
  selector: 'app-semillas-pequenas-cliente',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './semillas-pequenas-cliente.component.html',
  styleUrl: './semillas-pequenas-cliente.component.scss'
})
export class SemillasPequenasClienteComponent implements OnInit {
  sales: Sell[] = [];

  constructor(
    private salesData: SalesDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salesData.sales$.subscribe(list =>
      this.sales = list.filter(s => s.categoria === 'semillas-pequenas')
    );
  }

  openDetails(sale: Sell) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/fruit-data-client', (sale as any).id])
    );
    window.open(url, '_blank');
  }
}
