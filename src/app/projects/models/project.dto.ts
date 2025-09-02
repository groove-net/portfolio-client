export interface Project {
  name: string;
  visibility: string;
  description: string | undefined;
  pushedAt: string; // YYYY-MM-DD
  url: string;
  resourcePath: string;
  homepageUrl: string | undefined;
  languages: string[];
  repositoryTopics: string[];
  imgSrc: string | null;
}

export const projects: Project[] = [
  {
    name: "Project One",
    visibility: "PUBLIC",
    description: "A retro-styled web experiment built with HTML, CSS, and JS.",
    pushedAt: "2025-07-20",
    url: "/",
    resourcePath: "/",
    homepageUrl: undefined,
    repositoryTopics: ["WebSockets", "CLI", "Linux"],
    languages: ["HTML", "CSS", "JS"],
    imgSrc: null,
  },
  {
    name: "Project Two",
    visibility: "PUBLIC",
    description: "Minimalist design meets modern functionality.",
    pushedAt: "2025-06-15",
    url: "/",
    resourcePath: "/",
    homepageUrl: undefined,
    repositoryTopics: ["Docker", "Linux"],
    languages: ["HTML", "CSS", "JS"],
    imgSrc: null,
  },
  {
    name: "Project Three",
    visibility: "PUBLIC",
    description: "Experimental UI with retro terminal inspiration.",
    pushedAt: "2025-05-30",
    url: "/",
    resourcePath: "/",
    homepageUrl: undefined,
    repositoryTopics: ["WebSockets", "Linux"],
    languages: ["HTML", "CSS", "JS"],
    imgSrc: null,
  },
  {
    name: "Project Four",
    visibility: "PUBLIC",
    description: "A retro-inspired creative project with a clean aesthetic.",
    pushedAt: "2025-04-18",
    url: "/",
    resourcePath: "/",
    homepageUrl: undefined,
    repositoryTopics: ["CLI", "Docker"],
    languages: ["HTML", "CSS", "JS"],
    imgSrc: null,
  }
];
