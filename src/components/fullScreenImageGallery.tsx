'use client';

import React, { useEffect, useState } from 'react';

const FullScreenImageGallery = ({ images: items, exitGallery, index }: { images: string[], exitGallery: () => void, index: number }) => {
    const [currentIndex, setCurrentIndex] = useState(index);

    const currentItem = items[currentIndex];

    const imageUrl = currentItem ? currentItem : '';

    const navigate = (direction: 'prev' | 'next') => {
        if (direction === 'next') {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                navigate('prev');
            } else if (e.key === 'ArrowRight') {
                navigate('next');
            } else if (e.key === 'Escape') {
                exitGallery();
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [navigate, exitGallery]);

    // If items (now gallery images) are empty, show back button message
    if (items.length === 0) {
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col z-50 p-4 font-sans items-center justify-center">
                <div className="text-2xl text-white">No images found in this directory.</div>
                <button onClick={exitGallery} className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-xl hover:bg-red-700 transition-colors">
                    Back to Browser
                </button>
            </div>
        );
    }


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col z-50 p-4 font-sans">

            {/* Back Button */}
            <button
                onClick={exitGallery}
                className="flex items-center text-white text-m w-72 font-semibold px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back (Esc)
            </button>
            {/* Header and Controls */}
            <div className="flex justify-between items-center text-white p-3 mb-4 bg-gray-800 rounded-lg shadow-xl sticky top-0">


                {/* THUMBNAIL PREVIEW BAR */}
                <div className="w-full text-center overflow-x-auto py-2 mb-4 bg-gray-800 rounded-lg shadow-inner">
                    <div className="inline-flex space-x-2 px-3">
                        {items.map((item, index) => (
                            <button
                                key={item + "-" + index}
                                onClick={() => setCurrentIndex(index)}
                                className={`
                          relative w-20 h-15 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 
                          ${index === currentIndex ? 'ring-4 ring-blue-400 ring-offset-2 ring-offset-gray-900 shadow-xl' : ''}
                          ${'border-2 border-transparent'}
                          hover:opacity-80
                      `}

                                title={item}
                            >
                                {/* Thumbnail Placeholder */}
                                <img
                                    src={item}
                                    alt={item}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Main Image View */}
            <div className={"max-w-full max-h-full flex flex-col items-center justify-center p-4"}>

                {/* Navigation Buttons */}
                <button
                    onClick={() => navigate('prev')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 text-white text-4xl font-extrabold rounded-r-lg bg-black bg-opacity-40 hover:bg-opacity-70 transition-all z-10"
                    aria-label="Previous Image"
                >
                    &#10094;
                </button>

                <button
                    onClick={() => navigate('next')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 text-white text-4xl font-extrabold rounded-l-lg bg-black bg-opacity-40 hover:bg-opacity-70 transition-all z-10"
                    aria-label="Next Image"
                >
                    &#10095;
                </button>

                <img
                    src={imageUrl}
                    alt={`Preview of ${currentItem}`}
                    className="object-contain max-w-full max-h-full rounded-xl shadow-2xl transition-transform duration-300"
                    style={{ width: '100%', height: '100%', maxWidth: '1200px', maxHeight: '700px' }}
                    // Simple fallback if placeholder service fails
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/1200x800/888888/ffffff?text=Image+Load+Failed`;
                    }}
                    title={imageUrl}
                />
                {/* File Name Caption */}
                <div className="mt-4 p-2 bg-gray-800 rounded-lg text-white text-lg font-mono">
                    {currentItem}
                </div>

            </div>
        </div>
    );
};

export default FullScreenImageGallery;