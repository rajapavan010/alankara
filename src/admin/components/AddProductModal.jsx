import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProductInfoCard from "./ProductInfoCard";
import PricingCard from "./PricingCard";
import InventoryCard from "./InventoryCard";
import SettingsCard from "./SettingsCard";
import ImagesCard from "./ImagesCard";

import { validateProduct } from "../utils/productValidation";

import {
  uploadMainImage,
  uploadGalleryImages,
  createProduct,
  updateProduct,
  saveGalleryImages,
  replaceGalleryImages,
  replaceMainImage,
  replaceGalleryImage,
  slugExists,
} from "../services/productService";

const initialProduct = {
  name: "",
  slug: "",

  category: "",
  category_label: "",

  description: "",

  price: "",
  original_price: "",

  stock: 0,

  badge: "",

  is_active: true,
  is_featured: false,
  is_new_arrival: false,
  is_limited_edition: false,
  is_occasion_hamper: false,

  occasion: "",
  occasion_label: "",

  mainImage: null,
  galleryImages: [null, null, null],
galleryImageUrls: [],
};

function AddProductModal({ open, onClose, onProductAdded, editMode, selectedProduct,}) {
  const [saving, setSaving] = useState(false);

  const [product, setProduct] = useState({
  ...initialProduct,
  galleryImages: [null, null, null],
  galleryImageUrls: [],
});
  function updateField(field, value) {
    setProduct((previous) => ({
      ...previous,
      [field]: value,
    }));
  }
  function resetForm() {
  setProduct({
    ...initialProduct,
    galleryImages: [null, null, null],
    galleryImageUrls: [],
  });
}

useEffect(() => {
  if (!open) return;

  if (editMode && selectedProduct) {

    const editProduct = {
      ...initialProduct,

      id: selectedProduct.id,

      name: selectedProduct.name || "",
      slug: selectedProduct.slug || "",

      category: selectedProduct.category || "",
      category_label:
        selectedProduct.category_label || "",

      description:
        selectedProduct.description || "",

      price:
        selectedProduct.price || "",

      original_price:
        selectedProduct.original_price || "",

      stock:
        selectedProduct.stock || 0,

      badge:
        selectedProduct.badge || "",

      is_active:
        selectedProduct.is_active,

      is_featured:
        selectedProduct.is_featured,

      is_new_arrival:
        selectedProduct.is_new_arrival,

      is_limited_edition:
        selectedProduct.is_limited_edition,

      is_occasion_hamper:
        selectedProduct.is_occasion_hamper,

      occasion:
        selectedProduct.occasion || "",

      occasion_label:
        selectedProduct.occasion_label || "",

      image_url:
        selectedProduct.image_url,

      galleryImageUrls:
        selectedProduct.galleryImageUrls || [],

      mainImage: null,

      galleryImages:
        [null, null, null],
    };


    Promise.resolve().then(() => {
      setProduct(editProduct);
    });


  }

}, [open, editMode, selectedProduct]);

async function handleCreate() {
  const exists = await slugExists(product.slug);

  if (exists) {
    toast.error("A product with this slug already exists.");
    return;
  }

  const mainImageUrl = await uploadMainImage(
    product.mainImage,
    product.category,
    product.slug
  );

  const galleryUrls = await uploadGalleryImages(
    product.galleryImages.filter(Boolean),
    product.category,
    product.slug
  );

  const createdProduct =
    await createProductDetails(mainImageUrl);

  await saveGalleryImages(
    createdProduct.id,
    galleryUrls
  );

  toast.success("Product added successfully!");
}

async function uploadChangedMainImage() {
  return await replaceMainImage(
    product.image_url,
    product.mainImage,
    product.category,
    product.slug
  );
}

async function uploadChangedGalleryImages() {


  const existingGalleryUrls =
    [
      ...(product.galleryImageUrls || [])
    ];



  while(existingGalleryUrls.length < 3){

    existingGalleryUrls.push(null);

  }



  for(let i = 0; i < 3; i++){


    const selectedImage =
      product.galleryImages[i];


    if(!selectedImage){
      continue;
    }



    const newUrl =
      await replaceGalleryImage(
        existingGalleryUrls[i],
        selectedImage,
        product.category,
        product.slug,
        i + 1
      );



    existingGalleryUrls[i] = newUrl;



  }



  console.log(
    "Final gallery URLs:",
    existingGalleryUrls
  );



  return existingGalleryUrls;

}

async function updateProductDetails(mainImageUrl) {
  console.log(
  "IMAGE URL BEFORE DATABASE UPDATE:",
  mainImageUrl
);


await updateProduct(product.id, {
    name: product.name,
    slug: product.slug,

    category: product.category,
    category_label: product.category_label,

    description: product.description,

    price: Number(product.price),

    original_price:
      product.original_price !== ""
        ? Number(product.original_price)
        : null,

    stock: Number(product.stock),

    badge: product.badge,

    image_url: mainImageUrl,

    is_active: product.is_active,
    is_featured: product.is_featured,
    is_new_arrival: product.is_new_arrival,
    is_limited_edition: product.is_limited_edition,
    is_occasion_hamper: product.is_occasion_hamper,

    occasion: product.occasion,
    occasion_label: product.occasion_label,
  });
}

async function createProductDetails(mainImageUrl) {
  return await createProduct({
    name: product.name,
    slug: product.slug,

    category: product.category,
    category_label: product.category_label,

    description: product.description,

    price: Number(product.price),

    original_price:
      product.original_price !== ""
        ? Number(product.original_price)
        : null,

    stock: Number(product.stock),

    badge: product.badge,

    image_url: mainImageUrl,

    is_active: product.is_active,
    is_featured: product.is_featured,
    is_new_arrival: product.is_new_arrival,
    is_limited_edition: product.is_limited_edition,
    is_occasion_hamper: product.is_occasion_hamper,

    occasion: product.occasion,
    occasion_label: product.occasion_label,
  });
}

async function handleUpdate() {

  console.log("Selected new image:", product.mainImage);


  let mainImageUrl = product.image_url;


  if(product.mainImage){

    mainImageUrl =
      await uploadChangedMainImage();

  }


  console.log(
    "New image URL:",
    mainImageUrl
  );


  const galleryUrls =
  await uploadChangedGalleryImages();


console.log(
  "Saving gallery URLs:",
  galleryUrls
);


  await updateProductDetails(
    mainImageUrl
  );


  await replaceGalleryImages(
    product.id,
    galleryUrls
  );


  console.log(
    "Product update completed"
  );


  toast.success(
    "Product updated successfully!"
  );

}

async function handleSave() {
  try {
    const validationError = validateProduct(
      product,
      editMode
    );

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setSaving(true);

    if (editMode) {
      await handleUpdate();
    } else {
      await handleCreate();
    }

    resetForm();

    if (onProductAdded) {
      await onProductAdded();
    }

    onClose();
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } finally {
    setSaving(false);
  }
}

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="product-modal"> 

        {/* Header */}

        <div className="modal-header">
          <div>
            <h2>
  {editMode ? "Edit Product" : "Add New Product"}
</h2>

<p>
  {editMode
    ? "Update product details"
    : "Create a new product for Alankara"}
</p>
          </div>

          <button
  className="modal-close"
  onClick={() => {
    resetForm();
    onClose();
  }}
>
  ✕
</button>
        </div>

        {/* Body */}

        <div className="modal-content">
          <div className="modal-grid">

            <ProductInfoCard
              product={product}
              updateField={updateField}
            />

            <ImagesCard
              product={product}
              updateField={updateField}
            />

            <PricingCard
              product={product}
              updateField={updateField}
            />

            <SettingsCard
              product={product}
              updateField={updateField}
            />

            <InventoryCard
              product={product}
              updateField={updateField}
            />

          </div>
        </div>

        {/* Footer */}

        <div className="modal-footer">

          

          <button
  className="cancel-btn"
  onClick={() => {
    resetForm();
    onClose();
  }}
  disabled={saving}
>
  Cancel
</button>

<button
  className="save-btn"
  onClick={handleSave}
  disabled={saving}
>
  {saving
    ? (editMode ? "Updating..." : "Saving...")
    : (editMode ? "Update Product" : "Save Product")}
</button>
        </div>

      </div>
    </div>
  );
}

export default AddProductModal;