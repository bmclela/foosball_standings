var teamList = [];

//Check that input is valid
function validateGame(player1, player2, player3, player4) {
    if(
        player1 == '' || player2 == '' || player3 == '' || player4 == '' ||
        player1 == player2 || player2 == player3 || player3 == player4 || 
        player1 == player3 || player1 == player4 || player2 == player3 || player2 == player4
        ) {
        return false;
    } 
    return true;
}

//Take in players and return team name based on alphabetical order
function getTeamName(player1, player2) {
    if (player1 <= player2) {
        var teamName = `${player1} and ${player2}`;
    } else {
        var teamName = `${player2} and ${player1}`;
    }
    return teamName;
}

//Updates the team's score and creates a new team if necessary
function updateScores(team1Name, team2Name) {

    //Update or add team1
    if(!searchTeam(team1Name, teamList)) {
        team1 = getTeam(team1Name, teamList);
    } else {
        team1 = new Team(team1Name);
    }

    //Update or add team2
    if(!searchTeam(team2Name, teamList)) {
        team2 = getTeam(team2Name, teamList);
    } else {
        team2 = new Team(team2Name);
    }

    team1.gamesWon++;
    team2.gamesLost++;

}

function searchTeam(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            console.log(`Teamname: ${teamName}`);
            return true;
        }
        return false;
    }
}


function getTeam(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

//Creates a new team and sets initial win or loss
class Team {    
    constructor(teamName) {
        this.ranking = 0;
        this.name = teamName;
        this.elo = 1000;
        this.gamesWon = 0;
        this.gamesLost = 0;
    }
}

//UI Class: Handles UI Tasks
class UI {
    static displayRanking() {
        const teams = Store.getTeams();

        teams.forEach((team) => UI.addTeamtoList(team));
    }

    static addTeamtoList(team) {
        const list = document.querySelector('#team-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${team.ranking}</td>
            <td>${team.name}</td>
            <td>${team.gamesWon}</td>
            <td>${team.gamesLost}</td>
        `;

        list.appendChild(row);

        this.sortTeams();
    }

    static updateTeam(teamName, outcome) {
        //currentTeam = searchElement(teamName, teams);
        //currentTeam.parentElement.parentElement.remove();

        const list = document.querySelector('#team-list');

        console.log(list[1]);

        this.sortTeams();
    }

    static sortTeams() {
        //sort teams here
        const list = document.querySelector('#team-list');

        //console.log(list.children[0].children[1]);

        for (let i=0; i<list.children.length; i++) {
            const win = list.children[i].children[2].textContent;
            const loss = list.children[i].children[3].textContent;

            console.log(win);
            console.log(loss);
        }


    }

    static showAlert(message, classname) {
        const div = document.createElement('div');
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#team-form');
        container.insertBefore(div, form);

        //Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#player1').value = '';
        document.querySelector('#player2').value = '';
        document.querySelector('#player3').value = '';
        document.querySelector('#player4').value = '';
    }
}

//Store Class: Handles Storage
class Store {
    static getTeams() {
        let teams;
        if(localStorage.getItem('teams') === null) {
            teams = [];
        } else {
            teams = JSON.parse(localStorage.getItem('teams'));
        }

        return teams;
    }

    static addTeam(team) {
        const teams = Store.getTeams();

        teams.push(team);

        localStorage.setItem('teams', JSON.stringify(teams));
    }

    static updateTeam(teamName) {
        const teams = Store.getTeams();

        teams.forEach((team, index) => {
            if(books.teamName === teamName) {
                console.log("Made it this far, now update team score");
            }
        });

        localStorage.setItem('teams', JSON.stringify(teams));
    }
}

//Event: Display team rankings
document.addEventListener('DOMContentLoaded', UI.displayRanking);

//Event: Add game
document.querySelector('#team-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    var e = document.getElementById("player1");
    const player1 = e.options[e.selectedIndex].value;
    var e = document.getElementById("player2");
    const player2 = e.options[e.selectedIndex].value;
    var e = document.getElementById("player3");
    const player3 = e.options[e.selectedIndex].value;
    var e = document.getElementById("player4");
    const player4 = e.options[e.selectedIndex].value;

    //Validate
    if (!validateGame(player1, player2, player3, player4)) {
        UI.showAlert('Invalid Input', 'danger');
    } else {
        const team1Name = getTeamName(player1, player2);
        const team2Name = getTeamName(player3, player4);
        
        updateScores(team1Name, team2Name);

        //sortTeams();

        //update UI

        //update Store
        
        //Show success
        UI.showAlert('Game Added', 'info');
        console.log(`${team1Name} beat ${team2Name}!`)

        //Clear fields        
        UI.clearFields();
    }
})

//Event: Remove game