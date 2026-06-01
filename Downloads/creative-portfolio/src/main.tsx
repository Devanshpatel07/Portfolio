import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
// ==========================================
// PORTFOLIO PROJECTS CONFIGURATION
// ==========================================
// To add a new project, simply append a new object to the `projects` array below.
// Ensure your object follows this structure:
// {
//   title: "Your Project Name",
//   description: "A professional, detailed description of your project.",
//   category: "Web Development / UI Design / Mobile App",
//   image: "Path to thumbnail image (e.g. './your-screenshot.png')",
//   liveLink: "URL to deployed demo",
//   githubLink: "URL to source repository",
//   tags: ["React", "TypeScript", "Next.js"]
// }
export const projects = [
  {
    title: "Steller - Project Management Tool",
    description: "Steller is a cutting-edge project management tool built with React and Supabase, designed to streamline workflows and enhance team collaboration. Featuring a modern, intuitive interface and robust project tracking capabilities, Steller empowers teams to manage tasks, monitor progress, and achieve project milestones with efficiency and clarity. The platform combines seamless user experience with powerful functionality, making it an essential tool for modern project management.",
    category: "Web Development / UI Design",
    image: "/steller.png",
    liveLink: "https://steller-project-606kfsvnj-devanshpatel07s-projects.vercel.app/",
    githubLink: "https://github.com/DevanshPatel07/Steller-Project",
    tags: ["React", "Supabase", "Tailwind", "TypeScript"]
  },
  {
    title: "PS-CRM - Project Management Tool",
    description: "PS-CRM is a cutting-edge CRM and project management system built with Next.js and Supabase, designed to streamline client management and operational pipelines. Featuring real-time lead tracking, detailed client activity histories, customizable pipelines, and interactive milestones, it acts as a central hub for modern sales and account teams. Built with a focus on speed, data integrity, and high-performance server components.",
    category: "Web Development",
    image: "/ps_crm.png",
    liveLink: "https://ps-crm-sigma.vercel.app/",
    githubLink: "https://github.com/Devanshpatel07/PS-CRM",
    tags: ["Next.js", "Tailwind", "TypeScript"]
  },
  {
    title: "Zenith Studio",
    description: "Zenith Studio is a premium web platform built to demonstrate advanced animated layouts, immersive user interaction, and robust state systems. Integrating high-performance front-end elements with custom theme controls, it delivers a striking digital space that balances responsive structure with bold artistic design. Optimized for smooth transitions and high SEO performance.",
    category: "Web Development / UI Design",
    image: "/zenith.png",
    liveLink: "https://agrifiapp.vercel.app/",
    githubLink: "https://github.com/DevanshPatel07/agrifiapp",
    tags: ["React", "Supabase", "Tailwind", "TypeScript"]
  }
];
