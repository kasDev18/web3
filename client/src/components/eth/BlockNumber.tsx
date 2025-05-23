import Data from "./Data";

export default function BlockNumber({ block }: { block: number  | null}) {
  return (
    <Data value={block} title="LATEST BLOCK NUMBER" suffix=""/>
  );
}