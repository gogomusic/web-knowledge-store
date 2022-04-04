## 插件
###  obsidian-admonition
[obsidian-admonition](https://github.com/valentine195/obsidian-admonition)
**警告块**
支持以下类型,使用时需要加 `ad-` 前缀

| 类型     | 别名                   |
| -------- |:---------------------- |
| abstract | 摘要                   |
| info     | 信息， 待办事项        |
| tip      | 提示，重要             |
| success  | 成功，检查，完成       |
| question | 问题， 帮助， 常见问题 |
| warning  | 警告，谨慎，注意       |
| failure  | 失败、失败、缺失       |
| danger   | 危险，错误             |
| bug      | 错误                   |
| example  | 示例                   |
| quote    | 引用                   |

**选项**
以下参数必需位于块的顶部，可以按照任意顺序
```
title:                  # 警告块的标题,可留空
collapse:               # open/close 默认展开/默认折叠 留空将不会显示折叠图标
icon:                   # 覆盖图标
color:                  # 覆盖颜色，需要是RGB三元组。例如：255,255,255
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla.
```

**示例**

`````ad-tip
title: 提示
collapse: open

Hello!

````ad-note
title: This admonition is nested.
This is a nested admonition!

```ad-warning
title: This admonition is closed.
collapse: close
1
```

````

This is in the original admonition.
`````

### Checklist
 [Checklist](https://link.zhihu.com/?target=https%3A//github.com/delashum/obsidian-checklist-plugin)

在todo标签下面，使用多选框，就可以在右侧菜单中显示待办事项

```
#todo
- [x] 1
```

