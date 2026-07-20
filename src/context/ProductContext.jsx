import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import supabase from "../lib/supabase";


export const ProductContext = createContext(null);


function transformProduct(product) {

  const galleryImages = (
    product.product_images || []
  )
    .sort(
      (firstImage, secondImage) =>
        firstImage.sort_order -
        secondImage.sort_order
    )
    .map((productImage) => ({
      id: productImage.id,
      imageUrl: productImage.image_url,
      sortOrder: productImage.sort_order,
    }));


  return {

    id: product.id,

    name: product.name,

    slug: product.slug,

    category: product.category,

    categoryLabel:
      product.category_label,

    price: product.price,

    originalPrice:
      product.original_price,

    description:
      product.description,

    stock:
      product.stock,

    badge:
      product.badge,

    image:
      product.image_url,

    images:
  galleryImages.length > 0
    ? galleryImages
    : [
        {
          id: product.id,
          imageUrl: product.image_url,
          sortOrder: 0,
        },
      ],

    isNewArrival:
      product.is_new_arrival,

    isFeatured:
      product.is_featured,

    isActive:
      product.is_active,

    isOccasionHamper:
      product.is_occasion_hamper ?? false,

    isLimitedEdition:
      product.is_limited_edition ?? false,

    occasion:
      product.occasion ?? null,

    occasionLabel:
      product.occasion_label ?? null,

    createdAt:
      product.created_at,

    updatedAt:
      product.updated_at,

  };

}



function ProductProvider({ children }) {


  const [products,setProducts] =
    useState([]);


  const [productsLoading,setProductsLoading] =
    useState(true);


  const [productsError,setProductsError] =
    useState(null);



  async function fetchProducts(){

    try{

      setProductsLoading(true);

      setProductsError(null);



      const {
        data,
        error
      } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            sort_order
          )
        `)
        .eq(
          "is_active",
          true
        )
        .order(
          "created_at",
          {
            ascending:false,
          }
        );



      if(error)
        throw error;



      setProducts(
        (data || [])
        .map(transformProduct)
      );


    }
    catch(error){

      console.error(
        "Failed to fetch products:",
        error
      );


      setProductsError(
        "We could not load the jewellery collection."
      );

    }
    finally{

      setProductsLoading(false);

    }

  }



  useEffect(()=>{


    fetchProducts();



    const channel =
      supabase
      .channel(
        "products-realtime"
      )
      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"products",
        },
        ()=>{
          fetchProducts();
        }
      )
      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"product_images",
        },
        ()=>{
          fetchProducts();
        }
      )
      .subscribe();



    return ()=>{

      supabase.removeChannel(
        channel
      );

    };


  },[]);




  const newArrivalProducts =
    useMemo(()=>{

      return products.filter(
        product =>
          product.isNewArrival
      );

    },[products]);



  const featuredProducts =
    useMemo(()=>{

      return products.filter(
        product =>
          product.isFeatured
      );

    },[products]);



  const occasionHamperProducts =
    useMemo(()=>{

      return products.filter(
        product =>
          product.category==="hampers" &&
          product.isOccasionHamper
      );

    },[products]);



  const activeOccasionHamperProducts =
    useMemo(()=>{

      return occasionHamperProducts.filter(
        product =>
          product.stock > 0
      );

    },[occasionHamperProducts]);



  function getProductBySlug(slug){

    return products.find(
      product =>
        product.slug === slug
    );

  }



  const productValue = {

    products,

    productsLoading,

    productsError,

    newArrivalProducts,

    featuredProducts,

    occasionHamperProducts,

    activeOccasionHamperProducts,

    getProductBySlug,

    refreshProducts:
      fetchProducts,

  };



  return (

    <ProductContext.Provider
      value={productValue}
    >

      {children}

    </ProductContext.Provider>

  );

}



export {
  ProductProvider,
};