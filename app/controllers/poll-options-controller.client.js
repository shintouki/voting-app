'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var pollOptions = document.querySelector('#poll-options');
  var apiUrl = appUrl + '/api/:id/polls';

  function updatePollOptions (data) {
    var parsedData = JSON.parse(data);
    var pollsArray = parsedData['polls'];
    // var pollId = "{{pollid}}";
    var pollObj;
    // console.log(pollId);
    // Find right poll
    for (var i=0; i<pollsArray.length; i++) {
      // console.log(pollsArray[i]);
      if (pollsArray[i]['pollId'] === pollId) {
        pollObj = pollsArray[i];
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
