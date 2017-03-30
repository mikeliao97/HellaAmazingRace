'use strict';

import React from 'react';

export default class Capture extends React.Component {

  constructor(props) {
    super(props);
    
  this.state = {  
    constraints: { audio: false, video: { width: 400, height: 300 } },
    fileData: '',
    blob: ''
  };

  this.dataURItoBlob = this.dataURItoBlob.bind(this);
  this.download = this.download.bind(this);
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
    let params = {};
    params.image = this.state.fileData;
    console.log(params);

    var form = new FormData();
    form.append("file", this.state.blob);
    console.log(form);

    $.post({
      url: '/analyzePhoto',
      data: form,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log('data back from server:', data);
      },
      error: function(err) {
        console.log('error: ', err);
      }
    });
  }

  download(canvas, filename) {
    var lnk = document.createElement('a'), e;
    
    lnk.download = filename;
    lnk.href = canvas.toDataURL();

    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
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

    this.setState({fileData: data});

    var blob = this.dataURItoBlob(data);

    this.setState({blob: blob});
  }

  dataURItoBlob (dataURI){
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
  }

  render() {
    return (
      <div className="capture" >
        <Camera handleStartClick={ this.handleStartClick } />
        <canvas id="canvas" hidden></canvas>
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