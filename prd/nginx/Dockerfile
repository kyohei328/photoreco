# FROM nginx:1.21.3
FROM --platform=linux/x86_64 nginx:1.21.3
RUN apt-get update && \
  apt-get install -y apt-utils \
  locales && \
  echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
ADD ./prd/nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./prd/nginx/default.conf /etc/nginx/conf.d/default.conf