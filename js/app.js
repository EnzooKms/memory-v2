const div = document.getElementsByClassName("flip-card-back")
const flipCard = document.getElementsByClassName("flip-card")
const valeurs = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
const hoursEl = document.getElementById('hours')
const minsEl = document.getElementById('mins')
const secondsEl = document.getElementById('seconds')
const tentative = document.getElementById('tentative')


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

const value = [...Aleatoire(valeurs), ...Aleatoire(valeurs)]
console.log(value);

for (let i = 0; i < value.length; i++) {
    const element = value[i]
    div[i].style.backgroundImage = `url(${element})`
    flipCard[i].setAttribute("data-id", element)
    console.log(flipCard[i].dataset);
    flipCard[i].addEventListener("click", () => {
        Clicker(i)
    })

}

let last;
let countClick = 0
const Collection = []

function Clicker(index) {
    if (last === flipCard[index]) {
        // alert("vous avez clicker sur le même")
        return
    }
    if (Collection.find(el => el === flipCard[index])) {
        // alert('Vous avez déjà trouvé celui là')
        return
    }

    countClick++
    flipCard[index].classList.add("flip-card-click")

    if (countClick === 2) {
        countClick = 0
        if (last.dataset.id === flipCard[index].dataset.id) {
            Collection.push(...[flipCard[index], last])
            last = undefined
            return
        }
        else {
            console.log(true);
            setTimeout(() => {

                for (const element of flipCard) {
                    if (!Collection.find(el => el === element)) {
                        element.classList.remove("flip-card-click")
                    }
                }
                last = undefined
                return
            }, 1.25 * 1000);
        }
    }
    else {
        last = flipCard[index]
    }
    console.log(Collection, countClick);
}