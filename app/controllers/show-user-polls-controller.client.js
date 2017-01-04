'use strict';

(function() {
  // var createPollButton = document.querySelector('#create-poll-btn');
  var userPollsDiv = document.querySelector('#user-polls');
  var apiUrl = appUrl + '/api/:id/polls';
  // console.log(appUrl);
  function updateUserPolls(data) {
    var parsedData = JSON.parse(data);
    // var pollsArray = parsedData['polls'];
    for (var i=0; i<parsedData.length; i++) {
      var title = parsedData[i]['title'];
      var options = parsedData[i]['options'];
      var id = parsedData[i]['pollId'];
      
      var innerDiv = document.createElement('div');
      innerDiv.className = 'pollInnerDiv';

      var a = document.createElement('a');
      a.href =  appUrl + '/polldetails/' + id;
      // a.href = appUrl + '/polldetails';
      // console.log(a.href);
      a.innerHTML = title;

      innerDiv.appendChild(a);

      userPollsDiv.appendChild(innerDiv);
    }
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls));

  // createPollButton.addEventListener('click', function () {

  //    ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
  //       ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls);
  //    });

  // }, false);

  // deleteButton.addEventListener('click', function () {

  //    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
  //       ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls);
  //    });

  // }, false);

})();
