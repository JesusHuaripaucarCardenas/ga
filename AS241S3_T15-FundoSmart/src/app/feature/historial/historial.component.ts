// historial.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FruitService } from '../../core/services/fruit.service';
import { Fruit } from '../../core/interfaces/fruit';
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  fruits: Fruit[] = [];

  constructor(private fruitService: FruitService) {}

  ngOnInit(): void {
    this.fruitService.findAll()
      .subscribe(data => this.fruits = data);
  }
}
