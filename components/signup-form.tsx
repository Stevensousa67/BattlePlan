"use client"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signUp, initialState)

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
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground text-balance">
                  Create your BattlePlan account
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" type="text" placeholder="John" required />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" type="text" placeholder="Doe" required />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="johndoe@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
                Sign Up
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <Image src="/svgs/Google.svg" alt="Google logo" width={24} height={24} />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <Image src="/svgs/Microsoft.svg" alt="Microsoft logo" width={24} height={24} />
                  <span className="sr-only">Login with Microsoft</span>
                </Button>
                <Button variant="outline" type="button" className="w-full" disabled>
                  <Image src="/svgs/X.svg" alt="X logo" width={24} height={24} className="invert dark:invert-0" />
                  <span className="sr-only">Login with X</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
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