import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../../../core/services/sales-data.service';
import { Sell } from '../../../core/interfaces/sell';
import { HeaderComponent } from '../../../layout/header/header.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-client',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {
  citricos: Sell[] = [];
  frutillas: Sell[] = [];
  refrescantes: Sell[] = [];

  constructor(private salesData: SalesDataService) {}

  ngOnInit(): void {
    this.salesData.sales$.subscribe((list: Sell[]) => {
      this.citricos = list.filter(s => s.categoria === 'citricos');
      this.frutillas = list.filter(s => s.categoria === 'frutillas');
      this.refrescantes = list.filter(s => s.categoria === 'refrescantes');
    });
  }
}
