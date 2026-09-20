import { Key, Shield, UserCheck } from 'lucide-react';
import Reveal from './landing/Reveal';
import SectionHeader from './landing/SectionHeader';

const ITEMS = [
  {
    icon: UserCheck,
    title: 'Staff-Created Accounts',
    description: 'Student accounts are provisioned by hostel staff against official roll numbers.',
  },
  {
    icon: Key,
    title: 'Email Password Setup',
    description: 'Residents get an activation link to set their own password securely.',
  },
  {
    icon: Shield,
    title: 'Assigned Access Only',
    description: 'Students see only their page; staff manage only their assigned blocks.',
  },
];

export default function SecurityAccess() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          eyebrow="About WashLog"
          title="Account access & governance"
          description="Built for structured hostel administration — no open public sign-ups."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-x-8 gap-y-10 sm:grid-cols-3">
          {ITEMS.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.08} className="border-l-2 border-border pl-5">
              <item.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <h3 className="mt-3 font-display text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
