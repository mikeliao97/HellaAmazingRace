'use strict';

import React from 'react';

export default class Capture extends React.Component {

  constructor(props) {
    super(props);
    
  this.state = {  
    constraints: { audio: false, video: { width: 400, height: 300 } },
    file: ''
  };

  this.handleImageChange = this.handleImageChange.bind(this);
  this.handleAnalyzeClick = this.handleAnalyzeClick.bind(this);
  this.handleStartClick = this.handleStartClick.bind(this);  
  this.takePicture = this.takePicture.bind(this);  
  this.clearPhoto = this.clearPhoto.bind(this);
  }

  componentDidMount() {
    const constraints = this.state.constraints;
    const getUserMedia = (params) => (  
      new Promise((successCallback, errorCallback) => {
        navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback);
      })
    );

    getUserMedia(constraints)  
    .then((stream) => {
      console.log('gUM stream: ', stream);
      const video = document.querySelector('video');
      const vendorURL = window.URL || window.webkitURL;
      video.src = vendorURL.createObjectURL(stream);
      video.play();
    })
    .catch((err) => {
      console.log(err);
    });

    this.clearPhoto();    
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas');  
    const photo = document.getElementById('photo');  
    const context = canvas.getContext('2d');  
    const { width, height } = this.state.constraints.video;  
    context.fillStyle = '#FFF';  
    context.fillRect(0, 0, width, height);

    const data = canvas.toDataURL('image/png');  
    photo.setAttribute('src', data);
  }

  handleStartClick(event) {
    event.preventDefault();  
    this.takePicture();
  }

  handleAnalyzeClick(event){
    // event.preventDefault();
    var form = new FormData();
    var file = this.state.file;
    console.log('file: ', file);
    form.append('sampleFile', file, file.name);
    console.log('form: ', form);
  }

  handleImageChange(e) {
    e.preventDefault();

    // let reader = new FileReader();
    // let file = e.target.files[0];

    // reader.onloadend = () => {
    //   this.setState({
    //     file: file
    //   });
    // }
    // reader.readAsDataURL(file);
    // console.log('this is the file: ', this.state.file);


  }  

  takePicture() {
    const canvas = document.querySelector('canvas');  
    const context = canvas.getContext('2d');  
    const video = document.querySelector('video');  
    const photo = document.getElementById('photo');  
    const { width, height } = this.state.constraints.video;

    canvas.width = width;  
    canvas.height = height;  
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/png');  
    photo.setAttribute('src', data);
    this.setState({file: photo});
  }

  render() {
    return (
      <div className="capture" >
        <Camera handleStartClick={ this.handleStartClick } />
        <canvas handleImageChange={ this.handleImageChange } id="canvas" hidden></canvas>
        <Photo handleAnalyzeClick={ this.handleAnalyzeClick }/>
      </div>
    );
  }
};

const Camera = (props) => (
    <div className="camera">
    <video id="video"></video>
    <a id="startButton" onClick={ props.handleStartClick }>
      Take photo
    </a>
  </div>
);

const Photo = (props) =>(
  <div className="output" >
    <img id="photo" alt="Your photo" />
    <a id="analyzeButton" onClick={ props.handleAnalyzeClick } >
      Analyze Photo
    </a>
  </div>
);