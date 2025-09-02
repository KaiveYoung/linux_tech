// 课程数据配置
export const lessons = [
  {
    id: 1,
    title: 'Linux简介与安装',
    description: '了解Linux操作系统的基本概念、历史发展，学习如何安装Linux系统，适合大一学生入门',
    duration: '90分钟',
    difficulty: '初级',
    topics: ['Linux历史', '发行版介绍', '虚拟机安装', '系统配置', '桌面环境使用']
  },
  {
    id: 2,
    title: '命令行基础',
    description: '掌握Linux命令行界面的基本操作，学习常用命令的使用方法，为后续学习打下基础',
    duration: '90分钟',
    difficulty: '初级',
    topics: ['终端使用', '基本命令', '命令参数', '帮助系统', '实践练习']
  },
  {
    id: 3,
    title: '文件系统与目录结构',
    description: '深入了解Linux文件系统的组织结构和目录层次，理解计算机存储原理',
    duration: '90分钟',
    difficulty: '初级',
    topics: ['文件系统', '目录结构', '路径概念', '挂载点', '存储原理']
  },
  {
    id: 4,
    title: '文件操作命令',
    description: '学习文件的创建、复制、移动、删除等基本操作命令，掌握文件管理技能',
    duration: '90分钟',
    difficulty: '初级',
    topics: ['文件操作', '目录操作', '权限管理', '链接文件', '批量操作']
  },
  {
    id: 5,
    title: '文本编辑器',
    description: '掌握vi/vim和nano等文本编辑器的使用方法，为编程学习做准备',
    duration: '90分钟',
    difficulty: '初级',
    topics: ['vi/vim', 'nano', '编辑技巧', '配置文件', '编程环境']
  },
  {
    id: 6,
    title: '用户与权限管理',
    description: '学习用户账户的创建、管理和文件权限的设置，理解操作系统安全机制',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['用户管理', '组管理', '权限系统', 'sudo配置', '安全实践']
  },
  {
    id: 7,
    title: '进程管理',
    description: '了解进程的概念，学习进程的查看、控制和调度，理解操作系统进程模型',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['进程概念', '进程查看', '进程控制', '作业管理', '进程模型']
  },
  {
    id: 8,
    title: '软件包管理',
    description: '掌握不同Linux发行版的软件包管理工具，学会软件安装和环境配置',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['包管理器', '软件安装', '依赖管理', '仓库配置', '环境搭建']
  },
  {
    id: 9,
    title: '网络配置',
    description: '学习Linux网络配置和网络工具的使用，理解计算机网络基础',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['网络配置', '网络工具', '防火墙', '网络诊断', '网络协议']
  },
  {
    id: 10,
    title: 'Shell脚本编程',
    description: '掌握Shell脚本的基本语法和编程技巧，培养编程思维和自动化能力',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['脚本基础', '变量使用', '控制结构', '函数编写', '实际案例']
  },
  {
    id: 11,
    title: '系统监控与日志',
    description: '学习系统性能监控和日志文件的分析，掌握系统运维基础技能',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['系统监控', '日志分析', '性能调优', '故障排查', '运维工具']
  },
  {
    id: 12,
    title: '磁盘管理',
    description: '掌握磁盘分区、格式化、挂载等操作，理解计算机存储管理原理',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['磁盘分区', '文件系统', '挂载管理', '磁盘监控', '存储原理']
  },
  {
    id: 13,
    title: '服务管理',
    description: '学习系统服务的启动、停止、配置和管理，理解系统服务架构',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['服务概念', 'systemd', '服务配置', '开机启动', '服务架构']
  },
  {
    id: 14,
    title: '防火墙与安全',
    description: '了解Linux安全机制和防火墙配置，培养网络安全意识',
    duration: '90分钟',
    difficulty: '高级',
    topics: ['安全基础', '防火墙配置', '访问控制', '安全审计', '安全实践']
  },
  {
    id: 15,
    title: '远程连接',
    description: '学习SSH、VNC等远程连接工具的使用，掌握远程管理技能',
    duration: '90分钟',
    difficulty: '中级',
    topics: ['SSH配置', '密钥认证', 'VNC使用', '远程管理', '安全连接']
  },
  {
    id: 16,
    title: '备份与恢复',
    description: '掌握数据备份和系统恢复的方法，培养数据安全意识',
    duration: '90分钟',
    difficulty: '高级',
    topics: ['备份策略', '备份工具', '数据恢复', '灾难恢复', '备份验证']
  },
  {
    id: 17,
    title: '性能优化',
    description: '学习系统性能调优和优化技巧，理解系统性能原理',
    duration: '90分钟',
    difficulty: '高级',
    topics: ['性能分析', '系统调优', '资源优化', '监控工具', '性能测试']
  },
  {
    id: 18,
    title: '实战项目',
    description: '综合运用所学知识完成实际项目，培养综合应用能力',
    duration: '90分钟',
    difficulty: '高级',
    topics: ['项目规划', '环境搭建', '问题解决', '最佳实践', '项目总结']
  }
]

// 根据ID获取课程信息
export function getLessonById(id) {
  return lessons.find(lesson => lesson.id === parseInt(id))
}

// 获取所有课程
export function getAllLessons() {
  return lessons
}
