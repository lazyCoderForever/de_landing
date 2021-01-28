import { ERRORS } from './errorsKeys'
import { httpRequest } from './httpRequest'
import { noScroll } from './noScroll'
const { request } = httpRequest()

function Form({ urlRequest, formType, formId, btnId }) {
    this.fields = {}
    this.errors = []
    this.formType = formType //default, popup
    this.formId = formId
    this.urlRequest = urlRequest
    this.buttonIdToOpenForm = btnId || null
}

Form.prototype.handlerFields = function ({ target }) {
    const field = target
    const fieldName = field.name
    const fieldValue = field.value
    this.fields[fieldName] = fieldValue
}
Form.prototype.handlerValidateFields = function () {
    for (const fieldName in this.fields) {
        if (this.fields[fieldName]) {
            if (this.fields[fieldName] === '') {
                this.handlerErrorLog({
                    inputErrorName: fieldName,
                    inputErrorType: 'empty',
                })
            }
            switch (fieldName) {
                case 'user_name':
                    if (/\d|\(|\)/.test(this.fields[fieldName])) {
                        this.handlerErrorLog({
                            inputErrorName: fieldName,
                            inputErrorType: 'only_letters',
                        })
                        break
                    } else {
                        this.handlerClearErrorLog({
                            inputErrorName: fieldName,
                        })
                        break
                    }
                case 'email':
                    if (!/\S+@\S+\.\S+/.test(this.fields[fieldName])) {
                        this.handlerErrorLog({
                            inputErrorName: fieldName,
                            inputErrorType: 'invalid_email',
                        })
                        break
                    } else {
                        this.handlerClearErrorLog({
                            inputErrorName: fieldName,
                        })
                        break
                    }
                default:
                    break
            }
        } else {
            this.handlerErrorLog({
                inputErrorName: fieldName,
                inputErrorType: 'empty',
            })
        }
    }
}

Form.prototype.displayValidationErrors = function () {
    this.errors.forEach(({ error, fieldName }) => {
        let formIssueContainer = document.querySelector(
            `${this.formId} .contact-form__group-field .contact-form__input[name=${fieldName}] + .contact-form__validation-issue`
        )
        formIssueContainer.innerText = ERRORS[error]
        formIssueContainer.classList.toggle(
            'contact-form__validation-issue_hide'
        )
        setTimeout(() => {
            formIssueContainer.classList.toggle(
                'contact-form__validation-issue_hide'
            )
        }, 3000)
    })
}

Form.prototype.handlerErrorLog = function ({ inputErrorName, inputErrorType }) {
    const errorLog = {
        fieldName: inputErrorName,
        error: inputErrorType,
    }

    const checkError = this.errors.findIndex(({ fieldName }) => {
        return fieldName === inputErrorName
    })

    if (checkError >= 0) {
        this.errors[checkError] = errorLog
    } else {
        this.errors.push(errorLog)
    }
}
Form.prototype.handlerClearErrorLog = function ({ inputErrorName }) {
    const checkError = this.errors.findIndex(({ fieldName }) => {
        return fieldName === inputErrorName
    })

    if (checkError >= 0 && this.errors.length > 0) {
        this.errors = this.errors.filter((el, index) => {
            return index !== checkError
        })
    }
}
Form.prototype.handlerSubmit = async function (el) {
    let reqError = ''
    el.preventDefault()
    this.handlerValidateFields()

    if (this.errors.length === 0 && Object.keys(this.fields).length !== 0) {
        try {
            const sendingData = this.fields
            const reqData = await request(this.urlRequest, 'POST', {
                sendingData,
            })
            this.displayResultMessage('success')
        } catch (err) {
            reqError = err.message
            this.displayResultMessage('error', reqError)
        }
    } else {
        this.displayValidationErrors()
    }
}
Form.prototype.handlerOpenForm = function () {
    let form = null
    if (this.formType === 'popup') {
        form = document.querySelector('.wrapper-popup-form')
        form.classList.contains('wrapper-popup-form_hide')
            ? form.classList.remove('wrapper-popup-form_hide')
            : false
        noScroll('enable')
    } else {
        form = document.querySelector('.contact-form')
        form.classList.toggle('contact-form_hide')
    }
}
Form.prototype.handlerCloseForm = function ({ target }) {
    !target.parentNode.classList.contains('wrapper-popup-form_hide')
        ? target.parentNode.classList.add('wrapper-popup-form_hide')
        : false
    noScroll('disable')
}

Form.prototype.displayResultMessage = function (mode, err = '') {
    let messageContainer = null

    if (this.formType === 'popup') {
        messageContainer = document.querySelector(
            '.wrapper-popup-form .form-result-message'
        )
    } else {
        messageContainer = document.querySelector('.form-result-message')
    }
    if (mode === 'success') {
        messageContainer.classList.toggle('form-result-message_hide')
        setTimeout(() => {
            messageContainer.classList.toggle('form-result-message_hide')
        }, 3000)
    } else {
        messageContainer.innerText = `${err} try again`
        messageContainer.classList.toggle('form-result-message_hide')
        setTimeout(() => {
            messageContainer.classList.toggle('form-result-message_hide')
        }, 3000)
    }
}

Form.prototype.addHandlers = function () {
    if (document.querySelector(`${this.formId}`)) {
        document
            .querySelectorAll(`${this.formId} .contact-form__input`)
            .forEach((field) => {
                field.addEventListener('input', (e) => this.handlerFields(e))
            })
        document
            .querySelector(`${this.formId} button[data-submit="true"]`)
            .addEventListener('click', (e) => this.handlerSubmit(e))

        if (this.formType === 'popup') {
            document
                .querySelector(
                    `.btn[data-openForm="${this.buttonIdToOpenForm}"]`
                )
                .addEventListener('click', this.handlerOpenForm.bind(this))
            document
                .querySelector('.wrapper-popup-form .wrapper-popup-form__close')
                .addEventListener('click', (e) => this.handlerCloseForm(e))
        }
    }
}

export { Form }
