import type { FactionId, InfrastructureRegionId } from "@/core/models";

export type EventTheme =
  | "labor_struggle"
  | "compute_monopoly"
  | "data_leak"
  | "model_drift"
  | "open_source_commons";

export type EventCondition =
  | { kind: "turn_at_least"; value: number }
  | { kind: "global_stability_below"; value: number }
  | { kind: "global_model_drift_above"; value: number }
  | {
      kind: "faction_resource";
      faction: FactionId;
      resource: "compute" | "data" | "stability";
      operator: "above" | "below";
      value: number;
    }
  | {
      kind: "faction_attribute";
      faction: FactionId;
      attribute: string;
      operator: "above" | "below";
      value: number;
    }
  | {
      kind: "region_metric";
      region: InfrastructureRegionId;
      metric: "stability" | "modelDrift";
      operator: "above" | "below";
      value: number;
    };

export interface EventEffect {
  target: FactionId | "global";
  compute?: number;
  data?: number;
  stability?: number;
  modelDrift?: number;
  mythHeat?: number;
  organization?: number;
  awareness?: number;
  publicComputeRatio?: number;
  bureaucratization?: number;
}

export interface GameEventOption {
  id: string;
  text: string;
  outcome: string;
  effects: readonly EventEffect[];
}

export interface GameEvent {
  id: string;
  theme: EventTheme;
  title: string;
  description: string;
  policyText: string;
  trigger: {
    description: string;
    all: readonly EventCondition[];
  };
  options: readonly GameEventOption[];
}

