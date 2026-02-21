import React from 'react';
import { cn } from './Button';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "bg-iota-secondary border border-iota-border/30 rounded-2xl p-6 shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
