import { Component, OnInit } from '@angular/core';
import { Transaction } from 'app/front/class/transaction';
import { TransactionDTO } from 'app/front/interface/TransactionDTO ';
import { Deposit } from 'app/front/interface/Deposit';
import { TransactionService } from 'app/front/service/transaction.service';
import { Withdrawal } from 'app/front/interface/Withdrawal';
import { Transfer } from 'app/front/interface/Transfer';
import { LoanPayment } from 'app/front/interface/LoanPayment';
import { IAlert } from 'app/front/components/notification/notification.component';
import { NgForm } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import * as Rellax from 'rellax';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  date_trans: Date;
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  data : Date = new Date();
  focus: any;
  focus1: any;
 transaction : Transaction[];
 transactionForm: FormGroup;
 reCAPTCHAToken: string = "";
 tokenVisible: boolean = false;
 registrationInfo!: Transaction;


  alerts: Array<IAlert> = [];

  
  constructor(private fb: FormBuilder, private transactionService: TransactionService , private recaptchaV3Service: ReCaptchaV3Service) {
    this.transactionForm = this.fb.group({
      id_acc: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      ribEmetteur: [''],
      ribRecipient: [''],
      amount: ['', Validators.required]
    });
   }
  transactionDTO: TransactionDTO ;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  ngOnInit(): void {
    this.date_trans = new Date();
    
  }
   ngOnDestroy(){
  
}
onSubmit() {
  const transactionDTO = this.transactionForm.value;
  this.transactionService.addTransaction(transactionDTO)
    .subscribe(
      response => console.log('Transaction added sumccessfully'),
      error => console.error(error)
    );
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      console.log(`Token [${token}] generated`);
    });
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    
}
getCurrentDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

 /* addTransaction()
   {  
    //this.newTransactionDTO.id_acc= form.value.id_acc;
console.log("transaction = "+JSON.stringify(this.transactionDTO))



    this.transactionService.addTransaction(this.transactionDTO).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
*/
}
