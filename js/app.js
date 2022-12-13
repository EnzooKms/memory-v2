const div = document.getElementsByClassName("flip-card-back");
const flipCard = document.getElementsByClassName("flip-card");
const winModalContainer = document.getElementById('winModalContainer');
const winModal = document.getElementById('winModal');
const valeurs = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');
const tentative = document.getElementById('tentative');


function play() {
    function Aleatoire() {
        let newCarte = []
        let oldCarte = valeurs

        for (let i = 0, l = oldCarte.length; i < l; i++) {
            let random = Math.floor(Math.random() * oldCarte.length)
            newCarte.push(`${oldCarte[random]}`)
            oldCarte = oldCarte.filter(el => el !== oldCarte[random])
        }
        return newCarte
    }

    let value = [...Aleatoire(valeurs), ...Aleatoire(valeurs)]

    for (let i = 0; i < value.length; i++) {
        const element = value[i]
        div[i].style.backgroundImage = `url(${element})`
        flipCard[i].setAttribute("data-id", element)
        console.log(flipCard[i].dataset);
        flipCard[i].addEventListener("click", (e) => {
            Clicker(i)
        })

    }

    let last;
    let countClick = 0
    let Collection = []

    function Clicker(index) {

        if (last === flipCard[index]) {
            showError(flipCard[index])
            check();
            return
        }
        if (Collection.find(el => el === flipCard[index])) {
            showError(flipCard[index]);
            check();
            return
        }

        countClick++
        flipCard[index].classList.add("flip-card-click");

        if (countClick === 2) {

            if (last.dataset.id === flipCard[index].dataset.id) {
                console.log("test")
                Collection.push(...[flipCard[index], last])
                last = undefined
                countClick = 0
                check();
                return
            }
            else {
                setTimeout(() => {

                    for (const element of flipCard) {
                        if (!Collection.find(el => el === element)) {
                            element.classList.remove("flip-card-error")
                            element.classList.remove("flip-card-click")
                        }
                    }
                    countClick = 0
                    last = undefined
                    check();
                    return
                }, 1.25 * 700);
            }

        } else if (countClick > 2) {
            flipCard[index].classList.remove("flip-card-click")
            showError(flipCard[index]);
            check();
            return
        } else {
            last = flipCard[index]
            check();
            return
        }
    }



    function showError(el) {
        el.classList.add('flip-card-error');
        setTimeout(() => {
            el.classList.remove('flip-card-error');
        }, 500)
    }

    function check() {
        if (Collection.length === 12) {
            const restartButton = document.getElementById('restartButton');

            winModalContainer.style.display = "block";
            winModal.classList.add('win-modal-content-active');

            restartButton.addEventListener('click', () => {
                for (const element of flipCard) {
                        element.classList.remove("flip-card-error")
                        element.classList.remove("flip-card-click")
                }
                play()
                winModalContainer.style.display = 'none';
                winModal.classList.add('win-modal-content-active');
                Collection = [];
                value = [];
                countClick = 0
                last = undefined
                return
            })
        }
    }
}

play()