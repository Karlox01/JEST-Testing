/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require('../game'); // Every time you add a new function you need to import it and export to appropriate test.

jest.spyOn(window, 'alert').mockImplementation(() => {}); // first argument to spy on is window, Second is method in this case alert, When an alert happens we will divert it to empty function.

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true);
    });
    test('turnInProgress key exists', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('turnInProgress key value is false', () => {
        expect('turnInProgress' in game).toBe(true);
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = 42;
        newGame()
    })
    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('should be one move in the computers game array', () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('should clear the player moves array', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test('should display 0 for the element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    })
});


describe('gameplay works correctly', () => {
    beforeEach(() => { // BeforeEach similar to beforeall , But whereas before all runs before all of the tests, beforeeach runs before each test is run
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correcty class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light')
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]); // we are doing this in order for player and computer turn to match each other.
        playerTurn(); // Now we call another turn.
        expect(game.score).toBe(1); // We would than expect the score to increase.
    });
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test('Should toggle turninProgress to true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('clicking during the computer sequence should fail', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toEqual('');  //to test if before and after clicking a button the array lastButton is still unchanged
    })
});