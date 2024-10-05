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
    title: "Universal Basic Income",
    desc: "This is the description",
    items: [
      {
        date: "2030-02-12",
        title:
          "Test with super long text that will test wrapping fart that goes on for a long while",
        done: true,
      },
      {
        date: "2030-08-12",
        title: "Test",
        done: false,
      },
      {
        date: "2030-12-12",
        title: "Test",
        done: false,
      },
      {
        date: "2020-12-12",
        title: "Test",
        done: false,
      },
      {
        date: "2024-12-12",
        title: "Test",
        done: false,
      },
      {
        date: "2024-10-12",
        title: "Test",
        done: false,
      },
      {
        date: "2024-10-01",
        title: "Test",
        done: false,
      },
    ],
  },

  {
    title: "Test",
    desc: "This is the description",
    items: [
      {
        date: "2024-12-12",
        title: "Test",
        done: false,
      },
      {
        date: "2024-10-12",
        title: "Test",
        done: false,
      },
      {
        date: "2024-10-01",
        title: "Test",
        done: false,
      },
    ],
  },
];
