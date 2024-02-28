import { generateDiv, generateSpanForTime, generateSpan } from "./geenerateFunks.js";
import { clock } from "./clock.js";

const header = generateDiv("wrapper__header header")
const trelloLabelDiv = generateDiv("header__label label")
const trelloLabelSpan = generateSpan("label__span", "Trello")
const watchDiv = generateDiv("header__watch")
const watchSpan = generateSpanForTime("watch__span", clock)

export {
    header,
    trelloLabelDiv,
    trelloLabelSpan,
    watchDiv, 
    watchSpan
}