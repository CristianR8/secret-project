import type { StaticImageData } from "next/image";
import NewsImage1 from "@/public/News/iccv.png";
import NewsImage2 from "@/public/News/colcaci.jpeg";
import NewsImage3 from "@/public/News/soccernet.jpeg";

export type NewsArticle = {
  id: string;
  title: string;
  category: string;
  image: StaticImageData;
  heightClass: string;
  titleClass?: string;
  excerpt: string;
  body: string[];
  titleLines: string[];
  descriptionLines: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    id: "iccv-2025-highlights",
    title: "ICCV 2025 Highlights",
    category: "Conference",
    image: NewsImage1,
    heightClass: "h-[24rem]",
    titleClass: "text-xl md:text-[1.7rem]",
    excerpt:
      "Dummy article about poster sessions, lab participation, and current work in spectral and visual learning.",
    body: [
      "This dummy article represents a longer writeup about our participation in ICCV 2025, including poster presentation details, technical discussion, and research context.",
      "Use this page to place a full article summary, publication links, author list, event highlights, and any supporting media with a dedicated URL for direct sharing.",
      "The article structure is now ready for standalone reading, so each story can grow independently without depending on a modal overlay.",
    ],
    titleLines: ["ICCV", "2025"],
    descriptionLines: [
      "Our student Fabian proudly participated",
      "in the International Conference ICCV 2025,",
      "showcasing cutting-edge research in",
      "spectral unmixing",
    ],
  },
  {
    id: "colcaci-research-showcase",
    title: "ColCACI Research Showcase",
    category: "Event",
    image: NewsImage2,
    heightClass: "h-[20rem]",
    excerpt:
      "Placeholder summary for publications, demos, and conversations from the latest conference edition.",
    body: [
      "This dummy article can contain a conference recap, accepted works, photos from the event, and a concise explanation of the projects shown by the lab.",
      "It is structured for long-form reading on its own page so users can reference the article directly and keep a stable URL for the event writeup.",
      "You can later swap this placeholder content for CMS-driven news data or structured article entries.",
    ],
    titleLines: ["ColCACI", "2025"],
    descriptionLines: [
      "Our team presented several projects at the",
      "Colombian Conference on Applications of",
      "Computational Intelligence, showcasing innovative",
      "solutions in artificial intelligence and",
      "machine learning applications.",
    ],
  },
  {
    id: "soccernet-challenge-first-place",
    title: "SoccerNet Challenge",
    category: "Award",
    image: NewsImage3,
    heightClass: "h-[24rem]",
    excerpt:
      "Dummy card for benchmark results, challenge ranking, and technical lessons from competition settings.",
    body: [
      "This dummy article is intended for a competition win announcement, including the benchmark setting, method summary, and why the result matters for the lab.",
      "The page can also include extra screenshots, metrics, and links to code or paper pages in a format that remains easy to scan.",
      "Because each story has its own route now, the result can be referenced directly from the homepage and the news index.",
    ],
    titleLines: ["SoccerNet Challenge", "First Place"],
    descriptionLines: [
      "We celebrate our victory in the SoccerNet Challenge 2025!",
      "Our team took first place with an advanced",
      "system for effectively predicting depth in soccer images,",
      "achieving the best performance in the competition.",
    ],
  },
  {
    id: "lab-milestone-update",
    title: "Lab Milestone Update",
    category: "Internal",
    image: NewsImage2,
    heightClass: "h-[18rem]",
    excerpt:
      "A placeholder update for grants, infrastructure, and team growth inside the research group.",
    body: [
      "This placeholder article can summarize internal milestones, new equipment, collaborations, and academic planning for the semester.",
      "Use this area to expand on timeline, impact, and related team achievements in a readable format.",
    ],
    titleLines: ["Lab Milestone", "Update"],
    descriptionLines: [
      "A quick update on infrastructure, planning,",
      "and the latest milestones across the lab.",
    ],
  },
  {
    id: "field-capture-session",
    title: "Field Capture Session",
    category: "Research",
    image: NewsImage3,
    heightClass: "h-[30rem]",
    excerpt:
      "Dummy content around data collection, outdoor testing, and new pipelines for robust perception.",
    body: [
      "This article can document the setup, collection process, and methodological goals behind a field session for new research data.",
      "It works well for combining narrative detail with images, protocol notes, and upcoming experiments.",
    ],
    titleLines: ["Field Capture", "Session"],
    descriptionLines: [
      "Outdoor testing and data collection for",
      "robust perception pipelines in real scenarios.",
    ],
  },
  {
    id: "paper-accepted",
    title: "Paper Accepted",
    category: "Publication",
    image: NewsImage1,
    heightClass: "h-[22rem]",
    excerpt:
      "Placeholder announcement for a new accepted paper and a concise explanation of the contribution.",
    body: [
      "Use this article format for acceptance announcements, author details, contribution summaries, and next steps such as camera-ready updates or code release plans.",
      "The standalone page supports longer editorial content without changing the grid structure.",
    ],
    titleLines: ["Paper", "Accepted"],
    descriptionLines: [
      "A new publication from the group with",
      "its contribution, authors, and next steps.",
    ],
  },
  {
    id: "workshop-recap",
    title: "Workshop Recap",
    category: "Community",
    image: NewsImage2,
    heightClass: "h-[26rem]",
    excerpt:
      "Dummy article on lectures, invited speakers, and collaborative sessions with students and researchers.",
    body: [
      "This placeholder can capture workshop highlights, invited speaker insights, attendance, and future collaboration opportunities.",
      "It is designed to read like an editorial recap rather than a small caption.",
    ],
    titleLines: ["Workshop", "Recap"],
    descriptionLines: [
      "Lectures, invited speakers, and sessions",
      "that connected students and researchers.",
    ],
  },
  {
    id: "prototype-demo",
    title: "Prototype Demo",
    category: "Demo",
    image: NewsImage3,
    heightClass: "h-[19rem]",
    excerpt:
      "Placeholder card describing an experimental demo with computer vision, AI, and real-world scenes.",
    body: [
      "This article can describe a demo system, technical stack, evaluation setting, and observations from live interaction.",
      "The dedicated article page is a better fit than a popup for sharing this type of content.",
    ],
    titleLines: ["Prototype", "Demo"],
    descriptionLines: [
      "An experimental demo combining AI,",
      "vision models, and real-world scenes.",
    ],
  },
  {
    id: "new-dataset-release",
    title: "New Dataset Release",
    category: "Dataset",
    image: NewsImage1,
    heightClass: "h-[27rem]",
    excerpt:
      "Dummy release note for a curated dataset with metadata, benchmarks, and expected impact.",
    body: [
      "Use this kind of article to explain collection protocol, annotation scope, download information, and benchmark setup for a new dataset.",
      "It also works well for linking associated publication and code assets later.",
    ],
    titleLines: ["New Dataset", "Release"],
    descriptionLines: [
      "A curated dataset release with metadata,",
      "benchmarks, and expected impact.",
    ],
  },
];

export const getNewsHref = (id: string) => `/news/${id}`;

export const getNewsArticleById = (id: string) =>
  newsArticles.find((article) => article.id === id);
