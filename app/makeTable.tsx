interface SalesData {
    [key: string]: string;
}

interface SalesByYear {
    [key: string]: SalesData;
}

interface Props {
    data: {
        net_sales_products: SalesByYear;
    };
}

const Table: React.FC<Props> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    {Object.keys(data.net_sales_products).map(year => (
                        <th key={year}>{year}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.entries(data.net_sales_products).map(([category, salesByYear]) => (
                    <tr key={category}>
                        <td>{category}</td>
                        {Object.values(salesByYear).map((sales, index) => (
                            <td key={index}>{sales}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;