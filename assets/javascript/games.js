
//////// Character objects
let character = {

    pika: {
        name: 'Pikachu',
        health: 120,
        attack: 8,
        counterAttack: 15,
    },

    charman: {
        name: 'Charmander',
        health: 100,
        attack: 14,
        counterAttack: 5,
    },

    bulba: {
        name: 'Bulbasaur',
        health: 150,
        attack: 8,
        counterAttack: 20,
    },

    squirt: {
        name: 'Squirtle',
        health: 110,
        attack: 7,
        counterAttack: 25,
    }
}

///////////// Setting some globals
let userSelection; // Will be used to assign selection to player
let opponent;     // Will be used to assign selection to opponent
let toggle = false; //Allows user to select thier player then opponent
var attack = 0;


///////////////////// Listner for user selections


$(document).ready(function () {


    //user selects their player
    $('.monster').click(function () {



        if (toggle === false) {
            //user player selection
            userSelection = $(this).attr('value');



            switch (userSelection) {
                case 'P1':
                    userSelection = character.pika;
                    break;
                case 'P2':
                    userSelection = character.charman;
                    break;
                case 'P3':
                    userSelection = character.bulba;
                    break;
                case 'P4':
                    userSelection = character.squirt;
                    break;
            }
            $(this).addClass('player field-player').appendTo('#battlefield').html('<p>HP: ' + userSelection.health + '</p>')
            //Allows player to select and others move to opponent

            toggle = true;
            $('.top').text("Select opponent");
        }

        else if (toggle) {
            //Allows user to select opponent
            opponent = $(this).attr('value')

            switch (opponent) {
                case 'P1':
                    opponent = character.pika;
                    break;
                case 'P2':
                    opponent = character.charman;
                    break;
                case 'P3':
                    opponent = character.bulba;
                    break;
                case 'P4':
                    opponent = character.squirt;
                    break;
            }


            //validation check. Player cannot fight self
            if (userSelection !== opponent) {

                $(this).addClass('opponent field-player').appendTo("#battlefield").html('<p>HP: ' + opponent.health + '</p>');


                $('.top').html('<p>' + userSelection.name + " will battle " + opponent.name + '</p>');
                $('.bottom').html('<p id="action-text></p> ');

                //Start the game
                game()

            }
            else {
                alert('Player can not battle self!');

            }
        }

    });


    //......................Game play.................................

    function game() {
        //disble toggle
        toggle = null;

        //Create attack and reset buttons when validation checks are done
        $('#battlefield').after('<button id="attack-btn">Attack your opponent</button>').fadeIn(500);
        $('#attack-btn').after('<button id="restart-btn">Restart Game</button>')
        $('#restart-btn').click(function () {
            location.reload();
        });

        //Attack button is live
        $('#attack-btn').click(function () {

            //set attack to increment based on character attack
            attack = attack + userSelection.attack;
            //small visual to attack opponent
            $('.opponent').effect('pulsate');
            //Reduce opponent health
            opponent.health = opponent.health - attack;




            console.log('opponent health' + opponent.health);
            $('.opponent').html('<p>HP: ' + opponent.health + '</p>');



            $('.bottom').append('<div class="container" id="stats"><p>' + userSelection.name + ' Attacked ' + opponent.name + ' with ' + attack + ' damage .</p><p>' + opponent.name + ' Counter Attacked ' + userSelection.name + ' with ' + opponent.counterAttack + ' damage! </p></div>');
            $('.container').fadeOut(4500);
            document.getElementsByClassName('opponent-stat').innerHTML = 'Health: ' + opponent.health;




            if (opponent.health < 1) {

                //selectin new opponent after user has defeated current opponent
                $('.bottom').text(userSelection.name + ' has defeated ' + opponent.name + "! ");

                //remove defeated opponent and game buttons reset toggle to allow new opponent
                $('.opponent').remove();
                $('button').remove();
                $('.top').text("Select another opponent!").append('<p><button id="restart-btn">Restart Game</button></p>');
                $('#restart-btn').click(function () {
                    location.reload();
                });
                toggle = true;
            }
            else {

                //reduce player health based on opponent counter attack
                $('.player').delay(500).effect('pulsate');
                userSelection.health = userSelection.health - opponent.counterAttack;

                console.log('player health:' + userSelection.health);
                $('.player').html('<p>HP: ' + userSelection.health + '</p>');

                if (userSelection.health < 1) {

                    $('section, button').remove();

                    $('.top').html('<p>You have been defeated!<p><button id="restart-btn">Restart Game</button>');
                    $('#restart-btn').click(function () {
                        location.reload();
                    });

                }

            }

        });

    }

});


