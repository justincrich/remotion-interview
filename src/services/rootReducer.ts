import { combineReducers } from '@reduxjs/toolkit'
import { reducer as emoji } from './emoji'

export const rootReducer = combineReducers({
    emoji,
})

export type RootState = ReturnType<typeof rootReducer>
