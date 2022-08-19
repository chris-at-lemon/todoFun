/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

import classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  public state: ITodoItemState;

  constructor(props: ITodoItemProps) {
    super(props);
    this.state = {
      editText: this.props.todo.title,
      editBadges: this.props.todo.badges,
      editType: "",
    };
  }

  public editTitleInput = React.createRef<HTMLInputElement>();
  public editBadgesInput = React.createRef<HTMLInputElement>();

  public handleSubmit() {
    const val = this.state.editText.trim();

    // remove empty items and remove items without @
    const substring = "@";
    let badges = this.state.editBadges.filter((v) => v !== "").filter((v) => v.includes(substring));

    const newBadgesFromTitle = val.split(" ").filter((v) => v.includes(substring));
    const title = val.split(" ").filter((v) => !v.includes(substring));

    // Prevent duplicates
    if (newBadgesFromTitle.length > 0) {
      // when adding from title input
      badges = badges.concat(newBadgesFromTitle.filter((item) => badges.indexOf(item) < 0));
    } else {
      // when adding from badges input
      badges = [...new Set(badges)];
    }

    if (val) {
      this.props.onSave(title.join(" "), badges);
      this.setState({
        editText: title.join(" "),
        editBadges: badges,
      });
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit(editType) {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.title, editBadges: this.props.todo.badges, editType: editType });
  }

  public handleKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title, editBadges: this.props.todo.badges });
      this.props.onCancel(event);
    } else if (event.keyCode === ENTER_KEY) {
      this.handleSubmit();
    }
  }

  public handleChange(event: React.FormEvent) {
    const input: any = event.target;
    this.setState({ editText: input.value });
  }

  public handleBadgesChange(event: React.FormEvent) {
    const input: any = event.target;

    const newBadges = input.value.split(" ");

    this.setState({ editBadges: newBadges });
  }

  public handleRemoveBadges(event: React.MouseEvent, badge: any) {
    const newBadges = this.state.editBadges.filter((v) => v !== badge);

    this.setState({ editBadges: newBadges }, () => {
      this.handleSubmit();
    });
  }

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  // public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState) {
  //   return nextProps.todo !== this.props.todo || nextProps.editing !== this.props.editing || nextState.editText !== this.state.editText;
  // }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  public componentDidUpdate(prevProps: ITodoItemProps) {
    if (!prevProps.editing && this.props.editing) {
      const titleNode = this.editTitleInput.current;
      const badgesNode = this.editBadgesInput.current;

      if (this.state.editType === "editTitle") {
        titleNode.focus();
        titleNode.setSelectionRange(titleNode.value.length, titleNode.value.length);
      }
      if (this.state.editType === "editBadge") {
        badgesNode.focus();
        badgesNode.setSelectionRange(badgesNode.value.length, badgesNode.value.length);
      }
    }
  }

  public render() {
    return (
      <li
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.props.editing,
        })}
      >
        <div className="view">
          <div className="todoDataContainer">
            <div className="titleContainer">
              <div className="checkbox hideOnEdit">
                <input className="toggle" id={this.props.todo.id} type="checkbox" checked={this.props.todo.completed} onChange={this.props.onToggle} aria-label={this.props.todo.title} />
                <label className={`checkLabel label-${this.props.todo.title.split(" ").join("")}`} htmlFor={this.props.todo.id}></label>
                <div
                  onDoubleClick={() => {
                    this.handleEdit("editTitle");
                  }}
                  className="titleText"
                >
                  <span>{this.props.todo.title}</span>
                  <span
                    onClick={() => {
                      this.handleEdit("editTitle");
                    }}
                  >
                    <FontAwesomeIcon className="editIcon" icon={faPenToSquare} />
                  </span>
                </div>
              </div>
              <input ref={this.editTitleInput} className={`editInput textInput ${this.props.todo.title.split(" ").join("")}`} value={this.state.editText} onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyDown(e)} />
            </div>
            <div className="badgesContainer">
              {this.props.todo.badges?.map((badge, i) => {
                return (
                  <div key={i + this.props.todo.id} className={`badge hideOnEdit ${badge.replace("@", "")}`}>
                    <span
                      onClick={() => {
                        this.handleEdit("editBadge");
                      }}
                    >
                      {badge}
                    </span>
                    <button onClick={(e) => this.handleRemoveBadges(e, badge)} className={`btn btn-round btn-xs btn-destroy-badge btn-transparent btn-destroy-${badge.replace("@", "")}`}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                );
              })}
              <input
                ref={this.editBadgesInput}
                className={`editInput textInput editBadges ${this.state.editBadges.join("").replaceAll("@", "")}`}
                value={this.state.editBadges.join(" ")}
                onChange={(e) => this.handleBadgesChange(e)}
                onKeyDown={(e) => this.handleKeyDown(e)}
              />
            </div>
          </div>

          <button className="destroy btn btn-danger btn-sm btn-round btn-destroy" onClick={this.props.onDestroy}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </li>
    );
  }
}

export { TodoItem };
