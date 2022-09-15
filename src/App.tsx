// import React, {FormEvent, useEffect} from 'react';
import './App.css';
import React, { Component } from "react";

type IState = {
  files: any;
  errorMessage: string;
};

class App extends Component {
  state: IState = {
    files: [],
    errorMessage: ''
  };

  handleResponseData = (data: any) => {
    if(data.error) {
      this.setState({errorMessage: data.error})
    }
  };

  onChangeFiles = (e: any) => {
    this.setState({ files: e.target.files, errorMessage: ''})
  };

  onSubmit = async (e: any) => {
    e.preventDefault();

    const { files } = this.state;

    const formData = new FormData();

    for (let i = 0 ; i < files.length ; i++) {
      formData.append("files", files[i]);
    }

    await fetch("/v1/upload", {
      method: "POST",
      body: formData
    }).then(response => response.json())
    .then(data => this.handleResponseData(data))
    .catch((error) => {
      console.log("Error: ", error);
    })
  };  

  render() {
    return (
      <div className="card">
      <div className={["container", "center"].join(' ')}>

      <form onSubmit={this.onSubmit}>

        <input
          onChange={this.onChangeFiles}
          type="file"
          name="files"
          multiple
          className='margin15'
        />

        <br />
        <input type="submit" value="Send" className={['block', 'margin15'].join(' ')} />
        {this.state.errorMessage.length > 0 &&
        <h2 className={['margin15', 'error'].join(' ')}>
          {this.state.errorMessage}
        </h2>
      }
      </form>
      </div>
    </div>
    );
  }
}

export default App;
