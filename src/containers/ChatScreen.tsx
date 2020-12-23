import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { color } from '../styles'
import { useEmojis } from '../hooks/useEmojis'
import { Input } from '../components/Input'
import { EmojiPicker as UnstyledEmojiPicker } from '../components/EmojiPicker'
import { SPACING_PX } from '../styles/mixins/constants'

export const ChatScreen = (): JSX.Element => {
    const [message, setMessage] = useState('')
    const [pickerOpen, setPickerOpen] = useState(false)
    return (
        <Container>
            <Footer>
                <InputContainer>
                    <EmojiPicker
                        isOpen={pickerOpen}
                        onSelect={(emoji) => {
                            setPickerOpen(false)
                            setMessage(`${message} ${emoji}`)
                        }}
                        onClose={() => setPickerOpen(false)}
                    />
                    <StyledInput
                        placeholder="Press enter to send message..."
                        value={message}
                        onChange={setMessage}
                        action={{
                            icon: 'FaLaugh',
                            onAction: () => {
                                setPickerOpen(true)
                            },
                        }}
                    />
                </InputContainer>
            </Footer>
        </Container>
    )
}

const Container = styled.div`
    background-color: ${color.background.app};
    display: flex;
    flex: 1 1 auto;
    position: relative;
`

const EmojiPicker = styled(UnstyledEmojiPicker)`
    position: absolute;
    right: 0;
    transform: translateY(calc(-100% - ${SPACING_PX[1]}));
    display: ${(p: { isOpen: boolean }) => (p.isOpen ? 'default' : 'none')};
`

const Footer = styled.div`
    width: 100%;
    max-width: 400px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
`

const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
`

const StyledInput = styled(Input).attrs({
    kind: 'textarea',
})``
