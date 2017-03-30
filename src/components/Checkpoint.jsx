import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Capture from './Capture'
// import CameraIcon from '../static/img/camera-icon.png'


// const camera = <FontIcon className="materials-icons">camera_enhance</FontIcon>
/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class Checkpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      constraints: { audio: false, video: { width: 400, height: 300 } },
      imageFile: '',
      objective: 'bell',
      result: []
    };
  
  this.handleAnalyzeClick = this.handleAnalyzeClick.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.handleImageFile = this.handleImageFile.bind(this);
  this.dataURItoBlob = this.dataURItoBlob.bind(this);
  }

  handleClick() {
    console.log('clicked');
    var uploader = $('#fileUploader');
    uploader.trigger('click');  
  }

  handleAnalyzeClick(event){
    var self = this;
    var form = new FormData();
    form.append("file", this.state.imageFile);
    console.log(form);

    $.post({
      url: '/analyzePhoto',
      data: form,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log('data back from server:', data);
        self.setState({result: data});
      },
      error: function(err) {
        console.log('error: ', err);
      }
    });
  }

  handleImageFile(event) {
    event.preventDefault();
    var uploader = $('#fileUploader')['0'];
    console.log(uploader);
    if(uploader.files.length === 0) {
      return;
    } else {
      var imageFile = uploader.files["0"];
      this.setState({imageFile: imageFile});
    }
    
    //Only relevant if you want to display the image on canvase -- not currently working
    // const photo = document.getElementById('photo');      
    // const canvas = document.querySelector('canvas');
    // const context = canvas.getContext('2d');
    // const { width, height } = this.state.constraints.video;
    // canvas.width = width;
    // canvas.height = height;

    // const img = new Image();
    // const url = window.URL ? window.URL : window.webkitURL;
    // img.src = url.createObjectURL(imageFile);
    // img.onload = function(e) {
    //     url.revokeObjectURL(this.src);
    // };

    // context.fillStyle = '#FFF';
    // context.fillRect(0, 0, width, height);
    // context.drawImage(img, 0, 0, width, height);
    // // context.setTransform(1, 0, 0, 1, 0, 0);

    // const data = canvas.toDataURL('image/png');
    // photo.setAttribute('src', data);    
  }

  dataURItoBlob (dataURI){
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++){
        ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], { "type": mimeString });
    return bb;
  }

  render() {
    const objectivePassed = this.state.result.indexOf(this.state.objective) !== -1;

    return (
      <div id="checkPointContainer">
        <div id="checkPointTask"> 
           <h1> Task </h1>
           <h4> Beat Jason at Connect </h4>
        </div>
        <div id="space">
        { objectivePassed ? <p> Nice Find! </p> : <p> Sorry. It look like you took a picture of {this.state.result} </p> } 
        </div>
        <div display="none">
        <canvas id="canvas" hidden></canvas>
        <Photo handleAnalyzeClick={this.handleAnalyzeClick}/>
        <input id="fileUploader" type="file" src="img/camera-icon.png" accept="image/*;capture=camera" onChange={this.handleImageFile} />
        </div>
        <div className="camera-iconBox">
          <img  className="img-rounded camera-iconBox" src="img/camera-icon.png" onClick={this.handleClick}/>
        </div>
      </div>
    )
  }
}

const Photo = (props) =>(
  <div className="output" >
    {/*<img id="photo" alt="Your photo" />*/}
    <a id="analyzeButton" onClick={props.handleAnalyzeClick}>
      Analyze Photo
    </a>
  </div>
);

