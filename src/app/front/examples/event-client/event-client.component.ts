import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../front/service/event.service";
import {Event} from "../../class/event";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-event-client',
  templateUrl: './event-client.component.html',
  styleUrls: ['./event-client.component.css']
})
export class EventClientComponent implements OnInit {
    events: Event[] = [];
    event: Event = new Event();
    eventId: number;
    userId: number;


  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.showEvent();
      

      this.eventService.retrieveAllevents().subscribe(
          events => {
              this.events = events;

            
          },
          error => console.error(error)
      );


  }

    assignEventToUser() {
        this.eventService.assignEventToUser(this.eventId, this.userId)
            .subscribe(event => {
                console.log(`User assigned to event: ${event.id}`);
                // do something with the updated event if needed
            });

    }


    subscribeToEvent(eventId: number) {
        const userId = this.userId// get the current user ID here
            this.eventService.assignEventToUser(eventId, userId).subscribe(
                event => {
                    // handle success
                },
                error => {
                    // handle error
                }
            );
    }



    showEvent():void{
        this.eventService.retrieveAllevents().subscribe(
            events => {
                this.events = events;
            }
        );
    }

  

   


}

