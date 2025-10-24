import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

    if (!res.ok) {
      console.error('Failed to fetch blog data:', res.status, res.statusText);
      return []; // Return empty array instead of throwing error
    }

    const data = await res.json();
    console.log('Blog data fetched:', data.length, 'articles');

    const filtered = data.filter((item) => item?.cover_image || item?.social_image).sort(() => Math.random() - 0.5);
    console.log('Filtered blogs:', filtered.length, 'articles with images');

    return filtered;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return []; // Return empty array on error
  }
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};