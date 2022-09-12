////////////////////Variables//////////////////////////////////////
const $=document
const enterTodoInput=_id('enterTodo')
const submitTodoBtn=_id('submitTodo')
const noStatusColumn=_q('.no-status')
const todoColumns=_qAll('.todoColumn')
let newTodo;
let newTodoValue;
let dataAppendTarget;
let targetTag;
let i=0
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
////////////////////////// add todo ////////////////////////////////////////////
submitTodoBtn.addEventListener('click',addTodoHandler)
enterTodoInput.addEventListener('keydown',enterAddTodoHandler)
function enterAddTodoHandler(event) {
    if(event.key==='Enter' &&  isNaN(event.target.value)){
        addTodoHandler()
    }
}
function addTodoHandler () {
    if(isNaN(enterTodoInput.value)){
        newTodoValue=enterTodoInput.value
        let newDivTag=$.createElement('div')
        let newIconTag=$.createElement('i')
        newDivTag.className='newTodo d-flex justify-content-between align-items-center p-2 bg-white mt-1 rounded-3'
        newDivTag.setAttribute('draggable','true')
        newDivTag.setAttribute('ondragstart','dragHandler(event)')
        newDivTag.setAttribute('data-append',i)
        newIconTag.className='bi bi-x'
        newIconTag.setAttribute('onclick','closeBtnHandler(event)')
        newDivTag.innerHTML=newTodoValue
        newDivTag.append(newIconTag)
        noStatusColumn.append(newDivTag)
        enterTodoInput.value=''
        i++
    }
}
////////////////////////////// close Icon //////////////////////////////
function closeBtnHandler(event) {
    event.target.parentElement.remove()
}
///////////////////////////////  drag fire //////////////////////////////
function dragHandler(event) {
    let dataAppend=event.target.dataset.append
    event.dataTransfer.setData('data-append',dataAppend)
}
/////////////////////////////// drag over cancel //////////////////
todoColumns.forEach(function (item) {
    item.addEventListener('dragover',function (event) {
        event.preventDefault()
    })
})
//////////////////////////////////// drop fire /////////////////////////
todoColumns.forEach(function (item) {
    item.addEventListener('drop',function (event) {
        dataAppendTarget=event.dataTransfer.getData('data-append')
        newTodo=document.querySelectorAll('.newTodo')
        newTodo.forEach(function (todo) {
            if(todo.dataset.append===dataAppendTarget){
                event.target.append(todo)
            }
        })

    })
})