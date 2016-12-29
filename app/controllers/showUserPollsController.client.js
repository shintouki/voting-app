'use strict';

(function () {

   // var createPollButton = document.querySelector('#create-poll-btn');
   var userPollsDiv = document.querySelector('#user-polls');
   var apiUrl = appUrl + '/api/:id/polls';

   function updateUserPolls (data) {
      var pollsObject = JSON.parse(data);
      var pollsArray = pollsObject['polls'];
      for (var i=0; i<pollsArray.length; i++) {
         var title = pollsArray[i]['title'];
         var options = pollsArray[i]['options'];
         var id = pollsArray[i]['_id'];

         var innerDiv = document.createElement('div');
         innerDiv.className = 'pollInnerDiv';

         var a = document.createElement('a');
         a.href =  appUrl + '/polls/' + id;
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
