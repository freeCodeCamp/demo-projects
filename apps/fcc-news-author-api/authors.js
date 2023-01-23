const authors = [
  {
    author: "Quincy Larson",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/03/Quincy-Larson-photo.jpg",
    url: "https://www.freecodecamp.org/news/author/quincylarson/",
    bio: "The teacher who founded freeCodeCamp.org.",
  },
  {
    author: "Jessica Wilkins",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/05/jessica-wilkins-gravatar.jpeg",
    url: "https://www.freecodecamp.org/news/author/jessica-wilkins/",
    bio: "I am a musician and a programmer.",
  },
  {
    author: "Ihechikara Vincent Abba",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/01/IMG_20211016_160158_231.jpg",
    url: "https://www.freecodecamp.org/news/author/ihechikara/",
    bio: "This author's bio can be found in his articles!",
  },
  {
    author: "Jennifer Bland",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/05/jennifer-bland-gravatar.jpeg",
    url: "https://www.freecodecamp.org/news/author/ratracegrad/",
    bio: "I am a Senior Software Engineer. Google Developers Expert. Entrepreneur. Mountain Climber. Neil Diamond fanatic. MBA grad. World traveler.",
  },
  {
    author: "Kolade Chris",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2023/01/kolade-recent.jpg",
    url: "https://www.freecodecamp.org/news/author/kolade/",
    bio: "Web developer and technical writer focusing on frontend technologies.",
  },
  {
    author: "Joel Olawanle",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/06/1654890413623.jpg",
    url: "https://www.freecodecamp.org/news/author/joel-olawanle/",
    bio: "Frontend Developer & Technical Writer",
  },
  {
    author: "Beau Carnes",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/05/beau-carnes-gravatar.jpeg",
    url: "https://www.freecodecamp.org/news/author/beau/",
    bio: "I'm a teacher and developer with freeCodeCamp.org. I run the freeCodeCamp.org YouTube channel.",
  },
  {
    author: "Njong Emy",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/05/pfp.jpeg",
    url: "https://www.freecodecamp.org/news/author/afumbom_bingeh/",
    bio: "Computer Engineering undergrad, focusing on frontend development. HTML/CSS/Boostrap/JS/Tailwind. Canva addict too :)",
  },
  {
    author: "Naomi Carrigan",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/11/profile.png",
    url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
    bio: "",
  },
  {
    author: "Dillion Megida",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/03/deee.jpg",
    url: "https://www.freecodecamp.org/news/author/dillionmegida/",
    bio: "Developer Advocate and Content Creator passionate about sharing my knowledge on Tech. I teach JavaScript / ReactJS / NodeJS / React Frameworks / TypeScript / et al",
  },
  {
    author: "TAPAS ADHIKARY",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/02/4AE84473-6762-4606-BBD3-A77E1BBE1188.jpeg",
    url: "https://www.freecodecamp.org/news/author/tapas/",
    bio: "Writer . YouTuber . Creator . Mentor",
  },
  {
    author: "Zaira Hira",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/04/DSC_0649.jpg",
    url: "https://www.freecodecamp.org/news/author/zaira/",
    bio: "I am a DevOps Consultant and writer at FreeCodeCamp. I aim to provide easy and to-the-point content for Techies!",
  },
  {
    author: "Dionysia Lemonaki",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/09/IMG_20210414_073834_736--1-.jpeg",
    url: "https://www.freecodecamp.org/news/author/dionysia/",
    bio: "Learning something new everyday and writing about it",
  },
  {
    author: "Colby Fayock",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2020/03/star-wars-hug-yellow-cropped.png",
    url: "https://www.freecodecamp.org/news/author/colbyfayock/",
    bio: "A Front End Engineer and UX Designer that's passionate about tackling challenges that can make the world a better place. https://www.colbyfayock.com/newsletter/",
  },
  {
    author: "Megan Kaczanowski",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2019/06/Screen-Shot-2019-06-06-at-5.12.59-PM.png",
    url: "https://www.freecodecamp.org/news/author/megansdoingfine/",
    bio: "Threat Intelligence & Security @megansdoingfine",
  },
  {
    author: "Hillary Nyakundi",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/11/WhatsApp_Image_2021-10-18_at_10.33.36_AM-removebg-preview.png",
    url: "https://www.freecodecamp.org/news/author/larymak/",
    bio: "Growing Developer || Python & Open-Source ❤ || Tech Enthusiasts & Writer ✍ 'Every day is a learning Day'",
  },
  {
    author: "Shruti Kapoor",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2019/06/1_-OiP6v1JTJWv0E8mVZBIFQ.jpeg",
    url: "https://www.freecodecamp.org/news/author/shrutikapoor08/",
    bio: "",
  },
  {
    author: "Estefania Cassingena Navone",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2022/12/YouTube-Channel-Icon--1-.png",
    url: "https://www.freecodecamp.org/news/author/estefaniacn/",
    bio: "Developer, technical writer, and content creator @freeCodeCamp. I run the freeCodeCamp.org Español YouTube channel.",
  },
  {
    author: "Kris Koishigawa",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/04/kris-author-image-cropped.jpeg",
    url: "https://www.freecodecamp.org/news/author/kris/",
    bio: "",
  },
  {
    author: "Flavio Copes",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/05/flavio-copes-gravatar.jpeg",
    url: "https://www.freecodecamp.org/news/author/flavio/",
    bio: "",
  },
  {
    author: "Dhawal Shah",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2020/03/dhawal-shah.png",
    url: "https://www.freecodecamp.org/news/author/dhawalhs/",
    bio: "Founder of Class Central.",
  },
  {
    author: "David Clinton",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2019/06/DavidClinton.jpg",
    url: "https://www.freecodecamp.org/news/author/david/",
    bio: "I'm an AWS solutions architect, Linux server professional, and author of books and Pluralsight courses on Linux, AWS, Docker, and IT security.",
  },
  {
    author: "Andrew Brown",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2019/08/andrewbrown.jpg",
    url: "https://www.freecodecamp.org/news/author/andrew/",
    bio: "CEO of ExamPro I was previously the CTO of multiple startups. I'm now AWS Obsessed. I love Star Trek and Coconut Water",
  },
  {
    author: "Zubair Idris Aweda",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/05/zubair-idris-aweda-gravatar.jpeg",
    url: "https://www.freecodecamp.org/news/author/zubair-idris-aweda/",
    bio: "Experienced Software Engineer with a demonstrated history of working in the computer software industry. Skilled in PHP, JavaScript, and other Web Development technologies.",
  },
  {
    author: "Phoebe Voong-Fadel",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2019/08/phoebe.jpeg",
    url: "https://www.freecodecamp.org/news/author/phoebe/",
    bio: "Front-end Web Developer. Mum of two. I love to cook and bake.",
  },
  {
    author: "Lynn Zheng",
    image:
      "https://www.freecodecamp.org/news/content/images/size/w150/2021/06/Seattle-Cherry.png",
    url: "https://www.freecodecamp.org/news/author/lynn/",
    bio: "SWE @ Salesforce | UChicago BS/MS in CS | Personal website: https://ruolinzheng08.github.io/ | YouTube: https://www.youtube.com/channel/UCZ2MeG5jTIqgzEMiByrIzsw",
  },
];

module.exports = authors;
