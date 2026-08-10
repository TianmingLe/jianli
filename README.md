# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  extends: [
    // other configs...
    // Enable lint rules for React
    reactX.configs['recommended-typescript'],
    // Enable lint rules for React DOM
    reactDom.configs.recommended,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
# 测试自动部署

## 访问日志功能

网站服务器（`scripts/serve.mjs`）内置了访问日志功能，会自动记录每个访客的 IP、访问时间、访问路径和浏览器信息。

### 查看访问记录

部署上线后，在浏览器中访问以下地址即可查看访问记录（JSON 格式）：

```
http://www.tianminglei.xin/api/visitors
```

### 返回数据说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `visitors` | 数组 | 最近 100 条访问记录，按时间倒序排列（最新的在前） |
| `total` | 数字 | 历史总访问次数（合并当前日志和轮转旧日志） |
| `uniqueIPs` | 数字 | 独立访客 IP 数量 |

每条访问记录包含以下字段：

| 字段 | 说明 | 示例 |
|------|------|------|
| `ip` | 访客 IP 地址 | `123.45.67.89` |
| `time` | 访问时间（ISO 8601 格式） | `2026-08-10T12:00:00.000Z` |
| `path` | 访问的页面路径 | `/` 或 `/projects` |
| `ua` | User-Agent（浏览器/设备信息） | `Mozilla/5.0 ...` |

### 日志存储机制

- 日志文件存储在服务器的 `/root/access.log`（部署目录之外，部署时不会被清空）
- 采用 JSON Lines 格式，每行一条记录
- 文件超过 5MB 时自动轮转，旧日志重命名为 `access.log.old`
- 仅记录页面访问（路由和 HTML），不记录 `.js`/`.css`/图片等静态资源请求

### 反向代理配置（可选）

如果服务器前面使用了 Nginx 等反向代理，需设置环境变量以获取访客真实 IP：

```bash
TRUST_PROXY=1 node scripts/serve.mjs
```

若未设置 `TRUST_PROXY`，服务器默认使用 TCP 连接的远端地址作为访客 IP，不受 `X-Forwarded-For` 头影响，防止伪造。
