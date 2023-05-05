import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction } from 'app/front/class/transaction';
import { TransactionService } from 'app/front/service/transaction.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transactionForm: FormGroup;
  transaction : Transaction[];
  approveForm: FormGroup;
  transactionData: Transaction; // new property to hold the transaction data
  
 
  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      rib_emetteur: [''],
      rib_recipient: [''],
      amount: ['']
    });
    this.approveForm  = this.fb.group({
      code: ['']
  });

    
  }
  ngOnInit(): void {
   
  }

  onSubmit() {
    const transaction = this.transactionForm.value;
    this.transactionService.addTransactions(transaction).subscribe(
      code => {
        this.handleModalShown();
        console.log('Transaction code:', code);
       
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
    Swal.fire({
      title: 'Enter Transaction Code',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Approve Transaction',
      showLoaderOnConfirm: true,
      preConfirm: (code) => {
        return new Promise((resolve, reject) => {
          if (code) {
            resolve(code);
          } else {
            reject('Transaction code cannot be empty');
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        
        const transaction = this.transactionForm.value;
        
        transaction.code = result.value;
        this.transactionService.approvetransaction(transaction).subscribe(
          response => {
            console.log('Transaction approved:', response);
            // handle success
          },
          error => {
            console.error('Transaction approved:', error);
            // handle error
          }
        );
      }
    });
  }
  
  /*oncode(){
    this.transactionService.approvetransaction(transaction)
  }*/

/*handleModalShown() {
  
  const ribEmetteur = this.transactionForm.value.rib_emetteur;
  const ribRecipient = this.transactionForm.value.rib_recipient;
  const amount = this.transactionForm.value.amount;
  
  // Assign the transaction data to the 'transactionData' variable in your component
  this.transactionData = new Transaction();
  this.transactionData.rib_emetteur = ribEmetteur;
  this.transactionData.rib_recipient = ribRecipient;
  this.transactionData.amount = amount;


  // Call the 'approveTransaction' method in your component to send the transaction data to the backend
 
}*/
handleModalShown() {
  
  const ribEmetteur = this.transactionForm.value.rib_emetteur;
  const ribRecipient = this.transactionForm.value.rib_recipient;
  const amount = this.transactionForm.value.amount;
  
  // Assign the transaction data to the 'transactionData' variable in your component
  this.transactionData = new Transaction();
  this.transactionData.rib_emetteur = ribEmetteur;
  this.transactionData.rib_recipient = ribRecipient;
  this.transactionData.amount = amount;

  // Display a Sweet Alert confirmation dialog
  Swal.fire({
   
    title: 'You are about to make a transaction. Please confirm.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, make the transaction!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the 'approveTransaction' method in your component to send the transaction data to the backend
      this.approveTransaction();
    }
  });
}
/*
approveTransaction() {
  this.transactionService.approvetransaction(this.transaction).subscribe(
    response => {
      console.log(response);
      // Handle the response from the backend here
    },
    error => {
      console.log(error);
      // Handle the error from the backend here
    }
  );

}*/
approveTransaction() {
  this.transactionService.approvetransaction(this.transactionData).subscribe(
    response => {
      console.log(response);
      // Handle the response from the backend here
      Swal.fire(
        'Transaction completed',
        'Your transaction has been completed successfully.',
        'success'
      );
    },
    error => {
      console.log(error);
      // Handle the error from the backend here
      Swal.fire(
        'Transaction failed',
        'There was an error processing your transaction.',
        'error'
      );
    }
  );
}

}

