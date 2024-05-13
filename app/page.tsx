import { PrismaClient, table1 } from "@prisma/client";
import ItemCard from "./itemCard";

const prisma = new PrismaClient();

export interface ItemType {
  id: number;
  company_cik: number;
  year: number;
  product_service_new: string;
  revenue_productnregion: string;
  netsales_productnregion: string;
}

const fetchItems = async (): Promise<ItemType[]> => {
  const items = await prisma.table1.findMany({
    where: {
      year: 2023
    },
    select: {
      id: true,
      company_cik: true,
      year: true,
      product_service_new: true,
      revenue_productnregion: true,
      netsales_productnregion: true,
    }
  })

  return items;
}

export default async function Page() {
  const items = await fetchItems();
  return (

      <div>
        {items.map((item) => (<ItemCard item={item} key={item.id} />))}
      `</div>

  )
}