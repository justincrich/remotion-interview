import { EmojiClient } from '../clients/EmojiClient'

let client: EmojiClient | null = null

export const useEmojiClient = (): EmojiClient => {
    if (!client) client = new EmojiClient()
    return client
}
