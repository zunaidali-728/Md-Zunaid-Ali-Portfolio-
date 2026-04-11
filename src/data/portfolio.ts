export const portfolioData = {
  personal: {
    name: "Md Zunaid Ali",
    role: "Software Engineer",
    location: "Kolkata, India",
    bio: "I am a Software Engineer with expertise in Java backend development, Spring Boot, REST APIs, and Android applications. I design efficient, maintainable systems that deliver real-world value. Currently at Tata Consultancy Services, Kolkata.",
    email: "md.zunaid.ali@gmail.com",
    phone: "+91 8252300728",
    github: "https://github.com/zunaidali-728",
    linkedin: "https://www.linkedin.com/in/md-zunaid-ali-315bb8229",
    resume: "/ZunaidAli_updatedResume.pdf",
    avatar: "/profile.jpg",
  },
  experience: [
    {
      company: "Tata Consultancy Services",
      role: "Software Engineer",
      period: "2026 – Present",
      location: "Kolkata",
      bullets: [
        "Developed backend components using Core Java and multithreading",
        "Built scalable modules using JDBC and Servlets for database transactions",
        "Optimized Oracle SQL queries improving data retrieval speed",
        "Improved database performance using indexing and query tuning",
        "Integrated REST APIs and applied Spring framework basics",
      ]
    },
    {
      company: "Nagarro",
      role: "Android Developer Intern",
      period: "Feb 2024 – Dec 2024",
      location: "Remote",
      bullets: [
        "Developed Android apps using Java, XML and Material Design",
        "Implemented MVVM architecture with LiveData and ViewModel",
        "Integrated REST APIs using Retrofit and Firebase",
        "Built authentication flows and navigation features",
        "Optimized UI using RecyclerView and Room database",
      ]
    }
  ],
  skills: {
    Languages: ["Java", "Python", "PL/SQL"],
    Frameworks: ["React JS", "Three.js", "React Three Fiber", "Spring", "Spring Boot", "REST APIs", "MVVM", "Android"],
    Databases: ["Oracle SQL", "MySQL", "Firebase"],
    Tools: ["Framer Motion", "GSAP", "Tailwind CSS", "Vite", "GitHub", "Docker", "Postman"],
  },
  projects: [
    {
      title: "Food Donation Android App",
      description: "Android application connecting food donors with NGOs to reduce wastage and help distribute food efficiently across communities.",
      image: "/foodApp.png",
      tech: ["Java", "Android", "Firebase", "MVVM"],
      github: "https://github.com/zunaidali-728/Food---Donation-APP",
    },
    {
      title: "Portfolio Website",
      description: "Modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion with fluid scroll animations and responsive layout.",
      image: "/portfolio.png",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://zunaid-portfolio-app.vercel.app/",
    }
  ],
  education: [
    {
      institution: "Institute of Engineering and Management, Kolkata",
      degree: "B.Tech Computer Science & Engineering",
      period: "2021 – 2025",
      result: "DGPA: 8.58",
    },
    {
      institution: "Guru Gobind Singh Public School",
      degree: "Higher Secondary (Class XII)",
      period: "2019",
      result: "90%",
    },
    {
      institution: "DAV Public School",
      degree: "Secondary Education (Class X)",
      period: "2017",
      result: "CGPA: 9.8",
    }
  ],
  stats: [
    { value: 8.58, label: "DGPA", sublabel: "B.Tech CSE"    },
    {
      value: 1,
      suffix: '+',
      label: 'YEARS',
      sublabel: 'Experience'
    },
    { value: 15, suffix: "+", label: "Technologies", sublabel: "In daily workflow" },
  ]
};
