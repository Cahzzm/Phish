from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=100, message='Name must be between 3-100 characters.')])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=25, max=1500, message='Description must be between 25-1500 characters.')])
    price = IntegerField('Price', validators=[DataRequired(), NumberRange(min=0.01, message='You must provid a price. We are not a charity.')])
