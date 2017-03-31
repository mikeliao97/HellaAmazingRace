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
      isMobile: false, 
      constraints: { audio: false, video: { width: 400, height: 300 } },
      imageFile: '',
      category: 'label',
      objective: 'bell',
      result: [],
      blob: ''
    };
  
  this.handleAnalyzeClick = this.handleAnalyzeClick.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.handleImageFile = this.handleImageFile.bind(this);
  }

  // componentDidMount() {
  //   const isMobile = this.state.isMobile;
  //   if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
  //   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
  //     this.setState({isMobile: true}); 
  //   }
  //   console.log('isMobile: ', this.state.isMobile);
  // }  

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
      url: '/analyzePhoto/category/' + this.state.category,
      data: form,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log('data back from server:', data);
        self.setState({result: data[0]});
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
  }
      // <div id="checkPointContainer">
      //   <div id="checkPointTask"> 
      //      <h1> Task </h1>
      //      <h4> Beat Jason at Connect </h4>
      //      { objectivePassed ? <p> Nice Find! </p> : <p> Sorry. It look like you took a picture of {this.state.result} </p> } 
      //   </div>
      //   <div id="space">
      //   </div>
      //   { this.state.isMobile && 
      //     <div>
      //       <input id="fileUploader" type="file" src="img/camera-icon.png" accept="image/*;capture=camera" onChange={this.handleImageFile} />
      //       <div className="camera-iconBox">
      //         <img  className="img-rounded camera-iconBox" src="img/camera-icon.png" onClick={this.handleClick}/>
      //         <img className="img-rounded camera-iconBox" src="img/camera-icon2.png" onClick={this.handleAnalyzeClick}/>   
      //       </div>
      //     </div> 
      //   }
      //   { !this.state.isMobile && 
      //     <Capture state={this.state} />
      //   }
      // </div>

  render() {
    const objectivePassed = this.state.result.indexOf(this.state.objective) !== -1;

    return (
            <div id="checkPointContainer">
        <div id="checkPointTask"> 
           <h1> Task </h1>
           <h4> Beat Jason at Connect </h4>
           { objectivePassed ? <p> Nice Find! </p> : <p> Sorry. It look like you took a picture of {this.state.result} </p> } 
        </div>
        <div id="space">
        </div>
          <div>
            <input id="fileUploader" type="file" src="img/camera-icon.png" accept="image/*;capture=camera" onChange={this.handleImageFile} />
            <div className="camera-iconBox">
              <img  className="img-rounded camera-iconBox" src="img/camera-icon.png" onClick={this.handleClick}/>
              <img className="img-rounded camera-iconBox" src="img/camera-icon2.png" onClick={this.handleAnalyzeClick}/>   
            </div>
          </div> 
      </div>
    )
  }
}

