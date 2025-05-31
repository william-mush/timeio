export const sections = [
  {
    id: 'ancient',
    title: 'Ancient Timekeeping',
    content: [
      {
        title: 'Ancient Egyptian Sundials',
        imageKey: 'sundial',
        description: `The ancient Egyptian sundial represents one of humanity's earliest attempts at measuring time. These sophisticated instruments used the sun's position to track hours, with the earliest examples dating back to around 3500 BCE. Egyptian sundials were typically made of stone or bronze, featuring a gnomon (the part that casts the shadow) and carefully marked hour lines. They were often placed in temple courtyards and public spaces, serving both practical and religious purposes. The Egyptians' understanding of astronomy and geometry allowed them to create increasingly accurate sundials, with some models accounting for seasonal variations in the sun's path.`,
        period: '3500 BCE - Present',
        keyPoints: [
          'First used in ancient Egypt around 3500 BCE',
          'Used for religious ceremonies and daily timekeeping',
          'Featured sophisticated geometric designs',
          'Some models accounted for seasonal variations',
          'Often placed in temple courtyards',
          'Influenced sundial designs throughout history'
        ],
        technicalDetails: {
          accuracy: '±15-30 minutes depending on season',
          materials: 'Limestone, bronze, granite',
          variations: 'Horizontal, vertical, and equatorial designs'
        },
        slug: 'ancient-egyptian-sundials'
      },
      {
        title: 'Greek Water Clocks (Clepsydra)',
        imageKey: 'waterClock',
        description: `The Greek water clock, or clepsydra, was a sophisticated timekeeping device that used the steady flow of water to measure time intervals. Developed around 400 BCE, these clocks were particularly important for timing speeches in courts and public assemblies. The design typically consisted of a container with a small hole at the bottom, allowing water to flow at a constant rate. As the water level dropped, it would indicate the passage of time. Some advanced models included mechanisms to maintain constant water pressure and even featured moving figures or sound effects to mark the hours.`,
        period: '400 BCE - 1600 CE',
        keyPoints: [
          'Used for timing speeches in courts',
          'Featured constant-flow mechanisms',
          'Some models included moving figures',
          'Could measure time at night',
          'Used in public assemblies',
          'Influenced later mechanical clocks'
        ],
        technicalDetails: {
          accuracy: '±15 minutes per hour',
          materials: 'Bronze, clay, stone',
          variations: 'Simple outflow, constant-flow, and complex mechanical designs'
        },
        slug: 'greek-water-clocks'
      },
      {
        title: 'Medieval Candle Clocks',
        imageKey: 'candleClock',
        description: `Medieval candle clocks were ingenious timekeeping devices that used the steady burning of marked candles to measure time. Popular in Europe during the Middle Ages, these clocks were particularly useful for nighttime timekeeping and in monasteries for regulating prayer schedules. The candles were marked with evenly spaced lines, and as they burned, the passage of time could be tracked. Some sophisticated versions included metal balls that would drop onto a metal plate as the candle burned through specific points, creating an audible signal.`,
        period: '900 CE - 1500 CE',
        keyPoints: [
          'Used in monasteries for prayer schedules',
          'Featured marked intervals on candles',
          'Some included metal balls for audible signals',
          'Could measure time at night',
          'Used in homes and churches',
          'Simple but effective design'
        ],
        technicalDetails: {
          accuracy: '±10-15 minutes per hour',
          materials: 'Beeswax, tallow, metal',
          variations: 'Simple marked candles, mechanical ball-dropping designs'
        },
        slug: 'medieval-candle-clocks'
      },
      {
        title: 'Chinese Incense Clocks',
        imageKey: 'incenseClock',
        description: `Chinese incense clocks were elegant timekeeping devices that used the steady burning of incense to measure time. Developed during the Song Dynasty, these clocks combined practical timekeeping with aesthetic beauty. The design typically featured a wooden frame with marked incense sticks or coils that would burn at a constant rate. Some sophisticated models included bells that would ring at specific intervals, and others used different types of incense to mark different periods of the day. These clocks were particularly popular in temples, palaces, and wealthy households.`,
        period: '960 CE - 1600 CE',
        keyPoints: [
          'Originated in China during the Song Dynasty',
          'Used marked incense sticks and coils',
          'Some included bells for time signals',
          'Combined timekeeping with religious practices',
          'Could measure long periods accurately',
          'Used in temples, palaces, and homes'
        ],
        technicalDetails: {
          accuracy: '±5-10 minutes per hour',
          materials: 'Incense, wood, and metal',
          variations: 'Stick, coil, and mechanical designs'
        },
        slug: 'chinese-incense-clocks'
      }
    ]
  },
  {
    id: 'mechanical',
    title: 'Mechanical Timekeeping',
    content: [
      {
        title: 'First Mechanical Clocks',
        imageKey: 'mechanicalClock',
        description: `The first mechanical clocks emerged in Europe during the 13th century, marking a revolutionary advancement in timekeeping technology. These early clocks used a system of weights and gears to drive their mechanisms, with the first examples appearing in monasteries and cathedrals. The design typically featured a large clock face with a single hand that moved around a dial marked with hours. These clocks were often installed in towers and served as public timekeepers for entire communities. The development of the escapement mechanism was crucial to their accuracy and reliability.`,
        period: '1200 CE - 1600 CE',
        keyPoints: [
          'First appeared in European monasteries',
          'Used weight-driven mechanisms',
          'Featured single-handed dials',
          'Installed in church towers',
          'Served as public timekeepers',
          'Led to more accurate timekeeping'
        ],
        technicalDetails: {
          accuracy: '±30 minutes per day',
          materials: 'Iron, brass, wood',
          variations: 'Tower clocks, wall clocks, and portable designs'
        },
        slug: 'first-mechanical-clocks'
      },
      {
        title: 'Pendulum Clocks',
        imageKey: 'pendulumClock',
        description: `The invention of the pendulum clock by Christiaan Huygens in 1656 revolutionized timekeeping accuracy. These clocks used the regular swinging motion of a pendulum to regulate the movement of the clock's gears, resulting in much more precise timekeeping than previous mechanical clocks. The pendulum's natural frequency provided a reliable time base, and the design was quickly adopted for both domestic and scientific use. Pendulum clocks remained the most accurate timekeeping devices until the development of quartz clocks in the 20th century.`,
        period: '1656 - 1950 CE',
        keyPoints: [
          'Invented by Christiaan Huygens',
          'Used pendulum for time regulation',
          'Much more accurate than previous clocks',
          'Used in homes and observatories',
          'Led to standardized time zones',
          'Influenced clock design for centuries'
        ],
        technicalDetails: {
          accuracy: '±1 minute per day',
          materials: 'Brass, steel, wood, glass',
          variations: 'Grandfather clocks, wall clocks, and precision regulators'
        },
        slug: 'pendulum-clocks'
      },
      {
        title: 'Pocket Watches',
        imageKey: 'pocketWatch',
        description: `Pocket watches emerged in the 16th century as the first truly portable timekeeping devices. Initially worn as pendants, they evolved into the familiar pocket watch design by the 17th century. These watches were initially luxury items, often elaborately decorated and worn as status symbols. The development of the balance spring in 1675 greatly improved their accuracy, and by the 19th century, they had become essential tools for navigation, railway operations, and daily life. The craftsmanship involved in creating these watches led to many innovations in watchmaking.`,
        period: '1500 CE - 1950 CE',
        keyPoints: [
          'First portable timekeeping devices',
          'Initially luxury status symbols',
          'Crucial for navigation and railways',
          'Featured intricate craftsmanship',
          'Led to watchmaking innovations',
          'Influenced modern wristwatch design'
        ],
        technicalDetails: {
          accuracy: '±1-2 minutes per day',
          materials: 'Gold, silver, brass, steel',
          variations: 'Lever, cylinder, and chronometer escapements'
        },
        slug: 'pocket-watches'
      }
    ]
  },
  {
    id: 'modern',
    title: 'Modern Timekeeping',
    content: [
      {
        title: 'Atomic Clocks',
        imageKey: 'atomicClock',
        description: `Atomic clocks represent the pinnacle of timekeeping accuracy, using the vibrations of atoms (typically cesium or rubidium) to keep time. The first atomic clock was built in 1949, and they have since become the standard for defining the second. These incredibly precise devices are used in GPS systems, telecommunications, and scientific research. The NIST-F1 cesium atomic clock, for example, is accurate to within one second over 100 million years. Atomic clocks have revolutionized our understanding of time and enabled technologies that require extreme precision.`,
        period: '1949 - Present',
        keyPoints: [
          'Use atomic vibrations for timekeeping',
          'Most accurate timekeeping devices',
          'Define the international second',
          'Used in GPS and telecommunications',
          'Enable precise scientific measurements',
          'Crucial for modern technology'
        ],
        technicalDetails: {
          accuracy: '±1 second in 100 million years',
          materials: 'Cesium/rubidium atoms, electronics, vacuum chambers',
          variations: 'Cesium, rubidium, and hydrogen maser designs'
        },
        slug: 'atomic-clocks'
      },
      {
        title: 'Time Zone Maps',
        imageKey: 'timeZones',
        description: `Time zone maps emerged in the late 19th century as a solution to the challenges of coordinating time across different regions. The system divides the world into 24 time zones, each roughly 15 degrees of longitude wide. This standardization was crucial for the development of global transportation, communication, and commerce. Modern time zone maps are digital and interactive, showing real-time differences between regions and helping coordinate activities across the globe. They are essential tools for international business, travel, and communication.`,
        period: '1884 - Present',
        keyPoints: [
          'Standardized global timekeeping',
          'Divided world into 24 zones',
          'Based on longitude lines',
          'Essential for global travel',
          'Used in international business',
          'Adapted for daylight saving time'
        ],
        technicalDetails: {
          accuracy: 'Exact to the second',
          materials: 'Digital displays, interactive interfaces',
          variations: 'Static maps, interactive applications, and real-time displays'
        },
        slug: 'time-zone-maps'
      },
      {
        title: 'Digital Clocks',
        imageKey: 'digitalClock',
        description: `Digital clocks emerged in the 1970s as a result of the quartz revolution in timekeeping. These clocks use electronic displays to show time in numerical format, typically using LED or LCD technology. They are more accurate than mechanical clocks and can include additional features like alarms, timers, and calendar functions. Digital clocks have become ubiquitous in modern life, appearing in everything from smartphones to household appliances. Their development has been closely tied to advances in electronics and display technology.`,
        period: '1970s - Present',
        keyPoints: [
          'Based on quartz crystal technology',
          'More accurate than mechanical clocks',
          'Led to modern digital displays',
          'Integrated into many devices',
          'Affordable and reliable',
          'Features include alarms and world time'
        ],
        technicalDetails: {
          accuracy: '±15-30 seconds per month',
          materials: 'Quartz crystal, electronics, LCD/LED displays',
          variations: 'Standalone clocks, watches, and integrated devices'
        },
        slug: 'digital-clocks'
      }
    ]
  }
]; 