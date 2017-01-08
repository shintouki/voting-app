'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var pollOptions = document.querySelector('#poll-options');
  var deletePollButton = document.querySelector('#delete-button');

  var apiUrl = appUrl + '/api/allpolls';
  var apiUrlDeletePoll = appUrl + '/deletepoll';

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  function updatePollOptions(data) {
    var parsedData = JSON.parse(data);
    if (isEmpty(parsedData)) {
      return;
    }

    // Create poll options html
    var pollObj = parsedData[pollId];

    var title = pollObj.title;
    pollTitle.innerHTML = title;
    var options = pollObj.options;
    for (var i=0; i<options.length; i++) {
      // console.log(options[i]);
      var optionText = options[i]['optionText'];
      var option = document.createElement('option');
      option.innerHTML = optionText;
      pollOptions.appendChild(option);
    }

    // Show Delete Button if poll's userId matches current logged in userId
    // console.log(user);
    if (user) {
      var pollUserId = pollObj.userId;
      var currentUserId = user.twitter.id;
      // console.log("pollUserId: " + pollUserId);
      // console.log("currentUserId: " + currentUserId);
      if (pollUserId === currentUserId) {
        deletePollButton.style.visibility = 'visible';
      }
    }

  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOptions));
  
  if (user) {
    deletePollButton.addEventListener('click', function () {
      var confirmed = confirm("Are you sure you want to delete this poll?");
      if (confirmed) {
        var params = { "pollId": pollId };
        ajaxFunctions.ajaxRequestWithParams('DELETE', apiUrlDeletePoll, params, function () {
         
        });
      
        alert("The poll was successfully deleted.")
        // I was getting an error with res.redirect('polls') in pollHandler so
        // I am using this instead for now.
        window.location.href = '/polls';
      }    
    }, false);
    
  }
  

})();
