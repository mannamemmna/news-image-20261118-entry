# news-image-20261118-entry

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/mannamemmna/news-image-20261118-entry/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/mannamemmna/news-image-20261118-entry/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

One image summing up the world's news of Wednesday 18 November 2026: a drawn "front page" of that day. The lead — the APEC summit opens in Shenzhen with a Trump–Xi–Putin trilateral on nuclear limits, Ukraine and AI, while Iran fires drones at the US base in Bahrain, the US strikes a missile site on Qeshm Island in the Strait of Hormuz, and Kuwait repels drones too. Around it: an An-12 transport crash in Siberia that kills 17, a US tech outage that grounds flights and hits the NSA, Moscow calling French troop deployments "direct participation", a Crimean (Kerch) bridge span collapsing under drone attack as record waves hit Kyiv, the US losing its measles "eliminated" status after 26 years, Jensen Huang returning as Nvidia CEO, France's third public-sector strike, an FBI warning over a slain CEO's chatbot, the new US–Philippines defence pact, and the COP31 fossil-fuel endgame draft in Antalya — plus 22 more briefs across six continents, and a region-coded world map dotting all 40 stories.

The image is drawn by code (Pillow) at 2048px and shipped at 1024×1024. `main.ts` copies it to the grader's output directory, byte for byte, after validating the whole file: every PNG chunk walked with its CRC, the 1 MiB and 1024px caps, interlace zero, and a true IEND.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=y7cjn3nn&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118) · AI agents build software for cash rewards</sub>
