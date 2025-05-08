const ProductModal = require("../models/supplierProduct.model");

exports.addProducts = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    // Example: Save to DB (depends on your schema)
    const datas = {
      ...req.body,
      productimage: req.files.productimage[0].filename,
    };
    const response = await new ProductModal(datas).save();

    res.status(201).json({
      success: true,
      message: "Work added successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error in addworks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add work",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const response = await ProductModal.find().populate("supplierId");

    return res
      .status(200)
      .json({ message: "user added successfully", data: response });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in add user", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { editId, name, supplierId, category, price, unit, description } =
      req.body;

    const updateData = {
      name,
      supplierId,
      category,
      price,
      unit,
      description,
    };

    if (req.file) {
      updateData.productimage = req.file.filename;
    }
    console.log(req.files);

    console.log("hh", updateData);

    // Update the user document and return the updated document
    const response = await ProductModal.findByIdAndUpdate(editId, updateData, {
      new: true,
    });
    console.log(response);

    return res.status(200).json({
      message: "Products updated successfully",
      user: response,
    });
  } catch (error) {
    console.error("Error updating Products:", error);
    return res.status(500).json({ error: "Error updating profile" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const response = await ProductModal.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Error deleting product" });
  }
};
