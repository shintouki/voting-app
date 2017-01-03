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
      if (pollsArray[i]['_id'] === pollId) {
        pollObj = pollsArray[i];
        break;
      }
    }
    // console.log(pollObj);
    var title = pollObj.title;
    pollTitle.innerHTML = title;

  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOptions));

})();
