import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
// import CameraIcon from '../static/img/camera-icon.png'


// const camera = <FontIcon className="materials-icons">camera_enhance</FontIcon>
/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spins: 0
    }

    this.options = ["animals", "travel", "stationaries"];
    //Warning, this optionsClasses must be in the same order
    // and have corresponding css classes to the options
    this.optionsClasses = ["spinLandmarks", "spinLogos", "spinLabels"];
    this.startAngle = 10;
    this.arc = Math.PI / (this.options.length / 2);
    this.spinTimeout = null;
    this.spinArcStart = 10;
    this.spinTime = 0;
    this.spinTimeTotal = 0;
    this.ctx;
    this.totalAngle = 434233241;
    /*
    this.rotateWheel.bind(this);
    this.drawRouletteWheel.bind(this);
    this.spin.bind(this);
    this.stopRotateWheel.bind(this);
    this.rotateWheel.bind(this);
    this.easeOut.bind(this);
    this.RGB2Color.bind(this);
    this.byte2Hex.bind(this);
    */
    this.text;
  }

  componentDidMount() {
    this.drawRouletteWheel();
    // this.spin();       
    $('#canvas').addClass('makeSmaller');    
  }

  drawText(text) {
    this.ctx.font = 'bold 40px Arial';    
    this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
    this.ctx.restore();
  }

  makeSpin() {    
    var randIndex = Math.floor(Math.random() * this.options.length);
    var className = this.optionsClasses[randIndex];
    var text = this.options[randIndex];
    console.log('text', text);
    console.log('className', className);
    $('#canvas').addClass(className);
    this.setState((prevState) => ({spins: prevState.spins+=1}));
    setTimeout(() => {this.drawText(text)}, 2000);
    this.props.getCategory(text, this.state.spins);
  }



  byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

  RGB2Color(r,g,b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;
    
    var red   = Math.sin(frequency*item+2+phase) * width + center;
    var green = Math.sin(frequency*item+0+phase) * width + center;
    var blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    return this.RGB2Color(red,green,blue);
  }

  drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var outsideRadius = 200;
      var textRadius = 160;
      var insideRadius = 125;

      this.ctx = canvas.getContext("2d");
      this.ctx.clearRect(0,0,500,500);

      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;

      this.ctx.font = 'bold 30px Helvetica, Arial';

      for(var i = 0; i < this.options.length; i++) {
        var angle = this.startAngle + i * this.arc;
        //ctx.fillStyle = colors[i];
        this.ctx.fillStyle = this.getColor(i, this.options.length);

        this.ctx.beginPath();
        this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur    = 0;
        this.ctx.shadowColor   = "rgb(220,220,220)";
        this.ctx.fillStyle = "black";
        this.ctx.translate(250 + Math.cos(angle + this.arc / 2) * textRadius, 
                      250 + Math.sin(angle + this.arc / 2) * textRadius);
        this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        var text = this.options[i];
        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
        this.ctx.restore();
      } 

     }
  }

  render() {
    return (
      <div id="space">         
        <canvas id="canvas"  width="500" height="500" onClick={this.makeSpin.bind(this)}></canvas>
      </div>
    )
  }
}
