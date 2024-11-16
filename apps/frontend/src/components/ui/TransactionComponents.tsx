import { useCallback } from "react";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { LifecycleStatus } from "@coinbase/onchainkit/transaction";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { BASE_SEPOLIA_CHAIN_ID } from "@/constants/config";

export default function TransactionComponents({
  contracts,
  buttonText,
  className,
  wrpClassName,
}: {
  contracts: any[];
  buttonText?: string;
  className?: string;
  wrpClassName?: string;
}) {
  const { address } = useAccount();

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  return address ? (
    <Transaction
      chainId={BASE_SEPOLIA_CHAIN_ID}
      contracts={contracts}
      onStatus={handleOnStatus}
    >
      <div className={`relative ${wrpClassName ?? ""}`}>
        <TransactionButton className={className} text={buttonText} />
      </div>
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
