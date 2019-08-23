import React, { Component } from 'react';
import axios from 'axios';
import { config } from './config';
import ProgrammingWheel from './ProgrammingWheel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      result: {
        drums: {
          kick: [[], []],
          snare: [[], []],
          hihat: [[], []],
          cymbal: [[], []]
        },
        bass: {
          E: [[], []],
          A: [[], []],
          D: [
            [
              {
                midi: 68,
                name: 'G#4',
                time: 0
              },
              {
                midi: 68,
                name: 'G#4',
                time: 0.5
              },
              {
                midi: 68,
                name: 'G#4',
                time: 2.5
              }
            ],
            [
              {
                midi: 68,
                name: 'G#4',
                time: 1
              },
              {
                midi: 68,
                name: 'G#4',
                time: 1.5
              },
              {
                midi: 68,
                name: 'G#4',
                time: 2
              },
              {
                midi: 68,
                name: 'G#4',
                time: 3
              }
            ]
          ],
          G: [[], []]
        },
        vibraphone: {
          bars: [[], []]
        }
      }
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
      .post(config.endpoint.upload, data)
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
        {/* <pre>{JSON.stringify(this.state.result, null, 2)}</pre> */}
        <ProgrammingWheel data={this.state.result} />
      </div>
    );
  }
}
