import { PrismaClient } from "@prisma/client"
import { randomInt } from "crypto";
import Table from "@/app/makeTable";

const prisma = new PrismaClient();

interface Topic {
  [key: string]: string;
}

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
  let years: number[] = [];
  let division: string[] = [];

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
      item_8 = JSON.parse(items.item_8)
      let categories = item_8['net_sales_products']
      for (const category in categories) {
        division.push(category)
        if (categories.hasOwnProperty(category)) {
          const salesData = categories[category];
          for (const year in salesData) {
            if (salesData.hasOwnProperty(year)) {
              years.push(parseInt(year));
            }
          }
        }
      }
      const set1 = new Set(years);
      const set2 = new Set(division);
      division = Array.from(set2);
      years = Array.from(set1);
    }
    else {
      item_8 = "error"
    }
  } catch (error) {
    item_8 = "error"
  }


  return (

      <div>
        <h1>{items.company_cik}</h1>
      <h2>item_1</h2>
        <div>
          {item_1['products'] ? <p><b>products:</b> {item_1['products']}</p> : <p>products: none</p>}
        </div>
        <div>
          {item_1['service'] ? <p><b>service:</b> {item_1['service']}</p> : <p>service: none</p>}
        </div>
        <div>
          {item_1['new_product'] ? <p><b>new product:</b> {item_1['new_product']}</p> : <p>new product: none</p>}
        </div>
        <h2>item_2</h2>
          <div>
            {item_2['headquater'] ? <p><b>headquater:</b> {item_2['headquater']}</p> : <p>headquater: none</p>}
          </div>
          <div>
            {item_2['facility'] ? <p><b>facility:</b> {item_2['facility']}</p> : <p>facility: none</p>}
          </div>
        <h2>item_3</h2>
          <div>
        {item_3['topics'].length > 1
          ? item_3['topics'].map((topic: Topic) => <p key={randomInt(300)}><b>{Object.keys(topic)}</b>: {topic[`${Object.keys(topic)}`]}</p>)
          : <p>topics: none</p>}
          </div>
        <h2>item_5</h2>
          <div>
            {item_5['summary'] ? <p><b>stock summary:</b> {item_5['summary']}</p> : <p>stock summary: none</p>}
          </div>
        <h2>item_7</h2>
          <div>
        {item_7['topics'].length > 1
          ? item_7['topics'].map((topic: Topic) => <p key={randomInt(300)}><b>{Object.keys(topic)}</b>: {topic[`${Object.keys(topic)}`]}</p>)
          : <p>topics: none</p>}
          </div>

        <h2>item_7A</h2>
          <div>
            {item_7a['interest_rate_risk'] ? <p><b>interest_rate_risk:</b> {item_7a['interest_rate_risk']}</p> : <p>interest_rate_risk: none</p>}
          </div>
          <div>
            {item_7a['Foreign_Exchange_Risk'] ? <p><b>Foreign_Exchange_Risk:</b> {item_7a['Foreign_Exchange_Risk']}</p> : <p>Foreign_Exchange_Risk: none</p>}
          </div>
      <h2>item_8</h2>
      <div>
        {item_8 != 'error'
          ? <table>
            <thead>
              <tr>
                <th>Category</th>
                {years.map((year) => <td key={randomInt(300)}>{year}</td>)}
              </tr>
            </thead>
            <tbody>
              {division.map((category) => <tr key={randomInt(400)}>
                <td key={randomInt(500)}>{category}</td>
                {years.map((year) => (<td key={randomInt(600)}>{ item_8['net_sales_products'][category][year]}</td>))}
              </tr>)}
            </tbody>
          </table>
          : <div>item_8 에러</div>
        }
        </div>
        <div></div>
      </div>

  )
}