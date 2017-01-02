'use strict';

(function () {

   var createPollButton = document.querySelector('#create-poll-btn');
   var apiUrl = appUrl + '/api/:id/polls';

   // function updateUserPolls (data) {
   //    var pollsObject = JSON.parse(data);
         
   //    }
   // }

   // ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls));

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
