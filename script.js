(() => {

    let classItems = [] /// тут храним список классов существующих элементов сетки 
    
    let dataItems = [] /// тут мы будем хранить значения для элементов
   

    function create2ClickSpace () {
        let container = document.querySelector('.container')
        // let create2ClickTitle = document.createElement('h1')
        let createGameBox = document.createElement('div')
        let createInput = document.createElement('input')
        let button = document.createElement('button')
        let createSettBox = document.createElement('div')
        let createTimer = document.createElement('div')
        let settBoxUp = document.createElement('div')
        let inputBox = document.createElement('div')
        let btnContent = document.createElement('div')
        let timerInfo = document.createElement('div')

        let psevdoGameBox = document.createElement('div')
        let psevdoTimer = document.createElement('div')
        let psevdoInput = document.createElement('div')
        let psevdoButton = document.createElement('div')
        
        
        // create2ClickTitle.innerHTML = 'Text'
        createGameBox.classList.add('game-box')
        createInput.value = '4'
        createInput.type = 'number'
        createInput.classList.add('input')
        createInput.min = '2'
        createInput.max = '10'
        createGameBox.maxLength = '2'
        createInput.maxLength = '2'
        createInput.classList.add('input')

        button.classList.add('btn')
        button.classList.add('btn-start')
        createSettBox.classList.add('sett-box')
        createTimer.classList.add('timer')
        settBoxUp.classList.add('settbox-up')
        inputBox.classList.add('input-box')
        btnContent.classList.add('btn-content')
        btnContent.textContent = 'Start'
        timerInfo.classList.add('timer-info')

        container.append(createGameBox)
        container.append(createSettBox)
        createSettBox.append(settBoxUp)
        settBoxUp.append(createTimer)
        createTimer.append(timerInfo)
        settBoxUp.append(inputBox)
        inputBox.append(createInput)
        createSettBox.append(button)
        button.append(btnContent)
        /// оформление
        container.append(psevdoTimer)
        psevdoTimer.classList.add('psevdo-timer')
        container.append(psevdoInput)
        psevdoInput.classList.add('psevdo-input')
        container.append(psevdoButton)
        psevdoButton.classList.add('psevdo-btn')
        container.append(psevdoGameBox)
        psevdoGameBox.classList.add('psevdo-box')

        // createSettBox.append(create2ClickTitle)
        
        
        
        //// создали структуру


        function settInput () {

            button.addEventListener('click', () => {
                if (createInput.value > 10 || createInput.value < 2 || (createInput.value % 2) > 0) {
                    createInput.value = '4'
                }
                classItems.length = 0
                dataItems.length = 0
                function removeElement () {
                    let elemClass = document.querySelector('.elem')
                    if (elemClass !== null) {
                        document.querySelectorAll('.elem').forEach( item => {
                            item.remove()
                       })
                    }
                }
                removeElement ()
                gridInBox ()
                addGridElem ()
                itemSett ()
                itemSett ()
                shuffle(dataItems)
                crossingClass ()
                elementClick ()
            }) 
        }
        settInput() /// по клику проверка данных и построение сетки


        function gridInBox () {
            let gridSett = 'repeat('+String(createInput.value)+', 1fr) / repeat('+String(createInput.value)+', 1fr)'
            createGameBox.style.grid = gridSett
        } /// строит Grid сетку

        /// создаем елементы по грид сетке
        function addGridElem () {
            function createElem (i) {
                let oneElem = document.createElement('button')
                let classs = 'elem-' + i
                oneElem.classList.add(classs)
                oneElem.classList.add('elem')
                createGameBox.append(oneElem)

                classItems.push(classs)
            }

            let gridCalc = createInput.value * createInput.value
            
            
            for(i = 0; i < gridCalc; i++) {
                createElem (i)
            }
        }

        //// ....теперь делаем зависимости значений к классам 
        
        function itemSett () {
            let input = document.querySelector('input')
            let perOneDate = (input.value * input.value) / 2
            
            for (i = 0; i < perOneDate; i++) {
            
                let newClass = 'image-data-' + i
                let iObj = newClass
                dataItems.push(iObj)   
            } 
        }

        function timerPlaying () {
            timerInfo.textContent = '00:00'
        }
        timerPlaying ()

    }

    function shuffle(array) {   /// данная штуковина микширует массив с данными
        array.sort(() => Math.random() - 0.5);
    }

    /// теперь делаем функцию которая будет присваивать свойства (класс) обьекта элементу по их одинаковым индексам порядка

    function crossingClass () {
        for (i = 0; i < (classItems.length); i++) {
            let convertClass = '.'+ classItems[i]
            let elem = document.querySelector(convertClass)
            elem.classList.add(dataItems[i])
        }
    }



    /// клик по элементу
    
    function elementClick () { ///  пробуем сделать событие клика для всех элементов при помощи обращения по классу , и счетчика как выше функция
        for (let item of classItems) {/// функция двоит в консоль потому-что дата список двойной по этому и срабатывает как х2 
            let cls = '.' + item
            let select = document.querySelector(cls)
            
            select.addEventListener('click', () => { 
                let j = 0 /// индекс проверки 
                for (let itm of classItems) {
                    let clss = '.' + itm
                    let selectt = document.querySelector(clss)
                    if (selectt.classList.contains('active')) {
                        j++
                    }
                }
                if (j > 0) {
                    let selectAvtive = document.querySelector('.active')
                    if (selectAvtive.classList[2] == select.classList[2]) {
                        select.classList.add('static')
                        selectAvtive.classList.add('static')
                        selectAvtive.classList.remove('active')
                        selectAvtive.setAttribute('disabled', 'true')
                        select.setAttribute('disabled', 'true')
                       
                        /// удалить из списка classItems
                        
                        classItems.splice(classItems.indexOf(selectAvtive.classList[0]), 1)
                        classItems.splice(classItems.indexOf(select.classList[0]), 1)
                        
                        dataItems = []
                        let selectGameBox = document.querySelectorAll('.elem')
                        
                        for (let item of selectGameBox) {
                            if (!(item.classList.contains('static'))) {
                                dataItems.push(item.classList[2])
                            }
                        }
                        
                        /// найти елемент который имет строку select.classList[2]) и удалть

                        
                    } else { /// если не угалади 2-й елемент
                        selectAvtive.classList.remove('active')
                        
                        for (let item of classItems) {
                            let clssss = '.' + item
                            let selecttt = document.querySelector(clssss)
                            selecttt.classList.remove(selecttt.classList[2])
                            selecttt.removeAttribute('disabled')
                        }
                        shuffle(dataItems)
                        crossingClass ()
                    }
                } else {
                    select.classList.add('active')
                    select.setAttribute('disabled', 'true')
                }
            })
            
        }
    }
    elementClick ()

    
    
    


    document.addEventListener('DOMContentLoaded', () => {
        create2ClickSpace ()
    })
})();