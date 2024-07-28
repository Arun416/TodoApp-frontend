import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmAlertComponent } from '../confirm-alert/confirm-alert.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[]=[];
  isEditTodo: boolean[] = new Array(this.todos.length).fill(false);
  @ViewChild('f') f!: NgForm;
  currentDate:any;
  constructor(private SimpleModalService: SimpleModalService,private todoService:TodoService) { }


  
  ngOnInit(): void { 
    this.currentDate = Date.now();
    this.fetchMyTodos()
    // this.loadTodos();
  }

  fetchMyTodos(){
    this.todoService.getTodos().subscribe((res:any)=>{
      console.log(res,"result");
        this.todos = res
    })
  }

  get UncompletedTodos(): any[] {
    return this.todos.filter(todo => !todo.isComplete);
  }

  get completedTodosList(): any[] {
    return this.todos.filter(todo => todo.isComplete);
  }

  /* saveTodosLocal(): void {
    localStorage.setItem('todolist',JSON.stringify(this.todos))
  } */

  onSubmit(form:NgForm){    
    let todo = new Todo(form.value.title,false);
    // this.todos.push(todo);
    this.todoService.addTodo(todo).subscribe(res=>{
      console.log(res);
      alert("todo saved")
      this.fetchMyTodos()
    })
    /* this.saveTodosLocal();
    this.loadTodos(); */
    form.resetForm();
  }

  onCompleted(tods:any,id:any){
    setTimeout(() => {
      this.markedTodo(tods,id);
    }, 300);
  }

  markedTodo(todos:any,id:any){
    todos.isComplete = !todos.isComplete;
    console.log(todos);
    this.todoService.updateTodo(todos,id).subscribe(resp=>{
      console.log(resp);
      alert("Todo Updated Successfully");
    })
    // this.saveTodosLocal();
    // this.loadTodos();
  }

  onEditTodo(id:any,index:number){
     let todo:any = this.todos.filter((x: any)=>x._id === id)[0];
    console.log(todo,"selected index");
    // let index = this.todos.indexOf(todo,0)  
    this.isEditTodo[index] = !this.isEditTodo[index];
    console.log(this.isEditTodo[index]);

    if(!this.isEditTodo[index]){
      this.todoService.updateTodo(todo,id).subscribe((resp:any)=>{
        console.log(resp);
        alert(resp.message);
        this.fetchMyTodos();
      })
    } 
   
   /*  this.saveTodosLocal();
    this.loadTodos(); */
  }

  showDeleteConfirm(id: any){
    this.SimpleModalService.addModal(ConfirmAlertComponent, {
      title: 'Delete Confirmation',
      message: 'Are you Confirm to Delete Todo?'})
      .subscribe((isConfirmed) => {
        if(isConfirmed){
        this.todoService.deleteTodo(id).subscribe((res:any)=>{
          alert(res.message);
          this.fetchMyTodos();
        })
       /*  this.saveTodosLocal();
        this.loadTodos(); */
      }
    });
  }

  loadTodos(): void {
    const savedTodos = localStorage.getItem('todolist');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }
  

  //competed Todo

  onUndoFromComplete(todo:any,id: any){
    console.log(this.todos,"uncheck");
    
    setTimeout(() => {
    // let todo = this.completedTodos.filter((x:any)=> x.id === id)[0];
    todo.isComplete = !todo.isComplete;
    console.log(todo);
    this.todoService.updateTodo(todo,id).subscribe(resp=>{
      console.log(resp);
      alert("Todo Updated Successfully");
      this.fetchMyTodos();
    })
    
   /*  this.saveTodosLocal()
    this.loadTodos(); */
   /*  let index = this.completedtodo.indexOf(todo,0);
    if(index>-1){
      this.completedtodo.splice(index,1);
    } */
    // this.todos.push(todo)
  },300)
  }

  onDelCompletedTodo(id: any){
    this.SimpleModalService.addModal(ConfirmAlertComponent, {
      title: 'Delete Confirmation',
      message: 'Are you Confirm to Delete Todo?'})
      .subscribe((isConfirmed) => {
        // Get modal result
        if(isConfirmed){
          this.todoService.deleteTodo(id).subscribe((res:any)=>{
            alert(res.message);
            this.fetchMyTodos();
          })
        }
      })
   /*  let todo = this.todos.filter((x:any)=> x.id === id)[0];
    let index = this.todos.indexOf(todo,0);
    if(index > -1){
      this.todos.splice(index,1);
    } */
  
  /*   this.saveTodosLocal();
    this.loadTodos() */
  }


}
