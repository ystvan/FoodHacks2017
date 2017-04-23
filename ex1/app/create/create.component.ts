import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService , EventService} from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'create.component.html'
})

export class CreateComponent {
    model: any = {};

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
		private eventService: EventService) { }
	    public createEvent()
	   {
		this.eventService.create(this.model).subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Event added Successfulyy', true);              
                },
                error => {
                    this.alertService.error(error);
                });
	}



}
