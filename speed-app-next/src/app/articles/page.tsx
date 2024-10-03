'use client'

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ArticlesPage = () => {
    const path = usePathname();

    useEffect(() => {
        // Redirect to another page, for example, the home page
        redirect('./articles/search');
    });

    return null; // Or you can return a loading spinner or message
};

export default ArticlesPage;