import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      result: {}
    };
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios
      .post(
        'https://us-central1-mmx-programmer.cloudfunctions.net/upload',
        data
      )
      .then(res => {
        // then print response status
        console.log(res.statusText);
        this.setState({ result: res.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <form>
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <button type="button" onClick={this.onClickHandler}>
            Upload
          </button>
        </form>
        <a href={process.env.PUBLIC_URL + '/example.mid'}>Example midi file</a>
        <pre>{JSON.stringify(this.state.result, null, 2)}</pre>
      </div>
    );
  }
}
