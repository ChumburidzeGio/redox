import React from 'react';
import { SunIcon, MoonIcon} from "@heroicons/react/outline";
import { ThemeContext } from './theme-context';

export const ThemeToggle = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    return (
        <div className="transition duration-500 ease-in-out rounded-full p-2 cursor-pointer">
            {theme === 'dark' ? (
                <SunIcon
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-6 w-6 text-gray-500 dark:text-gray-400"
                />
            ) : (
                <MoonIcon
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-6 w-6 text-gray-500 dark:text-gray-400"
                />
            )}
        </div>
    );
};
