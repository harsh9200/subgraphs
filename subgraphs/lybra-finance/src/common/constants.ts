import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

//////////////////////////////
/////// Protocol Config //////
//////////////////////////////

export namespace Protocol {
  export const ID = "0xd9a442856c234a39a81a089c06451ebaa4306a72";
  export const NAME = "Lybra Finance";
  export const SLUG = "lybra-finance";
}

//////////////////////////////
///// Ethereum Addresses /////
//////////////////////////////

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const STETH_ADDRESS = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
export const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

////////////////////////
///// Type Helpers /////
////////////////////////

export const DEFAULT_DECIMALS: i32 = 18;

export const USDC_DECIMALS = 6;
export const USDC_DENOMINATOR = BigDecimal.fromString("1000000");

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);
export const BIGINT_TWO = BigInt.fromI32(2);
export const BIGINT_TEN = BigInt.fromI32(10);
export const BIGINT_HUNDRED = BigInt.fromI32(100);
export const BIGINT_THOUSAND = BigInt.fromI32(1000);
export const BIGINT_TEN_TO_EIGHTEENTH = BigInt.fromString("10").pow(18);
export const BIGINT_MINUS_ONE = BigInt.fromI32(-1);
export const BIGINT_MAX = BigInt.fromString(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);

export const INT_NEGATIVE_ONE = -1 as i32;
export const INT_ZERO = 0 as i32;
export const INT_ONE = 1 as i32;
export const INT_TWO = 2 as i32;
export const INT_FOUR = 4 as i32;

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);
export const BIGDECIMAL_HUNDRED = new BigDecimal(BIGINT_HUNDRED);
export const BIGDECIMAL_MINUS_ONE = new BigDecimal(BIGINT_MINUS_ONE);

export const MAX_UINT = BigInt.fromI32(2).times(BigInt.fromI32(255));

/////////////////////
///// Date/Time /////
/////////////////////

export const SECONDS_PER_DAY = 60 * 60 * 24; // 86400
export const SECONDS_PER_HOUR = 60 * 60; // 3600
export const SECONDS_PER_DAY_BI = BigInt.fromI32(SECONDS_PER_DAY);
export const SECONDS_PER_HOUR_BI = BigInt.fromI32(SECONDS_PER_HOUR);
export const MS_PER_DAY = new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000));
export const DAYS_PER_YEAR = new BigDecimal(BigInt.fromI32(365));
export const MS_PER_YEAR = DAYS_PER_YEAR.times(
  new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000))
);

////////////////
///// Misc /////
////////////////

export const ETH_SYMBOL = "ETH";
export const ETH_NAME = "Ether";
