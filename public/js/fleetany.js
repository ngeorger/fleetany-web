window.onload=function(){
	$(".mdl-button--search").click(function() {
	  $(".mdl-layout__drawer-right").addClass("active");
	  $(".mdl-layout__obfuscator-right").addClass("ob-active");
	});

	$(".mdl-layout__obfuscator-right, .mdl-search__div-close").click(function() {
	  $(".mdl-layout__drawer-right").removeClass("active");
	  $(".mdl-layout__obfuscator-right").removeClass("ob-active");
	});
	
	$(".mdl-textfield__maskmoney").keyup(function() {
		$(this).parent().addClass('is-dirty');
	});

	$(".mdl-textfield__maskmoney").focusout(function() {
		if($(this).val() == '0,00' || $(this).val() == '0.00') {
			$(this).parent().removeClass('is-dirty');
		}
	});
	
    var dialog = $('dialog')[0];
    if (dialog) {
	    if (! $('dialog')[0].showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    $('.show-confirm-operation').click(function(event) {
	        event.preventDefault();
	        $('#url-confirm').val($(this).attr('href'));
	        dialog.showModal();
	    });
	    $('.confirm-operation').click(function(event) {
	    	window.location.href = $('#url-confirm').val();
	      });
	    $('.close').click(function() {
	      dialog.close();
	    });
	}
}

function showSnackBar(message) {
	(function() {
	  'use strict';
	  var snackbarContainer = $('#snackbar')[0];
	  var handler = function(event) {
	  };
	  $(window).load(function() {
	    'use strict';
	    message = $('<textarea />').html(message).text();
	    try {
    		var jsonMessage = $.parseJSON(message);
    	    if(typeof jsonMessage == 'object')
    	    {
    	    	message = '';
    	    	$.each( jsonMessage, function( key, value ) {
    	    		message += value + ' ';
	    		});
    	    }
    	}
    	catch (err) {
    	}
	    var data = {
	      message: message,
	      timeout: 5000,
//		       actionHandler: handler,
	      actionText: 'Undo'
	    };
	    snackbarContainer.MaterialSnackbar.showSnackbar(data);
	  });
	}());
}


function getApplicationUrl() {
	return $('meta[name="base-url"]').attr('content');
}

function url(url) {
	return getApplicationUrl() + '/' + url;
}