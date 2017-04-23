import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService , EventService} from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'events.component.html'
})

export class EventsComponent implements OnInit {
    items: any[];
events: Event[] = [];
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
		private eventService: EventService) { }

    createRange(number){
        this.items = [];
        for(var i = 1; i <= number; i++){
            this.items.push(i);
        }
        return this.items;
    }

    ngOnInit()
	{
        this.loadAllEvents();
    }
    private loadAllEvents() {
        this.eventService.getAll().subscribe(events => { this.events = events; });
    }

}
