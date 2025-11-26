import { SocialLink, Project } from './types';

// Helper to convert Drive view links to direct image links
// Using lh3.googleusercontent.com is often more reliable for hosting images than drive.google.com/uc
const getDriveDirectLink = (url: string) => {
  try {
    // Extract ID from /file/d/ID/ or /open?id=ID
    const match = url.match(/\/d\/(.+?)(\/|\?|$)/) || url.match(/id=(.+?)($|&)/);
    if (match && match[1]) {
      // Use the Googleusercontent CDN format which is more reliable for image embedding
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    return url;
  } catch (e) {
    return url;
  }
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', url: 'https://www.instagram.com/graphic_vortex_', iconName: 'Instagram' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/akash--prajapati/', iconName: 'Linkedin' },
];

export const ABOUT_CONTENT = `
 I am a passionate graphic designer with over 3+ years of experience in branding, digital illustration, and graphic design. 
 My journey began with a love for traditional art, which evolved into a career in digital creativity. 
 I believe that good design is not just about making things look good—it's about effective communication and solving problems visually. Every line, color, and shape serves a purpose.
`;

export const SKILLS = [
  "Adobe Photoshop", "Adobe Illustrator", "Brand Identity", "Typography", "CorelDraw", "Print Design"
];

export const PERSONAL_DETAILS = {
  name: "Akash Prajapati",
  role: "Visual/Graphic Designer",
  email: "akashaspprajapati887@gmail.com",
  tagline: "I craft digital experiences that blend aesthetic beauty with functional design.",
};

const logoDriveLink = "https://drive.google.com/file/d/1JTRDm92m8ftXB_OY6dt5W_q9kRfA8pIa/view";
export const BRAND_DETAILS = {
  name: "Graphic Vortex",
  logoUrl: getDriveDirectLink(logoDriveLink),
  logoAlt: "Graphic Vortex Logo",
  showLogoImage: true
};

export const PORTFOLIO_DATA: Project[] = [
  {
    id: '1',
    title: "Black Hole Mystery",
    category: "Science Illustration",
    imageUrl: getDriveDirectLink("https://drive.google.com/file/d/1yoYpwI68zHk1Obvp44VazwhG5CfzDZnf/view?usp=drive_link"),
    description: "A dramatic space illustration featuring a swirling black hole, surrounding planets, and an astronaut being pulled toward the singularity. Designed as a high-impact educational poster explaining the mysteries of black holes.",
    year: "2025",
    tools: ["Photoshop", "CorelDRAW"],
    orientation: "portrait",
    tags: ["Space Art", "Education", "Sci-Fi", "Poster Design"]
  },
  {
    id: '2',
    title: "Super Delicious Burger",
    category: "Food Advertisement",
    imageUrl: getDriveDirectLink("https://drive.google.com/file/d/19obvbcwiJXnJLSUqCpEQCdl5TBapCSmk/view?usp=drive_link"),
    description: "A vibrant and energetic fast-food poster featuring a juicy burger, bold typography, and an excited customer enjoying a bite. Designed for promotional marketing campaigns.",
    year: "2025",
    tools: ["Photoshop"],
    orientation: "portrait",
    tags: ["Food Photography", "Marketing", "Typography", "Manipulation"]
  },
  {
    id: '3',
    title: "Mawa Vitamin Energy",
    category: "Product Advertisement",
    imageUrl: getDriveDirectLink("https://drive.google.com/file/d/17QaD1gr9XePtvv7YzOury_hz2nFss52G/view?usp=drive_link"),
    description: "A premium product showcase of a vitamin-infused energy drink placed in a lush jungle environment. Fresh fruits, water droplets, and vines highlight the natural and refreshing essence of the drink.",
    year: "2025",
    tools: ["Photoshop", "Lightroom"],
    orientation: "portrait",
    tags: ["Product Design", "Nature", "Compositing", "Beverage"]
  },
  {
    id: '4',
    title: "Super Delicious Pizza",
    category: "Food Advertisement",
    imageUrl: getDriveDirectLink("https://drive.google.com/file/d/1wftNbPuW88NQ3LJp1OPdpipJBn68LOid/view?usp=drive_link"),
    description: "A fiery and bold pizza advertisement poster showcasing a hot, freshly baked pizza with dynamic motion effects and promotional highlights like 50% off and order now.",
    year: "2025",
    tools: ["Photoshop"],
    orientation: "portrait",
    tags: ["Food Promo", "Motion Effects", "Social Media", "Advertising"]
  },
  {
    id: '5',
    title: "Haunted Witch House",
    category: "Fantasy Illustration",
    imageUrl: getDriveDirectLink("https://drive.google.com/file/d/1ql61-4LzbHcRTam-VTWpxAdadLzgMDxw/view?usp=drive_link"),
    description: "A dark and atmospheric illustration depicting an eerie witch house in a stormy night setting. Lit windows, pumpkins, dead trees, and dramatic lighting create a haunting visual narrative.",
    year: "2025",
    tools: ["Photoshop"],
    orientation: "landscape",
    tags: ["Concept Art", "Atmospheric", "Horror", "Digital Painting"]
  },
  {
    id: '6',
    title: 'Feel the Music',
    category: 'Brand Advertisement',
    imageUrl: getDriveDirectLink('https://drive.google.com/file/d/1ajdo8pg8y5WcdcKXX338iGV4G-yDoRgC/view?usp=drive_link'),
    description: 'Premium headphones delivering immersive sound, deep bass, and true emotion—feel the music.',
    year: '2025',
    tools: ['Photoshop'],
    orientation: 'portrait',
    tags: ['Branding', 'Lifestyle', 'Product', 'Manipulation']
  },
   {
    id: '7',
    title: 'Feel the Speed',
    category: 'Product Advertisement',
    imageUrl: getDriveDirectLink('https://drive.google.com/file/d/1m9B9V6dJG5rjCzBSQFUYaQk8wHgbdgUA/view?usp=drive_link'),
    description: 'Beyond Sound',
    year: '2025',
    tools: ['Photoshop'],
    orientation: 'portrait',
    tags: ['Branding', 'Lifestyle', 'Product', 'Manipulation']
  },
   {
    id: '8',
    title: 'Time to Revenge',
    category: 'Movie Poster',
    imageUrl: getDriveDirectLink('https://drive.google.com/file/d/1BsxCSxb0e-glg0Cr6SY2DsrRQjDnAUzp/view?usp=drive_link'),
    description: 'The intense battle of transformers',
    year: '2025',
    tools: ['Photoshop'],
    orientation: 'landscape',
    tags: ['Movie', 'Poster', 'Illustration', 'Manipulation']
  }
];

// For backward compatibility
export const PORTFOLIO_ITEMS = PORTFOLIO_DATA;