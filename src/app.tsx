declare const Router;
import * as React from "react";
import * as ReactDOM from "react-dom";
import { TodoModel } from "./todoModel";
import { ViewMenu } from "./viewMenu";
import { TodoItem } from "./todoItem";
import { ListActions } from "./listActions";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";
import "./styles/globals.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons/faListCheck";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

class TodoApp extends React.Component<IAppProps, IAppState> {
  public state: IAppState;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
    };
  }

  public newField = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    const setState = this.setState;
    const router = Router({
      "/": setState.bind(this, { nowShowing: ALL_TODOS }),
      "/active": setState.bind(this, { nowShowing: ACTIVE_TODOS }),
      "/completed": setState.bind(this, { nowShowing: COMPLETED_TODOS }),
    });
    router.init("/");
  }

  public handleNewTodoKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    const addTodoInput = this.newField.current;

    event.preventDefault();

    const val = addTodoInput.value.trim();

    // Find badges
    const substring = "@";
    let badges = val.split(" ").filter((v) => v.includes(substring));

    // Find title
    const title = val.split(" ").filter((v) => !v.includes(substring));

    // Prevent duplicates
    badges = [...new Set(badges)];

    if (val) {
      this.props.model.addTodo(title.join(" "), badges);
      addTodoInput.value = "";
    }
  }

  public toggleAll(event: React.FormEvent) {
    const target: any = event.target;
    const checked = target.checked;
    this.props.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.props.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.props.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({ editing: todo.id });
  }

  public save(todoToSave: ITodo, text: string, badges: string[]) {
    this.props.model.save(todoToSave, text, badges);
    this.setState({ editing: null });
  }

  public cancel() {
    this.setState({ editing: null });
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    let selectView;
    let main;
    let listActions;
    const todos = this.props.model.todos;

    const shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    const todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={() => this.cancel()}
        />
      );
    });

    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    const activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      selectView = <ViewMenu completedCount={completedCount} nowShowing={this.state.nowShowing} />;
      listActions = <ListActions completedCount={completedCount} count={activeTodoCount} onClearCompleted={() => this.clearCompleted()} />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <div className="appMenu">
            <div className="markAllWrapper">
              <div className="checkbox checkboxSmall">
                <input id="toggle-all" className="toggle-all" type="checkbox" onChange={(e) => this.toggleAll(e)} checked={activeTodoCount === 0} />
                <label className="label" htmlFor="toggle-all">
                  <span className="labelText">Mark all as complete</span>
                </label>
              </div>
            </div>
            <div className="viewMenu">{selectView}</div>
          </div>
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }

    return (
      <div className="mainContainer">
        <header className="header">
          <h1>
            <FontAwesomeIcon icon={faListCheck} />
          </h1>
        </header>
        <main>
          <div className="container mainContent">
            <div className="row">
              <div className="column">
                <div className="addTaskWrapper">
                  <label htmlFor="newField" className="addIconWrapper">
                    <div className="addIconBck">
                      <FontAwesomeIcon className="addIcon" icon={faPlus} />
                    </div>
                  </label>
                  <input id="newField" ref={this.newField} className="new-todo textInput" placeholder="eg.: groceries @shopping @today" onKeyDown={(e) => this.handleNewTodoKeyDown(e)} autoFocus={true} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column">{main}</div>
            </div>
          </div>
          <div className="listActionsContainer mainContent">
            <div className="container">
              <div className="row">
                <div className="column">{listActions}</div>
              </div>
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
    );
  }
}

const model = new TodoModel("react-todos");

function render() {
  ReactDOM.render(<TodoApp model={model} />, document.getElementById("todoapp"));
}

model.subscribe(render);
render();
