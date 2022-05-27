$(document).ready(function(){
    $("#x").on({
        mouseover: function(){
        $("#x").css("text-shadow","7px 7px yellow");
    },
        mouseout: function(){
            $("#x").css("text-shadow","0px 0px yellow");
        },
        click: function(){
    $("#blur").css("display", "none");
    $("#choice").css("display", "none");
    $("#think2").css({"opacity": 1});
  }
        
    });

    $("#o").on({
        mouseover: function(){
        $("#o").css("text-shadow","7px 7px yellow");
    },
        mouseout: function(){
            $("#o").css("text-shadow","0px 0px yellow");
        },
        click: function(){
    $("#blur").css("display", "none");
    $("#choice").css("display", "none");
    $("#think2").css({"opacity": 1});
  }
        
    });

});


var position = document.getElementsByClassName("item");
var player="";
var computer="";

var game = ["-","-","-","-","-","-","-","-","-"]


function gameover(result){
    if(result==1){
        document.getElementById("result").innerHTML = "YOU WIN";
        document.getElementById("result").style.display = "block";
        document.getElementById("replay").style.display = "block";
    }
    else if(result==2){
        document.getElementById("result").innerHTML = "ANIRUDDH WIN";
        document.getElementById("result").style.display = "block";
        document.getElementById("replay").style.display = "block";
    }


}
function replay(){

    location.reload(true);
}
function iswinning(gamecopy, who){

    return( (gamecopy[0]==who && gamecopy[1]==who && gamecopy[2]==who ) || (gamecopy[3]==who && gamecopy[4]==who && gamecopy[5]==who ) || (gamecopy[6]==who && gamecopy[7]==who && gamecopy[8]==who ) || (gamecopy[0]==who && gamecopy[4]==who && gamecopy[8]==who ) || (gamecopy[2]==who && gamecopy[4]==who &&  gamecopy[6]==who ) || (gamecopy[0]==who && gamecopy[3]==who &&  gamecopy[6]==who )|| (gamecopy[1]==who && gamecopy[4]==who &&  gamecopy[7]==who ) || (gamecopy[2]==who && gamecopy[5]==who &&  gamecopy[8]==who ) )
}

function isSpaceFree(gamecopy, i){

    return gamecopy[i]=="-";
}
function isFull(){
    
    for(var x=0;x<9;x=x+1){
        if(isSpaceFree(game, x)){
            return false;
        }
    }
    return true;
}
function computermove(game){

    var gamecopy = game.slice()
    
    for(var i=0; i<9;i=i+1){
        if (isSpaceFree(gamecopy, i)){
            gamecopy[i]=computer
            if (iswinning(gamecopy, computer)){ makemove(i) ; return -2;}
            gamecopy = game.slice();
            gamecopy[i]=player
            if (iswinning(gamecopy, player)){ return i;}
        }
    }
    gamecopy = game.slice();
    var odd = [0,2,6,8];
    var even = [1,3,5,7];
    
    for(var x=0 ; x<4; x=x+1)
    {
        if( isSpaceFree(gamecopy, odd[x])){ console.log(x); return odd[x];}
    }
    
    for(var x=0 ; x<4; x=x+1)
    {
        
    if( isSpaceFree(gamecopy, even[x])){ return even[x];}

    }

    if(isSpaceFree(gamecopy,4)){return 4;}

    return -1;


}

function makemove(move){
   
    $("#think").css({"opacity": 1});
    $("#think").animate({'margin-left' :'+=140px'},500);

    $("#think").animate({'margin-left' :'-=140px'},500,function(){
        $("#think").css({"opacity": 0});
        
        position[move].innerHTML = computer ;
        game[move]=computer ;
        if(isFull()){
         document.getElementById("result").innerHTML = "GAME DRAW";
         document.getElementById("result").style.display = "block";
         document.getElementById("replay").style.display = "block";
     
         return;
        }
    });
    
    return;
}

function man(x){

   if(isSpaceFree(game,x)){
       position[x].innerHTML=player;
       game[x]=player;
       if(iswinning(game,player)){gameover(1); return ;}
       var move = computermove(game);
       console.log(move);
       if(move==-2){
        
            gameover(2);
            return;
        }
       else if(move!=-1){
            makemove(move);   
             return;
        }

       
   }

}

function choicex(){
    player="X" ;
    computer="O";
    toss= Math.floor(Math.random() * 2);
    if(toss){
        var move = computermove(game);
        if(move!=-1){
            makemove(move);    
        }
    }
    return;
}
function choiceo(){
    player="O";
    computer="X";
    toss= Math.floor(Math.random() * 2);

    if(toss){
        var move = computermove(game);
        if(move!=-1){
            makemove(move);    
        }
    }return;
    
}

