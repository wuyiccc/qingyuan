# 基于nginx:1.20镜像
FROM node:18.19.1
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 8080
CMD ["npm", "run", "dev"]
