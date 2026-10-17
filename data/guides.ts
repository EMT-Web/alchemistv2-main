// Travel guide hub pages (semantic SEO): each guide owns one topic, links to the
// tours and destination pages under it, and answers the questions people ask.
// Facts checked on 2026-10-17; sources are listed on each page.

export interface GuideTable {
  caption: string
  head: string[]
  rows: string[][]
  note?: string
}

export interface GuideSection {
  id: string
  h2: string
  html: string
  table?: GuideTable
}

export interface Guide {
  slug: string
  title: string
  seotitle: string
  seodescription: string
  tag: string
  heroIntro: string
  image: string
  imageAlt: string
  published: string
  updated: string
  answer: string
  sections: GuideSection[]
  toursHeading: string
  tourSlugs: string[]
  faqs: { question: string; answer: string }[]
  related: { text: string; href: string }[]
  sources: { text: string; href: string }[]
  mentions: { name: string; type: string; sameAs: string }[]
}

export const guides: Guide[] = [
  {
    slug: 'best-time-to-visit-morocco',
    title: 'Best Time to Visit Morocco: Month by Month Guide',
    seotitle: 'Best Time to Visit Morocco: Month by Month Guide',
    seodescription:
      'The best months to visit Morocco, with average temperatures for Marrakech, Fes, the Sahara and the coast, plus Ramadan 2027 dates and festivals.',
    tag: 'Morocco travel guide',
    heroIntro:
      'When to go for the imperial cities, the Sahara desert, the Atlas Mountains and the coast, from a local tour operator.',
    image: '/images/hero-bgs/chefchaouen2.jpg',
    imageAlt: 'Green hills and cloud covered peaks of the Rif Mountains near Chefchaouen, Morocco',
    published: '2026-10-17',
    updated: '2026-10-17',
    answer:
      'The best time to visit Morocco is spring (March to May) and autumn (September to November). Days are warm but not hot in Marrakech and Fes, the Sahara is comfortable for camel treks, and nights in the desert camps are cool rather than freezing. April and October are the two strongest months for a tour that combines cities, the Atlas Mountains and the desert.',
    sections: [
      {
        id: 'month-by-month',
        h2: 'Morocco weather month by month',
        html:
          '<p>Morocco has several climates in one country. The imperial cities have hot summers and mild winters, the Sahara swings between very hot days and cold nights, the High Atlas gets snow in winter, and the Atlantic coast stays mild all year. The table shows average daily highs and lows, so you can see how the same month feels in each region.</p>',
        table: {
          caption: 'Average daily high / low temperature in °C',
          head: ['Month', 'Marrakech', 'Fes', 'Merzouga (Sahara)', 'Essaouira (coast)', 'For a full tour'],
          rows: [
            ['January', '19 / 6', '16 / 4', '18 / 4', '18 / 11', 'Good, cold desert nights'],
            ['February', '21 / 8', '17 / 4', '20 / 7', '19 / 12', 'Good'],
            ['March', '24 / 10', '20 / 7', '24 / 11', '19 / 13', 'Excellent'],
            ['April', '26 / 12', '22 / 8', '29 / 15', '20 / 14', 'Excellent'],
            ['May', '29 / 15', '26 / 12', '34 / 20', '21 / 16', 'Very good'],
            ['June', '34 / 18', '31 / 15', '38 / 24', '21 / 17', 'Fair, hot in the desert'],
            ['July', '38 / 21', '35 / 18', '42 / 28', '22 / 18', 'Hot, best on the coast'],
            ['August', '37 / 21', '35 / 18', '41 / 27', '22 / 18', 'Hot, best on the coast'],
            ['September', '33 / 19', '30 / 16', '36 / 22', '23 / 18', 'Good'],
            ['October', '29 / 16', '26 / 13', '30 / 17', '22 / 17', 'Excellent'],
            ['November', '23 / 11', '20 / 8', '23 / 10', '21 / 14', 'Very good'],
            ['December', '20 / 7', '17 / 5', '18 / 5', '19 / 13', 'Good, cold desert nights'],
          ],
          note:
            'Marrakech, Fes and Essaouira: 1991 to 2020 climate normals. Merzouga: approximate averages. To convert, 20°C is 68°F, 30°C is 86°F and 40°C is 104°F.',
        },
      },
      {
        id: 'spring',
        h2: 'Spring (March to May): the best all round season',
        html:
          '<p>Spring is our favourite season for a first trip. Marrakech and Fes sit in the low to mid 20s °C (70s °F), the almond and orange trees are in flower, and the Atlas peaks still carry snow for the photos. In the <a href="/destinations/merzouga-sahara-desert">Sahara at Merzouga</a> the days are warm enough for the camel trek and the nights are comfortable around the camp fire.</p><p>May brings the rose harvest in the Dades Valley around Kelaat M&#39;Gouna, usually with its rose festival. By late May the desert is getting hot in the middle of the day, so camel treks move to sunrise and sunset.</p>',
      },
      {
        id: 'summer',
        h2: 'Summer (June to August): coast and mountains, short desert stays',
        html:
          '<p>Summer is hot inland. Marrakech averages about 38°C (100°F) in July and Merzouga often passes 40°C (104°F). You can still visit the desert, but plan one night instead of two, ride the camels at sunset and leave early in the morning. Air conditioned vehicles make the long drives comfortable.</p><p>The coast is the place to be. <a href="/destinations/essaouira-the-windy-coastal-city-of-morocco">Essaouira</a> stays around 22°C (72°F) all summer thanks to the Atlantic wind. June is also festival month: the Fes Festival of World Sacred Music (4 to 7 June in 2026) and the Gnaoua and World Music Festival in Essaouira (25 to 27 June in 2026).</p>',
      },
      {
        id: 'autumn',
        h2: 'Autumn (September to November): warm days, golden light',
        html:
          '<p>Autumn is the second best season and often quieter than spring. The summer heat breaks in September, and October is close to perfect everywhere: about 29°C (84°F) in Marrakech and 30°C (86°F) in the Sahara, with clear skies for stargazing. November is cooler and calmer, a great month for the imperial cities and the <a href="/destinations/chefchaouen-the-blue-pearl-city-of-morocco">blue streets of Chefchaouen</a>.</p><p>It is also date harvest season in the oases of the Draa and Ziz valleys, which you pass on the road to the desert.</p>',
      },
      {
        id: 'winter',
        h2: 'Winter (December to February): sunny days, cold nights',
        html:
          '<p>Winter days in Morocco are often sunny and pleasant, around 18 to 21°C (64 to 70°F) in Marrakech and the Sahara. The nights are the difference. Desert camps can drop close to freezing, and the riads in Fes and the mountains feel cold after dark, so bring warm layers. Good camps provide heavy blankets.</p><p>Snow falls on the High Atlas, which makes the drive over the <a href="/marrakech-to-merzouga">Tizi n&#39;Tichka pass</a> beautiful, and on rare days a storm closes the pass for a few hours. Christmas and New Year are busy, so book early for those dates.</p>',
      },
      {
        id: 'by-region',
        h2: 'The best time for each part of Morocco',
        html:
          '<ul><li><strong>Marrakech and Fes:</strong> March to May and September to November. Summer afternoons are hot, so plan the medina walks for the morning.</li><li><strong>The Sahara (Merzouga and Zagora):</strong> October to April. Read our <a href="/blog/best-time-to-visit-sahara-desert">best time to visit the Sahara</a> guide for the desert in detail.</li><li><strong>The High Atlas:</strong> April to October for hiking. Winter brings snow and closed high trails.</li><li><strong>The Atlantic coast:</strong> all year, and the best escape from the summer heat.</li><li><strong>Chefchaouen and the north:</strong> March to June and September to November. Winter is green but rainy.</li></ul>',
      },
      {
        id: 'ramadan',
        h2: 'Travelling during Ramadan',
        html:
          '<p>Ramadan 2027 is expected to begin around 5 or 6 February 2027 and end with Eid al Fitr around 6 or 7 March 2027. The exact dates depend on the sighting of the moon. You can travel normally during Ramadan: sites and tours run as usual, and restaurants for visitors stay open in the cities. Some cafes close during the day, the pace is slower in the afternoon, and the evenings come alive after sunset when families break the fast. Eating and drinking discreetly in public during the day is a kind gesture.</p>',
      },
    ],
    toursHeading: 'Tours that work well in spring and autumn',
    tourSlugs: [
      '3-days-sahara-tour-marrakech-to-fes-via-merzouga-morocco',
      '6-days-special-morocco-tour-from-casablanca',
      '7-days-marrakech-desert-tour',
      '8-days-imperial-sahara-desert-tour-from-marrakesh-to-tangier',
      '11-days-ideal-guided-tour-casablanca-to-marrakech',
      '13-days-supreme-guided-tour-from-casablanca-morocco',
    ],
    faqs: [
      {
        question: 'What is the best month to visit Morocco?',
        answer:
          'April and October are the best months for most travellers. Both have warm, sunny days in Marrakech and Fes, comfortable conditions in the Sahara and cool nights in the desert camps.',
      },
      {
        question: 'Is Morocco too hot in summer?',
        answer:
          'Inland Morocco is hot from June to August, with July averages around 38°C (100°F) in Marrakech and over 40°C (104°F) in the Sahara. Travel is still possible with early starts, air conditioned vehicles and one night in the desert. The Atlantic coast stays mild, around 22°C (72°F).',
      },
      {
        question: 'Is Morocco cold in winter?',
        answer:
          'Winter days are often sunny and mild, around 18 to 21°C (64 to 70°F) in Marrakech and the Sahara, but nights are cold. Desert camps can drop close to freezing and the High Atlas gets snow, so pack warm layers.',
      },
      {
        question: 'When is the best time to visit the Sahara desert in Morocco?',
        answer:
          'October to April is the best season for the Sahara. March, April, October and November give warm days and comfortable nights. December and January are good too but nights in camp are cold.',
      },
      {
        question: 'When is Ramadan in 2027?',
        answer:
          'Ramadan 2027 is expected to start around 5 or 6 February 2027 and end with Eid al Fitr around 6 or 7 March 2027, depending on the moon sighting. Tours and sites operate normally during Ramadan.',
      },
      {
        question: 'When is the rainy season in Morocco?',
        answer:
          'Most rain falls from November to March, mainly in the north and along the coast. Marrakech gets only about 220 mm of rain a year and the Sahara is dry almost all year.',
      },
    ],
    related: [
      { text: 'Best Time to Visit the Sahara Desert', href: '/blog/best-time-to-visit-sahara-desert' },
      { text: 'Imperial Cities of Morocco and the North', href: '/imperial-cities-of-morocco' },
      { text: 'Marrakech to Merzouga: Route Guide and Driving Times', href: '/marrakech-to-merzouga' },
      { text: 'What to Pack for a Sahara Desert Tour', href: '/blog/what-to-pack-sahara-desert-tour' },
      { text: '7 Day Morocco Itinerary: Marrakech to the Sahara', href: '/blog/7-day-morocco-itinerary-marrakech-to-sahara' },
    ],
    sources: [
      { text: 'Marrakesh climate data, 1991 to 2020 (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Marrakesh' },
      { text: 'Fez climate data, 1991 to 2020 (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Fez,_Morocco' },
      { text: 'Essaouira climate data, 1991 to 2020 (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Essaouira' },
      { text: 'Merzouga monthly temperatures (Best Date Weather)', href: 'https://bestdateweather.com/en/best-time-to-visit-merzouga' },
      { text: 'When is Ramadan 2027 (ConvertTime)', href: 'https://converttime.com/en/blog/when-is-ramadan-2027' },
      { text: '2026 festival calendar in Morocco (Hespress)', href: 'https://en.hespress.com/?p=138184' },
    ],
    mentions: [
      { name: 'Marrakesh', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Marrakesh' },
      { name: 'Fez', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Fez,_Morocco' },
      { name: 'Essaouira', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Essaouira' },
      { name: 'Erg Chebbi', type: 'Place', sameAs: 'https://en.wikipedia.org/wiki/Erg_Chebbi' },
    ],
  },
  {
    slug: 'marrakech-to-merzouga',
    title: 'Marrakech to Merzouga: Route Guide, Distance and Driving Times',
    seotitle: 'Marrakech to Merzouga: Distance, Driving Time and Route',
    seodescription:
      'Marrakech to Merzouga is about 560 km (348 miles) and 9 hours of driving. The route, stops, driving time per stage and how many days to take.',
    tag: 'Sahara route guide',
    heroIntro:
      'From Marrakech over the High Atlas to the Erg Chebbi dunes: the route, the stops and how to split the drive.',
    image: '/cms/21b97a43bc01a80f83acc204029f580c03013c6b.jpg',
    imageAlt: 'Camel caravan crossing the Erg Chebbi dunes at Merzouga, Morocco',
    published: '2026-10-17',
    updated: '2026-10-17',
    answer:
      'Marrakech to Merzouga is about 560 km (348 miles) by road, around 9 hours of driving without stops. With stops for Ait Ben Haddou, the gorges and lunch it becomes a 10 to 11 hour day, so most travellers split it over two days with a night in the Dades Valley, and take three days for the whole trip from Marrakech to the desert and on to Fes.',
    sections: [
      {
        id: 'route',
        h2: 'The route stage by stage',
        html:
          '<p>The classic road runs east from Marrakech on the N9 over the High Atlas, through Ouarzazate, along the Road of a Thousand Kasbahs to the Dades Valley and Tinghir, then across the plain to Erfoud and the dunes of Merzouga.</p>',
        table: {
          caption: 'Marrakech to Merzouga by stage',
          head: ['Stage', 'Distance', 'Driving time', 'Highlights'],
          rows: [
            ['Marrakech to Ait Ben Haddou', '185 km / 115 mi', 'approx. 3h30', "High Atlas, Tizi n'Tichka pass"],
            ['Ait Ben Haddou to Ouarzazate', '30 km / 19 mi', 'approx. 30 min', 'UNESCO ksar, film studios'],
            ['Ouarzazate to Boumalne Dades', '115 km / 71 mi', 'approx. 1h45', 'Skoura palm grove, Valley of Roses'],
            ['Boumalne Dades to Tinghir', '55 km / 34 mi', 'approx. 50 min', 'Dades Gorges, Todra Gorge'],
            ['Tinghir to Erfoud', '125 km / 78 mi', 'approx. 1h45', 'Desert plain, Jorf, fossils'],
            ['Erfoud to Merzouga', '50 km / 31 mi', 'approx. 40 min', 'Rissani, first view of Erg Chebbi'],
            ['Total', '560 km / 348 mi', 'approx. 9h', 'Without stops'],
          ],
          note:
            'Approximate road distances and driving times without stops. Side trips into the Dades and Todra gorges add about 50 km.',
        },
      },
      {
        id: 'stops',
        h2: 'What to see on the way',
        html:
          '<ul><li><strong>Tizi n&#39;Tichka pass:</strong> the highest paved road pass across the High Atlas, about 2,200 m (7,200 ft). Long quoted as 2,260 m, it was re-measured at 2,205 m in 2022. The road is winding but fully paved.</li><li><strong><a href="/destinations/ait-ben-haddou-unesco-world-heritage-site">Ait Ben Haddou</a>:</strong> the fortified mud brick ksar, a UNESCO World Heritage Site since 1987, where Gladiator and Lawrence of Arabia were filmed.</li><li><strong><a href="/destinations/ouarzazate-the-cinema-city-of-morocco">Ouarzazate</a>:</strong> the gateway to the desert, with the Taourirt Kasbah and the film studios.</li><li><strong>Skoura and the Valley of Roses:</strong> palm groves and kasbahs. The rose harvest around Kelaat M&#39;Gouna is in May.</li><li><strong><a href="/destinations/boumalne-dades-roses-valley">Dades Gorges</a>:</strong> red rock formations and the famous zigzag road. The best place to spend the night on the way.</li><li><strong>Todra Gorge:</strong> near Tinghir, with walls up to 400 m high and a narrow section only about 10 m wide that you can walk through.</li><li><strong>Erfoud and Rissani:</strong> fossil workshops and Rissani&#39;s traditional market, the last towns before the dunes.</li><li><strong><a href="/destinations/merzouga-sahara-desert">Merzouga and Erg Chebbi</a>:</strong> golden dunes about 28 km long and up to 150 m high, where you ride a camel to a desert camp for the night.</li></ul>',
      },
      {
        id: 'how-many-days',
        h2: 'How many days do you need?',
        html:
          '<p><strong>2 days:</strong> possible, with one long drive each way, but you see the stops only briefly. Our <a href="/tours/marrakech-to-merzouga-2-day-desert-adventure-in-morocco">2 day Marrakech to Merzouga tour</a> suits travellers short on time.</p><p><strong>3 days:</strong> the best balance. Day 1 Marrakech to the Dades Valley (about 330 km, 6h30), day 2 through Todra Gorge to Merzouga (about 280 km, 4h30) for a sunset camel ride, and day 3 on to Fes (about 470 km, 6h30) or back to Marrakech. See the <a href="/tours/3-days-sahara-tour-marrakech-to-fes-via-merzouga-morocco">3 day Sahara tour from Marrakech to Fes</a>.</p><p><strong>4 days or more:</strong> adds a full day in the desert, with a 4x4 tour around Erg Chebbi, nomad families and the Gnawa village of Khamlia, and a slower pace for photos.</p>',
      },
      {
        id: 'one-way',
        h2: 'Return to Marrakech or continue to Fes?',
        html:
          '<p>Merzouga sits between Marrakech and Fes, so many travellers do not go back the same way. Merzouga to Fes is about 470 km (292 miles), around 6h30 of driving through the Ziz Valley, Midelt and the cedar forests of Ifrane. Going on to Fes turns the desert trip into a crossing of Morocco and saves a day of repeated road. If your flight is from Marrakech, the return takes about 9 hours, or you can stop overnight in Ouarzazate or the Dades Valley.</p>',
      },
      {
        id: 'driving',
        h2: 'Self drive or private driver?',
        html:
          '<p>The roads are paved all the way and well maintained, so self drive is possible. The challenges are the long hours, the mountain curves on the Tichka pass, and finding the right camp on the edge of the dunes. With a private driver guide you can watch the landscapes, stop wherever you like, and arrive at the camp at the right time for the sunset camel ride. Choosing between the two big dune areas? Read <a href="/blog/merzouga-vs-zagora-sahara-desert-tour">Merzouga vs Zagora</a>.</p>',
      },
    ],
    toursHeading: 'Tours from Marrakech to Merzouga',
    tourSlugs: [
      'marrakech-to-merzouga-2-day-desert-adventure-in-morocco',
      '3-days-sahara-tour-marrakech-to-fes-via-merzouga-morocco',
      '4-days-tour-from-marrakech-to-fes-via-merzouga-morocco',
      '5-days-sahara-desert-tour',
      '7-days-marrakech-desert-tour',
      '8-days-imperial-sahara-desert-tour-from-marrakesh-to-tangier',
    ],
    faqs: [
      {
        question: 'How far is Merzouga from Marrakech?',
        answer:
          'Merzouga is about 560 km (348 miles) from Marrakech by road, via the Tizi n\'Tichka pass, Ouarzazate, the Dades Valley, Tinghir and Erfoud.',
      },
      {
        question: 'How long is the drive from Marrakech to Merzouga?',
        answer:
          'About 9 hours of driving without stops. With stops for sightseeing and lunch it takes 10 to 11 hours, which is why most tours split the drive over two days.',
      },
      {
        question: 'Can you go from Marrakech to Merzouga in one day?',
        answer:
          'Yes, it can be done in one long day, as on our 2 day tour, leaving Marrakech early in the morning. To enjoy the stops and arrive for the sunset camel ride without rushing, a night in the Dades Valley is better.',
      },
      {
        question: 'Where should I stop overnight between Marrakech and Merzouga?',
        answer:
          'The Dades Valley is the most popular stop, about 330 km (6h30 of driving) from Marrakech. It leaves about 280 km (4h30) for the next day, with time for Todra Gorge before the camel ride.',
      },
      {
        question: 'Is the road from Marrakech to Merzouga safe?',
        answer:
          'Yes. The road is paved and well maintained the whole way. The Tizi n\'Tichka pass is winding and in winter can close for a few hours after snow, so experienced drivers plan around the weather.',
      },
      {
        question: 'How far is Merzouga from Fes?',
        answer:
          'About 470 km (292 miles), around 6h30 of driving via Erfoud, the Ziz Valley, Midelt and Ifrane. Many tours go from Marrakech to Merzouga and continue to Fes.',
      },
    ],
    related: [
      { text: 'Best Time to Visit Morocco: Month by Month', href: '/best-time-to-visit-morocco' },
      { text: 'Merzouga vs Zagora: Which Sahara Desert Tour?', href: '/blog/merzouga-vs-zagora-sahara-desert-tour' },
      { text: 'Imperial Cities of Morocco and the North', href: '/imperial-cities-of-morocco' },
      { text: 'Ait Benhaddou and Ouarzazate Guide', href: '/blog/ait-benhaddou-ouarzazate-guide' },
      { text: 'Luxury vs Standard Desert Camps in Merzouga', href: '/blog/luxury-vs-standard-desert-camps-merzouga' },
    ],
    sources: [
      { text: "Tizi n'Tichka (Wikipedia)", href: 'https://en.wikipedia.org/wiki/Tizi_n%27Tichka' },
      { text: 'Erg Chebbi (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Erg_Chebbi' },
      { text: 'Ait Benhaddou (Wikipedia)', href: 'https://en.wikipedia.org/wiki/A%C3%AFt_Benhaddou' },
      { text: 'Todgha Gorge (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Todgha_Gorge' },
    ],
    mentions: [
      { name: 'Marrakesh', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Marrakesh' },
      { name: "Tizi n'Tichka", type: 'Place', sameAs: 'https://en.wikipedia.org/wiki/Tizi_n%27Tichka' },
      { name: 'Aït Benhaddou', type: 'LandmarksOrHistoricalBuildings', sameAs: 'https://en.wikipedia.org/wiki/A%C3%AFt_Benhaddou' },
      { name: 'Todgha Gorge', type: 'Place', sameAs: 'https://en.wikipedia.org/wiki/Todgha_Gorge' },
      { name: 'Erg Chebbi', type: 'Place', sameAs: 'https://en.wikipedia.org/wiki/Erg_Chebbi' },
    ],
  },
  {
    slug: 'imperial-cities-of-morocco',
    title: 'Imperial Cities of Morocco and the North: Fes, Meknes, Rabat, Chefchaouen and Tangier',
    seotitle: 'Imperial Cities of Morocco and the North: Travel Guide',
    seodescription:
      'Fes, Meknes, Rabat, Chefchaouen and Tangier: what to see, how many days to stay, driving times between the cities and the best route for the north.',
    tag: 'Morocco travel guide',
    heroIntro:
      'The medinas, palaces and blue streets of northern Morocco: what to see in each city and how to link them on one trip.',
    image: '/cms/2c630b9895e239daf4aaff6f684ea39be758cf7c.jpg',
    imageAlt: 'Blue painted streets and stairways of the Chefchaouen medina, northern Morocco',
    published: '2026-10-17',
    updated: '2026-10-17',
    answer:
      'The imperial cities of Morocco are Fes, Meknes, Rabat and Marrakech, the four cities that have served as royal capitals. In the north they combine naturally with Chefchaouen, the blue city in the Rif Mountains, and Tangier on the Strait of Gibraltar. Plan 5 to 6 days for the north: two nights in Fes, one or two in Chefchaouen, Meknes and the Roman ruins of Volubilis as a stop on the way, and half a day each in Rabat and Tangier.',
    sections: [
      {
        id: 'imperial-cities',
        h2: 'What are the imperial cities of Morocco?',
        html:
          '<p>Four cities have been the capital of Morocco under its different dynasties: <a href="/destinations/fes-fez-imperial-city-in-morocco">Fes</a>, <a href="/destinations/marrakesh-the-red-city-of-morocco">Marrakech</a>, <a href="/destinations/meknes-versailles-city-of-morocco">Meknes</a> and <a href="/destinations/rabat-the-capital-city-of-morocco">Rabat</a>. Each one kept the palaces, gates, mosques and walled medinas of its time as a capital, and all four are UNESCO World Heritage Sites. Three of them sit in the north, within a few hours of each other, which is why a tour of the imperial cities usually means the north of Morocco, with Marrakech visited on its own or at the end of a Sahara trip.</p>',
        table: {
          caption: 'The imperial cities at a glance',
          head: ['City', 'Capital under', 'UNESCO listed', 'Do not miss'],
          rows: [
            ['Fes', 'Idrisids from the 9th century, Marinids, Alawites', '1981 (medina)', 'Fes el Bali medina, Chouara tannery, Al Qarawiyyin'],
            ['Meknes', 'Moulay Ismail, from 1673', '1996', 'Bab Mansour gate, royal granaries'],
            ['Rabat', 'Alawites, capital since 1956', '2012', 'Kasbah of the Udayas, Hassan Tower'],
            ['Marrakech', 'Almoravids, Almohads, Saadians', '1985 (medina)', 'Jemaa el Fna, Bahia Palace'],
          ],
        },
      },
      {
        id: 'fes',
        h2: 'Fes: the spiritual and cultural heart',
        html:
          '<p>Fes el Bali, founded at the end of the 8th century by Idris I and Idris II, is one of the largest car free urban areas in the world and the most authentic medina in Morocco. Inside its walls you find the Al Qarawiyyin mosque and university, founded in 857 or 859 and described by UNESCO and Guinness World Records as the oldest existing university, the leather dyeing pits of the Chouara tannery, and the carved madrasas of Bou Inania and Al Attarine.</p><p>The medina is a maze of thousands of narrow lanes and it is easy to get lost, so a licensed local guide for the first day is worth it. <strong>Stay:</strong> two nights, with one full day for the medina.</p>',
      },
      {
        id: 'meknes-volubilis',
        h2: 'Meknes and Volubilis: palaces and Roman ruins',
        html:
          '<p>Meknes was the grand capital of Sultan Moulay Ismail, who made it his seat in 1673 and surrounded it with kilometres of walls, gates and granaries, which is why it is often called the Versailles of Morocco. The monumental Bab Mansour gate faces the square of El Hedim. About 30 km away, Volubilis holds the best preserved Roman ruins in Morocco, with mosaic floors still in place, and the holy town of Moulay Idriss sits on the hill beside it.</p><p><strong>Stay:</strong> no need to sleep here. Visit Meknes and Volubilis as a half day stop on the drive between Fes and Chefchaouen or Rabat.</p>',
      },
      {
        id: 'rabat',
        h2: 'Rabat: the modern capital',
        html:
          '<p>Rabat has been the capital of Morocco since independence in 1956 and is the calmest of the imperial cities. The Kasbah of the Udayas looks over the mouth of the Bou Regreg river with its blue and white lanes, and the unfinished Hassan Tower from the 12th century stands beside the Mausoleum of Mohammed V. <strong>Stay:</strong> half a day on the way between Casablanca and the north, or a night if you want a slower pace.</p>',
      },
      {
        id: 'chefchaouen',
        h2: 'Chefchaouen: the blue city of the Rif',
        html:
          '<p><a href="/destinations/chefchaouen-the-blue-pearl-city-of-morocco">Chefchaouen</a> was founded in 1471 as a small fortress in the Rif Mountains and is famous for its blue painted streets. Locals give several reasons for the blue, from keeping mosquitoes away to a symbol of the sky. It is a place to slow down: wander the medina, climb to the Spanish Mosque for the sunset view over the town, and if you have a full day, walk to the Akchour waterfalls in the national park nearby. <strong>Stay:</strong> one night at least, two if you want a day of hiking.</p>',
      },
      {
        id: 'tangier',
        h2: 'Tangier: the gateway to Africa',
        html:
          '<p><a href="/destinations/tangier-the-bride-of-the-north">Tangier</a> faces Spain across the Strait of Gibraltar and is the arrival point for travellers coming by ferry or flying into the north. See the kasbah and the old medina, Cap Spartel where the Atlantic meets the Mediterranean, and the Caves of Hercules. The white medina of Tetouan, a UNESCO site since 1997, is on the road to Chefchaouen. Since 2018 the Al Boraq high speed train has linked Tangier with Rabat and Casablanca, with Tangier to Casablanca in a little over two hours. <strong>Stay:</strong> half a day to one night.</p>',
      },
      {
        id: 'route',
        h2: 'Driving times between the cities',
        html:
          '<p>The cities of the north are close together, so most days have between one and five hours of driving. These are the legs used on our tours.</p>',
        table: {
          caption: 'Driving distances and times in northern Morocco',
          head: ['Route', 'Distance', 'Driving time', 'Stops on the way'],
          rows: [
            ['Casablanca to Rabat', '90 km / 56 mi', 'approx. 1h15', 'Hassan II Mosque before leaving'],
            ['Casablanca to Chefchaouen via Rabat', '330 km / 205 mi', 'approx. 4h30', 'Rabat, Rif Mountains'],
            ['Tangier to Chefchaouen via Tetouan', '120 km / 75 mi', 'approx. 2h15', 'Tetouan medina'],
            ['Chefchaouen to Fes via Volubilis and Meknes', '260 km / 162 mi', 'approx. 4h30', 'Volubilis, Moulay Idriss, Meknes'],
            ['Fes to Meknes', '60 km / 37 mi', 'approx. 1h', 'Bab Mansour, royal granaries'],
            ['Fes to Rabat', '200 km / 124 mi', 'approx. 2h30', 'Meknes on the way'],
            ['Fes to Merzouga (Sahara)', '470 km / 292 mi', 'approx. 6h30', 'Ifrane, Middle Atlas cedar forest, Midelt'],
          ],
          note: 'Approximate road distances and driving times without stops.',
        },
      },
      {
        id: 'itinerary',
        h2: 'How to plan the north: sample routes',
        html:
          '<ul><li><strong>From Casablanca (6 days):</strong> Casablanca, Rabat, Chefchaouen (2 nights), Volubilis and Meknes, Fes (2 nights), back to Casablanca. See the <a href="/tours/6-days-imperial-cities-tour-from-casablanca">6 day Imperial Cities tour from Casablanca</a>.</li><li><strong>From Tangier (5 days):</strong> Tangier, Tetouan, Chefchaouen, Volubilis and Meknes, Fes (2 nights), Rabat, back to Tangier via Asilah. See the <a href="/tours/5-days-morocco-tour-via-tangier-chefchaouen-fes-rabat">5 day tour from Tangier</a>.</li><li><strong>The north and the Sahara (7 to 11 days):</strong> after Fes, continue south to the <a href="/marrakech-to-merzouga">Merzouga dunes</a> and finish in Marrakech, a complete crossing of Morocco.</li></ul><p>Spring and autumn are the best seasons for the north. Winter is green but rainy around Chefchaouen and Tangier. See <a href="/best-time-to-visit-morocco">the best time to visit Morocco</a> for each month.</p>',
      },
    ],
    toursHeading: 'Tours of the imperial cities and the north',
    tourSlugs: [
      '5-days-morocco-tour-via-tangier-chefchaouen-fes-rabat',
      '6-days-imperial-cities-tour-from-casablanca',
      '7-days-morocco-sahara-desert-tour-from-tangier-to-marrakesh',
      '8-days-imperial-sahara-desert-tour-from-marrakesh-to-tangier',
      '9-days-desert-tour-casablanca-to-marrakech-via-chefchaouen',
      '11-days-special-morocco-tour-from-tangier-to-marrakech',
    ],
    faqs: [
      {
        question: 'What are the four imperial cities of Morocco?',
        answer:
          'Fes, Meknes, Rabat and Marrakech. Each has been the royal capital of Morocco under a different dynasty, and each is a UNESCO World Heritage Site.',
      },
      {
        question: 'How many days do you need for the imperial cities?',
        answer:
          'Plan 5 to 6 days for Fes, Meknes, Rabat, Chefchaouen and Tangier: two nights in Fes, one or two in Chefchaouen, and Meknes, Volubilis, Rabat and Tangier as half day visits. Add 3 days if you want to include the Sahara and finish in Marrakech.',
      },
      {
        question: 'Is Chefchaouen worth visiting?',
        answer:
          'Yes. Chefchaouen is one of the most photographed towns in Morocco for its blue streets, and it is relaxed and easy to walk. Stay at least one night so you see it in the quiet of the morning and evening, after the day visitors leave.',
      },
      {
        question: 'How far is Chefchaouen from Fes?',
        answer:
          'About 200 km (124 miles), around 3h45 of driving on the direct road. Via Volubilis and Meknes it is about 260 km (162 miles) and 4h30 of driving, the route most tours take.',
      },
      {
        question: 'Fes or Marrakech: which is better?',
        answer:
          'Both are worth it and feel different. Fes has the larger, older and more traditional medina with its craftsmen and tanneries. Marrakech is livelier, with the Jemaa el Fna square, gardens and palaces, and is the starting point for the Atlas and the Sahara. Most tours include both.',
      },
      {
        question: 'Can I start a Morocco tour in Tangier?',
        answer:
          'Yes. Tangier is an easy start if you arrive by ferry from Spain or fly into the north. Tours from Tangier go to Chefchaouen, Fes and the Sahara and can finish in Marrakech for your flight home.',
      },
    ],
    related: [
      { text: 'Best Time to Visit Morocco: Month by Month', href: '/best-time-to-visit-morocco' },
      { text: 'Marrakech to Merzouga: Route Guide and Driving Times', href: '/marrakech-to-merzouga' },
      { text: 'Chefchaouen Day Trip from Marrakech', href: '/blog/chefchaouen-day-trip-from-marrakech' },
      { text: 'Exploring the Rich History of Moroccan Architecture', href: '/blog/exploring-the-rich-history-of-moroccan-architecture' },
    ],
    sources: [
      { text: 'Imperial cities of Morocco (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Imperial_cities_of_Morocco' },
      { text: 'World Heritage Sites in Morocco (Wikipedia)', href: 'https://en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_Morocco' },
      { text: 'University of al Qarawiyyin (Wikipedia)', href: 'https://en.wikipedia.org/wiki/University_of_al-Qarawiyyin' },
      { text: 'Chefchaouen (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Chefchaouen' },
      { text: 'Al Boraq high speed train (Wikipedia)', href: 'https://en.wikipedia.org/wiki/Al_Boraq' },
    ],
    mentions: [
      { name: 'Fez', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Fez,_Morocco' },
      { name: 'Meknes', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Meknes' },
      { name: 'Rabat', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Rabat' },
      { name: 'Chefchaouen', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Chefchaouen' },
      { name: 'Tangier', type: 'City', sameAs: 'https://en.wikipedia.org/wiki/Tangier' },
      { name: 'Volubilis', type: 'LandmarksOrHistoricalBuildings', sameAs: 'https://en.wikipedia.org/wiki/Volubilis' },
    ],
  },
]

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug)
