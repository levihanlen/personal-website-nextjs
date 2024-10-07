export interface Roadmap {
  title: string;
  desc: string;
  items: RoadmapItem[];
}

export interface RoadmapItem {
  date: string;
  title: string;
  done: boolean;
}

export const roadmap: Roadmap[] = [
  {
    title: "Personal Mastery",
    desc: "Achieve personal mastery and gain enough money to make the other pursuits feasible",
    items: [
      {
        date: "2024-08-31",
        title:
          "Research extensively on personal development and mastery techniques",
        done: true,
      },
      {
        date: "2025-10-31",
        title: "Find a mentor who can guide and teach me",
        done: false,
      },
      {
        date: "2035-12-31",
        title: "Read 1,000 books",
        done: false,
      },
      {
        date: "2025-01-31",
        title: "Create 10,000 Anki cards",
        done: false,
      },
      {
        date: "2026-04-31",
        title: "Create 100,000 Anki cards",
        done: false,
      },
      {
        date: "2028-04-31",
        title: "Create 200,000 Anki cards",
        done: false,
      },
      {
        date: "2028-08-31",
        title: "Become celibate to focus energy and discipline",
        done: false,
      },
      {
        date: "2026-01-31",
        title: "Study and practice leadership to become great at it",
        done: false,
      },
      {
        date: "2024-11-01",
        title: "Publish a full-stack app",
        done: false,
      },
      {
        date: "2024-04-31",
        title: "Make $50 off a business",
        done: true,
      },
      {
        date: "2024-11-31",
        title: "Make $100 off a business",
        done: false,
      },
      {
        date: "2025-01-31",
        title: "Make $1,000 off a business",
        done: false,
      },
      {
        date: "2025-04-31",
        title: "Make $10,000 off a business",
        done: false,
      },
      {
        date: "2025-08-31",
        title: "Make $100,000 off a business",
        done: false,
      },
      {
        date: "2026-08-31",
        title: "Make $1,000,000 off a business",
        done: false,
      },
      {
        date: "2028-04-31",
        title: "Make $10,000,000 off a business",
        done: false,
      },
      {
        date: "2028-01-31",
        title:
          "Increase daily innovations to 560x to become the greatest iterator",
        done: false,
      },
      {
        date: "2029-06-31",
        title: "Achieve complete mastery of desire, emotions, and willpower",
        done: false,
      },
      {
        date: "2026-06-31",
        title: "Have effectively perfect morals",
        done: false,
      },
    ],
  },
  {
    title: "Poverty",
    desc: "Eradicate poverty through developing AGI robots and implementing UBI",
    items: [
      {
        date: "2024-12-31",
        title:
          "Research extensively on poverty eradication strategies and AGI robots",
        done: false,
      },
      {
        date: "2025-12-31",
        title: "Gather a team of super smart people in AI and robotics",
        done: false,
      },
      {
        date: "2026-12-31",
        title: "Create a company focused on developing AGI robots",
        done: false,
      },
      {
        date: "2027-12-31",
        title:
          "Use existing research to develop a robot matching current capabilities",
        done: false,
      },
      {
        date: "2029-12-31",
        title: "Innovate to create a robot that can do anything a human can do",
        done: false,
      },
      {
        date: "2031-12-31",
        title: "Reduce the cost to make the robot cheaper than $5,000",
        done: false,
      },
      {
        date: "2033-12-31",
        title:
          "Establish Universal Basic Income (UBI) for first-world countries",
        done: false,
      },
      {
        date: "2035-12-31",
        title: "Expand UBI to all other countries",
        done: false,
      },
    ],
  },
  {
    title: "Immortality",
    desc: "Achieve biological immortality through anti-aging research and therapies",
    items: [
      {
        date: "2024-12-31",
        title:
          "Research extensively on biological immortality and anti-aging technologies",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of super smart people in biotechnology and genetics",
        done: false,
      },
      {
        date: "2026-12-31",
        title: "Create a company focused on anti-aging research and therapies",
        done: false,
      },
      {
        date: "2028-12-31",
        title: "Develop gene therapies targeting aging processes in cells",
        done: false,
      },
      {
        date: "2030-12-31",
        title: "Conduct clinical trials for anti-aging treatments",
        done: false,
      },
      {
        date: "2032-12-31",
        title: "Obtain regulatory approvals for anti-aging therapies",
        done: false,
      },
      {
        date: "2035-12-31",
        title: "Make treatments affordable and accessible globally",
        done: false,
      },
    ],
  },
  {
    title: "Government",
    desc: "Optimize governmental systems for fairness and efficiency",
    items: [
      {
        date: "2024-12-31",
        title:
          "Research extensively on governmental systems and optimization methods",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of experts in political science, economics, and data analysis",
        done: false,
      },
      {
        date: "2026-12-31",
        title:
          "Build a strong public profile through community service and leadership roles",
        done: false,
      },
      {
        date: "2028-12-31",
        title: "Run for local office to gain political experience",
        done: false,
      },
      {
        date: "2036-12-31",
        title: "Run for president as an Independent candidate",
        done: false,
      },
      {
        date: "2040-12-31",
        title: "Win the presidency and implement data-driven policies",
        done: false,
      },
      {
        date: "2042-12-31",
        title: "Optimize the US government to an extreme extent",
        done: false,
      },
      {
        date: "2045-12-31",
        title: "Reform global governance systems for fairness and efficiency",
        done: false,
      },
    ],
  },
  {
    title: "Knowledge",
    desc: "Create a global, open-access education system with AI teachers",
    items: [
      {
        date: "2025-05-31",
        title:
          "Research extensively on gamification, learning, global education systems, and AI technology",
        done: false,
      },
      {
        date: "2025-06-31",
        title: "Find a co-founder for an education business",
        done: false,
      },
      {
        date: "2025-07-31",
        title: "Create a company to develop AI-powered education platforms",
        done: false,
      },
      {
        date: "2025-08-31",
        title: "Ship an MVP education platform",
        done: false,
      },
      {
        date: "2025-10-31",
        title: "Fail 10,000 times, lose money, keep going anyway",
        done: false,
      },
      {
        date: "2025-12-31",
        title: "Do extensive research and development to refine",
        done: false,
      },
      {
        date: "2026-01-31",
        title: "License the app to one education system",
        done: false,
      },
      {
        date: "2027-12-31",
        title: "License the app to a foreign education system",
        done: false,
      },
      {
        date: "2029-12-31",
        title:
          "Keep the team light but self-sufficient enough to where I am not integral",
        done: false,
      },
      {
        date: "2030-12-31",
        title: "Scale up the app a ton",
        done: false,
      },
    ],
  },
  {
    title: "World Peace",
    desc: "Promote global peace by addressing the root causes of hatred and war",
    items: [
      {
        date: "2024-12-31",
        title: "Research extensively on the root causes of hatred and war",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of experts in psychology, sociology, and international relations",
        done: false,
      },
      {
        date: "2026-12-31",
        title:
          "Develop educational programs promoting empathy and cultural understanding",
        done: false,
      },
      {
        date: "2028-12-31",
        title:
          "Implement global peace initiatives through international organizations",
        done: false,
      },
      {
        date: "2030-12-31",
        title: "Facilitate dialogues between conflicting parties worldwide",
        done: false,
      },
      {
        date: "2035-12-31",
        title: "Promote disarmament and conflict resolution strategies",
        done: false,
      },
    ],
  },
  {
    title: "Intelligence",
    desc: "Enhance human intelligence through safe and ethical methods",
    items: [
      {
        date: "2024-12-31",
        title: "Research extensively on enhancing human intelligence",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of experts in neuroscience, cognitive science, and AI",
        done: false,
      },
      {
        date: "2027-12-31",
        title:
          "Develop cognitive enhancement technologies that are safe and ethical",
        done: false,
      },
      {
        date: "2029-12-31",
        title: "Create brain-computer interfaces to augment human intelligence",
        done: false,
      },
      {
        date: "2031-12-31",
        title: "Conduct trials to ensure safety and effectiveness",
        done: false,
      },
      {
        date: "2036-12-31",
        title: "Make intelligence enhancement accessible to all",
        done: false,
      },
    ],
  },
  {
    title: "Hunger",
    desc: "Eliminate hunger by developing affordable, tasty vegan food",
    items: [
      {
        date: "2024-12-31",
        title:
          "Research extensively on sustainable food production and plant-based alternatives",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of experts in food science, agriculture, and biotechnology",
        done: false,
      },
      {
        date: "2027-12-31",
        title:
          "Develop vegan food that is cheap, healthy, and can taste like anything",
        done: false,
      },
      {
        date: "2029-12-31",
        title: "Scale production to reduce costs and increase availability",
        done: false,
      },
      {
        date: "2030-12-31",
        title: "Partner with governments and NGOs to distribute food globally",
        done: false,
      },
      {
        date: "2032-12-31",
        title:
          "Eliminate hunger by making affordable vegan food globally available",
        done: false,
      },
    ],
  },
  {
    title: "Human Limitations",
    desc: "Overcome human biological and cognitive limitations",
    items: [
      {
        date: "2024-12-31",
        title: "Research extensively on overcoming human limitations",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of super smart people in neuroscience, genetics, and technology",
        done: false,
      },
      {
        date: "2027-12-31",
        title: "Develop technologies for perfect memory enhancement",
        done: false,
      },
      {
        date: "2028-12-31",
        title:
          "Create solutions to defeat disabilities through prosthetics and gene therapy",
        done: false,
      },
      {
        date: "2029-12-31",
        title: "Work on methods to increase IQ safely",
        done: false,
      },
      {
        date: "2030-12-31",
        title: "Develop techniques to decrease the tendency to anger",
        done: false,
      },
      {
        date: "2032-12-31",
        title:
          "Eliminate non-helpful pain through advanced medical interventions",
        done: false,
      },
      {
        date: "2033-12-31",
        title: "Break down language barriers with universal translators",
        done: false,
      },
    ],
  },
  {
    title: "Time",
    desc: "Develop technologies to alter time perception and revisit past experiences",
    items: [
      {
        date: "2024-12-31",
        title:
          "Research extensively on time perception and cognitive experience",
        done: false,
      },
      {
        date: "2025-12-31",
        title:
          "Gather a team of experts in neuroscience, physics, and technology",
        done: false,
      },
      {
        date: "2027-12-31",
        title:
          "Develop technologies to alter subjective time perception safely",
        done: false,
      },
      {
        date: "2029-12-31",
        title: "Create methods to record and revisit past experiences",
        done: false,
      },
      {
        date: "2030-12-31",
        title:
          "Ensure ethical guidelines are in place for time perception technologies",
        done: false,
      },
      {
        date: "2040-12-31",
        title: "Implement time perception technologies for public use",
        done: false,
      },
    ],
  },
];
