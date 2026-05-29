// packages/ui-layer/nuxt.config.ts
import {createResolver} from "@nuxt/kit";
import {defineNuxtConfig} from "nuxt/config";
import type {NuxtConfig} from 'nuxt/config'

const { resolve } = createResolver(import.meta.url)

const config: NuxtConfig = {
    compatibilityDate: '2025-05-28',
    css: [resolve('./assets/style.css')],
    components: [
        { path: resolve('./components'), pathPrefix: false }
    ],
    imports: {
        dirs: [resolve('./composables')]
    },
}

export default defineNuxtConfig(config) as NuxtConfig