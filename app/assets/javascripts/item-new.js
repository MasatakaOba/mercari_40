$(document).on("turbolinks:load", function() {


  $(document).on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('dragover', function (e){
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('drop', function (e){
    e.stopPropagation();
    e.preventDefault();
  });

  function decisionItemsNumber(){
    if ($(".sell-upload-items-list:last").hasClass(`have-item-5`)){
      $(".sell-upload-items-list:last").after('<ul class="sell-upload-items-list have-item-0"></ul>')
    }
  }

  function decisionItemsListNumber(){
    if ($(".have-item-5").length >= 2) {
      $(".sell-upload-drop-box").css("display", "none");
    } else {
      decisionItemsNumber()
    }
  }

  function removeItemsList(){
    if ($(".sell-upload-items-list").hasClass(`have-item-0`)){
      $(".have-item-0:last").remove();
    }
  }

  function adjustWidthOfUploadBox(){
    var itemNumber = $(".sell-upload-items-list:last li").length
    $(".sell-upload-items-list:last").removeClass(function(index,className){
      return (className.match(/\bhave-item\S+/g) || []).join(' ');
    })
    $(".sell-upload-drop-box").removeClass(function(index,className){
      return (className.match(/\bwidth-for-item\S+/g) || []).join(' ');
    })
    $(".sell-upload-items-list:last").addClass(`have-item-${itemNumber}`)
    $(".sell-upload-drop-box").addClass(`width-for-item-${itemNumber}`)
  }



  function decisionAspectRatio(image){
    image.bind("load", function(){
      var aspectRatio = image.width() / image.height()
      if ( aspectRatio === 1 ){
        image.parent().addClass("square")
      } else if ( aspectRatio > 1 ) {
        image.parent().addClass("landscape")
      } else if ( aspectRatio < 1 ) {
        image.parent().addClass("portrait")
      }
    })
  }

  function buildSellUploadItem(){
    var html = `
<li class="sell-upload-item">
  <figure class="sell-upload-figure">
    <img>
  </figure>
  <div class="sell-upload-button">
    <div class="sell-upload-edit">編集</div>
    <div class="sell-upload-delete">削除</div>
  </div>
</li>`
    return html;
  }

  $(".js-upload-image-input").change(function(e) {
    var files = this.files
    for (var i = 0; i < files.length; i++){
      var file = files[i];
      if( file.type.indexOf("image") < 0 ) {
         continue;
      }
      $(".sell-upload-items-list:last").append(buildSellUploadItem())
      var uploadImage = $(".sell-upload-item:last img")
      uploadImage[0].file = file;
      var reader = new FileReader();
      reader.onload = function(e){
        uploadImage.attr('src', e.target.result);
      }
      reader.readAsDataURL(file);
      adjustWidthOfUploadBox();
      decisionItemsListNumber();
      decisionAspectRatio(uploadImage);
      renameHaveItemClass()
    }
  });

  $(".sell-upload-drop-box").on("dragenter", function (e){
    e.stopPropagation();
    e.preventDefault();
  });

  $(".sell-upload-drop-box").on("dragover", function (e){
    e.stopPropagation();
    e.preventDefault();
  });

  $(".sell-upload-drop-box").on("drop", function (e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    for (var i = 0; i < files.length; i++){
      var file = files[i];
      if( file.type.indexOf("image") < 0 ) {
         continue;
      }
      $(".sell-upload-items-list:last").append(buildSellUploadItem())
      var uploadImage = $(".sell-upload-item:last img")
      uploadImage[0].file = file;
      var reader = new FileReader();
      reader.onload = function(e){
        uploadImage.attr('src', e.target.result);
      }
      reader.readAsDataURL(file);
      adjustWidthOfUploadBox();
      decisionItemsListNumber();
      decisionAspectRatio(uploadImage);
    }
  });

  $(document).on("click", ".sell-upload-delete", function(){
    $(this).parents("li").remove();
    if ($(".have-item-5").length === 2) {
      $(".sell-upload-drop-box").css("display", "block");
    }
    removeItemsList();
    adjustWidthOfUploadBox();
    decisionItemsListNumber();
  })

  $(".js-price").on("keyup",function(){
    var inputValue = $(this).val()
    if ( $.isNumeric(inputValue) && inputValue >= 300 && inputValue <= 9999999 ){
      var fee = Math.floor(inputValue*0.1)
      $(".js-price-fee").text(`¥${fee}`)
      $(".js-price-margin").text(`¥${inputValue - fee}`)
    }
  })
})
