'use strict';

var appUrl = window.location.origin;
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest(method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   },
   ajaxRequestWithParams: function ajaxRequestWithParams(method, url, params, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      // console.log(params);
      var params = JSON.stringify(params);
      xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
      // xmlhttp.setRequestHeader("Content-length", params.length);
      // xmlhttp.setRequestHeader("Connection", "close");
      // console.log(params);
      xmlhttp.send(params);
   }
};