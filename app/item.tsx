import { sql } from "@vercel/postgres";

export default async function Item({
  params
} : {
  params: { cik: number }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from table1 where company_cik=${params.cik}`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}