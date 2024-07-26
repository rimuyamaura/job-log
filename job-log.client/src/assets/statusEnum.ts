export enum Status {
  Wishlist = 'Wishlist',
  Applied = 'Applied',
  Interviewing = 'Interviewing',
  OfferReceived = 'Offer Received',
  Rejected = 'Rejected',
  Ghosted = 'Ghosted',
}

export const statusColors: { [key in Status]: string } = {
  [Status.Wishlist]: '#FFD700', // Gold
  [Status.Applied]: '#87CEEB', // SkyBlue
  [Status.Interviewing]: '#32CD32', // LimeGreen
  [Status.OfferReceived]: '#FFA500', // Orange
  [Status.Rejected]: '#FF6347', // Tomato
  [Status.Ghosted]: '#D3D3D3', // LightGray
};
