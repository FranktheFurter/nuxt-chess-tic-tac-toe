export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  app: {
    baseURL: "/nuxt-chess-tic-tac-toe/",
  },

  ssr: true,

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      ignore: ["/ignore-me"],
    },
  },

  compatibilityDate: "2024-07-21",
});
