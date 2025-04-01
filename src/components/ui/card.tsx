import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 shadow-lg rounded-lg',
        className
      )}
      {...props}
    />
  )
} 