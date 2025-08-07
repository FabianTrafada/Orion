import { cn } from "@workspace/ui/lib/utils"

export const WidgetHeader = ({
    children,
    className,
}: {
    children: React.ReactNode,
    className?: string,
}) => {
    return (
        <header className={cn(
            "bg-gradient-to-b from-primary/80 to-primary p-4 text-primary-foreground",
            className
        )}>
            {children}
        </header>
    )
}