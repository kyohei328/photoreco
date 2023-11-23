# FROM ruby:3.2.2
# FROM --platform=linux/arm64/v8 ruby:3.2.2
FROM --platform=linux/x86_64 ruby:3.2.2
ENV TZ Asia/Tokyo
RUN apt-get update -qq && \
  apt-get install -y apt-utils \
  build-essential \
  libpq-dev \
  nodejs \
  default-mysql-client \
  libimage-exiftool-perl \
  sudo
RUN mkdir /app
WORKDIR /app
# ADD Gemfile /app/Gemfile
# ADD Gemfile.lock /app/Gemfile.lock
COPY Gemfile /app/
COPY Gemfile.lock /app/
# RUN bundle install -j4
RUN bundle install
ADD . /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["unicorn", "-p", "3000", "-c", "/app/config/unicorn.rb", "-E", "production"]
