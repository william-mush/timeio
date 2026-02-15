import { Metadata } from 'next';
import { MeetingPlanner } from '@/components/MeetingPlanner';

export const metadata: Metadata = {
  title: 'Meeting Planner - Find Overlapping Business Hours | time.io',
  description: 'Plan meetings across time zones. See overlapping business hours for cities worldwide.',
};

export default function MeetingPlannerPage() {
  return <MeetingPlanner />;
}
