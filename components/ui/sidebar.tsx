'use client'

import React from 'react'

export const SidebarGroup: React.FC<React.PropsWithChildren<any>> = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
)

export const SidebarGroupLabel: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div className="text-xs uppercase text-gray-500 mb-2">{children}</div>
)

export const SidebarGroupContent: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div>{children}</div>
)

export const SidebarMenu: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <ul className="space-y-1">{children}</ul>
)

export const SidebarMenuItem: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <li>{children}</li>
)

export const SidebarMenuButton: React.FC<any> = ({ children, render, className, ...props }) => (
  <a className={className} {...props}>{render ?? children}</a>
)

export const SidebarMenuAction: React.FC<any> = ({ showOnHover, className }) => (
  <button className={className} aria-hidden>{/* action */}</button>
)

export function useSidebar() {
  return { isMobile: false }
}

export default SidebarGroup
