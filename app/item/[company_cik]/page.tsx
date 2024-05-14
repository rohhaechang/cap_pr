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
      item_1: true,
      item_2: true,
      item_3: true,
      item_5: true,
      item_7: true,
      item_7a: true,
      item_8: true
    }
  })
  if (!item) {
    throw new Error();
  }
  return item;
}

export default async function ItemDetails({params}: {params: {company_cik: number}}) {
  const items = await fetchItemByCik(params.company_cik.toString());
  let item_1, item_2, item_3, item_5, item_7, item_7a, item_8
  try {
    item_1 = JSON.parse(items.item_1)
  } catch (error) {
    item_1 = "error"
  }

  try {
    item_2 = JSON.parse(items.item_2)
  } catch (error) {
    item_2 = "error"
  }
  try {
    item_3 = JSON.parse(items.item_3)
  } catch (error) {
    item_3 = "error"
  }
  try {
    item_5 = JSON.parse(items.item_5)
  } catch (error) {
    item_5 = "error"
  }
  try {
    item_7 = JSON.parse(items.item_7)
  } catch (error) {
    item_7 = "error"
  }
  try {
    item_7a = JSON.parse(items.item_7a)
  } catch (error) {
    item_7a = "error"
  }
  try {
    if (items.item_8 != 'No Data') {
      JSON.parse(items.item_8)
    }
  } catch (error) {
    item_8 = "error"
  }

  return (

      <div className=" h-96">
        <div className="min-h-10">{items.company_cik}</div>
      <div className="mt-4">item_1</div>
        <div>
            {item_1['products'] ? <div>products: {item_1['products']}</div> : <div>products: none</div>}
        </div>
        <div>
          {item_1['service'] ? <div>service: {item_1['service']}</div> : <div>service: none</div>}
        </div>
        <div>
          {item_1['new_product'] ? <div>new product: {item_1['new_product']}</div> : <div>new product: none</div>}
        </div>
        <div className=" f">item_2</div>

        <div className="mt-4">item_3</div>

        <div className="mt-4">item_5</div>

        <div className="mt-4">item_7</div>

        <div className="mt-4">item_7A</div>
        <div>interest_rate_risk: {item_7a['interest_rate_risk']}</div>
        <div>Foreign_Exchange_Risk: {item_7a['Foreign_Exchange_Risk']}</div>
        <div className="mt-4">item_8</div>

      </div>

  )
}