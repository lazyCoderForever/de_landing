import '../scss/styles.scss'
import { Form } from './Form'
//
const popupForm = new Form({
    urlRequest: 'https://jsonplaceholder.typicode.com/posts',
    formId: '#popup-form-1',
    formType: 'popup',
    btnId: '1',
})
const popupForm_2 = new Form({
    urlRequest: 'https://jsonplaceholder.typicode.com/posts',
    formId: '#popup-form-2',
    formType: 'default',
})
const popupForm_3 = new Form({
    urlRequest: 'https://jsonplaceholder.typicode.com/posts',
    formId: '#popup-form-3',
    formType: 'popup',
    btnId: '3',
})

document.addEventListener('DOMContentLoaded', () => {
    popupForm.addHandlers()
    popupForm_2.addHandlers()
    popupForm_3.addHandlers()
})
