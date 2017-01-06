'use strict';

(function() {
  // var createPollButton = document.querySelector('#create-poll-btn');
  var userPollsDiv = document.querySelector('#user-polls');
  var apiUrlUserPollIds = appUrl + '/api/:id/polls';
  var apiUrlAllPolls = appUrl + '/api/allpolls';
  
  function updateUserPolls(data) {
    function getUserPollIds(data2) {
      var allPollsData = JSON.parse(data);
      var userPollIdsData = JSON.parse(data2);
      // console.log(allPollsData);
      // console.log(userPollIdsData);
      var pollIdsArr = userPollIdsData['pollIdList'];
      for (var i=0; i<pollIdsArr.length; i++) {
        var pollId = pollIdsArr[i];
        var pollObj = allPollsData[pollId];
        var title = pollObj['title'];
        var options = pollObj['options'];
        var id = pollObj['pollId'];

        var innerDiv = document.createElement('div');
        innerDiv.className = 'pollInnerDiv';
        var a = document.createElement('a');
        a.href =  appUrl + '/polldetails/' + id;
        a.innerHTML = title;
        innerDiv.appendChild(a);
        userPollsDiv.appendChild(innerDiv);
      }

      
    }

    ajaxFunctions.ajaxRequest('GET', apiUrlUserPollIds, getUserPollIds);
  
  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlAllPolls, updateUserPolls));
  // ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlAllPolls, asdf));

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
