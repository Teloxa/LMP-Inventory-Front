export function mapProductFromApi(doc) {
  const status = doc.status || "";
  let availabilityStatus = status;
  if (status.toLowerCase().includes("in-stock") || status === "In-Stock") {
    availabilityStatus = "In-stock";
  } else if (status.toLowerCase().includes("out")) {
    availabilityStatus = "Out of stock";
  } else if (status.toLowerCase().includes("low")) {
    availabilityStatus = "Low stock";
  }

  return {
    id: doc.id,
    productName: doc.name,
    category: doc.category,
    purchasePrice: doc.purchasePrice,
    quantity: doc.stock,
    unit: doc.unit,
    expirationDate: doc.expirationDate,
    saleDate: doc.dateSell,
    thresholdValue: doc.umbralValue,
    image: doc.imageProduct || null,
    imageUrl: doc.imageProduct || null,
    availabilityStatus,
    supplierName: doc.providerName,
    supplierContact: doc.contactProvider,
  };
}

export function mapProductToApi(product) {
  return {
    name: product.productName,
    category: product.category,
    purchasePrice: Number(product.purchasePrice),
    stock: Number(product.quantity),
    unit: product.unit,
    expirationDate: product.expirationDate || "",
    dateSell: product.saleDate || "",
    umbralValue: Number(product.thresholdValue),
    imageProduct: product.imagePreview || "",
  };
}

export function mapOrderFromApi(order) {
  return {
    id: order.id,
    productName: order.productName,
    category: order.category,
    orderValue: order.orderValue,
    quantity: order.stock,
    unit: order.unit,
    buyingPrice: order.purchasePrice,
    deliveryDate: order.deliveryDate,
    status: order.status,
    notify: order.notes,
  };
}

export function mapOrderToApi(form) {
  return {
    productName: form.productName,
    category: form.category,
    orderValue: Number(form.orderValue),
    stock: Number(form.quantity),
    unit: form.unit,
    purchasePrice: Number(form.buyingPrice),
    deliveryDate: form.deliveryDate,
    status: form.status || "Pending",
    notes: form.notify || false,
  };
}

export function mapSupplierFromApi(supplier) {
  return {
    id: supplier.id,
    name: supplier.name,
    product: supplier.product,
    category: supplier.category,
    phoneNumber: supplier.number,
    email: supplier.email,
    returnType: supplier.type,
  };
}

export function mapSupplierToApi(supplier) {
  return {
    name: supplier.name,
    product: supplier.product,
    category: supplier.category,
    number: supplier.phoneNumber,
    email: supplier.email,
    type: supplier.returnType,
  };
}

export function mapStoreFromApi(store) {
  return {
    id: store.id,
    name: store.name,
    phoneNumber: store.number,
    city: store.state,
    municipality: store.city,
    address: store.direction,
    manager: store.manager,
  };
}

export function mapStoreToApi(store) {
  return {
    name: store.name,
    number: store.phoneNumber,
    state: store.city,
    city: store.municipality,
    direction: store.address,
    manager: store.manager,
  };
}
