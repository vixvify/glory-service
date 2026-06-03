export const categories = [
  "Action",
  "Sci-Fi",
  "Horror",
  "Comedy",
  "Thriller",
  "Drama",
  "Romance",
  "Adventure",
  "Fantasy",
  "Animation",
  "Biography",
  "Documentary",
  "Family",
  "Music",
  "Mystery",
  "Sport",
  "Western",
];

export const ageRatings = ["G", "PG", "PG-13", "NC-17", "R"];

export const universities = [
  "จุฬาลงกรณ์มหาวิทยาลัย",
  "มหาวิทยาลัยธรรมศาสตร์",
  "มหาวิทยาลัยมหิดล",
  "มหาวิทยาลัยเกษตรศาสตร์",
  "มหาวิทยาลัยเชียงใหม่",
  "มหาวิทยาลัยขอนแก่น",
  "มหาวิทยาลัยสงขลานครินทร์",
  "มหาวิทยาลัยบูรพา",
  "มหาวิทยาลัยศรีนครินทรวิโรฒ",
  "มหาวิทยาลัยศิลปากร",
  "มหาวิทยาลัยนเรศวร",
  "มหาวิทยาลัยแม่ฟ้าหลวง",
  "มหาวิทยาลัยแม่โจ้",
  "มหาวิทยาลัยอุบลราชธานี",
  "มหาวิทยาลัยวลัยลักษณ์",
  "มหาวิทยาลัยสุโขทัยธรรมาธิราช",
  "มหาวิทยาลัยรามคำแหง",
  "มหาวิทยาลัยสุรนารี",
  "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
  "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
  "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
  "มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี",
  "มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ",
  "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร",
  "มหาวิทยาลัยกรุงเทพ",
  "มหาวิทยาลัยหอการค้าไทย",
  "มหาวิทยาลัยอัสสัมชัญ",
  "มหาวิทยาลัยธุรกิจบัณฑิตย์",
  "มหาวิทยาลัยรังสิต",
  "มหาวิทยาลัยศรีปทุม",
  "มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ",
  "มหาวิทยาลัยสยาม",
  "มหาวิทยาลัยกรุงเทพธนบุรี",
  "มหาวิทยาลัยนอร์ทกรุงเทพ",
  "มหาวิทยาลัยพายัพ",
  "มหาวิทยาลัยวงษ์ชวลิตกุล",
  "มหาวิทยาลัยอีสเทิร์นเอเชีย",
  "มหาวิทยาลัยเวสเทิร์น",
  "มหาวิทยาลัยฟาร์อีสเทอร์น",
  "มหาวิทยาลัยราชภัฏสวนสุนันทา",
  "มหาวิทยาลัยราชภัฏสวนดุสิต",
  "มหาวิทยาลัยราชภัฏเชียงใหม่",
  "มหาวิทยาลัยราชภัฏนครราชสีมา",
  "มหาวิทยาลัยราชภัฏอุบลราชธานี",
  "มหาวิทยาลัยราชภัฏสงขลา",
  "มหาวิทยาลัยราชภัฏบุรีรัมย์",
  "มหาวิทยาลัยราชภัฏพระนคร",
  "มหาวิทยาลัยราชภัฏธนบุรี",
  "มหาวิทยาลัยราชภัฏจันทรเกษม",
  "มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา",
];

export const languages = ["ไทย", "อังกฤษ", "เกาหลี", "ญี่ปุ่น", "จีน"];

export const targetGroups = ["เด็กและครอบครัว", "วัยรุ่น", "ผู้ใหญ่", "ทั่วไป"];

export interface SeedCrewMember {
  name: string;
  photoUrl?: string;
}

export interface SeedMovie {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string;
  category: string;
  matchRate?: number;
  year: number;
  duration: number;
  views?: number;
  ageRating?: string;
  university?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  language?: string;
  targetGroup?: string;
  crew?: {
    create: {
      director?: SeedCrewMember | SeedCrewMember[] | string;
      producer?: SeedCrewMember | SeedCrewMember[] | string;
      writer?: SeedCrewMember | SeedCrewMember[] | string;
      cast?: SeedCrewMember[] | string[];
      btsVideo?: string;
      btsPhotos?: string[] | string;
    };
  };
}

