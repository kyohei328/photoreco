FROM ruby:3.2.2
RUN apt-get update -qq && \
  apt-get install -y apt-utils \
  build-essential \
  libpq-dev \
  nodejs \
  default-mysql-client \
  libimage-exiftool-perl
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
# RUN bundle install -j4
RUN bundle install
ADD . /app

EXPOSE 3000