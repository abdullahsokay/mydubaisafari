export const SITE = {
  whatsappNumber: "971557788202", // wa.me format (no +)
  whatsappDisplay: "+971 55 778 8202",
  instagram: "https://instagram.com/mydubaisafari",
  facebook: "https://facebook.com/mydubaisafari",
  phone: "+971 55 778 8202",
  email: "rizwanuae1@yahoo.com",
  tiktok: "https://www.tiktok.com/@mydubaisafari",
  address: "4th Floor, City Avenue, opposite Deira City Centre, Deira, Dubai, UAE",
  areas: "Marsa Dubai · Deira, Dubai",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
