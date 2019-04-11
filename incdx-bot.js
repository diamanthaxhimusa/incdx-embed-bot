/**
 * Embed Bot
 * (c) 2019 Diamant Haxhimusa
 */
var incdxBot = (function () {
	'use strict';

	// Create the public methods object
  var incdxBotPublicMethods = {};
  var generator = {};
  var incdxBotWrapper;
  var queryInput;
  var openBotButton;

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
   * @function init
   * @public
   * @param {Object}  options                         Options of BOT
   * @param {Boolean} [options.microphone=true]       Use the microphone
   * @param {string}  [options.messageColor=#a5d175]  Color of the messsage box
   * @param {string}  [options.textColor=#fff]        Color of the meesage text
   * @example
   * incdxBot.init({
   *   userToken: "",
   *   microphone: true,
   *   messageColor: "blue",
   *   textColor: "white"
   * });
   */
  incdxBotPublicMethods.init = function(options) {
    window.incdxOptions = options;
    if (!options.debug) {
      var incdxHtml = '<button id="incdx-bot-open" > <i class="fa fa-comment fa-2x" aria-hidden="true"></i> <i class="fa fa-close fa-2x" aria-hidden="true"></i> </button><div class="incdx-bot bot-hidden" id="incdx-bot-wrapper"><div class="incdx-bot_header"><div class="incdx-bot_header-wrapper"><div class="incdx-bot_header_header-agent-name">TEST BOT</div></div></div><div class="incdx-bot_result" id="resultWrapper"><table class="incdx-bot_result-table"><tbody><tr><td id="incdx-result"></td></tr><tr id="incdx-w-l"></tr></tbody></table></div><div class="clearfix"></div><div class="incdx-bot-form_input"><form id="incdx-bot-form"> <input type="text" name="q" autofocus id="incdx-bot-query" placeholder="Text something..." autocomplete="off" > <button id="incdx-bot-submit" type="submit"> <i class="fa fa-send" id="send"></i> </button><div id="incdx-bot-mic"> <i class="fa fa-microphone" id="incdx-bot-mic-icon"></i><div id="mic-active-container"> <span style="animation: sound-1 1.4s infinite"></span> <span style="animation: sound-2 1.4s 0.25s infinite"></span> <span style="animation: sound-1 1.4s 0.10s infinite"></span> <span style="animation: sound-2 1.4s 0.15s infinite"></span></div></div></form></div></div>';
      var primaryColor = options.primaryColor || "#3e4454";
      var darkColor = options.darkColor || "#2b303e";
      var lightColor = options.lightColor || "#676f84";
      var fontColor = options.fontColor || "#fff";
      var incdxStyle = `body{padding:0;margin:0}.incdx-bot .clearfix{clear:both}button#incdx-bot-open{position:fixed;bottom:0;right:0;width:60px;height:60px;color: ${fontColor};background-color: ${darkColor};background-position:center center;background-repeat:no-repeat;box-shadow:12px 15px 20px 0 rgba(46, 61, 73, 0.15);border:0;border-radius:50%;cursor:pointer;margin:0px 40px 30px 0px;outline:0 !important;z-index:10002;display:flex;justify-content:center;align-items:center;padding:0px !important}button#incdx-bot-open i{position:absolute}button#incdx-bot-open i:first-child{transition:opacity 0.3s, transform 0.3s}button#incdx-bot-open i:nth-child(2){transition:opacity 0.3s, transform 0.3s;transform:rotate(-180deg) scale(0.5);opacity:0}button#incdx-bot-open.close-bot i:first-child{transform:rotate(180deg) scale(0.5);opacity:0}button#incdx-bot-open.close-bot i:nth-child(2){transform:rotate(0deg) scale(1);opacity:1}.incdx-bot#incdx-bot-wrapper{font-family:'Roboto',sans-serif;position:fixed;width:377px;height:700px;border-radius:16px;overflow:hidden;right:40px;opacity:1;bottom:calc(2 * 30px + 52px);box-shadow:12px 15px 20px 0 rgba(46, 61, 73, 0.15);transition:all 0.2s linear;z-index:10001;color: ${fontColor}!important}.incdx-bot#incdx-bot-wrapper.bot-hidden{height:0;width:0;opacity:0;bottom:60px;right:40px;z-index:10001}.incdx-bot .incdx-bot-message-card{display:inline-block;padding:15px 20px;border-radius:3px;border:1px solid #eee;margin-bottom:5px;font-size:16px;clear:both;max-width:250px}.incdx-bot .incdx-message-user-request{background-color:#efefef;float:left;margin-right:15px;margin-top:15px;margin-left:15px;color:#111 !important}.incdx-bot .incdx-message-server-response{color:inherit !important;background-color: ${primaryColor};float:right;margin-top:15px;margin-right:20px;margin-left:15px;position:relative;user-select:none !important;word-break:break-word}.incdx-bot .incdx-message-server-response.chip-container{margin-bottom:55px}.incdx-bot .incdx-message-server-response>.incdx-bot-avatar{background-color:inherit !important;;background-size:contain !important;background-position:center;width:40px;height:40px;border:3px solid;border-color:#fff;border-radius:50%;position:absolute;top:-20px;right:-20px;display:flex;justify-content:center;align-items:center;font-size:1em}.incdx-bot .incdx-message-server-response.server-response-error{background-color:#f76949}.incdx-bot .incdx-bot_result-table tr{background:#fff !important;margin:0 !important;padding:0 !important;border:none !important}.incdx-bot .incdx-bot_result-table td{background:#fff !important;vertical-align:bottom;display:table-cell;margin:0 !important;padding:0 !important;max-width:355px}.incdx-bot .incdx-bot_result-table{height:100%;min-height:100%;width:100%;margin:0 !important;padding:0 !important}.incdx-bot #incdx-w-l{height:0px;border:none !important}.incdx-bot .incdx-bot_result{overflow-y:auto;background:#fff;position:absolute;top:65px;bottom:55px;width:100%}.incdx-bot .incdx-bot_header{min-height:65px;height:65px;overflow:hidden;position:absolute;top:0;width:100%;background-color: ${darkColor};display:table}.incdx-bot .incdx-bot_header .incdx-bot_header-wrapper{height:100%;display:flex;justify-content:center;align-items:center}.incdx-bot .incdx-bot_header .incdx-bot_header-wrapper .incdx-bot_header_header-agent-name{color:inherit !important;font-size:1.2em}.incdx-bot .incdx-bot-form_input{position:absolute;bottom:0;height:55px;border-top:1px solid lightgray;background-color:#fff;width:100%}.incdx-bot #incdx-bot-form{display:block;margin-left:15px;margin-right:110px;height:100%;background:inherit !important}.incdx-bot #incdx-bot-form #incdx-bot-query{width:100%;border:0;font-size:16px;font-weight:300;margin:0;height:100%;padding:0;background:inherit;outline:none !important;box-shadow:none !important}.incdx-bot #incdx-bot-form #incdx-bot-submit, .incdx-bot #incdx-bot-mic{position:absolute;font-size:20px;width:54px !important;height:54px !important;top:0;bottom:0;cursor:pointer;text-align:center;line-height:30px;line-height:54px;background:#fff;color:#b7bbc4;border:none;display:flex;justify-content:center;align-items:center;padding:0px !important}.incdx-bot #incdx-bot-form #incdx-bot-submit{right:54px}.incdx-bot #incdx-bot-mic{right:0}#incdx-bot-mic.active #incdx-bot-mic-icon{display:none}#incdx-bot-mic.active #mic-active-container{display:flex}#mic-active-container{justify-content:space-evenly;width:54px;height:54px;position:relative;padding:0px 7px;display:none}#mic-active-container span{width:6px;height:6px;border-radius:50%;margin:auto;top:0;bottom:0;transition:all .3s}#mic-active-container span:first-child{background:#4285f4}#mic-active-container span:nth-child(2){background:#db4437}#mic-active-container span:nth-child(3){background:#f4b400}#mic-active-container span:nth-child(4){background:#0f9d58}@keyframes sound-1{0%{height:52px;border-radius:30px}10%{height:40px;border-radius:30px}20%{height:45px;border-radius:30px}25%{height:35px;border-radius:30px}30%{height:52px;border-radius:30px}40%{height:37px;border-radius:30px}50%{height:34px;border-radius:30px}60%{height:32px;border-radius:30px}70%{height:27px;border-radius:30px}80%{height:32px;border-radius:30px}85%{height:27px;border-radius:30px}90%{height:32px;border-radius:30px}95%{height:27px;border-radius:30px}100%{height:15px;border-radius:50%}}@keyframes sound-2{0%{height:42px;border-radius:30px}20%{height:32px;border-radius:30px}30%{height:42px;border-radius:30px}40%{height:32px;border-radius:30px}50%{height:31px;border-radius:30px}60%{height:30px;border-radius:30px}70%{height:29px;border-radius:30px}80%{height:30px;border-radius:30px}90%{height:29px;border-radius:30px}100%{height:15px;border-radius:50%}}.incdx-bot #incdx-bot-submit:focus, .incdx-bot #incdx-bot-query:focus{outline:none}.incdx-basic-card .incdx-basic-card-description, .incdx-basic-card span.incdx-basic-card-subtitle, .incdx-list-select .incdx-list-select-item span.incdx-list-select-item-description{font-size:14px}.incdx-list-select{background-color:inherit !important;padding:15px 0px;border-radius:4px;color:inherit !important}.incdx-list-select .incdx-list-select-item{padding:16px 0;border-top:2px solid ${lightColor};cursor:pointer;min-height:100px;border-color:#222 !important}.incdx-list-select .incdx-list-select-title, .incdx-basic-card .incdx-basic-card-title{font-size:20px;color:inherit !important;letter-spacing:0;line-height:36px;text-align:left}.incdx-list-select .incdx-list-select-item .incdx-list-select-item-title{font-size:16px;line-height:24px}.incdx-list-select .incdx-list-select-item .incdx-list-select-item-image{height:76px;width:76px}.incdx-list-select .incdx-list-select-item .incdx-list-select-item-image>img{max-height:100%;max-width:100%;border-radius:0px}.incdx-basic-card{display:flex;flex-direction:column;padding:15px 0px}.incdx-basic-card img.incdx-basic-card-image{max-width:100%;height:100%;max-height:200px;object-fit:contain;padding:10px 0px}.incdx-basic-card .incdx-basic-card-button{padding-top:10px}.incdx-basic-card .incdx-basic-card-button>button{font-size:16px;color:inherit;letter-spacing:0;text-align:center;line-height:24px;background-color: ${lightColor};border:none;height:35px;-webkit-border-radius:10px;border-radius:10px;width:100%;outline:none !important;cursor:pointer;user-select:none}.incdx-basic-card .incdx-basic-card-button>button:hover{opacity:0.8}.incdx-suggestions-chips{display:flex;overflow:auto;width:325px;position:absolute;left:-85px;bottom:-65px;margin-bottom:10px}.incdx-suggestions-chips .incdx-chip-container{display:flex;margin-right:8px;margin-top:8px}.incdx-suggestions-chips .incdx-chip{padding-left:8px;-webkit-border-radius:40px!important;border-radius:40px!important;color:inherit;font-size:14px;font-weight:400;height:20px;line-height:24px;border:1px solid #eee;text-transform:none;margin:0;white-space:pre;position:relative;cursor:pointer;min-height:36px;text-align:center;min-width:60px;outline:none !important;background-color: ${lightColor}}.incdx-message-server-carousel{clear:both;width:100%}.incdx-message-server-carousel .incdx-carousel-select{display:inline-flex;flex-direction:row;overflow-x:auto;width:100%}.incdx-message-server-carousel .incdx-carousel-select .incdx-carousel-select-item{color:inherit;display:flex;flex-direction:row;flex-grow:1;min-width:237px;height:140px;flex-wrap:nowrap;padding:16px;flex:1 1 100%;align-items:center;background-color: ${primaryColor};margin-right:8px;margin-top:8px;border-radius:3px;border:1px solid #eee;cursor:pointer}.incdx-message-server-carousel .incdx-carousel-select .incdx-carousel-select-item .incdx-carousel-select-item-image{width:100px;height:100px}.incdx-message-server-carousel .incdx-carousel-select .incdx-carousel-select-item .incdx-carousel-select-item-image img{width:100%;height:100%;object-fit:contain}.incdx-message-server-carousel .incdx-carousel-select .incdx-carousel-select-item span.incdx-carousel-select-item-description{max-height:100px;overflow:auto}.incdx-message-server-carousel .incdx-carousel-select .incdx-carousel-select-item .incdx-carousel-select-item-title{margin-bottom:10px}.incdx-layout,.incdx-layout-column,.incdx-layout-row{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.incdx-flex{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box}.incdx-layout-column{-webkit-flex-direction:column;flex-direction:column}.incdx-flex-70,.incdx-layout-row>.incdx-flex-70{-webkit-box-flex:1 1 100%;-webkit-flex:1 1 100%;flex:1 1 100%;max-width:70%;max-height:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.incdx-list-select h2{font-size:1.5em;margin:10px 0}`;
      window.addStyleString(incdxStyle);
      window.addHtmlString(incdxHtml);
    }
    
    incdxBotWrapper = document.getElementById("incdx-bot-wrapper");
    queryInput = document.getElementById('incdx-bot-query');
    openBotButton = document.getElementById('incdx-bot-open');      

    if (options.microphone) {
      webSpeech();
    } else {
      var botMic = document.getElementById("incdx-bot-mic");
      botMic.classList.add("hidden");
    }
    // Add Event Listener on button to open the Bot popup
    openBotButton.addEventListener("click", openBot);

    var form = document.getElementById('incdx-bot-form');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      var message = formData.get("q");
      if (message && message.trim().length) {
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
    incdxBotWrapper.classList.toggle("bot-hidden");
    if (!this.classList.contains("close-bot")) {
      queryInput.focus();
      queryInput.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) {
          closeBot()
        }
      });
    }
    this.classList.toggle("close-bot");
  }

  var closeBot = function() {
    queryInput.blur();
    incdxBotWrapper.classList.add("bot-hidden");
    openBotButton.classList.remove("close-bot");
  }

  /**
   * @private
   * @function sendMessage
   * @param {string} message Message that we send to bot to get intents back and create answers
   */
  var sendMessage = function (message) {
    // test url http://localhost:5000/listselectionsample/us-central1/botFunction
    var options = window.incdxOptions;
    var urlToIncdxBot = 'https://040c450b.ngrok.io/listselectionsample/us-central1/botFunction';
    var botResultContainer = document.getElementById("incdx-result");
    var botLoadingContainer = document.getElementById("incdx-w-l");
    var resultWrapper = document.getElementById("resultWrapper");

    // create user mesasage content and display it to chat
    var userMessage = document.createElement("div");
    userMessage.classList.add("incdx-message-user-request", "incdx-bot-message-card");
    userMessage.innerText = message;
    botResultContainer.appendChild(userMessage);

    // clear input
    queryInput.value = "";

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
    incdxRequest(urlToIncdxBot, {"query": message, "sessionId": "39fafeaa-264f-47f3-bcd8-8030a03e686b"})
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
          var nodeToAppend;
          if (type == "carouselSelect") {
            nodeToAppend = generator[type](fulfillmentMessage, botMessage);
            var botCarouselMessage = document.createElement("div");
            botCarouselMessage.classList.add("incdx-message-server-carousel");
            botCarouselMessage.appendChild(nodeToAppend);
            botResultContainer.appendChild(botCarouselMessage);
          } else {
            nodeToAppend = generator[type](fulfillmentMessage, botMessage);
            if (nodeToAppend)botMessage.appendChild(nodeToAppend);
          }
        });
        resultWrapper.scrollTop = resultWrapper.scrollHeight;
      })
      .catch(error => {
        console.log(error)
        if(loadingMessage) loadingMessage.remove();
        var botMessage = document.createElement("div");
        botMessage.classList.add("incdx-message-server-response", "incdx-bot-message-card", "server-response-error");
        botMessage.innerText = "Sorry, it seemed like there was an error during request.";
        botResultContainer.appendChild(botMessage);
        resultWrapper.scrollTop = resultWrapper.scrollHeight;
      });
  }

  
  /**
   * @private
   * @function incdxRequest
   * @param {string} url    Request url
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

  var incdxSelectableEvent = function() {
    sendMessage(this.dataset.incdxSelect);
  }

  /*
   * Generator
   * The conversation is detailed below for a specific message oneof:
   * * Generic Platform Response
   *   * `text` -> `typeof string`
   *   * `image` -> `Image`
   *   * `quickReplies` -> `Suggestions`
   *   * `card` -> `BasicCard`
   * * Actions on Google Response
   *   * `simpleResponses` -> `SimpleResponse[]`
   *   * `basicCard` -> `BasicCard`
   *   * `suggestions` -> `Suggestions`
   *   * `linkOutSuggestion` -> `LinkOutSuggestion`
   *   * `listSelect` -> `List`
   *   * `carouselSelect` -> `Carousel`
   *   * `payload` -> `typeof object`
   */

  /**
   * @private
   * @function generator.text
   * @name text
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @returns {Node} textResponsesNode
  */
  generator.text = (fulfillmentMessage) => {
    var messageTexts = fulfillmentMessage.text.text;
    var textResponsesNode = document.createElement("div");
    textResponsesNode.classList.add("incdx-text-response");
    textResponsesNode.innerHTML = `
      ${
        messageTexts.map(text => {
          return (
            `<span>${text}</span>`
          );
        })
      }
    `;
    return textResponsesNode;
  }

  /**
   * @private
   * @function generator.simpleResponses
   * @name simpleResponses
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @returns {Node} simpleResponsesNode
   */
  generator.simpleResponses = (fulfillmentMessage) => {
    var simpleResponses = fulfillmentMessage.simpleResponses.simpleResponses;
    var simpleResponsesNode = document.createElement("div");
    simpleResponsesNode.classList.add("incdx-simple-response");
    simpleResponsesNode.innerHTML = `
      ${
        simpleResponses.map(simpleResponse => {
          return (
            `<span>${simpleResponse.textToSpeech}</span>`
          );
        })
      }
    `;
    return simpleResponsesNode;
  }

  /**
   * @private
   * @function generator.basicCard
   * @name basicCard
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @returns {Node} basicCardNode
   */
  generator.basicCard = (fulfillmentMessage) => {
    var basicCard = fulfillmentMessage.basicCard;
    var basicCardNode = document.createElement("div");
    basicCardNode.classList.add("incdx-basic-card");
    basicCardNode.innerHTML = `
        <div class="incdx-basic-card-title">${basicCard.title}</div>
        <span class="incdx-basic-card-subtitle">${basicCard.subtitle}</span>
        <img class="incdx-basic-card-image" src="${basicCard.image.imageUri}" alt="${basicCard.image.accessibilityText}">
        <div class="incdx-basic-card-description">${basicCard.formattedText}</div>
        <div class="incdx-basic-card-button">
          <button onclick="window.open('${basicCard.buttons[0].openUriAction.uri}','_blank')">${basicCard.buttons[0].title}</button>
        </div>
    `;
    return basicCardNode;
  }

  /**
   * @private
   * @function generator.listSelect
   * @name listSelect
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @returns {Node} listSelectNode
   */
  generator.listSelect = (fulfillmentMessage) => {
    var listSelect = fulfillmentMessage.listSelect;
    var listSelectNode = document.createElement("div");
    listSelectNode.classList.add("incdx-list-select");
    listSelectNode.innerHTML = `<h2 class="incdx-list-select-title">${listSelect.title}</h2>`;
    listSelect.items.forEach(listItem => {
      var listItemNode = document.createElement("div");
      listItemNode.classList.add("incdx-list-select-item", "incdx-selectable-item");
      listItemNode.dataset.incdxSelect = listItem.title;
      listItemNode.innerHTML += `
        <div class="incdx-layout-row incdx-flex">
          <div class="incdx-list-select-item-text incdx-layout-column incdx-flex-70">
            <div class="incdx-list-select-item-title">${listItem.title}</div>
            ${listItem.description.length ? `<span class="incdx-list-select-item-description">${listItem.description}</span>` : ""}
          </div>
          <div class="incdx-flex"></div>
          <div class="incdx-list-select-item-image">
            ${listItem.image.imageUri.length ? `<img src="${listItem.image.imageUri}" alt="${listItem.image.accessibilityText}" >` : ""}
          </div>
        </div>
      `;
      listItemNode.onclick = incdxSelectableEvent;
      listSelectNode.appendChild(listItemNode);
    });
    return listSelectNode;
  }

  /**
   * @private
   * @function generator.suggestions
   * @name suggestions
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @param {Node} botMessage BotMessage to add chip-container
   * @returns {Node} suggestionsNode
   */
  generator.suggestions = (fulfillmentMessage, botMessage) => {
    botMessage.classList.add("chip-container");
    var suggestions = fulfillmentMessage.suggestions.suggestions;
    var suggestionsNode = document.createElement("div");
    suggestionsNode.classList.add("incdx-suggestions-container");
    suggestions.forEach(suggestionChip => {
      var suggestionChipNode = document.createElement("div");
      suggestionChipNode.dataset.incdxSelect = suggestionChip.title;
      suggestionChipNode.classList.add("incdx-chip-container", "incdx-selectable-item");
      var suggestionChipNodeButton = document.createElement("button");
      suggestionChipNodeButton.classList.add("incdx-chip");
      suggestionChipNodeButton.innerText = suggestionChip.title;
      suggestionChipNode.appendChild(suggestionChipNodeButton);
      suggestionChipNode.onclick = incdxSelectableEvent;
      suggestionsNode.appendChild(suggestionChipNode);
    });
    // Add "incdx-suggestions-chips" class to suggestionsNode to prevent unclickable absolute div
    setTimeout(() => {
      suggestionsNode.classList.add("incdx-suggestions-chips");
    });
    return suggestionsNode;
  }

  /**
   * @private
   * @function generator.linkOutSuggestion
   * @name linkOutSuggestion
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @param {Node} botMessage BotMessage to add chip-container
   * @returns {Node} linkOutSuggestionNode
   */
  generator.linkOutSuggestion = (fulfillmentMessage, botMessage) => {
    var linkOutSuggestion = fulfillmentMessage.linkOutSuggestion;
    var incdxSuggestionsChips = document.querySelectorAll(".incdx-suggestions-container");
    if (incdxSuggestionsChips.length) {
      var linkOutSuggestionNode = document.createElement("div");
      linkOutSuggestionNode.classList.add("incdx-chip-container");
      linkOutSuggestionNode.innerHTML = `<div class=""><button class="incdx-chip incdx-link-out-chip" onclick="window.open('${linkOutSuggestion.uri}','_blank')">${linkOutSuggestion.destinationName} <i class="fa fa-link"></i></button></div>`;
      incdxSuggestionsChips[incdxSuggestionsChips.length-1].prepend(linkOutSuggestionNode);
    } else {
      botMessage.classList.add("chip-container");
      var linkOutSuggestionNode = document.createElement("div");
      linkOutSuggestionNode.classList.add("incdx-suggestions-chipsincdx-suggestions-container");
      linkOutSuggestionNode.innerHTML = `<div class="incdx-chip-container"><button class="incdx-link-out-chip" onclick="window.open('${linkOutSuggestion.uri}','_blank')">${linkOutSuggestion.destinationName}</button></div>` + linkOutSuggestionNode.innerHTML;
      return linkOutSuggestionNode;
    }
  }

  /**
   * @private
   * @function generator.carouselSelect
   * @name carouselSelect
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @returns {Node} carouselSelectNode
   */
  generator.carouselSelect = (fulfillmentMessage) => {
    var carouselSelect = fulfillmentMessage.carouselSelect;
    var carouselSelectNode = document.createElement("div");
    carouselSelectNode.classList.add("incdx-carousel-select");
    carouselSelect.items.forEach(carouselItem => {
      var carouselItemNode = document.createElement("div");
      carouselItemNode.classList.add("incdx-carousel-select-item", "incdx-selectable-item");
      carouselItemNode.dataset.incdxSelect = carouselItem.title;
      carouselItemNode.innerHTML = `
        <div class="incdx-layout-row incdx-flex">
          <div class="incdx-carousel-select-item-text incdx-layout-column incdx-flex-70">
            <div class="incdx-carousel-select-item-title">${carouselItem.title}</div>
            ${carouselItem.description.length ? `<span class="incdx-carousel-select-item-description">${carouselItem.description}</span>` : ""}
          </div>
          <div class="incdx-flex"></div>
          <div class="incdx-carousel-select-item-image">
            ${carouselItem.image.imageUri.length ? `<img src="${carouselItem.image.imageUri}" alt="${carouselItem.image.accessibilityText}" >` : ""}
          </div>
        </div>
      `;
      carouselItemNode.onclick = incdxSelectableEvent;
      carouselSelectNode.appendChild(carouselItemNode);
    });
    return carouselSelectNode;
  }

  /**
   * @private
   * @function generator.payload
   * @name payload
   * @param {Object} fulfillmentMessage Fulfillment Message from Dialogfow
   * @returns {Node} payloadNode
   */
  generator.payload = (fulfillmentMessage) => {
    var payload = fulfillmentMessage.payload;
    var payloadNode = document.createElement("div");
    // TODO
    return payloadNode;
  }

	// Expose the public methods
	return incdxBotPublicMethods;
})();