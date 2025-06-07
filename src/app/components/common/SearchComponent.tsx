"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme'; // Keep this import if useTheme() is called elsewhere or needed in the future

interface SearchItem {
    id: string;
    title: string;
    description: string;
    url: string | null; // url can be null now
    keywords: string[];
    type: 'page' | 'technology' | 'alternative'; // New type property
}

interface SearchComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
    const [data, setData] = useState<SearchItem[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const pathname = usePathname();
    const lng = pathname.split('/')[1];
    const { t } = useTranslation(lng, 'common');

    // ESLint Error Fix 1: 'theme' is assigned a value but never used.
    // Since 'theme' isn't used in this component, you can remove it from destructuring.
    // If you plan to use it later, you'll need to integrate it into your JSX or logic.
    // For now, we'll remove it to resolve the error.
    useTheme(); // Calling the hook, but not destructuring 'theme' if it's unused.

    useEffect(() => {
        const fetchSearchData = async () => {
            try {
                const response = await fetch(`/locales/${lng}/search-data.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch search data for ${lng}`);
                }
                const jsonData: SearchItem[] = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error loading search data:", error);
                setData([]);
            }
        };

        fetchSearchData();
    }, [lng]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else {
            setQuery('');
            setSuggestions([]);
        }
    }, [isOpen]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            const lowerCaseValue = value.toLowerCase();
            const filtered = data.filter(item =>
                item.title.toLowerCase().includes(lowerCaseValue) ||
                item.description.toLowerCase().includes(lowerCaseValue) ||
                item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseValue))
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={clsx(
                "fixed inset-0 z-[100] flex justify-center items-start pt-20 px-4",
                "backdrop-blur-sm",
            )}
            aria-modal="true"
            role="dialog"
        >
            <div
                ref={searchRef}
                className={clsx(
                    "rounded-lg shadow-xl p-6 w-full max-w-2xl transform transition-all duration-300 ease-out",
                    "border border-[var(--color-border-search)]",
                    "bg-[var(--color-background-search-modal)]",
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}
            >
                <div className="flex justify-between items-center mb-4">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t('search.placeholder')}
                        value={query}
                        onChange={handleSearch}
                        className={clsx(
                            "w-full p-3 rounded-md border focus:outline-none focus:ring-2",
                            "border-[var(--color-border-input)]",
                            "focus:ring-[var(--color-primary)]",
                            "text-[var(--color-text-dark)]",
                            "bg-[var(--color-background-input)]",
                            "placeholder:text-base", // tamaño base por defecto
                            "sm:placeholder:text-base", // sm y arriba: normal
                            "placeholder:text-sm" // por defecto (mobile): más pequeño
                        )}
                    />

                    <button
                        onClick={onClose}
                        className={clsx(
                            "ml-4 p-2 rounded-full",
                            "text-[var(--color-text-dark)]",
                            "hover:bg-[var(--color-background-button-hover)]",
                            "hover:text-[var(--color-secondary)]",
                            "transition-colors duration-200"
                        )}
                        aria-label={t('search.close')}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {query.length > 1 && suggestions.length > 0 && (
                    <div className="mt-4 max-h-80 overflow-y-auto custom-scrollbar">
                        {suggestions.map((item) => {
                            const isLink = typeof item.url === 'string' && item.url !== '';
                            // ESLint Error Fix 2: 'Tag' is assigned a value but never used.
                            // Use 'Tag' directly as the component, and conditionally apply props.
                            const Tag = isLink ? 'a' : 'div';

                            return (
                                <Tag
                                    key={item.id}
                                    {...(isLink && { href: item.url as string, onClick: onClose })}
                                    className={clsx(
                                        "block p-3 rounded-md cursor-pointer transition-colors duration-200",
                                        "hover:bg-[var(--color-background-suggestion-hover)]",
                                        item.type === 'technology' && 'border-l-4 border-[var(--color-primary)]',
                                        item.type === 'alternative' && 'border-l-4 border-[var(--color-secondary)]'
                                    )}
                                >
                                    <h3 className={clsx(
                                        "text-lg font-semibold",
                                        item.type === 'technology' && 'text-[var(--color-primary)]',
                                        item.type === 'alternative' && 'text-[var(--color-secondary)]',
                                        item.type === 'page' && 'text-[var(--color-text-dark)]'
                                    )}>{item.title}</h3>
                                    <p className={clsx(
                                        "text-sm mt-1",
                                        "text-[var(--color-text-light)]"
                                    )}>{item.description}</p>
                                </Tag>
                            );
                        })}
                    </div>
                )}

                {query.length > 1 && suggestions.length === 0 && (
                    <p className={clsx(
                        "text-center mt-4",
                        "text-[var(--color-text-light)]"
                    )}>
                        {t('search.no_results', { query })}
                    </p>
                )}

                {query.length <= 1 && (
                    <p className={clsx(
                        "text-center mt-4",
                        "text-[var(--color-text-light)]"
                    )}>
                        {t('search.type_to_search')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;