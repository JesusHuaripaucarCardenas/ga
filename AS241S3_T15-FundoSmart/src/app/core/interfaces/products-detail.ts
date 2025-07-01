export interface ProductsDetail {
  id?: number;
  name: string;
  firstSelection: number;
  klFirst: number;
  thirdSelection: number;
  klThird: number;
  fifthSelection: number;
  klFifth: number;
  matureSelection: number;
  klMature: number;

  // ✅ Agregar esta propiedad:
  confirmed: boolean;
}
