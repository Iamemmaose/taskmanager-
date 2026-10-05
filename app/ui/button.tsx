import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge"


type ButtonVariants = "primary" | "outline" | "link"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
    to?: string,
    children: React.ReactNode,
    variant?: ButtonVariants,
    className?: string
}



export const Button = ({ children, to, variant = "primary", className = "", ...props }: ButtonProps) => {

    const baseClasses = "inline-flex py-2 px-5 capitalize cursor-pointer rounded-sm tracking-wide font-semibold text-base"

    const variantClasses = {
        primary: "bg-(--foreground) text-(--background) ",
        outline: "bg-(--background) text-(--foreground) border border-(--foreground)",
        link: "no-underline text-black transition duration-500 ease-in-out hover:text-blue-500"
    }

    const classes = twMerge(`${baseClasses} ${variantClasses[variant]} ${className}`)

    if (to) {
        return (
            <Link className={classes} href={to} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</Link>
        )
    }

    return (
        <>
            <button className={classes} {...props}>{children}</button>
        </>
    )
}