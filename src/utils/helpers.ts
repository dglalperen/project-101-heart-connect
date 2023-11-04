import jsons from '@assets/jsons';

export type Country = {
    iso: string;
    phone_code: string;
    name: string;
    flag: string;
};

export const COUNTRIES: Country[] = jsons.countries;

export const fetchCountry = (phoneCode: string): Country | null => {
    return jsons.countries.find((country: Country) => country.phone_code === phoneCode);
};
