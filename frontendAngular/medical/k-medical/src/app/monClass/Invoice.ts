import { Consultations } from "./Consultations";
import { Treatment } from "./Treatment";

export class Invoice {
  id: number;
  dateIssued: string;
  totalAmount: number;
  consultation: Consultations; // Define a more specific type if available
  treatments: Treatment[];
  prixConsultation:number
  }