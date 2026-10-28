import { WeddingData } from '../types/wedding';

export const INITIAL_WEDDING_DATA: WeddingData = {
  groom: {
    name: 'Triambak',
    fullName: 'Triambak Goel',
    parents: 'Shri Sushil Kr. Goel & Smt. Suman Goel',
  },
  bride: {
    name: 'Trisha',
    fullName: 'Trisha Agarwal',
    parents: 'Shri Prahlad Kr. Agarwal & Smt. Sarita Agarwal',
  },
  weddingDate: '2027-02-11T19:30:00+05:30',
  dateDisplay: '11th February, 2027',
  venue: {
    name: 'KP Palace',
    city: 'Talcher',
    state: 'Odisha',
    fullAddress: 'KP Palace, Main Royal Road, Talcher, Angul District, Odisha 759100',
    googleMapsUrl: 'https://maps.google.com/?q=KP+Palace+Talcher+Odisha',
  },
  hashtag: '#TriambakWedsTrisha',
  ceremonies: [
    {
  id: 'Mehndi',
  name: 'Mehndi',
  date: '8th February 2027',
  time: '02:00 PM Mehndi Ceremony · 06:00 PM Music & Festivities',
  venueName: 'The House of Agarwals',
  venueAddress: 'Kolkata, West Bengal',
  videoUrl: '/assets/mehndi.mp4',
  googleMapsUrl: 'https://maps.app.goo.gl/i3ctpGWmpJBbESij7'
},
    
    {
  id: 'Maayra',
  name: 'Maayra',
  date: '10th February 2027',
  time: '02:00 PM Maayra Ceremony',
  venueName: 'KP Palace',
  venueAddress: 'Talcher, Odisha',
  videoUrl: '/assets/maayra.mp4',
  googleMapsUrl: 'https://maps.google.com/?q=KP+Palace+Talcher+Odisha',
},

   {
  id: 'Sangeet',
  name: 'Sangeet',
  date: '10th February 2027',
  time: '06:00 PM Sangeet Night',
  venueName: 'KP Palace',
  venueAddress: 'Talcher, Odisha',
  videoUrl: '/assets/sangeet.mp4',
  googleMapsUrl: 'https://maps.google.com/?q=KP+Palace+Talcher+Odisha',
},
   {
  id: 'Haldi',
  name: 'Haldi',
  date: '11th February 2027',
  time: '09:00 AM Haldi Ceremony · 11:00 AM Pool Party',
  venueName: 'KP Palace',
  venueAddress: 'Talcher, Odisha',
  videoUrl: '/assets/haldi.mp4',
  googleMapsUrl: 'https://maps.google.com/?q=KP+Palace+Talcher+Odisha',
},
    
{
    id: 'Wedding',
    name: 'Wedding',
    date: '11th February 2027',
    time: '07:00 PM Baraat Swagat · 09:00 PM Vivaha Muhurat',
    venueName: 'KP Palace',
    venueAddress: 'Talcher, Odisha',
    videoUrl: '/assets/wedding.mp4',
    googleMapsUrl: 'https://maps.google.com/?q=KP+Palace+Talcher+Odisha',
},
    
  ],
} 