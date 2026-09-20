import SectionHeader from './landing/SectionHeader';
import Timeline from './landing/Timeline';

const STEPS = [
  {
    number: '01',
    tag: 'Student Action',
    title: 'Record',
    description: 'Students log quantities for shirts, pants, bedsheets, and other items on their page.',
  },
  {
    number: '02',
    tag: 'Staff Action',
    title: 'Verify',
    description: 'Staff inspects the submitted garments and marks them received on the register.',
  },
  {
    number: '03',
    tag: 'Processing',
    title: 'Track',
    description: 'Washed garments move back to the hostel flank, visible on the page the whole time.',
  },
  {
    number: '04',
    tag: 'Dual Verification',
    title: 'Resolve',
    description: 'Student and staff both confirm handover, closing the entry with no ambiguity.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          eyebrow="The Process"
          title="How the digital register works"
          description="Mirrors the physical process staff already follow — recorded once, verified twice."
        />

        <div className="mt-16">
          <Timeline steps={STEPS} />
        </div>
      </div>
    </section>
  );
}
