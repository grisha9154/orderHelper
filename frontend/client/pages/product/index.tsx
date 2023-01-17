import { GetServerSideProps } from "next";

import { ProductListing, ProductListingProps } from "../../modules";

export const getServerSideProps: GetServerSideProps<
  ProductListingProps
> = async () => {
  return {
    props: await {
      categories: [
        { id: "1", title: "1" },
        { id: "2", title: "2" },
      ],
      products: [],
    },
  };
};

export default ProductListing;
