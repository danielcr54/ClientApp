import React, { Component } from 'react';
import { ReactPlayerProps } from 'react-player';
// @ts-ignore
import { callPlayer, getSDK, randomString } from 'react-player/lib/utils';

const MATCH_URL = /mixer\.com\/(?:embed\/player\/)?(.*)$/;
const MATCH_CHANNEL_URL = /mixer\.com\/(.*)$/;
const PLAYER_ID_PREFIX = 'mixer-com-player-';

// TODO: Cleanup and do this with regex instead
function getVideoId(url?: string) {
  if (!url) return void 0;
  const matched = url.match(MATCH_URL);
  if (!matched || !matched[1]) return void 0;

  const idChunkWithParams = matched[1];
  const idChunk = idChunkWithParams.split('?')[0];
  const idChunkArr = idChunk.split('/');

  return idChunkArr[idChunkArr.length - 1];
}

export class Mixer extends Component<ReactPlayerProps> {
  static displayName = 'MixerPlayer';
  static loopOnEnded = true;

  iframeRef: HTMLIFrameElement | null;

  callPlayer = callPlayer;
  playerID = PLAYER_ID_PREFIX + randomString();

  static canPlay = (url: string) => MATCH_URL.test(url);

  load(url: string, isReady: boolean) {
    const { onReady } = this.props;
    if (typeof onReady === 'function') onReady();
  }

  play() {
    return null;
    // this.callPlayer('play');
  }
  pause() {
    return null;
    // this.callPlayer('pause');
  }
  stop() {
    return null;
    // this.callPlayer('pause');
  }
  seekTo(seconds: number) {
    return null;
    // this.callPlayer('seek', seconds);
  }
  setVolume(fraction: number) {
    return null;
    // this.callPlayer('setVolume', fraction);
  }
  mute = () => {
    return null;
    // this.callPlayer('setMuted', true);
  };
  unmute = () => {
    return null;
    // this.callPlayer('setMuted', false);
  };
  getDuration() {
    return null;
    // return this.callPlayer('getDuration');
  }
  getCurrentTime() {
    return null;
    // return this.callPlayer('getCurrentTime');
  }
  getSecondsLoaded() {
    return null;
  }

  setIframeRef = (iframe: HTMLIFrameElement | null) => {
    this.iframeRef = iframe;
  };

  render() {
    const { url, config } = this.props;
    const id = typeof url === 'string' && getVideoId(url);

    if (!id) return null;

    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <div style={style} id={this.playerID}>
        <iframe
          // ref={this.setIframeRef}
          style={style}
          src={`https://mixer.com/embed/player/${id}?disableLowLatency=1`}
          frameBorder="0"
        />
      </div>
    );
  }
}

export default Mixer;
