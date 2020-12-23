import React, { useEffect, useRef } from 'react'
import { VariableSizeList } from 'react-window'
import styled from 'styled-components/macro'
import { color } from '../styles'
import { Spacer } from './Spacer'
import { Input } from './Input'
import { SPACING_PX } from '../styles/mixins/constants'
import { useEmojis, EmojiItem } from '../hooks/useEmojis'
import { Emoji } from './Emoji'
import { text } from '../styles/mixins/text'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

const WINDOW_WIDTH = 250
const EMOJI_SIZE = 25

const Section = ({
    title,
    data,
    onSelect,
}: {
    data: EmojiItem[]
    title: string
    onSelect: (emojiCode: string) => void
}): JSX.Element => {
    return (
        <EmojiSection>
            <EmojiSectionLabel>{title}</EmojiSectionLabel>
            <Line />
            <EmojiSectionBody>
                {data.map(({ name, emoji }) => {
                    return (
                        <EmojiContainer
                            key={emoji}
                            onClick={() => onSelect(emoji)}
                        >
                            <Emoji character={emoji} label={name} />
                        </EmojiContainer>
                    )
                })}
            </EmojiSectionBody>
        </EmojiSection>
    )
}

export const EmojiPicker = ({
    className,
    onSelect,
    onClose,
}: {
    className?: string
    onSelect: (emojiCode: string) => void
    onClose: () => void
}): JSX.Element => {
    const { data, filter, query } = useEmojis()
    const listRef = useRef<VariableSizeList | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(containerRef, () => {
        filter('')
        onClose()
    })
    useEffect(() => {
        listRef.current?.resetAfterIndex(0, true)
    }, [data])

    const handleSelect = (emojiCode: string): void => {
        filter('')
        onSelect(emojiCode)
        onClose()
    }

    return (
        <Container ref={containerRef} className={className}>
            <>
                <Spacer size={1} />
                <Header>
                    <Input
                        placeholder="Find emoji"
                        value={query}
                        onChange={filter}
                    />
                </Header>
                <Spacer size={1} />
                <Line />
                <Spacer size={1} />
                <Body>
                    <VariableSizeList
                        itemCount={data.length}
                        height={265}
                        width={WINDOW_WIDTH}
                        ref={(ref) => {
                            listRef.current = ref
                        }}
                        itemSize={(index) => {
                            const row = data[index]
                            const emojiRows = Math.ceil(row.data.length / 10)
                            const size = emojiRows * EMOJI_SIZE
                            const TITLE_MARGIN = 20
                            return size + TITLE_MARGIN
                        }}
                    >
                        {({ style, index }) => (
                            <div style={style} key={data[index].title}>
                                <Section
                                    data={data[index].data}
                                    title={data[index].title}
                                    onSelect={handleSelect}
                                />
                            </div>
                        )}
                    </VariableSizeList>
                </Body>
                <Spacer size={1} />
            </>
        </Container>
    )
}

const Container = styled.div`
    background-color: ${color.background.content};
    border: 1px solid ${color.border.primary};
    border-radius: 10px;
`

const Line = styled.div`
    display: flex;
    height: 1px;
    flex: 1 1 auto;
    background-color: ${color.border.primary};
`

const Header = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    padding: 0 ${SPACING_PX[1]};
`

const Body = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    flex: 1 1 auto;
    height: 200px;
    overflow-y: auto;
    padding: 0 ${SPACING_PX[1]};
`

const EmojiSection = styled.div``

const EmojiSectionLabel = styled.span`
    ${text('label')}
`

const EmojiSectionBody = styled.div`
    display: flex;
    flex-flow: row wrap;
`

const EmojiContainer = styled.div`
    width: ${EMOJI_SIZE}px;
    height: ${EMOJI_SIZE}px;
    align-items: center;
    justify-content: center;
    display: flex;
    text-align: center;
    cursor: pointer;
    user-select: none;
    &:active {
        opacity: 0.5;
    }
`
