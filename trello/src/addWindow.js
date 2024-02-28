import { generateDiv, generateInput } from "./geenerateFunks"

export const addWindow = (div) =>{
    const title = generateDiv("addTitle")
    const description = generateDiv("addDescription")
    const addBtnsDiv = generateDiv("addBtnsDiv")
    const userSelect = generateInput("userSelect", "select", "button")
    const addCancel = generateInput("addCancel", "Cancel", "button")
    const addConfirm = generateInput("addConfirm", "Confirm", "button")
    div.append(title, description, addBtnsDiv)
    addBtnsDiv.append(userSelect, addCancel, addConfirm)
    return div
}