from app.models import db, Product, environment, SCHEMA


def seed_products():
    product1 = Product(
        owner_id=1,
        name='Slap On Bracelet',
        description='You slap it on your wrist and boom you have a not so fashionable bracelet',
        price=201.00,
    )

    product2 = Product(
        owner_id=2,
        name='Bluetooth Earbuds',
        description='Why would you want wires holding you back when you can just not have them',
        price=799.00
    )

    product3 = Product(
        owner_id=3,
        name='Fancy Watch Thing',
        description='It is a watch that will make you look like you make more money than you do',
        price=1799.00
    )
    product4 = Product(
        owner_id=4,
        name='Hold Your Cords Thing',
        description='Never worry about your friends taking your cords anymore',
        price=79.99
    )
    product5 = Product(
        owner_id=5,
        name='A Touch Screen....',
        description='It looks like you can put this in your car?... I dont know buy it and figure it out',
        price=2000.00
    )
    product6 = Product(
        owner_id=6,
        name='A Fancy Device Holder',
        description='It looks absurdly unnecessary, That is why you are going to buy it anyway',
        price=1699.00
    )
    product7 = Product(
        owner_id=7,
        name='Hyper Leg Warmers',
        description='They are so thin they probably will not actually warm your legs... But they look cool!',
        price=89.00
    )
    product8 = Product(
        owner_id=1,
        name='More Earbuds',
        description='These are some more bluetooth earbuds but look at the case they come in! Definitely worth more money!',
        price=999.00
    )
    product9 = Product(
        owner_id=2,
        name='Bluetooth Speaker',
        description='Everything on here might as well be bluetooth, everyone loves that stuff!',
        price=699.00
    )
    product10 = Product(
        owner_id=3,
        name='Bluetooth Knife Sharpener',
        description='This knife sharpener is legit bluetooth! Trust me bro.',
        price=1300.00
    )
    product11 = Product(
        owner_id=4,
        name='Adjustable Magnet',
        description='It looks like a selfie stick, but like, with a magnet on it?',
        price=99.99
    )
    product13 = Product(
        owner_id=7,
        name='Hat and Neck Warmer',
        description='You get both of these bad boys for a fairly reasonable price (reasonable compared to everything here). Stay warm out there party people',
        price=359.00
    )
    product12 = Product(
        owner_id=5,
        name='Stretchy Shoe Cover',
        description='Say goodbye to those nasty disposable shoe covers. There is nothing better than reusing something you stepped in!',
        price=279.00
    )
    product14 = Product(
        owner_id=7,
        name='Night Vision Glasses',
        description='These are apparently night vision glasses. Yeah I dont really believe it either, but the picture says they are.',
        price=779.00
    )
    product15 = Product(
        owner_id=1,
        name='Some Kinda Bracelet',
        description='This is not as cool as the slap on bracelets trust me, but if you want it there is a handy add to cart button on the right',
        price=899.00
    )
    product16 = Product(
        owner_id=2,
        name='A Tablet for Drawing',
        description='Instead of wasting a ton of paper and walls just get your kids to play with this and they wont get bored of it an hour. Trust me bro',
        price=2799.00
    )
    product17 = Product(
        owner_id=3,
        name='4 In 1 Charger',
        description='Charges 4 devices... At the same time! Crazy right? And its totally wireless (except when it needs charged).',
        price=479.00
    )
    product18 = Product(
        owner_id=4,
        name='Bluetooth Knife',
        description='Do not take the picture seriously, you will not be getting one for free. Anyway this baby is totally wireless and can connect to anyone or anything!',
        price=9.99
    )
    product19 = Product(
        owner_id=5,
        name='MP3 Player',
        description='Looks like it has that set of earbuds that hurt your ears after about 10 minutes. If you but this I know that pain',
        price=8621.00
    )
    product20 = Product(
        owner_id=6,
        name='Kylo Rens Charger',
        description='This is definitely a charging cord that someone will "borrow" and never give back. It almost reminds me of Kylo Rens lightsaber.',
        price=789.00
    )
    product21 = Product(
        owner_id=6,
        name='Its A Tape Measure',
        description='Its uh... its just a tape measure... Used to.. measure stuff..',
        price=79.49
    )
    product22 = Product(
        owner_id=1,
        name='Bluetooth Insole',
        description='These insoles will take your feet far in life. If your feet get sore like mine do, these new magic insoles will use bluetooth technology to track how much you walk, send it to your phone and tell you to stop walking',
        price=5600.00
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.add(product21)
    db.session.add(product22)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
