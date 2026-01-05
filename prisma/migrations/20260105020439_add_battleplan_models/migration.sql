-- CreateEnum
CREATE TYPE "ClanRole" AS ENUM ('leader', 'coLeader', 'elder', 'member');

-- CreateEnum
CREATE TYPE "WarType" AS ENUM ('regular', 'cwl');

-- CreateEnum
CREATE TYPE "WarState" AS ENUM ('preparation', 'inWar', 'ended');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('valid', 'invalid');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'past_due', 'canceled', 'incomplete');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateTable
CREATE TABLE "Player" (
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "townHallLevel" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("tag")
);

-- CreateTable
CREATE TABLE "PlayerVerification" (
    "id" TEXT NOT NULL,
    "playerTag" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "status" "VerificationStatus" NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "PlayerVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clan" (
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "description" TEXT,
    "ownerPlayerTag" TEXT NOT NULL,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("tag")
);

-- CreateTable
CREATE TABLE "ClanMember" (
    "clanTag" TEXT NOT NULL,
    "playerTag" TEXT NOT NULL,
    "role" "ClanRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "ClanMember_pkey" PRIMARY KEY ("clanTag","playerTag")
);

-- CreateTable
CREATE TABLE "War" (
    "id" TEXT NOT NULL,
    "clanTag" TEXT NOT NULL,
    "opponentTag" TEXT NOT NULL,
    "type" "WarType" NOT NULL,
    "state" "WarState" NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "clanStars" INTEGER NOT NULL,
    "opponentStars" INTEGER NOT NULL,
    "clanDestruction" DOUBLE PRECISION NOT NULL,
    "opponentDestruction" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "War_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarMember" (
    "id" TEXT NOT NULL,
    "warId" TEXT NOT NULL,
    "playerTag" TEXT NOT NULL,
    "mapPosition" INTEGER NOT NULL,
    "townHall" INTEGER NOT NULL,

    CONSTRAINT "WarMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attack" (
    "id" TEXT NOT NULL,
    "warMemberId" TEXT NOT NULL,
    "defenderTag" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "destruction" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "clanTag" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubId" TEXT,
    "status" "SubscriptionStatus" NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClanFeature" (
    "clanTag" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClanFeature_pkey" PRIMARY KEY ("clanTag","feature")
);

-- CreateIndex
CREATE INDEX "PlayerVerification_playerTag_idx" ON "PlayerVerification"("playerTag");

-- CreateIndex
CREATE INDEX "ClanMember_playerTag_idx" ON "ClanMember"("playerTag");

-- CreateIndex
CREATE INDEX "War_clanTag_idx" ON "War"("clanTag");

-- CreateIndex
CREATE INDEX "War_opponentTag_idx" ON "War"("opponentTag");

-- CreateIndex
CREATE INDEX "War_startTime_idx" ON "War"("startTime");

-- CreateIndex
CREATE INDEX "WarMember_playerTag_idx" ON "WarMember"("playerTag");

-- CreateIndex
CREATE INDEX "Attack_defenderTag_idx" ON "Attack"("defenderTag");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_clanTag_key" ON "Subscription"("clanTag");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerVerification" ADD CONSTRAINT "PlayerVerification_playerTag_fkey" FOREIGN KEY ("playerTag") REFERENCES "Player"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clan" ADD CONSTRAINT "Clan_ownerPlayerTag_fkey" FOREIGN KEY ("ownerPlayerTag") REFERENCES "Player"("tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClanMember" ADD CONSTRAINT "ClanMember_clanTag_fkey" FOREIGN KEY ("clanTag") REFERENCES "Clan"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClanMember" ADD CONSTRAINT "ClanMember_playerTag_fkey" FOREIGN KEY ("playerTag") REFERENCES "Player"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "War" ADD CONSTRAINT "War_clanTag_fkey" FOREIGN KEY ("clanTag") REFERENCES "Clan"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarMember" ADD CONSTRAINT "WarMember_warId_fkey" FOREIGN KEY ("warId") REFERENCES "War"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarMember" ADD CONSTRAINT "WarMember_playerTag_fkey" FOREIGN KEY ("playerTag") REFERENCES "Player"("tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attack" ADD CONSTRAINT "Attack_warMemberId_fkey" FOREIGN KEY ("warMemberId") REFERENCES "WarMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_clanTag_fkey" FOREIGN KEY ("clanTag") REFERENCES "Clan"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClanFeature" ADD CONSTRAINT "ClanFeature_clanTag_fkey" FOREIGN KEY ("clanTag") REFERENCES "Clan"("tag") ON DELETE CASCADE ON UPDATE CASCADE;
