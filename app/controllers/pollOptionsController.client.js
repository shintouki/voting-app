'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var pollOptions = document.querySelector('#poll-options');
  var deletePollButton = document.querySelector('#delete-button');
  var selectField = document.querySelector("#poll-options");
  var customOptionButton = document.querySelector("#custom-option");
  // console.log(selectField);
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

    if (user) {
      // If user is logged in, allow user to create a custom option
      var optionText = 'Create new option'
      var option = document.createElement('option');
      option.innerHTML = optionText;
      option.value = 'customOption';
      pollOptions.appendChild(option);

      var pollUserId = pollObj.userId;
      var currentUserId = user.twitter.id;
      
      // Show Delete Button if poll's userId matches current logged in userId
      if (pollUserId === currentUserId) {
        deletePollButton.style.visibility = 'visible';
      }

    }

  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOptions));

  if (user) {
    selectField.addEventListener('change', function() {
      // If create new option is selected
      // console.log(this.options[this.selectedIndex].value);
      if (this.options[this.selectedIndex].value == 'customOption') {
        // Show custom option input field
        customOptionButton.disabled = false;
        customOptionButton.style.display = 'inline';
        customOptionButton.focus();
      }
      else {
        // Hide custom option input field
        customOptionButton.disabled = true;
        customOptionButton.style.display = 'none';
      }
    }, false);

    // customOptionButton.addEventListener('change', function() {

    // }, false);

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
