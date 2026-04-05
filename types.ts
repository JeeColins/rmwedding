
export interface EventDetail {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isPrivate: boolean;
  googleCalendarUrl: string;
}

export interface StoryMoment {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface EntourageMember {
  name: string;
  role: string;
  imageUrl: string;
  isMystery?: boolean;
}

export interface Recommendation {
  category: 'Food' | 'Sightseeing' | 'Shopping';
  name: string;
  description: string;
}

export interface RSVPFormData {
  fullName: string;
  email: string;
  attending: boolean;
  plusOne: boolean;
  plusOneName: string;
  mealPreference: 'Steak' | 'Salmon' | 'Vegetarian';
  allergies: string;
  accessCode: string;
}
