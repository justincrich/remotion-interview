import { useQuery } from 'react-query'
import { useEmojiClient } from './useEmojiClient'
import { Emoji } from '../clients/EmojiClient'

export const useEmojiDirectory = (): {
    data: Record<string, Emoji> | null | undefined
    isLoading: boolean
    error: Error | null
} => {
    const client = useEmojiClient()

    const { data, status, error } = useQuery('emojis', client.getEmojiDirectory)

    return {
        error,
        isLoading: status === 'loading',
        data,
    }
}
