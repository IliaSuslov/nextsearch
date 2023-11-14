import React from 'react'

export function Loader() {
    return (
        <div className="flex items-center justify-center h-[204px]">
            <div className="animate-spin">
                <div className="w-4 h-1 bg-black rounded-full"></div>
                <div className="w-4 h-1 bg-transparent rounded-full"></div>
                <div className="w-4 h- bg-black rounded-full"></div>
            </div>
        </div>
    )
}
