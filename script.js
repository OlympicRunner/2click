(() => {

    function create2ClickSpace () {
        let container = document.querySelector('.container')
        let create2ClickTitle = document.createElement('h1')
        let createGameBox = document.createElement('div')
        let createInput = document.createElement('input')
        let button = document.createElement('button')

        create2ClickTitle.innerHTML = 'Text'
        createGameBox.classList.add('game-box')
        createInput.value = '4'
        createInput.type = 'text'
        createInput.maxLength = '2'
        button.textContent = 'Start'


        container.append(create2ClickTitle)
        container.append(createInput)
        container.append(button)
        container.append(createGameBox)
    }

    create2ClickSpace () //// создали структуру
    let settInt 
    function settInput () {
        let input = document.querySelector('input')

        settInt = setInterval(function () {
            if (input.value !== '4' || input.value !== '6' || input.value !== '8' || input.value !== '10') {
                input.value = '4'
            }
        }, 2000)

        

        input.addEventListener('input', () => {
            settInt
        })
    }
    settInput()




    function create2Click () {
        let h1 = create2ClickTitle()
        document.body.div.appent(h1)
    }
    
    let grid = document.querySelector('.game-box')
    let settGrid = 6

    let gridSett = 'repeat('+String(settGrid)+', 1fr) / repeat('+String(settGrid)+', 1fr)'

    function createGameBox () {
        let stringGrid = String(settGrid)
        grid.style.grid = gridSett;
    }
    


    document.addEventListener('DOMContentLoaded', () => {
        // createGameBox()
        // create2Click ()
        
        // console.log(stringGrid)
        // document.body.style.background = "#323232"

    })
})();