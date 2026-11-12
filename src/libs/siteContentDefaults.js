// Central defaults for every dynamic section of the site. These are used
// as the fallback when no admin-edited content exists in MongoDB yet, and
// as the starting point the admin Content Manager loads into its editor.
// Keep this in sync with what each component actually renders.

export const SITE_CONTENT_DEFAULTS = {
  hero: {
    badge: "PhD Researcher · Computer Science",
    name: "Raju Molla",
    intro:
      "PhD researcher at Keele University working at the intersection of artificial intelligence, cybersecurity and software engineering. I turn complex research into systems people can rely on.",
    location: "London, United Kingdom",
    badgeStat: "TryHackMe — Top 3% Global",
    resumeUrl: "/Raju_Molla_Update_Resume.pdf",
  },

  about: {
    heading: "Research with real-world roots",
    paragraphs: [
      "I'm a PhD researcher in Computer Science at Keele University. My research interests include AI for cybersecurity, adaptive intrusion detection, explainable and federated learning, and trustworthy machine learning.",
      "Before starting my PhD, I completed an MSc in Cybersecurity and Digital Forensics with Distinction and worked as a software engineer building financial, healthcare and mobile products. That experience keeps my research grounded in the systems people actually use.",
    ],
    photo: "/raju_molla_img.jpg",
    education: [
      {
        school: "Keele University",
        degree: "PhD in Computer Science",
        date: "Nov 2026 – Present",
        location: "Keele, United Kingdom",
        detail: "School of Computer Science and Mathematics. Full-time doctoral researcher.",
      },
      {
        school: "University of Wales Trinity Saint David",
        degree: "MSc in Cybersecurity and Digital Forensics — Distinction",
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
        status: "Preprint · SSRN",
        meta: "SSRN: 6906046",
        href: "https://ssrn.com/abstract=6906046",
      },
      {
        title:
          "IoT-CloudSec: A Multi-Protocol, Multi-Context Simulation Benchmark for Leakage-Aware IoT Intrusion Detection Evaluation",
        status: "Under revision · IEEE Access",
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
          "A hybrid intrusion detection framework and multi-context benchmark for IoT, edge and cloud security, with SHAP explainability and temporal robustness evaluation.",
        stack: "Python, Scikit-learn, TensorFlow, SHAP",
        link: "https://ieee-dataport.org/documents/iot-cloud-sec",
        github: null,
        image: null,
      },
      {
        type: "Distributed Platform",
        name: "UMIS-v2 · Distributed Microfinance",
        description:
          "Scalable backend services, secure APIs and transaction-processing workflows for a multi-country microfinance platform across East Africa.",
        stack: "ASP.NET, Razor Pages, SQL Server",
        link: "https://microfin.grapestl.com/",
        github: null,
        image: "/UMIS_v2.png",
      },
      {
        type: "Backend / API",
        name: "Secure Healthcare API System",
        description:
          "Secure REST APIs for healthcare data, with authentication, authorization and privacy-focused patient-information workflows.",
        stack: "Node.js, Express.js, MongoDB",
        link: null,
        github: null,
        image: null,
      },
    ],
  },

  experience: {
    items: [
      {
        company: "Qtec Solution Limited",
        title: "Software Engineer",
        date: "May 2024 – Jun 2025",
        location: "Dhaka, Bangladesh",
        description: [
          "Designed and implemented scalable, secure backend systems for financial and healthcare applications.",
          "Developed distributed systems and APIs with an emphasis on data integrity and reliability.",
          "Collaborated with international teams to deploy systems across multiple regions.",
        ],
      },
      {
        company: "Bimafy Limited",
        title: "Software Developer",
        date: "Dec 2023 – Apr 2024",
        location: "Dhaka, Bangladesh",
        description: [
          "Developed cross-platform mobile applications with integrated cloud services and OCR functionality.",
          "Implemented secure API integrations and real-time application features.",
        ],
      },
      {
        company: "Bangla Institute",
        title: "Backend Engineer Intern",
        date: "Mar 2023 – Jul 2023",
        location: "Remote",
        description: [
          "Built backend services and secure authentication systems using Node.js and Express.js.",
          "Optimised database performance and designed scalable data models.",
        ],
      },
    ],
  },

  achievements: {
    stats: [
      { icon: "target", value: "Top 3%", label: "TryHackMe, Global" },
      { icon: "code", value: "130+", label: "Hands-on security labs" },
      { icon: "trophy", value: "ICPC 2023", label: "Dhaka Regional participant" },
      { icon: "award", value: "Champion", label: "Eastern University 37th & 38th contests" },
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
