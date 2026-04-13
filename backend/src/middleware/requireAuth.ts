/**
 * @author Jack Buchholzer
 * requireAuth middleware -- blocks unauthenticated requests
 *
 * checks if the clerk session has a userId attached
 * if not the user isnt signed in so we return 401
 * use this on routes that need a logged in user
 */

import { Request, Response, NextFunction } from "express"
import { getAuth } from "@clerk/express"

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req)

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" })
  }

  next()
}
