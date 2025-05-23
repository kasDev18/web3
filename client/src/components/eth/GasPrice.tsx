import Data from "./Data";

export default function GasPrice({ gas_price }: { gas_price: string }) {
  return (
    <Data value={gas_price} title="GAS PRICE" suffix="GWEI" />
  );
}