import { Component } from '@angular/core';
import { Todo } from './models/todo.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mytodo-app';
  completedtodo:Todo[]=[];

 
 

  


  
}
