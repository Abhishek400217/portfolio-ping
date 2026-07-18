/**
 * Reusable routing and section IDs
 */
export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  CERTIFICATES: 'certificates',
  GITHUB: 'github',
  CONTACT: 'contact',
}

/**
 * Reusable registry of section keys
 */
export const SECTION_REGISTRY = [
  SECTIONS.HERO,
  SECTIONS.ABOUT,
  SECTIONS.SKILLS,
  SECTIONS.EXPERIENCE,
  SECTIONS.PROJECTS,
  SECTIONS.CERTIFICATES,
  SECTIONS.GITHUB,
  SECTIONS.CONTACT,
]

/**
 * Global navigation configurations
 */
export const NAVIGATION_CONFIG = [
  { id: SECTIONS.HERO, label: 'Home', path: `/#${SECTIONS.HERO}` },
  { id: SECTIONS.ABOUT, label: 'About', path: `/#${SECTIONS.ABOUT}` },
  { id: SECTIONS.SKILLS, label: 'Skills', path: `/#${SECTIONS.SKILLS}` },
  { id: SECTIONS.EXPERIENCE, label: 'Experience', path: `/#${SECTIONS.EXPERIENCE}` },
  { id: SECTIONS.PROJECTS, label: 'Projects', path: `/#${SECTIONS.PROJECTS}` },
  { id: SECTIONS.CERTIFICATES, label: 'Certificates', path: `/#${SECTIONS.CERTIFICATES}` },
  { id: SECTIONS.GITHUB, label: 'Github', path: `/#${SECTIONS.GITHUB}` },
  { id: SECTIONS.CONTACT, label: 'Contact', path: `/#${SECTIONS.CONTACT}` },
]
