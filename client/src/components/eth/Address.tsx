import Data from "./Data";

export default function Address({ address }: { address: string }) {
  return (
    <Data value={address} title="ADDRESS" suffix="" />
  );
}