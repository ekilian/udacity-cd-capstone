
/**
 * Validates the provided numbers for being valid year and month values.
 *
 * Validation fails if year is smaller then 2020 or greater then 9999.
 * Validation fails if month is smaller than 1 or gerater then 12.
 *
 * @param year - The year to be validated
 * @param month - The month to be validated
 */
export const checkNumberParameters = (year:number, month:number):boolean => {
  let result:boolean = true;
  if(Number.isNaN(year) || Number.isNaN(month)) {
    result = false;
  } else if((year < 2020 || year > 9999) || (month < 1 || month > 12)) {
    result = false;
  }
  return result;
}