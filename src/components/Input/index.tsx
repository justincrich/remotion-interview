import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Label } from '../Label'
import { mixins } from '../../styles/mixins'
import { color } from '../../styles/color'
import { isKeyPressEnter } from '../../util/isKeyPressEnter'
import { Icon, IconName } from '../Icon/index'
import { Spacer } from '../Spacer'
import { SPACING_PX } from '../../styles/mixins/constants'

interface InputProps {
    error?: string
    disabled?: boolean
    className?: string
    value?: string
    label?: string
    placeholder?: string
    onChange?: (value: string) => void
    onBlur?: () => void
    hasError?: boolean
    name?: string
    type?: string
    onEnterPress?: () => void
    isTextArea?: boolean
    kind?: 'textinput' | 'textarea'
    action?: {
        icon: IconName
        onAction: () => void
    }
}

export const Input = React.forwardRef(
    (
        props: InputProps,
        ref: React.Ref<HTMLInputElement> | React.Ref<HTMLTextAreaElement>
    ): JSX.Element => {
        const {
            value,
            onChange,
            className,
            label,
            disabled,
            error,
            placeholder,
            name,
            hasError,
            onEnterPress,
            type,
            kind = 'textinput',
            onBlur,
            action,
        } = props

        const [isFocused, setFocused] = useState(false)

        const handleKeyUp = (
            e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
        ): void => {
            if (!isKeyPressEnter(e)) return
            if (!onEnterPress) return
            onEnterPress()
        }

        const inputProps = {
            name,
            hasError: Boolean(error || hasError),
            disabled,
            value,
            placeholder,
            onKeyUp: handleKeyUp,
            type,
            onFocus: () => {
                setFocused(true)
            },
            onBlur: () => {
                setFocused(false)
                onBlur?.()
            },
            onChange: (e) => {
                if (!onChange) return null
                onChange(e.target.value)
                return null
            },
        }

        const taRef = ref as React.Ref<HTMLTextAreaElement>
        const inputRef = ref as React.Ref<HTMLInputElement>
        return (
            <Container className={className}>
                {label && (
                    <>
                        <StyledLabel hasError={Boolean(error)}>
                            {label}
                        </StyledLabel>
                        <Spacer size={1} />
                    </>
                )}
                <FieldContainer
                    focused={isFocused}
                    hasError={Boolean(error)}
                    disabled={Boolean(disabled)}
                >
                    {kind === 'textarea' ? (
                        <TextAreaField {...inputProps} ref={taRef} />
                    ) : (
                        <TextInputField {...inputProps} ref={inputRef} />
                    )}
                    {action && (
                        <>
                            <Icon
                                iconName={action.icon}
                                onClick={action.onAction}
                                color="activity"
                            />
                            <Spacer size={1} vertical />
                        </>
                    )}
                </FieldContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Container>
        )
    }
)

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
`

const StyledLabel = styled(Label)``

const FieldContainer = styled.div<{
    disabled?: boolean
    focused?: boolean
    hasError?: boolean
}>`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: ${SPACING_PX[0]} ${SPACING_PX[1]};
    background-color: ${color.background.content};
    border: ${(p) => (p.disabled ? 0 : 1)}px solid
        ${(p) => (p.hasError ? color.status.error : color.border.primary)};
    border-radius: 10px;
    ${(p) =>
        !p.disabled &&
        p.focused &&
        css`
            border-color: ${color.brand.primary};
        `}
`

type Input = { hasError?: boolean; disabled?: boolean }

const INPUT_STYLE = css<Input>`
    ${mixins.text('paragraph', 'primary')}
    width: 100%;
    outline: none;
    &::placeholder {
        opacity: 0.7;
    }
    border-radius: 10px;
    border-color: transparent;
`

export const TextInputField = styled.input<Input>`
    ${INPUT_STYLE}
`

export const TextAreaField = styled.textarea<Input>`
    ${INPUT_STYLE}
    resize: none;
`

export const ErrorMessage = styled.div`
    margin-top: ${mixins.spacing[0]};
    ${mixins.text('sub')}
    color: ${color.status.error};
`
