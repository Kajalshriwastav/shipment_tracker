-- CreateTable
CREATE TABLE "Users" (
    "UserID" INTEGER NOT NULL,
    "DriverID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Username" TEXT,
    "Role" TEXT,
    "Password" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("DriverID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");
