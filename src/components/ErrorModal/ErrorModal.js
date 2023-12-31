import React, { useEffect, useState } from 'react'
import cx from "classnames"
import { CancelDefault } from '@icons/index'

const ErrorModal = ({ title = 'Transaction Error', shortMessage = 'User denied transaction', contentMessage }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className={cx("bg-slate-800 shadow border fixed w-96 rounded p-5 flex flex-col gap-2 text-sm transition-opacity z-50 top-20 right-5", { visible: isVisible, "fade-in": true, })}>
            <img src={CancelDefault} alt='cancel' className='w-5 h-5 absolute right-3 top-3 cursor-pointer' onClick={() => setIsVisible(false)} />
            <h3 className='text-error text-base'>{title}</h3>
            <p className='text-slate-400'>{shortMessage}</p>
            <p className='break-words text-slate-300 bg-slate-950 rounded p-3'>{contentMessage}</p>
        </div>
    )
}

export default ErrorModal