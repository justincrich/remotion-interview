/* eslint-disable no-console */

const URL = 'https://emoji-api.com/emojis'

// NOTE: see https://emoji-api.com/#documentation
export type Emoji = {
    slug: string
    character: string
    unicodeName: string
    codePoint: string
    group: string
    subGroup: string
}

export class EmojiClient {
    API_KEY: string

    constructor(key = 'c7d3c0f6aff98f77843df04a87a97494dbe2375b') {
        this.API_KEY = key
    }

    getEmojiDirectory = async (): Promise<
        Record<string, Emoji> | null | undefined
    > => {
        const response = await fetch(`${URL}?access_key=${this.API_KEY}`)
        const arrayData = await response.json()
        const emojiDirectory: Record<string, Emoji> = {}

        arrayData.forEach((item) => {
            // TODO: perform deeper typechecking with Zod or Runtypes
            emojiDirectory[item.character] = item as Emoji
        })

        return emojiDirectory
    }
}
