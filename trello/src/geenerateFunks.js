import { 
    addModal,
    maintitle,
    maindescription,
    userSelect,
    dataTodo,
    modalContent,
    todoCardsBlock,
    doingCardsBlock,
    doneCardsBlock,
    dataDoing,
    dataDone,
    todoTitleCounter,
    updateCounter,
    doingTitleCounter,
    doneTitleCounter,
    deleteCard
    }  from "./main";


// создание div элемента
const generateDiv = (className) => {
    const div = document.createElement("div")
    div.className = className
    return div
}


// создание input элемента
const generateInput = (className, value, type) =>{
    const input = document.createElement("input")
    input.className = className
    input.value = value
    input.type = type
    return input
}

// создание select элемента
const generateSelect = (className, userArray) => {
    const select = document.createElement("select")
    select.className = className
    userArray.forEach((user) => {
        const newOption = document.createElement("option")
        newOption.text = user
        newOption.value = user
        select.appendChild(newOption)
    })

    return select
};

// создание span элемента
const generateSpan = (className, text) =>{
    const span = document.createElement("span")
    span.className = className
    span.innerText = text
    return span
}

// создание span элемента для часов
const generateSpanForTime = (className, clock) =>{
    const span = document.createElement("span")
    span.className = className
    span.innerText = clock()
    setInterval(() => {
        span.innerText = clock()
    }, 1000)
    return span
}

// обработчик Todo карточки
const cardDivTodo = (event, dataCard) => {
    const { id, title, description, user, time} = dataCard
        const target = event.target

        if(target.className === "editBtn"){
            addModal.style.display = "block"
            maintitle.value = title
            maindescription.value = description
            userSelect.value = user
            const text = maintitle.value
            const card = target.closest(".cardDiv")
            modalContent.addEventListener("click", (e) =>{
                const target2 = e.target
                debugger
                if(target2.className === "addConfirm"){
                    if(!(text === ""))
                        card.remove()
                        deleteCard(dataTodo, target, id)
                }
            })
        }

        if(target.className === "doingBtn"){
            const todo = dataTodo.find(item => item.id === id)
            dataDoing.push(todo)
            doingCardsBlock.append(generateCardDoing(todo))
            deleteCard(dataTodo, target, id)
            updateCounter(dataTodo, todoTitleCounter)
            updateCounter(dataDoing, doingTitleCounter)
        }
        if(target.className === "deleteBtn"){
           deleteCard(dataTodo, target, id)
           updateCounter(dataTodo, todoTitleCounter)
        }   
}


// обработчик Doing карточки
const cardDivDoing = (event, dataCard) => {
    const { id, title, description, user, time} = dataCard
    const target = event.target
    if(target.className === "backBtn"){
        const todo = dataDoing.find(item => item.id === id)
        todoCardsBlock.append(generateCardTodo(todo))
        dataTodo.push(todo)
        deleteCard(dataDoing, target, id)
        updateCounter(dataTodo, todoTitleCounter)
        updateCounter(dataDoing, doingTitleCounter)
    }
    if(target.className === "compliteBtn"){
        const todo = dataDoing.find(item => item.id === id)
        doneCardsBlock.append(generateCardDone(todo))
        dataDone.push(todo)
        deleteCard(dataDoing, target, id)
        updateCounter(dataDoing, doingTitleCounter)
        updateCounter(dataDone, doneTitleCounter)
        console.log(dataDone)
    }
}


// обработчик Done карточки
const cardDivDone = (event, dataCard) => {
    const { id, title, description, user, time} = dataCard

    const target = event.target
    if(target.className === "deleteBtn"){
        deleteCard(dataDone, target, id)
        updateCounter(dataDone, doneTitleCounter)
    }
}


// карточка для Todo колонки
const generateCardTodo = (dataCard) =>{
    const { id, title, description, user, time} = dataCard
    const cardDiv = generateDiv("cardDiv todoCard")
    const btnsDiv = generateDiv("btnsDiv")
    const titleSpan = generateSpan("titleSpan", title)
    const editBtn = generateInput("editBtn", "edit", "button")
    const deleteBtn = generateInput("deleteBtn", "delete", "button")
    const doingBtn = generateInput("doingBtn", "doing", "button")
    const descSpan = generateSpan("descSpan", description)
    const userTimeDiv = generateDiv("userTimeDiv")
    const userSpan = generateSpan("userSpan", user)
    const timeSpan = generateSpan("timeSpan", time)
    cardDiv.append(btnsDiv, titleSpan, descSpan, userTimeDiv)
    btnsDiv.append(editBtn, deleteBtn, doingBtn)
    userTimeDiv.append(userSpan, timeSpan)

    
    
    cardDiv.addEventListener("click", (event) => cardDivTodo(event, dataCard))
    return cardDiv
};


// карточка для Doing колонки
const generateCardDoing = (dataCard) =>{
    const { id, title, description, user, time} = dataCard
    const cardDiv = generateDiv("cardDiv doingCard")
    const btnsDiv = generateDiv("btnsDiv")
    const titleSpan = generateSpan("titleSpan", title)
    const backBtn = generateInput("backBtn", "back", "button")
    const compliteBtn = generateInput("compliteBtn", "complite", "button")
    const descSpan = generateSpan("descSpan", description)
    const userTimeDiv = generateDiv("userTimeDiv")
    const userSpan = generateSpan("userSpan", user)
    const timeSpan = generateSpan("timeSpan", time)
    cardDiv.append(btnsDiv, titleSpan, descSpan, userTimeDiv)
    btnsDiv.append(backBtn, compliteBtn)
    userTimeDiv.append(userSpan, timeSpan)

    cardDiv.addEventListener("click", (event)=> cardDivDoing(event,dataCard))

    return cardDiv
}


// карточка для Done колонки
const generateCardDone = (dataCard) =>{
    const { id, title, description, user, time} = dataCard
    const cardDiv = generateDiv("cardDiv doneCard")
    const btnsDiv = generateDiv("btnsDiv")
    const titleSpan = generateSpan("titleSpan", title)
   
    const deleteBtn = generateInput("deleteBtn", "delete", "button")
    const descSpan = generateSpan("descSpan", description)
    const userTimeDiv = generateDiv("userTimeDiv")
    const userSpan = generateSpan("userSpan", user)
    const timeSpan = generateSpan("timeSpan", time)
    cardDiv.append(btnsDiv, titleSpan, descSpan, userTimeDiv)
    btnsDiv.append(deleteBtn)
    userTimeDiv.append(userSpan, timeSpan)

    cardDiv.addEventListener("click", (event)=> cardDivDone(event, dataCard))

    return cardDiv
}




export{
    generateDiv,
    generateInput, 
    generateSpan,
    generateSpanForTime, 
    generateCardTodo,
    generateCardDoing,
    generateCardDone,
    generateSelect
}