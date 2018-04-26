let timer = document.querySelector(".timer");
let card = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let stars = document.querySelector(".stars");
let cards = [...card];
let openedCards=[];
let interval;
let matchCounter = 0 , numOfMoves = 0 , second = 0, minute = 0; 

 

function startGame(){
 //   loop through each card and create its HTML &  add each card's HTML to the page 
   let shuffledCards = shuffle(cards);
   for (let i= 0; i < shuffledCards.length; i++){
         [].forEach.call(shuffledCards, function(e){
         deck.appendChild(e); });
//Set everything back when pressing reset and shuffling

//set all cards to closed 
cards[i].classList.remove("show", "open", "match"); }
//setback moves number and the number of mathed cards to zero and empty openedCards[] 
numOfMoves=0;
$(".moves").text(numOfMoves);
matchCounter=0;
openedCards = [];
//set timer to 0
second = 0 , minute = 0;
timer.innerHTML = "0 min 0 sec";
clearInterval(interval);
 //put back all stars
for (let i = 0; i < 3; i++) {
     {stars.children[i].style.visibility="visible";} } 
 }

function checkEachTime(){
for (let i = 0; i < card.length; i++) {
     cards[i].classList.remove("show", "open");
}

}
 
 function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

 
//set up the event listener for a card. If a card is clicked
function game(){  
// add a click EventListener to each card unless it has an "open" , "match" , "show"
    for (let i = 0 ; i < card.length; i++) {                 
    card[i].addEventListener('click' , function(){ 

    if(this.getAttribute('class') != "card open show" && this.getAttribute('class') != "card open show match" && this.getAttribute('class') != "card match"){        
    let clickednum = $('.card').index(this) ;

 //count number of moves and display
     numOfMoves += 1;
    $(".moves").text(numOfMoves);

// when number of moves = 1 (player started game) call timer function (start timer)
 if(numOfMoves == 1){ Timer();}
//after certin amount of moves the rating(stars) decrease but never less than 1   
    if (numOfMoves> 19){stars.children[0].style.visibility="hidden";}
    if (numOfMoves> 23){stars.children[1].style.visibility="hidden";}

    ShowCardsSymbol (clickednum);
        openedCards.push(this);       
    openCards($(this)); 
}});//end event listener              
}} // End of game()

 
 //method displayes the click card symbole [display the card's symbol]
function ShowCardsSymbol (clickednum) { card[clickednum].classList.add("open" , "show"); }

 
  //add the card to a *list* of "open" cards if the list already has another card, check to see if the two cards match
function openCards(openedCard){

    //compare 2 opened cards
   if(openedCards.length === 2){
       if(openedCards[0].children[0].getAttribute('class')  === openedCards[1].children[0].getAttribute('class')){
            matched();
        } 
       else { dontMatch(); }
    }    
}                                     
 
 //if the cards match, lock the cards in the open position 
 function matched(){   
openedCards[0].classList.add("match");
openedCards[1].classList.add("match");
openedCards[0].classList.remove("open" , "show");
openedCards[1].classList.remove("open" , "show");
//counter to check the number of matched cards & if they all match then player has won (call won methode)
matchCounter += 1;  
if (matchCounter === 8){ won(); }  
//empty opend cards array
    openedCards = []; 
}


//if the cards do not match cards are removed from the list of opend cards and  the card's symbol will be hidden againe
function dontMatch(){

setTimeout(function(){ 
checkEachTime(); 
openedCards[0].classList.remove("open" , "show");
openedCards[1].classList.remove("open" , "show");
openedCards = []; }, 400); //a delay so the player gets to see the second opend card
}  

//if all cards have matched, display a message with the final score
function won(){

 $(window).click(function(){$('.card').fadeOut();}); 
 let finalTime = timer.innerHTML;
 $(".deck").text("congratulates! You have Won with "+numOfMoves+" Moves in "+finalTime).css({"text-align": "center", "font-size": "250%"});
 clearInterval(interval);
 let btn = document.createElement("BUTTON");        //creat a reset button in cas player want to restart 
let t = document.createTextNode("Reset Game");        
btn.appendChild(t);                                
deck.appendChild(btn);                     
let button = document.getElementsByTagName("button");
button[0].addEventListener('click',function(){location.reload();});
}

//timer function called when when player starts the game. minutes incres by one when seconds become 60 sec 
function Timer(){
    interval = setInterval(function(){
        timer.innerHTML=minute+" min "+second+" sec";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000);
}

startGame();
game();
checkEachTime();

//Refrence : W3School , Serching on google
