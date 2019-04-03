/*!
 * Incodeks Embed Bot
 * (c) 2019 Diamant Haxhimusa
 */

window['addStyleString'] = function(str) {
  var node = document.createElement('style');
  node.innerHTML = str;
  document.head.appendChild(node);
};
window['addHtmlString'] = function(str) {
  var node = document.createElement('div');
  node.innerHTML = str;
  document.body.appendChild(node);
};
/**
 * @name Incodeks Bot
 * @constructor
 * @returns {Object} methods   public functions
 * @example
 * incodeksBot.init({
 *   userToken: "",
 *   microphone: true,
 *   messageColor: "blue",
 *   textColor: "white"
 * });
 */
var incodeksBot = (function () {
	'use strict';

	// Create the methods object
  var methods = {};
  
  /**
   * Init Bot
   * @function
   * @param {Object}  options                         Options of BOT
   * @param {Boolean} [options.microphone=true]       Use the microphone          [optional]
   * @param {String}  [options.messageColor=#a5d175]  Color of the messsage box   [optional]
   * @param {String}  [options.textColor=#fff]        Color of the meesage text   [optional]
   */
  methods.init = function(options) {
    window.incdxOptions = options;
    if (!options.debug) {
        var incdxHtml = '<button id="incdx-bot-open" > <i class="fa fa-comment fa-2x" aria-hidden="true"></i> <i class="fa fa-close fa-2x" aria-hidden="true"></i> </button><div class="incdx-bot bot-hidden" id="incdx-bot-wrapper"><div class="incdx-bot_header"><div class="incdx-bot_header-wrapper"><div class="incdx-bot_header_header-agent-name">TEST BOT</div></div></div><div class="incdx-bot_result" id="resultWrapper"><table class="incdx-bot_result-table"><tbody><tr><td id="incdx-result"></td></tr><tr id="incdx-w-l"></tr></tbody></table></div><div class="clearfix"></div><div class="incdx-bot-form_input"><form id="incdx-bot-form"> <input type="text" name="q" autofocus id="incdx-bot-query" placeholder="Text something..." autocomplete="off" > <button id="incdx-bot-submit" type="submit"> <i class="fa fa-send" id="send"></i> </button><div id="incdx-bot-mic"> <i class="fa fa-microphone" id="incdx-bot-mic-icon"></i><div id="mic-active-container"> <span style="animation: sound-1 1.4s infinite"></span> <span style="animation: sound-2 1.4s 0.25s infinite"></span> <span style="animation: sound-1 1.4s 0.10s infinite"></span> <span style="animation: sound-2 1.4s 0.15s infinite"></span></div></div></form></div></div>';
        // Get message color from options, or set the default one #a5d175.
        var userMessageBackground = options.primaryBackground || "#efefef";
        var botMessageBackground = options.botMessageBackground || "#a5d175";
        var primaryFontColor = options.primaryFontColor || "#fff";
        var errorMessageBackground = options.errorMessageBackground || "#f76949";
        var primaryBackground = options.primaryBackground || "#fff";
        var accentColor = options.accentColor || "#2b303e";
        var incdxStyle = `body{padding:0;margin:0}.incdx-bot .clearfix{clear:both}button#incdx-bot-open{position:fixed;bottom:0;right:0;width:60px;height:60px;color:#fff;background-color:#2b303e;background-position:center center;background-repeat:no-repeat;box-shadow:12px 15px 20px 0 rgba(46, 61, 73, 0.15);border:0;border-radius:50%;cursor:pointer;margin:0px 40px 30px 0px;outline:0 !important;z-index:10002;display:flex;justify-content:center;align-items:center;padding:0px !important}button#incdx-bot-open i{position:absolute}button#incdx-bot-open i:first-child{transition:opacity 0.3s, transform 0.3s}button#incdx-bot-open i:nth-child(2){transition:opacity 0.3s, transform 0.3s;transform:rotate(-180deg) scale(0.5);opacity:0}button#incdx-bot-open.close-bot i:first-child{transform:rotate(180deg) scale(0.5);opacity:0}button#incdx-bot-open.close-bot i:nth-child(2){transform:rotate(0deg) scale(1);opacity:1}.incdx-bot#incdx-bot-wrapper{font-family:'Roboto',sans-serif;position:fixed;width:377px;height:500px;border-radius:16px;overflow:hidden;right:40px;opacity:1;bottom:calc(2 * 30px + 52px);box-shadow:12px 15px 20px 0 rgba(46, 61, 73, 0.15);transition:all 0.2s linear;z-index:10001;color:#fff !important}.incdx-bot#incdx-bot-wrapper.bot-hidden{height:0;width:0;opacity:0;bottom:60px;right:40px;z-index:10001}.incdx-bot .incdx-bot-message-card{display:inline-block;padding:15px 25px;border-radius:3px;border:1px solid #eee;margin-bottom:5px;font-size:16px;clear:both;max-width:250px}.incdx-bot .incdx-message-user-request{background-color:#efefef;float:left;margin-right:15px;margin-top:15px;margin-left:15px;color:#111 !important}.incdx-bot .incdx-message-server-response{color:inherit !important;background-color:#3e4454;float:right;margin-top:15px;margin-right:20px;margin-left:15px;position:relative}.incdx-bot .incdx-message-server-response>.incdx-bot-avatar{background-color:inherit !important;;background-size:contain !important;background-position:center;width:40px;height:40px;border:3px solid;border-color:#fff;border-radius:50%;position:absolute;top:-20px;right:-20px;display:flex;justify-content:center;align-items:center;font-size:1em}.incdx-bot .incdx-message-server-response.server-response-error{background-color:#f76949}.incdx-bot .incdx-bot_result-table tr{background:#fff !important;margin:0 !important;padding:0 !important;border:none !important}.incdx-bot .incdx-bot_result-table td{background:#fff !important;vertical-align:bottom;display:table-cell;margin:0 !important;padding:0 !important}.incdx-bot .incdx-bot_result-table{height:100%;min-height:100%;width:100%;margin:0 !important;padding:0 !important}.incdx-bot #incdx-w-l{height:0px;border:none !important}.incdx-bot .incdx-bot_result{overflow-y:auto;background:#fff;position:absolute;top:65px;bottom:55px;width:100%}.incdx-bot .incdx-bot_header{min-height:65px;height:65px;overflow:hidden;position:absolute;top:0;width:100%;background-color:#2b303e;display:table}.incdx-bot .incdx-bot_header .incdx-bot_header-wrapper{height:100%;display:flex;justify-content:center;align-items:center}.incdx-bot .incdx-bot_header .incdx-bot_header-wrapper .incdx-bot_header_header-agent-name{color:inherit !important;font-size:1.2em}.incdx-bot .incdx-bot-form_input{position:absolute;bottom:0;height:55px;border-top:1px solid lightgray;background-color:white;width:100%}.incdx-bot #incdx-bot-form{display:block;margin-left:15px;margin-right:110px;height:100%}.incdx-bot #incdx-bot-form #incdx-bot-query{width:100%;border:0;font-size:16px;font-weight:300;margin:0;height:100%;padding:0;background:#fff;outline:none !important;box-shadow:none !important}.incdx-bot #incdx-bot-form #incdx-bot-submit, .incdx-bot #incdx-bot-mic{position:absolute;font-size:20px;width:54px !important;height:54px !important;top:0;bottom:0;cursor:pointer;text-align:center;line-height:30px;line-height:54px;background:#fff;color:#b7bbc4;border:none;display:flex;justify-content:center;align-items:center;padding:0px !important}.incdx-bot #incdx-bot-form #incdx-bot-submit{right:54px}.incdx-bot #incdx-bot-mic{right:0}#incdx-bot-mic.active #incdx-bot-mic-icon{display:none}#incdx-bot-mic.active #mic-active-container{display:flex}#mic-active-container{justify-content:space-evenly;width:54px;height:54px;position:relative;padding:0px 7px;display:none}#mic-active-container span{width:6px;height:6px;border-radius:50%;margin:auto;top:0;bottom:0;transition:all .3s}#mic-active-container span:first-child{background:#4285f4}#mic-active-container span:nth-child(2){background:#db4437}#mic-active-container span:nth-child(3){background:#f4b400}#mic-active-container span:nth-child(4){background:#0f9d58}@keyframes sound-1{0%{height:52px;border-radius:30px}10%{height:40px;border-radius:30px}20%{height:45px;border-radius:30px}25%{height:35px;border-radius:30px}30%{height:52px;border-radius:30px}40%{height:37px;border-radius:30px}50%{height:34px;border-radius:30px}60%{height:32px;border-radius:30px}70%{height:27px;border-radius:30px}80%{height:32px;border-radius:30px}85%{height:27px;border-radius:30px}90%{height:32px;border-radius:30px}95%{height:27px;border-radius:30px}100%{height:15px;border-radius:50%}}@keyframes sound-2{0%{height:42px;border-radius:30px}20%{height:32px;border-radius:30px}30%{height:42px;border-radius:30px}40%{height:32px;border-radius:30px}50%{height:31px;border-radius:30px}60%{height:30px;border-radius:30px}70%{height:29px;border-radius:30px}80%{height:30px;border-radius:30px}90%{height:29px;border-radius:30px}100%{height:15px;border-radius:50%}}.incdx-bot #incdx-bot-submit:focus, .incdx-bot #incdx-bot-query:focus{outline:none}.incdx-list-select{background-color:#fff;padding:15px;border-radius:4px;color:#3c4043}.incdx-list-select .incdx-list-select-item{padding:16px 0;border-top:2px solid #d8d8d8;cursor:pointer;min-height:100px}.incdx-list-select .incdx-list-select-title{font-size:28px;color:#3c4043;letter-spacing:0;line-height:36px;text-align:left}.incdx-list-select .incdx-list-select-item .incdx-list-select-item-title{font-size:18px;color:#202124;line-height:24px}.incdx-list-select .incdx-list-select-item .incdx-list-select-item-image{height:76px;width:76px}.incdx-list-select .incdx-list-select-item .incdx-list-select-item-image>img{max-height:100%;max-width:100%;border-radius:0px}.incdx-layout,.incdx-layout-column,.incdx-layout-row{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.incdx-flex{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box}.incdx-layout-column{-webkit-flex-direction:column;flex-direction:column}.incdx-flex-70,.incdx-layout-row>.incdx-flex-70{-webkit-box-flex:1 1 100%;-webkit-flex:1 1 100%;flex:1 1 100%;max-width:70%;max-height:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.incdx-list-select h2{font-size:1.5em;margin:10px 0}`;
        window.addStyleString(incdxStyle);
        window.addHtmlString(incdxHtml);
    }

    if (options.microphone) {
      webSpeech();
    } else {
      var botMic = document.getElementById("incdx-bot-mic");
      botMic.classList.add("hidden");
    }
    // Add Event Listener on button to open the Bot popup
    var openBotButton = document.getElementById('incdx-bot-open');
    openBotButton.addEventListener("click", openBot);

    var form = document.getElementById('incdx-bot-form');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      var message = formData.get("q");
      if (message) {
        sendMessage(message);
      }
    });
  }

  var webSpeech = function () {
    var botMic = document.getElementById("incdx-bot-mic");
    botMic.addEventListener("click", botStartListening)
  }

  var botStartListening = function () {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
    var botMic = document.getElementById("incdx-bot-mic");
    // Toggle voice recognition
    if (window.recognitionActive) {
      window.recognition.stop();
      window.recognitionActive = false;
      botMic.classList.remove("active");
      console.log('Voice recognition deactivated.');  
    } else {
      window.recognition = new SpeechRecognition();
      recognition.start();
      window.recognitionActive = true;
    }
    recognition.onstart = function() {
      botMic.classList.add("active");
      console.log('Voice recognition activated. Try speaking into the microphone.');
    }
    
    recognition.onspeechend = function() {
      botMic.classList.remove("active");
      console.log('You were quiet for a while so voice recognition turned itself off.');
    }
    
    recognition.onerror = function(event) {
      if(event.error == 'no-speech') {
        botMic.classList.remove("active");
        console.log('No speech was detected. Try again.');  
      };
    }

    recognition.onresult = function(event) {
      // event is a SpeechRecognitionEvent object.
      // It holds all the lines we have captured so far. 
      // We only need the current one.
      var current = event.resultIndex;
    
      // Get a transcript of what was said.
      var transcript = event.results[current][0].transcript;
    
      // Send the current transcript to Dialogflow intent detection.
      if (transcript.length) {
        sendMessage(transcript);
        recognition.stop();
      }
    }
  }

  var openBot = function() {
    var incdxBotWrapper = document.getElementById("incdx-bot-wrapper");
    incdxBotWrapper.classList.toggle("bot-hidden");
    var queryInput = document.getElementById('incdx-bot-query');
    if (!this.classList.contains("close-bot")) {
      queryInput.focus();
    }
    this.classList.toggle("close-bot");
  }

  /*
   * Send Message
   * @param {String} message    Message that we send to bot to get intents back and create answers
   */
  var sendMessage = function (message) {
    // test url http://localhost:5000/listselectionsample/us-central1/botFunction
    var options = window.incdxOptions;
    var urlToIncdxBot = 'http://localhost:5000/listselectionsample/us-central1/botFunction';
    var botResultContainer = document.getElementById("incdx-result");
    var botLoadingContainer = document.getElementById("incdx-w-l");
    var resultWrapper = document.getElementById("resultWrapper");
    var qInput = document.getElementById("incdx-bot-query");

    // create user mesasage content and display it to chat
    var userMessage = document.createElement("div");
    userMessage.classList.add("incdx-message-user-request", "incdx-bot-message-card");
    userMessage.innerText = message;
    botResultContainer.appendChild(userMessage);

    // clear input
    qInput.value = "";

    // create bot mesasage content and display it to chat
    console.log(botLoadingContainer.querySelector("#incdx-loading-message"))
    if(!botLoadingContainer.querySelector("#incdx-loading-message")) {
      var loadingMessage = document.createElement("td");
      loadingMessage.classList.add("incdx-loading-td");
      loadingMessage.id = "incdx-loading-message";
      loadingMessage.innerHTML = '<div class="incdx-message-server-response incdx-bot-message-card" >...</div>';
      botLoadingContainer.appendChild(loadingMessage);
    }
    // scroll to bottom of chat
    resultWrapper.scrollTop = resultWrapper.scrollHeight;
    // Make request to firebase functions to return detected intent
    incdxRequest(urlToIncdxBot, {"query": message})
      .then((data) => {
        console.log(data)
        if(loadingMessage) loadingMessage.remove();
        // create bot mesasage content and display it to chat
        var botMessage = document.createElement("div");
            botMessage.classList.add("incdx-message-server-response", "incdx-bot-message-card");
        botResultContainer.appendChild(botMessage);
        var botMessageAvatar = document.createElement("div");
            botMessageAvatar.classList.add("incdx-bot-avatar");
            if (options.botAvatar) {
              botMessageAvatar.style.backgroundImage = `url(${options.botAvatar})`;
            } else {
              botMessageAvatar.innerText = "B";
            }
        botMessage.appendChild(botMessageAvatar);
        // Go through response list
        data.fulfillmentMessages.forEach(fulfillmentMessage => {
          console.log('fulfillmentMessage', fulfillmentMessage)
          var type = fulfillmentMessage.message;
          if(type == "text") {
            var textResponses = document.createElement("div");
            textResponses.classList.add("incdx-text-response");
            textResponses.innerHTML = `
              ${
                fulfillmentMessage.text.text.map(text => {
                  return (
                    `<span>${text}</span>`
                  );
                })
              }
            `;
            botMessage.appendChild(textResponses);
          }
          if (type == "simpleResponses") {
            var simpleResponses = document.createElement("div");
            simpleResponses.classList.add("incdx-simple-response");
            simpleResponses.innerHTML = `
                ${
              fulfillmentMessage.simpleResponses.simpleResponses.map(simpleResponse => {
                return (
                  `<span>${simpleResponse.textToSpeech}</span>`
                );
              })
              }
            `;
            botMessage.appendChild(simpleResponses);
          }
          if (type == "basicCard") {
            var basicCard = document.createElement("div");
            basicCard.classList.add("incdx-basic-card");
            var fulfillmentCard = fulfillmentMessage.basicCard;
            basicCard.innerHTML = `
                <div class="incdx-basic-card-title">${fulfillmentCard.title}</div>
                <span class="incdx-basic-card-subtitle">${fulfillmentCard.subtitle}</span>
                <img class="incdx-basic-card-image" src="${fulfillmentCard.image.imageUri}" alt="${fulfillmentCard.image.accessibilityText}">
                <div class="incdx-basic-card-description">${fulfillmentCard.formattedText}</div>
                <div class="incdx-basic-card-button">
                  <button onclick="window.location='${fulfillmentCard.buttons[0].openUriAction.uri}'">${fulfillmentCard.buttons[0].title}</button>
                </div>
            `;
            botMessage.appendChild(basicCard);
          }
          if (type == "listSelect") {
            var listSelect = document.createElement("div");
            listSelect.classList.add("incdx-list-select");
            listSelect.innerHTML = `<h2 class="incdx-list-select-title">${fulfillmentMessage.listSelect.title}</h2>`;
            fulfillmentMessage.listSelect.items.forEach(listItem => {
              listSelect.innerHTML += `
                <div class="incdx-list-select-item">
                  <div class="incdx-layout-row incdx-flex">
                    <div class="incdx-list-select-item-text incdx-layout-column incdx-flex-70">
                      <div class="incdx-list-select-item-title">${listItem.title}</div> <br/>
                      ${listItem.description.length ? `<span>${listItem.description}</span>` : ""}
                    </div>
                    <div class="incdx-flex"></div>
                    <div class="incdx-list-select-item-image">
                      ${listItem.image.imageUri.length ? `<img src="${listItem.image.imageUri} alt="${listItem.image.accessibilityText}" >` : ""}
                    </div>
                  </div>
                </div>
              `;
            });
            botMessage.appendChild(listSelect);
          }
        });
        resultWrapper.scrollTop = resultWrapper.scrollHeight;
      })
      .catch(error => {
        console.log(error)
        if(loadingMessage) loadingMessage.remove();
        var botMessage = document.createElement("div");
        botMessage.classList.add("incdx-message-server-response", "server-response-error");
        botMessage.innerText = "Sorry, it seemed like there was an error during request.";
        botResultContainer.appendChild(botMessage);
        resultWrapper.scrollTop = resultWrapper.scrollHeight;
      });
  }

  /*
   * Requests
   * @param {String} url    Request url
   * @param {Object} body   Requst body
   * @return {Promise}      The callback promise
   */
  var incdxRequest = function (url, body) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(body ? 'POST': 'GET', url, true);
      request.setRequestHeader("Content-Type", "application/json");
      console.log('url', url)
      request.onload = () => {
        if (request.status != 200)
          return reject("error");
        else return resolve(JSON.parse(request.responseText));
      };
      request.onerror = () => {
        console.log(request)
        return reject("error")
      };
      var data = JSON.stringify(body)
      request.send(data);
    });
  }

	// Expose the public methods
	return methods;
})();
