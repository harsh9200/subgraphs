import {
  initializeSDK,
  getOrCreatePool,
  getOrCreateAccount,
} from "../common/initializers";
import {
  DecreasePoolAmount as DecreasePoolAmountEvent,
  IncreasePoolAmount as IncreasePoolAmountEvent,
} from "../../generated/Vault/Vault";
import {
  AddLiquidity as AddLiquidityEvent,
  RemoveLiquidity as RemoveLiquidityEvent,
} from "../../generated/Vault/MlpManager";
import * as utils from "../common/utils";
import * as constants from "../common/constants";
import { BigInt, Address } from "@graphprotocol/graph-ts";

export function handleIncreasePoolAmount(event: IncreasePoolAmountEvent): void {
  const amount = event.params.amount;
  const tokenAddress = event.params.token;

  const sdk = initializeSDK(event);
  const pool = getOrCreatePool(sdk);
  const token = sdk.Tokens.getOrCreateToken(tokenAddress);
  utils.checkAndUpdateInputTokens(pool, token, amount);

  const inputTokens = pool.getInputTokens();
  const inputTokenIndex = inputTokens.indexOf(token.id);

  const inputTokenBalances = pool.pool.inputTokenBalances;
  inputTokenBalances[inputTokenIndex] =
    inputTokenBalances[inputTokenIndex].plus(amount);

  pool.setInputTokenBalances(inputTokenBalances, true);
}

export function handleDecreasePoolAmount(event: DecreasePoolAmountEvent): void {
  const amount = event.params.amount;
  const tokenAddress = event.params.token;

  const sdk = initializeSDK(event);
  const pool = getOrCreatePool(sdk);

  const token = sdk.Tokens.getOrCreateToken(tokenAddress);
  utils.checkAndUpdateInputTokens(pool, token, amount);

  const inputTokens = pool.getInputTokens();
  const inputTokenIndex = inputTokens.indexOf(token.id);

  const inputTokenBalances = pool.pool.inputTokenBalances;
  inputTokenBalances[inputTokenIndex] =
    inputTokenBalances[inputTokenIndex].minus(amount);

  pool.setInputTokenBalances(inputTokenBalances, true);
}

export function handleAddLiquidity(event: AddLiquidityEvent): void {
  const accountAddress = event.params.account;
  const tokenAddress = event.params.token;
  const vaultTVL = event.params.aumInUsdg;
  const outputTokenSupply = event.params.glpSupply;
  const mintAmount = event.params.mintAmount;
  const amount = event.params.amount;

  const sdk = initializeSDK(event);
  const pool = getOrCreatePool(sdk);

  const account = getOrCreateAccount(accountAddress, pool, sdk);
  const token = sdk.Tokens.getOrCreateToken(tokenAddress);
  utils.checkAndUpdateInputTokens(pool, token, amount);

  const poolInputTokens = pool.getInputTokens();
  const idx = pool.getInputTokens().indexOf(token.id);
  const amountsArray = new Array<BigInt>(poolInputTokens.length).fill(
    constants.BIGINT_ZERO
  );
  amountsArray[idx] = amount;
  pool.setTotalValueLocked(
    utils.bigIntToBigDecimal(vaultTVL, constants.DEFAULT_DECIMALS)
  );
  pool.setOutputTokenSupply(outputTokenSupply);
  pool.setStakedOutputTokenAmount(outputTokenSupply);

  account.deposit(pool, amountsArray, mintAmount, true);
}

export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  const accountAddress = event.params.account;
  const tokenAddress = event.params.token;
  const vaultTVL = event.params.aumInUsdg;
  const outputTokenSupply = event.params.glpSupply;
  const mintAmount = event.params.glpAmount;
  const amount = event.params.amountOut;

  const sdk = initializeSDK(event);
  const pool = getOrCreatePool(sdk);

  const account = getOrCreateAccount(accountAddress, pool, sdk);
  const token = sdk.Tokens.getOrCreateToken(tokenAddress);
  utils.checkAndUpdateInputTokens(pool, token);

  const poolInputTokens = pool.getInputTokens();
  const idx = pool.getInputTokens().indexOf(token.id);
  const amountsArray = new Array<BigInt>(poolInputTokens.length).fill(
    constants.BIGINT_ZERO
  );
  amountsArray[idx] = amount;
  pool.setTotalValueLocked(
    utils.bigIntToBigDecimal(vaultTVL, constants.DEFAULT_DECIMALS)
  );
  pool.setOutputTokenSupply(outputTokenSupply);
  pool.setStakedOutputTokenAmount(outputTokenSupply);

  account.withdraw(pool, amountsArray, mintAmount, true);
}
