import type { Request, Response } from "express";

export function continueHandler(req: Request, res: Response): void {
  const nextUrl = String(req.query.next || "/");
  res.redirect(nextUrl);
};
