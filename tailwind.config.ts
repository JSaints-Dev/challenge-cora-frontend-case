import type { Config } from 'tailwindcss'
import twPreset from '@jsaints-dev/cora-ui/tailwind-preset'

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  presets: [twPreset],
} satisfies Config

export default config

