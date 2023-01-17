import { FC } from "react";
import { Box, List, ListItem } from "@mui/material";
import Link from "next/link";
import { PageContainer } from "packages";

interface Category {
  id: string;
  title: string;
}

interface Product {
  title: string;
  price: number;
}

export interface ProductListingProps {
  categories: Category[];
  products: Product[];
}

export const ProductListing: FC<ProductListingProps> = ({
  categories,
  products,
}) => {
  return (
    <PageContainer>
      <Box sx={{ display: "flex" }}>
        <Box>
          <List>
            {categories.map((x) => {
              return (
                <ListItem key={x.id}>
                  <Link href={`?categoryId=${x.id}`}>{x.title}</Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box></Box>
      </Box>
    </PageContainer>
  );
};
