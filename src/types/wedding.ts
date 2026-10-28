export interface Ceremony {
  id: string;
  name: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  videoUrl: string;
  googleMapsUrl: string;
}



export interface WeddingData {
  groom: {
    name: string;
    fullName: string;
    parents: string;
  };
  bride: {
    name: string;
    fullName: string;
    parents: string;
  };
  weddingDate: string; // ISO date '2027-02-11T20:00:00+05:30'
  dateDisplay: string;
  venue: {
    name: string;
    city: string;
    state: string;
    fullAddress: string;
    googleMapsUrl: string;
  };
  hashtag: string;
  
  ceremonies: Ceremony[];
  videoUrl?: string;
  videoPoster?: string;
}
