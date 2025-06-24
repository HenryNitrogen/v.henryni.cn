'use client'
import React from 'react';
import styles from '../ui/sidebar.module.css';
import { useSession, signIn , signOut } from 'next-auth/react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { data: session, status } = useSession();
    
    if (!isOpen) return null;
    
    return(
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.sidebar}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <ul className={styles.homelist}>
                    <li className={styles.ali}>Home</li>
                    <li className={styles.ali}>About</li>
                    <li className={styles.alia}>Contact</li>
                    {status === "authenticated" ? (<li className={styles.ali}>{session.user?.name} <button onClick={()=> signOut() }>sign out</button></li> ) : (<button onClick={() => signIn("google")}>login</button>) }
                </ul>
            </div>
        </>
    )
}