export function toProductResponse(product) {

    if (!product) {
        return null;
    }

    return {

        id: product._id,

        sku: product.sku,

        barcode: product.barcode,

        name: product.name,

        slug: product.slug,

        description: product.description,

        category: product.category,

        warehouse: product.warehouse,

        supplier: product.supplier,

        brand: product.brand,

        unit: product.unit,

        purchasePrice: product.purchasePrice,

        sellingPrice: product.sellingPrice,

        gst: product.gst,

        currentStock: product.currentStock,

        minimumStock: product.minimumStock,

        maximumStock: product.maximumStock,

        images: product.images,

        isActive: product.isActive,

        createdAt: product.createdAt,

        updatedAt: product.updatedAt

    };

}
