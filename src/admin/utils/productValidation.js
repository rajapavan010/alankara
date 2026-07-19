export function validateProduct(product, editMode = false) {
  if (!product.name.trim()) {
    return "Product name is required.";
  }

  if (!product.category) {
    return "Select a category.";
  }

  if (!product.price) {
    return "Enter the product price.";
  }

  if (product.stock === "" || product.stock === null || product.stock === undefined) {
    return "Enter stock quantity.";
  }

  // Only require a new main image while creating
  if (!editMode && !product.mainImage) {
    return "Select the main product image.";
  }

  return null;
}