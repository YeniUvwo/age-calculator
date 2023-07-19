$(document).ready(function() {
    $(".icon-arrow").click(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      var day = $('#dayInput').val();
      var month = $('#monthInput').val();
      var year = $('#yearInput').val();
  
      // Perform validation
      var isValid = true;
  
      if (day === '') {
        isValid = false;
        showError('#dayInput', '.error', '.error-message');
      } else if (!isValidDay(day, month)) {
        isValid = false;
        showError('#dayInput', '.error-message', '.error');
      } else {
        hideError('#dayInput', '.error, .error-message');
      }
  
      if (month === '') {
        isValid = false;
        showError('#monthInput', '.error', '.error-message');
      } else if (!isValidMonth(month)) {
        isValid = false;
        showError('#monthInput', '.error-message', '.error');
      } else {
        hideError('#monthInput', '.error, .error-message');
      }
  
      if (year === '') {
        isValid = false;
        showError('#yearInput', '.error', '.error-message');
      } else if (!isValidYear(year)) {
        isValid = false;
        showError('#yearInput', '.error-message', '.error');
      } else {
        hideError('#yearInput', '.error, .error-message');
      }
  
      // Calculate age and display
      if (isValid) {
        var birthDate = new Date(year, month - 1, day);
        var now = new Date();
        var ageDiff = now - birthDate;
        var ageDate = new Date(ageDiff);
        var years = Math.abs(ageDate.getUTCFullYear() - 1970);
        var months = ageDate.getUTCMonth();
        var days = ageDate.getUTCDate() - 1;
  
        $('.years h2').text(years);
        $('.months h2').text(months);
        $('.days h2').text(days);
      } else {
        // Clear result if there are validation errors
        $('.years h2').text('-');
        $('.months h2').text('-');
        $('.days h2').text('-');
      }
    });
  
    // Helper functions for validation
    function showError(inputSelector, errorSelector, errorMessageSelector) {
      $(inputSelector).addClass('invalid');
      $(inputSelector).siblings(errorSelector).show();
      $(inputSelector).siblings(errorMessageSelector).hide();
      $(inputSelector).siblings('label').addClass('error-style');
    }
  
    function hideError(inputSelector, errorSelector) {
      $(inputSelector).removeClass('invalid');
      $(inputSelector).siblings(errorSelector).hide();
      $(inputSelector).siblings('label').removeClass('error-style');
    }
  
    function isValidDay(day, month) {
      var thirtyDayMonths = ['04', '06', '09', '11'];
      var thirtyOneDayMonths = ['01', '03', '05', '07', '08', '10', '12'];
  
      if (day === '31') {
        if (thirtyDayMonths.includes(month)) {
          return false; // Error: Month has only 30 days
        }
      }
  
      return /^(0?[1-9]|1[0-9]|2[0-9]|3[01])$/.test(day);
    }
  
    function isValidMonth(month) {
      return /^(0?[1-9]|1[0-2])$/.test(month);
    }
  
    function isValidYear(year) {
      var currentYear = new Date().getFullYear();
      return /^\d{4}$/.test(year) && parseInt(year) <= currentYear;
    }
  
    // Reset input and result when user clicks on input
    $('input').click(function() {
      $(this).removeClass('invalid');
      $(this).siblings('.error, .error-message').hide();
      $(this).siblings('label').removeClass('error-style');
      $('.years h2').text('-');
      $('.months h2').text('-');
      $('.days h2').text('-');
    });
  });
  