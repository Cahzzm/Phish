from app.models import db, Cart, environment, SCHEMA


def seed_carts():
    cart1 = Cart(
        user_id=1,
        product_id=1,
        quantity=1,
        total=201.79
    )

    db.session.add(cart1)
    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
