import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { FruitSelectionService } from '../../../core/services/fruit-selection';
import { FruitSelection } from '../../../core/interfaces/FruitSelection';

@Component({
  selector: 'app-library-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './library-form.component.html',
  styleUrls: ['./library-form.component.scss']
})
export class LibraryFormComponent implements OnInit {
  selections: FruitSelection[] = [];

  constructor(private fsService: FruitSelectionService) {}

  ngOnInit(): void {
    this.fsService.findAll().subscribe(data => this.selections = data);
  }

  isToday(dateStr: string): boolean {
    return new Date(dateStr).toDateString() === new Date().toDateString();
  }
}