'use strict';

(function () {

   var createPollButton = document.querySelector('#create-poll-btn');
   var userPollsDiv = document.querySelector('#user-polls');
   var apiUrl = appUrl + '/api/:id/polls';

   function updateUserPolls (data) {
      var pollsObject = JSON.parse(data);
      // polls should be an array so fix this
      // console.log(pollsObject);
      var pollsArray = pollsObject['polls'];
      for (var i=0; i<pollsArray.length; i++) {
         var title = pollsArray[i]['title'];
         var options = pollsArray[i]['options'];
         var id = pollsArray[i]['_id'];

         var innerDiv = document.createElement('div');
         innerDiv.className = 'pollInnerDiv';

         // var pTitle = document.createElement('p');
         // var pOptions = document.createElement('p');
         // pTitle.innerHTML = title;
         // pOptions.innerHTML = options;

         var a = document.createElement('a');
         a.href =  appUrl + '/polls/' + id;
         a.innerHTML = title;

         innerDiv.appendChild(a);
         // innerDiv.appendChild(pTitle);
         // innerDiv.appendChild(pOptions);

         userPollsDiv.appendChild(innerDiv);
      }
   }

   //? I think this runs updateUserPolls when page is loaded
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls));

   createPollButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls);
      });

   }, false);

   // deleteButton.addEventListener('click', function () {

   //    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
   //       ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls);
   //    });

   // }, false);

})();
