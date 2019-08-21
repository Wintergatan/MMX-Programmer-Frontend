import React, { Component } from 'react';

export default class ProgrammingWheel extends Component {
  render() {
    const { data } = this.props;
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }
}
