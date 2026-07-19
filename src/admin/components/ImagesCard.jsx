import { useRef } from "react";

function ImagesCard({ product, updateField }) {
  const mainInputRef = useRef(null);

  const galleryRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  function handleMainImage(e) {
    const file = e.target.files[0];

    if (!file) return;


    updateField("mainImage", file);
  }

  function handleGalleryImage(index, e) {

  const file = e.target.files[0];


  if (!file) return;


  console.log(
    "Selected gallery image:",
    index,
    file
  );


  const images = [
    ...product.galleryImages
  ];


  images[index] = file;


  updateField(
    "galleryImages",
    images
  );

}

  return (
    <div className="admin-card">
      <h3>🖼 Product Images</h3>

      {/* Main Image */}

      <div className="image-section">

        <label className="section-title">
          Main Product Image *
        </label>

        <input
          ref={mainInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleMainImage}
        />

        <div
          className="main-upload-box"
          onClick={() =>
            mainInputRef.current.click()
          }
        >
          {product.mainImage ? (
  <img
    src={URL.createObjectURL(product.mainImage)}
    alt="Main"
    className="preview-main-image"
  />
) : product.image_url ? (
  <img
    src={product.image_url}
    alt="Main"
    className="preview-main-image"
  />
) : (
            <>
              <div className="upload-icon">
                📷
              </div>

              <h4>Upload Main Image</h4>

              <p>
                Click to choose image
              </p>
            </>
          )}
        </div>

      </div>

      {/* Gallery */}

      <div className="image-section">

        <label className="section-title">
          Gallery Images
        </label>

        <div className="gallery-grid">

          {product.galleryImages.map(
            (image, index) => (
              <div
                key={index}
                className="gallery-upload"
                onClick={() =>
                  galleryRefs[
                    index
                  ].current.click()
                }
              >
                <input
                  hidden
                  ref={galleryRefs[index]}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleGalleryImage(
                      index,
                      e
                    )
                  }
                />

                {image ? (
    <img
        src={URL.createObjectURL(image)}
        alt=""
        className="gallery-preview"
    />
) : product.galleryImageUrls?.[index] ? (
    <img
        src={product.galleryImageUrls[index]}
        alt=""
        className="gallery-preview"
    />
) : (
    <span>+</span>
)}
              </div>
            )
          )}

        </div>

      </div>

      <div className="upload-note">

        <strong>Upload Guide</strong>

        <ul>
          <li>Main image is required</li>
          <li>Maximum 3 gallery images</li>
          <li>PNG, JPG, WEBP</li>
          <li>Maximum 5 MB each</li>
        </ul>

      </div>

    </div>
  );
}

export default ImagesCard;