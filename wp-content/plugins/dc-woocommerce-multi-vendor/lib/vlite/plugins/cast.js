/*!
 * @license MIT
 * @name vlitejs
 * @version 4.1.1
 * @copyright 2022 Joris DANIEL
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VlitejsCast=t():e.VlitejsCast=t()}(globalThis,(()=>(()=>{var e={336:function(e,t,s){var a,i,r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};a=[s,t,s(117)],i=function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),s=r(s);t.default=class{constructor({player:e,options:t={}}){this.providers=["html5"],this.types=["video"],this.player=e,this.options=t,this.subtitles=[],this.backupAutoHide=null,this.onCastStateChange=this.onCastStateChange.bind(this),this.onCurrentTimeChanged=this.onCurrentTimeChanged.bind(this),this.isMediaLoadedChanged=this.isMediaLoadedChanged.bind(this),this.onClickOnCastButton=this.onClickOnCastButton.bind(this),this.updateSubtitle=this.updateSubtitle.bind(this)}init(){window.__onGCastApiAvailable=e=>{e&&this.initCastApi()},this.loadWebSenderApi()}loadWebSenderApi(){const e=document.createElement("script");e.defer=!0,e.type="text/javascript",e.src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1",document.getElementsByTagName("body")[0].appendChild(e)}initCastApi(){this.castContext=window.cast.framework.CastContext.getInstance(),this.castContext.setOptions({receiverApplicationId:window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,autoJoinPolicy:window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED}),this.remotePlayer=new window.cast.framework.RemotePlayer,this.remotePlayerController=new window.cast.framework.RemotePlayerController(this.remotePlayer),this.render(),this.castButton=this.player.elements.container.querySelector(".v-castButton"),this.subtitles=this.getSubtitles(),this.addEvents()}render(){const e=this.player.elements.container.querySelector(".v-controlBar"),t=this.player.elements.container.querySelector(".v-fullscreenButton"),a=`<button class="v-castButton v-controlButton">${s.default}</button>`;e&&(t?t.insertAdjacentHTML("beforebegin",a):e.insertAdjacentHTML("beforeend",a))}addEvents(){this.castContext.addEventListener(window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,this.onCastStateChange),this.remotePlayerController.addEventListener(window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,this.onCurrentTimeChanged),this.remotePlayerController.addEventListener(window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,this.isMediaLoadedChanged),this.castButton.addEventListener("click",this.onClickOnCastButton),this.player.on("trackdisabled",this.updateSubtitle),this.player.on("trackenabled",this.updateSubtitle)}onCastStateChange(e){switch(e.sessionState){case window.cast.framework.SessionState.SESSION_STARTED:this.onSessionStart();break;case window.cast.framework.SessionState.SESSION_RESUMED:this.castContext.endCurrentSession(!0);break;case window.cast.framework.SessionState.SESSION_ENDED:this.onSessionStop()}}onCurrentTimeChanged(){this.player.updateProgressBar({seconds:this.remotePlayer.currentTime,duration:this.remotePlayer.duration,isRemote:!0})}onClickOnCastButton(e){e.preventDefault(),this.castContext.requestSession()}updateSubtitle(){if(!this.remotePlayer.isMediaLoaded)return;const e=this.player.plugins.subtitle.subtitlesList.querySelector(".v-trackButton.v-active").getAttribute("data-language");let t;if("off"===e)t=[];else{const s=this.subtitles.find((({language:t})=>t===e));s&&(t=[s.index])}const s=new window.chrome.cast.media.EditTracksInfoRequest(t);this.getSession().getMediaSession().editTracksInfo(s)}onSessionStart(){this.player.elements.container.focus(),this.player.methodPause(),this.backupAutoHide=this.player.Vlitejs.autoHideGranted,this.player.Vlitejs.autoHideGranted=!1,this.player.Vlitejs.stopAutoHideTimer(),this.player.elements.container.classList.add("v-remote"),this.castButton.classList.add("v-active"),this.player.isCast=!0;const e=this.getSession().getCastDevice().deviceName||"Chromecast";this.player.media.insertAdjacentHTML("afterend",`<span class="v-deviceName">Cast on ${e}</span>`),this.loadMedia()}onSessionStop(){this.player.Vlitejs.autoHideGranted=this.backupAutoHide,this.backupAutoHide&&this.player.Vlitejs.startAutoHideTimer(),this.player.elements.container.classList.remove("v-remote"),this.castButton.classList.remove("v-active"),this.player.isCast=!1,this.player.elements.container.querySelector(".v-deviceName").remove(),this.player.isPaused||(this.player.methodPlay(),this.player.afterPlayPause())}getSubtitles(){return[...this.player.media.querySelectorAll("track")].map(((e,t)=>({index:t,url:e.getAttribute("src"),label:e.getAttribute("label"),language:e.getAttribute("srclang"),isDefault:e.hasAttribute("default")})))}getSession(){return this.castContext.getCurrentSession()}loadMedia(){const e=this.getSession();if(!e)return;const t=new window.chrome.cast.media.MediaInfo(this.player.media.src);t.contentType="video/mp4",this.subtitles.length&&(t.tracks=this.getCastTracks());const s=new window.chrome.cast.media.TextTrackStyle;s.backgroundColor="#ffffff00",s.edgeColor="#00000016",s.edgeType="DROP_SHADOW",s.fontFamily="CASUAL",s.fontScale=1,s.foregroundColor="#ffffffff",t.textTrackStyle=Object.assign(Object.assign({},s),this.options.textTrackStyle||{});const a=new window.chrome.cast.media.GenericMediaMetadata;this.player.options.poster&&(a.images=[new window.chrome.cast.Image(this.player.options.poster)]),t.metadata=Object.assign(Object.assign({},a),this.options.metadata||{});const i=new window.chrome.cast.media.LoadRequest(t);i.autoplay=!1===this.player.isPaused,i.currentTime=this.player.media.currentTime,this.subtitles.length&&(i.activeTrackIds=[this.getActiveTrack().index]),e.loadMedia(i)}getCastTracks(){return this.subtitles.map((({url:e,label:t,language:s},a)=>{const i=new window.chrome.cast.media.Track(a,window.chrome.cast.media.TrackType.TEXT);return i.trackContentId=e,i.trackContentType="text/vtt",i.subtype=window.chrome.cast.media.TextTrackType.SUBTITLES,i.name=t,i.language=s,i}))}getActiveTrack(){return this.subtitles.find((e=>e.isDefault))||this.subtitles[0]}isMediaLoadedChanged(){this.player.on("play",(()=>{this.remotePlayer.isMediaLoaded&&this.remotePlayerController.playOrPause()})),this.player.on("pause",(()=>{this.remotePlayer.isMediaLoaded&&this.remotePlayerController.playOrPause()})),this.player.on("volumechange",(()=>{this.remotePlayer.isMediaLoaded&&this.player.getVolume().then((e=>{this.remotePlayer.volumeLevel=this.player.isMuted?0:e,this.remotePlayerController.setVolumeLevel()}))})),this.player.on("timeupdate",(()=>{this.remotePlayer.isMediaLoaded&&this.player.getCurrentTime().then((e=>{this.remotePlayer.currentTime=e,this.remotePlayerController.seek()}))}))}}}.apply(t,a),void 0===i||(e.exports=i)},117:e=>{"use strict";e.exports='<svg viewBox="0 0 470 384" xmlns="http://www.w3.org/2000/svg"><path d="M426.5 0H42.7C19.1 0 0 19.1 0 42.7v63.9h42.7V42.7h383.8v298.6H277.3V384h149.4c23.6 0 42.7-19.1 42.7-42.7V42.7c0-23.6-19.3-42.7-42.9-42.7ZM0 319.6v63.9h63.9c0-35.3-28.6-63.9-63.9-63.9Zm0-85V277c58.9 0 106.6 48.1 106.6 107h42.7c.1-82.4-66.9-149.3-149.3-149.4ZM192.1 384h42.7C234.3 254.5 129.5 149.7 0 149.4v42.4c106-.2 192 86.2 192.1 192.2Z"/></svg>'}},t={};function s(a){var i=t[a];if(void 0!==i)return i.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};return(()=>{"use strict";s.d(a,{default:()=>t});var e=s(336);const t=s.n(e)()})(),a=a.default})()));