from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange, URL


class ProductForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(message="Please provide a name between 3 - 25 characters"),
            Length(min=3, max=25, message="Please provide a name between 3 - 25 characters"),
        ],
    )
    description = StringField(
        "Description",
        validators=[
            DataRequired(message="Please Provide a description from 10 - 200 characters"),
            Length(
                min=10,
                max=200,
                message="Please Provide a description from 10 - 200 characters",
            ),
        ],
    )
    price = IntegerField("Price", validators=[DataRequired(), NumberRange(min=1, max=9999, message='Please keep the price between 1 - 9999')])
    preview_img_url = StringField(
        "Preview Image URL",
        validators=[
            DataRequired(),
            Length(
                min=0,
                max=2000,
                message="The image URL must be less than 2000 characters.",
            ),
            URL(message="Please enter a valid URL for your image."),
        ],
    )
    submit = SubmitField("Submit")


class ProductUpdateForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(message='Please provide a name between 3 - 25 characters'),
            Length(min=3, max=25, message="Please provide a name between 3 - 25 characters"),
        ],
    )
    description = StringField(
        "Description",
        validators=[
            DataRequired("Please Provide a description from 10 - 200 characters"),
            Length(
                min=10,
                max=200,
                message="Please Provide a description from 10 - 200 characters",
            ),
        ],
    )
    price = IntegerField("Price", validators=[DataRequired(message='Please keep the price between 1 - 9999'), NumberRange(min=1, max=9999, message='Please keep the price between 1 - 9999')])
    submit = SubmitField("Submit")
