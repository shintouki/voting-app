'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var voteForm = document.querySelector('#vote-form');
  // var pollOptions = document.querySelector('#poll-options');
  var selectField = document.querySelector("#poll-options");
  var customOptionDiv = document.querySelector("#custom-option");
  var customOptionInput = document.querySelector("#custom-option-input");
  var deletePollButton = document.querySelector('#delete-button');
  var pollData = document.querySelector('#poll-data');
  // console.log(selectField);
  var apiUrlAllPolls = appUrl + '/api/allpolls';
  var apiUrlDeletePoll = appUrl + '/deletepoll';

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  function populatePollOptions(data) {
    var parsedData = JSON.parse(data);
    if (isEmpty(parsedData)) {
      return;
    }

    var pollObj = parsedData[pollId];
    var title = pollObj.title;
    pollTitle.innerHTML = title;
    var options = pollObj.options;
    for (var i=0; i<options.length; i++) {
      // console.log(options[i]);
      var optionText = options[i]['optionText'];
      var option = document.createElement('option');
      option.innerHTML = optionText;
      selectField.appendChild(option);
    }

    if (user) {
      // If user is logged in, allow user to create a custom option
      var optionText = 'Create new option'
      var option = document.createElement('option');
      option.innerHTML = optionText;
      option.value = 'customOption';
      selectField.appendChild(option);

      var pollUserId = pollObj.userId;
      var currentUserId = user.twitter.id;
      
      // Show Delete Button if poll's userId matches current logged in userId
      if (pollUserId === currentUserId) {
        deletePollButton.style.visibility = 'visible';
      }

    }

  }

  function showPollData(data) {
    var parsedData = JSON.parse(data);
    if (isEmpty(parsedData)) {
      return;
    }
    var options = parsedData[pollId].options;
    // console.log(options);
    for (var i=0; i<options.length; i++) {
      var option = options[i];
      
      var optionDataDiv = document.createElement('div');
      var pText = document.createElement('p');
      var pCount = document.createElement('p');

      pText.innerHTML = option.optionText + ": " + option.optionCount;
      optionDataDiv.appendChild(pText);
      pollData.appendChild(optionDataDiv);
    }


  }

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlAllPolls, populatePollOptions));
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlAllPolls, showPollData));


  voteForm.addEventListener('submit', function() {
    // console.log("qq");
    // console.log(this);
    // console.log(selectField.options);
    // console.log(selectField.selectedIndex);
    // console.log(customOptionInput.value);
    
    if (selectField.selectedIndex === 0) {
      // If first option, it is not a valid option so don't submit
      alert("Please select an option.");
      return false;
    }
    else if (selectField.selectedIndex === selectField.options.length - 1) {
      // If last option, make custom option, is selected, remove the select
      // elements when submitting form

      // Custom input field is empty, send alert and don't submit
      if (customOptionInput.value === "") {
        alert("Please enter a custom option.")
        return false;
      }
      // Remove select field if user enters a custom option
      selectField.remove();
    }
    else {
      // User chose one of the original options, so remove custom input field
      customOptionInput.remove();
    }

    alert("You have voted for: " + this.choice.value);
    // setTimeout(function () { window.location.reload(); }, 10)

  });

  if (user) {
    selectField.addEventListener('change', function() {
      // If create new option is selected
      // console.log(this.options[this.selectedIndex].value);
      // console.log(this.options);
      if (this.options[this.selectedIndex].value == 'customOption') {
        // Show custom option input field
        customOptionDiv.style.display = 'inline';
        customOptionInput.disabled = false;
        customOptionInput.focus();
      }
      else {
        // Hide custom option input field
        customOptionDiv.style.display = 'none';
        customOptionInput.disabled = true;
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
