import { Transaction } from "../class/transaction";
export interface TransactionDTO {
  id_acc: number;
  description: string;
  RibRecipient: string;
  RibEmetteur: string;
  amount: number;
  typeTrans: string;
  }
