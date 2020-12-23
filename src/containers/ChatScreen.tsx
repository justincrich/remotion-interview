import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isEqual } from 'lodash'
import pluralize from 'pluralize'
import { color } from '../styles'
import { Input } from '../components/Input'
import { EmojiPicker as UnstyledEmojiPicker } from '../components/EmojiPicker'
import { SPACING_PX } from '../styles/mixins/constants'
import { useReduxDispatch } from '../services'
import { EmojiItem } from '../hooks/useEmojis'
import {
    recordSelectedEmoji,
    selectEmojiSelectionRecord,
} from '../services/emoji'

export const ChatScreen = (): JSX.Element => {
    const [message, setMessage] = useState('')
    const [pickerOpen, setPickerOpen] = useState(false)
    const dispatch = useReduxDispatch()
    const selectedEmojis = useSelector(selectEmojiSelectionRecord, isEqual)

    useEffect(() => {
        const displayEmojiLength = (): void => {
            if (selectedEmojis.length <= 0) return
            toast(
                `${selectedEmojis.length} ${pluralize(
                    'emoji',
                    selectedEmojis.length
                )} selected by picker`
            )
        }
        displayEmojiLength()
    }, [selectedEmojis])

    const handleSelection = (emoji: EmojiItem): void => {
        setPickerOpen(false)
        dispatch(recordSelectedEmoji(emoji))
        setMessage(`${message} ${emoji.emoji}`)
    }

    return (
        <Container>
            <Footer>
                <InputContainer>
                    <EmojiPicker
                        isOpen={pickerOpen}
                        onSelect={handleSelection}
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
