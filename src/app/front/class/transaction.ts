import { Account } from "./account";
export class Transaction {
    id_trans: number;
    description: string;
    date_trans: Date;
    rib_emetteur: string;
    rib_recipient: string;
    amount: number;
    typetrans: string;
    account: Account;
 
  
    constructor() {
      
    }
}
