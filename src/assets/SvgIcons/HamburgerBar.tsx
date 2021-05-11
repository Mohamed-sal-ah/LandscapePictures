import React, { FC } from 'react'

type Props = {
    fillColor: string,
    size: number
}

export const HamburgerBar = ({ fillColor, size }: Partial<Props>) => (
    <svg width={size} height={size} viewBox="0 0 29 21" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
        <rect width="29" height="3" rx="1.5" />
        <rect y="8.80005" width="29" height="3" rx="1.5" />
        <rect y="17.6001" width="29" height="3" rx="1.5" />
    </svg>
)

export default HamburgerBar

