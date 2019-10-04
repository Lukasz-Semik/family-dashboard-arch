const EXPIRE_12_H = 43200;
const EXPIRE_24_H = 2 * EXPIRE_12_H;
const EXPIRE_WEEK = 7 * EXPIRE_24_H;
const EXPIRE_2_WEEKS = 2 * EXPIRE_WEEK;

export enum TokenExpiration {
  Hours12 = EXPIRE_12_H,
  Hours24 = EXPIRE_24_H,
  ExpireWeeks1 = EXPIRE_WEEK,
  ExpireWeeks2 = EXPIRE_2_WEEKS,
}
