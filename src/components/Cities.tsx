const cityToTimezone: Record<string, string> = {
    
  // North America
  newyork: "America/New_York",
  losangeles: "America/Los_Angeles",
  chicago: "America/Chicago",
  denver: "America/Denver",
  toronto: "America/Toronto",
  vancouver: "America/Vancouver",
  mexico: "America/Mexico_City",
  miami: "America/New_York",
  boston: "America/New_York",
  seattle: "America/Los_Angeles",
  sanfrancisco: "America/Los_Angeles",
  lasvegas: "America/Los_Angeles",
  washingtondc: "America/New_York",
  philadelphia: "America/New_York",
  atlanta: "America/New_York",
  dallas: "America/Chicago",
  houston: "America/Chicago",
  phoenix: "America/Phoenix",
  hawaii: "Pacific/Honolulu",
  anchorage: "America/Anchorage",

  // South America
  rio: "America/Sao_Paulo",
  saopaulo: "America/Sao_Paulo",
  buenosaires: "America/Argentina/Buenos_Aires",
  lima: "America/Lima",
  bogota: "America/Bogota",
  santiago: "America/Santiago",
  quito: "America/Guayaquil",
  caracas: "America/Caracas",
  montevideo: "America/Montevideo",

  // Europe
  london: "Europe/London",
  paris: "Europe/Paris",
  berlin: "Europe/Berlin",
  madrid: "Europe/Madrid",
  rome: "Europe/Rome",
  amsterdam: "Europe/Amsterdam",
  brussels: "Europe/Brussels",
  zurich: "Europe/Zurich",
  stockholm: "Europe/Stockholm",
  oslo: "Europe/Oslo",
  copenhagen: "Europe/Copenhagen",
  moscow: "Europe/Moscow",
  athens: "Europe/Athens",
  helsinki: "Europe/Helsinki",
  warsaw: "Europe/Warsaw",
  prague: "Europe/Prague",
  vienna: "Europe/Vienna",
  lisbon: "Europe/Lisbon",
  dublin: "Europe/Dublin",
  istanbul: "Europe/Istanbul",
  budapest: "Europe/Budapest",
  belgrade: "Europe/Belgrade",
  sofia: "Europe/Sofia",
  bucharest: "Europe/Bucharest",

  // Middle East
  dubai: "Asia/Dubai",
  riyadh: "Asia/Riyadh",
  tehran: "Asia/Tehran",
  jerusalem: "Asia/Jerusalem",
  doha: "Asia/Qatar",
  kuwait: "Asia/Kuwait",
  muscat: "Asia/Muscat",
  baghdad: "Asia/Baghdad",
  beirut: "Asia/Beirut",

  // Africa
  johannesburg: "Africa/Johannesburg",
  cairo: "Africa/Cairo",
  lagos: "Africa/Lagos",
  nairobi: "Africa/Nairobi",
  casablanca: "Africa/Casablanca",
  addisababa: "Africa/Addis_Ababa",
  accra: "Africa/Accra",
  tunis: "Africa/Tunis",
  algiers: "Africa/Algiers",

  // Asia
  tokyo: "Asia/Tokyo",
  beijing: "Asia/Shanghai",
  shanghai: "Asia/Shanghai",
  hongkong: "Asia/Hong_Kong",
  taipei: "Asia/Taipei",
  singapore: "Asia/Singapore",
  bangkok: "Asia/Bangkok",
  seoul: "Asia/Seoul",
  mumbai: "Asia/Kolkata",
  delhi: "Asia/Kolkata",
  karachi: "Asia/Karachi",
  islamabad: "Asia/Karachi",
  jakarta: "Asia/Jakarta",
  manila: "Asia/Manila",
  kualalumpur: "Asia/Kuala_Lumpur",
  hanoi: "Asia/Bangkok",
  yangon: "Asia/Yangon",

  // Oceania
  sydney: "Australia/Sydney",
  melbourne: "Australia/Melbourne",
  brisbane: "Australia/Brisbane",
  perth: "Australia/Perth",
  adelaide: "Australia/Adelaide",
  darwin: "Australia/Darwin",
  auckland: "Pacific/Auckland",
  wellington: "Pacific/Auckland",
  fiji: "Pacific/Fiji",
  tahiti: "Pacific/Tahiti",
};
export default cityToTimezone;


export function getTimezoneForCity(input: string): string | undefined {
  const key = input.toLowerCase().replace(/\s+/g, ""); // lowercase + remove spaces
  return cityToTimezone[key];
}



