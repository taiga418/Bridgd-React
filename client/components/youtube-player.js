import React from 'react';
import Actions from '../actions/queue-actions.js';
import QueueStore from '../stores/queue-store.js';

let globalPlayer;

let YoutubePlayer = React.createClass({
  propTypes: {
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    videoID: React.PropTypes.string.isRequired,
    onPlayerStateChange: React.PropTypes.func.isRequired,
    onPlayerReady: React.PropTypes.func.isRequired
  },

  componentWillMount() {

    var loadAPI = (function() {
    var status = null;
    var callbacks = [];

    function onload() {
      status = 'loaded';
      while (callbacks.length) {
        callbacks.shift()();
      }
    }

    return function(callback) {
      if (status === 'loaded') {
        setTimeout(callback, 0);
        return;
      }

      callbacks.push(callback);
      if (status === 'loading') {
        return;
      }

      status = 'loading';
      var script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = onload;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    };

  })();

    this.playerID = 'ytplayer1';
    loadAPI(this._onAPIReady);
  },

  componentWillUnmount() {
    this.player && this.player.destroy();
  },


  render() {
    var {videoID, width, height} = this.props;
    return <div id={this.playerID} />;
  },

  _onAPIReady() {
    if (!this.isMounted()) {
      return;
    }

    var {autoplay, videoID, width, height, theme, onPlayerStateChange, onPlayerReady} = this.props;
    globalPlayer = new YT.Player(this.playerID, {
      width: String(width),
      height: String(height),
      videoId: videoID,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange.bind(this)
      },
      playerVars: {
        autoplay: 0
      },
     
    });
  },

});

export {YoutubePlayer}
