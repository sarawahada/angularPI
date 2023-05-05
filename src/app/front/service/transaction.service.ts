import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../class/transaction';
import { TransactionDTO } from '../interface/TransactionDTO ';
import { LoanPayment } from '../interface/LoanPayment';
import { Deposit } from '../interface/Deposit';
import { Withdrawal } from '../interface/Withdrawal';
import { Transfer } from '../interface/Transfer';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8083/transaction';

  constructor(private http: HttpClient) { }
  getAllTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/all`);
  }

  getTransaction(id_trans: number): Observable<Transaction> {
    const url = `${this.baseUrl}/${id_trans}`;
    return this.http.get<Transaction>(url);
  }
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.baseUrl}/${transaction}`;
    return this.http.put<Transaction>(url, transaction);
  }

  deleteTransaction(id_trans: number): Observable<Transaction> {
    const url = `${this.baseUrl}/${id_trans}`;
    return this.http.delete<Transaction>(url);
  }
  getTransactionsByRib(ribEmetteur: string): Observable<any> {
    return this.http.get(this.baseUrl + ribEmetteur, { responseType: 'blob' });
  }
  addTransaction(TransactionDTO: any) {
    return this.http.post(`${this.baseUrl}/add3`, TransactionDTO);
  }
  addTransactions(transaction: any) {
    return this.http.post(`${this.baseUrl}/add-Transaction`, transaction);
  }
  approvetransaction(transaction : any){
    return this.http.post(`${this.baseUrl}/app-Transaction`, transaction); 
  }
  getAllTransactionsEmisesByRib(rib: any): Observable<Blob>{
    
    return this.http.get(`${this.baseUrl}/allEmisesByRib/` + rib, { responseType: 'blob' });
  }
  
 /* addTransaction(transaction: Deposit | Withdrawal | Transfer | LoanPayment): Observable<any> {
    const transactionDTO = {
      id_acc: transaction.id_acc,
      description: transaction.description,
      ribEmetteur: transaction.ribEmetteur,
      ribRecipient: transaction.ribRecipient,
      amount: transaction.amount,
      type: this.getTransactionType(transaction)
    };
    return this.http.post(`${this.baseUrl}/add3`, transactionDTO);
  }

  private getTransactionType(transaction: Deposit | Withdrawal | Transfer | LoanPayment): string {
    if ('ribRecipient' in transaction) {
      return 'TRANSFER';
    }
    if ('ribEmetteur' in transaction) {
      return 'WITHDRAWL';
    }
    if ('amount' in transaction ) {
      return 'LOANPAYMENTS';
    }
    return 'DEPOSITS';
  }*/
}
