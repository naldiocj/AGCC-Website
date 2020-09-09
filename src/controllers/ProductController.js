const Product = require("../models/Product");
const Brand = require("../models/Brand");

module.exports = {
  async product(request, response) {
    try {
      const products = await Product.find().lean().populate("brand", "name");
      return response.render("admin/product", {
        layout: "admin",
        products,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async productNew(request, response) {
    try {
      const brands = await Brand.find().lean();

      const { id } = request.params;
      if (id) {
        const data = await Product.findById(id)
          .lean()
          .populate("brand", "_id name");
        return response.render("admin/product/edit", {
          layout: "admin",
          data,
          brands,
          user: request.user,
          count: request.count,
        });
      }
      return response.render("admin/product/new", {
        layout: "admin",
        brands,
        user: request.user,
        count: request.count,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async productSave(request, response) {
    try {
      const { name, price, brand } = request.body;
      if (!name || !price || !brand) {
        request.flash("error_msg", "Preencha todos os campos");
        return response.redirect("/admin/product/new");
      }
      if (!request.file) {
        request.flash("error_msg", "Seleciona uma imagem");
        return response.redirect("/admin/product/new");
      }
      const { filename: photo } = request.file;
      const product = new Product({
        name,
        price,
        photo,
        brand,
      });
      await Product.create(product, async (err, product) => {
        if (err) new Error(err);
        // console.log(product);
        await Brand.findOne({ _id: brand }, (err, brand) => {
          if (err) new Error(err);
          // console.log(brand);
          brand.products.push(product._id);
          brand.save();
        });
      });
      request.flash("success_msg", "Salvo");
      return response.redirect("/admin/product");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },

  async productUpdateAndRemove(request, response) {
    try {
      const pagaName = request.route.path;
      const { id } = request.params;
      const { name, price, brand } = request.body;
      let data = { name, price, brand };
      if (!id) return request.status(400).send("Id Inválido");
      switch (pagaName) {
        case "/product/:id/remove":
          await Product.findByIdAndDelete(id);
          request.flash("success_msg", "Removido");
          return response.redirect("/admin/product");
        case "/product/:id/update":
          if (request.file) {
            const { filename: photo } = request.file;
            data = {
              name,
              price,
              brand,
              photo,
            };
          }
          await Product.findOneAndUpdate(
            {
              _id: id,
            },
            data,
            { new: true, runValidators: true }
          ).exec();
          request.flash("success_msg", "Atualizado");
          return response.redirect("/admin/product");
      }

      response.send();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};
