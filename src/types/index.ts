export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: Date;
}

export type DealStage = "lead" | "qualified" | "proposal" | "won";

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
}
