export const defaultPortfolioData = {
  hero: {
    name: "Sayantan",
    surname: "Sarkar",
    subtitle: "A highly motivated Computer Science graduate with a strong foundation in software development. Proficient in modern web technologies and eager to build scalable applications.",
    profileImage: "/profile.jpg",
    resumeLink: "/resume.pdf"
  },
  about: {
    description: "A highly motivated and adaptable Computer Science graduate with a strong foundation in software development, data structures, and algorithms. Proficient in languages such as Python and Java, with hands-on experience in building web applications through academic projects. Possesses a strong aptitude for mastering new technologies and is eager to apply this skill to become a valuable asset to your team.",
    skills: ['Python', 'Java', 'C', 'SQL', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'Tailwind CSS'],
    resumeLink: "/resume.pdf"
  },
  projects: [
    {
      id: 1,
      title: 'Online Jewellery Shopping System',
      description: 'Developed full-stack e-commerce platform for jewellery shopping. Implemented secure authentication and Stripe payment gateway.',
      tech: ['TypeScript', 'Node.js', 'Kinde', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
      github: 'https://github.com/SayantanS01/jewellery_shopping-main',
      live: '#',
      isVisible: true
    },
    {
      id: 2,
      title: 'Social Network Analysis for Criminal Networks',
      description: 'Modeled criminal networks using signed graphs. Computed Centrality and designed IM-Vector for influence maximization.',
      tech: ['Python', 'NetworkX', 'Pandas', 'Matplotlib'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      github: '#',
      live: '#',
      isVisible: true
    },
    {
      id: 3,
      title: 'Scholarly Quiz',
      description: 'A responsive Next.js application for creating and taking scholarly quizzes.',
      tech: ['Next.js', 'TypeScript', 'Prisma'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      github: 'https://github.com/SayantanS01/scholarly-quiz',
      live: 'https://scholarly-quiz.vercel.app/',
      isVisible: true
    },
    {
      id: 4,
      title: 'YT Play',
      description: 'A YouTube media utility built with Next.js, featuring a clean UI and Prisma database integration.',
      tech: ['Next.js', 'TypeScript', 'Prisma'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
      github: 'https://github.com/SayantanS01/yt-play',
      live: 'https://yt-play-amber.vercel.app/',
      isVisible: true
    },
    {
      id: 5,
      title: 'Love Con',
      description: 'An interactive web platform built with Next.js and modern styling.',
      tech: ['Next.js', 'TypeScript', 'CSS'],
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
      github: 'https://github.com/SayantanS01/love-con',
      live: 'https://love-con.vercel.app/',
      isVisible: false // Hidden as requested
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Mampi Biswas",
      role: "Client",
      project: "Birthday Surprise Website",
      link: "https://example.com",
      rating: 5,
      text: "Sayantan built the most amazing and magical birthday website for me. The 3D animations and the themes were absolutely breathtaking. It was the best surprise I could have ever asked for!",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    }
  ]
};
