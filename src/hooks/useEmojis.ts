import { useMemo, useState } from 'react'
import emojis from '../util/emojis.json'

export type EmojiItem = {
    emoji: string
    name: string
    shortname: string
    unicode: string
    html: string
    category: string
}

type EmojiSection = {
    title: string
    data: EmojiItem[]
}

export const useEmojis = (): {
    data: EmojiSection[]
    query: string
    filter: (query: string) => void
} => {
    const [query, setQuery] = useState('')

    const catagorizedEmojis = useMemo(() => {
        const dictionary: { [key in string]: EmojiSection } = {}
        emojis.forEach((emoji) => {
            const isValid = (): boolean => {
                if (!query) return true
                const hasName = emoji.name.includes(query)
                const hasShortname = emoji.shortname.includes(query)
                return hasShortname || hasName
            }

            if (!isValid()) return

            if (!dictionary[emoji.category]) {
                dictionary[emoji.category] = {
                    title: emoji.category,
                    data: [emoji],
                }
                return
            }
            dictionary[emoji.category].data.push(emoji)
        })
        return Object.values(dictionary)
    }, [query])

    return {
        data: catagorizedEmojis,
        query,
        filter: setQuery,
    }
}
