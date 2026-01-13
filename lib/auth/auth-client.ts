import { createAuthClient } from "better-auth/react"
import { stripeClient } from "@better-auth/stripe/client"
import { APIError } from "better-auth"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
    plugins: [
        stripeClient({
            subscription: true
        })
    ]
})

export const loginWithSocial = async (provider: string) => {
    try {
        await authClient.signIn.social({
            provider,
            callbackURL: "/",
            errorCallbackURL: "/login",
        })
    } catch (error) {
        if (error instanceof APIError) {
            console.error("Social login error:", error.status, error.message)
        } else {
            console.error("Unexpected error during social login:", error)
        }
    }
}