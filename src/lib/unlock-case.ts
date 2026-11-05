"use server";

import { timingSafeEqual } from "node:crypto";

export type UnlockState = { status: "idle" | "error" | "ok" };

/**
 * Confere a senha de um case protegido no servidor (a senha nunca vai para o navegador).
 * A senha fica na variável de ambiente PRIVACY_CASE_PASSWORD (na Vercel: Settings → Environment Variables).
 * Sem a variável definida, nenhuma senha é aceita.
 */
export async function unlockCase(_previous: UnlockState, formData: FormData): Promise<UnlockState> {
  const expected = process.env.PRIVACY_CASE_PASSWORD ?? "";
  const given = String(formData.get("password") ?? "");
  // Pequena espera fixa: deixa tentativas em massa lentas e não revela nada pelo tempo de resposta.
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (!expected || !given) return { status: "error" };
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { status: "error" };
  return { status: "ok" };
}
