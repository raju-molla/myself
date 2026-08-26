// Central defaults for every dynamic section of the site. These are used
// as the fallback when no admin-edited content exists in MongoDB yet, and
// as the starting point the admin Content Manager loads into its editor.
// Keep this in sync with what each component actually renders.

export const SITE_CONTENT_DEFAULTS = {
  hero: {
    badge: "AI for Cybersecurity Researcher",
    name: "Raju Molla",
    intro:
      "MSc researcher in Cybersecurity & Digital Forensics building adaptive intrusion detection for edge–cloud–IoT systems, and a full-stack engineer who ships production software in .NET, Node.js and React.",
    location: "London, United Kingdom",
    badgeStat: "TryHackMe — Top 3% Global",
    resumeUrl: "/Raju_Molla_Update_Resume.pdf",
  },

  about: {
    heading: "A little about me",
    paragraphs: [
      "I'm Raju Molla, a software engineer and cybersecurity researcher currently reading for an MSc in Cybersecurity and Digital Forensics at the University of Wales Trinity Saint David in London. My dissertation builds a hybrid intrusion detection system for IoT and cloud environments — combining Random Forest, XGBoost and LSTM Autoencoder anomaly detection with explainable AI and privacy-preserving federated learning.",
      "Before returning to research, I spent three years as a software engineer at Qtec Solution, Bimafy, A1DIGI and Bangla Institute, building backend systems, payment infrastructure and mobile applications for finance, insurance and healthcare products across Next.js, ASP.NET, Express.js and React Native. That production background is what keeps my research grounded — I care as much about whether a detection system can actually run at the edge as I do about its accuracy.",
    ],
    photo: "/molla.png",
    education: [
      {
        school: "University of Wales Trinity Saint David",
        degree: "MSc in Cybersecurity and Digital Forensics",
        date: "Jun 2025 – Jun 2026",
        location: "London, United Kingdom",
        detail:
          "Dissertation: Hybrid Intrusion Detection System for IoT and Cloud Environments. Research areas: AI for Cybersecurity, Intrusion Detection Systems, IoT Security, Cloud Security, Explainable AI.",
      },
      {
        school: "Eastern University",
        degree: "BSc in Computer Science and Engineering — GPA 3.74/4.00",
        date: "Oct 2018 – Feb 2023",
        location: "Dhaka, Bangladesh",
        detail:
          "Research: Cardiovascular Disease Prediction Using Machine Learning. Relevant areas: Machine Learning, Data Mining, Software Engineering, Algorithms.",
      },
    ],
    keySkills: [
      "Adaptive Intrusion Detection (Random Forest, XGBoost, LSTM Autoencoders)",
      "Explainable AI for Security (SHAP)",
      "Full-Stack Development (Next.js, ASP.NET, Express.js)",
      "Mobile App Development (React Native)",
      "Cloud, Edge & IoT Security",
      "Penetration Testing (Kali Linux, Burp Suite, Metasploit)",
      "Database Design (MongoDB, SQL Server, MySQL)",
      "Federated & Privacy-Preserving Machine Learning",
    ],
  },

  skills: {
    categories: [
      {
        category: "Cybersecurity",
        items: [
          "Intrusion Detection Systems",
          "Network Security",
          "Cloud & IoT Security",
          "Threat Detection & Analysis",
          "Digital Forensics",
          "OWASP Top 10",
        ],
      },
      {
        category: "Machine Learning & AI",
        items: [
          "Random Forest",
          "XGBoost",
          "LightGBM",
          "LSTM Autoencoders",
          "Anomaly Detection",
          "Explainable AI (SHAP)",
          "Feature Engineering",
        ],
      },
      {
        category: "Security Tooling",
        items: ["Kali Linux", "Burp Suite", "Nmap", "Metasploit", "SQLMap", "FTK Imager"],
      },
      {
        category: "Frontend",
        items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Framer Motion"],
      },
      {
        category: "Backend & Languages",
        items: ["Node.js", "Express.js", "ASP.NET", "Python", "TypeScript", "C / C++ / C#"],
      },
      {
        category: "Data & Infrastructure",
        items: ["MongoDB", "SQL Server", "MySQL", "Docker", "Git", "Google Cloud"],
      },
    ],
  },

  research: {
    interests: [
      "AI for Cybersecurity",
      "Agentic AI",
      "Federated Learning",
      "Explainable AI (XAI)",
      "Adaptive Intrusion Detection",
      "Adversarial Machine Learning",
      "Trustworthy & Robust ML",
      "Edge–Cloud–IoT Security",
      "Concept Drift Adaptation",
      "Privacy-Preserving ML",
      "Anomaly Detection",
      "Distributed Cyber Defence",
    ],
    current: {
      title: "Adaptive Intrusion Detection for Edge–Cloud–IoT",
      meta: "MSc Research · 2025 – 2026",
      highlights: [
        "Designed a hybrid intrusion detection framework integrating Random Forest, XGBoost, and an LSTM Autoencoder for anomaly detection across heterogeneous edge–cloud–IoT environments.",
        "Built IoT-CloudSec, a multi-context synthetic cybersecurity benchmark spanning IoT telemetry, edge metrics, cloud infrastructure indicators, orchestration telemetry, and streaming-system features for leakage-aware intrusion detection evaluation — published on IEEE DataPort.",
        "Ran temporal evaluation, robustness analysis, and SHAP-based explainable AI analysis for adaptive cyber threat detection.",
        "Investigated concept drift, evolving attack behaviour, unseen-attack detection, telemetry corruption, scalability, and real-time adaptability across distributed infrastructures.",
        "Proposed a privacy-preserving adaptive federated intrusion detection architecture for trustworthy cyber defence across distributed edge–cloud ecosystems.",
      ],
      datasetLabel: "IoT-CloudSec dataset on IEEE DataPort",
      datasetUrl: "https://ieee-dataport.org/documents/iot-cloud-sec",
    },
    publications: [
      {
        title: "Hybrid Intrusion Detection System for IoT and Cloud Environments",
        status: "Preprint · Research Square",
        meta: "DOI: 10.21203/rs.3.rs-10144004/v1",
        href: "https://doi.org/10.21203/rs.3.rs-10144004/v1",
      },
      {
        title:
          "Beyond Permissions: Multi-Layer Monitoring and Forensic Behaviour Graph Analysis for Detecting Hidden and Collusive Chrome Extensions",
        status: "Submitted · Forensic Science International: Digital Investigation (Elsevier)",
        meta: null,
        href: null,
      },
    ],
  },

  projects: {
    items: [
      {
        type: "Research",
        name: "IoT-CloudSec Research Framework",
        description:
          "Hybrid intrusion detection framework combining supervised learning with anomaly-aware sequence modelling, plus SHAP-based explainability and robustness evaluation.",
        stack: "Python, Scikit-learn, TensorFlow, SHAP",
        link: "https://ieee-dataport.org/documents/iot-cloud-sec",
        github: null,
        image: null,
      },
      {
        type: "Web Application",
        name: "UMIS-v2 (Microfinance)",
        description: "Distributed microfinance platform deployed across four countries.",
        stack: "ASP.NET, SQL Server, React.js",
        link: "https://microfin.grapestl.com/",
        github: null,
        image: "/UMIS_v2.png",
      },
      {
        type: "Web Application",
        name: "UMIS — Uganda / Kenya / Zambia / Tanzania",
        description: "Country-specific microfinance deployments serving East African markets.",
        stack: "ASP.NET, Razor Pages, SQL Server, Ajax",
        link: "https://mfug.umoja-international.com/",
        github: null,
        image: "/UMIS.png",
      },
      {
        type: "Web Application",
        name: "JG Healthcare",
        description: "Web platform for healthcare services and patient workflows.",
        stack: "Next.js, Express.js, MongoDB, Bootstrap",
        link: "https://jghealthcare.com/",
        github: null,
        image: "/jg1.png",
      },
      {
        type: "Web Application",
        name: "Visabee",
        description: "Web platform for insurance solutions.",
        stack: "Next.js, Express.js, MongoDB, Bootstrap",
        link: "https://visabee.com.bd/",
        github: null,
        image: "/visabee.png",
      },
      {
        type: "Backend / API",
        name: "Secure Healthcare API System",
        description:
          "Secure RESTful APIs for healthcare data management, with authentication, authorization and protected patient-information workflows.",
        stack: "Node.js, Express.js, MongoDB",
        link: null,
        github: null,
        image: null,
      },
      {
        type: "Mobile App (Android / iOS)",
        name: "Bimafy",
        description: "Mobile app to manage insurance claims, live on Google Play and the App Store.",
        stack: "React Native (Expo), Zustand, React Query",
        link: "https://play.google.com/store/apps/details?id=com.bimafy&hl=en_US",
        github: null,
        image: "/bima.png",
      },
      {
        type: "Mobile App (Android)",
        name: "Bangla Institute",
        description: "Android app for Bangla Institute's mobile services.",
        stack: "Node.js, Express.js, MongoDB",
        link: "https://play.google.com/store/apps/details?id=com.mobile_bangla_institute&hl=en_US",
        github: null,
        image: "/bangla.jpeg",
      },
    ],
  },

  experience: {
    items: [
      {
        company: "Qtec Solution Limited",
        title: "Software Engineer",
        date: "Mar 2024 – Jun 2025",
        location: "Dhaka, Bangladesh",
        description: [
          "Designed and implemented scalable, secure backend systems for financial and healthcare applications, including a payment gateway built on Next.js and MongoDB.",
          "Developed and maintained Uganda Microfinance software (UMIS), fixing and extending deployments across Uganda, Zambia, Kenya, and Tanzania (ASP.NET, Razor Pages, SQL Server).",
          "Built JG Healthcare (jghealthcare.com) and Visabee (visabee.com.bd) — production platforms on Next.js, Express.js, MongoDB and Bootstrap.",
          "Collaborated with international teams to deploy systems across multiple regions with an emphasis on data integrity and reliability.",
        ],
      },
      {
        company: "Bimafy Limited",
        title: "Software Engineer (React Native)",
        date: "Oct 2023 – Feb 2024",
        location: "Dhaka, Bangladesh",
        description: [
          "Developed and deployed cross-platform insurance-claims apps for iOS and Android using React Native, Zustand and React Query.",
          "Integrated Google Cloud APIs and built OCR functionality with OpenCV-Python and EasyOCR, exposed via a Flask API.",
          "Resolved complex bugs and led implementation of new features, contributing to a more stable release cycle.",
        ],
      },
      {
        company: "A1DIGI",
        title: "Software Engineer",
        date: "Jun 2023 – Oct 2023",
        location: "Dhaka, Bangladesh",
        description: [
          "Built software on the WhatsApp API with a Node.js backend, Next.js frontend and MongoDB.",
          "Developed a full-stack website using the MERN stack and contributed to mobile development in React Native.",
          "Mentored interns on React.js and Node.js.",
        ],
      },
      {
        company: "Bangla Institute",
        title: "Backend Engineer Intern",
        date: "Dec 2022 – Jun 2023",
        location: "Remote",
        description: [
          "Built backend services and secure authentication systems using Node.js and Express.js.",
          "Designed scalable data models and optimised database performance on MongoDB.",
          "Delivered a companion Android app for Bangla Institute's mobile services.",
        ],
      },
    ],
  },

  achievements: {
    stats: [
      { icon: "target", value: "Top 3%", label: "TryHackMe, Global" },
      { icon: "code", value: "130+", label: "Offensive & defensive security labs" },
      { icon: "trophy", value: "ICPC 2023", label: "Dhaka Regional participant" },
      { icon: "award", value: "37th & 38th", label: "Eastern University contests — Champion" },
    ],
    contests: [
      "ICPC Dhaka Regional Contest 2023",
      "CEFALO SUST Inter-University Contest 2023",
      "EU 38th Intra-Faculty Contest (2022) — Champion",
      "EU 37th Intra-Faculty Contest (2022) — Champion",
      "BUET Inter-University Programming Contest 2022",
      "EU 36th Intra-Faculty Contest (2022) — 1st Runner-up",
      "ICPC Preliminary Contest 2021",
      "EU 34th Intra Contest (2021) — 6th Place",
      "EU 33rd Intra Contest (2021) — 7th Place",
      "Varendra Univ. Inter Contest (2019) — 36th Place",
      "EU Intra Contest (2019) — 9th Place",
    ],
  },

  testimonials: {
    items: [
      {
        name: "Sagir Ahmed",
        title: "Software Engineer Lead at Qtec Solution",
        quote:
          "Raju is a highly skilled and dedicated software engineer. His problem-solving abilities and commitment to quality are truly commendable. He was a valuable asset to our team.",
        image: "/sag.jpeg",
      },
      {
        name: "MD. Altaf Hossain",
        title: "Senior Software Engineer at Qtec Solution",
        quote:
          "I had the pleasure of working with Raju on a complex project. His technical expertise, especially in React Native, was outstanding. He's also a great team player.",
        image: "/altaf.jpeg",
      },
      {
        name: "Biprajit Karmakar",
        title: "Software Engineer",
        quote:
          "Raju consistently delivered high-quality work on time. He's proactive, communicates effectively, and is always willing to go the extra mile. I highly recommend him.",
        image: "/bip.jpeg",
      },
    ],
  },

  contact: {
    heading: "Let's connect",
  },
};

export const SITE_CONTENT_SECTIONS = Object.keys(SITE_CONTENT_DEFAULTS);
