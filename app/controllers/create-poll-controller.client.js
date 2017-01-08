// 'use strict';
// var appUrl = window.location.origin;
// (function () {

//    var createPollButton = document.querySelector('#create-poll-btn');
//    var apiUrlUserPollIds = appUrl + '/api/:id/polls';
//    var apiUrlAllPolls = appUrl + '/api/allpolls';
//    console.log(apiUrlUserPollIds);
//    console.log(apiUrlAllPolls);

//    function createPollId() {
//        var charArr = [];
//        var charChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//        var lenOfId = 10;
//        for (var i=0; i<lenOfId; i++) {
//          charArr.push(charChoices.charAt(Math.floor(Math.random() * charChoices.length)));
//        }

//        return charArr.join('');
//    }

//    if (user) {
//     createPollButton.addEventListener('submit', function (evt) {
//       evt.preventDefault();

//       var pollId = createPollId();
//       var params = {"pollId": pollId};

//       ajaxFunctions.ajaxRequestWithParams('POST', apiUrlUserPollIds, params, function () {
//          ajaxFunctions.ajaxRequestWithParams('POST', apiUrlAllPolls, params, function () {
//            console.log(appUrl); 
           
//          });
//       });

//       window.location.href = appUrl + '/polldetails/' + pollId;
      
//     }, false);
//   }

// })();
