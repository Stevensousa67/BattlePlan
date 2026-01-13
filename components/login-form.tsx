"use client"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useActionState, useEffect } from "react"
import { signIn } from "@/lib/actions"
import { loginWithSocial } from "@/lib/auth/auth-client"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const initialState = { errorMessage: "" };
    const [state, formAction, pending] = useActionState(signIn, initialState)

    useEffect(() => {
        if (state.errorMessage && state.errorMessage.length) {
            toast.error(state.errorMessage)
        }
    }, [state.errorMessage])

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form action={formAction} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your BattlePlan account
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
                                Login
                            </Button>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Button variant="outline" type="button" className="w-full" onClick={() => loginWithSocial("google")}>
                                    <Image src="/svgs/Google.svg" alt="Google logo" width={24} height={24} />
                                    <span className="sr-only">Login with Google</span>
                                </Button>
                                <Button variant="outline" type="button" className="w-full" onClick={() => loginWithSocial("microsoft")}>
                                    <Image src="/svgs/Microsoft.svg" alt="Microsoft logo" width={24} height={24} />
                                    <span className="sr-only">Login with Microsoft</span>
                                </Button>
                                <Button variant="outline" type="button" className="w-full" disabled onClick={() => loginWithSocial("x")}>
                                    <Image src="/svgs/X.svg" alt="X logo" width={24} height={24} className="invert dark:invert-0" />
                                    <span className="sr-only">Login with X</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <Image src="/images/CoC Logo.jpeg" alt="BattlePlan Logo" width={1920} height={1080} className="absolute inset-0 w-full h-full object-fill" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}