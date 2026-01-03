-- CreateTable
CREATE TABLE IF NOT EXISTS "AuthEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT,
    "userId" TEXT,
    "email" TEXT,
    "errorCode" TEXT,
    "errorMsg" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AuthEvent_type_createdAt_idx" ON "AuthEvent"("type", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AuthEvent_userId_createdAt_idx" ON "AuthEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AuthEvent_createdAt_idx" ON "AuthEvent"("createdAt");
