// import React, {FormEvent, useEffect} from 'react';
import './App.css';

// function App() {
//   // useEffect(() => {
//   //   const requestOptions = {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ title: 'React POST Request Example' })
//   // };
//   // fetch('/v1/upload', requestOptions)
//   //     .then(response => response.json())
//   //     .then(data => console.log('data: ', data));
//   // });

//   const onSubmit = async (event: any) => {
//     event.preventDefault();
//     const files = event.target.files;
//     console.log('files: ', event.target);

  //   const formData = new FormData();

  //   for (let i = 0 ; i < files.length ; i++) {
  //     formData.append("files", files[i]);
  //   }

  //   await fetch("/v1/upload", {
  //     method: "POST",
  //     body: formData
  //   }).then(response => response.json())
  //   .then(data => console.log('data: ', data))
  //   .catch((error) => {
  //     console.log("Error: ", error);
  //   })
  // };  

//   return (
//     <div className="card">
//       <div className={["container", "center"].join(' ')}>
//      <form action="/v1/upload" method="post" encType="multipart/form-data" onSubmit={onSubmit}>
//        <input type="file" name="files" multiple className='margin15'/>
//        <button type="submit" className={['block', 'margin15'].join(' ')}>Upload</button>
//       </form>
//       </div>
//     </div>
//   );
// }

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
