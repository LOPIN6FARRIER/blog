export interface Social {
  icon: string;
  href: string;
  label: string;
}

export interface AboutMeProps {
  name: string;
  title: string;
  location: string;
  bio: string;
  skills: string[];
  email: string;
  image: string;
  socials: Social[];
  interests: string[];
  quote: string;
}
