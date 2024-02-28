    import { generateCardTodo, generateCardDoing, generateCardDone, generateDiv, generateInput, generateSpan, generateSelect } from "./geenerateFunks";
    import { header, trelloLabelDiv, trelloLabelSpan, watchDiv, watchSpan } from "./header";

// инициализация и объявление нужных переменных
    const storageKey = "storageKey"
    let dataTodo = []
    let dataDoing = []
    let dataDone = []
    const users = ["User 1", "User 2", "User 3", "User 4", "User 5"]


// основной контейнер и header
    const wrapper = generateDiv("wrapper")
    root.append(wrapper)
    wrapper.append(header)
    header.append(trelloLabelDiv, watchDiv)
    watchDiv.append(watchSpan)
    trelloLabelDiv.append(trelloLabelSpan)

    const mainDiv = generateDiv("wrapper__main main")
    wrapper.append(mainDiv)
    const todoDiv = generateDiv("main__todo todo")
    const doingDiv = generateDiv("main__doing doing")
    const doneDiv = generateDiv("main__done done")
    mainDiv.append(todoDiv, doingDiv, doneDiv)

    const todoTitle = generateDiv("todo__title title")
    const doingTitle = generateDiv("doing__title title")
    const doneTitle = generateDiv("done__title title")
    todoDiv.append(todoTitle)
    doingDiv.append(doingTitle)
    doneDiv.append(doneTitle)

    const todoTitleSpan = generateSpan("title__span", "todo")
    const doingTitleSpan = generateSpan("title__span", "doing")
    const doneTitleSpan = generateSpan("title__span", "done")
    todoTitle.append(todoTitleSpan)
    doingTitle.append(doingTitleSpan)
    doneTitle.append(doneTitleSpan)

    const todoTitleCounter = generateSpan("title__counter todoCouner", "0")
    const doingTitleCounter = generateSpan("title__counter doingCouner", "0")
    const doneTitleCounter = generateSpan("title__counter doneCouner", "0")
    todoTitle.append(todoTitleCounter)
    doingTitle.append(doingTitleCounter)
    doneTitle.append(doneTitleCounter)

    const deleteAll = generateInput("deleteAll", "Delete All", "button")
    doneDiv.append(deleteAll)

    const addTodo = generateInput("addBtn", "Add ToDo", "button")
    todoDiv.append(addTodo)

    const dataFromServer = generateInput("dataFromServer", "Load ToDos", "button")
    doingDiv.append(dataFromServer)



     const addModal = generateDiv("add-modal")
     const modalContent = generateDiv("modal-content")
     const closeModal = generateSpan("close-modal", "X")
    root.append(addModal)
    addModal.append(modalContent)
    addModal.append(closeModal)

     const title = generateInput("addTitle", '', "input")

     const description = generateInput("addDescription", '', "input")

    const addBtnsDiv = generateDiv("addBtnsDiv")
    const selecttext = generateSpan("selecttext", "Select user")
    const userSelect = generateSelect("userSelect", users)
    const addCancel = generateInput("addCancel", "Cancel", "button")
    const addConfirm = generateInput("addConfirm", "Confirm", "button")
    const warmingConfirm = generateSpan("warmingConfirm", "Fields cant be empty")
    modalContent.append(title, description,warmingConfirm, selecttext, addBtnsDiv)
    addBtnsDiv.append(userSelect, addCancel, addConfirm)

    const todoCardsBlock = generateDiv("todoCardsBlock")
    todoDiv.append(todoCardsBlock)
    const doingCardsBlock = generateDiv("doingCardsBlock")
    doingDiv.append(doingCardsBlock)
    const doneCardsBlock = generateDiv("doneCardsBlock")
    doneDiv.append(doneCardsBlock)

    warmingString = "Warming!\nTo match ToDos\n"
    const warmingAddWindow = generateDiv("warmingAddWindow")
    const warmingAddTitle = generateSpan("warmingAddTitle", warmingString)
    const warmingAddOkeyBtn = generateInput("warmingAddOkeyBtn", "Okey", "button")
  
    root.append(warmingAddWindow)
    warmingAddWindow.append(warmingAddTitle, warmingAddOkeyBtn)

    const warmingNothingToDeleteWindow = generateDiv("warmingNothingToDeleteWindow")
    const warmingNTDTitle = generateSpan("warmingNTDTitle", "Warming!\nNothing to delete\n")
    const warmingNTDBtn = generateInput("warmingNTDBtn", "OK", "button")
    root.append(warmingNothingToDeleteWindow)
    warmingNothingToDeleteWindow.append(warmingNTDTitle, warmingNTDBtn)

  const modalClear = () =>{
        title.value = ''
        description.value = ''
        userSelect.value = ''
    }

    const closeAddWindow = () => addModal.style.display = "none"
    
    // удаление карточки
