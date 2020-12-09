let isXIcon = true
let p1Moves = []
let p2Moves = []
let player1Score = document.querySelector('#player1Score');
let player2Score = document.querySelector('#player2Score');
let player1ResultLabel = document.querySelector('#player-1-result-label')
let player2ResultLabel = document.querySelector('#player-2-result-label')
let player1ResultImage = document.querySelector('#player-1-result-image')
let player2ResultImage = document.querySelector('#player-2-result-image')
let status
let pCounter = 0
let bCounter = 0

const PATTERNS = [123, 456, 789, 147, 258, 369, 159, 357]



function setMark(cellId) {
    let tableData = document.getElementById(cellId);

    if (!(p1Moves.includes(cellId)) && !(p2Moves.includes(cellId))) {
        let icon = isMyTurn();
        (~icon.indexOf('x')) ? p1Moves.push(cellId) : p2Moves.push(cellId);
        tableData.style.background = `url(images/${icon}) no-repeat center center`; //set the icon when the table data is clicked
    }


    if (p1Moves.length >= 3||p2Moves.length >= 3) {
     
        setTimeout(() => {
            getStatus('player 1', p1Moves)
        }, 200);

        setTimeout(() => {
            getStatus('player 2', p2Moves)
        }, 200);


        if((p1Moves.length+p2Moves.length)===9){
            setTimeout(() => {
                getStatus('draw', null)
            }, 200); 

            }
        }
        
}

function isMyTurn() {
    if (isXIcon === true) {
        isXIcon = (!isXIcon)
        return 'x-icon.png'
    }

    else if (isXIcon === false) {
        isXIcon = (!isXIcon)
        return 'o-icon.png'
    }
}

function getStatus(role, context) {


    PATTERNS.map(pattern => {
        if (checkPattern(context, pattern)) {
            this.status='won';
            console.log(status);
            if (role === 'player 1') {
                player1Score.innerHTML = (pCounter += 1)
                player1ResultLabel.innerHTML = "WON"
                player1ResultImage.src = "images/win.png"

                player2ResultLabel.innerHTML = "LOSE"
                player2ResultImage.src = "images/lose.png"
                player2ResultImage.setAttribute('style', 'font-size: 4em; margin-top: 0; margin-bottom:.25em;')

            }

            else if (role === 'player 2') {
                player2Score.innerHTML = (bCounter += 1)
                player2ResultLabel.innerHTML = "WON"
                player2ResultImage.src = "images/win.png"
                player2ResultImage.setAttribute('style', 'font-size: 4em; margin-top: 0; margin-bottom:.25em;')

                player1ResultLabel.innerHTML = "LOSE"
                player1ResultImage.src = "images/lose.png"
    
                   
            }
  
            setTimeout(() => {
                alert(`${role.toUpperCase()} ${status}!`)
                reset()
            }, 100);

            
        }
    })

 
    if(status!='won'&&role==='draw' ){    
        player2ResultLabel.innerHTML = "DRAW"
        player2ResultImage.src = "images/draw.png"
        player2ResultImage.setAttribute('style', 'font-size: 4em; margin-top: 0; margin-bottom:.25em;')

        player1ResultLabel.innerHTML = "DRAW"
        player1ResultImage.src = "images/draw.png"

        setTimeout(() => {
            alert(`DRAW!`)
            reset()
        }, 100);

}

}


function checkPattern(list, num) {
    if(list===null) return;
    let result = list.toString().match(new RegExp(`[${num}]`, 'g'))
    return (result !== null && result.length === 3) ? true : false
}


function reset() {
    let tdElements = document.getElementsByTagName("td")

    for (let element = 0; element < tdElements.length; element++)
        tdElements[element].style.background = 'none'

    isXIcon = true
    p1Moves = []
    p2Moves = []
    player1ResultImage.src="images/x-icon.png"
    player2ResultImage.src="images/o-icon.png"
    player1ResultLabel.innerHTML=""
    player2ResultLabel.innerHTML=""
    status=""
}

