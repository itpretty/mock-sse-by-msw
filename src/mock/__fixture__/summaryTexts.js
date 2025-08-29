export const summaryTexts = {
    'Builtin Styles': `# AI 模型概述

现代 AI 模型彻底改变了我们与技术交互的方式。从**语言模型**到_计算机视觉_，这些系统展示了非凡的能力。

## 主要特性

### 优势
- 自然语言理解
- 多模态处理
- 实时推理

### 需求
1. GPU 加速
2. 模型权重
3. API 访问

## 架构

![Model Architecture](https://placehold.co/600x400)

## 见解

> “全人工智能的发展可能意味着人类的终结。” —— 史蒂芬·霍金

了解更多关于 [AI 安全](https://example.com) 和 \`transformer\` 架构的信息。
`,

    'GitHub Markdown': `# GitHub 风格 Markdown 功能

GFM 在标准 Markdown 的基础上扩展了强大的功能。这里是一个全面的演示：

## 表格

| 功能 | 标准 MD | GFM |
|---------|------------|-----|
| 表格 | ❌ | ✅ |
| 任务列表 | ❌ | ✅ |
| 删除线 | ❌ | ✅ |

## 任务列表

- [x] 实现身份验证
- [x] 添加数据库模型
- [ ] 编写单元测试
- [ ] 部署到生产环境

## 删除线

~~旧的方法~~ → 使用 AI 模型的新方法
`,

    'Code Blocks': `
\`\`\`tsx
import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    type="button"
    className="button"
    onClick={onClick}
    aria-label={label}
  >
    {label}
  </button>
);
\`\`\`
`,
    'Mathematics': `## 内联数学

二次方程公式是 $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$，用于求解 $$ax^2 + bx + c = 0$$。

欧拉恒等式：$$e^{i\\pi} + 1 = 0$$ 结合了五个基本数学常数。

## 块级数学

正态分布概率密度函数：

$$
f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}
$$

## 求和和积分

前 $$n$$ 个自然数的和：$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

分部积分：$$\\int u \\, dv = uv - \\int v \\, du$$
`,
 'Unclosed Markdown': `# 这是未闭合的 Markdown 标签的展示

**这是一段非常长的粗体文本，不断地继续，没有明确的结尾，这样你就可以看到未终止的粗体块是如何被渲染器处理的，特别是当文本换行并且跨越多行继续时，甚至更进一步扩展以真正测试解析器的极限**

*这里是一个同样长的斜体句子，不断地延伸，从不真正达到结论，这样你可以观察在流式 Markdown 环境中未终止的斜体块的行为，特别是当内容冗长并且为了演示目的跨越多行时*

\`这是一个长的内联代码块，应该是未终止的，并且继续了相当长的时间，包括一些类似代码的内容，比如 const foo = "bar"; 等，看看当代码块没有正确关闭时解析器如何处理\`

[这是一个非常长的链接文本，未终止，不断地继续，显示未终止链接在预览中是如何渲染的，特别是当链接文本冗长而 URL 缺失或不完整时](https://www.google.com)
`, 
'Mermaid Diagram': `Interactive diagram rendering with manual control. Click the copy icon next to any Mermaid diagram to copy the code to your clipboard.

## Simple Flowchart

\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Success]
    B -->|No| D[Try Again]
    D --> B
    C --> E[End]
\`\`\`

## Process Flow

\`\`\`mermaid
flowchart LR
    A[User Input] --> B[Validate]
    B --> C{Valid?}
    C -->|Yes| D[Process]
    C -->|No| E[Show Error]
    D --> F[Save Result]
    E --> A
    F --> G[Complete]
\`\`\`

## API Sequence

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant S as Server
    
    U->>A: Click render
    A->>S: API Request
    S-->>A: Response
    A-->>U: Show diagram
\`\`\``
  };