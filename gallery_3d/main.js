
var init = function() {

  var pictureTitle = document.getElementById("picture-title");
  var pictureDetails = document.getElementById("picture-details");
  var pictureDescription = document.getElementById("picture-description");

  setPictureDetails = function(index){
    pictureTitle.innerHTML  = pictureInformation.titles[index]
    pictureDetails.innerHTML  = pictureInformation.details[index]
    pictureDescription.innerHTML  = pictureInformation.descriptions[index]
  }

  var wallDescriptions = [
    "Biography",
    "Artworks",
    "Artworks",
    "Video"
  ]
  var turnRightInfo = document.getElementById("turn-right-info");
  var turnLeftInfo = document.getElementById("turn-left-info");

  var escherImages = [
    "images/escher/kaire_1.jpg",
    "images/escher/kaire_2.jpg",
    "images/escher/kaire_3.jpg",
    "images/escher/pagrindinis_1.jpg",
    "images/escher/pagrindinis_2.jpg",
    "images/escher/pagrindinis_3.jpg",
    "images/escher/desine_1.jpg",
    "images/escher/desine_2.jpg",
    "images/escher/desine_3.jpg"
    ];
  var rotation = 0;
  var lastSide = 3;
  var box = document.querySelector('.container').children[0];
  var controlButtons = document.querySelectorAll('.controls');
  var transition = false;
  var pictureTransition = false;
  var selectedPicture = 0;

  var sides = document.querySelectorAll('#cube .side');
  var borders = document.querySelectorAll('#cube .border');

  var pictures = document.querySelectorAll('#cube .picture');
  var bigPicture = document.getElementById("big-picture")
  var info = document.getElementById("info")
  var closeInfoButton = document.getElementById("closeInfoButton")
  var pictureText = document.getElementById("picture-text")

  toggleVisibility = function(){
    var side = ((rotation / 90) % 4 + 7) % 4;

    turnLeftInfo.innerHTML = wallDescriptions[(side + 1) % 4]
    turnRightInfo.innerHTML = wallDescriptions[(side + 3) % 4]

    sides[side * 2].hidden = true;
    sides[side * 2 + 1].hidden = true;
    sides[lastSide * 2].hidden = false;
    sides[lastSide * 2 + 1].hidden = false;

    if (side < 3) {
      borders[side * 2].hidden = true;
      borders[side * 2 + 1].hidden = true;
    };
    if (lastSide < 3) {
      borders[lastSide * 2].hidden = false;
      borders[lastSide * 2 + 1].hidden = false;
    };

    lastSide = side;
  }

  buttonAnimation = function(name){
    for (var i=0, len = controlButtons.length; i < len; i++) {
      controlButtons[i].style.animationName = name;
    }
  }

  buttonStyleToggle = function(name){
    for (var i=0, len = controlButtons.length; i < len; i++) {
      controlButtons[i].classList.toggle(name);
    }
  }

  onButtonClick = function( event ){
    if(transition) return;
    if (this.id == "turn-left") {
      rotation -= 90;
    } else if (this.id == "turn-right") {
      rotation += 90;
    }
    box.style.transform = "translateZ( 10vw ) rotateY( " + rotation + "deg ) translateY( 2vw )"
    setTimeout(toggleVisibility, 1000);
    transition = true;
    buttonAnimation("button-fade");
  };

  for (var i=0, len = controlButtons.length; i < len; i++) {
    controlButtons[i].addEventListener( 'click', onButtonClick, false);
  }

  var introScreen = document.getElementById("intro-screen");
  var continueButton = document.getElementById("continue-button");
  continueClick = function( event ){
    introScreen.style.animationName = "fade";
  }
  continueButton.addEventListener('click', continueClick, false);

  introScreen.addEventListener('animationend', function(){
    this.hidden = true;
  }, false);

  box.addEventListener('transitionend', function(){
    transition = false;
    buttonAnimation("");
  }, false);


  function pictureFunction(index) {
    var i = index;
    function func() {
      if(Math.floor(i / 3) != ((lastSide + 2) % 4)) return;
      if (pictureTransition) return;
      pictureTransition = true;
      info.classList.toggle("appeared")
      info.style.animationName = "info-appear"
      // buttonAnimation("button-move-down")
      // buttonStyleToggle("moved")
      selectedPicture = i;
      setPictureDetails(i);
      bigPicture.src = escherImages[i]
      bigPicture.style.animationName = "picture" + (selectedPicture % 3) + "-to-big"
      bigPicture.style.animationDirection = "normal"
    }
    return func;
  }

  for (var i=0, len = pictures.length; i < len; i++) {
    pictures[i].addEventListener( 'click', pictureFunction(i), false);
  }

  closeInfoButton.addEventListener('click', function(){
    if (pictureTransition) return;
    pictureTransition = true;
    info.style.animationName = "info-fade"
    bigPicture.style.animationName = "picture" + (selectedPicture % 3) + "-to-big"
    bigPicture.style.animationDirection = "reverse"
    // buttonAnimation("button-move-up")
    // buttonStyleToggle("moved")
  }, false);

  info.addEventListener('animationend', function(e){
    bigPicture.style.animationName = ""
    pictureTransition = false;
    if (e.animationName == "info-fade") {
      info.classList.toggle("appeared")
    };
  }, false)

  var musicButton = document.getElementById("musicToggle");
  var musicOn = false;
  var music = document.getElementById("music");
  music.pause();
  musicButton.classList.toggle("mute")
  music.volume = 0.3;
  musicButton.addEventListener('click', function(){
    musicButton.classList.toggle("mute")
    if (musicOn) {
      music.pause()
    } else {
      music.play()
    }
    musicOn = !musicOn;
  }, false);
};
  
window.addEventListener( 'DOMContentLoaded', init, false);
