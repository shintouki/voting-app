'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var pollOptions = document.querySelector('#poll-options');
  var apiUrl = appUrl + '/api/allpolls';

  function updatePollOptions (data) {
    var parsedData = JSON.parse(data);
    if (parsedData.length === 0) {
      return;
    }
    // var pollsArray = parsedData['polls'];
    // var pollId = "{{pollid}}";
    var pollObj;
    // console.log(pollId);
    // Find right poll
    for (var i=0; i<parsedData.length; i++) {
      // console.log(pollsArray[i]);
      if (parsedData[i]['pollId'] === pollId) {
        pollObj = parsedData[i];
        break;
      }
    }
    // console.log(pollObj);
    var title = pollObj.title;
    pollTitle.innerHTML = title;
    var options = pollObj.options;
    for (var i=0; i<options.length; i++) {
      console.log(options[i]);
      var optionText = options[i]['optionText'];
      var option = document.createElement('option');
      option.innerHTML = optionText;
      pollOptions.appendChild(option);
    }


  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOptions));

})();
