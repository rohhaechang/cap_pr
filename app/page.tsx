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
    