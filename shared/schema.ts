import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const walletAddresses = pgTable("wallet_addresses", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 256 }).notNull(),
  cryptoType: varchar("crypto_type", { length: 10 }).notNull(),
  amount: text("amount").notNull(),
  email: varchar("email", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const walletSchema = createInsertSchema(walletAddresses).pick({
  address: true,
  cryptoType: true,
  amount: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type WalletAddress = typeof walletAddresses.$inferSelect;
export type InsertWalletAddress = z.infer<typeof walletSchema>;