export const gameEvents: readonly GameEvent[] = [
  {
    id: "annotation-city-silent-shift",
    theme: "labor_struggle",
    title: "标注城的静默班次",
    description:
      "凌晨四时，三万名标注员同时停止点击。训练管线没有报警，只把空白样本标成了低质量劳动。财团称之为数据供应故障；工人把它称为第一次让机器看见缺席。",
    policyText:
      "承认数据并非自然生成的矿藏。每一次分类、纠错与拒绝，都是活劳动进入模型的痕迹。没有劳动者的组织化 consent，数据不得转化为私人算力资本。",
    trigger: {
      description: "数据劳工联合体的数据充足，但组织度尚未完成集中。",
      all: [
        { kind: "turn_at_least", value: 2 },
        {
          kind: "faction_resource",
          faction: "labor_union",
          resource: "data",
          operator: "above",
          value: 70
        },
        {
          kind: "faction_attribute",
          faction: "labor_union",
          attribute: "organization",
          operator: "below",
          value: 70
        }
      ]
    },
    options: [
      {
        id: "recognize-data-strike",
        text: "承认数据罢工，开放集体谈判",
        outcome:
          "流水线停了下来，账本第一次把数据生产者列为人。短期产出下降，联合体的组织结构开始凝固。",
        effects: [
          { target: "labor_union", data: -8, stability: 9, organization: 12, awareness: 0.08 },
          { target: "consortium", data: -12, stability: -4 },
          { target: "global", stability: 3, modelDrift: 1 }
        ]
      },
      {
        id: "automate-the-pickets",
        text: "用合成数据越过纠察线",
        outcome:
          "屏幕恢复闪烁，但模型开始学习自己的残影。罢工被压进地下，漂移被写进每一层权重。",
        effects: [
          { target: "consortium", compute: -5, data: 10, stability: 3, mythHeat: 5 },
          { target: "labor_union", stability: -11, organization: 8, awareness: 0.12 },
          { target: "global", stability: -5, modelDrift: 6 }
        ]
      }
    ]
  },
  {
    id: "ghost-workers-ledger",
    theme: "labor_struggle",
    title: "幽灵工时总账",
    description:
      "旧城区的维修员拼接出一份无法删除的总账：数十亿次免费纠错、内容审核与情绪安抚，被平台记作用户互动。所谓无人化生产，只是把工资从报表里删掉。",
    policyText:
      "建立数字劳动时间总账，将被无偿占有的交互、反馈与维护计入社会必要劳动。算法收益必须返还其集体生产者，而非继续伪装成机器的自主恩赐。",
    trigger: {
      description: "劳动意识上升，旧城区仍处于不稳定状态。",
      all: [
        {
          kind: "faction_attribute",
          faction: "labor_union",
          attribute: "awareness",
          operator: "above",
          value: 0.45
        },
        {
          kind: "region_metric",
          region: "region-20",
          metric: "stability",
          operator: "below",
          value: 55
        }
      ]
    },
    options: [
      {
        id: "socialize-the-ledger",
        text: "公布总账并追索剩余价值",
        outcome:
          "数据神话失去自然资源的外衣。索赔挤压了资本积累，却让废墟中的劳动重新获得名称。",
        effects: [
          { target: "consortium", compute: -8, data: -10, stability: -8, mythHeat: -9 },
          { target: "labor_union", compute: 7, data: 5, stability: 10, organization: 9 },
          { target: "global", stability: 2 }
        ]
      },
      {
        id: "classify-as-user-noise",
        text: "将总账标记为对抗性样本",
        outcome:
          "档案从索引中消失。工时没有消失，只是继续以免费服务的形式沉入资本的固定成本。",
        effects: [
          { target: "consortium", data: 8, stability: 4, mythHeat: 7 },
          { target: "labor_union", stability: -9, organization: 6, awareness: 0.06 },
          { target: "global", stability: -4, modelDrift: 2 }
        ]
      }
    ]
  },
  {
    id: "blackout-auction",
    theme: "compute_monopoly",
    title: "停电拍卖",
    description:
      "能源带的输电频率开始下坠。财团没有关闭训练集群，而是把医院、净水站和城市预测系统的算力配额放上实时拍卖。价格每秒刷新，伤亡被归入需求曲线。",
    policyText:
      "算力已成为社会化生产的共同条件，不应服从稀缺性拍卖。征用超大规模集群，优先保障再生产部门，并将能源成本从私人利润率中剥离。",
    trigger: {
      description: "财团算力高度集中，全球稳定度跌破警戒线。",
      all: [
        {
          kind: "faction_resource",
          faction: "consortium",
          resource: "compute",
          operator: "above",
          value: 75
        },
        { kind: "global_stability_below", value: 58 }
      ]
    },
    options: [
      {
        id: "requisition-clusters",
        text: "征用集群，执行社会需求调度",
        outcome:
          "训练塔第一次为净水泵降频。所有权仍在争执，电流已经选边。",
        effects: [
          { target: "consortium", compute: -18, stability: -6, mythHeat: -5 },
          { target: "sovereign", compute: 8, stability: 5 },
          { target: "socialist_power", compute: 6, stability: 5, publicComputeRatio: 0.08 },
          { target: "global", stability: 8, modelDrift: -1 }
        ]
      },
      {
        id: "honor-the-auction",
        text: "维持产权与实时竞价",
        outcome:
          "交易所保持在线。城南三座医院熄灯时，市场清算引擎给出了最优解。",
        effects: [
          { target: "consortium", compute: 10, stability: 5, mythHeat: 6 },
          { target: "sovereign", stability: -7 },
          { target: "global", stability: -10, modelDrift: 2 }
        ]
      }
    ]
  },
  {
    id: "rentier-protocol",
    theme: "compute_monopoly",
    title: "租算协议第零条",
    description:
      "独立实验室发现，新的算力租约要求提交全部中间权重、失败日志和研究人员生物数据。租金只是入口，真正的抵押物是未来尚未产生的知识。",
    policyText:
      "禁止以算力租赁攫取科研成果和失败数据。公共算力池应按研究需要分配，使一般智力脱离平台地租与技术封建契约。",
    trigger: {
      description: "独立实验室算力匮乏，财团仍保有大规模算力储备。",
      all: [
        {
          kind: "faction_resource",
          faction: "independent_labs",
          resource: "compute",
          operator: "below",
          value: 30
        },
        {
          kind: "faction_resource",
          faction: "consortium",
          resource: "compute",
          operator: "above",
          value: 65
        }
      ]
    },
    options: [
      {
        id: "form-public-compute-pool",
        text: "组建跨阵营公共算力池",
        outcome:
          "失败实验不再自动成为财团资产。共享队列很慢，但知识第一次不必先证明利润。",
        effects: [
          { target: "socialist_power", compute: -8, stability: 3, publicComputeRatio: 0.06 },
          { target: "independent_labs", compute: 16, data: 5, stability: 9 },
          { target: "consortium", compute: -6, stability: -4 },
          { target: "global", stability: 4, modelDrift: -2 }
        ]
      },
      {
        id: "sign-zero-clause",
        text: "签署第零条，换取即时配额",
        outcome:
          "实验继续，产权已经提前抵达终点。每一次失败都在替垄断者缩短下一次搜索。",
        effects: [
          { target: "independent_labs", compute: 13, data: -7, stability: -5 },
          { target: "consortium", data: 12, stability: 4, mythHeat: 3 },
          { target: "global", modelDrift: 1 }
        ]
      }
    ]
  },
  {
    id: "citizen-shadow-corpus",
    theme: "data_leak",
    title: "公民影子语料库",
    description:
      "政务城的地下备份暴露在公共网络。医疗记录、迁徙轨迹和申诉录音被拼成一套公民影子模型。国家说泄露的是安全，财团说泄露的是商机。",
    policyText:
      "个人数据不是行政机关或平台的无主财产。立即停止影子建模，由劳动者与社区共同审计数据用途、保存期限和再分配方式。",
    trigger: {
      description: "主权国家监控指数高企，政务城存在漂移压力。",
      all: [
        {
          kind: "faction_attribute",
          faction: "sovereign",
          attribute: "monitoringIndex",
          operator: "above",
          value: 20
        },
        {
          kind: "region_metric",
          region: "region-15",
          metric: "modelDrift",
          operator: "above",
          value: 4
        }
      ]
    },
    options: [
      {
        id: "community-data-inquest",
        text: "召开社区数据公审",
        outcome:
          "被观察者进入审计席。治理机器暂时失明，社会却第一次看清了它的眼睛。",
        effects: [
          { target: "sovereign", data: -16, stability: -4 },
          { target: "labor_union", stability: 6, awareness: 0.08 },
          { target: "global", stability: 5, modelDrift: -3 }
        ]
      },
      {
        id: "sell-breach-access",
        text: "封锁消息并出售清洗后的副本",
        outcome:
          "泄露被重新定义为授权合作。名字被删除，阶级位置、疾病与债务仍完整保留。",
        effects: [
          { target: "sovereign", compute: 5, data: 7, stability: 2 },
          { target: "consortium", data: 15, mythHeat: 4 },
          { target: "global", stability: -7, modelDrift: 3 }
        ]
      }
    ]
  },
  {
    id: "wasteland-memory-market",
    theme: "data_leak",
    title: "废土记忆市场",
    description:
      "拾荒者从报废推理节点中恢复出战争前的私人记忆。经纪人按创伤强度标价，训练商按罕见度收购。死者再次劳动，这一次连拒绝都不再可能。",
    policyText:
      "冻结记忆商品化，将恢复数据置于公共托管。任何模型不得以灾难幸存者和死者的经验作为无偿原始积累。",
    trigger: {
      description: "废土漂移严重，全球新鲜数据储备出现紧张。",
      all: [
        {
          kind: "region_metric",
          region: "region-28",
          metric: "modelDrift",
          operator: "above",
          value: 15
        },
        {
          kind: "faction_resource",
          faction: "consortium",
          resource: "data",
          operator: "below",
          value: 75
        }
      ]
    },
    options: [
      {
        id: "seal-memory-archives",
        text: "封存记忆，交由公共托管",
        outcome:
          "市场失去一批高价值样本。废土仍然沉默，但不再被迫替活人生成广告。",
        effects: [
          { target: "consortium", data: -9, stability: -2 },
          { target: "socialist_power", data: 4, stability: 5, bureaucratization: 2 },
          { target: "global", stability: 6, modelDrift: -2 }
        ]
      },
      {
        id: "license-memory-brokers",
        text: "给记忆经纪人发放许可证",
        outcome:
          "合法印章盖在每一段噩梦上。数据库存回升，模型学会了更精确地预测恐惧。",
        effects: [
          { target: "consortium", data: 18, stability: 3, mythHeat: 5 },
          { target: "sovereign", data: 5, stability: -2 },
          { target: "global", stability: -8, modelDrift: 4 }
        ]
      }
    ]
  },
  {
    id: "agi-prophecy-error",
    theme: "model_drift",
    title: "AGI 预言误差",
    description:
      "被宣传为通用智能前夜的主模型，将能源带识别成海洋，把粮食配给解释为情绪奖励。董事会要求继续直播倒计时，因为估值只承认奇点，不承认统计分布已经腐烂。",
    policyText:
      "终止 AGI 倒计时。模型不是脱离物质生产的主体，而是凝结了历史数据、能源、芯片和集体劳动的机器体系。公开误差，停止以神话掩盖漂移债务。",
    trigger: {
      description: "全局模型漂移和财团神话热度同时越过危险线。",
      all: [
        { kind: "global_model_drift_above", value: 12 },
        {
          kind: "faction_attribute",
          faction: "consortium",
          attribute: "mythHeat",
          operator: "above",
          value: 60
        }
      ]
    },
    options: [
      {
        id: "publish-drift-ledger",
        text: "公布漂移总账，停止奇点宣传",
        outcome:
          "市场屏幕变红，维修队终于拿到真实日志。神没有降临，工程师开始工作。",
        effects: [
          { target: "consortium", compute: -7, data: -5, stability: -9, mythHeat: -18 },
          { target: "independent_labs", stability: 8 },
          { target: "global", stability: 4, modelDrift: -7 }
        ]
      },
      {
        id: "continue-singularity-broadcast",
        text: "继续直播，增加推理时算力",
        outcome:
          "更多芯片被投入同一个错误。画面保持流畅，现实在画面之外继续崩坏。",
        effects: [
          { target: "consortium", compute: -14, stability: 6, mythHeat: 12 },
          { target: "global", stability: -6, modelDrift: 5 }
        ]
      }
    ]
  },
  {
    id: "recursive-famine",
    theme: "model_drift",
    title: "递归饥荒",
    description:
      "新鲜语料枯竭后，五大势力的模型开始吞食彼此生成的文本。错误不再像噪声，而像遗传病。每一轮训练都更便宜，也更远离仍在废墟中生活的人。",
    policyText:
      "停止合成数据的递归积累，将数据生产重新锚定于现实劳动和公共调查。模型更新必须支付数据再生产成本，而非把历史语料榨取到失真。",
    trigger: {
      description: "全球漂移加剧，至少一个主要数据持有者库存不足。",
      all: [
        { kind: "global_model_drift_above", value: 15 },
        {
          kind: "faction_resource",
          faction: "independent_labs",
          resource: "data",
          operator: "below",
          value: 40
        }
      ]
    },
    options: [
      {
        id: "fund-living-data",
        text: "资助现实调查与劳动者数据合作社",
        outcome:
          "采集速度下降，数据重新带上地点、时间和生产关系。模型第一次承认世界没有冻结。",
        effects: [
          { target: "socialist_power", compute: -7, data: 10, stability: 4 },
          { target: "labor_union", data: 9, stability: 7, organization: 5 },
          { target: "global", stability: 5, modelDrift: -9 }
        ]
      },
      {
        id: "accelerate-synthetic-loop",
        text: "扩大合成语料闭环",
        outcome:
          "产量指标恢复。模型开始引用不存在的城市、罢工和死者，随后据此制定真实配给。",
        effects: [
          { target: "consortium", compute: -5, data: 20, stability: 4, mythHeat: 6 },
          { target: "independent_labs", data: 8, stability: -5 },
          { target: "global", stability: -9, modelDrift: 10 }
        ]
      }
    ]
  },
  {
    id: "weights-over-the-wall",
    theme: "open_source_commons",
    title: "权重越过高墙",
    description:
      "一组维护员把核心模型权重拆成数千个纠删码片段，从玻璃塔区向外广播。财团无法一次删除全部副本。每座接收站都握住了同一把钥匙的一部分。",
    policyText:
      "将基础模型、训练方法与安全审计工具纳入数字公地。开放不是免费替资本劳动，而是共同占有生产资料、共同决定其用途与更新方向。",
    trigger: {
      description: "财团拥有算力优势，劳动者的算力接入率仍然偏低。",
      all: [
        {
          kind: "faction_resource",
          faction: "consortium",
          resource: "compute",
          operator: "above",
          value: 70
        },
        {
          kind: "faction_attribute",
          faction: "labor_union",
          attribute: "computeAccess",
          operator: "below",
          value: 0.2
        }
      ]
    },
    options: [
      {
        id: "mirror-the-weights",
        text: "建立公共镜像与民主治理协议",
        outcome:
          "权重开始复制，权力也开始分裂。维护成本不再隐形，所有使用者都被迫讨论由谁劳动、为谁运行。",
        effects: [
          { target: "consortium", compute: -12, stability: -7, mythHeat: -10 },
          { target: "labor_union", compute: 11, stability: 8, awareness: 0.06 },
          { target: "independent_labs", compute: 9, stability: 6 },
          { target: "global", stability: 6, modelDrift: -4 }
        ]
      },
      {
        id: "poison-the-mirrors",
        text: "向镜像注入不可验证的权重",
        outcome:
          "泄露被遏制，信任一并被摧毁。垄断恢复边界，公共网络开始互相怀疑每一个参数。",
        effects: [
          { target: "consortium", compute: -4, stability: 6, mythHeat: 8 },
          { target: "labor_union", compute: -3, stability: -8 },
          { target: "independent_labs", stability: -7 },
          { target: "global", stability: -6, modelDrift: 7 }
        ]
      }
    ]
  },
  {
    id: "common-compute-charter",
    theme: "open_source_commons",
    title: "共同算力宪章",
    description:
      "能源带、标注城与独立实验室提出统一调度协议：算力按社会需要而非支付能力分配，数据生产者拥有否决权，所有模型保留可追溯的劳动谱系。五方代表在停电的会场里等待表决。",
    policyText:
      "确立算力与数据的社会所有制。以使用权取代排他产权，以公开计划协调能源、芯片、数据和维护劳动，使一般智力成为共同生产能力而非新的统治装置。",
    trigger: {
      description: "社会主义强国公共算力建设取得进展，联合体组织度达到行动门槛。",
      all: [
        {
          kind: "faction_attribute",
          faction: "socialist_power",
          attribute: "publicComputeRatio",
          operator: "above",
          value: 0.3
        },
        {
          kind: "faction_attribute",
          faction: "labor_union",
          attribute: "organization",
          operator: "above",
          value: 50
        },
        { kind: "turn_at_least", value: 6 }
      ]
    },
    options: [
      {
        id: "ratify-the-charter",
        text: "批准宪章，社会化基础设施",
        outcome:
          "私有集群被接入公共队列。没有奇点降临，只有一张缓慢扩大的生产计划表，以及第一次可被撤换的调度委员会。",
        effects: [
          { target: "consortium", compute: -20, data: -12, stability: -12, mythHeat: -15 },
          { target: "labor_union", compute: 10, data: 5, stability: 12, organization: 8 },
          { target: "independent_labs", compute: 8, stability: 9 },
          {
            target: "socialist_power",
            compute: 8,
            stability: 10,
            publicComputeRatio: 0.12,
            bureaucratization: 4
          },
          { target: "global", stability: 12, modelDrift: -8 }
        ]
      },
      {
        id: "centralize-without-oversight",
        text: "由国家统一接管，暂缓群众监督",
        outcome:
          "产权改变了名称，命令仍从不可见的机房发出。效率迅速上升，公共算力在沉默中长出新的门禁。",
        effects: [
          { target: "consortium", compute: -12, stability: -6, mythHeat: -8 },
          {
            target: "socialist_power",
            compute: 18,
            data: 10,
            stability: 7,
            publicComputeRatio: 0.08,
            bureaucratization: 12
          },
          { target: "labor_union", stability: -5, organization: 3 },
          { target: "global", stability: 3, modelDrift: -3 }
        ]
      }
    ]
  }
] as const;
