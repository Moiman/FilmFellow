FROM python:3.9

COPY . /recommender

WORKDIR /recommender

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--timeout", "120", "get_recommendations:recommender"]
