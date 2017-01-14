'use strict';

(function () {
  var pollTitle = document.querySelector('#poll-title');
  var voteForm = document.querySelector('#vote-form');
  var selectField = document.querySelector("#poll-options");
  var customOptionDiv = document.querySelector("#custom-option");
  var customOptionInput = document.querySelector("#custom-option-input");
  var deletePollButton = document.querySelector('#delete-button');
  var twitterButton = document.querySelector('#twitter-button');
  var pollData = document.querySelector('#poll-data');

  var apiUrlAllPolls = appUrl + '/api/allpolls';
  var apiUrlDeletePoll = appUrl + '/deletepoll';

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  function drawPieChart(optionsObj) {
    var colors = [
      'rgb(77, 77, 77)',
      'rgb(93, 165, 218)',
      'rgb(250, 164, 58)',
      'rgb(96, 189, 104)',
      'rgb(241, 124, 176)',
      'rgb(178, 145, 47)',
      'rgb(178, 118, 178)',
      'rgb(222, 207, 63)',
      'rgb(241, 88, 84)',
    ];

    var hoverColors = [
      'rgb(97, 97, 97)',
      'rgb(113, 185, 238)',
      'rgb(270, 184, 78)',
      'rgb(116, 209, 124)',
      'rgb(261, 144, 196)',
      'rgb(198, 165, 67)',
      'rgb(198, 138, 198)',
      'rgb(242, 227, 83)',
      'rgb(261, 108, 104)',
    ];

    var optionLabels = [];
    var optionData = [];
    var optionColor = [];
    var optionHoverColor = [];
    for (var i=0; i<optionsObj.length; i++) {
      var text = optionsObj[i].optionText;
      var count = optionsObj[i].optionCount;

      var colorVal = colors[i%10];
      var hoverColorVal = hoverColors[i%10];

      optionLabels.push(text);
      optionData.push(count);
      optionColor.push(colorVal);
      optionHoverColor.push(hoverColorVal);
    }

    // Pie Chart
    var ctx = document.getElementById("myChart").getContext("2d");
    
    var data = {
      labels: optionLabels,
      datasets: [
        {
          data: optionData,
          backgroundColor: optionColor,
          hoverBackgroundColor: optionHoverColor
        }]
    };

    var options = {
      responsive: false,
      legend: {
        labels: {
          fontColor: '#fff'
        }
      }
    };

    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });
  }

  function populatePollOptions(data) {
    var parsedData = JSON.parse(data);
    if (isEmpty(parsedData)) {
      return;
    }

    var pollObj = parsedData[pollId];
    var title = pollObj.title;
    var options = pollObj.options;

    // Set poll title
    pollTitle.innerHTML = title;
    // Change page title to title of poll
    document.title = title;    

    for (var i=0; i<options.length; i++) {
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

    drawPieChart(options);
  }


  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrlAllPolls, populatePollOptions));

  voteForm.addEventListener('submit', function() {
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
  });

  if (user) {
    selectField.addEventListener('change', function() {
      // If create new custom option is selected
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

    deletePollButton.addEventListener('click', function() {
      var confirmed = confirm("Are you sure you want to delete this poll?");
      if (confirmed) {
        var params = { "pollId": pollId };
        ajaxFunctions.ajaxRequestWithParams('DELETE', apiUrlDeletePoll, params, function () {
         
        });
      
        alert("The poll was successfully deleted.")
        // I got an error with res.redirect('polls') in pollHandler so I used window.location.href
        // to manually redirect to /polls from client side
        window.location.href = '/polls';
      }    
    }, false);

    // Center tweet popup window
    function popupWindow(url, title, w, h) {
      // window.outerHeight is height of whole browser window in pixels
      /* window.screenY is vertical distance of top border of browswer form top
       * edge of screen in css pixels */
      var yPos = window.outerHeight / 2 + window.screenY - (h / 2)
      var xPos = window.outerWidth / 2 + window.screenX - (w / 2)
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + yPos + ', left=' + xPos);
    } 

    twitterButton.addEventListener('click', function() {
      var tweetUrl = 'https://twitter.com/intent/tweet?' + 'text=' + document.title +
                     '&url=' + window.location.href + '&hashtags=poll,vote';
      popupWindow(tweetUrl, 'tweetPoll', 500, 500);
    }, false);

  }
  
})();
