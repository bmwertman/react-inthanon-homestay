import React, { Component } from 'react';
import moment from 'moment';

export default class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {moment(this.props.obj.from).format("dddd, MMMM Do YYYY")}
          </td>
          <td>
            {moment(this.props.obj.to).format("dddd, MMMM Do YYYY")}
          </td>
          <td>
            {this.props.obj.room}
          </td>
          <td>
            {this.props.obj.adult}
          </td>
          <td>
            {this.props.obj.child}
          </td>
          <td>
            {this.props.obj.infant}
          </td>
        </tr>
    );
  }
}
