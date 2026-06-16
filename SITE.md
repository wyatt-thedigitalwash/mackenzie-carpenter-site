# SITE.md - Mackenzie Carpenter

## Project
Official artist website for Mackenzie Carpenter, a Big Machine Label Group country artist. This is a rebuild of the live WordPress site at mackenziecarpentermusic.com, going live at the same domain. Mirror the content and visual direction; build clean.

## Brand Colors
Official brand palette with defined roles:
- Black: #000000 (primary background) - PMS Black 6 C
- Ivory: #F5ECE1 (headline and body copy color, primary text on dark) - RGB 245/236/225
- Blush: #F8DDCE (sub-head color, light section backgrounds like the About section) - RGB 248/221/206
- Red: #CF0001 (accent) - RGB 207/0/1
- Suede: #462416 (deep brown accent) - RGB 70/36/22
- Gold: #BB6E20 (accent) - RGB 187/110/32

Color usage rules:
- Page backgrounds are Black, with select light sections in Blush (e.g. About section).
- Headlines and body copy are Ivory when on dark backgrounds, and near-black/Suede when on Blush backgrounds.
- Blush is used for sub-heads and accents.
- Red, Suede, and Gold are accent colors used sparingly.
- Buttons: flat and rectangular. On dark backgrounds, Ivory or Blush fill with dark text, or transparent with Ivory text. Do not use gradients or pill shapes.

## Typography
- Headings and navigation: "big-caslon-fb", serif (Adobe Fonts / Typekit). Weights 400 and 700. Used for all page titles, section headers, nav links. Titles are large, capitalized (not uppercase), elegant serif.
- Body: "Switzer", sans-serif (self-hosted from public/fonts). Weight 400. Used for body copy, tour tables, video/release captions, footer legal. Fallback: Albert Sans, sans-serif.
- Adobe Fonts kit will be added to the document head; the kit CSS link will be provided. Do not hardcode a specific kit URL yet, leave a clearly marked placeholder comment in the layout where the Adobe kit <link> goes.

## Fonts on disk
- Switzer woff2/woff files are in public/fonts. Find them there and wire via @font-face or next/font/local.

## Navigation
Centered nav, transparent header over hero imagery, becomes solid black when docked/scrolled.
Logo: script wordmark, top-left, links to home. File in public/branding (MackenzieCarpenter_LogoPink.png).
Nav items, in order: Tour, Music, Videos, About, Merch, Fan Club
- Tour -> /tour
- Music -> /music
- Videos -> /videos
- About -> /about
- Merch -> https://mackcarpmusic.square.site/ (external, new tab)
- Fan Club -> /fan-club
Social icons, top-right, in order: Instagram, Facebook, TikTok, X, YouTube, Spotify, Apple Music, Amazon Music.

## Social Links
- Instagram: https://www.instagram.com/mackcarpmusic/
- Facebook: https://www.facebook.com/mackcarpmusic
- TikTok: https://www.tiktok.com/@mackcarpmusic?lang=en
- X: https://twitter.com/mackcarpmusic
- YouTube: https://www.youtube.com/channel/UCl94YL0Os0pta5M5-RP2aLQ
- Spotify: https://open.spotify.com/artist/1gYlQ5LjfQz9QPaCApCsDZ
- Apple Music: https://music.apple.com/us/artist/mackenzie-carpenter/1545066309
- Amazon Music: https://music.amazon.com/artists/B08QRYW4B1/mackenzie-carpenter

## Pages
1. Home (/) - hero banner slider, about section, parallax image section, tour section
2. Tour (/tour) - live Bandsintown widget, PoolPlate background
3. Music (/music) - 3-column cover grid linking to streaming smart links, PoolPlate background
4. Videos (/videos) - 3-column YouTube video grid with modal playback, PoolPlate background
5. About (/about) - full bio with portrait imagery
6. Fan Club (/fan-club) - Laylo signup embed (placeholder for now), PoolPlate background

## Home Page Structure
- Hero: full-bleed image slider, 3 slides, prev/next arrows, no text overlay (text is baked into the images). Desktop and mobile use different image files. Each slide links to a streaming smart link.
  - Slide 1 (High Pony): desktop MackenzieCarpenter_HighPony_DesktopHero.jpg, mobile MackenzieCarpenter_HighPony_MobileHero.jpg, links to https://mackenziecarpenter.ffm.to/highpony
  - Slide 2 (All In Already): desktop MackenzieCarpenter_AllInAlready_DesktopHero.jpg, mobile MackenzieCarpenter_AllInAlready_MobileHero.jpg, links to https://mackenziecarpenter.ffm.to/allinalready.OWE
  - Slide 3 (Drunk Cigs): desktop MackenzieCarpenter_DrunkCigs_DesktopHero.jpg, mobile MackenzieCarpenter_DrunkCigs_MobileHero.jpg, links to https://mackenziecarpenter.lnk.to/DrunkCigsWE
  - Banner files are in public/banners.
