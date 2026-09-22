import { connection } from "next/server";

import { ProductsScreen } from "@/components/products/products-screen";

const HomePage = async () => {
  await connection();
  return <ProductsScreen />;
};

export default HomePage;
