'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var pollOptions = document.querySelector('#poll-options');
  var deletePollButton = document.querySelector('#delete-button');

  var apiUrl = appUrl + '/api/allpolls';

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  function updatePollOptions(data) {
    var parsedData = JSON.parse(data);
    if (isEmpty(parsedData)) {
      return;
    }

    var pollObj = parsedData[pollId];

    var title = pollObj.title;
    pollTitle.innerHTML = title;
    var options = pollObj.options;
    for (var i=0; i<options.length; i++) {
      // console.log(options[i]);
      var optionText = options[i]['optionText'];
      var option = document.createElement('option');
      option.innerHTML = optionText;
      pollOptions.appendChild(option);
    }


  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOptions));
  
  if (user) {
    deletePollButton.addEventListener('click', function () {
      var params = {"pollId": pollId};
      ajaxFunctions.ajaxRequestWithParams('DELETE', apiUrl, params, function () {
           
      });

    }, false);
  }

})();
