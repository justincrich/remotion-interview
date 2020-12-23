import React from 'react'
import styled from 'styled-components/macro'
import { SPACING_PX } from '../styles/mixins/constants'

type Props = {
    size: number | 'fill'
    vertical?: boolean
}
export const Spacer = (props: Props): JSX.Element => {
    const { size: sizeIdx, vertical } = props
    const size = sizeIdx === 'fill' ? '0px' : SPACING_PX[sizeIdx]
    return (
        <Container
            isVertical={Boolean(vertical)}
            size={size}
            fillContainer={sizeIdx === 'fill'}
        />
    )
}

const Container = styled.div<{
    isVertical: boolean
    size: string
    fillContainer: boolean
}>`
    width: ${(p) => (p.isVertical ? p.size : 0)};
    height: ${(p) => (p.isVertical ? 0 : p.size)};
    ${(p) =>
        p.fillContainer
            ? `
      width: 0px;
      height: 0px;
      margin-${p.isVertical ? 'left' : 'bottom'}: auto;
    `
            : ''}
`
