'use client'

import React from 'react'

export const DropdownMenu: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
  <div className="inline-block relative">{children}</div>
)

export const DropdownMenuTrigger: React.FC<any> = ({ children, render, ...props }) => (
  <div {...props}>{render ?? children}</div>
)

export const DropdownMenuContent: React.FC<React.PropsWithChildren<{ className?: string; side?: string; align?: string }>> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

export const DropdownMenuItem: React.FC<React.PropsWithChildren<{ variant?: string }>> = ({ children }) => (
  <div className="px-2 py-1 hover:bg-gray-100">{children}</div>
)

export const DropdownMenuSeparator: React.FC = () => <div className="h-px bg-gray-100 my-1" />

export default DropdownMenu
