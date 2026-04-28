-- CreateTable
CREATE TABLE "socialMediaLink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "socialMediaLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socialMediaLink_order_key" ON "socialMediaLink"("order");
