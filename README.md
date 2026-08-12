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

## 访问防御 / IP 拉黑

服务器内置三层防御机制，自动识别并拉黑恶意扫描器和机器人 IP，黑名单持久化在 `/root/blocklist.txt`，跨重启保留。

### 防御策略

| 层级 | 规则 | 触发后行为 |
|------|------|------------|
| 静态黑名单 | 命中 `blocklist.txt` 中的 IP | 直接 403 |
| 扫描器检测 | User-Agent 含 `zgrab`/`nmap`/`shodan`/`masscan`/`nikto` 等，或访问 `/.git`、`/.env`、`/admin`、`/wp-admin`、`/sdk`、`/+CSCOE+` 等敏感路径 | 自动拉黑该 IP 并 403 |
| 速率限制 | 单 IP 1 分钟内请求超过 120 次 | 自动拉黑该 IP 并 403 |

> 正常搜索引擎爬虫（Googlebot、bingbot）不会被拉黑。普通浏览（含页面加载的静态资源）远低于速率限制阈值，不受影响。

### 查看当前黑名单

```
http://www.tianminglei.xin/api/blocked
```

返回 JSON：`{ "blocked": ["ip1","ip2",...], "count": N }`（只读，无需令牌）。

### 管理 IP（拉黑 / 解封）

需先在服务器环境变量中设置 `BLOCK_TOKEN`（建议在 systemd 服务文件中配置，修改后 `systemctl daemon-reload && systemctl restart jianli-web`）：

```bash
# 拉黑指定 IP
curl "http://www.tianminglei.xin/api/block?token=你的令牌&ip=1.2.3.4"

# 解封指定 IP
curl "http://www.tianminglei.xin/api/unblock?token=你的令牌&ip=1.2.3.4"
```

未设置 `BLOCK_TOKEN` 时，`/api/block`、`/api/unblock` 返回 404（仅允许读取黑名单）。

### 手动编辑黑名单文件

也可直接在服务器上编辑 `/root/blocklist.txt`（每行一个 IP），服务器每 60 秒自动重载，无需重启。若误封了自己的 IP，用此方式恢复最快捷。

### 初始种子

服务首次启动且 `blocklist.txt` 不存在时，会自动写入已识别的恶意扫描 IP 作为种子（zgrab、Shodan、Nmap、GenomeCrawlerd 等）。之后文件由运行时动态维护，部署不会清空。
