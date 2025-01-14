import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";
import { HardhatNetworkAccountUserConfig } from "hardhat/src/types/config";

export const startingEtherPerAccount = 1_000_000_000;

export const getPKs = () => {
  let deployerAccount, keeperAccount, upgraderAccount, rewarderAccount;

  // PKs without `0x` prefix
  if (process.env.DEPLOYER_PK) deployerAccount = process.env.DEPLOYER_PK;
  if (process.env.KEEPER_PK) keeperAccount = process.env.KEEPER_PK;
  if (process.env.UPGRADER_PK) upgraderAccount = process.env.UPGRADER_PK;
  if (process.env.REWARDER_PK) rewarderAccount = process.env.REWARDER_PK;
/*
DEPLOYER_PK=
KEEPER_PK=
UPGRADER_PK=
REWARDER_PK=
*/
  const accounts = [deployerAccount, keeperAccount, upgraderAccount, rewarderAccount].filter(pk => !!pk) as string[];
  return accounts;
};

export const buildHardhatNetworkAccounts = (accounts: string[]) => {
  
  const hardhatAccounts = accounts.map(pk => {
    // hardhat network wants 0x prefix in front of PK
    const accountConfig: HardhatNetworkAccountUserConfig = {
      privateKey: pk,
      balance: ethers.utils.parseUnits(startingEtherPerAccount.toString(), "ether").toString(),
    };
    return accountConfig;
  });
  return hardhatAccounts;
};
