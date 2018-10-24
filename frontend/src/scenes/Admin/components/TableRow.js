import React, { Component } from 'react';

export default class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.number}
          </td>
          <td>
            {this.props.obj.expiry}
          </td>
          <td>
            {this.props.obj.cvc}
          </td>
        </tr>
    );
  }
}
