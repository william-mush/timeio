import { hour00 } from './hour-00';
import { hour01 } from './hour-01';
import { hour02 } from './hour-02';
import { hour03 } from './hour-03';
import { hour04 } from './hour-04';
import { hour05 } from './hour-05';
import { hour06 } from './hour-06';
import { hour07 } from './hour-07';
import { hour08 } from './hour-08';
import { hour09 } from './hour-09';
import { hour10 } from './hour-10';
import { hour11 } from './hour-11';
import { hour12 } from './hour-12';
import { hour13 } from './hour-13';
import { hour14 } from './hour-14';
import { hour15 } from './hour-15';
import { hour16 } from './hour-16';
import { hour17 } from './hour-17';
import { hour18 } from './hour-18';
import { hour19 } from './hour-19';
import { hour20 } from './hour-20';
import { hour21 } from './hour-21';
import { hour22 } from './hour-22';
import { hour23 } from './hour-23';

const clockQuips: Record<string, string> = {
  ...hour00,
  ...hour01,
  ...hour02,
  ...hour03,
  ...hour04,
  ...hour05,
  ...hour06,
  ...hour07,
  ...hour08,
  ...hour09,
  ...hour10,
  ...hour11,
  ...hour12,
  ...hour13,
  ...hour14,
  ...hour15,
  ...hour16,
  ...hour17,
  ...hour18,
  ...hour19,
  ...hour20,
  ...hour21,
  ...hour22,
  ...hour23,
};

export function getQuipForTime(hours24: number, minutes: number): string {
  const key = `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return clockQuips[key] ?? "Every minute matters. Even this one.";
}
