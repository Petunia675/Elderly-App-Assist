import express from 'express'

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        // Add other properties of user if needed
      }
    }
  }
}