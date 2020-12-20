import React from 'react'
import styled from 'styled-components/macro'
import { color } from '../styles'
import { useEmojiDirectory } from '../hooks/useEmojiDirectory'
import { Input } from '../components/Input'

export const ChatScreen = (): JSX.Element => {
    const { data } = useEmojiDirectory()
    console.log(data)
    return (
        <Container>
            <StyledInput
                action={{
                    icon: 'FaLaugh',
                    onAction: () => {},
                }}
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

const StyledInput = styled(Input).attrs({
    kind: 'textarea',
})`
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 10px;
`
