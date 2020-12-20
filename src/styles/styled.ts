import { css } from 'styled-components'
import { AppTheme } from './theme'

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends AppTheme {
        // empty, see AppTheme
    }
}

export { css }
