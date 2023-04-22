
import { NGB_DATEPICKER_DATE_ADAPTER_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { Component, OnInit } from '@angular/core';
import { Consultation } from 'app/front/class/consultation';
import { ConsultationService } from 'app/front/service/consultation.service';
import { IAlert } from 'app/front/components/notification/notification.component';
import { NgForm } from '@angular/forms';
import * as Rellax from 'rellax';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css'],
})
export class ConsultationComponent implements OnInit {

  consultations: Consultation[];
  alerts: Array<IAlert> = [];
  newConsultation: Consultation = new Consultation(); // create a new instance of the Consultation class

  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('app-consultation');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.consultationService.getAllConsultations().subscribe(
      consultations => {
        this.consultations = consultations;
      }
    );
  }
  assignConsultToUser(id_cons: number) {
    const id_user = 2; // replace with actual user ID
    this.consultationService.assignConsultToUser(id_cons, id_user).subscribe(
      response => {
        console.log('Consultation assigned to user');
        this.alerts.push({
          id: 2,
          type: 'success',
          strong: 'Success!',
          message: 'An email was sent to the user to inform them.',
          icon: 'ui-2_like'
        });
      },
      error => {
        console.error('Error assigning consultation to user:', error);
      }
    );
  }
  deleteConsultation(id_cons:number) {
    if (confirm('Are you sure you want to delete this consultation?')) {
 this.consultationService.deleteConsultation(id_cons).subscribe(
  Response=>{
      // Show success message
      this.alerts.push({
        id: 2,
        type: 'success',
        strong: 'Success!',
        message: 'Consultation deleted successfully.',
        icon: 'ui-2_like'
      });
    }
      );
    } else {
      // Show cancellation message
      this.alerts.push({
        id: 3,
        type: 'warning',
        strong: 'Cancelled!',
        message: 'Consultation deletion cancelled.',
        icon: 'ui-1_bell-53'
      });
    }
}

  closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}