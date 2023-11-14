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
            className={`inline-flex items-center gap-[10px] px-[16px] py-[14px] h-[48px] overflow-hidden rounded-[12px] justify-center relative all-[unset] box-border hover:bg-[#c30000] bg-[#eb0c0c]`}>
            <div className="w-fit mt-[-0.50px] tracking-[0] text-[16px] text-white text-center whitespace-nowrap leading-[normal] relative">
                {children}
            </div>
        </button>
    )
}
