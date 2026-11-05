"use client";

import Image from "next/image";
import { useActionState, useId, useState } from "react";
import type { Locale } from "@/i18n/config";
import { revealDelay } from "@/lib/reveal";
import { unlockCase, type UnlockState } from "@/lib/unlock-case";
import { ExternalLink } from "../ExternalLink";

const LINKEDIN = "https://www.linkedin.com/in/lucas-cipriano/";

const copy = {
  "pt-br": {
    title: "Desbloqueio com senha",
    intro: "Algumas informações desse case não podem ser apresentadas abertamente.",
    ask: "Me pergunte sobre a senha no meu LinkedIn",
    newTab: "(abre em nova aba)",
    label: "Senha",
    placeholder: "Digite a senha",
    submit: "Desbloquear",
    checking: "Verificando…",
    error: "Senha incorreta. Confira e tente de novo.",
    ok: "Senha correta. O case completo estará disponível em breve.",
  },
  en: {
    title: "Password unlock",
    intro: "Some information in this case can’t be shared publicly.",
    ask: "Ask me for the password on LinkedIn",
    newTab: "(opens in a new tab)",
    label: "Password",
    placeholder: "Enter the password",
    submit: "Unlock",
    checking: "Checking…",
    error: "Incorrect password. Please check it and try again.",
    ok: "Correct password. The full case will be available soon.",
  },
} satisfies Record<Locale, Record<string, string>>;

type Props = { locale: Locale; logo: { src: string; width: number; height: number; alt: string } };

/**
 * Tela inteira de desbloqueio de um case protegido (referência: tela de 2FA do WeTransfer, com o logo da Privacy),
 * no visual dos formulários do Tailwind UI ("Simple sign-in"): coluna estreita, rótulo acima do campo,
 * borda fina com anel de foco, erro em vermelho com ícone. Cor de destaque: cinza-escuro (no lugar do índigo).
 * Entra com o mesmo efeito do topo das páginas do site (reveal-intro, em cascata).
 * A senha é conferida no servidor (`unlockCase`).
 */
export function LockedCase({ locale, logo }: Props) {
  const t = copy[locale];
  const inputId = useId();
  const messageId = useId();
  const [value, setValue] = useState("");
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlockCase, { status: "idle" });

  const invalid = state.status === "error";

  return (
    <div className="flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center px-8 py-12">
      <div className="w-full max-w-[32.9375rem] text-center">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          unoptimized
          preload
          className="reveal-intro mx-auto h-10 w-auto"
        />
        <h1 className="reveal-intro mt-10 text-2xl/9 font-bold tracking-[-0.03em] text-[#101828]" style={revealDelay(120)}>
          {t.title}
        </h1>
        <p className="reveal-intro mt-2 text-[1.125rem]/[1.6875rem] text-[#6a7282]" style={revealDelay(200)}>
          {t.intro}{" "}
          <ExternalLink
            href={LINKEDIN}
            newTabLabel={t.newTab}
            className="font-bold text-[#101828] underline hover:decoration-2"
          >
            {t.ask}
          </ExternalLink>
        </p>
      </div>

      <div className="reveal-intro mt-10 w-full max-w-[24rem]" style={revealDelay(280)}>
        <form action={action} className="space-y-6">
          <div>
            <label htmlFor={inputId} className="block text-base/6 font-medium text-[#101828]">
              {t.label}
            </label>
            <div className="mt-1 grid grid-cols-1">
              <input
                id={inputId}
                name="password"
                type="password"
                autoComplete="off"
                required
                placeholder={t.placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-invalid={invalid || undefined}
                aria-describedby={state.status !== "idle" ? messageId : undefined}
                className="col-start-1 row-start-1 block h-[3.125rem] w-full rounded-md bg-white px-3 text-base text-[#101828] outline-1 -outline-offset-1 outline-[#eee] placeholder:text-[#aaa] focus:outline-2 focus:-outline-offset-2 focus:outline-[#111] aria-invalid:pr-10 aria-invalid:text-red-900 aria-invalid:outline-red-300 aria-invalid:focus:outline-red-600"
              />
              {invalid && (
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  />
                </svg>
              )}
            </div>
            <p
              id={messageId}
              role="status"
              aria-live="polite"
              className={`mt-2 text-sm empty:mt-0 ${invalid ? "text-red-600" : "text-green-700"}`}
            >
              {invalid ? t.error : state.status === "ok" ? t.ok : ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-[#111] px-3 text-base font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] disabled:cursor-wait disabled:opacity-70"
          >
            {pending ? t.checking : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
