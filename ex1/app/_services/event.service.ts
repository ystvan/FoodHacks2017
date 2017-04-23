import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Event } from '../_models/index';


@Injectable()
export class EventService {
    constructor(private http: Http) { }
 
    getAll() {
		 let eventtt: Event;
        return this.http.get('http://localhost:5555/events').map(this.extractData);
    }
 
    create(eventt: Event) {
        return this.http.post('/api/events', eventt).map((response: Response) => response.json());
    }
	 getById(id: number) {
        return this.http.get('/api/events/' + id).map((response: Response) => response.json());
    }
	  private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}