- About section: light cream (#F8DDCE) background, portrait image on left (rounded corners, MackenzieCarpenter_MirrorPlate.jpg in public/backgrounds), bio text on right, "About Mackenzie Carpenter" heading in Big Caslon. Use the short bio (first 3 paragraphs below).
- Parallax section: full-width fixed-attachment image, no content, MackenzieCarpenter_CloseUpPlate.JPG in public/backgrounds.
- Tour section: PoolPlate background (MackenzieCarpenter_PoolPlate.jpg, fixed attachment), Bandsintown widget showing upcoming dates, "Tour" heading in Big Caslon.

## Bio (full, for About page)
Raised in the small town of Hull, Georgia, Mackenzie Carpenter grew up writing songs with her brothers and singing in church, shaping a voice that felt honest before it ever felt polished. That foundation became the heartbeat of her debut album, Hey Country Queen, a 13-song introduction that blended humor, heartbreak, and sharp storytelling, earning more than 85 million streams and recognition as one of Holler's Best Country Albums of 2025. But if Country Queen was the crown, her next chapter is the aura.

Mackenzie's new releases mark an evolution that confidently wears a magnetic and contagious presence. It's the sound of a woman you notice before you understand why. Aspirational but undeniably human, close enough to recognize yourself in her, while luminous in a way that makes you fall in love with who you're becoming.

Still rooted in classic Country storytelling, this new project expands the atmosphere around it. The production feels warm and charming. The writing cuts deeper but lands softer, and a rare duality exists throughout. It's playful yet iconic, and grounded yet glowing. Mackenzie moves from barefoot honesty to center stage confidence without changing a single thing about who she is. This music leans into nuance: the tucked-hair glance, the laugh that spills out without apology, the ache beneath the wit. It feels like sunshine blended with a secret, both effortlessly cool and undeniably alluring.

Beyond her own artistry, Mackenzie continues shaping the next wave of Country music as a trusted co-writer behind Megan Moroney's "I'm Not Pretty," "Indifferent," the CMA-nominated "You Had To Be There" (with Kenny Chesney), and multiple tracks on Moroney's latest album. Her breakout duet "I Wish You Would" (ft. Midland) was hailed as one of 2025's most irresistible collaborations, cementing her as both a compelling voice and a sought-after pen. Named to MusicRow's 'Next Big Thing' Artists Class, Spotify's Hot Country Artists to Watch, and CMT's Next Women of Country, Carpenter has shared stages with Miranda Lambert, Jordan Davis, Parker McCollum and more, and continues into 2026 on select dates of Riley Green's Cowboy As It Gets Tour.

## Tour (Bandsintown)
Use the official Bandsintown widget. Artist ID: 15503409. app_id: umg_bigmachinelabelgroup_mackenziecarpenter. The widget renders live upcoming dates with Tickets and RSVP buttons. Do not hardcode dates.

## Music Releases (newest first, each links to smart link, cover in public/covers)
1. All In Already - MackenzieCarpenter_AllInAlready_Cover.jpg - https://mackenziecarpenter.ffm.to/allinalready.OWE
2. Drunk Cigs - MackenzieCarpenter_DrunkCigs_Cover.jpg - https://mackenziecarpenter.lnk.to/DrunkCigsWE
3. Hey Country Queen (album) - MackenzieCarpenter_HotCountryQueen_Cover.jpg - https://mackenzie.lnk.to/HeyCountryQueenWE
4. I Wish You Would (ft. Midland) - MackenzieCarpenter_IWishYouWould_Cover.jpg - https://mackenzie.lnk.to/IWishYouWouldWE
5. Dozen Red Flags - MackenzieCarpenter_DozenRedFlags_Cover.jpg - https://mackenzie.lnk.to/DozenRedFlagsWE
6. Boots On - MackenzieCarpenter_BootsOn_Cover.jpg - https://mackenzie.lnk.to/BootsOnWE
7. Only Girl - MackenzieCarpenter_OnlyGirl_Cover.jpg - https://mackenzie.lnk.to/OnlyGirlWE
8. Sound Of A Heartbreak - MackenzieCarpenter_SoundOfAHeartBreak_Cover.jpg - https://MackenzieCarpenter.lnk.to/SoundOfAHeartBreakWE
9. Country Girls (Just Wanna Have Fun) REMIX - MackenzieCarpenter_CountryGirlsRemix_Cover.jpg - https://mackenzie.lnk.to/CountryGirls_REMIXWE
10. Country Girls (Just Wanna Have Fun) - MackenzieCarpenter_CountryGirls_Cover.jpg - https://mackenzie.lnk.to/CountryGirlsWE
11. Mackenzie Carpenter EP - MackenzieCarpenter_EP_Cover.jpg - https://mackenzie.lnk.to/DebutEPWE
12. Don't Mess With Exes - MackenzieCarpenter_DontMessWithExes_Cover.jpg - https://mackenzie.lnk.to/DontMessWithExesWE
13. Jesus, I'm Jealous (Acoustic) - MackenzieCarpenter_JesusImJealousAccoustic_Cover.jpg - https://mackenzie.lnk.to/Jesus_AcousticWE
14. Jesus, I'm Jealous - MackenzieCarpenter_JesusImJealous_Cover.jpg - https://mackenzie.lnk.to/JesusWE
15. Huntin' Season (Acoustic) - MackenzieCarpenter_HuntinSeasonAccoustic_Cover.jpg - https://mackenzie.lnk.to/HuntinSeason_AcousticWE
16. Huntin' Season - MackenzieCarpenter_HuntinSeason_Cover.jpg - https://mackenzie.lnk.to/HuntinSeasonWE
17. Can't Nobody (Acoustic) - MackenzieCarpenter_CantNobodyAcoustic_Cover.jpg - https://mackenzie.lnk.to/CantNobody_AcousticWE
18. Can't Nobody - MackenzieCarpenter_CantNobody_Cover.jpg - https://lnk.to/CantNobodyWE
All release covers open in a new tab.

## Videos (newest first, YouTube, modal playback)
1. All In Already (Official Video) - tVf5CyQkwuQ
2. Drunk Cigs - B0xEZCRUrtU
3. Gone Fishing - WshkkG9oUnY
4. Country Queen - PHoRr4cw3LU
5. I Wish You Would ft. Midland - bdolHTaNDAg
6. Dozen Red Flags - Na5K6qQN1bw
7. Cowgirl Like Me (Lyric Video) - iWO0SHkVdKs
8. Red Wine Blue (Lyric Video) - spHcr4Ip6xM
9. The Other Side (Lyric Video) - LId-ce7UQ6w
10. Guys Like You (Lyric Video) - JTPOtyu-AC4
11. Boots On (Lyric Video) - PWrMDVcpv_k
12. Only Girl (Official Music Video) - 2mtBQigLBC4
13. Sound Of A Heartbreak (Lyric Video) - m2uA1oDe7HA
14. Country Girls (Just Wanna Have Fun) (Remix) - JjmSlqVOM68
15. Country Girls (Just Wanna Have Fun) (Official Music Video) - 61s35TCMOA4
16. Introducing Mackenzie Carpenter (The Short Film) - 91zPhArt6NE
17. Throw You Back - cEVVihU-D_k
18. Introducing Mackenzie Carpenter (The Interview) - -Ddhxj3Yzng
19. Don't Mess With Exes (Official Music Video) - aIQ_Fqsc720
20. Jesus, I'm Jealous - nnWpHsaF-4s
21. Huntin' Season (Official Music Video) - pOaumsPTIjk
22. Can't Nobody (Acoustic / Audio) - uibhxi1jraM
23. Can't Nobody (Lyric Video) - EMJoBoQmHrg
Use youtube-nocookie.com for embeds.

## Analytics
Google Tag Manager container: GTM-NNQ86MV. Add the GTM script to the document head and the noscript iframe after the opening body tag.

## Footer
Black background. Social icon row (same 8 platforms). Copyright line (plain text, not a link): "© Borchetta Entertainment Group, LLC d/b/a Big Machine Records." Legal links separated by slash dividers, all opening in new tabs: Terms (https://www.bigmachinerecords.com/terms), Do Not Sell My Personal Information (https://www.bigmachinerecords.com/privacy), Privacy (https://www.bigmachinerecords.com/privacy), Cookie Choices (https://www.bigmachinerecords.com/privacy). Switzer font, uppercase legal text.

## Design Direction
Sun-warmed, glowing, feminine, elegant country-pop. Big Caslon serif titles read editorial and aspirational. Generous full-bleed imagery with fixed-attachment parallax. Cream and off-white against black. Avoid generic web defaults: no pill buttons with gradients, no icon-in-circle service cards, no boxy card shadows. Buttons are flat, rectangular, cream-filled with dark text or transparent with cream text, matching the original (e.g. the Bandsintown "Track" button and Tour ticket buttons).
