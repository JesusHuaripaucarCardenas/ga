// src/app/models/fruit-selection.model.ts
export interface FruitSelection {
  id?: number;
  name: string;
  firstSelection: number;
  thirdSelection: number;
  fifthSelection: number;
  ripeSelection: number;
  total: number;
  client: string;
  exitDate: string;  // ISO date, p. ej. "2025-03-16"
}
