import supabase from "../../lib/supabase";

/* =========================================
   Get All Products
========================================= */

/* =========================================
   Get All Products
========================================= */

export async function getProducts() {

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        image_url,
        sort_order
      )
    `)
    .order(
      "created_at",
      {
        ascending:false
      }
    );


  if(error)
    throw error;


  return data;

}

/* =========================================
   Toggle Product Status
========================================= */

export async function toggleProductStatus(
  productId,
  isActive
) {
  const { error } = await supabase
    .from("products")
    .update({
      is_active: isActive,
    })
    .eq("id", productId);

  if (error) throw error;
}

/* =========================================
   Check Slug Exists
========================================= */

export async function slugExists(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}

/* =========================================
   Upload Main Image
========================================= */

export async function uploadMainImage(file, category, slug) {
  if (!file) return null;

  // Always use webp so the filename never changes
  const filePath =
  `products/${category}/${slug}-main-${Date.now()}.webp`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  // Prevent browser cache
  return `${data.publicUrl}?t=${Date.now()}`;
}

export async function uploadSingleGalleryImage(
  file,
  category,
  slug,
  index
) {

  if (!file) return null;


  const filePath =
    `products/${category}/${slug}-gallery-${index}-${Date.now()}.webp`;



  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type,
    });



  if (error) throw error;



  const { data } =
    supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);



  return `${data.publicUrl}?t=${Date.now()}`;

}

export async function deleteStorageImage(imageUrl) {
  if (!imageUrl) return;

  const marker = "/storage/v1/object/public/product-images/";

  const index = imageUrl.indexOf(marker);

  if (index === -1) return;

  const storagePath = imageUrl.substring(
    index + marker.length
  );

  const { error } = await supabase.storage
    .from("product-images")
    .remove([storagePath]);

  if (error) throw error;
}

export async function replaceMainImage(
  oldImageUrl,
  file,
  category,
  slug
) {

console.log("replaceMainImage file:", file);

  if (!file) return oldImageUrl;

  return uploadMainImage(file, category, slug);
}

export async function replaceGalleryImage(
  oldImageUrl,
  file,
  category,
  slug,
  index
) {
  if (!file) return oldImageUrl;

  return uploadSingleGalleryImage(
    file,
    category,
    slug,
    index
  );
}

/* =========================================
   Upload Gallery Images
========================================= */

export async function uploadGalleryImages(
  files,
  category,
  slug
) {
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const extension = file.name
      .split(".")
      .pop();

    const filePath =
`products/${category}/${slug}-gallery-${i + 1}-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    urls.push(data.publicUrl);
  }

  return urls;
}

/* =========================================
   Create Product
========================================= */

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* =========================================
   Update Product
========================================= */

export async function updateProduct(
  productId,
  product
){

  const { error } =
    await supabase
      .from("products")
      .update(product)
      .eq(
        "id",
        productId
      );


  if(error)
    throw error;


  return true;

}

/* =========================================
   Replace Gallery Images
========================================= */

export async function replaceGalleryImages(
  productId,
  galleryUrls
) {


  const {
    data: existing,
    error: fetchError
  } = await supabase
    .from("product_images")
    .select("*")
    .eq(
      "product_id",
      productId
    )
    .order(
      "sort_order"
    );


  if(fetchError)
    throw fetchError;



  for(let i = 0; i < galleryUrls.length; i++){


    const url = galleryUrls[i];


    if(!url)
      continue;



    const sortOrder = i + 1;



    const existingRow =
      existing.find(
        item =>
        item.sort_order === sortOrder
      );



    if(existingRow){


      const {
        error
      } = await supabase
        .from("product_images")
        .update({

          image_url:url

        })
        .eq(
          "id",
          existingRow.id
        );



      if(error)
        throw error;



    }
    else{


      const {
        error
      } = await supabase
        .from("product_images")
        .insert({

          product_id:productId,

          image_url:url,

          sort_order:sortOrder

        });



      if(error)
        throw error;


    }

  }

}

/* =========================================
   Get Gallery Images
========================================= */

export async function getGalleryImages(
  productId
) {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order");

  if (error) throw error;

  return data;
}

/* =========================================
   Save Gallery Images
========================================= */

export async function saveGalleryImages(
  productId,
  urls,
  mainImageUrl
) {

  const images = [];


  // Always save main image as first image
  if(mainImageUrl){

    images.push({
      product_id: productId,
      image_url: mainImageUrl,
      sort_order: 0,
    });

  }


  // Save gallery images
  urls.forEach((url,index)=>{

    images.push({

      product_id: productId,

      image_url:url,

      sort_order:index + 1,

    });

  });



  if(images.length === 0)
    return;



  const {
    error
  } = await supabase
    .from("product_images")
    .insert(images);



  if(error)
    throw error;

}
export async function deleteProduct(product) {
  // Delete main image
  if (product.image_url) {
    try {
      await deleteStorageImage(product.image_url);
    } catch (err) {
      console.warn("Main image not found:", err);
    }
  }

  // Delete gallery images
  if (product.galleryImageUrls?.length) {
    for (const imageUrl of product.galleryImageUrls) {
      try {
        await deleteStorageImage(imageUrl);
      } catch (err) {
        console.warn("Gallery image not found:", err);
      }
    }
  }

  // Delete product from database
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", product.id);

  if (error) throw error;
}

export async function updateProductStock(
  productId,
  stock
){

  const { error } = await supabase
    .from("products")
    .update({
      stock:Number(stock)
    })
    .eq(
      "id",
      productId
    );


  if(error)
    throw error;
}
