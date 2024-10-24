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

export const version = 9;

/*

  {
    title: "Government",
    desc: "Optimize governmental systems for fairness and efficiency",
    items: [
      {
        date: "2061-01-31",
        title:
          "Research extensively on governmental systems and optimization methods",
        done: false,
      },
      {
        date: "2061-02-31",
        title:
          "Gather a team of experts in political science, economics, and data analysis",
        done: false,
      },
      {
        date: "2062-01-31",
        title:
          "Build a strong public profile through community service and leadership roles",
        done: false,
      },
      {
        date: "2063-06-31",
        title: "Run for president as an Independent candidate",
        done: false,
      },
      {
        date: "2064-11-31",
        title: "Win the presidency and implement data-driven policies",
        done: false,
      },
      {
        date: "2066-01-31",
        title: "Optimize the US government to an extreme extent",
        done: false,
      },
      {
        date: "2068-12-31",
        title: "Reform global governance systems for fairness and efficiency",
        done: false,
      },
    ],
  },
*/

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
        date: "2028-12-01",
        title:
          "Research extensively on poverty eradication strategies and AGI robots",
        done: false,
      },
      {
        date: "2029-01-31",
        title: "Gather a team of genius people in AI and robotics",
        done: false,
      },
      {
        date: "2029-02-31",
        title: "Create a company focused on developing AGI robots",
        done: false,
      },
      {
        date: "2029-07-31",
        title:
          "Use existing research to develop a robot matching current capabilities",
        done: false,
      },
      {
        date: "2030-10-31",
        title: "Fail 10,000 times, lose money, keep going anyway",
        done: false,
      },
      {
        date: "2032-01-31",
        title: "Innovate to create a robot that can do anything a human can do",
        done: false,
      },
      {
        date: "2035-01-31",
        title: "Reduce the cost to make the robot cheaper than $5,000",
        done: false,
      },
      {
        date: "2039-01-31",
        title:
          "Establish Universal Basic Income (UBI) for first-world countries",
        done: false,
      },
      {
        date: "2043-01-31",
        title: "Expand UBI to all other countries",
        done: false,
      },
    ],
  },
  {
    title: "Longer lifespan",
    desc: "Allow humans to live as long as they wish",
    items: [
      {
        date: "2035-01-31",
        title:
          "Research extensively on biological immortality and anti-aging technologies",
        done: false,
      },
      {
        date: "2035-02-31",
        title: "Gather a team of genius people in biotechnology and genetics",
        done: false,
      },
      {
        date: "2035-03-31",
        title: "Create a company focused on anti-aging research and therapies",
        done: false,
      },
      {
        date: "2037-10-31",
        title: "Fail 10,000 times, lose money, keep going anyway",
        done: false,
      },
      {
        date: "2039-01-31",
        title: "Expand the human life at a rate proportional to time",
        done: false,
      },
      {
        date: "2039-06-31",
        title: "Obtain regulatory approvals for anti-aging therapies",
        done: false,
      },
      {
        date: "2046-01-31",
        title: "Make treatments affordable and accessible globally",
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
        date: "2028-12-31",
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
        date: "2040-01-31",
        title: "Research extensively on the root causes of hatred and war",
        done: false,
      },
      {
        date: "2040-01-31",
        title:
          "Gather a team of experts in psychology, sociology, and international relations",
        done: false,
      },
      {
        date: "2040-06-31",
        title:
          "Develop educational programs promoting empathy and cultural understanding",
        done: false,
      },
      {
        date: "2041-01-31",
        title:
          "To be determined. (This one's difficult to plan for. I'll finish it soon)",
        done: false,
      },
    ],
  },
  {
    title: "Intelligence",
    desc: "Enhance human intelligence through safe and ethical methods",
    items: [
      {
        date: "2045-01-31",
        title: "Research extensively on enhancing human intelligence",
        done: false,
      },
      {
        date: "2045-02-31",
        title:
          "Gather a team of experts in neuroscience, cognitive science, and AI",
        done: false,
      },

      {
        date: "2047-10-31",
        title: "Fail 10,000 times, lose money, keep going anyway",
        done: false,
      },
      {
        date: "2049-01-31",
        title:
          "Develop cognitive enhancement technologies that are safe and ethical",
        done: false,
      },
      {
        date: "2050-01-31",
        title: "Create brain-computer interfaces to augment human intelligence",
        done: false,
      },
      {
        date: "2053-01-31",
        title: "Conduct trials to ensure safety and effectiveness",
        done: false,
      },
      {
        date: "2060-01-31",
        title: "Make intelligence enhancement accessible to all",
        done: false,
      },
    ],
  },
  {
    title: "Hunger",
    desc: "Eliminate hunger by developing affordable, tasty non-animal food",
    items: [
      {
        date: "2040-01-31",
        title:
          "Research extensively on sustainable food production and plant-based alternatives",
        done: false,
      },
      {
        date: "2040-01-31",
        title:
          "Gather a team of experts in food science, agriculture, and biotechnology",
        done: false,
      },
      {
        date: "2042-10-31",
        title: "Fail 10,000 times, lose money, keep going anyway",
        done: false,
      },
      {
        date: "2044-01-31",
        title:
          "Develop non-animal food that is cheap, healthy, and can taste like anything",
        done: false,
      },
      {
        date: "2045-01-31",
        title: "Scale production to reduce costs and increase availability",
        done: false,
      },
      {
        date: "2047-01-31",
        title: "Partner with governments and NGOs to distribute food globally",
        done: false,
      },
      {
        date: "2050-01-31",
        title: "Eliminate hunger by making affordable food globally available",
        done: false,
      },
    ],
  },
  {
    title: "Human Limitations",
    desc: "Overcome human biological and cognitive limitations",
    items: [
      {
        date: "2055-01-31",
        title: "Research extensively on overcoming human limitations",
        done: false,
      },
      {
        date: "2055-02-31",
        title:
          "Gather a team of genius people in neuroscience, genetics, and technology",
        done: false,
      },
      {
        date: "2057-10-31",
        title: "Fail 10,000 times, lose money, keep going anyway",
        done: false,
      },
      {
        date: "2059-01-31",
        title: "Develop technologies for perfect memory enhancement",
        done: false,
      },
      {
        date: "2065-01-31",
        title:
          "Develop technologies to alter subjective time perception safely via brain chip",
        done: false,
      },
      {
        date: "2067-01-31",
        title: "Create methods to record and revisit past experiences",
        done: false,
      },
      {
        date: "2061-01-31",
        title: "Create solutions to defeat disabilities brain chips",
        done: false,
      },
      {
        date: "2063-01-31",
        title: "Eliminate non-helpful pain through brain chips",
        done: false,
      },
      {
        date: "2065-01-31",
        title: "Remove language barriers with universal translators",
        done: false,
      },
    ],
  },
];
