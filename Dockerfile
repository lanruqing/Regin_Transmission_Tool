# 使用官方的 Node.js 镜像作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 暴露应用运行的端口
EXPOSE 3333

# 定义启动命令
CMD ["npm", "start"]