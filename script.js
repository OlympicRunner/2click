(() => {

    let classItems = [] /// тут храним список классов существующих элементов сетки 
    
    let dataItems = [] /// тут мы будем хранить значения для элементов
   

    function create2ClickSpace () {
        let container = document.querySelector('.container')
        let create2ClickTitle = document.createElement('h1')
        let createGameBox = document.createElement('div')
        let createInput = document.createElement('input')
        let button = document.createElement('button')
        

        create2ClickTitle.innerHTML = 'Text'
        createGameBox.classList.add('game-box')
        createInput.value = '4'
        createInput.type = 'number'
        createInput.min = '2'
        createInput.max = '10'
        createGameBox.maxLength = '2'
        createInput.maxLength = '2'
        createInput.classList.add('input')
        button.textContent = 'Start'
        button.classList.add('btn')
        button.classList.add('btn-start')


        container.append(create2ClickTitle)
        container.append(createInput)
        container.append(button)
        container.append(createGameBox)
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
                let oneElem = document.createElement('div')
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
                let iObj = [newClass]
                dataItems.push(iObj)   
            } 
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
                        /// удалить из списка classItems
                        
                        classItems.splice(classItems.indexOf(selectAvtive.classList[0]), 1)
                        classItems.splice(classItems.indexOf(select.classList[0]), 1)
                        
                        dataItems.splice(dataItems.indexOf(select.classList[2]), 1)
                        dataItems.splice(classItems.indexOf(select.classList[2]), 1)
                        

                        
                    } else { /// если не угалади 2-й елемент
                        selectAvtive.classList.remove('active')
                        
                        for (let item of classItems) {
                            let clssss = '.' + item
                            let selecttt = document.querySelector(clssss)
                            selecttt.classList.remove(selecttt.classList[2])
                            
                        }
                        shuffle(dataItems)
                        crossingClass ()
                    }
                } else {
                    select.classList.add('active')
                }
            })
            
        }
    }
    elementClick ()

    
    
    


    document.addEventListener('DOMContentLoaded', () => {
        create2ClickSpace ()
    })
})();