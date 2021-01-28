import { doc } from 'prettier'

function noScroll(mode) {
    switch (mode) {
        case 'enable':
            document.querySelector('body').style.overflow = 'hidden'
            break

        case 'disable':
            document.querySelector('body').style.overflow = 'auto'
            break

        default:
            break
    }
}

export { noScroll }
