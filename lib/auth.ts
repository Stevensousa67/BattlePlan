import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

// Initialize Stripe integration
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
})

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
        },
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        }
    },
    plugins: [
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                plans: [
                    // Define your clan subscription plans here
                    // {
                    //     name: "basic",
                    //     priceId: "price_xxx", // Your Stripe price ID
                    //     limits: { members: 50 }
                    // },
                    // {
                    //     name: "pro",
                    //     priceId: "price_yyy",
                    //     limits: { members: 100 },
                    //     freeTrial: { days: 14 }
                    // }
                ],
                // Authorize that the user is the clan leader before allowing subscription actions
                authorizeReference: async ({ user, referenceId, action }) => {
                    // referenceId is the clan tag (e.g., "#ABC123")
                    const clan = await prisma.clan.findUnique({
                        where: { tag: referenceId },
                        include: {
                            ownerPlayer: true
                        }
                    });

                    if (!clan) return false;

                    // Check if the user owns a player who owns this clan
                    const userPlayers = await prisma.player.findMany({
                        where: { userId: user.id }
                    });

                    const isOwner = userPlayers.some(
                        player => player.tag === clan.ownerPlayerTag
                    );

                    return isOwner;
                }
            }
        })
    ]
});