"use client"

import { useState, useEffect } from "react";

export const SplashScreen = ({ duration = 2500 }: { duration?: number }) => {

    const [visible, setVisible] = useState(true);
    const [hidden, setHidden] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const hiderTimer = window.setTimeout(() => { setHidden(true) }, duration);
        const visibleTimer = window.setTimeout(() => { setVisible(false) }, duration + 500);
        const ProgressTimer = window.setTimeout(() => { setProgress(100) }, 50);


        return () => { clearTimeout(hiderTimer), clearTimeout(visibleTimer), clearTimeout(ProgressTimer) }
    }, [duration])

    if (!visible) return null

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-30 bg-(--background) ${hidden ? "opacity-0" : "opacity-100"}`}>
            <h1 className="text-2xl uppercase font-bold ">Task Manager</h1>
            <div className="w-50 h-2 bg-(--background) overflow-hidden border border-(--foreground) rounded-lg" ><span className="block bg-(--foreground) w-full h-full" style={{ width: `${progress}%`, transition: ` width ${duration}ms ease-in-out` }}></span></div>
        </div>
    )
}