export const seedMovies: SeedMovie[] = [
  {
    title: "The Dark Knight",
    description:
      "เมื่อโจ๊กเกอร์อาชญากรสุดอันตรายสร้างความโกลาหลให้เมืองก็อตแธม แบทแมนต้องเผชิญบททดสอบทั้งร่างกายและจิตใจครั้งใหญ่ในการปกป้องความยุติธรรม",
    thumbnail:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    category: "Action",
    matchRate: 98,
    year: 2008,
    duration: 152,
    views: 1250000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",
    facebook: "https://facebook.com/thedarkknight",
    instagram: "https://instagram.com/thedarkknight",
    email: "darkknight@movies.com",
    language: "อังกฤษ",
    targetGroup: "ผู้ใหญ่",
    crew: {
      create: {
        director: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Emma Thomas",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jonathan Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Christopher Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Christian Bale",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Heath Ledger",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Aaron Eckhart",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0",
        ],
      },
    },
  },
  {
    title: "Avengers: Endgame",
    description:
      "หลังเหตุการณ์ทำลายล้างจากธานอส เหล่าอเวนเจอร์ที่เหลือต้องรวมพลังอีกครั้งเพื่อกอบกู้จักรวาลและย้อนคืนทุกสิ่ง",
    thumbnail:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    category: "Action",
    matchRate: 96,
    year: 2019,
    duration: 181,
    views: 3500000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/avengers-endgame",
    instagram: "https://instagram.com/avengers-endgame",
    email: "avengers-endgame@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: [
          {
            name: "Anthony Russo",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Joe Russo",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        producer: {
          name: "Kevin Feige",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Christopher Markus",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Stephen McFeely",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Robert Downey Jr.",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Chris Evans",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Mark Ruffalo",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1635805737707-575885ab0820",
        ],
      },
    },
  },
  {
    title: "Gladiator",
    description:
      "อดีตนายพลโรมันออกเดินทางล้างแค้นจักรพรรดิผู้โหดเหี้ยมที่ฆ่าครอบครัวของเขาและส่งเขาไปเป็นทาส",
    thumbnail:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=P5ieIbInFpg",
    category: "Action",
    matchRate: 93,
    year: 2000,
    duration: 155,
    views: 1400000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/gladiator",
    instagram: "https://instagram.com/gladiator",
    email: "gladiator@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Ridley Scott",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Douglas Wick",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "David Franzoni",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "John Logan",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Russell Crowe",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Joaquin Phoenix",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Connie Nielsen",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=1F7771Zf3uE",
        btsPhotos: [
          "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
        ],
      },
    },
  },
  {
    title: "Mad Max: Fury Road",
    description:
      "หญิงสาวผู้กล้าหาญร่วมมือกับแม็กซ์เพื่อหลบหนีจากทรราชในโลกหลังหายนะอันโหดร้าย",
    thumbnail:
      "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
    category: "Action",
    matchRate: 94,
    year: 2015,
    duration: 120,
    views: 1100000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/mad-max-fury-road",
    instagram: "https://instagram.com/mad-max-fury-road",
    email: "mad-max-fury-road@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "George Miller",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Doug Mitchell",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "George Miller",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "George Miller",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Brendan McCarthy",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Tom Hardy",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Charlize Theron",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Nicholas Hoult",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1514539079130-25950c84af65",
        ],
      },
    },
  },
  {
    title: "Black Panther",
    description:
      "ทีชัลลา ราชาแห่งวากานด้า ต้องก้าวขึ้นเป็นผู้นำคนใหม่และเผชิญหน้ากับศัตรูจากอดีตของอาณาจักร",
    thumbnail:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
    category: "Action",
    matchRate: 91,
    year: 2018,
    duration: 134,
    views: 1700000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/black-panther",
    instagram: "https://instagram.com/black-panther",
    email: "black-panther@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Ryan Coogler",
          photoUrl:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Kevin Feige",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Ryan Coogler",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Joe Robert Cole",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Chadwick Boseman",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michael B. Jordan",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lupita Nyong'o",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1534447677768-be436bb09401",
        ],
      },
    },
  },
  {
    title: "Spider-Man: No Way Home",
    description:
      "เมื่อความลับของสไปเดอร์แมนถูกเปิดเผย ปีเตอร์ ปาร์คเกอร์ต้องเผชิญหน้าศัตรูจากต่างมิติ",
    thumbnail:
      "https://images.unsplash.com/photo-1634828221818-503587f33d02?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    category: "Action",
    matchRate: 94,
    year: 2021,
    duration: 148,
    views: 2200000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/spider-man-no-way-home",
    instagram: "https://instagram.com/spider-man-no-way-home",
    email: "spider-man-no-way-home@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Jon Watts",
          photoUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Kevin Feige",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Amy Pascal",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Chris McKenna",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Erik Sommers",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Tom Holland",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Zendaya",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Benedict Cumberbatch",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1634828221818-503587f33d02",
        ],
      },
    },
  },
  {
    title: "John Wick",
    description:
      "อดีตนักฆ่าฝีมือพระกาฬหวนคืนวงการเพื่อทวงแค้นกลุ่มมาเฟียรัสเซียที่ทำลายสิ่งสำคัญชิ้นสุดท้ายในชีวิต",
    thumbnail:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    category: "Action",
    matchRate: 95,
    year: 2014,
    duration: 101,
    views: 1850000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/john-wick",
    instagram: "https://instagram.com/john-wick",
    email: "john-wick@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Chad Stahelski",
          photoUrl:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Basil Iwanyk",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Derek Kolstad",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Keanu Reeves",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michael Nyqvist",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Alfie Allen",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5",
        ],
      },
    },
  },
  {
    title: "Mission: Impossible - Fallout",
    description:
      "อีธาน ฮันท์และทีมงานต้องแข่งกับเวลาเพื่อยับยั้งระเบิดนิวเคลียร์ หลังภารกิจรวบรวมพลูโตเนียมเกิดความผิดพลาด",
    thumbnail:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=wb49-oV0F78",
    category: "Action",
    matchRate: 97,
    year: 2018,
    duration: 147,
    views: 1950000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/mission-impossible-fallout",
    instagram: "https://instagram.com/mission-impossible-fallout",
    email: "mission-impossible-fallout@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Christopher McQuarrie",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Tom Cruise",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jake Myers",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: {
          name: "Christopher McQuarrie",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Tom Cruise",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Henry Cavill",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ving Rhames",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1533105079780-92b9be482077",
        ],
      },
    },
  },
  {
    title: "Top Gun: Maverick",
    description:
      "มาเวอริค นักบินขับไล่ระดับตำนานกลับมาฝึกสอนนักบินรุ่นใหม่เพื่อภารกิจเสี่ยงตายขั้นสุดยอด",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=giXcoYmTfbQ",
    category: "Action",
    matchRate: 98,
    year: 2022,
    duration: 130,
    views: 2900000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/top-gun-maverick",
    instagram: "https://instagram.com/top-gun-maverick",
    email: "top-gun-maverick@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Joseph Kosinski",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Jerry Bruckheimer",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Tom Cruise",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Ehren Kruger",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Eric Warren Singer",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Tom Cruise",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Miles Teller",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jennifer Connelly",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
        ],
      },
    },
  },
  {
    title: "The Matrix Resurrections",
    description:
      "นีโอหลุดกลับไปอยู่ในโลกจำลองที่คุ้นเคยอีกครั้ง และต้องเลือกระหว่างความจริงอันเจ็บปวดหรือความฝันที่สุขสบาย",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=9ix7TMcY-Dw",
    category: "Action",
    matchRate: 85,
    year: 2021,
    duration: 148,
    views: 1200000,
    ageRating: "R",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/the-matrix-resurrections",
    instagram: "https://instagram.com/the-matrix-resurrections",
    email: "the-matrix-resurrections@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Lana Wachowski",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "James McTeigue",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Lana Wachowski",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "David Mitchell",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Keanu Reeves",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Carrie-Anne Moss",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Yahya Abdul-Mateen II",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=u8M3z0gHk3c",
        btsPhotos: [
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        ],
      },
    },
  },

  // ==================== SCI-FI (10) ====================
  {
    title: "Inception",
    description:
      "หัวขโมยผู้เชี่ยวชาญด้านการแทรกซึมความฝันได้รับภารกิจปลูกฝังความคิดในจิตใจของซีอีโอ แต่เรื่องราวในอดีตของเขาอาจทำให้ทุกอย่างล้มเหลว",
    thumbnail:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    category: "Sci-Fi",
    matchRate: 88,
    year: 2010,
    duration: 148,
    views: 890000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/inception",
    instagram: "https://instagram.com/inception",
    email: "inception@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Emma Thomas",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Leonardo DiCaprio",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Joseph Gordon-Levitt",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Elliot Page",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
        ],
      },
    },
  },
  {
    title: "Interstellar",
    description:
      "เมื่อโลกใกล้ไม่สามารถอยู่อาศัยได้อีกต่อไป ทีมนักสำรวจจึงเดินทางผ่านรูหนอนอวกาศเพื่อค้นหาความหวังในการอยู่รอดของมนุษยชาติ",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    category: "Sci-Fi",
    matchRate: 95,
    year: 2014,
    duration: 169,
    views: 950000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/interstellar",
    instagram: "https://instagram.com/interstellar",
    email: "interstellar@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Emma Thomas",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jonathan Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Christopher Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Matthew McConaughey",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Anne Hathaway",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jessica Chastain",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        ],
      },
    },
  },
  {
    title: "The Matrix",
    description:
      "แฮกเกอร์หนุ่มค้นพบว่าชีวิตที่เขาอาศัยอยู่เป็นเพียงภาพลวงตาที่ถูกสร้างขึ้นโดยปัญญาประดิษฐ์อันชั่วร้าย",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    category: "Sci-Fi",
    matchRate: 95,
    year: 1999,
    duration: 136,
    views: 1300000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/the-matrix",
    instagram: "https://instagram.com/the-matrix",
    email: "the-matrix@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: [
          {
            name: "Lana Wachowski",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lilly Wachowski",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        producer: {
          name: "Joel Silver",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Lana Wachowski",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lilly Wachowski",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Keanu Reeves",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Laurence Fishburne",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Carrie-Anne Moss",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        ],
      },
    },
  },
  {
    title: "Dune",
    description:
      "ทายาทตระกูลขุนนางต้องเข้าไปพัวพันกับสงครามแย่งชิงทรัพยากรล้ำค่าที่สุดในจักรวาล",
    thumbnail:
      "https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=n9DwoQ7HWvI",
    category: "Sci-Fi",
    matchRate: 91,
    year: 2021,
    duration: 155,
    views: 1200000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/dune",
    instagram: "https://instagram.com/dune",
    email: "dune@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Denis Villeneuve",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Mary Parent",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Cale Boyter",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Jon Spaihts",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Denis Villeneuve",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Timothée Chalamet",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rebecca Ferguson",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Oscar Isaac",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1547483238-f400e65ccd56",
        ],
      },
    },
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    description:
      "หลังฝ่ายกบฏพ่ายแพ้ ลุค สกายวอล์คเกอร์เริ่มฝึกเป็นเจได ขณะที่ดาร์ธ เวเดอร์ตามล่าพวกเขาทั่วกาแล็กซี",
    thumbnail:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=JNwNXF9Y6kY",
    category: "Sci-Fi",
    matchRate: 97,
    year: 1980,
    duration: 124,
    views: 1500000,
    ageRating: "PG",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook:
      "https://facebook.com/star-wars-episode-v-the-empire-strikes-back",
    instagram:
      "https://instagram.com/star-wars-episode-v-the-empire-strikes-back",
    email: "star-wars-episode-v-the-empire-strikes-back@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Irvin Kershner",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Gary Kurtz",
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Leigh Brackett",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lawrence Kasdan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "George Lucas",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Mark Hamill",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Harrison Ford",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Carrie Fisher",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0",
        ],
      },
    },
  },
  {
    title: "Blade Runner 2049",
    description:
      "มนุษย์เทียมที่เป็นตำรวจสายตรวจพิเศษในแอลเอ ค้นพบความลับที่ถูกฝังไว้ซึ่งอาจเปลี่ยนระเบียบของโลกไปตลอดกาล",
    thumbnail:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=gCcx85zbxz4",
    category: "Sci-Fi",
    matchRate: 94,
    year: 2017,
    duration: 164,
    views: 750000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/blade-runner-2049",
    instagram: "https://instagram.com/blade-runner-2049",
    email: "blade-runner-2049@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Denis Villeneuve",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Andrew A. Kosove",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Hampton Fancher",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michael Green",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ryan Gosling",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Harrison Ford",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ana de Armas",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0",
        ],
      },
    },
  },
  {
    title: "Arrival",
    description:
      "เมื่อยานอวกาศลึกลับสิบสองลำจอดทอดสมอทั่วโลก นักภาษาศาสตร์ชื่อดังได้รับหน้าที่แกะรหัสเพื่อทำความเข้าใจจุดประสงค์ของผู้มาเยือน",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=tF112y6cAkU",
    category: "Sci-Fi",
    matchRate: 92,
    year: 2016,
    duration: 116,
    views: 800000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/arrival",
    instagram: "https://instagram.com/arrival",
    email: "arrival@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Denis Villeneuve",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Dan Levine",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Eric Heisserer",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ted Chiang",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Amy Adams",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jeremy Renner",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Forest Whitaker",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        ],
      },
    },
  },
  {
    title: "The Martian",
    description:
      "นักบินอวกาศถูกทิ้งให้อยู่เพียงลำพังบนดาวอังคารหลังพายุทรายถล่ม เขาต้องใช้ความฉลาดและความเชี่ยวชาญเพื่อประคองชีวิตให้รอดพ้นความตาย",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=ej3ioOneTy8",
    category: "Sci-Fi",
    matchRate: 96,
    year: 2015,
    duration: 144,
    views: 1350000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/the-martian",
    instagram: "https://instagram.com/the-martian",
    email: "the-martian@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Ridley Scott",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Simon Kinberg",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Drew Goddard",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Andy Weir",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Matt Damon",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jessica Chastain",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Kristen Wiig",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "Gravity",
    description:
      "วิศวกรทางการแพทย์หญิงและนักบินอวกาศรุ่นพี่ต้องต่อสู้ดิ้นรนเอาชีวิตรอดกลางอวกาศไร้ขอบเขต หลังสถานีอวกาศถูกเศษขยะทำลายสะบั้น",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=OiTiKOy59o4",
    category: "Sci-Fi",
    matchRate: 90,
    year: 2013,
    duration: 91,
    views: 950000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/gravity",
    instagram: "https://instagram.com/gravity",
    email: "gravity@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Alfonso Cuarón",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Alfonso Cuarón",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "David Heyman",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Alfonso Cuarón",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jonás Cuarón",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Sandra Bullock",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "George Clooney",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        ],
      },
    },
  },
  {
    title: "Tenet",
    description:
      "สายลับต้องใช้เทคโนโลยีควบคุมและผันเวลาเพื่อป้องกันไม่ให้สงครามโลกครั้งที่สามปะทุขึ้นกลางมวลมนุษยชาติ",
    thumbnail:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=LdOM0x0XDwM",
    category: "Sci-Fi",
    matchRate: 86,
    year: 2020,
    duration: 150,
    views: 1100000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/tenet",
    instagram: "https://instagram.com/tenet",
    email: "tenet@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Emma Thomas",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Christopher Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "John David Washington",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Robert Pattinson",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Elizabeth Debicki",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0",
        ],
      },
    },
  },

  // ==================== HORROR (10) ====================
  {
    title: "The Conjuring",
    description:
      "นักสืบเรื่องเหนือธรรมชาติเข้าช่วยครอบครัวที่ถูกคุกคามจากวิญญาณร้ายในบ้านไร่",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=k10ETZ41q5o",
    category: "Horror",
    matchRate: 93,
    year: 2013,
    duration: 112,
    views: 1050000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/the-conjuring",
    instagram: "https://instagram.com/the-conjuring",
    email: "the-conjuring@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "James Wan",
          photoUrl:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Tony DeRosa-Grund",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Chad Hayes",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Carey W. Hayes",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Vera Farmiga",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Patrick Wilson",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lili Taylor",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        ],
      },
    },
  },
  {
    title: "A Quiet Place",
    description:
      "ครอบครัวหนึ่งต้องใช้ชีวิตอย่างเงียบที่สุดเพื่อเอาชีวิตรอดจากสิ่งมีชีวิตที่ล่าด้วยเสียง",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=WR7cc5t7tv8",
    category: "Horror",
    matchRate: 88,
    year: 2018,
    duration: 90,
    views: 780000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/a-quiet-place",
    instagram: "https://instagram.com/a-quiet-place",
    email: "a-quiet-place@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "John Krasinski",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Michael Bay",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Andrew Form",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Bryan Woods",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Scott Beck",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Emily Blunt",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "John Krasinski",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Millicent Simmonds",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        ],
      },
    },
  },
  {
    title: "Hereditary",
    description:
      "หลังการจากไปของยาย ความลับสุดสะพรึงและมืดมนของครอบครัวก็เริ่มคืบคลานเข้ามาคุกคามชีวิตของลูกหลาน",
    thumbnail:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=V6wWKNij_jM",
    category: "Horror",
    matchRate: 91,
    year: 2018,
    duration: 127,
    views: 850000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/hereditary",
    instagram: "https://instagram.com/hereditary",
    email: "hereditary@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Ari Aster",
          photoUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Kevin Frakes",
          photoUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Ari Aster",
          photoUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Toni Collette",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Alex Wolff",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Milly Shapiro",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
        ],
      },
    },
  },
  {
    title: "It",
    description:
      "เด็กเจ็ดคนในเมืองชนบทเล็กๆ ต้องร่วมมือกันเผชิญหน้ากับปีศาจจำแลงกายเป็นตัวตลกตัวร้ายที่สะกดรอยล่าเหยื่อ",
    thumbnail:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=FnCdOQsX5kc",
    category: "Horror",
    matchRate: 94,
    year: 2017,
    duration: 135,
    views: 1600000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/it",
    instagram: "https://instagram.com/it",
    email: "it@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Andy Muschietti",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Roy Lee",
          photoUrl:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Stephen King",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Chase Palmer",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Bill Skarsgård",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jaeden Martell",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Finn Wolfhard",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=FnCdOQsX5kc",
        btsPhotos: [
          "https://images.unsplash.com/photo-1608889175123-8ee362201f81",
        ],
      },
    },
  },
  {
    title: "The Invisible Man",
    description:
      "เมื่อแฟนหนุ่มผู้ร่ำรวยและชอบบงการฆ่าตัวตาย หญิงสาวเชื่อว่าเขาเพียงแต่หาวิธีล่องหนเพื่อกลับมาไล่ล่าและรังควานชีวิตเธอ",
    thumbnail:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dSBsNeYqh-k",
    category: "Horror",
    matchRate: 89,
    year: 2020,
    duration: 124,
    views: 920000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/the-invisible-man",
    instagram: "https://instagram.com/the-invisible-man",
    email: "the-invisible-man@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Leigh Whannell",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Jason Blum",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Leigh Whannell",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Elisabeth Moss",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Oliver Jackson-Cohen",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Harriet Dyer",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509114397022-ed747cca3f65",
        ],
      },
    },
  },
  {
    title: "ชัตเตอร์ กดติดวิญญาณ",
    description:
      "ช่างภาพหนุ่มและแฟนสาวถูกวิญญาณปริศนาตามรังควานอย่างโหดร้าย หลังพวกเขาขับรถชนคนแล้วหนีไป",
    thumbnail:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=t5JvD90v-bM",
    category: "Horror",
    matchRate: 98,
    year: 2004,
    duration: 97,
    views: 1800000,
    ageRating: "R",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/ชัตเตอร์-กดติดวิญญาณ",
    instagram: "https://instagram.com/ชัตเตอร์-กดติดวิญญาณ",
    email: "ชัตเตอร์-กดติดวิญญาณ@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: [
          {
            name: "Banjong Pisanthanakun",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Parkpoom Wongpoom",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        producer: {
          name: "Yodphet Sudsawad",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Banjong Pisanthanakun",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Parkpoom Wongpoom",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ananda Everingham",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Natthaweeranuch Thongmee",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=t5JvD90v-bM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
        ],
      },
    },
  },
  {
    title: "ลัดดาแลนด์",
    description:
      "หัวหน้าครอบครัวตัดสินใจย้ายบ้านไปยังหมู่บ้านจัดสรรลัดดาแลนด์ในเชียงใหม่ แต่แล้วเขาก็พบว่าที่นี่เต็มไปด้วยวิญญาณและความน่าสะพรึงกลัว",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=5Vz5Y-yK_U0",
    category: "Horror",
    matchRate: 95,
    year: 2011,
    duration: 112,
    views: 1100000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/ลัดดาแลนด์",
    instagram: "https://instagram.com/ลัดดาแลนด์",
    email: "ลัดดาแลนด์@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Sophon Sakdaphisit",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Jira Maligool",
          photoUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Sophon Sakdaphisit",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Sopana Chaowwiwatkul",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Saharat Sangkapreecha",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Piyathida Woramusik",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=t5JvD90v-bM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        ],
      },
    },
  },
  {
    title: "ร่างทรง",
    description:
      "การสืบสายเลือดร่างทรงของครอบครัวหนึ่งในภาคอีสานของไทย กลับกลายเป็นโศกนาฏกรรมเมื่อวิญญาณชั่วร้ายพยายามสิงสู้ทายาทสาว",
    thumbnail:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=P2f5wF6UepE",
    category: "Horror",
    matchRate: 96,
    year: 2021,
    duration: 130,
    views: 1400000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/ร่างทรง",
    instagram: "https://instagram.com/ร่างทรง",
    email: "ร่างทรง@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Banjong Pisanthanakun",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Na Hong-jin",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Banjong Pisanthanakun",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Na Hong-jin",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Narilya Gulmongkolpech",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Sawanee Utoomma",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=t5JvD90v-bM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
        ],
      },
    },
  },
  {
    title: "พี่มาก...พระโขนง",
    description:
      "พี่มากกลับมาจากสงครามพร้อมเพื่อนรักสี่คน โดยไม่รู้เลยว่าภรรยาสุดที่รักของเขาได้กลายเป็นวิญญาณผีตายทั้งกลมไปแล้ว",
    thumbnail:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=5Vz5Y-yK_U0",
    category: "Horror",
    matchRate: 99,
    year: 2013,
    duration: 115,
    views: 3900000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/พี่มากพระโขนง",
    instagram: "https://instagram.com/พี่มากพระโขนง",
    email: "พี่มากพระโขนง@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Banjong Pisanthanakun",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Chenchonnanee Suntornyanakit",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Banjong Pisanthanakun",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Nontra Chalermchat",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Mario Maurer",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Davika Hoorne",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=t5JvD90v-bM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
        ],
      },
    },
  },
  {
    title: "เดอะ ริง คำสาปมรณะ",
    description:
      "ม้วนวิดีโอเทปปริศนาที่ใครได้ดูจะต้องเสียชีวิตภายใน 7 วันอย่างเป็นปริศนา นักข่าวสาวคนหนึ่งจึงพยายามไขความลับก่อนที่ตัวเธอจะหมดเวลา",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=yzR2GY-ew8I",
    category: "Horror",
    matchRate: 88,
    year: 1998,
    duration: 96,
    views: 870000,
    ageRating: "R",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/เดอะ-ริง-คำสาปมรณะ",
    instagram: "https://instagram.com/เดอะ-ริง-คำสาปมรณะ",
    email: "เดอะ-ริง-คำสาปมรณะ@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Hideo Nakata",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Shinya Kawai",
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Koji Suzuki",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Hiroshi Takahashi",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Nanako Matsushima",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Hiroyuki Sanada",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        ],
      },
    },
  },

  // ==================== COMEDY (10) ====================
  {
    title: "The Hangover",
    description:
      "เพื่อนสนิทสี่คนเดินทางไปปาร์ตี้สละโสดที่ลาสเวกัส แต่ตื่นขึ้นมากลับจำอะไรไม่ได้เลยและเจ้าบ่าวได้หายตัวไปอย่างลึกลับ",
    thumbnail:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=tcdUjFnMdes",
    category: "Comedy",
    matchRate: 94,
    year: 2009,
    duration: 100,
    views: 1800000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/the-hangover",
    instagram: "https://instagram.com/the-hangover",
    email: "the-hangover@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Todd Phillips",
          photoUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Daniel Goldberg",
          photoUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jon Lucas",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Scott Moore",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Bradley Cooper",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ed Helms",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Zach Galifianakis",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1585647347483-22b66260dfff",
        ],
      },
    },
  },
  {
    title: "Groundhog Day",
    description:
      "นักพยากรณ์อากาศที่เห็นแก่ตัวตื่นขึ้นมาพบว่าตัวเองติดอยู่ในวังวนลูปเวลาเดิมๆ ของเมืองเล็กๆ แห่งหนึ่งซ้ำแล้วซ้ำเล่า",
    thumbnail:
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=GncQtURlhN4",
    category: "Comedy",
    matchRate: 91,
    year: 1993,
    duration: 101,
    views: 680000,
    ageRating: "PG",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/groundhog-day",
    instagram: "https://instagram.com/groundhog-day",
    email: "groundhog-day@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Harold Ramis",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Trevor Albert",
          photoUrl:
            "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Danny Rubin",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Harold Ramis",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Bill Murray",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Andie MacDowell",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16",
        ],
      },
    },
  },
  {
    title: "Mean Girls",
    description:
      "หญิงสาวที่เติบโตมาจากแอฟริกาต้องเข้าไปเรียนโรงเรียนมัธยมในเมืองใหญ่ และต้องปะทะคารมกับกลุ่มสาวสุดฮอตประจำโรงเรียน",
    thumbnail:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=KAOmTMCtGkI",
    category: "Comedy",
    matchRate: 88,
    year: 2004,
    duration: 97,
    views: 790000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/mean-girls",
    instagram: "https://instagram.com/mean-girls",
    email: "mean-girls@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Mark Waters",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Lorne Michaels",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Tina Fey",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Lindsay Lohan",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rachel McAdams",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Amanda Seyfried",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1585647347483-22b66260dfff",
        ],
      },
    },
  },
  {
    title: "Superbad",
    description:
      "เพื่อนซี้สองคนกำลังจะจบมัธยมปลายและพยายามจัดเหล้าเข้างานปาร์ตี้ใหญ่เพื่อหาคู่เดต แต่ทุกอย่างกลับผิดแผนอย่างสุดกู่",
    thumbnail:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=4eaZ_ADQqes",
    category: "Comedy",
    matchRate: 90,
    year: 2007,
    duration: 113,
    views: 890000,
    ageRating: "R",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/superbad",
    instagram: "https://instagram.com/superbad",
    email: "superbad@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Greg Mottola",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Judd Apatow",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Seth Rogen",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Evan Goldberg",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Jonah Hill",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michael Cera",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Christopher Mintz-Plasse",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1585647347483-22b66260dfff",
        ],
      },
    },
  },
  {
    title: "Free Guy",
    description:
      "ตัวละคร NPC ในวิดีโอเกมแนว Open World ค้นพบว่าความจริงแล้วตัวเองอยู่ในเกมและเลือกที่จะเขียนบทบาทใหม่เป็นฮีโร่ผู้พิทักษ์โลกเกม",
    thumbnail:
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=X2m-08cOAbc",
    category: "Comedy",
    matchRate: 93,
    year: 2021,
    duration: 115,
    views: 1200000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/free-guy",
    instagram: "https://instagram.com/free-guy",
    email: "free-guy@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Shawn Levy",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Ryan Reynolds",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Shawn Levy",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Matt Lieberman",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Zak Penn",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ryan Reynolds",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jodie Comer",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Taika Waititi",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16",
        ],
      },
    },
  },
  {
    title: "Deadpool",
    description:
      "อดีตเจ้าหน้าที่กองทหารพิเศษที่ผ่านการทดลองพิเศษจนได้พลังฟื้นฟูร่างกายอย่างรวดเร็ว หันมาสวมหน้ากากชุดแดงสุดเกรียนเพื่อตามล่าคนที่ทำลายชีวิตเขา",
    thumbnail:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=ONHBaC-CAc8",
    category: "Comedy",
    matchRate: 96,
    year: 2016,
    duration: 108,
    views: 2400000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/deadpool",
    instagram: "https://instagram.com/deadpool",
    email: "deadpool@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Tim Miller",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Simon Kinberg",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lauren Shuler Donner",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Rhett Reese",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Paul Wernick",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ryan Reynolds",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Morena Baccarin",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ed Skrein",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1585647347483-22b66260dfff",
        ],
      },
    },
  },
  {
    title: "Dumb and Dumber",
    description:
      "เพื่อนซี้สองคนที่สมองทึ่มขั้นสุดยอด ออกเดินทางเพื่อนำกระเป๋าเอกสารที่ถูกวางทิ้งไว้ไปคืนให้หญิงสาวสวยผู้ร่ำรวย",
    thumbnail:
      "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=l13yPhimE3o",
    category: "Comedy",
    matchRate: 85,
    year: 1994,
    duration: 107,
    views: 950000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/dumb-and-dumber",
    instagram: "https://instagram.com/dumb-and-dumber",
    email: "dumb-and-dumber@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Peter Farrelly",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Charles B. Wessler",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Ted Cohen",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Peter Farrelly",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Jim Carrey",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jeff Daniels",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16",
        ],
      },
    },
  },
  {
    title: "ไอฟาย..แต๊งกิ้ว..เลิฟยู้",
    description:
      "เรื่องราวของยิม ชายหนุ่มที่พยายามติวภาษาอังกฤษแบบเร่งด่วนเพื่อตามง้อแฟนสาวชาวต่างชาติกับคุณครูสอนภาษาคนสวย",
    thumbnail:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=CLHe8J_SNDc",
    category: "Comedy",
    matchRate: 95,
    year: 2014,
    duration: 116,
    views: 1500000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/ไอฟายแต๊งกิ้วเลิฟยู้",
    instagram: "https://instagram.com/ไอฟายแต๊งกิ้วเลิฟยู้",
    email: "ไอฟายแต๊งกิ้วเลิฟยู้@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Mez Tharatorn",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Jira Maligool",
          photoUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Mez Tharatorn",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Benjamaporn Srabua",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Sunny Suwanmethanont",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Preechaya Pongthananikorn",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=t5JvD90v-bM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1585647347483-22b66260dfff",
        ],
      },
    },
  },

  // ==================== THRILLER (10) ====================
  {
    title: "Prisoners",
    description:
      "เมื่อลูกสาวคนเล็กถูกลักพาตัวไปและเบาะแสเดียวที่มีหลุดรอดน้ำมือตำรวจ พ่อผู้สิ้นหวังจึงตัดสินใจจัดการทุกอย่างด้วยมือของตัวเอง",
    thumbnail:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=bpXfcTctazU",
    category: "Thriller",
    matchRate: 94,
    year: 2013,
    duration: 153,
    views: 720000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/prisoners",
    instagram: "https://instagram.com/prisoners",
    email: "prisoners@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Denis Villeneuve",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Kira Davis",
          photoUrl:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Aaron Guzikowski",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Hugh Jackman",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jake Gyllenhaal",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Viola Davis",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=Xh0YpA9g9X8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1594909122845-11baa439b7bf",
        ],
      },
    },
  },
  {
    title: "Se7en",
    description:
      "ตำรวจสืบสวนสองคนตามล่าฆาตกรต่อเนื่องโรคจิตที่ก่อคดีโหดตามบาป 7 ประการในคัมภีร์ศาสนาคริสต์",
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=znmZoY5sBxs",
    category: "Thriller",
    matchRate: 96,
    year: 1995,
    duration: 127,
    views: 1400000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/se7en",
    instagram: "https://instagram.com/se7en",
    email: "se7en@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "David Fincher",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Arnold Kopelson",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Andrew Kevin Walker",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Brad Pitt",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Morgan Freeman",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Gwyneth Paltrow",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=Xh0YpA9g9X8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        ],
      },
    },
  },
  {
    title: "Gone Girl",
    description:
      "เมื่อภรรยาแสนสวยหายตัวไปอย่างลึกลับในวันครบรอบวันแต่งงาน ทุกสายตาและพยานหลักฐานกลับชี้ความผิดไปที่ตัวสามีผู้สิ้นหวัง",
    thumbnail:
      "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=yC03Qv4Ew0M",
    category: "Thriller",
    matchRate: 91,
    year: 2014,
    duration: 149,
    views: 880000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/gone-girl",
    instagram: "https://instagram.com/gone-girl",
    email: "gone-girl@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "David Fincher",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Ceán Chaffin",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Gillian Flynn",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Ben Affleck",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rosamund Pike",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Neil Patrick Harris",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=Xh0YpA9g9X8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1533928298208-27ff66555d8d",
        ],
      },
    },
  },
  {
    title: "Zodiac",
    description:
      "นักเขียนการ์ตูนและตำรวจสืบสวนร่วมมือกันเพื่อไล่ล่าระบุตัวตนของฆาตกรต่อเนื่องโซดิแอกผู้ออกแบบรหัสคดีปริศนาท้าทาย",
    thumbnail:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=yNncHPl1nsw",
    category: "Thriller",
    matchRate: 90,
    year: 2007,
    duration: 157,
    views: 650000,
    ageRating: "R",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/zodiac",
    instagram: "https://instagram.com/zodiac",
    email: "zodiac@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "David Fincher",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Ceán Chaffin",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Mike Medavoy",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "James Vanderbilt",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Robert Graysmith",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Jake Gyllenhaal",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Mark Ruffalo",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Robert Downey Jr.",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=Xh0YpA9g9X8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1509114397022-ed747cca3f65",
        ],
      },
    },
  },
  {
    title: "Shutter Island",
    description:
      "เจ้าหน้าที่บังคับคดีชาวอเมริกันเข้ามาสืบสวนการหายตัวไปปริศนาของฆาตกรหญิงในโรงพยาบาลประสาทบนเกาะลับห่างไกล",
    thumbnail:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=5iaYLCip5Qk",
    category: "Thriller",
    matchRate: 95,
    year: 2010,
    duration: 138,
    views: 1300000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/shutter-island",
    instagram: "https://instagram.com/shutter-island",
    email: "shutter-island@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Martin Scorsese",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Mike Medavoy",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Laeta Kalogridis",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Dennis Lehane",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Leonardo DiCaprio",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Mark Ruffalo",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ben Kingsley",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=Xh0YpA9g9X8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1594909122845-11baa439b7bf",
        ],
      },
    },
  },
  {
    title: "Nightcrawler",
    description:
      "ชายผู้กระหายความสำเร็จผันตัวเองเป็นช่างภาพข่าวอาชญากรรมอิสระในแอลเอ ดิ่งลึกสู่โลกมืดแห่งคดีฆาตกรรมและการปั้นข่าวสุดอันตราย",
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=X8kXYg_OBdc",
    category: "Thriller",
    matchRate: 88,
    year: 2014,
    duration: 117,
    views: 590000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/nightcrawler",
    instagram: "https://instagram.com/nightcrawler",
    email: "nightcrawler@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Dan Gilroy",
          photoUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Jennifer Fox",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Dan Gilroy",
          photoUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Jake Gyllenhaal",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rene Russo",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Riz Ahmed",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=X8kXYg_OBdc",
        btsPhotos: [
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        ],
      },
    },
  },

  // ==================== DRAMA (10) ====================
  {
    title: "The Green Mile",
    description:
      "ผู้คุมขังนักโทษแดนประหาร ค้นพบความจริงอันน่าเหลือเชื่อของนักโทษผิวดำร่างยักษ์ผู้ได้รับพลังพิเศษในการปัดเป่าปาฏิหาริย์รักษามนุษย์",
    thumbnail:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Ki4haFrqSrw",
    category: "Drama",
    matchRate: 97,
    year: 1999,
    duration: 189,
    views: 1500000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/the-green-mile",
    instagram: "https://instagram.com/the-green-mile",
    email: "the-green-mile@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Frank Darabont",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Frank Darabont",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "David Valdes",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: [
          {
            name: "Stephen King",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Frank Darabont",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Tom Hanks",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "David Morse",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michael Clarke Duncan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=1F7771Zf3uE",
        btsPhotos: [
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
        ],
      },
    },
  },
  {
    title: "Fight Club",
    description:
      "ชายหนุ่มผู้เบื่อชีวิตเมืองหลวงรวมตัวกับคนขายสบู่ลึกลับเพื่อตั้งคลับต่อสู้เพื่อระบายความดิบ ทลายกฎเกณฑ์เดิมๆ ในสังคม",
    thumbnail:
      "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=qtRKdVHc-cE",
    category: "Drama",
    matchRate: 93,
    year: 1999,
    duration: 139,
    views: 1200000,
    ageRating: "R",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/fight-club",
    instagram: "https://instagram.com/fight-club",
    email: "fight-club@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "David Fincher",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Art Linson",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Chuck Palahniuk",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jim Uhls",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Brad Pitt",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Edward Norton",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Helena Bonham Carter",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=1F7771Zf3uE",
        btsPhotos: [
          "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d",
        ],
      },
    },
  },
  {
    title: "The Prestige",
    description:
      "สองนักมายากลเพื่อนซี้ในลอนดอนยุคปฏิบัติอุตสาหกรรม กลายเป็นศัตรูคู่อาฆาตที่หาวิธีคิดค้นกลเพื่อเอาชนะและทำลายล้างอีกฝ่าย",
    thumbnail:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=o4gHCmTQDVI",
    category: "Drama",
    matchRate: 94,
    year: 2006,
    duration: 130,
    views: 950000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/the-prestige",
    instagram: "https://instagram.com/the-prestige",
    email: "the-prestige@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Christopher Nolan",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Emma Thomas",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jonathan Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Christopher Nolan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Hugh Jackman",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Christian Bale",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Scarlett Johansson",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=1F7771Zf3uE",
        btsPhotos: [
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
        ],
      },
    },
  },
  {
    title: "Schindler's List",
    description:
      "เรื่องราวประวัติศาสตร์ของออสการ์ ชินด์เลอร์ นักธุรกิจชาวเยอรมันผู้ช่วยชีวิตชาวยิวมากกว่าพันคนระหว่างสงครามโลกครั้งที่สอง",
    thumbnail:
      "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=gG22XNhtnoY",
    category: "Drama",
    matchRate: 98,
    year: 1993,
    duration: 195,
    views: 1200000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/schindlers-list",
    instagram: "https://instagram.com/schindlers-list",
    email: "schindlers-list@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Steven Spielberg",
          photoUrl:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Branko Lustig",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Thomas Keneally",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Steven Zaillian",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Liam Neeson",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ben Kingsley",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ralph Fiennes",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=1F7771Zf3uE",
        btsPhotos: [
          "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d",
        ],
      },
    },
  },

  // ==================== ROMANCE (10) ====================
  {
    title: "About Time",
    description:
      "เมื่ออายุครบ 21 ปี ชายหนุ่มได้รับรู้ความลับของครอบครัวว่าเขามีความสามารถในการเดินทางย้อนลูปเวลาเพื่อแก้ไขช่วงชีวิตตนเองและตามหาความรักได้",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=T7A810duHvw",
    category: "Romance",
    matchRate: 94,
    year: 2013,
    duration: 123,
    views: 1200000,
    ageRating: "R",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/about-time",
    instagram: "https://instagram.com/about-time",
    email: "about-time@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Richard Curtis",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Tim Bevan",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Richard Curtis",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Domhnall Gleeson",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rachel McAdams",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Bill Nighy",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        ],
      },
    },
  },
  {
    title: "The Notebook",
    description:
      "เรื่องราวรักนิรันดร์ระหว่างหนุ่มชนชั้นแรงงานและหญิงสาวครอบครัวมั่งคั่ง ท่ามกลางความขัดแย้ง ชะตากรรมสงคราม และความทรงจำที่ค่อยๆ จืดจาง",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=FC6biTjJyWk",
    category: "Romance",
    matchRate: 93,
    year: 2004,
    duration: 123,
    views: 950000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/the-notebook",
    instagram: "https://instagram.com/the-notebook",
    email: "the-notebook@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Nick Cassavetes",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Lynn Harris",
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Nicholas Sparks",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jan Sardi",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ryan Gosling",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rachel McAdams",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "James Garner",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
        ],
      },
    },
  },
  {
    title: "Before Sunrise",
    description:
      "หนุ่มอเมริกันและสาวฝรั่งเศสพบกันบนรถไฟท่องเที่ยวในยุโรป และตัดสินใจร่วมใช้เวลาหนึ่งค่ำคืนร่วมกันในเมืองเวียนนาโดยไม่มีข้อผูกมัดใดๆ",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=25v7N34JJgM",
    category: "Romance",
    matchRate: 90,
    year: 1995,
    duration: 101,
    views: 550000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/before-sunrise",
    instagram: "https://instagram.com/before-sunrise",
    email: "before-sunrise@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Richard Linklater",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Anne Walker-McBay",
          photoUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Richard Linklater",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Kim Krizan",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ethan Hawke",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Julie Delpy",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        ],
      },
    },
  },
  {
    title: "Pride & Prejudice",
    description:
      "ความรักที่ซับซ้อนท้าทายจารีตชนชั้น นำไปสู่การเผชิญหน้าระหว่างหญิงสาวอคติสูงกับสุภาพบุรุษหนุ่มขุนนางแสนหยิ่งทนงในอังกฤษโบราณ",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Ur_DIHs9mYc",
    category: "Romance",
    matchRate: 91,
    year: 2005,
    duration: 129,
    views: 680000,
    ageRating: "PG",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/pride-prejudice",
    instagram: "https://instagram.com/pride-prejudice",
    email: "pride-prejudice@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Joe Wright",
          photoUrl:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Tim Bevan",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jane Austen",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Deborah Moggach",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Keira Knightley",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Matthew Macfadyen",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Brenda Blethyn",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
        ],
      },
    },
  },
  {
    title: "Crazy Rich Asians",
    description:
      "อาจารย์สาวชาวจีน-อเมริกันเดินทางไปสิงคโปร์พร้อมแฟนหนุ่ม และพบว่าความจริงแฟนเธอเป็นทายาทตระกูลที่ร่ำรวยและมีชื่อเสียงที่สุดในประเทศ",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=ZQ-YX-5bAs0",
    category: "Romance",
    matchRate: 88,
    year: 2018,
    duration: 120,
    views: 990000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/crazy-rich-asians",
    instagram: "https://instagram.com/crazy-rich-asians",
    email: "crazy-rich-asians@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Jon M. Chu",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Nina Jacobson",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Kevin Kwan",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Peter Chiarelli",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Constance Wu",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Henry Golding",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michelle Yeoh",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        ],
      },
    },
  },
  {
    title: "Notting Hill",
    description:
      "รักอบอุ่นหัวใจที่เกิดขึ้นอย่างน่าอัศจรรย์เมื่อเจ้าของร้านหนังสือหนุ่มธรรมดาๆ ในลอนดอนได้พบและสานสัมพันธ์กับดาราสาวฮอลลีวูดอันดับหนึ่งของโลก",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=4RI0QguyXHY",
    category: "Romance",
    matchRate: 92,
    year: 1999,
    duration: 124,
    views: 890000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/notting-hill",
    instagram: "https://instagram.com/notting-hill",
    email: "notting-hill@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Roger Michell",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Duncan Kenworthy",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Richard Curtis",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Hugh Grant",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Julia Roberts",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Richard McCabe",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
        ],
      },
    },
  },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    description:
      "คู่รักเก่าที่ต่างตัดสินใจลบความทรงจำเกี่ยวกับการใช้ชีวิตคู่ร่วมกันออกจากสมอง แต่การดิ้นรนเพื่อเก็บส่วนลึกของความทรงจำในวินาทีสุดท้ายก็เริ่มขึ้น",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=07-3nLKyW5s",
    category: "Romance",
    matchRate: 86,
    year: 2004,
    duration: 108,
    views: 750000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/eternal-sunshine-of-the-spotless-mind",
    instagram: "https://instagram.com/eternal-sunshine-of-the-spotless-mind",
    email: "eternal-sunshine-of-the-spotless-mind@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Michel Gondry",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Steve Golin",
          photoUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Charlie Kaufman",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michel Gondry",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Jim Carrey",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Kate Winslet",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Kirsten Dunst",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        ],
      },
    },
  },
  {
    title: "Call Me by Your Name",
    description:
      "ในยุโรปช่วงหน้าร้อน เด็กหนุ่มผู้เชี่ยวชาญด้านดนตรีเริ่มมีใจและสายสัมพันธ์ลับๆ กับนักศึกษาวิจัยรุ่นพี่สุดสมาร์ทที่เดินทางมาร่วมงานกับครอบครัว",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Z9AYPxH5NTM",
    category: "Romance",
    matchRate: 90,
    year: 2017,
    duration: 132,
    views: 800000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/call-me-by-your-name",
    instagram: "https://instagram.com/call-me-by-your-name",
    email: "call-me-by-your-name@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Luca Guadagnino",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Peter Spears",
          photoUrl:
            "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "André Aciman",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "James Ivory",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Timothée Chalamet",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Armie Hammer",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michael Stuhlbarg",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
        ],
      },
    },
  },

  // ==================== ADVENTURE (10) ====================
  {
    title: "Life of Pi",
    description:
      "เด็กหนุ่มชาวอินเดียรอดชีวิตจากภัยพิบัติเรืออัปปางกลางมหาสมุทรแปซิฟิก และต้องแชร์แพชูชีพลอยเคว้งคว้างร่วมกับเสือโคร่งเบงกอลตัวยักษ์",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=3mMN693-F3Y",
    category: "Adventure",
    matchRate: 94,
    year: 2012,
    duration: 127,
    views: 1200000,
    ageRating: "PG",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/life-of-pi",
    instagram: "https://instagram.com/life-of-pi",
    email: "life-of-pi@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Ang Lee",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Gil Netter",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Yann Martel",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "David Magee",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Suraj Sharma",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Irrfan Khan",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Adil Hussain",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "Cast Away",
    description:
      "พนักงานส่งของบริษัทจัดส่งด่วนระดับโลก รอดพ้นเครื่องบินตกและต้องไปติดเกาะร้างกลางมหาสมุทรอย่างสันโดษเพื่อเอาชีวิตรอดปีต่อปี",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=27cv0Q8L_30",
    category: "Adventure",
    matchRate: 95,
    year: 2000,
    duration: 143,
    views: 1550000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/cast-away",
    instagram: "https://instagram.com/cast-away",
    email: "cast-away@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Robert Zemeckis",
          photoUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "Tom Hanks",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jack Rapke",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: {
          name: "William Broyles Jr.",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Tom Hanks",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Helen Hunt",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "The Revenant",
    description:
      "นายพรานนำทางคณะดักสัตว์ในป่าดิบลึก ถูกหมีกริซลีย์ทำร้ายบาดเจ็บปางตายและโดนทอดทิ้งอย่างเลือดเย็น เขาจึงคลานผ่านหิมะและอุปสรรคเพื่อล้างแค้น",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=LoebZZ8K5N0",
    category: "Adventure",
    matchRate: 93,
    year: 2015,
    duration: 156,
    views: 1300000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/the-revenant",
    instagram: "https://instagram.com/the-revenant",
    email: "the-revenant@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Alejandro G. Iñárritu",
          photoUrl:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Arnon Milchan",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Michael Punke",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Alejandro G. Iñárritu",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Leonardo DiCaprio",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Tom Hardy",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Domhnall Gleeson",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "Avatar",
    description:
      "อดีตนาวิกโยธินพิการถูกส่งไปปฏิบัติภารกิจบนดาวแพนโดรา เพื่อแทรกซึมผ่านร่างกายอวตารของชาวเนวีและค้นพบมิตรภาพรักแท้",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=5PSNL1q3QVY",
    category: "Adventure",
    matchRate: 96,
    year: 2009,
    duration: 162,
    views: 4500000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/avatar",
    instagram: "https://instagram.com/avatar",
    email: "avatar@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "James Cameron",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: [
          {
            name: "James Cameron",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jon Landau",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        writer: {
          name: "James Cameron",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Sam Worthington",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Zoe Saldana",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Sigourney Weaver",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "Indiana Jones and the Raiders of the Lost Ark",
    description:
      "นักโบราณคดีชื่อดังออกเดินทางสู้ภัยข้ามซีกโลกเพื่อปกป้องหีบพันธสัญญาโบราณที่มีพลังทำลายล้างสูงให้พ้นมือเหล่าทหารนาซีชั่วร้าย",
    thumbnail:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=XkkzKjK111I",
    category: "Adventure",
    matchRate: 91,
    year: 1981,
    duration: 115,
    views: 1200000,
    ageRating: "PG",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook:
      "https://facebook.com/indiana-jones-and-the-raiders-of-the-lost-ark",
    instagram:
      "https://instagram.com/indiana-jones-and-the-raiders-of-the-lost-ark",
    email: "indiana-jones-and-the-raiders-of-the-lost-ark@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Steven Spielberg",
          photoUrl:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Frank Marshall",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "George Lucas",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lawrence Kasdan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Harrison Ford",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Karen Allen",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Paul Freeman",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
        ],
      },
    },
  },
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    description:
      "กัปตันแจ็ค สแปร์โรว์ ผู้แสนแปลกประหลาด ร่วมมือกับช่างเหล็กหนุ่มเพื่อช่วยเหลือนางเอกสาวจากการลักพาตัวของกลุ่มโจรสลัดต้องคำสาปอมตะ",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=naQr0uTrH_Y",
    category: "Adventure",
    matchRate: 95,
    year: 2003,
    duration: 143,
    views: 2400000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook:
      "https://facebook.com/pirates-of-the-caribbean-the-curse-of-the-black-pearl",
    instagram:
      "https://instagram.com/pirates-of-the-caribbean-the-curse-of-the-black-pearl",
    email: "pirates-of-the-caribbean-the-curse-of-the-black-pearl@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Gore Verbinski",
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Jerry Bruckheimer",
          photoUrl:
            "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Ted Elliott",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Terry Rossio",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Johnny Depp",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Geoffrey Rush",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Orlando Bloom",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "The Hobbit: An Unexpected Journey",
    description:
      "บิลโบ แบ็กกินส์และคณะคนแคระออกเดินทางสู่หุบเขาเดียวดาย เพื่อกอบกู้บ้านเกิดและขุมทรัพย์ที่สาบสูญจากมังกรสม็อกพ่นไฟแสนดุร้าย",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=SDnYMbYB-nU",
    category: "Adventure",
    matchRate: 90,
    year: 2012,
    duration: 169,
    views: 1850000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/the-hobbit-an-unexpected-journey",
    instagram: "https://instagram.com/the-hobbit-an-unexpected-journey",
    email: "the-hobbit-an-unexpected-journey@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Peter Jackson",
          photoUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Carolynne Cunningham",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "J.R.R. Tolkien",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Fran Walsh",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Martin Freeman",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ian McKellen",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Richard Armitage",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "The Mummy",
    description:
      "กลุ่มนักสำรวจและทหารหนุ่มเดินทางไปไขปริศนาสุสานโบราณอียิปต์ แต่น่าเศร้าที่ความโลภทำให้มัมมี่นักบวชปีศาจฟื้นคืนชีพขึ้นมาสร้างหายนะล้างโลก",
    thumbnail:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=h3ptPbpZjac",
    category: "Adventure",
    matchRate: 88,
    year: 1999,
    duration: 124,
    views: 1400000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/the-mummy",
    instagram: "https://instagram.com/the-mummy",
    email: "the-mummy@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Stephen Sommers",
          photoUrl:
            "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Sean Daniel",
          photoUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Stephen Sommers",
          photoUrl:
            "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Brendan Fraser",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rachel Weisz",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "John Hannah",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=l7O8VeaS3L8",
        btsPhotos: [
          "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
        ],
      },
    },
  },
  {
    title: "13 หมูป่า แฟลชคลับ",
    description:
      "เรื่องราวมหากาพย์ปฏิบัติการช่วยเหลือเด็กและโค้ชทีมฟุตบอลหมูป่าอคาเดมี่ที่ติดอยู่ในถ้ำหลวง-ขุนน้ำนางนอนด้วยผู้เชี่ยวชาญกู้ภัยระดับโลก",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Ga6RYejoS1I",
    category: "Adventure",
    matchRate: 97,
    year: 2022,
    duration: 142,
    views: 1200000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/13-หมูป่า-แฟลชคลับ",
    instagram: "https://instagram.com/13-หมูป่า-แฟลชคลับ",
    email: "13-หมูป่า-แฟลชคลับ@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Ron Howard",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "William M. Connor",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "William Nicholson",
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Viggo Mortensen",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Colin Farrell",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Joel Edgerton",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=t5JvD90v-bM",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },

  // ==================== FANTASY (10) ====================
  {
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    description:
      "สี่พี่น้องค้นพบดินแดนนาร์เนียที่ซ่อนอยู่ในตู้เสื้อผ้าโบราณ และร่วมมือกับราชสีห์อัสลานเพื่อยุติฤดูหนาวนิรันดร์ของแม่มดขาว",
    thumbnail:
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=pYcGFLgJ8Uo",
    category: "Fantasy",
    matchRate: 91,
    year: 2005,
    duration: 143,
    views: 1300000,
    ageRating: "PG",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook:
      "https://facebook.com/the-chronicles-of-narnia-the-lion-the-witch-and-the-wardrobe",
    instagram:
      "https://instagram.com/the-chronicles-of-narnia-the-lion-the-witch-and-the-wardrobe",
    email:
      "the-chronicles-of-narnia-the-lion-the-witch-and-the-wardrobe@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Andrew Adamson",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Mark Johnson",
          photoUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "C.S. Lewis",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ann Peacock",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Tilda Swinton",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Georgie Henley",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "William Moseley",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1510172951991-856a654063f9",
        ],
      },
    },
  },
  {
    title: "Alice in Wonderland",
    description:
      "หญิงสาวตกทะลุโพรงกระต่ายไปยังดินแดนใต้ภิภพสุดแปลกประหลาด และร่วมมือกับช่างทำหมวกเพื่อทวงบัลลังก์คืนให้ราชินีขาว",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=9POCgSRVJH0",
    category: "Fantasy",
    matchRate: 88,
    year: 2010,
    duration: 108,
    views: 950000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/alice-in-wonderland",
    instagram: "https://instagram.com/alice-in-wonderland",
    email: "alice-in-wonderland@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Tim Burton",
          photoUrl:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Richard D. Zanuck",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Lewis Carroll",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Linda Woolverton",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Johnny Depp",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Mia Wasikowska",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Helena Bonham Carter",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        ],
      },
    },
  },
  {
    title: "Pan's Labyrinth",
    description:
      "ในสเปนยุคหลังสงคราม เด็กหญิงหนีโลกความจริงอันโหดร้ายโดยเดินทางเข้าไปในเขาวงกตลับและทำภารกิจที่มอบให้โดยวิญญาณฟอนโบราณ",
    thumbnail:
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=EqkBP02O6W8",
    category: "Fantasy",
    matchRate: 94,
    year: 2006,
    duration: 118,
    views: 750000,
    ageRating: "R",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/pans-labyrinth",
    instagram: "https://instagram.com/pans-labyrinth",
    email: "pans-labyrinth@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Guillermo del Toro",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Alfonso Cuarón",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Guillermo del Toro",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Ivana Baquero",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ariadna Gil",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Sergi López",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1510172951991-856a654063f9",
        ],
      },
    },
  },
  {
    title: "Percy Jackson & the Olympians: The Lightning Thief",
    description:
      "เด็กหนุ่มค้นพบความจริงว่าเขาเป็นกึ่งมนุษย์กึ่งเทพบุตรของเทพโพไซดอน และถูกกล่าวหาว่าขโมยอัสนีบาตของเทพซุส",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=yYy7G8mFPyI",
    category: "Fantasy",
    matchRate: 86,
    year: 2010,
    duration: 119,
    views: 890000,
    ageRating: "PG",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook:
      "https://facebook.com/percy-jackson-the-olympians-the-lightning-thief",
    instagram:
      "https://instagram.com/percy-jackson-the-olympians-the-lightning-thief",
    email: "percy-jackson-the-olympians-the-lightning-thief@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Chris Columbus",
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Karen Rosenfelt",
          photoUrl:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Rick Riordan",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Craig Titley",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Logan Lerman",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Brandon T. Jackson",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Alexandra Daddario",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        ],
      },
    },
  },
  {
    title: "Beauty and the Beast",
    description:
      "หญิงสาวแสนสวยกตัญญูอาสาเป็นนักโทษทดแทนพ่อในปราสาทของอสูรร้าย และได้เรียนรู้ตัวตนแท้จริงของอสูรที่งดงามภายใต้รูปลักษณ์โหดร้าย",
    thumbnail:
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=e3Nl_TCQXuw",
    category: "Fantasy",
    matchRate: 93,
    year: 2017,
    duration: 129,
    views: 1450000,
    ageRating: "PG",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/beauty-and-the-beast",
    instagram: "https://instagram.com/beauty-and-the-beast",
    email: "beauty-and-the-beast@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Bill Condon",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "David Hoberman",
          photoUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Stephen Chbosky",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Evan Spiliotopoulos",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Emma Watson",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Dan Stevens",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Luke Evans",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1510172951991-856a654063f9",
        ],
      },
    },
  },
  {
    title: "Doctor Strange",
    description:
      "ศัลยแพทย์ประสาทระดับแนวหน้าที่สูญเสียมือในอุบัติเหตุ ค้นหาการรักษาจนกระทั่งได้เปิดประตูมิติสู่ศาสตร์เวทมนตร์ลี้ลับและการปกป้องดวงดาว",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=HSzx-zry1Yo",
    category: "Fantasy",
    matchRate: 95,
    year: 2016,
    duration: 115,
    views: 1800000,
    ageRating: "PG-13",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/doctor-strange",
    instagram: "https://instagram.com/doctor-strange",
    email: "doctor-strange@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Scott Derrickson",
          photoUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Kevin Feige",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jon Spaihts",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Scott Derrickson",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Benedict Cumberbatch",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Chiwetel Ejiofor",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Rachel McAdams",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        ],
      },
    },
  },
  {
    title: "Fantastic Beasts and Where to Find Them",
    description:
      "นักสัตว์วิเศษเดินทางมาถึงนิวยอร์กพร้อมกระเป๋าเดินทางลึกลับที่เต็มไปด้วยสิ่งมีชีวิตวิเศษที่ค่อยๆ หลุดรอดออกมาสร้างเรื่องวุ่นวาย",
    thumbnail:
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=Vso5o11LuGU",
    category: "Fantasy",
    matchRate: 89,
    year: 2016,
    duration: 133,
    views: 1250000,
    ageRating: "PG-13",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/fantastic-beasts-and-where-to-find-them",
    instagram: "https://instagram.com/fantastic-beasts-and-where-to-find-them",
    email: "fantastic-beasts-and-where-to-find-them@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "David Yates",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "David Heyman",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "J.K. Rowling",
          photoUrl:
            "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Eddie Redmayne",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Katherine Waterston",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Dan Fogler",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1510172951991-856a654063f9",
        ],
      },
    },
  },
  {
    title: "Stardust",
    description:
      "ชายหนุ่มให้สัญญากับสาวคนรักว่าจะนำดาวตกจากดินแดนเวทมนตร์มาให้ แต่กลับพบว่าดาวตกดวงนั้นแท้จริงคือหญิงสาวผู้มีพลังวิเศษล้ำเลิศ",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=YCO16KbhXl8",
    category: "Fantasy",
    matchRate: 90,
    year: 2007,
    duration: 127,
    views: 650000,
    ageRating: "PG-13",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/stardust",
    instagram: "https://instagram.com/stardust",
    email: "stardust@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Matthew Vaughn",
          photoUrl:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Lorenzo di Bonaventura",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Jane Goldman",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Matthew Vaughn",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Charlie Cox",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Claire Danes",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Michelle Pfeiffer",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=R32qYStZ-g4",
        btsPhotos: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        ],
      },
    },
  },

  // ==================== ANIMATION (10) ====================
  {
    title: "Toy Story",
    description:
      "เมื่อตุ๊กตาของเล่นมีชีวิตอย่างลับๆ และต้องร่วมเผชิญภัยร่วมกับนายอำเภอวู้ดดี้และหุ่นอวกาศบัซ ไลท์เยียร์สุดเท่",
    thumbnail:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=CxwTLktovTU",
    category: "Animation",
    matchRate: 98,
    year: 1995,
    duration: 81,
    views: 1900000,
    ageRating: "G",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/toy-story",
    instagram: "https://instagram.com/toy-story",
    email: "toy-story@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "John Lasseter",
          photoUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Ralph Guggenheim",
          photoUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "John Lasseter",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Pete Docter",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Tom Hanks",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Tim Allen",
            photoUrl:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Don Rickles",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=3KR8_M-G9pA",
        btsPhotos: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477",
        ],
      },
    },
  },
  {
    title: "Finding Nemo",
    description:
      "ปลาการ์ตูนกังวลใจออกเดินทางข้ามมหาสมุทรอันกว้างใหญ่เพื่อตามหาลูกชายที่ถูกจับตัวไปอยู่ในตู้ปลาของคลินิกทำฟัน",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=2zLkasScy7A",
    category: "Animation",
    matchRate: 95,
    year: 2003,
    duration: 100,
    views: 1650000,
    ageRating: "G",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/finding-nemo",
    instagram: "https://instagram.com/finding-nemo",
    email: "finding-nemo@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Andrew Stanton",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Graham Walters",
          photoUrl:
            "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Andrew Stanton",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Bob Peterson",
            photoUrl:
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Albert Brooks",
            photoUrl:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ellen DeGeneres",
            photoUrl:
              "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Alexander Gould",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=3KR8_M-G9pA",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "Ratatouille",
    description:
      "หนูแสนรู้ผู้มีพรสวรรค์ในการชิมและทำอาหารอย่างประณีต ร่วมมือกับเด็กหนุ่มล้างจานเพื่อปรุงรสชาติที่สั่นสะเทือนปารีส",
    thumbnail:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=NgsQ8mVEa8U",
    category: "Animation",
    matchRate: 93,
    year: 2007,
    duration: 111,
    views: 1100000,
    ageRating: "G",
    university: "มหาวิทยาลัยกรุงเทพ",

    facebook: "https://facebook.com/ratatouille",
    instagram: "https://instagram.com/ratatouille",
    email: "ratatouille@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Brad Bird",
          photoUrl:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Brad Lewis",
          photoUrl:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Brad Bird",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jan Pinkava",
            photoUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Patton Oswalt",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Ian Holm",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Lou Romano",
            photoUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=3KR8_M-G9pA",
        btsPhotos: [
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
        ],
      },
    },
  },
  {
    title: "Wall-E",
    description:
      "หุ่นยนต์บดอัดขยะบนดาวโลกที่ไร้ผู้คน ได้พบรักกับหุ่นสำรวจคนใหม่และออกเดินทางกอบกู้มนุษยชาติในอวกาศกว้างใหญ่",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=8-_9n554ppc",
    category: "Animation",
    matchRate: 96,
    year: 2008,
    duration: 98,
    views: 1250000,
    ageRating: "G",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",

    facebook: "https://facebook.com/wall-e",
    instagram: "https://instagram.com/wall-e",
    email: "wall-e@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Andrew Stanton",
          photoUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Jim Morris",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Andrew Stanton",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jim Reardon",
            photoUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Ben Burtt",
            photoUrl:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Elissa Knight",
            photoUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Jeff Garlin",
            photoUrl:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=3KR8_M-G9pA",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
  {
    title: "Shrek",
    description:
      "ยักษ์เขียวแสนรักสงบจำใจออกทำภารกิจช่วยเหลือเจ้าหญิงฟิโอน่าผู้มีความลับปริศนา เพื่อแลกกับการทวงคืนบึงน้ำอันสงบสุขของตัวเขาเอง",
    thumbnail:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=OoRdpZ5s2V8",
    category: "Animation",
    matchRate: 88,
    year: 2001,
    duration: 90,
    views: 1400000,
    ageRating: "PG",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",

    facebook: "https://facebook.com/shrek",
    instagram: "https://instagram.com/shrek",
    email: "shrek@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: [
          {
            name: "Andrew Adamson",
            photoUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Vicky Jenson",
            photoUrl:
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
          },
        ],
        producer: {
          name: "Aron Warner",
          photoUrl:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        writer: [
          {
            name: "Ted Elliott",
            photoUrl:
              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Terry Rossio",
            photoUrl:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          },
        ],
        cast: [
          {
            name: "Mike Myers",
            photoUrl:
              "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Eddie Murphy",
            photoUrl:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Cameron Diaz",
            photoUrl:
              "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=3KR8_M-G9pA",
        btsPhotos: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477",
        ],
      },
    },
  },
  {
    title: "ดาบพิฆาตอสูร: ศึกรถไฟสู่นิรันดร์",
    description:
      "ทันจิโร่และกลุ่มนักล่าอสูรขึ้นไปสืบสวนคดีคนหายตัวไปบนรถไฟร่วมกับเสาหลักเพลิงเรนโงคุ และเผชิญหน้าอสูรข้างแรมผู้ควบคุมความฝัน",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=ATJYac_dORw",
    category: "Animation",
    matchRate: 97,
    year: 2020,
    duration: 117,
    views: 1800000,
    ageRating: "R",
    university: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",

    facebook: "https://facebook.com/ดาบพิฆาตอสูร-ศึกรถไฟสู่นิรันดร์",
    instagram: "https://instagram.com/ดาบพิฆาตอสูร-ศึกรถไฟสู่นิรันดร์",
    email: "ดาบพิฆาตอสูร-ศึกรถไฟสู่นิรันดร์@movies.com",
    language: "ไทย",
    targetGroup: "ทั่วไป",
    crew: {
      create: {
        director: {
          name: "Haruo Sotozaki",
          photoUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
        },
        producer: {
          name: "Masanori Miyake",
          photoUrl:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        },
        writer: {
          name: "Koyoharu Gotouge",
          photoUrl:
            "https://images.unsplash.com/photo-1504257400762-971f9e9964d8?auto=format&fit=crop&w=300&q=80",
        },
        cast: [
          {
            name: "Natsuki Hanae",
            photoUrl:
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Akari Kito",
            photoUrl:
              "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Yoshitsugu Matsuoka",
            photoUrl:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          },
        ],
        btsVideo: "https://www.youtube.com/watch?v=3KR8_M-G9pA",
        btsPhotos: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
    },
  },
];

// Populate trailerUrl for all seed movies using their youtubeUrl as a fallback
seedMovies.forEach((movie) => {
  movie.trailerUrl = movie.youtubeUrl;
});
