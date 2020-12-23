import React from 'react'
import styled from 'styled-components/macro'
import ReactDOM from 'react-dom'

export const Emoji = ({
    className,
    character,
    label,
    isHidden,
}: {
    className?: string
    character: string
    label: string
    isHidden?: boolean
}): JSX.Element => {
    return (
        <Container
            className={className}
            aria-label={label}
            aria-hidden={Boolean(isHidden)}
        >
            {character}
        </Container>
    )
}

const Container = styled.span``
