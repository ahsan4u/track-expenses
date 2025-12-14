'use client'

import { useState, useRef, useEffect } from 'react';
import { useAppContext } from './Context';
import { Icons } from './Icons';

export function DropdownMenu({ date, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { deleteData } = useAppContext();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = () => {
        deleteData(date);
        setIsOpen(false);
    };

    return (
        <div ref={menuRef} className={`${className} relative inline-block`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Options menu"
            >
                <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg border border-gray-200 z-50 duration-200">
                    <button
                        onClick={handleDelete}
                        className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 flex items-center gap-2 first:rounded-t-lg"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
