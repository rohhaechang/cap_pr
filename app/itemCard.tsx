import Link from "next/link";
import { ItemType } from "./page";

interface Props {
  item: ItemType;
}

export default function ItemCard({ item }: Props) {
  return (
    <div>
      <Link href={`/item/${item.company_cik}`}>
        <div key={item.id}>{item.name}, { item.year}</div>
      </Link>
    </div>
  )
}