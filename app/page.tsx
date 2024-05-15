'use client'
import { PrismaClient, table1 } from "@prisma/client";
import ItemCard from "./itemCard";
import { useState } from "react";
import Link from "next/link";

const prisma = new PrismaClient();

export interface ItemType {
  id: number;
  company_cik: number;
  year: number;
  name: string;
  item_1: string;
  item_2: string;
  item_3: string;
  item_5: string;
  item_7: string;
  item_7a: string;
  item_8: string;
}

const fetchItems = async (): Promise<ItemType[]> => {
  const items = await prisma.table1.findMany({
    where: {

    },
    select: {
      id: true,
      company_cik: true,
      year: true,
      name: true,
      item_1: true,
      item_2: true,
      item_3: true,
      item_5: true,
      item_7: true,
      item_7a: true,
      item_8: true
    }
  })

  return items;
}

export default async function Page() {
  const [query, setQuery] = useState<string>('');
  const items = await fetchItems();
  function handleQuery(value: any) {
    console.log(value)
  }



  return (
    <main>
      <div>
        <input type="text" placeholder="검색어를 입력하세요" value={query} onChange={handleQuery} />
      </div>
      <div>
        {items.map((item) => (<ItemCard item={item} key={item.id} />))}
      </div>
    </main>
  )
}