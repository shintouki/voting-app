'use strict';

(function() {
  
  var userPollsDiv = document.querySelector('#all-polls');
  var apiUrl = appUrl + '/api/allpolls';
  function updateUserPolls(data) {
    var parsedData = JSON.parse(data);
    for (var i=0; i<parsedData.length; i++) {
      var title = parsedData[i]['title'];
      var options = parsedData[i]['options'];
      var id = parsedData[i]['pollId'];
      
      var innerDiv = document.createElement('div');
      innerDiv.className = 'pollInnerDiv';

      var a = document.createElement('a');
      a.href =  appUrl + '/polldetails/' + id;
      a.innerHTML = title;

      innerDiv.appendChild(a);

      userPollsDiv.appendChild(innerDiv);
    }
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls));
  
})();
