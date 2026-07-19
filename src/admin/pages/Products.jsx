import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AddProductModal from "../components/AddProductModal";

import {
  getProducts,
  toggleProductStatus,
  deleteProduct,
  updateProductStock,
} from "../services/productService";


function Products() {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);



  // Search + Filter

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");


  const [stockValues, setStockValues] = useState({});





  useEffect(() => {

    loadProducts();

  }, []);





  async function loadProducts() {

    try {

      setLoading(true);


      const data = await getProducts();



      const formattedProducts =
        data.map((product) => ({

          ...product,


          galleryImageUrls:

            product.product_images
              ?.sort(
                (a, b) =>
                  a.sort_order -
                  b.sort_order
              )
              .map(
                (img) =>
                  img.image_url
              )

              || []


        }));



      setProducts(
        formattedProducts
      );


    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }







  async function changeStatus(product) {


    try {


      await toggleProductStatus(
        product.id,
        !product.is_active
      );



      setProducts((previous) =>

        previous.map((item) =>

          item.id === product.id

          ?

          {
            ...item,
            is_active:
              !item.is_active
          }

          :

          item

        )

      );


      toast.success(
        "Status updated"
      );


    } catch(error) {


      console.error(error);


    }

  }







  async function updateStock(
    productId,
    stock
  ) {


    try {


      await updateProductStock(
        productId,
        stock
      );



      setProducts((previous) =>


        previous.map((item) =>


          item.id === productId


          ?

          {

            ...item,

            stock:
              Number(stock)

          }


          :


          item


        )


      );



      toast.success(
        "Stock updated"
      );



      setStockValues((previous)=>{


        const updated = {
          ...previous
        };


        delete updated[productId];


        return updated;


      });



    } catch(error) {


      console.error(error);


      toast.error(
        "Stock update failed"
      );


    }


  }







  async function handleStockEnter(
    event,
    product
  ) {


    if(event.key === "Enter") {


      const newStock =
        stockValues[product.id];



      if(newStock === undefined)
        return;



      await updateStock(
        product.id,
        newStock
      );


    }


  }







  function handleStockChange(
    productId,
    value
  ) {


    setStockValues({

      ...stockValues,

      [productId]:
        value

    });


  }
    async function handleDelete(product) {


    const confirmed =
      window.confirm(
        `Delete "${product.name}"?`
      );


    if(!confirmed)
      return;



    try {


      await deleteProduct(product);



      setProducts((previous) =>

        previous.filter(

          (item)=>
            item.id !== product.id

        )

      );



      toast.success(
        "Product deleted"
      );



    } catch(error) {


      console.error(error);


      toast.error(
        error.message
      );


    }


  }







  function openEdit(product) {


    setSelectedProduct({

      ...product,

      galleryImageUrls:

        product.galleryImageUrls || []

    });



    setEditMode(true);


    setShowModal(true);


  }







  const categories = [

    "Rings",

    "Necklaces",

    "Earrings",

    "Bracelets",

    "Chains",

    "Bangles"

  ];







  const filteredProducts =

    products.filter((product)=>{


      const matchesSearch =

        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );



      const matchesCategory =

        categoryFilter === "all"

        ||

        product.category_label === categoryFilter;



      return (

        matchesSearch &&

        matchesCategory

      );


    });







  if(loading) {


    return (

      <h2>

        Loading products...

      </h2>

    );


  }







  return (

    <div className="products-page">



      <div className="products-header">


        <div>

          <h2>
            Products
          </h2>


          <p>

            {filteredProducts.length}
            {" "}
            products found

          </p>


        </div>





        <button

          className="add-product-btn"

          onClick={()=>{


            setEditMode(false);


            setSelectedProduct(null);


            setShowModal(true);


          }}

        >

          + Add Product

        </button>





        <AddProductModal

          open={showModal}


          onClose={()=>{


            setShowModal(false);


            setEditMode(false);


            setSelectedProduct(null);


          }}


          onProductAdded={loadProducts}


          editMode={editMode}


          selectedProduct={selectedProduct}


        />


      </div>









      <div className="product-filters">


        <input

          type="text"

          placeholder="Search products..."

          value={searchTerm}


          onChange={(e)=>

            setSearchTerm(
              e.target.value
            )

          }

        />




        <select


          value={categoryFilter}


          onChange={(e)=>

            setCategoryFilter(
              e.target.value
            )

          }


        >


          <option value="all">

            All Categories

          </option>



          {

            categories.map(

              (category)=>(


                <option

                  key={category}

                  value={category}

                >

                  {category}

                </option>


              )

            )

          }


        </select>


      </div>









      <div className="products-table-wrapper">


        <table className="products-table">


          <thead>


            <tr>


              <th>
                Image
              </th>


              <th>
                Name
              </th>


              <th>
                Category
              </th>


              <th>
                Price
              </th>


              <th>
                Stock
              </th>


              <th>
                Status
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


            {


              filteredProducts.map(

                (product)=>(


                  <tr key={product.id}>


                    <td>


                      <img

                        src={product.image_url}

                        alt={product.name}

                        className="product-thumb"

                      />


                    </td>



                    <td>

                      {product.name}

                    </td>



                    <td>

                      {product.category_label}

                    </td>



                    <td>

                      ₹{product.price}

                    </td>



                    <td>


                      <input


                        className="stock-input"


                        type="number"


                        value={

                          stockValues[product.id]

                          ??

                          product.stock

                        }


                        onChange={(e)=>

                          handleStockChange(

                            product.id,

                            e.target.value

                          )

                        }


                        onKeyDown={(e)=>

                          handleStockEnter(

                            e,

                            product

                          )

                        }


                      />


                    </td>




                    <td>


                      <label className="switch">


                        <input

                          type="checkbox"

                          checked={product.is_active}


                          onChange={()=>


                            changeStatus(product)


                          }


                        />


                        <span className="slider"></span>


                      </label>


                    </td>





                    <td>


                      <button

                        className="table-btn edit-btn"


                        onClick={()=>


                          openEdit(product)


                        }

                      >

                        Edit

                      </button>





                      <button

                        className="table-btn delete-btn"


                        onClick={()=>


                          handleDelete(product)


                        }


                      >

                        Delete

                      </button>


                    </td>



                  </tr>


                )


              )


            }


          </tbody>


        </table>


      </div>


    </div>

  );


}





export default Products;