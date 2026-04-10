
import { EventDetail, StoryMoment, Recommendation, EntourageMember } from './types';

export const WEDDING_DATE = new Date('2026-04-28T12:00:00');

export const STORY_TIMELINE: StoryMoment[] = [
  {
    year: 'Elementary Days',
    title: 'The First Encounter',
    description: 'We first met back in our elementary days, in a small tutoring center where life felt simple and unplanned. We were just kids then—no expectations, no idea that something beautiful was quietly beginning. What felt ordinary at the time slowly became something unforgettable.',
    imageUrl: '/img/elemdays.jpg'
  },
  {
    year: 'Connection',
    title: 'Small Group/Church',
    description: 'We grew up in the same circle, part of a small group faithfully guided by our pastor, sharing the same church, the same laughter, the same moments that shaped who we were. Then came a new chapter—college. Life started to change, paths began to stretch, but somehow, distance never really came between us. She studied at CNU, and I was at USJ-R. Our schools weren’t exactly close, but we found our own little routine— a place where we’d meet, ride the same jeepney together, going to school in the morning and heading home side by side. In the middle of busy days and different worlds, we still chose each other in the simplest ways.',
    imageUrl: '/img/connection.jpg'
  },
  {
    year: 'Start of Relationship',
    title: 'The Confession',
    description: 'After college, I finally found the courage to turn what we had into something more. I asked her to be my girlfriend— and from that moment on, we began writing our story together. We explored life hand in hand— traveling to new places, laughing over the smallest things, arguing and learning from it, celebrating victories and growing through failures. Every step, every moment, we discovered not just the world, but each other.',
    imageUrl: '/img/confession.jpg'
  },
  {
    year: 'The Proposal',
    title: 'Engagement',
    description: 'Four years passed, four years of love, growth, and choosing one another every day. And then, in a place that meant so much to both of us— a pickleball court where we shared countless memories—I got down on one knee and asked her the most important question of my life. What started as a normal encounter in my life,turns out the one soon to be my wife.',
    imageUrl: '/img/theproposal.jpg'
  }
];

export const ENTOURAGE: EntourageMember[] = [
  { name: 'Darryl Bacla-an', role: 'Best Man', imageUrl: '/img/Entourage/bestman.jpg' },
  { name: 'Jay Sipulo', role: 'Groomsman', imageUrl: '/img/Entourage/groomsmen_jay.jpg' },
  { name: 'Luigi Sordilla', role: 'Groomsman', imageUrl: '/img/Entourage/groomsmen_luigi.jpg' },
  { name: 'Rogelio Judilla', role: 'Groomsman', imageUrl: '/img/Entourage/groomsmen_rogelio.jpg' },
  { name: 'Junel Nellas', role: 'Groomsman', imageUrl: '/img/Entourage/groomsmen_junel.jpg' },
  { name: 'Judy Anne Bacla-an', role: 'Matron of Honor', imageUrl: '/img/Entourage/matron_of_honor.jpg' },
  { name: 'Catherine Salundaguit', role: 'Bridesmaid', imageUrl: '/img/Entourage/bridesmaid_cath.jpg' },
  { name: 'Jessiel Colentava', role: 'Bridesmaid', imageUrl: '/img/Entourage/bridesmaid_jessiel.jpg' },
  { name: 'Kimberly Yu', role: 'Bridesmaid', imageUrl: '/img/Entourage/bridesmaid_kim.jpg' },
  { name: 'Dharyle Rosal', role: 'Bridesmaid', imageUrl: '/img/Entourage/bridesmaid_dars.jpg' },
  { name: 'Rou Gelianne D. Judilla', role: 'Flower Girl', imageUrl: '/img/Entourage/flowergirl_rou.jpg' },
  { name: 'Caily Rachelle R. Fernandez', role: 'Flower Girl', imageUrl: '/img/Entourage/caily.jpg' },
  { name: 'Joie Arsenal', role: 'Flower Girl', imageUrl: '/img/Entourage/flowergirl_joie.jpg' },
  { name: 'Carlisle Abucay', role: 'Bible Bearer', imageUrl: '/img/Entourage/biblebearer_carlisle.jpg' },
  { name: 'Theo Everette C. Jabierto', role: 'Ring Bearer', imageUrl: '/img/Entourage/theo.jpg' },
  { name: 'Nataliyah See', role: 'Coin Bearer', imageUrl: '/img/Entourage/aliya.jpg' },
];

