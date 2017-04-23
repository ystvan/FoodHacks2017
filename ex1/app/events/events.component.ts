import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService , EventService} from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'events.component.html'
})

export class EventsComponent implements OnInit {
   
events: Event;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
		private eventService: EventService) { }

    ngOnInit()
	{
        this.loadAllEvents();
    }
    private loadAllEvents() {
        this.eventService.getAll().subscribe(events => { this.events = events; });
    }

}
