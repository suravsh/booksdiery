jQuery.each( [ "post", "put", "delete" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      traditional: true,
      success: callback
    });
  };
});

function isNotEmpty(str) {
  return (str && str.trim().length > 0);
}

function handlePostAction(e) {
  var title = $("#title").val();
  var author = $("#author").val();
  var isbn = $("#isbn").val();
  var price = $("#price").val();
  if (!(isNotEmpty(title) || isNotEmpty(author) || isNotEmpty(isbn) || isNotEmpty(price))) {
    alert("All fields are mandotary.");
    return;
  }
  if (!$.isNumeric(price)) {
    alert("Invalid price.");
    return; 
  }
  var data = {title: title, author: author, isbn: isbn, price: price};
  $.post('/books', data, function(result) {
    if (result && result.status == 0) {
        alert (result.msg);
    } else {
      window.location.reload();
    }
  })
}

function handleUpdateAction(e) {
  var bid = $("#bid").val();
  var title = $("#title").val();
  var author = $("#author").val();
  var isbn = $("#isbn").val();
  var price = $("#price").val();
  var data = {bid:bid, title: title, author: author, isbn: isbn, price: price};
  $.put('/books', data, function(result){
    if (result && result.status == 0) {
        alert (result.msg);
    } else {
      window.location.reload();
    }
  })
}

function handleDeleteAction(e) {
  var bid = $("#bid").val();
  var data = {bid: bid};
  $.delete('/books', data, function(result){
    if (result && result.status == 0) {
        alert (result.msg);
    } else {
      window.location = "/books";
    }
  })
}