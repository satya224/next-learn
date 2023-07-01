"use client"
import React from "react";
import Link from "next/link";
import styles from './navbar.module.css'
import DarkModeToggle from "@/components/darkmodetoggle/DarkModeToggle";
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";


const links = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Portfolio",
        url: "/portfolio",
    },
    {
        id: 3,
        title: "Blog",
        url: "/blog",
    },
    {
        id: 4,
        title: "About",
        url: "/about",
    },
    {
        id: 5,
        title: "Contact",
        url: "/contact",
    },
    {
        id: 6,
        title: "Dashboard",
        url: "/dashboard",
    },
    {
        id: 7,
        title: "Members",
        url: "/members",
    }
];

const Navbar = () => {
    const {status, data} = useSession();
    const dp = data?.user?.image
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>
                lamamia
            </Link>
            <div className={styles.links}>
                <DarkModeToggle/>
                {links.map(link => (
                    <Link key={link.id} href={link.url}>
                        {link.title}
                    </Link>
                ))}
                {status === 'unauthenticated' && (
                    <button className={styles.logout} onClick={() => signIn("google")}>
                        Login
                    </button>
                )}
                {status === 'authenticated' && (
                    <>
                        <button className={styles.logout} onClick={() => signOut()}>
                            Logout
                        </button>
                        <Image src={dp ? dp : "/user.png"} width={30} height={30} className={styles.profile} alt="Facebook Account" />
                    </>
                )}

            </div>
        </div>
    )
}
export default Navbar
