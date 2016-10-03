'use strict';

(function () {

   // var addButton = document.querySelector('.btn-add');
   // var deleteButton = document.querySelector('.btn-delete');
   var userPolls = document.querySelector('#user-polls');
   // var loginButton = document.querySelector('.')
   var apiUrl = appUrl + '/api/:id/polls';

   function updateUserPolls (data) {
      var pollsObject = JSON.parse(data);
      // polls should be an array so fix this
      userPolls.innerHTML = pollsObject.polls;
   }

   // ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateUserPolls));

   addButton.addEventListener('click', function () {

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
