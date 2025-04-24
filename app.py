from flask import Flask, render_template, request, jsonify
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'yaggu'  # Replace with a secure key
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'yagnesh4dspy@gmail.com'
app.config['MAIL_PASSWORD'] = 'btao asac jqaa jjls'  # Replace with Gmail app password
app.config['MAIL_DEFAULT_SENDER'] = 'yagnesh4dspy@gmail.com'

mail = Mail(app)
CORS(app)

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    message = TextAreaField('Message', validators=[DataRequired()])
    submit = SubmitField('Send Message')

@app.route('/')
def index():
    form = ContactForm()
    return render_template('index.html', form=form)

@app.route('/contact', methods=['POST'])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        message = form.message.data
        msg = Message(
            subject=f'Portfolio Contact from {name}',
            recipients=['yagnesh4dspy@gmail.com'],
            body=f'Name: {name}\nEmail: {email}\nMessage: {message}'
        )
        try:
            mail.send(msg)
            return jsonify({'message': 'Message sent successfully!'}), 200
        except Exception as e:
            print(f"Mail error: {str(e)}")  # Debug log
            return jsonify({'error': f'Failed to send message: {str(e)}'}), 500
    else:
        errors = form.errors
        print(f"Form validation errors: {errors}")  # Debug log
        return jsonify({'error': 'Invalid form data', 'details': errors}), 400

if __name__ == '__main__':
    app.run(debug=True)