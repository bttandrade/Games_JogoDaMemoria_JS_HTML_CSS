const path = './src/images/';

cardsInfo = [
    {
        name: '1',
        src: `${path}1.jpg`,
    },
    {
        name: '2',
        src: `${path}2.jpg`,
    },
    {
        name: '3',
        src: `${path}3.jpg`,
    },
    {
        name: '4',
        src: `${path}4.jpg`,
    },
    {
        name: '5',
        src: `${path}5.jpg`,
    },
    {
        name: '6',
        src: `${path}6.jpg`,
    },
    {
        name: '7',
        src: `${path}7.jpg`,
    },
    {
        name: '8',
        src: `${path}8.jpg`,
    },
    {
        name: '9',
        src: `${path}9.jpg`,
    },
]

let openCards = [];

function addListenerGameType() {
    document.querySelectorAll(".btn").forEach((type) => {
        type.addEventListener("click", () => {
            if (type.id === "btn-1") {
                localStorage.setItem("gameValue", 1);
            } else if (type.id === "btn-2") {
                localStorage.setItem("gameValue", 2);
            } else if (type.id === "btn-3") {
                localStorage.setItem("gameValue", 3);
            }
        })
    });
    return localStorage.getItem('gameValue');
}

let getGameValue = addListenerGameType();
let timer = 0;

if (getGameValue == 1) {
    timer = 60;
    document.getElementById('timing').textContent = '60';
    function countDown() {
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
        if (state.value.currentTime == 0) {
            alert("Você perdeu, tente novamente!!");
            window.location.reload();
        }
    }
} else if (getGameValue == 2) {
    document.getElementById('timing').textContent = '30';
    timer = 30;
    function countDown() {
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
        if (state.value.currentTime == 0) {
            alert("Você perdeu, tente novamente!!");
            window.location.reload();
        }
    }
} else if (getGameValue == 3) {
    timer = 0;
    function countDown() {
        state.value.currentTime++;
        state.view.timeLeft.textContent = state.value.currentTime;
    }
}

const state = {
    view: {
        timeLeft: document.querySelector("#timing"),
    },
    value: {
        countDownTimerId: setInterval(countDown, 1000),
        currentTime: timer,
    },
};

let cardTotal = cardsInfo.concat(cardsInfo);
let shufflecards = cardTotal.sort(() => (Math.random() > 0.5) ? 2 : -1);

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}`);
    audio.volume = 0.5;
    audio.play();
}

function putCards(shufflecards) {
    return shufflecards.forEach(card => {
        let box = document.createElement("div");
        let cardImg = document.createElement("img");
        box.className = "item";
        box.appendChild(cardImg);
        cardImg.className = "itemImg";
        cardImg.src = card.src;
        cardImg.alt = card.name;
        cardImg.width = "80";
        cardImg.height = "100";
        
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    });
}

putCards(shufflecards);

function handleClick() {
    playSound("flip.wav");
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML && openCards[0] !== openCards[1]) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];
    if (document.querySelectorAll(".boxMatch").length === cardsInfo.length * 2) {
        if (getGameValue == 3) {
            alert(`Você levou ${state.value.currentTime} segundos para terminar!!`);
            window.location.href="index.html";
        } else if (getGameValue == 1 || getGameValue == 2) {
            alert("Parabéns, você ganhou!!");
            window.location.href="index.html";
        }
    }
}
