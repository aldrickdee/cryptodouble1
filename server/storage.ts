import { users, type User, type InsertUser, type WalletAddress, type InsertWalletAddress } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveWalletAddress(walletAddress: InsertWalletAddress): Promise<WalletAddress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private walletAddresses: Map<number, WalletAddress>;
  currentId: number;
  currentWalletId: number;

  constructor() {
    this.users = new Map();
    this.walletAddresses = new Map();
    this.currentId = 1;
    this.currentWalletId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async saveWalletAddress(insertWalletAddress: InsertWalletAddress): Promise<WalletAddress> {
    const id = this.currentWalletId++;
    const now = new Date();
    // Create a valid wallet address object with proper typing
    const walletAddress: WalletAddress = { 
      id, 
      address: insertWalletAddress.address,
      cryptoType: insertWalletAddress.cryptoType,
      amount: insertWalletAddress.amount,
      email: insertWalletAddress.email ?? null, // Ensure email is string | null
      createdAt: now
    };
    this.walletAddresses.set(id, walletAddress);
    return walletAddress;
  }
}

export const storage = new MemStorage();
