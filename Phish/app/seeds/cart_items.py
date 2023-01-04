from app.models import db, environment, SCHEMA, CartItem


all_cart_items = [
    {"id": 1, "cart_id": 1, "product_id": 1, "quantity": 1},
    {"id": 2, "cart_id": 1, "product_id": 2, "quantity": 2},
]


def seed_cart_items():
    cart_items = [
        CartItem(
            cart_id=item["cart_id"],
            product_id=item["product_id"],
            quantity=item["quantity"]
        )
        for item in all_cart_items
    ]

    [db.session.add(item) for item in cart_items]

    db.session.commit()


def undo_cart_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM cart_items")

        db.session.commit()
