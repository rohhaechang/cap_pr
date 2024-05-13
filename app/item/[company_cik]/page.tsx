import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const fetchItemByCik = async (company_cik: string) => {
  const item = await prisma.table1.findFirst({
    where: {
      company_cik: parseInt(company_cik)
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
  if (!item) {
    throw new Error();
  }
  return item;
}

export default async function ItemDetails({params}: {params: {company_cik: number}}) {
  const items = await fetchItemByCik(params.company_cik.toString());
  return (
    <main>
      <div>
        <div>{items.company_cik}</div>
        <div>{items.product_service_new}</div>
        <div>{items.netsales_productnregion}</div>
      `</div>
    </main>
  )
}