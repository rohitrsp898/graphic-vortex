import { Project, SocialLink } from './types';

// =========================================================================
// MASTER CONFIGURATION
// Update your details here, and they will reflect across the entire app.
// =========================================================================

export const PERSONAL_DETAILS = {
  name: "Akash Prajapati",
  role: "Visual/Graphic Designer",
  email: "akashaspprajapati887@gmail.com",
  tagline: "I craft digital experiences that blend aesthetic beauty with functional design.",
};

export const BRAND_DETAILS = {
  name: "Graphic.Vortex",
  // Google Drive Link for the logo
  logoUrl: "https://drive.google.com/file/d/1JTRDm92m8ftXB_OY6dt5W_q9kRfA8pIa/view", 
  logoAlt: "Graphic Vortex Logo",
  showLogoImage: true
};

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

// Helper to convert Drive links to direct view links
/**
 * Converts a Google Drive share link into a direct image URL.
 * Works with standard "view" links and "open" links.
 */
export const getDriveDirectLink = (url: string): string => {
  if (!url) return '';

  // Check if it is a Google Drive link
  if (url.includes('drive.google.com')) {
    // Try to extract the ID
    // Patterns: /file/d/<ID>/view, id=<ID>
    const match = url.match(/\/d\/(.+?)\/|id=(.+?)(&|$)/);
    const id = match ? (match[1] || match[2]) : null;

    if (id) {
      // Use the thumbnail API with a large size (w1920) to get a high-quality direct image
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1920`;
    }
  }

  return url;
};

// =========================================================================
// DERIVED CONSTANTS (Do not modify unless changing structure)
// =========================================================================

export const BRAND_LOGO = {
  src: BRAND_DETAILS.logoUrl,
  alt: BRAND_DETAILS.logoAlt,
  showImage: BRAND_DETAILS.showLogoImage
};

export const HERO_CONTENT = {
  name: PERSONAL_DETAILS.name,
  title: PERSONAL_DETAILS.role,
  tagline: PERSONAL_DETAILS.tagline,
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
  }
];

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
