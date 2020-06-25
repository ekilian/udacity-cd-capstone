
/**
 *
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