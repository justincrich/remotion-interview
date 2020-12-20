import React from 'react'
import styled from 'styled-components/macro'
import { color } from '../styles'
import { useEmojiDirectory } from '../hooks/useEmojiDirectory'

export const ChatScreen = (): JSX.Element => {
    const { data } = useEmojiDirectory()
    console.log(data)
    return (
        <Container>
            <h1>hi</h1>
        </Container>
    )
}

const Container = styled.div`
    background-color: ${color.background.app};
    display: flex;
    flex: 1 1 auto;
    position: relative;
`
