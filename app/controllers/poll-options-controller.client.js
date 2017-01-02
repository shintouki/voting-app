'use strict';

(function () {
  console.log("qwerqwer");
  var pollTitle = document.querySelector('#poll-title');
  var pollOptions = document.querySelector('#poll-options');
  var apiUrl = appUrl + '/api/:id/polls';

  function updatePollOptions (data) {
    console.log("qwerqwer");
    var parsedData = JSON.parse(data);
    var pollsArray = parsedData['polls'];
    var pollId = "{{ pollId }}";
    var pollObj;
    // Find right poll
    for (var i=0; i<pollsArray.length; i++) {
      if (pollsArray[i]['_id'] === pollId) {
        pollObj = pollsArray[i];
        break;
      }
    }
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOptions));

})();
