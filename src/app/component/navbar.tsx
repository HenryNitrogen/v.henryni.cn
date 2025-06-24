'use client'

import styles from '../ui/nav.module.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";

interface NavProps {
  onOpenSidebar: () => void;
}

export default function Nav({ onOpenSidebar }: NavProps) {
  const { data: session, status } = useSession();
  return (
    <>
        <nav className={styles.nav}>
          <div className={styles.list}> 
            <button className={styles.iconbutton} onClick={onOpenSidebar}><ReorderIcon /></button>
          </div>
          <div className={styles.logoContainer}>
            <Image src="/logo.png" alt="Logo" className={styles.logoImage} width={140} height={48} />
          </div>
    
            <input className={styles.search} type="text" />
            <div className={styles.divhomelist}>
              <ul className={styles.homelist}>
                <li className={styles.ali}><><button>Home</button></> </li>
                <li className={styles.ali}><><button>About</button></> </li>
                <li className={styles.alia}><><button>Contact</button></> </li>
                {status === "authenticated" ? (<li className={styles.ali}>{session.user?.name}<> <button onClick={()=> signOut() }>sign out</button></></li> ) : (<><button onClick={() => signIn("google")}>login</button></>) }
                
              </ul>
            </div>
        </nav>
    </>
  );
}
