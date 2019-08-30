/**
 * Embed Bot
 * (c) 2019 Diamant Haxhimusa
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.incdxBot = factory(root.io);
  }
}(this, function () {
  'use strict';

	// Create the public methods object
  var incdxBot = {};
  var incdxBotWrapper;
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
   * @param {primaryColor}  [options.primaryColor=#3e4454]  Color of the messsage box
   * @param {darkColor}  [options.darkColor=#2b303e]        Color of the bot tools
   * @param {acsentColor}  [options.acsentColor=#676f84]  Acsent Color (light color)
   * @param {fontColor}  [options.fontColor=#ffffff]        Color of the meesage text
   * @example
   * incdxBot.init({
   *   userToken: "",
   *   microphone: true,
   *   primaryColor: "#3e4454",
   *   darkColor: "#2b303e",
   *   acsentColor: "#676f84",
   *   fontColor: "#ffffff",
   * });
   */
  incdxBot.init = function(options) {
    window.incdxOptions = options;
    var data = new FormData();
    data.append("user_email", options.user_email);

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var resData = JSON.parse(this.responseText);
        appendBot(resData.chat_id);
      }
    });

    xhr.open("POST", "https://pwc-belgium-chatbot.appspot.com/get-chat");

    xhr.send(data);
  }

  var appendBot = function(chatId) {
    var incdxHtml = `<button id="incdx-bot-open"> <i class="fa fa-comment fa-2x" aria-hidden="true"></i> <i class="fa fa-close fa-2x" aria-hidden="true"></i> </button>
          <div class="incdx-bot bot-hidden" id="incdx-bot-wrapper">
            <iframe src="https://pwc-belgium-chatbot.appspot.com/live/chat/${chatId}" frameborder="0"></iframe>
          </div>`;
      var primaryColor = "#3e4454";
      var darkColor = "#2b303e";
      var acsentColor = "#676f84";
      var fontColor = "#fff";
      var incdxStyle = `body{padding:0;margin:0}.incdx-bot .clearfix{clear:both}.incdx-bot *::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#f5f5f5}.incdx-bot *::-webkit-scrollbar{width:5px;height:5px;background-color:#f5f5f5}.incdx-bot *::-webkit-scrollbar-thumb{background-color: ${darkColor}}button#incdx-bot-open{position:fixed;bottom:0;right:0;width:60px;height:60px;color: ${fontColor};background-color: ${darkColor};background-position:center center;background-repeat:no-repeat;box-shadow:12px 15px 20px 0 rgba(46, 61, 73, 0.15);border:0;border-radius:50%;cursor:pointer;margin:0px 40px 30px 0px;outline:0 !important;z-index:10002;display:flex;justify-content:center;align-items:center;padding:0px !important}button#incdx-bot-open i{position:absolute}button#incdx-bot-open i:first-child{transition:opacity 0.3s, transform 0.3s}button#incdx-bot-open i:nth-child(2){transition:opacity 0.3s, transform 0.3s;transform:rotate(-180deg) scale(0.5);opacity:0}button#incdx-bot-open.close-bot i:first-child{transform:rotate(180deg) scale(0.5);opacity:0}button#incdx-bot-open.close-bot i:nth-child(2){transform:rotate(0deg) scale(1);opacity:1}.incdx-bot#incdx-bot-wrapper{font-family: 'Roboto',sans-serif;position:fixed;width:377px;height:700px;max-height:calc(100vh - 3 * 30px - 52px);border-radius:16px;overflow:hidden;right:40px;opacity:1;bottom:calc(2 * 30px + 52px);box-shadow:12px 15px 20px 0 rgba(46, 61, 73, 0.15);transition:all 0.2s linear;z-index:10001;}.incdx-bot#incdx-bot-wrapper.bot-hidden{height:0;width:0;opacity:0;bottom:60px;right:40px;z-index:10001}.incdx-bot .incdx-bot-message-card{display:inline-block;padding:15px 20px;border-radius:3px;border:1px solid #eee;margin-bottom:5px;font-size:16px;clear:both;max-width:250px}.incdx-bot .incdx-message-user-request{background-color:#efefef;float:left;margin-right:15px;margin-top:15px;margin-left:15px;color:#111 !important}.incdx-bot .incdx-message-server-response{color:inherit !important;background-color: ${primaryColor};float:right;margin-top:15px;margin-right:20px;margin-left:15px;position:relative;user-select:none !important;word-break:break-word}.incdx-bot .incdx-message-server-response.chip-container{}.incdx-bot#incdx-bot-wrapper.incdx-bot-m{height:100vh;max-height:100%;width:100%;top:0;bottom:0;right:0;left:0;border-radius:0}button#incdx-bot-open.close-bot.incdx-bot-m{top:0;margin:0;box-shadow:none}`;
      window.addStyleString(incdxStyle);
      window.addHtmlString(incdxHtml);
      incdxBotWrapper = document.getElementById("incdx-bot-wrapper");
      openBotButton = document.getElementById('incdx-bot-open');
      // Add Event Listener on button to open the Bot popup
      openBotButton.addEventListener("click", openBot);
  }

  var openBot = function() {
    incdxBotWrapper.classList.toggle("bot-hidden");
    if (navigator.userAgent.indexOf('Mobile') !== -1) {
      this.classList.add("incdx-bot-m");
      incdxBotWrapper.classList.add("incdx-bot-m");
    }
    else {
      this.classList.remove("incdx-bot-m");
      incdxBotWrapper.classList.remove("incdx-bot-m");
    }
    this.classList.toggle("close-bot");
  }

  var closeBot = function() {
    incdxBotWrapper.classList.add("bot-hidden");
    openBotButton.classList.remove("close-bot");
  }
	// Expose the public methods
	incdxBot.init({user_email: "diamant.haxhimusa@fourcast.io"});
}));
