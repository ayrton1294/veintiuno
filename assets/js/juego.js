// 2C = Two of Club(Tréboles)
// 2D = Two of Diamonds(Diamantes)
// 2H = Two of Hearts(Corazones)
// 2S = Two of Spades(Espadas)

(() => {
    "use strict";

    let deck            = [];
    const tipos         = ["C", "D", "H", "S"];
    const especiales    = ["A", "J", "Q", "K"];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias de HTML
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");

    const divCartasJugador = document.querySelector("#jugador-cartas");
    const divCartasComputadora = document.querySelector("#computadora-cartas");
    const puntosHTML = document.querySelectorAll("small");

    // Esta funcion crea una nueva baraja
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(`${i}${tipo}`);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(`${especial}${tipo}`);
            }
        }

        // console.log(deck);

        deck = _.shuffle(deck);
        // console.log(deck);

        return deck;
    };

    crearDeck();

    // Esta funcion me permite tomar una carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el Deck";
        }

        const carta = deck.pop();

        //   console.warn(deck);
        //   console.log(`${deck.length} cartas quedan`);
        //   console.log(`Se selecciono la carta '${carta}'`);
        return carta;
    };

    // for(let i = 0; i<= 100; i++){
    // pedirCarta();
    // }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);

            puntosHTML[1].innerText = puntosComputadora;

            // <img class="carta" src="assets/cartas/10C.png">

            const imgCarta = document.createElement("img");
            imgCarta.src = `assets/cartas/${carta}.png`; // 3H, JD
            imgCarta.classList.add("carta");
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert("Nadie Gana :( ");
            } else if (puntosMinimos > 21) {
                alert("Computadora Gana");
            } else if (puntosComputadora > 21) {
                alert("Jugador Gana");
            } else {
                alert("Computadora Gana");
            }
        }, 100);
    };

    // const valor = valorCarta(pedirCarta());
    // console.log({valor});

    // Eventos
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);

        puntosHTML[0].innerText = puntosJugador;

        // <img class="carta" src="assets/cartas/10C.png">

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`; // 3H, JD
        imgCarta.classList.add("carta");
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn("Lo siento mucho, perdiste");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("21, Genial");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener("click", () => {
        console.clear();

        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasJugador.innerHTML = "";
        divCartasComputadora.innerHTML = "";

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
})();