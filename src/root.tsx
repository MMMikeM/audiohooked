// @refresh reload
import { Routes } from "@solidjs/router"
import { Suspense } from "solid-js"
import { ErrorBoundary } from "solid-start/error-boundary"
import { FileRoutes, Head, Meta, Scripts, Title } from "solid-start"
import { I18nContext, createI18nContext } from "@solid-primitives/i18n"
import "virtual:uno.css"
import "@unocss/reset/tailwind.css"
import dict from "./dict"

export default function Root() {
  const i18n = createI18nContext(dict, "en")
  const [t] = i18n

  return (
    <html lang="en">
      <I18nContext.Provider value={i18n}>
        <Head>
          <Title>{t("title")}</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <ErrorBoundary>
            <Suspense>
              <Routes>
                <FileRoutes />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Scripts />
        </body>
      </I18nContext.Provider>
    </html>
  )
}
