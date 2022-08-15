import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='flex items-center justify-between max-w-7xl mx-auto px-10 py-5'>
            <div className='flex items-center space-x-5'>
                <div className="flex items-center">
                    <Link href="/">
                        <h2 className='text-lg sm:text-2xl md:text-4xl font-bold '>LouisQ</h2>
                    </Link>
                </div>
                <div className='hidden md:inline-flex items-center space-x-5'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className='text-white bg-blue-600 px-4 py-1 rounded-full'>Follow</h3>
                </div>
            </div>
            <div className='flex items-center space-x-5 text-blue-600'>
                <h3>Sign In</h3>
                <h3 className='border px-4 py-1 rounded-full border-blue-600 hover:bg-blue-50'>Get Started</h3>
            </div>
        </header>
    )
}

export default Header