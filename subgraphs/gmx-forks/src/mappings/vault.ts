import {
  initializeSDK,
  getOrCreatePool,
  getOrCreateAccount,
} from "../common/initializers";
import {
  Swap as SwapEvent,
  DecreasePoolAmount as DecreasePoolAmountEvent,
  IncreasePoolAmount as IncreasePoolAmountEvent,
} from "../../generated/Vault/Vault";
import * as utils from "../common/utils";
import { Address } from "@graphprotocol/graph-ts";

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

export function handleSwap(event: SwapEvent): void {
  const accountAddress = event.params.account;

  const tokenInAddress = event.params.tokenIn;
  const tokenOutAddress = event.params.tokenOut;

  const amountIn = event.params.amountIn;
  const amountOut = event.params.amountOutAfterFees;

  const sdk = initializeSDK(event);
  const pool = getOrCreatePool(sdk);
  const account = getOrCreateAccount(accountAddress, pool, sdk);

  account.swap(
    pool,
    tokenInAddress,
    amountIn,
    tokenOutAddress,
    amountOut,
    Address.fromBytes(pool.getBytesID()),
    true
  );
}
