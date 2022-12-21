from app.models import db, Product, environment, SCHEMA


def seed_products():
    product1 = Product(
        owner_id=1,
        name='Slap On Bracelet',
        description='You slap it on your wrist and boom you have a not so fashionable bracelet',
        price=201.79
    )

    product2 = Product(
        owner_id=2,
        name='Bluetooth Earbuds',
        description='Why would you want wires holding you back when you can just not have them',
        price=799.00
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
