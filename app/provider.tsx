import { SplashScreen } from "@/app/ui/splashscreen"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <><SplashScreen />{children}</>
    )
}