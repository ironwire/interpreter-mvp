# 口译助手 MVP

交替传译辅助工具，基于 Web Speech API + Claude API。

## 项目结构

```
interpreter-mvp/
├── public/
│   └── index.html      # 前端页面
├── api/
│   └── translate.js    # Vercel serverless 函数（代理 Anthropic API）
├── vercel.json         # Vercel 部署配置
└── package.json
```

## 部署步骤

### 1. 上传到 GitHub

在 GitHub 新建一个仓库（Private 即可），然后：

```bash
cd interpreter-mvp
git init
git add .
git commit -m "init"
git remote add origin https://github.com/你的用户名/interpreter-mvp.git
git push -u origin main
```

### 2. 连接 Vercel

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点击 **Add New → Project**
3. 选择刚才的 GitHub 仓库，点击 **Import**
4. 部署设置保持默认，直接点 **Deploy**

### 3. 添加 API Key 环境变量

部署完成后：

1. 进入项目 → **Settings → Environment Variables**
2. 添加一条：
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: 你的 API Key（从 [console.anthropic.com](https://console.anthropic.com) 获取）
3. 点击 **Save**
4. 回到 **Deployments**，点击最新部署右侧的 **⋯ → Redeploy**

### 4. 使用

用 Chrome 打开 Vercel 给你的域名（如 `interpreter-mvp.vercel.app`），允许麦克风，即可使用。

## 注意事项

- 仅支持 Chrome（Web Speech API 限制）
- 需要网络连接（ASR 和翻译均需联网）
- API Key 只存在 Vercel 服务端环境变量中，不会暴露给前端
