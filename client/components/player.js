import React from 'react';
import PlayerStore from '../stores/player-store.js';
import $ from 'jquery';
var PlayerClass = React.createClass({

  getInitialState: function(){
    return{
      player: PlayerStore.getPlayerState()
    }
  },

  componentDidMount: function(){
    PlayerStore.addChangeListener(this._onChange);

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // var self = this;
    // //  $.ajax({
    // //   url: "https://www.youtube.com/iframe_api",
    // //   dataType: "script"
    // // }).done(function(data){
    // //   console.log(data);
    // //   self.setState({api: data})
    // // })
    
    // $.getScript("https://www.youtube.com/iframe_api", function(a,b,c){
    //   console.log(a,b,c)
    // })
    
  },

  loadPlayer: function(){
    var self = this;
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange (event) {
      console.log(event)
    }

    function stopVideo() {
      console.log(player)
      player.stopVideo();
    }

    function onYouTubeIframeAPIReady() {
      var player = new YT.Player('player', {
        height: self.state.player.height,
        width: self.state.player.width,
        videoId: self.state.player.videoId,
        events: {
          'onReady': onPlayerReady
        }
      })
    }

    return onYouTubeIframeAPIReady;

   
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({playerState: PlayerStore.getPlayerState()})
  },

  search: function(e){
    console.log(e.target.value)
  },


  render: function(){
   return(
      <div>
        <div>
         <div id="player"></div>
        </div>
        <input onChange={this.search} />
        {window.onYouTubeIframeAPIReady = this.loadPlayer()}
      </div>
    ) 
  }

})

module.exports = PlayerClass;