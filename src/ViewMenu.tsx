/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

/* eslint-disable-next-line */
/// <reference path="./interfaces.d.ts"/>

import classNames from "classnames";
import * as React from "react";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";

class ViewMenu extends React.Component<IViewMenuProps> {
  public render() {
    const nowShowing = this.props.nowShowing;
    return (
      <div className="selectViewContainer">
        <div className="viewSitches">
          <span>See: </span>
          <a href="#/" className={classNames({ selected: nowShowing === ALL_TODOS })}>
            All
          </a>

          <a href="#/active" className={classNames({ selected: nowShowing === ACTIVE_TODOS })}>
            Active
          </a>

          <a href="#/completed" className={classNames({ selected: nowShowing === COMPLETED_TODOS })}>
            Completed
          </a>
        </div>
      </div>
    );
  }
}

export { ViewMenu };
