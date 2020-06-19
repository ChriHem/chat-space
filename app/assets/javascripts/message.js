$(function(){
  
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__upper">
                      <div class="message__upper__name">
                        ${message.user_name}
                      </div>
                      <div class="message__upper__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      ${message.content}
                      <img class="message-image" src=${message.image}>
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__upper">
                      <div class="message__upper__name">
                        ${message.user_name}
                      </div>
                      <div class="message__upper__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    };
  }

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.send-btn').removeAttr('disabled');
    })
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});