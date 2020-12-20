import { SPACING_PX } from './constants'
import { text } from './text'
import { device } from './device'
import { button } from './button'

export const mixins = {
    device,
    spacing: SPACING_PX,
    text,
    button,
}
