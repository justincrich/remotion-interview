import React from 'react'
import styled from 'styled-components/macro'
import { SPACING_PX } from '../styles/mixins/constants'

type Props = {
    size: number | 'fill'
    vertical?: boolean
}
export const Spacer = (props: Props): JSX.Element => {
    const { size: sizeIdx, vertical } = props
    const size = SPACING_PX[sizeIdx === 'fill' ? 0 : sizeIdx] || 0
    return (
        <Container
            isVertical={Boolean(vertical)}
            size={size}
            fill={sizeIdx === 'fill'}
        />
    )
}

const Container = styled.div<{
    isVertical: boolean
    size: number
    fill: boolean
}>`
    width: ${(p) => (p.isVertical ? p.size : 0)};
    height: ${(p) => (p.isVertical ? 0 : p.size)};
    ${(p) =>
        p.fill
            ? `
      width: 0px;
      height: 0px;
      margin-${p.isVertical ? 'left' : 'bottom'}: auto;
    `
            : ''}
`
