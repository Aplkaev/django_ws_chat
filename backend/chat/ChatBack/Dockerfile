#FROM python:3.8
#ENV PYTHONUNBUFFERED 1
#RUN mkdir /web_django
#WORKDIR /web_django
#COPY req.txt /web_django/
#RUN pip install --upgrade pip && pip install -r req.txt
#ADD . /web_django/


FROM python:3.8.6-buster
RUN apt update
RUN apt-get install cron -y
RUN alias py=python

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY . .
COPY ./req.txt /usr/src/app

RUN pip install -r req.txt

# django-crontab logfile
RUN mkdir /cron
RUN touch /cron/django_cron.log

EXPOSE 8000

CMD service cron start && python manage.py runserver 0.0.0.0:8000

CMD python3 manage.py crontab add