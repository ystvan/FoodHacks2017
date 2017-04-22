import { Component } from '@angular/core';

@Component({
  selector: 'dinner-details',
  templateUrl: './dinner-details.component.html',
})
export class DinnerDetailsComponent {
  location = 'address';
  theme = 'theme';
  date = 'date';
  host = 'Name';
  description: 'This is a text where the dinner is described';
}
