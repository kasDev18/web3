import Data from "./Data";

export default function ETHBalance({ balance }: { balance: string }) {
  return (
    <Data value={balance} title="BALANCE" suffix="ETH" />
  );
}