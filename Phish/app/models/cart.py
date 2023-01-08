from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    total = db.Column(db.Integer, nullable=False)
    # purchased = db.Column(db.Boolean, default=False)

    cart_items = db.relationship("CartItem", back_populates="item_cart", cascade='all, delete')
    cart_user = db.relationship("User", back_populates="user_cart")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total": self.total,
            # "purchased": self.purchased,
            "cartItems": {item.to_dict()["id"]: item.to_dict() for item in self.cart_items},
            "cartUser": self.cart_user.to_dict()
        }



class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    item_cart = db.relationship("Cart", back_populates="cart_items", cascade='all, delete')
    product = db.relationship("Product", back_populates="cart_item")

    def to_dict(self):
        return {
            "id": self.id,
            "cartId": self.cart_id,
            "productId": self.product_id,
            "quantity": self.quantity,
            "product": self.product.to_dict()
        }
