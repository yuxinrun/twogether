# TWOGETHER · 夫妻关系与婚姻成长知识平台

一个专业、温暖、科学的夫妻关系与婚姻成长知识平台。理解彼此，学会沟通，共同成长。

> Love is a practice, not just a feeling. 爱不仅是一种感受，也是一种持续的行动。

## 技术栈

- Next.js 14（App Router）
- React 18 + TypeScript
- Tailwind CSS
- Lucide React（图标）
- Apache ECharts（数据可视化）
- 结构化 Markdown/数据内容系统（TS 数据层）
- LocalStorage 本地数据存储（收藏、最近浏览、工具数据）

## 本地运行

```bash
npm install
npm run dev      # 开发服务器 http://localhost:3000
npm run build    # 静态导出到 ./out（默认不含子路径前缀）
npm run tsc      # 类型检查
```

> 说明：本项目使用 `output: 'export'`，构建产物为静态文件（`./out`）。
> 本地预览生产产物可用静态服务器，例如 `npx serve out`（默认在根路径）。
> `GITHUB_PAGES=true npm run build` 才会加上 `/twogether` 子路径前缀，用于 GitHub Pages。

## 目录结构

```
app/                  页面与路由（App Router）
  page.tsx            首页（独立 Hero 设计）
  marriage|communication|conflict|intimacy|trust|family|money|crisis|psychology|growth/
  books/ books/[slug]/ 书籍资源库与详情
  resources/          专业网站与机构资源
  articles/ articles/[slug]/ 文章中心与详情
  tools/              夫妻实操工具箱（8 个互动工具）
  quotes/             关系金句
  about|methodology|safety/ 关于 / 内容原则 / 关系安全
components/           UI 组件、布局、插画、图表、卡片
lib/                  类型、工具函数、数据层（articles/books/resources/quotes）
  data/articles/      文章数据（按栏目分批，共 50 篇）
```

## 主要功能

- **首页**：独立 Hero 设计 + 原创 SVG 插画，含今日关系思考、能力卡片、工具箱、精选书籍与资源、最新文章。
- **10 个一级栏目**：认识婚姻、沟通、冲突、亲密、信任、家庭、金钱、危机、心理学、成长。
- **50 篇原创深度文章**：每篇含问题背景、心理学解释、常见错误、具体步骤、对话示例、练习与注意事项。
- **书籍资源库**：20+ 本国内外经典，含核验标记与正版购买链接，不提供盗版。
- **专业资源库**：区分学术机构/协会/公共服务/公益组织/商业平台，链接经核验，含地区标签。
- **8 个互动工具**（均本地保存、私密不上传）：沟通练习器、争吵复盘、关系温度计（ECharts 雷达图）、对话卡、共同目标、家务分配（ECharts 柱状图）、每周回顾、关系修复计划。
- **关系金句**：35 句原创金句，支持分类、随机、收藏。
- **搜索 / 筛选 / 收藏**：全站搜索（文章/书籍/资源/金句），多维度筛选，本地收藏与最近浏览。
- **关系安全页**：按地区整理的求助资源与暴力/控制识别信号，明确的免责声明。

## 内容伦理与安全

- 以可信研究、专业协会与公共机构资料为依据，区分研究结论、专业观点与编辑建议。
- 不虚构研究数据与专家观点，不为伴侣贴诊断标签，不制造性别对立。
- 不要求受害者单方面承担修复责任；涉及暴力/胁迫时优先提示安全计划与专业支持。
- 自测与工具均注明「非诊断、不替代专业评估」。

## 说明

- 书籍/资源的出版信息与网址尽量核验；标注「待核验」的请以官方为准。

## 部署（GitHub Pages）

本站采用 Next.js 静态导出（`output: 'export'`），可一键部署到 GitHub Pages。

- 工作流：`.github/workflows/deploy.yml`。push 到 `main` 分支（或手动触发）即自动构建并发布。
- 构建时设置环境变量 `GITHUB_PAGES=true`，使 `basePath` / `assetPrefix` 指向仓库子路径 `/twogether`。
- `public/.nojekyll` 会在导出时复制到 `out/`，避免 GitHub Pages 的 Jekyll 忽略 `_next` 目录。
- 部署前需在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
- 站点地址：`https://yuxinrun.github.io/twogether/`。

本地预览静态产物：

```bash
npm run build        # 默认输出到 ./out（含 /twogether 子路径前缀）
# 如需在本地按子路径预览，可设置 GITHUB_PAGES=true 后再 build

