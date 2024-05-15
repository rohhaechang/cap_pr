import Link from "next/link";
import { ItemType } from "./page";

interface Props {
  item: ItemType;
}

export default function ItemCard({ item }: Props) {
  return (
    <div style={{height: "20%"}}>
      <Link href={`/item/${item.company_cik}`}>
        <div key={item.id}><text style={{fontSize: "20px"}}>{item.name}</text>: { item.company_cik}</div>
      </Link>
    </div>
  )
}