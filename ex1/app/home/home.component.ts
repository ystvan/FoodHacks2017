import { Component} from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Event } from '../_models/index';
import { EventService } from '../_services/index';
import { AlertService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent{
    currentUser: User;
    users: User[] = [];
	
    model: any = {};

    constructor(private userService: UserService ,private eventService: EventService,   private alertService: AlertService)
	{		
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

 
}