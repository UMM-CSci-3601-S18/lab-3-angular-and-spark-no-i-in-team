import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
// These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  public todoCategory: string;
  public todoSortBy: string;
  public todoLimit: number;


// Inject the TodoListService into this component.
// That's what happens in the following constructor.
//
// We can call upon the service for interacting
// with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchOwner: string, searchBody: string, searchStatus: boolean,
                     searchCategory: string, searchLimit: number, sortBy: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }

    // Filter by status
    if (searchStatus != null) {
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchStatus || (todo.status === searchStatus);
      });
    }

    // Filter by category
    if (searchCategory != null) {
      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchCategory || todo.category.toLocaleLowerCase().indexOf(searchCategory) !== -1;
      });
    }

    //limit number of todos displayed
    //I thought about doing this in the server, but it only makes sense to limit after all the filtering has been done
    if(searchLimit != null || searchLimit <= 0) {
      this.filteredTodos = this.filteredTodos.slice(0, searchLimit);
    }

    //Sort todos alphabetically by a specified field
    if(sortBy != null) {
      this.filteredTodos = this.sortTodos();
    }

    return this.filteredTodos;
  }

  private sortTodos(): Todo[] {

    switch (this.todoSortBy.toLocaleLowerCase()) {
      case "category": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.category.localeCompare(todo2.category);
        });
        break;
      }
      case "owner": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.owner.localeCompare(todo2.owner);
        });
        break;
      }
      case "status": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.status.toString().localeCompare(todo2.status.toString());
        });
        break;
      }
      case "body": {
        this.filteredTodos = this.filteredTodos.sort((todo1, todo2) => {
          return todo1.body.localeCompare(todo2.body);
        });
        break;
      }
    }

    return this.filteredTodos;
  }


  /**
   * Starts an asynchronous operation to update the todos list
   *
   */
  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoOwner, this.todoBody, this.todoStatus, this.todoCategory, this.todoLimit, this.todoSortBy);
      },
      err => {
        console.log(err);
      });
    return todos;
  }


  ngOnInit(): void {
    this.refreshTodos();
  }
}
