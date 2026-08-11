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

## IP 防御拉黑

服务器内置恶意 IP 自动防御机制，会实时检测扫描器和机器人，命中规则后自动拉黑（后续请求直接返回 `403 Forbidden`），黑名单持久化在服务器的 `/root/blacklist.json`，重启不丢失。

### 自动检测规则

| 规则 | 检测内容 | 命中动作 |
|------|---------|---------|
| 恶意 User-Agent | `zgrab`、`nmap`、`masscan`、`nikto`、`l9explore`、`python-requests`、`curl/`、`censys`、`shodan`、空 UA 等 | 立即拉黑 |
| 敏感路径扫描 | `/.env`、`/.git/`、`/.aws/`、`/wp-admin`、`/phpmyadmin`、`/actuator/`、`/graphql`、`/admin`、`/login`、`*.php` 等 | 立即拉黑 |
| 请求频率超限 | 同一 IP 60 秒内请求超过 20 次 | 立即拉黑 |
| 扫描行为 | 同一 IP 60 秒内访问超过 10 个不同路径 | 立即拉黑 |

> 本站为简历站点，不存在上述后台/敏感路径，凡访问这些路径的均为扫描器。

### 查看当前黑名单

部署上线后，在浏览器中访问：

```
http://www.tianminglei.xin/api/blacklist
```

返回数据格式：

```json
{
  "blacklist": [
    {
      "ip": "45.148.10.125",
      "reason": "敏感路径扫描: /.git/HEAD",
      "time": "2026-08-11T04:59:34.226Z"
    }
  ],
  "total": 1
}
```

### 手动管理黑名单（需鉴权）

写操作需要服务器配置 `ADMIN_TOKEN` 环境变量，并通过 `token` 参数鉴权：

```bash
# 手动拉黑 IP
curl -X POST "http://www.tianminglei.xin/api/blacklist?action=add&ip=1.2.3.4&reason=手动拉黑&token=YOUR_TOKEN"

# 解除拉黑
curl -X POST "http://www.tianminglei.xin/api/blacklist?action=remove&ip=1.2.3.4&token=YOUR_TOKEN"

# 清空黑名单（慎用）
curl -X POST "http://www.tianminglei.xin/api/blacklist?action=clear&token=YOUR_TOKEN"
```

### 环境变量配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `TRUST_PROXY` | 是否信任反向代理的 `X-Forwarded-For`（Nginx 场景设为 `1`） | 不信任 |
| `ADMIN_TOKEN` | 黑名单管理接口的鉴权 token，不设置则只允许自动拉黑，不允许手动操作 | 空 |
| `WHITELIST_IPS` | 永久白名单 IP，逗号分隔，永不被拉黑 | `127.0.0.1,::1` |

在 ECS 上启动服务时建议：

```bash
TRUST_PROXY=1 ADMIN_TOKEN=your-secret-token node scripts/serve.mjs
```