export const OFFICIANT: EntourageMember[] = [
  { name: 'Rev. Effem Amancio', role: 'Officiant', imageUrl: '/img/Entourage/effem.jpg' },
];

export const PRINCIPAL_SPONSORS: EntourageMember[] = [
  { name: 'Mrs. Noelli Amancio', role: 'Ninang', imageUrl: '/img/Entourage/principal_sponsor_noelli.jpg' },
  { name: 'Mr. and Mrs. Harner', role: 'Ninong & Ninang', imageUrl: '/img/Entourage/principal_sponsor_harners.jpg' },
  { name: 'Mr. and Mrs. Pantuso', role: 'Ninong & Ninang', imageUrl: '/img/Entourage/principal_sponsor_pantusos.jpg', isMystery: true },
];

export const SECONDARY_SPONSORS: EntourageMember[] = [
  { name: 'Mr. and Mrs. Abucay', role: 'Ninong & Ninang', imageUrl: '/img/Entourage/abucays.jpg' },
  { name: 'Mr. and Mrs. Arsenal', role: 'Ninong & Ninang', imageUrl: '/img/Entourage/principal_sponsor_arsenals.jpg' },
  { name: 'Mr. and Mrs. Maceda', role: 'Ninong & Ninang', imageUrl: '/img/Entourage/principal_sponsor_maceda.jpg' },
];

export const EVENTS: EventDetail[] = [
  {
    id: 'e1',
    title: 'The Welcome Mehndi',
    date: 'April 28, 2026',
    time: '6:00 PM',
    location: 'Amara Subdivision, Catarman, Liloan, Cebu',
    description: 'A night of vibrant colors, henna, and music to kick off our celebrations.',
    isPrivate: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sarah+%26+James+Mehndi&dates=20260428T180000Z/20260428T210000Z'
  },
  {
    id: 'e2',
    title: 'Rehearsal Dinner',
    date: 'April 28, 2026',
    time: '7:30 PM',
    location: 'Amara Subdivision, Catarman, Liloan, Cebu',
    description: 'An intimate dinner for our wedding party and family.',
    isPrivate: true,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sarah+%26+James+Rehearsal&dates=20260428T193000Z/20260428T220000Z'
  },
  {
    id: 'e3',
    title: 'The Ceremony',
    date: 'April 28, 2026',
    time: '4:00 PM',
    location: 'Amara Subdivision, Catarman, Liloan, Cebu',
    description: 'The moment we become one. Please arrive 30 minutes early.',
    isPrivate: false,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Raffy+%26+MaryMay+Wedding+Ceremony&dates=20260428T170000Z/20260428T180000Z'
  },
  {
    id: 'e4',
    title: 'Grand Reception',
    date: 'April 28, 2026',
    time: '6:30 PM',
    location: 'Amara Subdivision, Catarman, Liloan, Cebu',
    description: 'Dinner, dancing, and memories to last a lifetime.',
    isPrivate: false,
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Raffy+%26+MaryMay+Reception&dates=20260428T180000Z/20260428T000000Z'
  }
];

export const LOCAL_RECS: Recommendation[] = [
  { category: 'Food', name: 'The Morning Grind', description: 'Our favorite local coffee spot with amazing croissants.' },
  { category: 'Sightseeing', name: 'Cliffview Trails', description: 'A beautiful 2-mile walk with ocean views.' },
  { category: 'Shopping', name: 'Artisan Row', description: 'Local boutiques and handcrafted jewelry.' }
];

export const DRESS_CODE = {
  title: 'Black Tie Optional',
  description: 'We would love to see our family and friends get dressed up with us! We suggest a tuxedo or formal dark suit and tie for men and a floor-length gown or formal cocktail dress for women.',
  colors: ['#676666', '#959595', '#FFFFFF', '#293760','#0f1936']
};
