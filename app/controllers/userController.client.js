'use strict';

(function () {

   // var profileId = document.querySelector('#profile-id') || null;
   // var profileUsername = document.querySelector('#profile-username') || null;
   // var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      // console.log(apiUrl);
      // console.log(data);
      if (displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');   
      }

      // if (userObject.displayName !== null) {
      //    updateHtmlElement(userObject, displayName, 'screen_name');
      // } else {
      //    updateHtmlElement(userObject, displayName, 'name');
      // }

      // if (profileId !== null) {
      //    updateHtmlElement(userObject, profileId, 'id');   
      // }

      // if (profileUsername !== null) {
      //    updateHtmlElement(userObject, profileUsername, 'name');   
      // }

      // if (profileRepos !== null) {
      //    updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      // }

   }));
})();
