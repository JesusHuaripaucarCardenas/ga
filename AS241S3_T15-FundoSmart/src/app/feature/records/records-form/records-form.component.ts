import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordDataService } from '../../../shared/record-data.service';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

@Component({
  selector: 'app-records-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records-form.component.html',
  styleUrls: ['./records-form.component.scss'],
})
export class RecordsFormComponent implements OnInit {
  records: any[] = [];

  constructor(private recordData: RecordDataService) {}

ngOnInit(): void {
  this.records = this.recordData.getRecords();
  console.log('🧾 records loaded:', this.records);
}


  eliminar(index: number) {
    this.recordData.deleteRecord(index);
    this.records = this.recordData.getRecords();
  }
}
