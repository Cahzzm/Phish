from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    product_owner = db.relationship("User", back_populates="user_products")
    cart_item = db.relationship("CartItem", back_populates="product", cascade="all, delete")
    product_images = db.relationship("ProductImage", back_populates="image_product", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "productOwner": self.product_owner.to_dict(),
            "productImages": {image.to_dict()["id"]: image.to_dict() for image in self.product_images},
        }


class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    url = db.Column(db.String(1500))

    image_product = db.relationship("Product", back_populates="product_images")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.product_id,
            "url": self.url
        }
