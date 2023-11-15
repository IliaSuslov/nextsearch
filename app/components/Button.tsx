'use client'
import React from 'react'

interface IButton {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
}
export function Button({ children, disabled, onClick }: IButton) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="inline-flex items-center gap-[10px] px-[16px] py-[14px] h-[48px] overflow-hidden rounded-xl justify-center relative all-[unset] box-border :hover: none 2xl:hover:bg-[#c30000] bg-[#eb0c0c] disabled:opacity-75">
            <div className="w-fit mt-[-0.50px] text-[16px] text-white text-center whitespace-nowrap relative">
                {children}
            </div>
        </button>
    )
}
