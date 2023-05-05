
import { NGB_DATEPICKER_DATE_ADAPTER_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'app/front/class/transaction';
import { TransactionService } from 'app/front/service/transaction.service';
import { IAlert } from 'app/front/components/notification/notification.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as Rellax from 'rellax';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {saveAs} from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction : Transaction[];
  alerts: Array<IAlert> = [];
  newTransaction :Transaction = new Transaction();
  ribs : any ;


  constructor(private transactionService : TransactionService , private router: Router) { }
  
  page = 1;
  p:number=0  ;
  pageSize = 5;
  searchText: string;
  @Input() name: string;


  handlePageChange(event: number) {
    this.page = event;
  }

  ngOnInit() :void{
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('app-transaction');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.showTransaction();
    this.getAllTransactionsEmisesByRib(this.ribs);
  }
  showTransaction():void{
    this.transactionService.getAllTransaction().subscribe(
      transactions =>{
        this.transaction = transactions ;

      }
    );
   


  }
  getAllTransactionsEmisesByRib(x:any){
    console.log("x="+x);
    this.transactionService.getAllTransactionsEmisesByRib(x).subscribe(
    blob=> saveAs(blob,"transaction.xlsx")
    )    ;  
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Yourfile has been downloaded',
      showConfirmButton: false,
      timer: 1500
    })
  }
 

 

}
