import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[]=[];
  constructor(private http:HttpClient) { }

  getTodos(){
     return this.http.get(environment.apiUrl+"/todo");
  }

  addTodo(todo: Todo):Observable<any>{
    return this.http.post(environment.apiUrl+"/todo",todo);
  }

  updateTodo(todo: Todo,id:string){
    return this.http.patch(environment.apiUrl+"/todo/"+id,todo);
  }

  deleteTodo(id:string){
    return this.http.delete(environment.apiUrl+"/todo/"+id);

  }

}
