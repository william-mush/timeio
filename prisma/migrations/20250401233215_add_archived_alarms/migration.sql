-- CreateTable
CREATE TABLE "ArchivedAlarm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "label" TEXT,
    "sound" TEXT NOT NULL,
    "repeatDays" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastTriggered" TIMESTAMP(3),
    "reason" TEXT NOT NULL,

    CONSTRAINT "ArchivedAlarm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchivedAlarm" ADD CONSTRAINT "ArchivedAlarm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
