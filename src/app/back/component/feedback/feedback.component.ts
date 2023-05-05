import { Component, OnInit } from '@angular/core';
import { NGB_DATEPICKER_DATE_ADAPTER_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { IAlert } from '../alert/alert.component';
import { NgForm } from '@angular/forms';
import * as Rellax from 'rellax';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Feedback } from 'app/front/class/feedback';
import { FeedbackService } from 'app/front/service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks : Feedback[];
  alerts: Array<IAlert> = [];
  newFeedback: Feedback = new Feedback();
  page = 1;
  p:number=0  ;
  pageSize = 5;

  constructor(private FeedbackService: FeedbackService) {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('app-feedback');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.FeedbackService.getAllFeedBack().subscribe(
      feedback => {
        this.feedbacks = feedback;
      }
    );
   }
   loadFeedbacks(): void {
    this.FeedbackService.getAllFeedBack().subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
      }
    );
  }
   deleteFeedback(id_fb: number): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.FeedbackService.deleteFeedback(id_fb).subscribe(
        response => {
          console.log('Feedback deleted successfully');
          this.alerts.push({
            id: 2,
            type: 'success',
            
            message: 'Feedback deleted successfully.',
           
          });
          this.loadFeedbacks();
        },
        error => {
          console.error('Error deleting feedback:', error);
        }
      );
    } else {
      this.alerts.push({
        id: 3,
        type: 'warning',
        
        message: 'Feedback deletion cancelled.',
        
      });
    }
  }
  generatePdf() {
    const id_event = 1; // replace with the actual event ID
    this.FeedbackService.generateFeedbackSummaryPdf(id_event).subscribe((pdf: Blob) => {
      const url = URL.createObjectURL(pdf);
      window.open(url); // or download the file instead
    });
  
  }
  
getSortedFeedback() {
  this.FeedbackService.getSortedFeedbackByStars().subscribe((data: Feedback[]) => {
    this.feedbacks = data;
  });
}
  

  closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

}
