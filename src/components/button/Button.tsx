import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

interface ButtonProps {
    text: string
    url: string
}
const Button = ({ text, url }: ButtonProps) => {
    return (
        <Link href={url} style={{width: "max-content"}}>
            <button className={styles.container}>{text}</button>
        </Link>
    );
};

export default Button;