const deleteCard = (array, target, id) =>{
    const card = target.closest(".cardDiv")
    array.splice(array.findIndex(item => item.id === id) , 1)
    card.remove()
}


    const createTodo = () =>{
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // Получаем часы и дополняем нулем слева, если нужно
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Получаем минуты и дополняем нулем слева, если нужно
        const currentTime = `${hours}:${minutes}`; // Собираем строку в формате "часы:минуты"
        const todo = {
            id: Date.now(),
            title: title.value,
            description: description.value,
            user: userSelect.value,
            time: currentTime
        }
        return todo
    }

    const setDataToStorage = () => {
        if (storageKey === "storageKey") {
            const dataToSave = {
                dataTodo: dataTodo,
                dataDoing: dataDoing,
                dataDone: dataDone
            };
    
            localStorage.setItem(storageKey, JSON.stringify(dataToSave));
        }
    };



    const getDataFromStorage = () =>{
        const stringData = localStorage.getItem(storageKey)
        const dataCards = JSON.parse(stringData) 
        console.log(dataCards)
        dataTodo = [...dataCards.dataTodo]
        dataDoing = [...dataCards.dataDoing]
        dataDone = [...dataCards.dataDone]
        dataTodo.forEach(card =>{
            todoCardsBlock.append(generateCardTodo(card))
        })
        dataDoing.forEach(card =>{
            doingCardsBlock.append(generateCardDoing(card))
        })
        dataDone.forEach(card =>{
            doneCardsBlock.append(generateCardDone(card))
        })
        updateCounter(dataTodo, todoTitleCounter)
        updateCounter(dataDoing, doingTitleCounter)
        updateCounter(dataDone, doneTitleCounter)
        
    } 

  
    warmingAddWindow.addEventListener("click", (event) =>{
        const target = event.target
        if(target.className === "warmingAddOkeyBtn"){
            warmingAddWindow.style.display = "none"
        }
    })
    addTodo.addEventListener("click", () => {
        if((dataDoing.length + dataTodo.length) >= 10){
            warmingAddTitle.innerText = warmingString
            warmingAddWindow.style.display = "block"
        }
        else{
            modalClear()
            addModal.style.display = "block"
        }
        
    })

    
    warmingNTDBtn.addEventListener("click", () => warmingNothingToDeleteWindow.style.display = "none")

    const dataLoad = (src) =>{
        fetch(src)
        .then(response => response.json())
        .then(
            data => {
                for(let i = 0; i < data.length; i++){
                    if(dataTodo.length + dataDoing.length < 10){
                        todoCardsBlock.append(generateCardTodo(data[i]))
                        dataTodo.push(data[i])
                        updateCounter(dataTodo, todoTitleCounter)
                    }
                    else{
                        warmingAddWindow.style.display = "block"
                        if(i != 0){
                            warmingAddTitle.innerText = warmingString + `\nOnly ${i} cards loaded successfully\n`
                        }
                        else{
                            warmingAddTitle.innerText = warmingString
                        }
                        break
                    }
                }
                
            }
            )
            
        }
        
    dataFromServer.addEventListener("click", () => dataLoad("https://65ca55c43b05d29307e02a1f.mockapi.io/todo")) 

    addModal.addEventListener("click", (event) =>{
        
        const target = event.target
       
        if(target.className === "close-modal" || target.className === "addCancel"){
            modalClear()
            closeAddWindow()
        }
        if(target.className === "addConfirm"){
            if((title.value == "" || description.value == "" || userSelect.selectedIndex == -1)){
                warmingConfirm.style.display = "block"
            }
            else{
                 const todo = createTodo()
                todoCardsBlock.append(generateCardTodo(todo))
                dataTodo.push(todo)
                console.log(dataTodo)
                closeAddWindow()
                modalClear()
                updateCounter(dataTodo, todoTitleCounter)
                warmingConfirm.style.display = "none"
            }
           
        }
        
    })

    
    

const warmingWindow = generateDiv("warmingWindow")
const warmingTitle = generateSpan("warmingTitle", "Warming!")
const warmingBtnBox = generateDiv("warmingBtnBox")
const warmingCancelBtn = generateInput("warmingCancelBtn", "Cancel", "button")
const warmingDeleteBtn = generateInput("warmingDeleteBtn", "Delete", "button")
root.append(warmingWindow)
warmingWindow.append(warmingTitle, warmingBtnBox)
warmingBtnBox.append(warmingCancelBtn, warmingDeleteBtn)

    deleteAll.addEventListener("click", () =>{
        if(dataDone.length == 0){
            warmingNothingToDeleteWindow.style.display = "block"
        }
        else{
            warmingWindow.style.display = "block"
            warmingWindow.addEventListener("click", (event) =>{
                const target = event.target
                if(target.className === "warmingCancelBtn"){
                    warmingWindow.style.display = "none"
                }
                if(target.className === "warmingDeleteBtn"){
                    dataDone.length = 0
                    const cards =  doneCardsBlock.querySelectorAll(".cardDiv")
                    cards.forEach(card => card.remove())
                    warmingWindow.style.display = "none"
                    updateCounter(dataDone, doneTitleCounter)
                }
                
            })
        }
    })



const updateCounter = (array, Couner) =>{
    Couner.innerText = array.length
}

window.addEventListener("unload", () => setDataToStorage())
window.addEventListener("DOMContentLoaded", getDataFromStorage)

    export{
        addModal, 
        title as maintitle,
        description as maindescription,
        userSelect,
        modalClear,
        modalContent,
        createTodo,
        todoCardsBlock,
        closeAddWindow,
        doingDiv,
        doingCardsBlock,
        doneCardsBlock,
        dataTodo,
        dataDoing,
        dataDone,
        todoTitleCounter,
        doingTitleCounter,
        doneTitleCounter,
        updateCounter,
        users,
        deleteCard
    }


