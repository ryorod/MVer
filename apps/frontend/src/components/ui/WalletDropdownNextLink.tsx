import { cn, color, pressable, text } from "@coinbase/onchainkit/theme";
import { WalletDropdownLinkReact } from "@coinbase/onchainkit/wallet";
import Link from "next/link";

export function WalletDropdownNextLink({
  children,
  className,
  //   icon,
  href,
  rel,
  target,
}: WalletDropdownLinkReact) {
  return (
    <Link
      href={href}
      className={cn(
        pressable.default,
        color.foreground,
        "relative flex items-center px-4 py-3",
        className
      )}
      target={target}
      rel={rel}
    >
      <div className="-translate-y-1/2 absolute top-1/2 left-4 flex h-[1.125rem] w-[1.125rem] items-center justify-center">
        {/* {iconSvg} */}
      </div>
      <span className={cn(text.body, "pl-6")}>{children}</span>
    </Link>
  );
}
