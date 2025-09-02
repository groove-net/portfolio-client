import { SafeHtml } from "@angular/platform-browser";

export interface Devlog {
  name: string;
  lastModified: string | undefined;
  content: string;
  contentAsHtml: SafeHtml | undefined;
}

export const devlogs: Devlog[] = [
  {
    name: 'Getting Started with WebSockets',
    lastModified: '2025-07-01',
    content: `
      <p>This devlog explores WebSockets in real-time apps.
      We cover setup, server integration, and debugging tips.</p>
      <p>Retro note: It's like keeping a terminal session open with live uplastModifieds.</p>
    `,
    contentAsHtml: ''
  },
  {
    name: 'Dockerizing My Workflow',
    lastModified: '2025-07-05',
    content: `
      <p>In this devlog, I containerized my dev environment with Docker.
      From Node.js servers to databases, all reproducible with a single command.</p>
      <p>Feels like booting up a retro VM — but way faster!</p>
    `,
    contentAsHtml: ''
  },
  {
    name: 'Building a CLI Tool in Linux',
    lastModified: '2025-07-12',
    content: `
      <p>This devlog documents writing a CLI tool in Node.js.
      It parses arguments, executes commands, and prints results like an old-school terminal app.</p>
    `,
    contentAsHtml: ''
  }
];
