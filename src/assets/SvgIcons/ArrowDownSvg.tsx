import React, { FC } from 'react'

type Props = {
    fillColor: string
}
const ArrorDownSvg: FC<Props> = ({ fillColor }) => (
    <svg width="23" height="24" viewBox="0 0 23 24" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
        <path d="M12.638 22.7291C12.0344 23.3327 11.0559 23.3327 10.4524 22.7291L0.617152 12.8939C0.0136149 12.2904 0.0136149 11.3118 0.617152 10.7083C1.22069 10.1048 2.19922 10.1048 2.80276 10.7083L11.5452 19.4507L20.2876 10.7083C20.8911 10.1048 21.8696 10.1048 22.4732 10.7083C23.0767 11.3118 23.0767 12.2904 22.4732 12.8939L12.638 22.7291ZM13.0906 1.54541V21.6363H9.99971V1.54541H13.0906Z" />
        <circle r="1.54545" transform="matrix(-1 0 0 1 11.5454 1.54545)" />
    </svg>
)

export default ArrorDownSvg

