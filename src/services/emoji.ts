import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EmojiItem } from '../hooks/useEmojis'

export interface EmojiState {
    selectedEmojis: EmojiItem[]
}

const REDUCER_NAME = 'emoji'

const initialState: EmojiState = {
    selectedEmojis: [],
}

const emojiSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        recordSelectedEmoji(draft, action: PayloadAction<EmojiItem>) {
            draft.selectedEmojis.push(action.payload)
        },
    },
})

export const { recordSelectedEmoji } = emojiSlice.actions

interface AppState {
    emoji: EmojiState
}

export const selectEmojiSelectionRecord = (state: AppState): EmojiItem[] =>
    state.emoji.selectedEmojis

export const { reducer } = emojiSlice
