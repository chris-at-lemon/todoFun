/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

/* eslint-disable-next-line */
/// <reference path="./interfaces.d.ts"/>

import * as React from "react";
import { Utils } from "./utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

class ListActions extends React.Component<IListActionsProps> {
  public render() {
    const activeTodoWord = Utils.pluralize(this.props.count, "item");
    let clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button className="btn btn-danger btn-roundedCorners clear-completed" onClick={this.props.onClearCompleted}>
          Clear completed <FontAwesomeIcon icon={faTimes} />
        </button>
      );
    }

    return (
      <div className="actionsContainer">
        <div className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left to do
        </div>

        {clearButton}
      </div>
    );
  }
}

export { ListActions };
