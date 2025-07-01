import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordDataService {
  private records: any[] = [];
  private recordsSubject = new BehaviorSubject<any[]>([]);
  public records$ = this.recordsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadFromStorage(): void {
    if (this.isBrowser()) {
      const saved = localStorage.getItem('records');
      this.records = saved ? JSON.parse(saved) : [];
    }
    this.recordsSubject.next(this.records);
  }

  public getRecords(): any[] {
    return this.records;
  }

  public addRecord(record: any): void {
    this.loadFromStorage();
    this.records.unshift({ ...record, id: Date.now() });
    if (this.isBrowser()) {
      localStorage.setItem('records', JSON.stringify(this.records));
    }
    this.recordsSubject.next(this.records); // ⬅️ esto es clave
  }

  public deleteRecord(id: number): void {
    this.records = this.records.filter(r => r.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem('records', JSON.stringify(this.records));
    }
    this.recordsSubject.next(this.records);
  }
}
