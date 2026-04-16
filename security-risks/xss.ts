import type { Request, Response } from "express";

export function buildTicketHtml(title: string, description: string): string {
  return `
    <section class="ticket">
      <h1>${title}</h1>
      <div class="description">${description}</div>
    </section>
  `;
}

export function renderWelcomeMessage(name: string): string {
  return `<p>Welcome back, ${name}</p>`;
}

export function reflectedXssHandler(req: Request, res: Response): void {
  const name = String(req.query.name || "guest");
  res.send(`<html><body><h1>Hello ${name}</h1></body></html>`);
}

export function storedXssTemplate(comment: string): string {
  return `<li class="comment">${comment}</li>`;
}
