import axios from "axios";

export async function getCategory(categoryId) {
  const dataProduct = await axios.get(
    `https://assign-api.piton.com.tr/api/rest/products/${categoryId}`
  );
  return dataProduct.data.product;
}

export async function getImage(product) {
  try {
    const data = await fetch(
      "https://assign-api.piton.com.tr/api/rest/cover_image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: product.cover }),
      }
    );
    const imageData = await data.json();
    return imageData.action_product_image.url;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(categoryId, productId) {
  const dataProduct = await axios.get(
    `https://assign-api.piton.com.tr/api/rest/products/${categoryId}`
  );
  const product = dataProduct.data.product.find(p => p.id === productId);
  return product;
}
