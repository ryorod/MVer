"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
  contract,
  buttonText,
  className,
  wrpClassName,
  getArgsBeforeSubmit,
}: {
  contract: any;
  buttonText?: string;
  className?: string;
  wrpClassName?: string;
  getArgsBeforeSubmit?: () => Promise<any[]>;
}) {
  const { address } = useAccount();

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  const [contractState, setContractState] = useState(contract);
  const wrpRef = useRef<HTMLDivElement>(null);
  const beforeSubmitEndedRef = useRef(false);

  const beforeSubmit = async () => {
    if (getArgsBeforeSubmit) {
      const args = await getArgsBeforeSubmit();
      beforeSubmitEndedRef.current = true;
      setContractState({ ...contractState, args });
      const btnElement = wrpRef.current?.querySelector("button");
    }
  };

  useEffect(() => {
    if (beforeSubmitEndedRef.current) {
      beforeSubmitEndedRef.current = false;
      const btnElement = wrpRef.current?.querySelector("button");
      btnElement?.click();
    }
  }, [contractState]);

  return address ? (
    <Transaction
      chainId={BASE_SEPOLIA_CHAIN_ID}
      contracts={[contractState]}
      onStatus={handleOnStatus}
    >
      <div className={`relative ${wrpClassName ?? ""}`} ref={wrpRef}>
        <TransactionButton className={className} text={buttonText} />
        {getArgsBeforeSubmit && (
          <div className="absolute inset-0" onClick={beforeSubmit} />
        )}
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
