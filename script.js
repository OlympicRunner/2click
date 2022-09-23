(() => {

    let classItems = [] /// тут храним список классов существующих элементов сетки 
    
    let dataItems = [] /// тут мы будем хранить значения для элементов
    let startInterval

    function create2ClickSpace () {
        const container = document.querySelector('.container')

        const createGameBox = document.createElement('div')
        const createInput = document.createElement('input')
        const button = document.createElement('button')
        const createSettBox = document.createElement('div')
        const createTimer = document.createElement('div')
        const settBoxUp = document.createElement('div')
        const inputBox = document.createElement('div')
        const inputBtns = document.createElement('div')
        const inputBtnUp = document.createElement('button')
        const inputBtnDown = document.createElement('button')
        const btnContent = document.createElement('div')
        const timerInfo = document.createElement('div')
        const timerSpan = document.createElement('span')

        const psevdoGameBox = document.createElement('div')
        const psevdoTimer = document.createElement('div')
        const psevdoInput = document.createElement('div')
        const psevdoButton = document.createElement('div')

        // создаем svg для кнопки 

        const svgArrow = document.createElement('svg')
        const svgPathArrow = document.createElement('path')
        svgArrow.setAttribute('version', '1.1')
        svgArrow.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        svgArrow.setAttribute('viewBox', '0 0 629.42 595.28')

        svgPathArrow.setAttribute('fill', '#00C3D9')
        svgPathArrow.setAttribute('d', "M282.97,105.54L42.17,444.66c-18.3,25.77,0.13,61.46,31.74,61.46h481.61c31.61,0,50.04-35.69,31.74-61.46 l-240.8-339.12C330.93,83.69,298.49,83.69,282.97,105.54z")
     


        svgArrow.append(svgPathArrow)

        
        
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
        inputBtns.classList.add('input-btns')
        inputBtnUp.classList.add('btn-up')
        inputBtnDown.classList.add('btn-down')
        btnContent.classList.add('btn-content')
        btnContent.textContent = 'Start'
        timerInfo.classList.add('timer-info')
        timerSpan.setAttribute('id', 'timer')

        container.append(createGameBox)
        container.append(createSettBox)
        createSettBox.append(settBoxUp)
        settBoxUp.append(createTimer)
        createTimer.append(timerInfo)
        settBoxUp.append(inputBox)
        inputBox.append(createInput)
        inputBox.append(inputBtns)
        inputBtns.append(inputBtnUp)
        inputBtns.append(inputBtnDown)
        createSettBox.append(button)
        button.append(btnContent)
        timerInfo.append(timerSpan)

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
        
        timerSpan.textContent = '00:00'
        
        //// создали структуру


        function settInput () {/// не очень коректное название функции но это стартовая точка для развития всего процесса

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
                stopInterval ()

                /// определяем время игры в зависимости от количества ячеек 

                let time


                if (createInput.value > 2) {
                    time = 10 * (createInput.value * 1.5)
                } else {
                    time = 10
                }



                onload (time)
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
                let img = document.createElement('img')
                oneElem.append(img)
                img.src = 'img/back-card.png'
                img.classList.add('img-set')

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

        

        function startTimer(duration, display) {
            let timer = duration, minutes, seconds;
            startInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
        
                display.textContent = minutes + ":" + seconds;
        
                if (--timer < 0) {
                    timer = duration;
                    clearInterval(startInterval)
                    for (let item of classItems) {
                        let getClass = '.' + item
                        let getElem = document.querySelector(getClass)
                        getElem.setAttribute('disabled', 'true')
                        getElem.classList.add('fail')
                    }
                    alert('время вышло!')
                }
            }, 1000);
        }
        
        function onload (t = 30) {
            let time = t * 1,
                display = document.querySelector('#timer');
            startTimer(time, display);
            
        };

        function stopInterval () {
            clearInterval(startInterval)
        }

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
            let selectGameBox = document.querySelectorAll('.elem')
            
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
                        selectAvtive.setAttribute('disabled', 'true')
                        select.setAttribute('disabled', 'true')
                        select.classList.add('static')
                        selectAvtive.classList.add('static')
                        selectAvtive.classList.remove('active')
                        select.childNodes[0].style.opacity = '0'
                        selectAvtive.childNodes[0].style.opacity = '0'
                        

                        /// открыть карточку

                        // select.childNodes[0].classList.add('img-active')
                       
                        /// удалить из списка classItems
                        
                        classItems.splice(classItems.indexOf(selectAvtive.classList[0]), 1)
                        classItems.splice(classItems.indexOf(select.classList[0]), 1)
                        
                        dataItems = []
                        
                        
                        for (let item of selectGameBox) {
                            if (!(item.classList.contains('static'))) {
                                dataItems.push(item.classList[2])
                            }
                        }

                        let k = 0
                        for (let item of selectGameBox) {
                            if (!item.classList.contains('static')) {
                                k++
                            }
                        }
                        
                        if (k == 0 ) {
                            clearInterval(startInterval)
                            setTimeout (function() {
                                alert('Удача при вас!!! ')
                            }, 500)
                            select.childNodes[0].style.opacity = '0'
                        }

                        
                    } else { /// если не угалади 2-й елемент
                        select.setAttribute('disabled', 'true')
                        select.childNodes[0].style.opacity = '0'

                        let int = setTimeout(() => {
                            select.childNodes[0].style.opacity = '1'
                            selectAvtive.childNodes[0].style.opacity = '1'
                        }, 300)
                        selectAvtive.classList.remove('active')

                        setTimeout(() => {
                            for (let item of classItems) {
                                let clssss = '.' + item
                                let selecttt = document.querySelector(clssss)
                                selecttt.classList.remove(selecttt.classList[2])
                                selecttt.removeAttribute('disabled')
                            }
                            // shuffle(dataItems)
                            crossingClass ()
                        }, 500)
                    }
                } else {
                    select.classList.add('active')
                    select.setAttribute('disabled', 'true')
                    select.childNodes[0].style.opacity = '0'
                    
                }

            })
            
        }
    }
    elementClick ()

    
    
    


    document.addEventListener('DOMContentLoaded', () => {
        create2ClickSpace ()
    })
})();