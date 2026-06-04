import type { LucideIcon } from "lucide-react";

interface ExperienceCardProps {
  icon: LucideIcon;
  label: string;
}

const ExperienceCard = ({ icon: Icon, label }: ExperienceCardProps) => (
  <article className="experience-card" aria-label={label}>
    <Icon size={22} strokeWidth={2.2} />
  </article>
);

export default ExperienceCard;
