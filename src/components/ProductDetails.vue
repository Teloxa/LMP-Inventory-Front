<template>
    <div class="product-details">
      <div class="header">
        <h1>{{ product.productName }}</h1>
      </div>
      <div class="details-container">
        <div class="image-container" v-if="product.imageUrl">
          <img :src="product.imageUrl" alt="Product image" />
        </div>
        <div class="details">
          <h2>Primary Details</h2>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Buying Price:</strong> ${{ product.purchasePrice }}</p>
          <p><strong>Quantity:</strong> {{ product.quantity }}</p>
          <p><strong>Unit:</strong> {{ product.unit }}</p>
          <p><strong>Expiry Date:</strong> {{ product.expirationDate || "N/A" }}</p>
          <p><strong>Threshold:</strong> {{ product.thresholdValue }}</p>
          <p><strong>Availability:</strong> {{ translateStatus(product.availabilityStatus) }}</p>
        </div>
        <div class="supplier-details">
          <h2>Supplier Details</h2>
          <p><strong>Supplier:</strong> {{ product.supplierName || "N/A" }}</p>
          <p><strong>Contact:</strong> {{ product.supplierContact || "N/A" }}</p>
        </div>
      </div>
      <div class="actions">
        <button @click="goBack">Back</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      translateStatus(status) {
        switch (status) {
          case "In-stock":
            return "In stock";
          case "Out of stock":
            return "Out of stock";
          case "Low stock":
            return "Low stock";
          default:
            return status;
        }
      },
      goBack() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .product-details {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .header h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  .details-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 800px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .image-container img {
    max-width: 150px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .details,
  .supplier-details {
    flex: 1;
    min-width: 250px;
  }
  
  .details h2,
  .supplier-details h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #555;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 5px;
  }
  
  .details p,
  .supplier-details p {
    margin: 5px 0;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .details strong,
  .supplier-details strong {
    color: #000;
  }
  
  .actions {
    margin-top: 20px;
  }
  
  .actions button {
    background-color: #0066ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .actions button:hover {
    background-color: #0052cc;
  }
  </style>