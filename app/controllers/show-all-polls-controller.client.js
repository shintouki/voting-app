'use strict';

(function() {
  
  var userPollsDiv = document.querySelector('#all-polls');
  var apiUrl = appUrl + '/api/allpolls';

  function displayAllPolls(data) {
    var parsedData = JSON.parse(data);
    for (var key in parsedData) {
      if (parsedData.hasOwnProperty(key)) {
        var title = parsedData[key]['title'];
        var options = parsedData[key]['options'];
        var id = parsedData[key]['pollId'];
        
        var innerDiv = document.createElement('div');
        innerDiv.className = 'pollInnerDiv';

        var a = document.createElement('a');
        a.href =  appUrl + '/polldetails/' + id;
        a.innerHTML = title;

        innerDiv.appendChild(a);

        userPollsDiv.appendChild(innerDiv);
      }
    }

  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, displayAllPolls));

})();
