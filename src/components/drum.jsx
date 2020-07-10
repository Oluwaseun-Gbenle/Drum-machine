import React, { Component } from 'react';
import './drum.css';

const drumOne = [{
    keyTrigger:'Q',
    keyCode: 81,
    id: 'Bass',
 url:
  'https://freewavesamples.com/files/Bass-Drum-1.wav'
  },
  {
     keyTrigger:'W',
    keyCode: 87,
    id: 'Snare', 
    url: 'https://freewavesamples.com/files/Ensoniq-ESQ-1-Snare.wav'
  },
  {
    keyTrigger:'E',
    keyCode: 69,
    id: 'Hi-Hat', 
    url:
 'https://freewavesamples.com/files/Closed-Hi-Hat-1.wav'   
  }, 
  {
    keyTrigger:'A',
    keyCode: 65,
    id: 'Hi-Hat2',  
    url:
 'https://freewavesamples.com/files/Ensoniq-SQ-1-Open-Hi-Hat.wav' 
  },
 {
    keyTrigger:'S',
    keyCode: 83,
    id: 'Drum-Tom',  
   url:
   'https://freewavesamples.com/files/Floor-Tom-1.wav' 
 },    
{
    keyTrigger:'D',
    keyCode: 68, 
    id: 'Accessory-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
     keyTrigger:'Z',
    keyCode: 90, 
    id: 'Assessory-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
 {
    keyTrigger:'X',
    keyCode: 88, 
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
 },
 {
  keyTrigger:'C',
    keyCode: 67, 
    id: 'Kick-n-Hat',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
 }];


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
 this.handleKeys = this.handleKeys.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this); 
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
 handleKeyPress(event) {
  if (event.keyCode === this.props.keyCode) {
     this.handleKeys();
   }
 } 
  
  
  handleKeys(event) {
    const sound = document.getElementById(this.props.keyTrigger);
  sound.currentTime = 0;
   sound.play();
this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
 }
 
  
  
  render() {
    return (
      <div> 
      <button
         className="drum-pad btn"
         id={this.props.clipId}
         onClick={this.handleKeys}>
        <audio
          id={this.props.keyTrigger}
          src={this.props.clip}
           className="clip">
        </audio>
        {this.props.keyTrigger}
        </button>
      </div> 
  )
  }
}
 class PadBank extends React.Component {
   
   render() {
     let padBank;
     this.props.power === true ?
   
       padBank =
   this.props.playList.map((drumObj,i,arr) => {
   return (
   <DrumMachine
     clipId={arr[i].id}
     clip={arr[i].url}
	   keyTrigger={arr[i].keyTrigger}
		keyCode={arr[i].keyCode} 
	updateDisplay={this.props.updateDisplay}
     power={this.props.power}
     />
   )
         }) :   padBank =
   this.props.playList.map((drumObj,i,arr) => {
   return (
   <DrumMachine
     clipId={arr[i].id}
     clip="#"
	   keyTrigger={arr[i].keyTrigger}
		keyCode={arr[i].keyCode} 
	updateDisplay={this.props.updateDisplay}
     power={this.props.power}
     />
   )
         });
       
     return(
     <div className="pad-bank" >
				{padBank}
			</div>
     )
   }
 }


  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        power: false,
        switch: false,
       currentSound:'',
        player:drumOne,
        volumeChange: 0.3
      }
      this.clearDisplay = this.clearDisplay.bind(this);
       this.volumeControl = this.volumeControl.bind(this);
      this.switchControl = this.switchControl.bind(this);
      this.powerControl = this.powerControl.bind(this);
     this.updateDisplayClip = this.updateDisplayClip.bind(this); 
    }
    
    updateDisplayClip (name) {
      if (this.state.power === true) {
    this.setState({
      currentSound: name
    });
  }
    }
    powerControl() {
    this.setState({
      power: !this.state.power,
     switch: !this.state.switch,
      currentSound:''
    });
  }
  
  switchControl () {
    this.setState({
    switch: !this.state.switch
      });
  } 
    
    volumeControl (e) {
      if(this.state.power === true) {
         this.setState({
        volumeChange: e.target.value,
           currentSound: "Volume: " +  Math.round(e.target.value * 100) 
            });
         setTimeout(() => this.clearDisplay(), 1000);
      }
    }
   clearDisplay() {
    this.setState({
      display: ''
    });
  } 
    
  render() {
     const style = this.state.power === true ? {backgroundColor: 'red'}: {backgroundColor: '#a42727'}    
        {const clips = [].slice.call(document.getElementsByClassName('clip'));
      clips.forEach(sound => {
        sound.volume = this.state.volumeChange
      });
    }
    let optionOne =  <p id= "pstyle" toggleSwitch={this.switchControl}>OFF<button id= "pBtn" style={style} onClick={this.powerControl}></button></p>;
    let optionTwo = <p id= "pstyle" toggleSwitch={this.switchControl}>ON<button id= "pBtn" style={style} onClick={this.powerControl}></button></p>
    return (
      <div id="drum-machine">
          <div className="well"> 
           
            <PadBank
              power={this.state.power}
             playList={this.state.player}
            updateDisplay={this.updateDisplayClip}
 />     
            
            {!this.state.switch? optionOne : optionTwo}
         
            
            <p id="display">{this.state.currentSound}
        </p>
            
            <div id="vol">
            <p id="pVol">Volume</p>
            <input type="range" min="0" max="1" step="0.01" value={this.state.volumeChange} onChange={this.volumeControl} />
              
             
            </div>
            
            </div>
        </div> 
    )
     
  
}
  } 
 
export default App ;