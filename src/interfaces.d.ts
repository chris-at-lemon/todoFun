interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  badges: string[];
}

interface ITodoItemProps {
  key: string;
  todo: ITodo;
  editing?: boolean;
  onSave: (val: any, badges: any) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onCancel: (event: any) => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText: string;
  editBadges: string[];
  editType: string;
}

interface IViewMenuProps {
  completedCount: number;
  nowShowing: string;
}

interface IListActionsProps {
  onClearCompleted: any;
  count: number;
  completedCount: number;
}

interface ITodoModel {
  key: any;
  todos: Array<ITodo>;
  onChanges: Array<any>;
  subscribe(onChange);
  inform();
  addTodo(title: string, badges: string[]);
  toggleAll(checked);
  toggle(todoToToggle);
  destroy(todo);
  save(todoToSave, text, badges);
  clearCompleted();
}

interface IAppProps {
  model: ITodoModel;
}

interface IAppState {
  editing?: string;
  nowShowing?: string;
}
