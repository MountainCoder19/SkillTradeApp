$(document).ready(function() {

  //LOGOUT FUNCTIONALITY ===============================
  $('#logoutButton').on('click', function(){
    $.ajax({
      contentType: 'application/json',
      type: "DELETE",
      url: '/',
    })
    .done((req, res, next) => {
        FB.logout();
      window.location.replace("../index.html");
    })
    .fail((err) => {
      console.log('not logging out');
    });
  });

  $('#modalbtn').on('click', (event)=>{
    $('.modal').modal('show');
  });


//API CALL FUNCTION TO LOAD ALL CARDS====================
$.getJSON('/skillboard')
    .done((allCards) => {
      createTradeCard(allCards);
    })
    .fail(() => {
      console.log('not loading cards');
    });

//FUNCTION TO CREATE SKILL CARDS========================
function createTradeCard(arr){

  arr.map((e)=>{
    let $tradeCard = $("#skillCardSB").clone();
    $tradeCard.removeAttr("id");
    let indId= 'Card' + e.id;
    $tradeCard.attr("id", indId);
    // Put in content from api call
    let $category = $tradeCard.find('#card-category')
    $category.text(`${e.cat}`);
    let $title = $tradeCard.find("#cardTitle");
    $title.text(e.title);
    let $environment = $tradeCard.find("#cardEnvironment");
    $environment.text(e.env);
    let $photo = $tradeCard.find('#photo')
    $photo.attr('src', e.photo);
    let $text = $tradeCard.find("#cardDescription");
    $text.text(e.description);
    let $contactInfo = $tradeCard.find("#card-contact");
    $contactInfo.text(e.contact);
    $('#tradeCardsContainer').append($tradeCard);
  }); //END OF MAP

}



//END DOC READY
});
