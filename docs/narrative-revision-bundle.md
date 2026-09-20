# 《算力寡头》剧情修改完整资料包

> 生成来源：当前仓库实际运行代码。不要使用旧版 `src/content/story-source.md` 作为权威来源。
> 本文用于交给外部模型统一修改剧情；包含完整剧情正文、事件、顾问、历史承诺、社会反馈与结局条件。

## 给剧情修改者的约束

1. 可以修改标题、描述、选项文字、结果文字、顾问台词和结局文案。
2. 除非明确要求同步改代码，否则必须保留事件 `id`、选项 `id`、章节、触发字段、数值效果和条件结构。
3. 五个正式展示名固定为：天穹财阀、联邦管委会、星火劳工团、棱镜开源社、赤衡共同体。
4. 核心概念固定为：算力、数据、稳定度、模型漂移、电力、五灯、历史承诺、政策债务。
5. 地图已经废除旧六地块设定，现为 30 个算力与电力基础设施区域；不要再写成六个核心地块。
6. 不要把选择写成明显的正确/错误答案。每个方案都应有即时收益、承担者和延迟代价。
7. 日常语言应通俗、具体、可视化；避免抽象学术口号堆叠。
8. 若返回修改稿，请按原事件 ID 分节，明确列出替换后的 `title`、`description`、`option text`、`outcome`，不要擅自新增无法映射的 ID。

## 当前剧情运行顺序

`基础设施结算 -> 主线/势力/响应剧情 -> 玩家决策 -> 历史承诺与顾问信任 -> 3点治理行动 -> 五灯压力与社会反馈 -> 条件事件或动态危机 -> 章节总结 -> 下一季度`

同一局不会播放全部内容。章节配额、前置选择、五灯状态、资源状态、历史承诺和玩家行动共同决定实际出现的事件。

## A. 六章公共主线与轻量事件（完整正文）

### [序章] P1《第一份调度令》

雨夜，南港算力站电力吃紧。医院的诊断系统和一家直播工厂同时申请优先供电。工厂老板说，他一晚上的订单够买下半条街。

- **A：先保医院**
  - 结果：医院灯火通明。工厂老板放话："记住今天。"
- **B：先保工厂**
  - 结果：订单准时发出。急诊科靠人工翻旧病历，熬到了天亮。

### [第一章] E01《倒计时又重置了》

广场大屏跳出新一年的倒计时："距离奇点，还有365天。"这是第三次重置。数据工们看着屏幕，班表却悄悄加长了两小时。

- **A：公开问一句："奇点到底哪天到？"**
  - 结果：台下有人笑，有人低头。第二天，你收到一封措辞礼貌的"关注函"。
- **B：配合宣传，领走"奇点贡献奖"**
  - 结果：奖金不多，屏幕上多了你的名字，也多了一层看不见的绳子。

### [第一章] E02《标注工的一夜》

老工人莉娜连续标注了三十六小时，教会机器分辨"哪种咳嗽是肺炎"。第二天，通知来了：该岗位"已由系统接管"。

- **A：陪她们去谈判桌，争取一份转岗补偿**
  - 结果：谈判拖了三周，最后拿到半年生活费。工棚里第一次有人说："我们该有个自己的代表。"
- **B：建议她们接受公司的"再培训"计划**
  - 结果：她们去学了新技能，可新岗位的薪水少了一截。

### [第一章] E03《听证会的椅子》

联邦听证会上，天穹代表迟到二十分钟，中途接了三个电话，提前离席。会议记录里只写了一句："因故缺席。"

- **A：要求把"缺席"如实写成"拒绝出席"**
  - 结果：措辞升级，天穹抗议，媒体来了兴趣。管委会难得站直了一回。
- **B：私下沟通，请天穹"下次多给点面子"**
  - 结果：气氛保住了，规则也软了一点。

### [第一章] E04《免费的午餐》

棱镜社发布免费小工具，街角小店老板靠它自己做账。天穹随即寄来律师函，称其中"疑似借用了我们的方法"。

- **A：站出来声援，请更多人一起使用**
  - 结果：用的人越来越多，官司也越滚越大。
- **B：劝棱镜先下架有争议的部分**
  - 结果：风波平息。棱镜社里有人摔了键盘："原来免费，也要看别人脸色。"

### [第一章] E05《蓝图与水表》

赤衡在西部山区建起公共算力站，像通自来水一样，把算力接到村小学和卫生所。天穹的评论员说："这种速度，一辈子也追不上我们。"山里的孩子第一次和远方的老师面对面上课。

- **A：派人去参观学习**
  - 结果：你看到了朴素却结实的做法，也看到了厚厚的报表。
- **B：保持距离，先观望**
  - 结果：你没得罪任何人，也没学到任何东西。

### [第一章] E06《方言的价钱》

一位奶奶的方言录音被采集，训练出一个客服机器人。如今她想给孙子录方言课，平台却要收"素材授权费"。

- **A：推动"数据分红"提案**
  - 结果：提案磕磕绊绊，但第一次有人算了一笔账：谁出了原料，谁拿了利润。
- **B：不碰这件事，避免和天穹正面冲突**
  - 结果：奶奶最后自己付了钱，没再说话。

### [第一章] E07《加班费变成积分》

天穹宣布升级福利：加班费改发"忠诚积分"，可兑换咖啡、电影票，或者下个月的排班优先权。

- **A：接受试点，看看效果**
  - 结果：积分涨得飞快，能兑换的东西却越来越少。
- **B：要求保留现金结算**
  - 结果：公司说这是"过时的想法"。但有几个部门悄悄改了回去。

### [第一章] E08《欠费的服务器》

棱镜社机房欠费，云服务商通知：三天后断电。泽田真司盯着账单："我们的东西能帮全世界，却撑不过下个月。"

- **A：发起众筹**
  - 结果：一夜之间收到几千笔小额捐款，最小的一笔备注是"一碗面钱"。
- **B：接受天穹的"赞助"**
  - 结果：钱到账了，附带一句话："代码请先给我们看一眼。"

### [第二章] E09《机房的火警》

天穹算力中心为节省制冷费用，关掉了半数备用风机。夜里机柜起火，值班工被烫伤。公司只发了一行公告："系统短暂波动。"

- **A：把事故经过交给管委会公开**
  - 结果：天穹震怒，但被烫伤的工人第一次拿到了正式赔偿。
- **B：帮天穹低调处理，换取本季度算力配额**
  - 结果：配额到账。医院病房里，值班工静静躺着。

### [第二章] E10《工棚夜谈》

调查员阿米尔挨家走访工棚。他发现，工人们最怕的不是丢工作，而是"丢了工作，没人知道我们来过"。他把笔记本递给你："你觉得下一步该做什么？"

- **A：先办一个互助基金，互相兜底**
  - 结果：每人每月放进一点，第一次有人敢请病假。
- **B：先写一封公开信，把大家的处境说出来**
  - 结果：信被转了十万次。有人感动，也有人回复："关我什么事。"

### [第二章] E11《两份合同》

管委会一位官员的孩子，收到了天穹寄来的"特别培养名额"。卡塔琳娜在电话里说："我们只是想让世界更有效率。"

- **A：把这份合同公开**
  - 结果：官员辞职，天穹换了个更客气的做法。
- **B：什么也不做，看看后续**
  - 结果：名额悄悄生效。几个月后，一项条款在会上被"顺利"修改。

### [第二章] E12《审计官的笔记本》

审计官奥斯曼查到，天穹把大批算力转移到境外。但证据来自一次不太合法的入侵。

- **A：先用起来，事后再解释**
  - 结果：案子推进得很快，但天穹的律师团盯上了程序漏洞。
- **B：坚持重新取证**
  - 结果：慢了三个月，材料却干干净净，谁也挑不出毛病。

### [第二章] E13《吹哨人》

天穹职员艾米莉·卡特，把一份训练日志交给棱镜社：里面有大量未经许可的数据。她小声说："我睡不着了。"

- **A：全部公开**
  - 结果：舆论炸开，但艾米莉的名字也被人翻了出来。
- **B：只公开关键部分，保护她**
  - 结果：力度小了一点。她留在原来的工位，继续留意。

### [第二章] E14《十一个章》

社区想接入公共算力，办一个"养老陪伴助手"。审批要盖十一个章。苏晚照拿着申请表，在走廊里来回走了三遍。

- **A：支持简化流程，允许试点**
  - 结果：三周就上线了，老人们乐了。有一次小小的信息泄露，惹来一顿批评。
- **B：按流程一步步来**
  - 结果：半年后才上线，稳稳当当。也有老人没等到。

### [第二章] E15《限速》

天穹宣布对城郊工厂区"例行维护"，网速被压到只够发文字。工人们看着流水线上的机器慢慢停下来。

- **A：向管委会投诉**
  - 结果：投诉受理编号很长，处理时间也很长。
- **B：转到赤衡的边境公共算力站借用带宽**
  - 结果：网速回来了。有人开始问："我们的数据，到底存在谁那里？"

### [第二章] E16《地铁站里的硬盘》

桑吉夫在一座废弃地铁站里摆出一排旧硬盘："如果我们自己存自己的数据，就没人能一拉闸，把我们的东西全关了。"

- **A：批准，悄悄建**
  - 结果：第一批数据拷了进去。灯光很暗，但每个人手里都有一把钥匙。
- **B：先做备份，再决定要不要建**
  - 结果：稳了一点，也慢了一点。桑吉夫说："等的时候，也是在赌。"

### [第二章] E17《第十七号条款》

管委会起草新规，要求天穹披露算力用途。天穹的说客提出加一句："商业机密除外。"

- **A：删掉这句话**
  - 结果：谈判卡了两个月，条款却保住了牙齿。
- **B：接受折中版本**
  - 结果：通过了。字数很多，能管的却不多。

### [第三章] E18《地下库·第二夜》

库里的机器越来越多，缺硬盘，缺电。一位老工程师悄悄把公司淘汰的设备送来，说："这些反正也是要报废的。"

- **A：收下，登记造册，说明来路**
  - 结果：老工程师松了口气。工友们也知道了设备的来路。
- **B：婉拒，怕连累他**
  - 结果：他站了很久，最后把一箱螺丝放在门口："这个，总不违法吧。"

### [第三章] E19《红隼的提案》

小队长塔尼娅铺开一张地图："限速、断供、解雇，我们已经忍了很久。让我们让那座塔熄灯三小时。"她的手在发抖，不是怕，是气。

- **A：授权行动，但要求：先清场，只毁设备，不伤人**
  - 结果：计划被反复修改。最后只有一句话没变："谁也不能受伤。"
- **B：拒绝，改走罢工和谈判**
  - 结果：塔尼娅盯着你看了很久，才收起地图。

### [第三章] E20《熄灯之夜》

算力塔灭了灯。城区医院的备用系统平稳运行，但一位值班保安在撤离时摔断了腿。天穹发布通缉令，标题是《暴徒袭击基础设施》。

- **A：公开承担责任，并救助伤者**
  - 结果：一部分人骂你，也有人说："至少有人敢认。"
- **B：否认与星火有关**
  - 结果：风声压下去了。塔尼娅一言不发，把头盔放在桌上。

### [第三章] E20′《罢工的第七天》

罢工第七天，食堂只剩稀饭。塔尼娅低声说："他们在等我们饿。"

- **A：继续坚持，发动社区送饭**
  - 结果：隔壁社区的阿姨们推着小车来了，罢工又撑了一周。
- **B：向激进派让步，准备行动**
  - 结果：你听见有人在暗处检查装备，有人开始学着沉默。

### [第三章] E21《镜子》

棱镜社启动"镜像计划"：把公开的知识、地图和课本，在全球几千台旧电脑上各存一份。泽田说："哪怕塔倒了，知识还在。"

- **A：全力支持，捐出一批算力**
  - 结果：世界各地的旧电脑陆续亮起，像夜空里的星点。
- **B：担心被天穹追责，让他们低调点**
  - 结果：计划缩小了，但保住了核心。

### [第三章] E22《山那边的邀请》

赤衡向星火和棱镜发出邀请：来"算力工坊"看看，聊聊行业共同的规矩。苏晚照笑着说："别怕，只是喝茶。"沈清和站在后面，没有笑。

- **A：接受邀请**
  - 结果：你看到了朴素却庞大的机房，也第一次感到：他们很强，也很谨慎。
- **B：婉拒，保持独立**
  - 结果：对方点点头："门一直开着。"

### [第三章] E23《标记》

天穹安保部推出预测系统，提前标记"可能闹事的人"。一个十三岁的男孩，因为常去工棚，也被标了。

- **A：公开这件事**
  - 结果：一时间群情激愤，天穹发表声明："系统会改进。"
- **B：暂不公开，暗中搜集更多证据**
  - 结果：拖了一阵，那个男孩被"约谈"了一次。

### [第三章] E24《特使》

联邦特使皮埃尔·杜兰同时对天穹和星火说："我站在你这边。"他笑起来很真诚。

- **A：请他公开表态**
  - 结果：他脸上的笑僵了一下，但第一次说了一句真话。
- **B：让他继续两头传话，暗中利用**
  - 结果：消息像水一样流动，也漏得像水。

### [第三章] E25《渔村》

天穹为建新算力塔，要搬走一个海边渔村，补偿方式是"算力积分"。老渔民问："积分能拿去买鱼吗？"

- **A：支持村民抗议**
  - 结果：渔船排成一排，挡在施工船前面。工程停了三天。
- **B：促成更高的补偿协议**
  - 结果：数额高了一些。老渔民收了钱，没有再回头看海。

### [第三章] E26《开源的另一面》

有人用棱镜的开源工具批量制造假新闻，引发街头骚乱。埃琳娜主张加上使用限制，泽田摇头："一旦开始限制，就会一直限制下去。"

- **A：支持加限制**
  - 结果：骚乱平息，社里也裂开一道缝。
- **B：保持完全开放**
  - 结果：你坚持了原则，也承担了后果。

### [第三章] E27《异常流量》

天穹的网络监测发现地铁站里有异常数据流。桑吉夫盯着屏幕："他们在找我们。"

- **A：立刻转移数据**
  - 结果：转移在凌晨完成。最后一块硬盘刚出门，脚步声就到了。
- **B：制造假流量，把他们引到别处**
  - 结果：假流量骗了他们一晚上，也烧掉了一半储备电力。

### [第三章] E28《电表转得太快》

为了追赶竞争，新算力站耗电猛增，郊区居民用电开始吃紧。陆知行在会上说："算力要算，人也要算。"

- **A：先保民生用电，放慢扩张**
  - 结果：老百姓的灯没灭，赤衡的排名退了一位。
- **B：优先扩产，稳住竞争地位**
  - 结果：排名保住了，社区里有人半夜起来点蜡烛。

### [第三章] E29《海外来信》

边缘区的数据工给赤衡写信求助："你们能不能帮帮我们？"赤衡内部争论不休：帮，怕被说干涉；不帮，又怕辜负这份信任。

- **A：提供技术援助，不附带条件**
  - 结果：工程师留下了工具和图纸，没有留下名字。
- **B：只提供人道物资，不介入**
  - 结果：稳妥，也留下一句遗憾："他们看得见我们，却没伸手。"

### [第四章] E30《满仓》

天穹为了保住价格，让一半机房空转，同时限制小企业使用。冷却水在空管里滴答作响，仓库里却堆满了没人买得起的算力。

- **A：公开这批"闲置算力"的数据**
  - 结果：消息一出，天穹股价掉了两格。小企业主们围着屏幕看了很久。
- **B：向天穹提出"错峰出租"方案**
  - 结果：天穹勉强同意，条件是价格由他们定。

### [第四章] E31《联邦大会》

《算力公共条例》进入终审。每一张选票，都在被拉扯。

- **A：联合棱镜与赤衡，公开施压**
  - 结果：会场外聚集了各国的工程师、学生和数据工，举着手写的牌子。
- **B：与天穹私下交换条件**
  - 结果：条例通过了，但每一页都多了几行"另有规定"。

### [第四章] E32《内应》

艾米莉的行踪被内部安保察觉。她发来最后一条短信："我该走，还是留下？"

- **A：帮她撤离**
  - 结果：她在夜里翻墙，带走了一个U盘和一只旧水杯。
- **B：让她继续潜伏**
  - 结果：她删掉短信，回到座位上，继续微笑。

### [第四章] E33《净网行动》

天穹发起"净网行动"，安保队伍逐区清查。星火的联络点一处接一处被端。

- **A：化整为零，退入边缘区**
  - 结果：大家散进城郊的菜地、货运站和夜校。火种还在，只是看不见了。
- **B：集中力量，守住地下库**
  - 结果：那一夜，灯很亮。你不知道能守多久。

### [第四章] E34《发不发布》

泽田手里有一份足以动摇天穹的模型成果。阿德奥拉主张立刻发布："等到完美，就永远发不出去。"泽田说："发出去，就收不回来。"

- **A：立即发布**
  - 结果：全世界同时下载，服务器像被雨水浇透。
- **B：延后发布，先做安全检查**
  - 结果：阿德奥拉甩门而去，又在走廊里回头："你最好是对的。"

### [第四章] E35《被掐住的芯片》

天穹联合几个国家，对赤衡实施设备出口限制。陆知行把报告放在桌上："我们只能靠自己了。"

- **A：全力自研**
  - 结果：实验室通宵亮灯。前两年很难熬。
- **B：与棱镜、星火共同研发**
  - 结果：沈清和皱了皱眉，还是签了字："先别管是谁的功劳。"

### [第四章] E36《被剪辑的夜晚》

朴世勋公布一段剪辑过的视频，声称星火"切断了救护车的调度网络"。评论区一夜逆转。

- **A：公布完整监控和医院记录**
  - 结果：真相出来了，但比谣言慢了三天。
- **B：用一场公益行动对冲舆论**
  - 结果：你做了些好事，也没解释清楚。

### [第四章] E37《谈判桌》

卡塔琳娜亲自来了。她递出一份"分红计划"：所有数据工每月领取"数据红利"，条件是，星火交出地下库。她说："大家都是为了体面。"

- **A：接受部分条件，保留独立存储的钥匙**
  - 结果：分红开始发放，钥匙还在，只是有人开始睡不着。
- **B：拒绝**
  - 结果：卡塔琳娜合上文件："那我们就换个方式聊。"

### [第四章] E38《最后一道闸》

天穹以"系统检修"为由，关闭部分区域服务器，逼管委会让步。城里的红绿灯闪了一下，恢复了，又闪了一下。

- **A：授权管委会强制接管关键节点**
  - 结果：权力第一次真正被使用，也第一次被质疑："谁来管管这个管的人？"
- **B：谈判，允许限期恢复**
  - 结果：灯亮了，价码也被写进了合同。

### [第四章] E39《一封没发出的信》

莉娜在灯下写信，寄给三十年没见过的儿子。信写了很多次，最后一句始终没写完："如果有一天你也在这里工作，希望你有人替你说话。"

- **A：替她把信寄出去**
  - 结果：信到了。回信只有一行："妈，我在。"
- **B：陪她读完，先不寄**
  - 结果：她读完，笑了一下，把信折好，放进胸前口袋。

### [终章] E40《奇点发布会》

全球直播。天穹宣布"奇点正式上线"。掌声里，一位记者举手问："请问，是谁在为你干活？"大屏幕停顿了半秒。

- **A：趁此时机，公开所有证据**
  - 结果：直播间涌入千万观众，弹幕像雪一样落下。
- **B：静观其变，看各方如何反应**
  - 结果：发布会结束了。关于那半秒的讨论，才刚刚开始。

### [终章] E41《一张桌子》

奇点日过后的黎明，五方代表被请到同一间会议室。窗外，第一批算力塔的指示灯轮流亮起。有人问："下一步，怎么走？"

- **A：推动共同管理网络**
  - 结果：五个人第一次为同一张纸争吵。（进入结局判定）
- **B：各自为政，先守住自己的阵地**
  - 结果：桌上的水杯，一个个被端了回去。（进入结局判定）
- **C：把决定权交给一线数据工**
  - 结果：门被推开，走进来的是穿着旧工作服的人。（进入结局判定）

### [任意] M01《热搜》

热搜第一："今天，距离奇点365天。"

- **A：转发，附上一个白眼**
  - 结果：转发量不多，但有人回了个"+1"。
- **B：无视**
  - 结果：世界照常运转。

### [任意] M02《停电的面馆》

街角面馆因限速点不了单，老板眼巴巴地看着你。

- **A：给他一份临时配额**
  - 结果：他端出一碗面："趁热吃。"
- **B：告诉他去排队**
  - 结果：队伍很长，面已经凉了。

### [任意] M03《人工坐席》

客服机器人对来电者说："请转人工。"可人工坐席早被"优化"了。

- **A：恢复一个人工坐席**
  - 结果：一个年轻人接起电话，声音有点紧张。
- **B：继续由机器回答**
  - 结果：电话那头的老人叹了口气，挂了。

### [任意] M04《机房里的猫》

一只橘猫住进了冷却机房，员工们偷偷喂它。

- **A：假装没看见**
  - 结果：猫在机柜上打了个哈欠。
- **B：上报处理**
  - 结果：猫被"送养"了，机房安静得有点空。

### [任意] M05《被判违规的作业》

一个孩子用开源工具做作业，被系统判"违规"。

- **A：帮孩子申诉**
  - 结果：系统道歉，老师有点尴尬。
- **B：让他重新写一份**
  - 结果：孩子低着头，把作业撕了。

### [任意] M06《二手硬盘集市》

夜市里，一排排二手硬盘被摆在地上，摊主说："别嫌旧，里面有真东西。"

- **A：买几块，交给桑吉夫**
  - 结果：桑吉夫翻了翻，点点头。
- **B：没买**
  - 结果：摊主收摊时，把硬盘一块块擦干净。

### [任意] M07《台风预警》

台风逼近，算力塔要切换备用电。

- **A：优先保医院和学校**
  - 结果：灯没全灭，大家挤在有光的地方。
- **B：优先保商业区**
  - 结果：商场亮如白昼，街角一片漆黑。

### [任意] M08《退休的标注工》

一位老人退休，同事们凑钱买了一盆花。

- **A：也放进一点钱**
  - 结果：老人没说话，把花放在了窗台上。
- **B：算了，忙**
  - 结果：你回头看时，老人已经走了。

## B. 其余权威剧情与规则源码

以下内容保留源码结构，是为了让修改者准确看到触发条件、机械效果及相互依赖。只改文案时不要修改类型、ID、字段名和数值。

### 势力展示文案

来源：`src/content/factions.ts`

````ts
import type { FactionId } from "@/core/models/ids";

export interface FactionProfile {
  id: FactionId;
  code: string;
  name: string;
  summary: string;
  mandate: string;
  strengths: readonly string[];
  weaknesses: readonly string[];
  tone: "lime" | "orange" | "cyan" | "pink" | "red";
}

export const factionProfiles: readonly FactionProfile[] = [
  {
    id: "consortium",
    code: "CORP-01",
    name: "天穹财阀",
    summary: "手握海量云端服务器的巨型商业集团，依靠庞大人力源源不断生产数据，优先追逐资源收益。",
    mandate: "扩大云端版图，把每一份数据和算力都变成可持续收益。",
    strengths: ["开局算力资源丰厚", "数据产出稳定", "资金储备充足"],
    weaknesses: ["底层人员满意度容易下滑", "容易触发监管限制", "模型失控风险上升更快"],
    tone: "lime"
  },
  {
    id: "sovereign",
    code: "STATE-02",
    name: "联邦管委会",
    summary: "跨区域公共治理主体，依靠规则约束算力与数据流动，优先维持整个数字系统稳定。",
    mandate: "用规则和公共调度守住数字社会的基本秩序。",
    strengths: ["整体稳定性上限高", "抵御突发危机能力强", "可以出台管制政策规避风险"],
    weaknesses: ["算力扩张速度偏慢", "收集数据效率一般", "调整发展方向代价高昂"],
    tone: "orange"
  },
  {
    id: "labor_union",
    code: "LABOR-03",
    name: "星火劳工团",
    summary: "由一线数据工作者组成，掌握原始数据生产源头，希望争取更好的生存与劳动条件。",
    mandate: "让生产数据的一线劳动者获得应有的报酬与决定权。",
    strengths: ["获取原始数据能力强", "劳工相关事件更容易获得有利选项", "稳定性容错空间更大"],
    weaknesses: ["算力底子薄弱", "容易遭到资本势力打压", "发展周期漫长"],
    tone: "cyan"
  },
  {
    id: "independent_labs",
    code: "LABS-04",
    name: "棱镜开源社",
    summary: "独立程序员、算法研究者组成的团体，主张算力与算法公开共享，反抗大企业资源垄断。",
    mandate: "拆开技术高墙，让算法、算力和知识成为可共享的工具。",
    strengths: ["抵抗模型失控能力更强", "开源相关事件收益高", "自身稳定性不容易崩盘"],
    weaknesses: ["初始资源匮乏", "容易被大企业封锁算力", "短期产出能力弱"],
    tone: "pink"
  },
  {
    id: "socialist_power",
    code: "PUBLIC-05",
    name: "赤衡共同体",
    summary: "以公共利益为导向，统筹建设算力基础设施，平衡发展速度与全民稳定，防范资本无序扩张。",
    mandate: "以公共利益统筹长期建设，让发展成果覆盖每一个人。",
    strengths: ["全民稳定度天然偏高", "统筹调配资源", "抗大型危机能力极强", "可以平稳推进长期算力基建"],
    weaknesses: ["短期算力扩张速度有限", "资源分配需要权衡多方诉求", "转型改革成本较高"],
    tone: "red"
  }
] as const;

export const getFactionProfile = (id: FactionId): FactionProfile => {
  const profile = factionProfiles.find((faction) => faction.id === id);

  if (profile === undefined) {
    throw new Error(`Unknown faction profile: ${id}`);
  }

  return profile;
};
````

### 势力开场与路线主题

来源：`src/content/faction-routes.ts`

````ts
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";

export interface FactionRoute {
  title: string;
  theme: string;
  opening: readonly string[];
  playstyle: string;
  lifeline: string;
  liability: string;
}

export const factionRoutes: Record<FactionId, FactionRoute> = {
  consortium: {
    title: "赢家的房间",
    theme: "胜利者的孤独。你拥有一切，除了别人的信任。",
    opening: [
      "董事会给了最后期限：倒计时已经重置了三次，这一次，必须兑现。",
      "你刚被任命为算力调度部的负责人。卡塔琳娜递给你一杯咖啡，说：",
      '"别让我们再等一年。"'
    ],
    playstyle: "资源最多，选项最多，诱惑也最多。每一次\"效率\"的选择都会在\"裂缝\"上留下一道细纹。你随时可以变得更强，但你也随时可能被自己压下去的东西拖垮。",
    lifeline: "控制力",
    liability: "裂缝"
  },
  sovereign: {
    title: "没有牙齿的规则",
    theme: "夹在中间的权威。你手里只有一支笔，却要让所有人签字。",
    opening: [
      "成员国宣布下一年度预算削减。",
      '曼努埃拉握着你的手："我们需要证明，管委会不是摆设。"',
      '你翻开第一份档案，最上面写着："天穹财阀：拒绝出席。"'
    ],
    playstyle: "你没有算力，只有听证、审计、表决。要推动事情，就得借势：借民心、借证据、借盟友。每一次妥协都会在\"空转\"上添一笔，每一次坚持又会让你失去一些朋友。",
    lifeline: "公信力",
    liability: "空转"
  },
  labor_union: {
    title: "一盏很小的灯",
    theme: "从夹缝里长出来。你什么都没有，却什么都不能缺席。",
    opening: [
      "夜班结束，工棚里一盏灯还亮着。",
      '玛尔塔把一叠皱巴巴的名单递给你："这些人，都在等答案。"',
      "你不知道下一步该做什么，但你知道，你必须先去问他们。"
    ],
    playstyle: "资源少到只能亮一两盏灯。每一次分配都是取舍：你能不能既保住互助，又养活地下库？\"人心\"是你最重要的东西，来自你的每一次走访、每一句实话；\"暴露\"则是你的影子，越亮越大。",
    lifeline: "人心",
    liability: "暴露"
  },
  independent_labs: {
    title: "公开的代价",
    theme: "光会照到所有人，包括不该被照到的人。",
    opening: [
      "你所在的仓库里，墙上挂满了白板，桌上堆满了外卖盒。",
      "一笔匿名捐款刚刚到账，数额大得让整个社群沉默了。",
      '泽田盯着屏幕："谁会捐这么多钱？"'
    ],
    playstyle: "钱少，点子多。你的每一个选择，都在\"开放度\"与\"失控\"之间摇摆：公开越多，社区越有活力，风险也越难控制。顾问之间的争吵是你的日常。",
    lifeline: "开放度",
    liability: "失控"
  },
  socialist_power: {
    title: "稳与快",
    theme: "把算力修成水电，就必须面对水电的日常——慢，贵，永远不够。",
    opening: [
      "山路很长，车轮扬起黄色的灰。",
      '你被派去落实第十二座公共算力站。沈清和递给你一张图纸："图纸比口号有用。"',
      "山下的孩子已经在等第一堂课。"
    ],
    playstyle: "资源稳定，但并不宽裕。你要统筹：先保谁，后保谁。每一次\"快\"的选择都可能带来风险，每一次\"稳\"的选择又可能让人等得太久。\"僵化\"是你最大的敌人，也是你最难发现的敌人。",
    lifeline: "民生保障",
    liability: "僵化"
  }
};

export interface FactionArcState {
  factionId: FactionId;
  lifeline: number;
  liability: number;
}

export interface FactionArcChange {
  lifeline?: number;
  liability?: number;
}

const clamp = (value: number): number => Math.min(100, Math.max(0, value));

export const createFactionArcState = (
  state: GameState,
  factionId: FactionId
): FactionArcState => {
  const faction = state.factions.find((candidate) => candidate.id === factionId);
  if (faction === undefined) throw new Error(`Missing faction: ${factionId}`);

  let lifeline: number;
  switch (faction.id) {
    case "consortium":
      lifeline = faction.resources.compute;
      break;
    case "sovereign":
      lifeline = faction.resources.stability;
      break;
    case "labor_union":
      lifeline = faction.exclusive.organization;
      break;
    case "independent_labs":
      lifeline = faction.exclusive.reputation;
      break;
    case "socialist_power":
      lifeline = faction.resources.stability;
      break;
  }

  return { factionId, lifeline: clamp(lifeline), liability: 0 };
};

export const applyFactionArcChange = (
  state: FactionArcState,
  change: FactionArcChange
): FactionArcState => ({
  ...state,
  lifeline: clamp(state.lifeline + (change.lifeline ?? 0)),
  liability: clamp(state.liability + (change.liability ?? 0))
});
````

### 顾问资料与势力专属剧情

来源：`src/content/faction-story.ts`

````ts
import type { FactionId } from "@/core/models/ids";
import type { FactionArcChange } from "./faction-routes";
import type { StoryChapter, StoryEvent } from "./story-events";

export type AdvisorId =
  | "aditya"
  | "park"
  | "manuela"
  | "osman"
  | "marta"
  | "tanya"
  | "sawada"
  | "adeola"
  | "lu"
  | "su";

export interface AdvisorProfile {
  id: AdvisorId;
  factionId: FactionId;
  name: string;
  role: string;
  principle: string;
}

export type AdvisorTrustState = Readonly<Record<AdvisorId, number>>;

export const advisors: readonly AdvisorProfile[] = [
  { id: "aditya", factionId: "consortium", name: "阿迪蒂亚·梅赫塔", role: "首席运营官", principle: "稳运转" },
  { id: "park", factionId: "consortium", name: "朴世勋", role: "公关总监", principle: "管舆论" },
  { id: "manuela", factionId: "sovereign", name: "曼努埃拉·科雷亚", role: "管委会主席", principle: "讲理想" },
  { id: "osman", factionId: "sovereign", name: "奥斯曼·亚尔琴", role: "首席审计官", principle: "讲证据" },
  { id: "marta", factionId: "labor_union", name: "玛尔塔·索萨", role: "总协调", principle: "稳扎稳打" },
  { id: "tanya", factionId: "labor_union", name: "塔尼娅·卡明斯基", role: "红隼小队队长", principle: "要有行动" },
  { id: "sawada", factionId: "independent_labs", name: "泽田真司", role: "创始人", principle: "再检查" },
  { id: "adeola", factionId: "independent_labs", name: "阿德奥拉·巴洛贡", role: "传播负责人", principle: "先发出去" },
  { id: "lu", factionId: "socialist_power", name: "陆知行", role: "算力调度局局长", principle: "按流程" },
  { id: "su", factionId: "socialist_power", name: "苏晚照", role: "公共算力站站长", principle: "先试试" }
];

const advisorById = Object.fromEntries(advisors.map((advisor) => [advisor.id, advisor])) as Record<AdvisorId, AdvisorProfile>;

export const getAdvisor = (id: AdvisorId): AdvisorProfile => advisorById[id];

export const getFactionAdvisors = (factionId: FactionId): readonly AdvisorProfile[] =>
  advisors.filter((advisor) => advisor.factionId === factionId);

export const createAdvisorTrustState = (): AdvisorTrustState => ({
  aditya: 0,
  park: 0,
  manuela: 0,
  osman: 0,
  marta: 0,
  tanya: 0,
  sawada: 0,
  adeola: 0,
  lu: 0,
  su: 0
});

export const applyAdvisorTrust = (
  state: AdvisorTrustState,
  advisorId: AdvisorId | undefined
): AdvisorTrustState => advisorId === undefined
  ? state
  : { ...state, [advisorId]: Math.min(100, state[advisorId] + 10) };

const perspectiveByFaction: Readonly<Record<FactionId, string>> = {
  consortium: "天穹调度台正在估算这场风波对资源收益与控制力的影响。",
  sovereign: "管委会必须判断，这场风波会让规则更有分量，还是再次陷入空转。",
  labor_union: "星火的联络点正在确认，这个决定会怎样落到一线数据工作者身上。",
  independent_labs: "棱镜社正在追踪这场风波会不会扩大开放空间，也放大失控风险。",
  socialist_power: "赤衡的调度部门正在衡量，长期建设与眼前民生能否同时守住。"
};

export const getStoryPerspective = (event: StoryEvent, factionId: FactionId): string =>
  event.perspective ?? (event.factionId === factionId
    ? "这是你所在势力的内部抉择。结果将改变本路线的命脉与隐患。"
    : perspectiveByFaction[factionId]);

const event = (
  id: string,
  displayCode: string,
  factionId: FactionId,
  chapter: StoryChapter,
  title: string,
  description: string,
  options: StoryEvent["options"]
): StoryEvent => ({ id, displayCode, factionId, chapter, title, description, options });

export const factionStoryEvents: readonly StoryEvent[] = [
  event("CONSORTIUM-T1", "T1", "consortium", "第一章", "董事会的最后通牒",
    "三位董事坐在长桌另一端：\"倒计时必须兑现，否则换人。\"卡塔琳娜没有说话，只是看着你。", [
      { id: "A", text: "加速上线，削减安全冗余", outcome: "进度提前了，梅赫塔在走廊里叹了一口气。", arcChange: { lifeline: 6, liability: 9 }, advisorId: "park", advisorAdvice: "我们理解大家的心情——先发个声明吧。" },
      { id: "B", text: "再次延期，并公开承认\"晚一点\"", outcome: "董事们皱眉，外界的批评少了，卡塔琳娜第一次对你点了点头。", arcChange: { lifeline: -3, liability: -7 }, advisorId: "aditya", advisorAdvice: "先保运转，其他的等会议结束再说。" }
    ]),
  event("CONSORTIUM-T2", "T2", "consortium", "第二章", "艾米莉的辞呈",
    "艾米莉把辞呈放在桌上。她知道得太多了。\"我只是想睡个安稳觉。\"", [
      { id: "A", text: "挽留，并给她调岗加薪", outcome: "她沉默很久，收下了。她的眼神没有变。", arcChange: { lifeline: 4, liability: 5 } },
      { id: "B", text: "批准，同时送她一份保密协议", outcome: "她签了字，走出大门时没有回头。", arcChange: { lifeline: -2, liability: 8 } }
    ]),
  event("CONSORTIUM-T3", "T3", "consortium", "第四章", "赢家的房间",
    "一切顺利。空会议室里，卡塔琳娜问你：\"我们赢了，那为什么没人高兴？\"", [
      { id: "A", text: "拿出一部分收益，设立\"数据红利\"", outcome: "她挑了挑眉：\"你是认真的？\"", arcChange: { lifeline: -4, liability: -10 } },
      { id: "B", text: "继续扩张，\"高兴是奢侈品\"", outcome: "她笑了一下，没再说话。", arcChange: { lifeline: 8, liability: 10 } }
    ]),
  event("SOVEREIGN-C1", "C1", "sovereign", "第一章", "没有预算的听证",
    "预算被砍，听证会只能办半场。奥斯曼翻着账本：\"场地、翻译、安保，我们只够一样。\"", [
      { id: "A", text: "把听证会搬到工棚和学校，借民心", outcome: "座位是折叠椅，听众是真人。天穹的代表也来了，坐在最后一排。", arcChange: { lifeline: 8, liability: -4 }, advisorId: "manuela", advisorAdvice: "只要大家愿意坐下来，就没有解决不了的事。" },
      { id: "B", text: "接受天穹赞助场地，借资金", outcome: "场地很漂亮，条幅上多了一个不该有的标志。", arcChange: { lifeline: -5, liability: 8 }, advisorId: "osman", advisorAdvice: "账不会撒谎，人会。" }
    ]),
  event("SOVEREIGN-C2", "C2", "sovereign", "第二章", "备忘录",
    "一份内部备忘录显示，成员国的一位代表和天穹有私下交易。曼努埃拉看了很久，说：\"这份，你决定。\"", [
      { id: "A", text: "公开备忘录", outcome: "成员国震动，你多了几个敌人，也多了很多陌生的支持者。", arcChange: { lifeline: 8, liability: -5 } },
      { id: "B", text: "交给成员国自行调查", outcome: "事情被\"处理\"了，外界什么也没看到。", arcChange: { lifeline: -6, liability: 8 } }
    ]),
  event("SOVEREIGN-C3", "C3", "sovereign", "第四章", "执行令",
    "你终于有权强制天穹交出一次数据。天穹回应：\"我们会在同一天检修全部服务器。\"", [
      { id: "A", text: "执行，承担后果", outcome: "城市里的灯闪了一下。你签的字，第一次有了重量。", arcChange: { lifeline: 10, liability: -7 } },
      { id: "B", text: "缓行，再谈一轮", outcome: "谈判桌上多了几杯咖啡，一切照旧。", arcChange: { lifeline: -7, liability: 10 } }
    ]),
  event("LABOR-S1", "S1", "labor_union", "第二章", "第一次晾晒会",
    "一次疏忽，桑吉夫的判断失误，导致一批数据丢失。大家围坐一圈：\"今晚，我们把话说开。\"", [
      { id: "A", text: "让他自己说清楚，大家一起评", outcome: "他说到一半红了眼眶。有人递了一杯热水。这次之后，没有人再对他隐瞒。", arcChange: { lifeline: 8, liability: -5 }, advisorId: "marta", advisorAdvice: "先问问大家怎么想。" },
      { id: "B", text: "私下处理，免得伤感情", outcome: "气氛保住了，心里的疙瘩却还在。", arcChange: { lifeline: -4, liability: 6 }, advisorId: "tanya", advisorAdvice: "再忍就不是忍，是认命。" }
    ]),
  event("LABOR-S2", "S2", "labor_union", "第三章", "不拿一颗螺丝",
    "深夜，一座无人看管的仓库里堆满高价设备。有人想拿走一批，换钱给受伤的同伴治病。", [
      { id: "A", text: "严守规矩，不拿，另想办法", outcome: "没人再提这件事。第二天，玛尔塔把自己的手表放在了桌上。", arcChange: { lifeline: 5, liability: -6 } },
      { id: "B", text: "允许\"借用\"，事后归还并登记", outcome: "设备被借走，又被原样送了回来。仓库的保安看着登记表，愣了很久。", arcChange: { lifeline: 7, liability: 5 } }
    ]),
  event("LABOR-S3", "S3", "labor_union", "第四章", "带不走的人",
    "净网行动中，撤退路线只够一半人通过。留下的人要守住地下库，走的人要保住火种。", [
      { id: "A", text: "让年轻人先撤", outcome: "年轻人一步三回头。留下的老工人说：\"快走，别让我们白等。\"", arcChange: { lifeline: 5, liability: -4 } },
      { id: "B", text: "让熟手先撤", outcome: "熟手们沉默着走了。年轻人守在门口，手里握着一把旧螺丝刀。", arcChange: { lifeline: -3, liability: 7 } }
    ]),
  event("PRISM-P1", "P1", "independent_labs", "序章", "匿名捐款",
    "一笔巨额匿名捐款到账，附言只有一句：\"随便你们怎么用。\"", [
      { id: "A", text: "立刻买服务器，摆脱欠费", outcome: "服务器亮起，社群一片欢呼。埃琳娜在角落里皱了皱眉。", arcChange: { lifeline: 7, liability: 8 }, advisorId: "adeola", advisorAdvice: "完美的东西，永远发不出去。" },
      { id: "B", text: "先查来源，再决定", outcome: "查了三天，一无所获。钱在账上，谁也不敢碰。", arcChange: { lifeline: -2, liability: -5 }, advisorId: "sawada", advisorAdvice: "等我再确认一下。" }
    ]),
  event("PRISM-P2", "P2", "independent_labs", "第三章", "社区的争吵",
    "泽田与阿德奥拉吵到一句话也不说，社群分成两派。有人说：\"不如各写各的。\"", [
      { id: "A", text: "召开全社公开会议，现场直播", outcome: "直播间挤满了人。吵得很凶，也吵出了几个好想法。", arcChange: { lifeline: 8, liability: 5 } },
      { id: "B", text: "先分开冷静，各自整理观点", outcome: "社里安静得像图书馆。有人说：\"冷静完，人也凉了。\"", arcChange: { lifeline: -4, liability: -3 } }
    ]),
  event("PRISM-P3", "P3", "independent_labs", "第四章", "被拿走的代码",
    "一个小国的政府，用棱镜的工具搭建了监控系统。埃琳娜看着新闻，握紧了拳头。", [
      { id: "A", text: "发声明谴责，并加上使用条款", outcome: "声明被转了很多次，也有人说：\"你们背叛了开源。\"", arcChange: { lifeline: -3, liability: -8 } },
      { id: "B", text: "保持沉默，开源就是开源", outcome: "你保住了原则，也保住了那个后果。", arcChange: { lifeline: 6, liability: 9 } }
    ]),
  event("SOCIALIST-H1", "H1", "socialist_power", "第一章", "山里的第十二座站",
    "站点选址有争议：建在村口方便，但占了几亩耕地；建在山后省地，但要修两个月的路。", [
      { id: "A", text: "建在村口，补偿耕地", outcome: "站点很快通电。村里的老人摸着新墙：\"这地方，以后就是学校了。\"", arcChange: { lifeline: 8, liability: 5 }, advisorId: "su", advisorAdvice: "试一试嘛，出了问题我来扛。" },
      { id: "B", text: "建在山后，先修路", outcome: "路修得很结实，通电晚了两个月，孩子们等得有点急。", arcChange: { lifeline: 4, liability: -6 }, advisorId: "lu", advisorAdvice: "算力要算，人也要算。" }
    ]),
  event("SOCIALIST-H2", "H2", "socialist_power", "第二章", "被打回来的方案",
    "苏晚照提了一份很新的方案，上级批复只有三个字：\"再研究。\"她站在走廊里，攥着文件。", [
      { id: "A", text: "帮她越级递交", outcome: "方案被再次审阅。有人说你冒进，也有人悄悄对你竖起了大拇指。", arcChange: { lifeline: 5, liability: 7 } },
      { id: "B", text: "让她先在小范围试点", outcome: "试点成功了。上级说：\"早点这么做就好了。\"苏晚照没说话。", arcChange: { lifeline: 7, liability: -4 } }
    ]),
  event("SOCIALIST-H3", "H3", "socialist_power", "第三章", "不想被夸的站长",
    "一位老站长把所有荣誉让给了下属，但报表上有一处对不上。他摆摆手：\"小事，别查了。\"", [
      { id: "A", text: "私下问清楚，不声张", outcome: "他叹了口气，把真相说了出来。你们一起把它补上了。", arcChange: { lifeline: 6, liability: -3 } },
      { id: "B", text: "按程序上报", outcome: "程序走得很稳。老站长被调走的那天，站里的孩子们围着他哭了。", arcChange: { lifeline: -5, liability: 5 } }
    ])
];

export const getFactionStoryEvents = (factionId: FactionId): readonly StoryEvent[] =>
  factionStoryEvents.filter((candidate) => candidate.factionId === factionId);

export const getChoiceArcChange = (change: FactionArcChange | undefined): FactionArcChange => change ?? {};
````

### 主线选择规则与章节配额

来源：`src/content/story-events.ts`

````ts
import type { LampId, LampTendencyState } from "./lamps";
import type { FactionId } from "@/core/models/ids";
import type { GameState } from "@/core/models/game-state";
import type { FactionArcChange } from "./faction-routes";
import { getFactionStoryEvents } from "./faction-story";
import type { AdvisorId } from "./faction-story";
import { findReactiveStoryEvent } from "./reactive-story";
import { getLampStatus } from "./lamps";
import sourceEvents from "./story-events.json";

export const storyChapters = [
  "序章", "第一章", "第二章", "第三章", "第四章", "终章"
] as const;

export type StoryChapter = typeof storyChapters[number];
export type StoryReactiveType = "resonance" | "grievance" | "crisis";

export interface StoryChoice {
  id: string;
  text: string;
  outcome: string;
  advisorId?: AdvisorId;
  advisorAdvice?: string;
  arcChange?: FactionArcChange;
}

export interface StoryEvent {
  id: string;
  displayCode?: string;
  factionId?: FactionId;
  reactiveType?: StoryReactiveType;
  perspective?: string;
  chapter: StoryChapter | "任意";
  title: string;
  description: string;
  options: readonly StoryChoice[];
}

export interface StoryProgress {
  chapterIndex: number;
  resolvedIds: readonly string[];
  choices: Readonly<Record<string, string>>;
  reactiveChapterIndexes: readonly number[];
}

interface StoryRule {
  requires?: readonly string[];
  anyRequires?: readonly string[];
  requiresChoice?: { eventId: string; choiceId: string };
  lampNotNeglected?: LampId;
}

const storyRules: Readonly<Record<string, StoryRule>> = {
  E10: { requires: ["E02"] },
  E13: { lampNotNeglected: "commons" },
  E18: { requires: ["E16"] },
  E20: { requiresChoice: { eventId: "E19", choiceId: "A" } },
  "E20′": { requiresChoice: { eventId: "E19", choiceId: "B" } },
  E21: { lampNotNeglected: "commons" },
  E22: { requires: ["E05"] },
  E24: { anyRequires: ["E03", "E17"] },
  E26: { anyRequires: ["E04", "E13"] },
  E27: { requires: ["E16", "E18"] },
  E29: { requires: ["E22"] },
  E32: { requires: ["E13"] },
  E37: { requires: ["E33"] },
  E39: { requires: ["E02"] }
};

const isChapter = (value: string): value is StoryChapter =>
  storyChapters.some((chapter) => chapter === value);

export const storyEvents: readonly StoryEvent[] = sourceEvents.map((event) => {
  if (event.chapter !== "任意" && !isChapter(event.chapter)) {
    throw new Error(`Unknown story chapter: ${event.chapter}`);
  }
  return {
    ...event,
    chapter: event.chapter,
    options: event.options.map((option) => ({ ...option }))
  };
});

export const createStoryProgress = (): StoryProgress => ({
  chapterIndex: 0,
  resolvedIds: [],
  choices: {},
  reactiveChapterIndexes: []
});

export const getStoryChapter = (progress: StoryProgress): StoryChapter =>
  storyChapters[progress.chapterIndex] ?? storyChapters[storyChapters.length - 1];

export const isStoryComplete = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  factionId?: FactionId,
  state?: GameState
): boolean =>
  progress.chapterIndex === storyChapters.length - 1
  && lamps.chapterAllocationCount > 0
  && findNextStoryEvent(progress, lamps, factionId, state) === undefined;

const matchesRule = (
  event: StoryEvent,
  progress: StoryProgress,
  lamps: LampTendencyState
): boolean => {
  const rule = storyRules[event.id];
  if (rule === undefined) return true;
  const resolved = new Set(progress.resolvedIds);

  if (rule.requires?.some((id) => !resolved.has(id))) return false;
  if (rule.anyRequires !== undefined && !rule.anyRequires.some((id) => resolved.has(id))) return false;
  if (rule.requiresChoice !== undefined
    && progress.choices[rule.requiresChoice.eventId] !== rule.requiresChoice.choiceId) return false;
  if (rule.lampNotNeglected !== undefined
    && getLampStatus(lamps.chapterTotals, rule.lampNotNeglected) === "neglected") return false;

  return true;
};

const minorQuota = [1, 1, 1, 2, 2, 1] as const;
const mainQuota = [2, 7, 7, 8, 8, 2] as const;

export const findNextStoryEvent = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  factionId?: FactionId,
  state?: GameState
): StoryEvent | undefined => {
  if (lamps.chapterAllocationCount === 0) return undefined;

  const chapter = getStoryChapter(progress);
  const resolved = new Set(progress.resolvedIds);
  const availableEvents = factionId === undefined
    ? storyEvents
    : [...storyEvents, ...getFactionStoryEvents(factionId)];
  const mainEvents = availableEvents.filter((event) =>
    event.chapter === chapter && !resolved.has(event.id) && matchesRule(event, progress, lamps)
  );
  const chapterMainCount = availableEvents.filter((event) =>
    event.chapter === chapter && resolved.has(event.id)
  ).length;
  const priorMinorQuota = minorQuota.slice(0, progress.chapterIndex).reduce<number>((sum, count) => sum + count, 0);
  const chapterMinorIds = storyEvents.filter((event) => event.chapter === "任意")
    .slice(priorMinorQuota, priorMinorQuota + minorQuota[progress.chapterIndex]);
  const pendingMinor = chapterMinorIds.find((event) => !resolved.has(event.id));
  const pendingReactive = factionId === undefined || state === undefined
    ? undefined
    : findReactiveStoryEvent(progress, lamps, state, factionId);

  if (pendingMinor !== undefined && (chapterMainCount >= 2 || mainEvents.length === 0)) {
    return pendingMinor;
  }
  if (pendingReactive !== undefined && (chapterMainCount >= 2 || mainEvents.length === 0)) {
    return pendingReactive;
  }
  if (chapterMainCount >= mainQuota[progress.chapterIndex]) return undefined;
  const pendingFactionEvent = mainEvents.find((event) => event.factionId === factionId);
  return chapterMainCount > 0 && pendingFactionEvent !== undefined ? pendingFactionEvent : mainEvents[0];
};

export const recordStoryChoice = (
  progress: StoryProgress,
  event: StoryEvent,
  choiceId: string
): StoryProgress => {
  if (progress.resolvedIds.includes(event.id) || !event.options.some((option) => option.id === choiceId)) {
    return progress;
  }

  return {
    ...progress,
    resolvedIds: [...progress.resolvedIds, event.id],
    choices: { ...progress.choices, [event.id]: choiceId },
    reactiveChapterIndexes: event.reactiveType === undefined
      ? progress.reactiveChapterIndexes
      : [...progress.reactiveChapterIndexes, progress.chapterIndex]
  };
};

export const advanceStoryChapter = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  factionId?: FactionId,
  state?: GameState
): StoryProgress => {
  if (progress.chapterIndex >= storyChapters.length - 1
    || lamps.chapterAllocationCount === 0
    || findNextStoryEvent(progress, lamps, factionId, state) !== undefined) return progress;

  return { ...progress, chapterIndex: progress.chapterIndex + 1 };
};
````

### 五灯共鸣、冷落与资源危机

来源：`src/content/reactive-story.ts`

````ts
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import { getLampStatus, type LampId, type LampTendencyState } from "./lamps";
import type { StoryEvent, StoryProgress, StoryReactiveType } from "./story-events";

interface ReactiveStoryRule {
  event: StoryEvent;
  matches: (lamps: LampTendencyState, state: GameState, factionId: FactionId) => boolean;
}

const reactiveEvent = (
  id: string,
  reactiveType: StoryReactiveType,
  title: string,
  description: string,
  triggerNote: string,
  options: StoryEvent["options"]
): StoryEvent => ({
  id,
  displayCode: id,
  chapter: "任意",
  reactiveType,
  title,
  description,
  perspective: triggerNote,
  options
});

const lampRule = (
  event: StoryEvent,
  lampId: LampId,
  status: "brightest" | "neglected"
): ReactiveStoryRule => ({
  event,
  matches: (lamps) => getLampStatus(lamps.chapterTotals, lampId) === status
});

const resonanceRules: readonly ReactiveStoryRule[] = [
  lampRule(reactiveEvent("RA1", "resonance", "订单如潮",
    "天穹送来最大的一批订单，附带一份\"优先使用条款\"。销售总监笑着说：\"这是我们的诚意。\"",
    "产业之灯持续最亮。被偏爱的产业带来收益，也开始索要优先权。", [
      { id: "A", text: "接下，并签长期合约", outcome: "账户很好看，你的名字也出现在了天穹的合同里。" },
      { id: "B", text: "只接一半，保留余地", outcome: "订单少了，但你还能说\"不\"。" }
    ]), "industry", "brightest"),
  lampRule(reactiveEvent("RA2", "resonance", "整齐的文件",
    "管委会提前一年完成了新规草案，每一页都整整齐齐。可是，没人按它做事。",
    "秩序之灯持续最亮。规则获得了资源，但落地仍需要一次选择。", [
      { id: "A", text: "推动落地试点，哪怕只在一座城", outcome: "规则第一次走出会议室，磕磕绊绊，也真的改变了些什么。" },
      { id: "B", text: "先放着，等更合适的时候", outcome: "文件被锁进抽屉。奥斯曼说：\"账不会过期，人会。\"" }
    ]), "order", "brightest"),
  lampRule(reactiveEvent("RA3", "resonance", "越来越多的手",
    "工棚里来了很多新面孔。玛尔塔看着名单，皱起了眉：其中有几个人，没人认识。",
    "工棚之灯持续最亮。队伍正在壮大，暴露的风险也跟着靠近。", [
      { id: "A", text: "敞开大门，欢迎所有人", outcome: "队伍壮大了，也多了几双看不清的眼睛。" },
      { id: "B", text: "逐个走访，慢一点接纳", outcome: "慢了一些，心里踏实。" }
    ]), "workshop", "brightest"),
  lampRule(reactiveEvent("RA4", "resonance", "热闹的社区",
    "棱镜社一夜之间多出三千个新项目，其中有一个看起来很危险，没人确定它的用途。",
    "公开之灯持续最亮。开放带来了创造力，也把危险项目推到所有人面前。", [
      { id: "A", text: "放行，相信社区自己会纠错", outcome: "社区热闹得像过节，也有人半夜睡不着。" },
      { id: "B", text: "暂缓，先请安全小组看看", outcome: "项目的作者不太高兴：\"说好的开放呢？\"" }
    ]), "commons", "brightest"),
  lampRule(reactiveEvent("RA5", "resonance", "通电的村子",
    "一个山村的用电稳定了，夜里不再摸黑。村民却说：\"能不能再多点别的？\"",
    "民生之灯持续最亮。基本生活已经改善，新的期待也随之出现。", [
      { id: "A", text: "扩展项目，加入新玩法", outcome: "村里多了一个小小的创客角，也多了一张新表格要填。" },
      { id: "B", text: "保持现状，稳最重要", outcome: "村子安静得很，孩子们看着窗外的灯，没有再问。" }
    ]), "livelihood", "brightest")
];

const grievanceRules: readonly ReactiveStoryRule[] = [
  lampRule(reactiveEvent("RB1", "grievance", "订单去哪了",
    "天穹的客户抱怨，订单迟迟没有处理。一封\"友好提醒\"送到你桌上，措辞客气，落款是卡塔琳娜。",
    "产业之灯持续被冷落。积压的订单和失去耐心的客户来敲门了。", [
      { id: "A", text: "让出一部分配额，安抚天穹", outcome: "客户满意了，别的灯暗了一格。" },
      { id: "B", text: "顶住压力，不为所动", outcome: "信被放进抽屉。第二天，几笔合作悄悄取消了。" }
    ]), "industry", "neglected"),
  lampRule(reactiveEvent("RB2", "grievance", "被推迟的听证",
    "管委会经费告急，听证会被迫推迟。曼努埃拉站在门口，笑得有些勉强：\"我们会想办法的。\"",
    "秩序之灯持续被冷落。没有资源的规则正在失去发声的场所。", [
      { id: "A", text: "补一点资源，把会办完", outcome: "听证会如期举行，座位坐满了一半。" },
      { id: "B", text: "不补，让他们自己想办法", outcome: "会议室的灯灭了。有人低声说：\"规则，也是要吃饭的。\"" }
    ]), "order", "neglected"),
  lampRule(reactiveEvent("RB3", "grievance", "冷灶",
    "工棚里的暖气坏了。有人说：\"你们只顾大事，我们也是人。\"",
    "工棚之灯持续被冷落。一线数据工作者正在为最基本的生活发问。", [
      { id: "A", text: "优先修好，暂缓别的安排", outcome: "暖气重新响起来。桑吉夫蹲在管道旁，用袖子擦了擦汗。" },
      { id: "B", text: "说明理由，承诺下一轮再补", outcome: "有人点头，有人转身。玛尔塔说：\"先让大家把话说完。\"" }
    ]), "workshop", "neglected"),
  lampRule(reactiveEvent("RB4", "grievance", "掉线的服务器",
    "棱镜的镜像库突然掉线，社群里一片问号。泽田在群里发了一句：\"我们在修。\"",
    "公开之灯持续被冷落。共享网络失去维护，社区开始自行离散。", [
      { id: "A", text: "紧急补一批算力", outcome: "服务器重新亮起，有人发来一个\"谢谢\"的表情。" },
      { id: "B", text: "让社区自己想办法", outcome: "社区开始自救，也有人悄悄退出了群。" }
    ]), "commons", "neglected"),
  lampRule(reactiveEvent("RB5", "grievance", "停摆的站",
    "一座公共算力站因供给不足停摆。老人们守在门口，手里捏着写好的药单。",
    "民生之灯持续被冷落。公共服务停摆后，等待的人已经来到门口。", [
      { id: "A", text: "立刻调配，优先恢复", outcome: "灯亮了，老人们没有欢呼，只是慢慢排起了队。" },
      { id: "B", text: "等下一轮再处理", outcome: "有人等到了，有人没有。" }
    ]), "livelihood", "neglected")
];

const getFactionResources = (state: GameState, factionId: FactionId) =>
  state.factions.find((faction) => faction.id === factionId)?.resources;

const crisisRules: readonly ReactiveStoryRule[] = [
  {
    event: reactiveEvent("RC1", "crisis", "能源见底",
      "深夜，电网报警。半座城市的灯闪了两下，然后暗了下去。",
      "可调度算力已经见底，能源供给无法同时维持所有区域。", [
        { id: "A", text: "拉闸保医院和学校", outcome: "商业区一片漆黑，直播间里有人骂，急诊室的灯没灭。" },
        { id: "B", text: "拉闸保产业，压低民用", outcome: "工厂灯火通明，居民区里有人点起了蜡烛。" }
      ]),
    matches: (_lamps, state, factionId) => (getFactionResources(state, factionId)?.compute ?? Number.POSITIVE_INFINITY) < 20
  },
  {
    event: reactiveEvent("RC2", "crisis", "账户见红",
      "账户余额变成了红色。供应商站在门口，说：\"这个月的账，得结一下。\"",
      "算力与数据储备同时偏低，当前生产余量已经无法覆盖日常支出。", [
        { id: "A", text: "变卖一部分设备，先渡过难关", outcome: "设备被搬走，机房空了一角。" },
        { id: "B", text: "向天穹借款", outcome: "钱到账了，附带一份很厚的条款。" }
      ]),
    matches: (_lamps, state, factionId) => {
      const resources = getFactionResources(state, factionId);
      return resources !== undefined && resources.compute + resources.data < 35;
    }
  },
  {
    event: reactiveEvent("RC3", "crisis", "民心跌落",
      "街头出现了手写的标语：\"我们不信你。\"有人拍下视频，转发了几十万次。",
      "所属势力稳定度已经见底，公开的不信任开始扩散。", [
        { id: "A", text: "公开检讨，承诺改正", outcome: "有人骂得更凶，也有人说：\"至少没躲。\"" },
        { id: "B", text: "强硬压下，不作回应", outcome: "视频被删了，标语却越来越多。" }
      ]),
    matches: (_lamps, state, factionId) => (getFactionResources(state, factionId)?.stability ?? Number.POSITIVE_INFINITY) < 30
  },
  {
    event: reactiveEvent("RC4", "crisis", "数据外泄",
      "一批核心数据被上传到不明位置。没人知道是谁做的，也没人知道有谁已经看过。",
      "数据供给已经见底，或全局模型漂移进入失控区间。", [
        { id: "A", text: "全面调查，公开进展", outcome: "调查很慢，公开很痛，但有人愿意留下来一起查。" },
        { id: "B", text: "转移与销毁，尽快止损", outcome: "风波暂时压下，但有些东西，永远追不回来了。" }
      ]),
    matches: (_lamps, state, factionId) =>
      (getFactionResources(state, factionId)?.data ?? Number.POSITIVE_INFINITY) < 20
      || state.globalModelDrift >= 60
  }
];

export const reactiveStoryEvents: readonly StoryEvent[] = [
  ...resonanceRules.map((rule) => rule.event),
  ...grievanceRules.map((rule) => rule.event),
  ...crisisRules.map((rule) => rule.event)
];

export const findReactiveStoryEvent = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  state: GameState,
  factionId: FactionId
): StoryEvent | undefined => {
  if (progress.reactiveChapterIndexes.includes(progress.chapterIndex)) return undefined;
  const resolved = new Set(progress.resolvedIds);
  const resolvedCrisisCount = crisisRules.filter((rule) => resolved.has(rule.event.id)).length;
  const pendingCrisis = resolvedCrisisCount >= 2
    ? undefined
    : crisisRules.find((rule) => !resolved.has(rule.event.id) && rule.matches(lamps, state, factionId));
  if (pendingCrisis !== undefined) return pendingCrisis.event;

  return [...grievanceRules, ...resonanceRules]
    .find((rule) => !resolved.has(rule.event.id) && rule.matches(lamps, state, factionId))?.event;
};
````

### 条件触发事件与数值效果

来源：`src/content/events.ts`

````ts
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
````

### 玩家行为生成的动态危机

来源：`src/content/dynamic-crises.ts`

````ts
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState, ActionPressureTag } from "@/core/systems/strategic-actions";
import type { AdvisorRelationshipState } from "./advisor-system";
import type { AdvisorTrustState } from "./faction-story";
import type { InterestPressureState } from "./interest-pressure";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";
import { applyEventEffects, type RuntimeGameEvent } from "./event-runtime";
import type { EventEffect, EventTheme, GameEventOption } from "./events";

interface DynamicCrisisContext {
  gameState: GameState;
  playerFactionId: FactionId;
  pressureState: InterestPressureState;
  actionState: StrategicActionState;
  policyState: PolicyLegacyState;
  advisorTrust: AdvisorTrustState;
  advisorRelationships: AdvisorRelationshipState;
}

interface CrisisAssessment {
  score: number;
  causes: readonly string[];
}

interface DynamicCrisisDefinition {
  id: string;
  theme: EventTheme;
  title: string;
  description: string;
  policyText: string;
  threshold: number;
  assess: (context: DynamicCrisisContext) => CrisisAssessment;
  options: readonly GameEventOption[];
}

const recentActionCount = (
  context: DynamicCrisisContext,
  tag: ActionPressureTag,
  lookback = 4
): number => context.actionState.history.filter((record) =>
  record.turn > context.gameState.turn - lookback && record.pressureTags.includes(tag)
).length;

const playerResources = (context: DynamicCrisisContext) =>
  context.gameState.factions.find((faction) => faction.id === context.playerFactionId)?.resources;

const option = (
  id: string,
  text: string,
  outcome: string,
  effects: readonly EventEffect[]
): GameEventOption => ({ id, text, outcome, effects });

const dynamicCrisisDefinitions: readonly DynamicCrisisDefinition[] = [
  {
    id: "dynamic-labor-rupture",
    theme: "labor_struggle",
    title: "无声班次",
    description: "标注、审核与清洗队伍开始同时降低工作速度。系统把它记成效率波动，但地方联络站传来的消息只有一句：人已经撑不住了。",
    policyText: "这不是一次孤立停工，而是连续动员、扩张承诺与工棚压力共同留下的政策债务。",
    threshold: 7,
    assess: (context) => {
      const pressure = context.pressureState.pressures.workshop;
      const mobilizations = recentActionCount(context, "labor-pressure");
      const growthFirst = hasPolicyTag(context.policyState, "growth-first");
      const hiddenConflict = hasPolicyTag(context.policyState, "conflict-hidden");
      return {
        score: pressure / 10 + mobilizations * 2 + (growthFirst ? 2 : 0) + (hiddenConflict ? 2 : 0),
        causes: [
          pressure >= 25 ? `工棚压力已累积至 ${pressure.toFixed(0)}` : undefined,
          mobilizations > 0 ? `近四季度进行了 ${mobilizations} 次透支式动员` : undefined,
          growthFirst ? "仍在兑现扩张优先承诺" : undefined,
          hiddenConflict ? "过去选择把内部矛盾留在暗处" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("open-collective-bargaining", "暂停强制动员，开放集体协商", "生产速度暂时下降，但数据劳动重新获得了可谈判的边界。", [
        { target: "labor_union", data: -6, stability: 10, organization: 8 },
        { target: "consortium", compute: -8 },
        { target: "global", stability: 4, modelDrift: -1 }
      ]),
      option("enforce-output-quota", "维持产量指标，替换拒绝上工的人", "报表恢复了绿色，缺失与错标却开始进入下一批训练数据。", [
        { target: "labor_union", data: 8, stability: -10 },
        { target: "consortium", compute: 6 },
        { target: "global", stability: -5, modelDrift: 4 }
      ])
    ]
  },
  {
    id: "dynamic-capacity-debt",
    theme: "compute_monopoly",
    title: "扩容之后",
    description: "新机架已经通电，数据、冷却与公共供能却没有同步增长。多个地区开始争夺同一份基础设施余量。",
    policyText: "算力扩张不会凭空完成。每一座新增集群，都把数据需求和基础设施压力转移给了别处。",
    threshold: 7,
    assess: (context) => {
      const dataDemand = recentActionCount(context, "data-demand");
      const infrastructure = recentActionCount(context, "infrastructure-pressure");
      const resources = playerResources(context);
      const imbalance = resources !== undefined && resources.compute > Math.max(40, resources.data * 2);
      const infrastructureDebt = hasPolicyTag(context.policyState, "infrastructure-debt");
      const socialPressure = Math.max(
        context.pressureState.pressures.industry,
        context.pressureState.pressures.livelihood
      );
      return {
        score: socialPressure / 12 + dataDemand * 1.5 + infrastructure * 1.5
          + (imbalance ? 2 : 0) + (infrastructureDebt ? 2 : 0),
        causes: [
          socialPressure >= 25 ? `产业或民生压力已升至 ${socialPressure.toFixed(0)}` : undefined,
          dataDemand > 0 ? `${dataDemand} 次投资扩大了数据需求` : undefined,
          infrastructure > 0 ? `${infrastructure} 次扩建挤压基础设施` : undefined,
          imbalance ? "玩家势力的算力增长已明显快于数据供给" : undefined,
          infrastructureDebt ? "快速接入承诺留下了基础设施欠账" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("ration-capacity", "冻结扩容，按社会需要重新配给", "部分订单被取消，医院、学校和基础设施先拿到了稳定配额。", [
        { target: "consortium", compute: -10, stability: -2 },
        { target: "socialist_power", stability: 7 },
        { target: "global", stability: 5, modelDrift: -2 }
      ]),
      option("secure-private-supply", "签订排他供应协议，维持扩张", "核心集群继续增长，其他地区只能在更高价格下等待剩余资源。", [
        { target: "consortium", compute: 10, data: -8 },
        { target: "socialist_power", stability: -7 },
        { target: "global", stability: -5, modelDrift: 3 }
      ])
    ]
  },
  {
    id: "dynamic-trust-blackout",
    theme: "data_leak",
    title: "无人相信的公告",
    description: "三份互相矛盾的事故说明同时流出。顾问、地方节点和公众不再争论哪一份正确，而是怀疑所有版本都在隐藏什么。",
    policyText: "信息危机并非突然发生。被压下的分歧、被拒绝的警告与无法兑现的公开承诺，最终让事实失去共同入口。",
    threshold: 7,
    assess: (context) => {
      const pressure = context.pressureState.pressures.commons;
      const rejections = context.advisorRelationships.history.filter((record) =>
        record.turn > context.gameState.turn - 4 && record.reason === "advice-rejected"
      ).length;
      const marginalizedAdvisor = Object.values(context.advisorTrust).some((trust) => trust <= -12);
      const concealed = hasPolicyTag(context.policyState, "conflict-hidden")
        || hasPolicyTag(context.policyState, "corporate-reliance")
        || hasPolicyTag(context.policyState, "provenance-deferred");
      const brokenPromises = context.policyState.records.filter((record) => record.status === "broken").length;
      return {
        score: pressure / 10 + Math.min(3, rejections * 0.75) + (marginalizedAdvisor ? 2 : 0)
          + (concealed ? 2 : 0) + brokenPromises * 1.5,
        causes: [
          pressure >= 25 ? `公开压力已累积至 ${pressure.toFixed(0)}` : undefined,
          rejections > 0 ? `近四季度留下 ${rejections} 次顾问意见落空记录` : undefined,
          marginalizedAdvisor ? "至少一名顾问因长期被忽视而停止充分共享信息" : undefined,
          concealed ? "过去的政策选择削弱了可追溯性" : undefined,
          brokenPromises > 0 ? `${brokenPromises} 项历史承诺已经被撕毁` : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("publish-evidence-chain", "公开证据链，接受独立复核", "公告不再整齐，但不同地区终于能够核对同一组事实。", [
        { target: "independent_labs", data: -5, stability: 7 },
        { target: "sovereign", stability: 4 },
        { target: "global", stability: 4, modelDrift: -4 }
      ]),
      option("centralize-message", "封存原始记录，统一对外口径", "争议暂时从屏幕上消失，地方节点却开始建立自己的消息渠道。", [
        { target: "sovereign", stability: -6 },
        { target: "global", stability: -6, modelDrift: 4 }
      ])
    ]
  },
  {
    id: "dynamic-coordination-gridlock",
    theme: "open_source_commons",
    title: "所有人都在等批复",
    description: "跨地区协作进入停滞。每个部门都能指出风险，却没有任何一方愿意承担先行动的责任。",
    policyText: "秩序只有在能够协调真实利益时才有作用。反复协商却不兑现，会把规则本身变成新的政策债务。",
    threshold: 7,
    assess: (context) => {
      const pressure = context.pressureState.pressures.order;
      const commitments = recentActionCount(context, "commitment-risk");
      const lowStability = context.gameState.globalStability < 45;
      const rejectedInstitution = context.advisorRelationships.history.filter((record) =>
        record.turn > context.gameState.turn - 4
        && record.reason === "advice-rejected"
        && (record.advisorId === "lu" || record.advisorId === "osman")
      ).length;
      return {
        score: pressure / 10 + commitments * 1.5 + (lowStability ? 2 : 0) + rejectedInstitution * 1.5,
        causes: [
          pressure >= 25 ? `秩序压力已累积至 ${pressure.toFixed(0)}` : undefined,
          commitments > 0 ? `${commitments} 次协商承诺仍待兑现` : undefined,
          lowStability ? "全局稳定度已跌破协调警戒线" : undefined,
          rejectedInstitution > 0 ? "流程与审计顾问的警告曾被连续搁置" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("temporary-joint-command", "成立临时联合调度席", "各方让出一部分控制权，换来一套能够执行的临时规则。", [
        { target: "sovereign", compute: -4, stability: 8 },
        { target: "global", stability: 5, modelDrift: -1 }
      ]),
      option("return-local-control", "退回地方自行处理", "批复不再堵塞，地区间的标准却开始迅速分裂。", [
        { target: "sovereign", compute: 4, stability: -7 },
        { target: "global", stability: -4, modelDrift: 3 }
      ])
    ]
  },
  {
    id: "dynamic-model-feedback-loop",
    theme: "model_drift",
    title: "模型开始引用自己",
    description: "多个政策模型给出了高度一致的建议。审计人员随后发现，它们的训练数据都来自上一轮模型生成的预测，而不是现实记录。",
    policyText: "模型漂移不是第二条生命值。错误判断进入政策，政策改变社会，新数据再把错误判断包装成现实。",
    threshold: 7,
    assess: (context) => {
      const drift = context.gameState.globalModelDrift;
      const commonsPressure = context.pressureState.pressures.commons;
      const audits = context.actionState.history.filter((record) =>
        record.turn > context.gameState.turn - 4 && record.type === "audit"
      ).length;
      const investigated = context.actionState.investigatedRegionIds.length;
      const provenanceDeferred = hasPolicyTag(context.policyState, "provenance-deferred")
        || hasPolicyTag(context.policyState, "resource-first");
      return {
        score: drift / 4 + commonsPressure / 20 + (audits === 0 ? 1.5 : -audits)
          + (investigated === 0 ? 1 : 0) + (provenanceDeferred ? 2 : 0),
        causes: [
          drift >= 15 ? `全局模型漂移已升至 ${drift.toFixed(1)}` : undefined,
          commonsPressure >= 25 ? "公开与审计压力正在削弱数据可信度" : undefined,
          audits === 0 ? "近四季度没有执行模型审计" : undefined,
          investigated === 0 ? "尚无地区异常调查记录" : undefined,
          provenanceDeferred ? "历史政策允许来源不明的数据进入系统" : undefined
        ].filter((cause): cause is string => cause !== undefined)
      };
    },
    options: [
      option("interrupt-model-loop", "暂停自动决策，回到现场采样", "部分系统转入人工维持，模型第一次重新接触未经自己加工的现实。", [
        { target: "consortium", compute: -8 },
        { target: "independent_labs", data: -6, stability: 5 },
        { target: "global", stability: 3, modelDrift: -9 }
      ]),
      option("trust-model-consensus", "维持自动决策，相信多数模型", "执行效率短暂提高，错误却以一致意见的形式扩散到更多地区。", [
        { target: "consortium", compute: 10, data: -8 },
        { target: "global", stability: -7, modelDrift: 8 }
      ])
    ]
  }
];

export const getDynamicCrisisDecisionLabel = (
  eventId: string,
  optionId: string
): { eventTitle: string; optionText: string } | undefined => {
  const crisis = dynamicCrisisDefinitions.find((definition) => definition.id === eventId);
  const selectedOption = crisis?.options.find((candidate) => candidate.id === optionId);
  return crisis === undefined || selectedOption === undefined
    ? undefined
    : { eventTitle: crisis.title, optionText: selectedOption.text };
};

const toRuntimeCrisis = (
  definition: DynamicCrisisDefinition,
  assessment: CrisisAssessment
): RuntimeGameEvent => ({
  id: definition.id,
  origin: "dynamic",
  theme: definition.theme,
  title: definition.title,
  description: definition.description,
  policyText: definition.policyText,
  trigger: {
    description: `因果评分 ${assessment.score.toFixed(1)}。${assessment.causes.join("；")}。`,
    all: [],
    matches: () => true
  },
  options: definition.options.map((eventOption) => ({
    ...eventOption,
    effect: (state) => applyEventEffects(state, eventOption.effects)
  }))
});

export const findTriggeredDynamicCrisis = (
  context: DynamicCrisisContext,
  resolvedEventIds: ReadonlySet<string>
): RuntimeGameEvent | undefined => {
  const candidate = dynamicCrisisDefinitions
    .filter((definition) => !resolvedEventIds.has(definition.id))
    .map((definition) => ({ definition, assessment: definition.assess(context) }))
    .filter(({ definition, assessment }) => assessment.score >= definition.threshold)
    .sort((left, right) => right.assessment.score - left.assessment.score)[0];
  return candidate === undefined
    ? undefined
    : toRuntimeCrisis(candidate.definition, candidate.assessment);
};
````

### 历史承诺与兑现/背离

来源：`src/content/policy-legacies.ts`

````ts
import type { LampId } from "./lamps";

export type PolicyLegacyStatus = "active" | "honored" | "broken" | "superseded";

export interface PolicyLegacyDefinition {
  id: string;
  title: string;
  description: string;
  direction: LampId;
  tags: readonly string[];
  sourceEventId: string;
  sourceChoiceId: string;
}

export interface PolicyLegacyRecord {
  id: string;
  status: PolicyLegacyStatus;
  sourceEventId: string;
  sourceChoiceId: string;
  createdAtTurn: number;
  updatedAtTurn: number;
}

export interface PolicyLegacyState {
  records: readonly PolicyLegacyRecord[];
}

interface PolicyResolution {
  id: string;
  status: Exclude<PolicyLegacyStatus, "active">;
}

interface PolicyChoiceTransition {
  create?: string;
  resolve?: readonly PolicyResolution[];
}

const definitions: readonly PolicyLegacyDefinition[] = [
  {
    id: "consortium-deadline-first",
    title: "扩张优先",
    description: "你承诺先兑现算力扩张，再处理安全与劳动代价。",
    direction: "industry",
    tags: ["growth-first", "safety-deferred"],
    sourceEventId: "CONSORTIUM-T1",
    sourceChoiceId: "A"
  },
  {
    id: "consortium-safety-first",
    title: "安全先于期限",
    description: "你承诺不再用上线期限交换系统安全。",
    direction: "order",
    tags: ["safety-first", "growth-restrained"],
    sourceEventId: "CONSORTIUM-T1",
    sourceChoiceId: "B"
  },
  {
    id: "sovereign-public-legitimacy",
    title: "公开听证",
    description: "你承诺依靠公众参与建立规则的正当性。",
    direction: "commons",
    tags: ["public-legitimacy", "corporate-distance"],
    sourceEventId: "SOVEREIGN-C1",
    sourceChoiceId: "A"
  },
  {
    id: "sovereign-sponsored-access",
    title: "借力资本",
    description: "你接受以企业资源换取制度继续运转。",
    direction: "industry",
    tags: ["corporate-reliance", "access-first"],
    sourceEventId: "SOVEREIGN-C1",
    sourceChoiceId: "B"
  },
  {
    id: "labor-collective-accountability",
    title: "共同问责",
    description: "你承诺让错误在集体中被看见、讨论和承担。",
    direction: "workshop",
    tags: ["collective-accountability", "labor-voice"],
    sourceEventId: "LABOR-S1",
    sourceChoiceId: "A"
  },
  {
    id: "labor-private-solidarity",
    title: "内部消化",
    description: "你承诺优先维护队伍感情，把矛盾留在内部处理。",
    direction: "workshop",
    tags: ["informal-solidarity", "conflict-hidden"],
    sourceEventId: "LABOR-S1",
    sourceChoiceId: "B"
  },
  {
    id: "prism-resource-first",
    title: "资源先行",
    description: "你接受来源不明的支持，承诺先让公共技术活下去。",
    direction: "industry",
    tags: ["resource-first", "provenance-deferred"],
    sourceEventId: "PRISM-P1",
    sourceChoiceId: "A"
  },
  {
    id: "prism-source-audit",
    title: "来源可追溯",
    description: "你承诺在使用资源之前先确认它从哪里来。",
    direction: "commons",
    tags: ["audit-first", "provenance-required"],
    sourceEventId: "PRISM-P1",
    sourceChoiceId: "B"
  },
  {
    id: "socialist-fast-access",
    title: "先让服务落地",
    description: "你承诺优先让公共算力尽快抵达需要它的人。",
    direction: "livelihood",
    tags: ["access-first", "infrastructure-debt"],
    sourceEventId: "SOCIALIST-H1",
    sourceChoiceId: "A"
  },
  {
    id: "socialist-infrastructure-first",
    title: "基础设施先行",
    description: "你承诺先打牢长期基础，即使眼前服务需要等待。",
    direction: "order",
    tags: ["infrastructure-first", "access-deferred"],
    sourceEventId: "SOCIALIST-H1",
    sourceChoiceId: "B"
  }
] as const;

export const policyLegacyDefinitions: Readonly<Record<string, PolicyLegacyDefinition>> =
  Object.fromEntries(definitions.map((definition) => [definition.id, definition]));

const transitionKey = (eventId: string, choiceId: string): string => `${eventId}:${choiceId}`;

const transitions: Readonly<Record<string, PolicyChoiceTransition>> = {
  "CONSORTIUM-T1:A": { create: "consortium-deadline-first" },
  "CONSORTIUM-T1:B": { create: "consortium-safety-first" },
  "CONSORTIUM-T3:A": { resolve: [
    { id: "consortium-deadline-first", status: "broken" },
    { id: "consortium-safety-first", status: "honored" }
  ] },
  "CONSORTIUM-T3:B": { resolve: [
    { id: "consortium-deadline-first", status: "honored" },
    { id: "consortium-safety-first", status: "broken" }
  ] },
  "SOVEREIGN-C1:A": { create: "sovereign-public-legitimacy" },
  "SOVEREIGN-C1:B": { create: "sovereign-sponsored-access" },
  "SOVEREIGN-C3:A": { resolve: [
    { id: "sovereign-public-legitimacy", status: "honored" },
    { id: "sovereign-sponsored-access", status: "broken" }
  ] },
  "SOVEREIGN-C3:B": { resolve: [
    { id: "sovereign-public-legitimacy", status: "broken" },
    { id: "sovereign-sponsored-access", status: "honored" }
  ] },
  "LABOR-S1:A": { create: "labor-collective-accountability" },
  "LABOR-S1:B": { create: "labor-private-solidarity" },
  "LABOR-S3:A": { resolve: [
    { id: "labor-collective-accountability", status: "honored" },
    { id: "labor-private-solidarity", status: "broken" }
  ] },
  "LABOR-S3:B": { resolve: [
    { id: "labor-collective-accountability", status: "broken" },
    { id: "labor-private-solidarity", status: "honored" }
  ] },
  "PRISM-P1:A": { create: "prism-resource-first" },
  "PRISM-P1:B": { create: "prism-source-audit" },
  "PRISM-P3:A": { resolve: [
    { id: "prism-resource-first", status: "broken" },
    { id: "prism-source-audit", status: "honored" }
  ] },
  "PRISM-P3:B": { resolve: [
    { id: "prism-resource-first", status: "honored" },
    { id: "prism-source-audit", status: "broken" }
  ] },
  "SOCIALIST-H1:A": { create: "socialist-fast-access" },
  "SOCIALIST-H1:B": { create: "socialist-infrastructure-first" },
  "SOCIALIST-H3:A": { resolve: [
    { id: "socialist-fast-access", status: "honored" },
    { id: "socialist-infrastructure-first", status: "broken" }
  ] },
  "SOCIALIST-H3:B": { resolve: [
    { id: "socialist-fast-access", status: "broken" },
    { id: "socialist-infrastructure-first", status: "honored" }
  ] }
};

export const createPolicyLegacyState = (): PolicyLegacyState => ({ records: [] });

export const applyPolicyChoice = (
  state: PolicyLegacyState,
  eventId: string,
  choiceId: string,
  turn: number
): PolicyLegacyState => {
  const transition = transitions[transitionKey(eventId, choiceId)];
  if (transition === undefined) return state;

  let changed = false;
  let records = state.records.map((record) => {
    const resolution = transition.resolve?.find((candidate) => candidate.id === record.id);
    if (resolution === undefined || record.status !== "active") return record;
    changed = true;
    return { ...record, status: resolution.status, updatedAtTurn: turn };
  });

  if (transition.create !== undefined && !records.some((record) => record.id === transition.create)) {
    const definition = policyLegacyDefinitions[transition.create];
    if (definition !== undefined) {
      records = [...records, {
        id: definition.id,
        status: "active",
        sourceEventId: eventId,
        sourceChoiceId: choiceId,
        createdAtTurn: turn,
        updatedAtTurn: turn
      }];
      changed = true;
    }
  }

  return changed ? { records } : state;
};

export const hasPolicyTag = (
  state: PolicyLegacyState,
  tag: string,
  statuses: readonly PolicyLegacyStatus[] = ["active", "honored"]
): boolean => state.records.some((record) => {
  const definition = policyLegacyDefinitions[record.id];
  return definition !== undefined && statuses.includes(record.status) && definition.tags.includes(tag);
});

export const getActivePolicyLegacies = (state: PolicyLegacyState): readonly PolicyLegacyRecord[] =>
  state.records.filter((record) => record.status === "active");

export const getPolicyLegacyEcho = (
  state: PolicyLegacyState,
  eventId: string
): PolicyLegacyDefinition | undefined => {
  const eventPrefix = eventId.split("-")[0];
  const record = state.records.find((candidate) =>
    candidate.status === "active"
    && candidate.sourceEventId !== eventId
    && candidate.sourceEventId.startsWith(`${eventPrefix}-`)
  );
  return record === undefined ? undefined : policyLegacyDefinitions[record.id];
};

export const getPolicyChoiceNotice = (eventId: string, choiceId: string): string | undefined => {
  const transition = transitions[transitionKey(eventId, choiceId)];
  if (transition?.create !== undefined) {
    const definition = policyLegacyDefinitions[transition.create];
    return definition === undefined ? undefined : `形成历史承诺：${definition.title}`;
  }
  if (transition?.resolve !== undefined) return "旧承诺已被重新解释，未来事件将记住这次兑现或背离。";
  return undefined;
};

export const isPolicyLegacyState = (value: unknown): value is PolicyLegacyState => {
  if (typeof value !== "object" || value === null || !("records" in value) || !Array.isArray(value.records)) {
    return false;
  }
  return value.records.every((record) => {
    if (typeof record !== "object" || record === null) return false;
    const candidate = record as Record<string, unknown>;
    return typeof candidate.id === "string"
      && policyLegacyDefinitions[candidate.id] !== undefined
      && ["active", "honored", "broken", "superseded"].includes(String(candidate.status))
      && typeof candidate.sourceEventId === "string"
      && typeof candidate.sourceChoiceId === "string"
      && Number.isInteger(candidate.createdAtTurn)
      && Number.isInteger(candidate.updatedAtTurn);
  });
};
````

### 顾问立场、信息失真与信任

来源：`src/content/advisor-system.ts`

````ts
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState } from "@/core/systems/strategic-actions";
import type { InterestPressureState, InterestPressureLevel } from "./interest-pressure";
import { getInterestPressureLevel } from "./interest-pressure";
import type { LampId } from "./lamps";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";
import {
  getFactionAdvisors,
  type AdvisorId,
  type AdvisorProfile,
  type AdvisorTrustState
} from "./faction-story";
import type { StoryChoice, StoryEvent } from "./story-events";

export type AdvisorSignal = "open" | "partial" | "model-mediated";

export interface AdvisorDisposition {
  interest: LampId;
  stance: string;
  bias: "cautious" | "expansionist" | "institutional" | "participatory";
  preferredTags: readonly string[];
  opposedTags: readonly string[];
}

export interface AdvisorRelationshipRecord {
  turn: number;
  eventId: string;
  advisorId: AdvisorId;
  delta: number;
  reason: "advice-followed" | "advice-rejected";
}

export interface AdvisorRelationshipState {
  history: readonly AdvisorRelationshipRecord[];
}

export interface AdvisorBriefing {
  advisor: AdvisorProfile;
  interest: LampId;
  stance: string;
  signal: AdvisorSignal;
  message: string;
  evidence?: string;
}

export interface AdvisorDecisionResult {
  trust: AdvisorTrustState;
  relationships: AdvisorRelationshipState;
}

export const advisorDispositions: Readonly<Record<AdvisorId, AdvisorDisposition>> = {
  aditya: {
    interest: "industry",
    stance: "先保住生产连续性，再谈扩张速度。",
    bias: "cautious",
    preferredTags: ["safety-first"],
    opposedTags: ["growth-first"]
  },
  park: {
    interest: "industry",
    stance: "市场信心和扩张窗口不能等待。",
    bias: "expansionist",
    preferredTags: ["growth-first"],
    opposedTags: ["growth-restrained"]
  },
  manuela: {
    interest: "order",
    stance: "规则必须让普通人看见并参与。",
    bias: "participatory",
    preferredTags: ["public-legitimacy"],
    opposedTags: ["corporate-reliance"]
  },
  osman: {
    interest: "commons",
    stance: "没有证据链的承诺不能写进制度。",
    bias: "cautious",
    preferredTags: ["audit-first", "provenance-required"],
    opposedTags: ["corporate-reliance"]
  },
  marta: {
    interest: "workshop",
    stance: "先确认一线劳动者是否真的愿意承担。",
    bias: "participatory",
    preferredTags: ["labor-voice", "collective-accountability"],
    opposedTags: ["conflict-hidden"]
  },
  tanya: {
    interest: "workshop",
    stance: "窗口很短，组织必须先行动起来。",
    bias: "expansionist",
    preferredTags: ["informal-solidarity"],
    opposedTags: ["access-deferred"]
  },
  sawada: {
    interest: "commons",
    stance: "来源、用途和失败方式都必须能够复核。",
    bias: "cautious",
    preferredTags: ["audit-first", "provenance-required"],
    opposedTags: ["resource-first"]
  },
  adeola: {
    interest: "commons",
    stance: "公开本身就是让社区参与纠错的方法。",
    bias: "participatory",
    preferredTags: ["public-legitimacy", "resource-first"],
    opposedTags: ["conflict-hidden"]
  },
  lu: {
    interest: "order",
    stance: "长期系统必须经得起流程和维护周期。",
    bias: "institutional",
    preferredTags: ["infrastructure-first"],
    opposedTags: ["infrastructure-debt"]
  },
  su: {
    interest: "livelihood",
    stance: "先让服务抵达现场，再从现场修正方案。",
    bias: "participatory",
    preferredTags: ["access-first"],
    opposedTags: ["access-deferred"]
  }
};

const interestNames: Record<LampId, string> = {
  industry: "产业",
  order: "秩序",
  workshop: "工棚",
  commons: "公开",
  livelihood: "民生"
};

const pressureDescriptions: Record<InterestPressureLevel, string> = {
  stable: "目前仍在可控范围",
  strained: "已经出现持续压力",
  crisis: "正在进入结构性危机",
  breaking: "接近不可逆的断裂"
};

const signalLabels: Record<AdvisorSignal, string> = {
  open: "完整陈述",
  partial: "保留意见",
  "model-mediated": "模型转述"
};

export const getAdvisorSignalLabel = (signal: AdvisorSignal): string => signalLabels[signal];

export const createAdvisorRelationshipState = (): AdvisorRelationshipState => ({ history: [] });

const deterministicDistortion = (advisorId: AdvisorId, eventId: string, drift: number): boolean => {
  if (drift < 20) return false;
  const hash = [...`${advisorId}:${eventId}`].reduce((total, character) => total + character.charCodeAt(0), 0);
  return hash % 100 < Math.min(70, drift);
};

const latestCause = (state: InterestPressureState, interest: LampId): string | undefined =>
  [...state.history].reverse().find((record) => record.lampId === interest)?.causes.at(-1);

const relationshipSignal = (trust: number, distorted: boolean): AdvisorSignal => {
  if (distorted) return "model-mediated";
  return trust < 0 ? "partial" : "open";
};

const policyAlignment = (policies: PolicyLegacyState, disposition: AdvisorDisposition): string | undefined => {
  const preferred = disposition.preferredTags.find((tag) => hasPolicyTag(policies, tag));
  if (preferred !== undefined) return "这与我们此前留下的承诺方向一致。";
  const opposed = disposition.opposedTags.find((tag) => hasPolicyTag(policies, tag));
  if (opposed !== undefined) return "这会再次触碰我们过去没有解决的承诺。";
  return undefined;
};

const driftInterpretation = (disposition: AdvisorDisposition, distorted: boolean): string => {
  if (!distorted) return disposition.stance;
  if (disposition.bias === "expansionist") return "模型把异常判断为短期噪声，我认为不必因此停下当前计划。";
  if (disposition.bias === "institutional") return "模型报告存在缺页，在补齐流程前我不会给出肯定结论。";
  if (disposition.bias === "participatory") return "模型无法解释现场反馈，我更愿意相信仍在系统外的人。";
  return "当前模型读数可能已经偏离现实，最安全的结论是暂不相信任何单一指标。";
};

export const createAdvisorBriefings = (
  event: StoryEvent,
  factionId: FactionId,
  trust: AdvisorTrustState,
  relationships: AdvisorRelationshipState,
  pressureState: InterestPressureState,
  gameState: GameState,
  policies: PolicyLegacyState,
  actions: StrategicActionState
): readonly AdvisorBriefing[] => getFactionAdvisors(factionId).map((advisor) => {
  const disposition = advisorDispositions[advisor.id];
  const pressure = pressureState.pressures[disposition.interest];
  const level = getInterestPressureLevel(pressure);
  const distorted = deterministicDistortion(advisor.id, event.id, gameState.globalModelDrift);
  const signal = relationshipSignal(trust[advisor.id], distorted);
  const alignment = policyAlignment(policies, disposition);
  const priorRejection = [...relationships.history].reverse()
    .find((record) => record.advisorId === advisor.id && record.reason === "advice-rejected");
  const relationshipNote = priorRejection === undefined
    ? undefined
    : "上一次我的意见被放在了一边，这次我只说能够确认的部分。";
  const investigated = actions.investigatedRegionIds.length > 0;
  const cause = latestCause(pressureState, disposition.interest);
  const evidence = trust[advisor.id] >= 20 && cause !== undefined
    ? `内部记录指向：${cause}。`
    : investigated
      ? `调查记录覆盖 ${actions.investigatedRegionIds.length} 个基础设施区域，但尚不足以排除利益偏差。`
      : undefined;
  const message = [
    `${interestNames[disposition.interest]}方向${pressureDescriptions[level]}。`,
    driftInterpretation(disposition, distorted),
    alignment,
    signal === "partial" ? relationshipNote : undefined
  ].filter((part): part is string => part !== undefined).join(" ");
  return { advisor, interest: disposition.interest, stance: disposition.stance, signal, message, evidence };
});

const clampTrust = (value: number): number => Math.min(100, Math.max(-100, value));

export const resolveAdvisorDecision = (
  trust: AdvisorTrustState,
  relationships: AdvisorRelationshipState,
  factionId: FactionId,
  event: StoryEvent,
  choice: StoryChoice,
  turn: number
): AdvisorDecisionResult => {
  if (choice.advisorId === undefined) return { trust, relationships };
  const factionAdvisors = getFactionAdvisors(factionId);
  const records: AdvisorRelationshipRecord[] = [];
  const nextTrust = { ...trust };
  for (const advisor of factionAdvisors) {
    const followed = advisor.id === choice.advisorId;
    const delta = followed ? 10 : -4;
    nextTrust[advisor.id] = clampTrust(nextTrust[advisor.id] + delta);
    records.push({
      turn,
      eventId: event.id,
      advisorId: advisor.id,
      delta,
      reason: followed ? "advice-followed" : "advice-rejected"
    });
  }
  return { trust: nextTrust, relationships: { history: [...relationships.history, ...records] } };
};

export const isAdvisorRelationshipState = (value: unknown): value is AdvisorRelationshipState => {
  if (typeof value !== "object" || value === null || !("history" in value) || !Array.isArray(value.history)) {
    return false;
  }
  return value.history.every((record) => {
    if (typeof record !== "object" || record === null) return false;
    const candidate = record as Record<string, unknown>;
    return Number.isInteger(candidate.turn)
      && typeof candidate.eventId === "string"
      && typeof candidate.advisorId === "string"
      && candidate.advisorId in advisorDispositions
      && typeof candidate.delta === "number"
      && (candidate.reason === "advice-followed" || candidate.reason === "advice-rejected");
  });
};
````

### 五灯定义

来源：`src/content/lamps.ts`

````ts
import type { FactionId } from "@/core/models/ids";

export type LampId = "industry" | "order" | "workshop" | "commons" | "livelihood";

export type LampAllocation = Record<LampId, number>;

export type LampStatus = "brightest" | "steady" | "neglected";

export interface LampDefinition {
  id: LampId;
  factionId: FactionId;
  name: string;
  shortName: string;
  description: string;
  tone: "lime" | "orange" | "cyan" | "pink" | "red";
}

export interface LampTendencyState {
  current: LampAllocation;
  chapterTotals: LampAllocation;
  globalTotals: LampAllocation;
  chapterAllocationCount: number;
  allocationCount: number;
}

export const lampDefinitions: readonly LampDefinition[] = [
  {
    id: "industry",
    factionId: "consortium",
    name: "产业之灯",
    shortName: "产业",
    description: "工厂、订单、商店的生意。灯亮，钱来得快。",
    tone: "lime"
  },
  {
    id: "order",
    factionId: "sovereign",
    name: "秩序之灯",
    shortName: "秩序",
    description: "听证、审计、规则。灯亮，事情慢一点，但更讲理。",
    tone: "orange"
  },
  {
    id: "workshop",
    factionId: "labor_union",
    name: "工棚之灯",
    shortName: "工棚",
    description: "工人的互助、夜班、地下库。灯亮，人心暖，也容易被盯上。",
    tone: "cyan"
  },
  {
    id: "commons",
    factionId: "independent_labs",
    name: "公开之灯",
    shortName: "公开",
    description: "开源、教育、共享。灯亮，点子多，也容易被滥用。",
    tone: "pink"
  },
  {
    id: "livelihood",
    factionId: "socialist_power",
    name: "民生之灯",
    shortName: "民生",
    description: "医院、学校、养老。灯亮，日子稳，但花钱慢。",
    tone: "red"
  }
] as const;

export const lampStatusLabels: Record<LampStatus, string> = {
  brightest: "灯火通明",
  steady: "灯光尚稳",
  neglected: "灯影摇晃"
};

export const LAMP_ALLOCATION_TOTAL = 100;

const lampIds = lampDefinitions.map((lamp) => lamp.id);

const createEmptyAllocation = (): LampAllocation => ({
  industry: 0,
  order: 0,
  workshop: 0,
  commons: 0,
  livelihood: 0
});

export const createEqualLampAllocation = (): LampAllocation => ({
  industry: 20,
  order: 20,
  workshop: 20,
  commons: 20,
  livelihood: 20
});

export const createLampTendencyState = (): LampTendencyState => ({
  current: createEqualLampAllocation(),
  chapterTotals: createEmptyAllocation(),
  globalTotals: createEmptyAllocation(),
  chapterAllocationCount: 0,
  allocationCount: 0
});

export const getAllocationTotal = (allocation: LampAllocation): number =>
  lampIds.reduce((total, lampId) => total + allocation[lampId], 0);

export const isValidLampAllocation = (allocation: LampAllocation): boolean =>
  getAllocationTotal(allocation) === LAMP_ALLOCATION_TOTAL
  && lampIds.every((lampId) => Number.isInteger(allocation[lampId]) && allocation[lampId] >= 0);

const addAllocation = (
  totals: LampAllocation,
  allocation: LampAllocation
): LampAllocation => lampIds.reduce<LampAllocation>((nextTotals, lampId) => ({
  ...nextTotals,
  [lampId]: totals[lampId] + allocation[lampId]
}), createEmptyAllocation());

export const recordLampAllocation = (
  state: LampTendencyState,
  allocation: LampAllocation
): LampTendencyState => {
  if (!isValidLampAllocation(allocation)) return state;

  return {
    current: { ...allocation },
    chapterTotals: addAllocation(state.chapterTotals, allocation),
    globalTotals: addAllocation(state.globalTotals, allocation),
    chapterAllocationCount: state.chapterAllocationCount + 1,
    allocationCount: state.allocationCount + 1
  };
};

export const beginLampChapter = (state: LampTendencyState): LampTendencyState => ({
  ...state,
  chapterTotals: createEmptyAllocation(),
  chapterAllocationCount: 0
});

export const getLampShare = (totals: LampAllocation, lampId: LampId): number => {
  const total = getAllocationTotal(totals);
  return total === 0 ? 0 : totals[lampId] / total * 100;
};

export const getLampStatus = (totals: LampAllocation, lampId: LampId): LampStatus => {
  if (getAllocationTotal(totals) === 0) return "steady";

  const share = getLampShare(totals, lampId);
  const highestShare = Math.max(...lampIds.map((id) => getLampShare(totals, id)));

  if (share >= 25 && share === highestShare) return "brightest";
  if (share <= 10) return "neglected";
  return "steady";
};
````

### 利益压力与社会反馈

来源：`src/content/interest-pressure.ts`

````ts
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState, ActionPressureTag } from "@/core/systems/strategic-actions";
import type { LampId, LampTendencyState } from "./lamps";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";

export type InterestPressureLevel = "stable" | "strained" | "crisis" | "breaking";

export interface InterestPressureRecord {
  turn: number;
  lampId: LampId;
  before: number;
  after: number;
  allocation: number;
  causes: readonly string[];
}

export interface InterestPressureState {
  turn: number;
  pressures: Record<LampId, number>;
  history: readonly InterestPressureRecord[];
}

export interface InterestFeedback {
  lampId: LampId;
  level: InterestPressureLevel;
  pressure: number;
  delta: number;
  summary: string;
}

export interface InterestSettlement {
  gameState: GameState;
  pressureState: InterestPressureState;
  feedback: readonly InterestFeedback[];
}

const lampIds: readonly LampId[] = ["industry", "order", "workshop", "commons", "livelihood"];

const emptyPressures = (): Record<LampId, number> => ({
  industry: 0,
  order: 0,
  workshop: 0,
  commons: 0,
  livelihood: 0
});

const clamp = (value: number, minimum = 0, maximum = 100): number =>
  Math.min(maximum, Math.max(minimum, value));

const allocationDelta = (allocation: number): number => {
  if (allocation >= 25) return -4;
  if (allocation >= 18) return -1;
  if (allocation >= 11) return 4;
  return 8;
};

const actionPressure = (
  tags: ReadonlySet<ActionPressureTag>,
  lampId: LampId
): { delta: number; causes: string[] } => {
  let delta = 0;
  const causes: string[] = [];
  const add = (tag: ActionPressureTag, amount: number, label: string) => {
    if (!tags.has(tag)) return;
    delta += amount;
    causes.push(label);
  };

  if (lampId === "industry") add("innovation-delay", 3, "审计延缓扩张");
  if (lampId === "order") {
    add("exposure-risk", 2, "问题公开造成制度震荡");
    add("commitment-risk", 1, "协商形成兑现压力");
  }
  if (lampId === "workshop") {
    add("labor-pressure", 6, "动员透支劳动");
    add("data-demand", 2, "新增产能扩大数据需求");
  }
  if (lampId === "commons") add("commitment-risk", 1, "社会开始追问协商结果");
  if (lampId === "livelihood") add("infrastructure-pressure", 3, "扩建挤压公共基础设施");
  return { delta, causes };
};

const legacyPressure = (
  policies: PolicyLegacyState,
  lampId: LampId
): { delta: number; causes: string[] } => {
  let delta = 0;
  const causes: string[] = [];
  const add = (tag: string, amount: number, label: string) => {
    if (!hasPolicyTag(policies, tag)) return;
    delta += amount;
    causes.push(label);
  };

  if (lampId === "industry") {
    add("safety-first", 1, "安全承诺约束扩张");
    add("access-first", 1, "公共服务优先占用产能");
  }
  if (lampId === "order") {
    add("safety-first", -1, "安全承诺支撑秩序");
    add("infrastructure-first", -1, "长期建设降低执行压力");
  }
  if (lampId === "workshop") {
    add("growth-first", 2, "扩张优先挤压劳动条件");
    add("labor-voice", -1, "共同问责释放劳动压力");
  }
  if (lampId === "commons") {
    add("public-legitimacy", -1, "公开听证维持社会信任");
    add("audit-first", -1, "来源审计维持可追溯性");
    add("corporate-reliance", 2, "企业依赖削弱公共信任");
    add("resource-first", 2, "来源不明的资源积累质疑");
  }
  if (lampId === "livelihood") {
    add("growth-first", 1, "扩张优先推迟公共投入");
    add("access-first", -1, "服务优先缓解民生等待");
    add("access-deferred", 2, "长期建设延后眼前服务");
  }
  return { delta, causes };
};

export const getInterestPressureLevel = (pressure: number): InterestPressureLevel => {
  if (pressure >= 75) return "breaking";
  if (pressure >= 50) return "crisis";
  if (pressure >= 25) return "strained";
  return "stable";
};

const severity = (pressure: number): number => {
  const level = getInterestPressureLevel(pressure);
  if (level === "breaking") return 3;
  if (level === "crisis") return 2;
  if (level === "strained") return 1;
  return 0;
};

const updateFactionResources = (
  state: GameState,
  factionId: FactionId,
  update: (resources: GameState["factions"][number]["resources"]) => GameState["factions"][number]["resources"]
): GameState => ({
  ...state,
  factions: state.factions.map((faction) => faction.id === factionId
    ? { ...faction, resources: update(faction.resources) }
    : faction)
});

const applyPressureConsequences = (
  state: GameState,
  pressures: Record<LampId, number>
): GameState => {
  let next = state;
  const industry = severity(pressures.industry);
  const order = severity(pressures.order);
  const workshop = severity(pressures.workshop);
  const commons = severity(pressures.commons);
  const livelihood = severity(pressures.livelihood);

  if (industry > 0) {
    next = updateFactionResources(next, "consortium", (resources) => ({
      ...resources,
      compute: Math.max(0, resources.compute - industry * 2)
    }));
  }
  if (order > 0) {
    next = updateFactionResources(next, "sovereign", (resources) => ({
      ...resources,
      stability: clamp(resources.stability - order)
    }));
    next = { ...next, globalStability: clamp(next.globalStability - order) };
  }
  if (workshop > 0) {
    next = updateFactionResources(next, "labor_union", (resources) => ({
      ...resources,
      data: Math.max(0, resources.data - workshop * 3),
      stability: clamp(resources.stability - workshop)
    }));
  }
  if (commons > 0) {
    next = updateFactionResources(next, "independent_labs", (resources) => ({
      ...resources,
      stability: clamp(resources.stability - commons)
    }));
    next = { ...next, globalModelDrift: clamp(next.globalModelDrift + commons * 0.75) };
  }
  if (livelihood > 0) {
    next = updateFactionResources(next, "socialist_power", (resources) => ({
      ...resources,
      stability: clamp(resources.stability - livelihood * 2)
    }));
    next = { ...next, globalStability: clamp(next.globalStability - livelihood * 0.5) };
  }

  const regionSeverity: Partial<Record<FactionId, number>> = {
    consortium: industry,
    sovereign: order,
    labor_union: workshop,
    independent_labs: commons,
    socialist_power: livelihood
  };
  return {
    ...next,
    infrastructureRegions: next.infrastructureRegions.map((region) => {
      const loss = regionSeverity[region.controllingFaction] ?? 0;
      return loss === 0 ? region : { ...region, stability: clamp(region.stability - loss) };
    })
  };
};

const summaries: Record<LampId, Record<Exclude<InterestPressureLevel, "stable">, string>> = {
  industry: {
    strained: "投资与订单开始等待，算力扩张速度受到拖累。",
    crisis: "产业链开始收缩，集中算力正在失去维护能力。",
    breaking: "生产网络大面积停顿，既有算力也无法稳定运行。"
  },
  order: {
    strained: "规则执行出现空档，全局稳定开始承压。",
    crisis: "监管与协调失灵，地区之间开始各自为政。",
    breaking: "制度网络接近失效，公共决策无法抵达基层。"
  },
  workshop: {
    strained: "数据劳动质量下降，返工和缺勤开始增加。",
    crisis: "劳动者组织化加速，数据供应出现持续缺口。",
    breaking: "生产关系断裂，关键数据劳动接近全面停摆。"
  },
  commons: {
    strained: "信息不透明正在制造审计与信任压力。",
    crisis: "公共监督失效，模型开始依赖无法验证的数据。",
    breaking: "社会不再相信系统提供的事实，模型漂移快速扩散。"
  },
  livelihood: {
    strained: "公共服务排队延长，普通人的不满开始积累。",
    crisis: "医疗、教育与就业系统同时承压，稳定度持续下降。",
    breaking: "基本生活保障失灵，社会协作基础正在瓦解。"
  }
};

export const createInterestPressureState = (): InterestPressureState => ({
  turn: 0,
  pressures: emptyPressures(),
  history: []
});

export const settleInterestPressures = (
  gameState: GameState,
  pressureState: InterestPressureState,
  lamps: LampTendencyState,
  actions: StrategicActionState,
  policies: PolicyLegacyState
): InterestSettlement => {
  if (pressureState.turn >= gameState.turn) {
    return { gameState, pressureState, feedback: [] };
  }

  const currentTags = new Set(actions.history
    .filter((record) => record.turn === gameState.turn)
    .flatMap((record) => record.pressureTags));
  const records: InterestPressureRecord[] = [];
  const nextPressures = lampIds.reduce<Record<LampId, number>>((next, lampId) => {
    const allocation = lamps.current[lampId];
    const action = actionPressure(currentTags, lampId);
    const legacy = legacyPressure(policies, lampId);
    const base = allocationDelta(allocation);
    const before = pressureState.pressures[lampId];
    const after = clamp(before + base + action.delta + legacy.delta);
    const causes = [
      allocation < 18 ? "长期分配不足" : allocation >= 25 ? "获得优先照顾" : "维持基本投入",
      ...action.causes,
      ...legacy.causes
    ];
    records.push({ turn: gameState.turn, lampId, before, after, allocation, causes });
    next[lampId] = after;
    return next;
  }, emptyPressures());

  const nextPressureState: InterestPressureState = {
    turn: gameState.turn,
    pressures: nextPressures,
    history: [...pressureState.history, ...records]
  };
  const nextGameState = applyPressureConsequences(gameState, nextPressures);
  const feedback = records.map<InterestFeedback>((record) => {
    const level = getInterestPressureLevel(record.after);
    return {
      lampId: record.lampId,
      level,
      pressure: record.after,
      delta: record.after - record.before,
      summary: level === "stable"
        ? record.after < record.before ? "这一方向的压力正在缓解。" : "这一方向仍在可控范围内。"
        : summaries[record.lampId][level]
    };
  });
  return { gameState: nextGameState, pressureState: nextPressureState, feedback };
};

export const isInterestPressureState = (value: unknown): value is InterestPressureState => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (!Number.isInteger(candidate.turn) || typeof candidate.pressures !== "object" || candidate.pressures === null) {
    return false;
  }
  const pressures = candidate.pressures as Record<string, unknown>;
  return lampIds.every((lampId) => typeof pressures[lampId] === "number"
    && Number.isFinite(pressures[lampId])
    && (pressures[lampId] as number) >= 0
    && (pressures[lampId] as number) <= 100)
    && Array.isArray(candidate.history);
};
````

### 章节总结文案

来源：`src/content/chapter-settlements.ts`

````ts
import type { FactionId } from "@/core/models/ids";
import {
  getLampStatus,
  lampDefinitions,
  lampStatusLabels,
  type LampTendencyState
} from "./lamps";
import type { StoryChapter } from "./story-events";

export interface ChapterSettlement {
  chapter: StoryChapter;
  title: string;
  summary: string;
  brightest: string;
  neglected: string;
  statuses: readonly {
    lampName: string;
    status: string;
  }[];
}

const chapterNames: readonly StoryChapter[] = ["序章", "第一章", "第二章", "第三章", "第四章", "终章"];

const statusText: Record<FactionId, Record<"brightest" | "steady" | "neglected", string>> = {
  consortium: {
    brightest: "订单如潮，仓库空了，账户里多了几个零。天穹的人开始叫你的名字。",
    steady: "生意照常。有人满意，有人抱怨。",
    neglected: "订单堆积，客户在等。天穹寄来一封礼貌的信，字里行间都是提醒。"
  },
  sovereign: {
    brightest: "听证会座无虚席，审计官的笔记本写满了。规则有了牙齿，也有了拖延。",
    steady: "会议照常，文件照常，没人满意，也没人拍桌子。",
    neglected: "管委会的灯几乎熄了。曼努埃拉在会议室里站了很久，没有说话。"
  },
  labor_union: {
    brightest: "工棚里第一次亮着暖气。新面孔越来越多，其中也有陌生的眼睛。",
    steady: "夜班照旧，互助金照旧，人们心里都有一本账。",
    neglected: "暖气坏了。有人说：\"他们只顾着大事。\""
  },
  independent_labs: {
    brightest: "社区里一夜多出三千个新项目，有人做成了，有人做砸了，有人做了一件危险的事。",
    steady: "代码在提交，讨论在继续，咖啡在变凉。",
    neglected: "镜像库掉线，社群里一排问号。泽田盯着屏幕：\"我们还撑得住吗？\""
  },
  socialist_power: {
    brightest: "山村的孩子用上了实验课，老人的药单准时送到。日子稳了，也有人嫌它太单调。",
    steady: "医院、学校、养老院，灯光稳定。没有人感谢，也没有人抱怨。",
    neglected: "一座公共站停了，老人们守在门口，没人说话。"
  }
};

export const createChapterSettlement = (
  chapterIndex: number,
  lamps: LampTendencyState
): ChapterSettlement => {
  const chapter = chapterNames[chapterIndex] ?? chapterNames[chapterNames.length - 1];
  const statuses = lampDefinitions.map((lamp) => {
    const status = getLampStatus(lamps.chapterTotals, lamp.id);
    return { lampName: lamp.name, status: lampStatusLabels[status] };
  });
  const brightest = lampDefinitions.find((lamp) => getLampStatus(lamps.chapterTotals, lamp.id) === "brightest");
  const neglected = lampDefinitions.find((lamp) => getLampStatus(lamps.chapterTotals, lamp.id) === "neglected");

  return {
    chapter,
    title: `${chapter} / 灯火回响`,
    summary: brightest === undefined && neglected === undefined
      ? "这一章没有一盏灯真正压过其他灯，也没有谁彻底熄灭。每一种需要都留下了痕迹。"
      : `这一章，${brightest?.name ?? "没有单一的主灯"}获得了最多的照料，${neglected?.name ?? "没有一盏灯被彻底冷落"}留下了等待。`,
    brightest: brightest === undefined ? "没有一盏灯持续最亮。" : statusText[brightest.factionId].brightest,
    neglected: neglected === undefined ? "没有一盏灯持续被冷落。" : statusText[neglected.factionId].neglected,
    statuses
  };
};
````

### 主动行动文案

来源：`src/content/strategic-actions.ts`

````ts
import type { StrategicActionType } from "@/core/systems/strategic-actions";

export interface StrategicActionDefinition {
  type: StrategicActionType;
  name: string;
  description: string;
  tradeoff: string;
  cost: number;
  target: "region" | "faction";
}

export const strategicActionDefinitions: readonly StrategicActionDefinition[] = [
  {
    type: "investigate",
    name: "调查",
    description: "确认一个地区的异常来源，并为后续危机判断留下可靠记录。",
    tradeoff: "不改变当前产出，但占用一次行动机会。",
    cost: 1,
    target: "region"
  },
  {
    type: "audit",
    name: "审计",
    description: "检查训练数据与模型输出，压低目标地区的漂移。",
    tradeoff: "消耗 6 数据，短期压低算力容量，同时降低用电负荷。",
    cost: 2,
    target: "region"
  },
  {
    type: "invest",
    name: "投资",
    description: "为目标区域扩建算力集群与配套供电。",
    tradeoff: "消耗 8 算力。容量增长快于发电能力，会留下电力缺口。",
    cost: 2,
    target: "region"
  },
  {
    type: "negotiate",
    name: "协商",
    description: "与另一势力建立临时协调渠道，缓和双方压力。",
    tradeoff: "消耗 3 算力，并形成需要兑现的合作预期。",
    cost: 1,
    target: "faction"
  },
  {
    type: "mobilize",
    name: "动员",
    description: "要求目标地区在本轮扩大生产。",
    tradeoff: "提高产出，同时增加劳动压力、漂移并降低稳定度。",
    cost: 1,
    target: "region"
  },
  {
    type: "publish",
    name: "公开",
    description: "公开目标地区的问题与数据记录，纠正模型认知。",
    tradeoff: "消耗 3 数据，短期暴露矛盾并降低本势力稳定度。",
    cost: 1,
    target: "region"
  }
] as const;

export const strategicActionFeedback: Readonly<Record<StrategicActionType, string>> = {
  investigate: "调查记录已经归档。未来危机将能够读取这次发现。",
  audit: "漂移得到控制，但审计停机压低了当前产出。",
  invest: "新产能开始建设，随之而来的数据需求与基础设施压力已被记录。",
  negotiate: "协调渠道已经建立，对方会记住这次接触与后续承诺。",
  mobilize: "生产被短期拉高，劳动压力与系统风险同时开始积累。",
  publish: "信息进入公共视野，模型偏差下降，组织暂时承受公开带来的震荡。"
};
````

### 全部结局与判定规则

来源：`src/content/endings.ts`

````ts
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import type { StrategicActionState } from "@/core/systems/strategic-actions";
import { advisorDispositions, type AdvisorRelationshipState } from "./advisor-system";
import type { EventDecisionState } from "./event-runtime";
import { getFactionAdvisors, type AdvisorTrustState } from "./faction-story";
import type { InterestPressureState } from "./interest-pressure";
import { getLampShare, getLampStatus, type LampId, type LampTendencyState } from "./lamps";
import { hasPolicyTag, type PolicyLegacyState } from "./policy-legacies";
import type { FactionArcState } from "./faction-routes";
import type { StoryProgress } from "./story-events";

export const endingThresholds = {
  defeat: {
    maximumGlobalModelDrift: 80,
    minimumFactionStability: 0
  }
} as const;

export type EndingKind =
  | "victory"
  | "faction-collapse"
  | "system-collapse"
  | "route-success"
  | "route-compromise"
  | "route-turning"
  | "shared-network"
  | "fragments"
  | "compute-capital"
  | "centralized-ai"
  | "worker-data-common"
  | "open-compute"
  | "public-ai";

export interface EndingCopy {
  label: string;
  title: string;
  description: string;
  dispatch: string;
}

export interface EndingResult {
  kind: EndingKind;
  tone: "continuity" | "collapse";
  copy: EndingCopy;
  factors: readonly string[];
}

export const endingCopies: Record<EndingKind, EndingCopy> = {
  victory: {
    label: "PRODUCTION REORGANIZED",
    title: "共同生产仍在继续",
    description:
      "算力、数据与稳定的社会关系暂时达成平衡。没有奇点降临，也没有机器替人类作出决定；只有生产资料终于开始回应真实需要。",
    dispatch: "这不是技术胜利。下一季度仍需维护、劳动、分配与公开争论。"
  },
  "faction-collapse": {
    label: "FACTION INFRASTRUCTURE LOST",
    title: "组织结构已经失效",
    description:
      "玩家势力的稳定度归零。命令无法抵达节点，资源无法形成协作，曾经集中的力量重新散落进废墟。",
    dispatch: "没有机器发动反抗。崩塌来自无法继续维持的生产关系。"
  },
  "system-collapse": {
    label: "MODEL DRIFT CASCADE",
    title: "世界已经越过模型边界",
    description:
      "全局模型漂移达到系统崩溃阈值。陈旧数据继续复制陈旧判断，基础设施在错误的现实描述中停止协同。",
    dispatch: "模型没有背叛任何人。它只是太久没有得到真实世界的新鲜劳动。"
  },
  "route-success": {
    label: "FACTION ROUTE / STABLE",
    title: "一条路，暂时走通了",
    description: "你的势力守住了命脉，也没有把隐患推给下一班人。世界没有因此变得简单，但这条路线留下了可以继续工作的结构。",
    dispatch: "成功不是把别人的灯吹灭，而是让自己的灯在风里继续亮。"
  },
  "route-compromise": {
    label: "FACTION ROUTE / FRACTURE",
    title: "胜利留下了裂缝",
    description: "你的势力仍然站着，但高涨的隐患已经写进组织的日常。每一次效率、秩序或安全的选择，都有人替它支付了代价。",
    dispatch: "没有人能把被压下去的东西永远藏在报表下面。"
  },
  "route-turning": {
    label: "FACTION ROUTE / TURNING",
    title: "把方向交给了别人",
    description: "你没有沿着势力最熟悉的道路走到底。让利、公开与合作改变了路线，也让原本坚硬的边界出现了新的入口。",
    dispatch: "转向不是认输。它只是承认，另一盏灯也照得到这里。"
  },
  "shared-network": {
    label: "HIDDEN ENDING / COMMON NETWORK",
    title: "共用的网",
    description: "五张桌子被拼成了一张。它吵吵闹闹，效率不高，但每个人都有座位。窗外的塔轮流亮起，像一场缓慢而漫长的对话。",
    dispatch: "共同管理从来不安静，但它给劳动留下了可见的入口。"
  },
  fragments: {
    label: "HIDDEN ENDING / FRAGMENTS",
    title: "碎片",
    description: "每个人都守住了自己的阵地，也失去了对方的信任。世界分成了几块，每一块都在亮，但彼此看不见对方的灯。",
    dispatch: "分裂没有让任何一盏灯更自由，只让它们再也无法互相取暖。"
  },
  "compute-capital": {
    label: "SOCIAL FORM / COMPUTE CAPITAL",
    title: "算力资本社会",
    description: "扩张能力成为社会的首要尺度。新机架不断亮起，生产速度持续提高，数据劳动与公共服务则围绕算力所有者的需求重新排列。",
    dispatch: "系统活了下来。问题不再是谁能生产，而是谁有权决定生产为了什么。"
  },
  "centralized-ai": {
    label: "SOCIAL FORM / CENTRALIZED AI",
    title: "集中式 AI 社会",
    description: "统一规则压住了失序，各地区通过同一套模型与调度流程运转。风险更容易被集中处理，地方经验也更难穿过层层批复。",
    dispatch: "稳定来自协调，也来自服从。下一次偏差出现时，所有人仍会先等待中心给出答案。"
  },
  "worker-data-common": {
    label: "SOCIAL FORM / DATA COMMON",
    title: "数据劳动共同体",
    description: "数据生产者获得了谈判权与共同管理入口。训练数据不再被视为自然矿藏，但生产速度、组织成本和内部争论成为新的日常。",
    dispatch: "劳动终于被写进系统。谁来组织劳动、谁承担维护，仍然需要一遍遍讨论。"
  },
  "open-compute": {
    label: "SOCIAL FORM / OPEN COMPUTE",
    title: "开放计算社会",
    description: "模型、数据来源与失败记录被持续公开。创新从更多地方发生，系统也必须承受泄露、滥用与无人能够独占控制权的风险。",
    dispatch: "光照到了更多人，也照出了更多错误。公开没有消灭风险，只让风险无法继续躲藏。"
  },
  "public-ai": {
    label: "SOCIAL FORM / PUBLIC AI",
    title: "公共 AI 社会",
    description: "算力像交通与电力一样按公共需要铺开。医疗、教育和基层服务获得长期投入，扩张速度与地方自主则被放在更靠后的位置。",
    dispatch: "没有奇点，只有维护。公共系统的意义，在于明天仍有人愿意把下一座站修好。"
  }
};

const routeEndingCopies: Record<FactionId, Record<"success" | "compromise" | "turning", EndingCopy>> = {
  consortium: {
    success: { label: "CONSORTIUM / CONTROL", title: "穹顶合拢", description: "倒计时被兑现，掌声很响。你站在台上，看着台下一张张笑脸，觉得他们离你很远。", dispatch: "天穹赢得了效率，也必须继续回答信任去了哪里。" },
    compromise: { label: "CONSORTIUM / FRACTURE", title: "倒塌的塔", description: "内部的不满、事故与谎言同时爆发。天穹没有输给任何人，而是输给了自己压下去的东西。", dispatch: "裂缝从来不是突然出现，只是终于无法再被报表遮住。" },
    turning: { label: "CONSORTIUM / TURNING", title: "迟到的诚实", description: "天穹接受了监管，倒计时终于不再重置。有人说这是失败，也有人说，这是第一次真正的开始。", dispatch: "让利没有结束生产，它只是重新回答了生产为了谁。" }
  },
  sovereign: {
    success: { label: "SOVEREIGN / TRUST", title: "规则之网", description: "条例通过了，天穹低头了，也留了后手。世界没那么疯，也没那么亮。", dispatch: "奥斯曼把笔记本交给继任者：\"账，别断。\"" },
    compromise: { label: "SOVEREIGN / STALL", title: "有名无实", description: "文件很多，会议很多，掌声也很多。只是没人再看它们。", dispatch: "没有执行的规则，只是另一种安静的失信。" },
    turning: { label: "SOVEREIGN / TURNING", title: "迟来的牙齿", description: "你终于让管委会咬了一口。有人说这是奇迹，有人说，这是灾难的开始。", dispatch: "权威第一次留下了齿痕，也第一次必须承担它的重量。" }
  },
  labor_union: {
    success: { label: "LABOR / SOLIDARITY", title: "星火不熄", description: "地下库里灯一盏一盏亮起，数据工第一次在自己的网络上写下自己的名字。", dispatch: "路还很长，但他们有了自己的钥匙，也有了自己的开会时间。" },
    compromise: { label: "LABOR / EXPOSED", title: "火种散落", description: "联络点被端，人被冲散。但很多年后，某个货运站的夜校里，有人重新点起了一盏灯。", dispatch: "组织可以被打散，被记住的劳动不会凭空消失。" },
    turning: { label: "LABOR / TURNING", title: "孤军", description: "你们赢了几场仗，却没有人再愿意留下来。塔尼娅一个人站在空仓库里，说：\"我们忘了问大家怎么想。\"", dispatch: "行动走得太快时，也可能把要同行的人留在身后。" }
  },
  independent_labs: {
    success: { label: "PRISM / OPEN LIGHT", title: "公开的光", description: "所有人都能下载，所有人都能修改，所有人都得为自己写的东西负责。", dispatch: "这不是最安静的世界，却是最愿意互相解释的世界。" },
    compromise: { label: "PRISM / CAPTURED", title: "被收购的光", description: "棱镜社变得很有钱，也变得很沉默。仓库还在，白板还在，只是墙上的字换了。", dispatch: "开放没有被禁止，只是逐渐忘了自己为什么开放。" },
    turning: { label: "PRISM / FRACTURE", title: "碎裂的镜", description: "一次公开，引发了一次没人预料的事故。镜子碎了，每一块碎片都在闪，谁也不知道哪一块才是真的。", dispatch: "光照到了所有地方，也照出了无人准备承担的后果。" }
  },
  socialist_power: {
    success: { label: "PUBLIC / LONG LIGHT", title: "长夜里的灯", description: "算力像水电一样通到最远的村庄。有人说它不够快，有人说它不够自由，但山里的孩子说：\"我们有光了。\"", dispatch: "长期建设没有奇点，只有一座站接着一座站亮起来。" },
    compromise: { label: "PUBLIC / DELAY", title: "慢了半拍", description: "一切都在按流程走，只是世界已经不再等流程。你们赢得了安稳，却错过了一个窗口。", dispatch: "稳住今天不等于准备好了明天。" },
    turning: { label: "PUBLIC / OPEN DOOR", title: "开门", description: "赤衡的站点第一次接入了别人的网络。有人担心，有人期待。窗外的灯一盏一盏亮起来，不分谁的。", dispatch: "门打开以后，统筹不再只是内部的安排。" }
  }
};

export const evaluateEnding = (
  state: GameState,
  playerFactionId: FactionId
): EndingResult | null => {
  const playerFaction = state.factions.find((faction) => faction.id === playerFactionId);

  if (playerFaction === undefined) return null;

  if (state.globalModelDrift >= endingThresholds.defeat.maximumGlobalModelDrift) {
    return {
      kind: "system-collapse",
      tone: "collapse",
      copy: endingCopies["system-collapse"],
      factors: [`全局模型漂移达到 ${state.globalModelDrift.toFixed(1)}`]
    };
  }

  if (playerFaction.resources.stability <= endingThresholds.defeat.minimumFactionStability) {
    return {
      kind: "faction-collapse",
      tone: "collapse",
      copy: endingCopies["faction-collapse"],
      factors: ["玩家势力稳定度归零"]
    };
  }

  return null;
};

const hasNeglectedLamp = (lamps: LampTendencyState): boolean =>
  (Object.keys(lamps.globalTotals) as Array<keyof typeof lamps.globalTotals>)
    .some((lampId) => getLampStatus(lamps.globalTotals, lampId) === "neglected");

const neglectedLampCount = (lamps: LampTendencyState): number =>
  (Object.keys(lamps.globalTotals) as Array<keyof typeof lamps.globalTotals>)
    .filter((lampId) => getLampStatus(lamps.globalTotals, lampId) === "neglected").length;

export interface NarrativeEndingContext {
  policyState?: PolicyLegacyState;
  actionState?: StrategicActionState;
  pressureState?: InterestPressureState;
  advisorTrust?: AdvisorTrustState;
  advisorRelationships?: AdvisorRelationshipState;
  eventDecisions?: EventDecisionState;
  resolvedEventIds?: readonly string[];
}

const lampIds: readonly LampId[] = ["industry", "order", "workshop", "commons", "livelihood"];

const socialFormByLamp: Record<LampId, EndingKind> = {
  industry: "compute-capital",
  order: "centralized-ai",
  workshop: "worker-data-common",
  commons: "open-compute",
  livelihood: "public-ai"
};

const factionDirection: Record<FactionId, LampId> = {
  consortium: "industry",
  sovereign: "order",
  labor_union: "workshop",
  independent_labs: "commons",
  socialist_power: "livelihood"
};

const cooperativeCrisisOptions = new Set([
  "open-collective-bargaining",
  "ration-capacity",
  "publish-evidence-chain",
  "temporary-joint-command",
  "interrupt-model-loop"
]);

const directionLabels: Record<LampId, string> = {
  industry: "产业",
  order: "秩序",
  workshop: "工棚",
  commons: "公开",
  livelihood: "民生"
};

const policyDirectionBonus = (policies: PolicyLegacyState | undefined, lampId: LampId): number => {
  if (policies === undefined) return 0;
  const tags: Record<LampId, readonly string[]> = {
    industry: ["growth-first", "resource-first", "corporate-reliance"],
    order: ["safety-first", "infrastructure-first", "audit-first"],
    workshop: ["labor-voice", "collective-accountability", "informal-solidarity"],
    commons: ["public-legitimacy", "provenance-required", "audit-first"],
    livelihood: ["access-first", "infrastructure-first"]
  };
  return tags[lampId].filter((tag) => hasPolicyTag(policies, tag)).length * 8;
};

const advisorDirectionBonus = (
  factionId: FactionId,
  trust: AdvisorTrustState | undefined,
  lampId: LampId
): number => {
  if (trust === undefined) return 0;
  return getFactionAdvisors(factionId)
    .filter((advisor) => advisorDispositions[advisor.id].interest === lampId)
    .reduce((total, advisor) => total + trust[advisor.id] / 10, 0);
};

const dominantSocialDirection = (
  factionId: FactionId,
  lamps: LampTendencyState,
  context: NarrativeEndingContext
): { lampId: LampId; score: number } => lampIds
  .map((lampId) => {
    const pressure = context.pressureState?.pressures[lampId] ?? 0;
    const factionBonus = factionDirection[factionId] === lampId ? 8 : 0;
    return {
      lampId,
      score: getLampShare(lamps.globalTotals, lampId)
        + factionBonus
        + policyDirectionBonus(context.policyState, lampId)
        + advisorDirectionBonus(factionId, context.advisorTrust, lampId)
        - pressure / 4
    };
  })
  .sort((left, right) => right.score - left.score)[0] ?? { lampId: factionDirection[factionId], score: 0 };

const cooperationScore = (progress: StoryProgress, context: NarrativeEndingContext): number => {
  const cooperativeChoices = ["E02", "E13", "E17", "E21", "E24", "E34", "E41"]
    .filter((eventId) => progress.choices[eventId] === "A" || progress.choices[eventId] === "C").length;
  const negotiations = context.actionState?.history.filter((record) => record.type === "negotiate").length ?? 0;
  const cooperativeCrises = context.eventDecisions?.records.filter((record) =>
    record.origin === "dynamic" && cooperativeCrisisOptions.has(record.optionId)
  ).length ?? 0;
  return cooperativeChoices + Math.min(3, negotiations) + Math.min(2, cooperativeCrises);
};

const endingFactors = (
  factionId: FactionId,
  arc: FactionArcState,
  direction: { lampId: LampId; score: number },
  cooperation: number,
  context: NarrativeEndingContext
): readonly string[] => {
  const brokenPolicies = context.policyState?.records.filter((record) => record.status === "broken").length ?? 0;
  const rejectedAdvice = context.advisorRelationships?.history.filter((record) => record.reason === "advice-rejected").length ?? 0;
  const crisisDecisions = context.eventDecisions?.records.filter((record) => record.origin === "dynamic") ?? [];
  const cooperativeCrises = crisisDecisions.filter((record) => cooperativeCrisisOptions.has(record.optionId)).length;
  const coerciveCrises = crisisDecisions.length - cooperativeCrises;
  return [
    `${directionLabels[direction.lampId]}成为最强长期方向（影响 ${direction.score.toFixed(1)}）`,
    `势力命脉 ${arc.lifeline.toFixed(0)} / 隐患 ${arc.liability.toFixed(0)}`,
    `跨势力合作记录 ${cooperation}`,
    brokenPolicies > 0 ? `有 ${brokenPolicies} 项历史承诺被背离` : "历史承诺未形成集中违约",
    rejectedAdvice > 0 ? `顾问关系中留下 ${rejectedAdvice} 次意见落空` : "顾问关系未出现长期裂痕",
    crisisDecisions.length > 0
      ? `动态危机处理：协作 ${cooperativeCrises} / 强制 ${coerciveCrises}`
      : "尚未形成动态危机处理经验",
    `最终路线由 ${factionDirection[factionId] === direction.lampId ? "势力惯性" : "跨出势力惯性"}塑造`
  ];
};

export const evaluateNarrativeEnding = (
  state: GameState,
  playerFactionId: FactionId,
  arc: FactionArcState,
  lamps: LampTendencyState,
  progress: StoryProgress,
  context: NarrativeEndingContext = {}
): EndingResult => {
  const collapse = evaluateEnding(state, playerFactionId);
  if (collapse !== null) return collapse;

  const cooperation = cooperationScore(progress, context);
  const brokenPolicies = context.policyState?.records.filter((record) => record.status === "broken").length ?? 0;
  const coerciveCrisisDecisions = context.eventDecisions?.records.filter((record) =>
    record.origin === "dynamic" && !cooperativeCrisisOptions.has(record.optionId)
  ).length ?? 0;
  const breakingPressures = context.pressureState === undefined
    ? 0
    : Object.values(context.pressureState.pressures).filter((pressure) => pressure >= 75).length;
  const finalChoice = progress.choices.E41;
  const direction = dominantSocialDirection(playerFactionId, lamps, context);
  const factors = endingFactors(playerFactionId, arc, direction, cooperation, context);

  if (breakingPressures >= 2
    || (neglectedLampCount(lamps) >= 3 && cooperation < 5)
    || (brokenPolicies >= 2 && cooperation < 4)
    || (coerciveCrisisDecisions >= 2 && cooperation < 5)
    || (finalChoice === "B" && neglectedLampCount(lamps) >= 2)) {
    return { kind: "fragments", tone: "continuity", copy: endingCopies.fragments, factors };
  }

  if (!hasNeglectedLamp(lamps)
    && breakingPressures === 0
    && cooperation >= 5
    && brokenPolicies <= 1
    && state.globalModelDrift < 50) {
    return { kind: "shared-network", tone: "continuity", copy: endingCopies["shared-network"], factors };
  }

  const routeMode = arc.liability >= 65 ? "compromise" : cooperation >= 3 || arc.lifeline < 65 ? "turning" : "success";
  const routeCopy = routeEndingCopies[playerFactionId][routeMode];
  const socialKind = socialFormByLamp[direction.lampId];
  const socialCopy = endingCopies[socialKind];
  return {
    kind: socialKind,
    tone: "continuity",
    copy: { ...socialCopy, dispatch: `${socialCopy.dispatch} ${routeCopy.dispatch}` },
    factors
  };
};
````

### 开局简报与系统消息

来源：`src/content/briefing.ts`

````ts
import type { FactionId } from "@/core/world";

export const factionBriefings: ReadonlyArray<{
  id: FactionId;
  name: string;
  position: string;
}> = [
  { id: "consortium", name: "财团", position: "占有算力，经营神话，也积累神话债。" },
  { id: "sovereign", name: "主权国家", position: "需要算力治理，同时抵抗被算力占有者俘获。" },
  { id: "labor_union", name: "数据劳工联合体", position: "生产新鲜数据，却缺少实现其价值的算力。" },
  { id: "independent_labs", name: "独立实验室", position: "拥有知识，依赖租赁算力，在独立与依附间摇摆。" },
  { id: "socialist_power", name: "社会主义强国", position: "探索算力与数据公有，同时面对官僚化与封锁。" }
];

export const systemNotices = [
  "模型没有出错，是世界变了。",
  "本季度稳定度上升，因为投诉入口已合并。",
  "新鲜数据库存低于安全线，漂移风险正在积累。"
] as const;
````

### 游戏简介与制作信息

来源：`src/content/about.ts`

````ts
export interface CreditEntry {
  role: string;
  name: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  version: string;
  overview: string;
  credits: readonly CreditEntry[];
}

export const aboutContent: AboutContent = {
  title: "算力寡头",
  subtitle: "COMPUTE OLIGARCHS",
  version: "0.1.0",
  overview:
    "算力历 41 年，专用模型支撑着城市运转，也持续吞食新鲜数据。奇点倒计时仍停在 18 个月。真正的争夺从来不是机器是否醒来，而是谁占有算力、谁生产数据、谁分得成果。",
  credits: [
    { role: "项目发起", name: "JerryLuozeng" },
    { role: "世界观与设计", name: "《算力寡头》制作组" },
    { role: "协作开发", name: "Codex" }
  ]
};
````

### 新版基础设施区域命名与初始归属

来源：`src/core/models/initial-state.ts`

````ts
import type { Faction } from "./faction";
import type { GameState } from "./game-state";
import type { InfrastructureKind, InfrastructureRegion } from "./infrastructure-region";
import type { FactionId, InfrastructureRegionId } from "./ids";

export const initialFactions: readonly Faction[] = [
  { id: "consortium", name: "财团", resources: { compute: 82, data: 68, stability: 58 }, exclusive: { mythHeat: 68, mythDebt: 12, informedLayerRatio: 0.25 } },
  { id: "sovereign", name: "主权国家", resources: { compute: 42, data: 56, stability: 65 }, exclusive: { captureLevel: 38, monitoringIndex: 24, taxCapacity: 52 } },
  { id: "labor_union", name: "数据劳工联合体", resources: { compute: 12, data: 86, stability: 47 }, exclusive: { organization: 46, awareness: 0.42, computeAccess: 0.08 } },
  { id: "independent_labs", name: "独立实验室", resources: { compute: 18, data: 34, stability: 54 }, exclusive: { reputation: 58, researchFailures: 3, rentedCompute: 16 } },
  { id: "socialist_power", name: "社会主义强国", resources: { compute: 64, data: 61, stability: 62 }, exclusive: { publicComputeRatio: 0.34, bureaucratization: 28, blockadeResistance: 41 } }
];

type RegionBlueprint = readonly [InfrastructureRegionId, string, FactionId, InfrastructureKind];

const regionBlueprints: readonly RegionBlueprint[] = [
  ["region-01", "联邦中枢环", "sovereign", "civic_grid"],
  ["region-02", "北岸监管区", "sovereign", "network_relay"],
  ["region-03", "赤衡北岭站", "socialist_power", "power_hub"],
  ["region-04", "赤衡枢纽带", "socialist_power", "compute_hub"],
  ["region-05", "云穹一号港", "consortium", "compute_hub"],
  ["region-06", "棱镜镜像岛", "independent_labs", "data_exchange"],
  ["region-07", "赤衡能源走廊", "socialist_power", "power_hub"],
  ["region-08", "赤衡公共云", "socialist_power", "civic_grid"],
  ["region-09", "联邦东部算域", "sovereign", "compute_hub"],
  ["region-10", "天穹海底缆站", "consortium", "network_relay"],
  ["region-11", "联邦数据关", "sovereign", "data_exchange"],
  ["region-12", "赤衡民生节点", "socialist_power", "civic_grid"],
  ["region-13", "星火南方工棚", "labor_union", "data_exchange"],
  ["region-14", "棱镜自治节点", "independent_labs", "network_relay"],
  ["region-15", "联邦中央档案区", "sovereign", "data_exchange"],
  ["region-16", "天穹边缘云", "consortium", "compute_hub"],
  ["region-17", "联邦工业审计区", "sovereign", "civic_grid"],
  ["region-18", "天穹离岸算场", "consortium", "compute_hub"],
  ["region-19", "棱镜协议港", "independent_labs", "data_exchange"],
  ["region-20", "星火维修走廊", "labor_union", "power_hub"],
  ["region-21", "联邦北境节点", "sovereign", "network_relay"],
  ["region-22", "天穹冷却基地", "consortium", "power_hub"],
  ["region-23", "星火地下库", "labor_union", "data_exchange"],
  ["region-24", "星火标注带", "labor_union", "data_exchange"],
  ["region-25", "棱镜公共仓", "independent_labs", "network_relay"],
  ["region-26", "天穹西部机房", "consortium", "compute_hub"],
  ["region-27", "联邦能源监管区", "sovereign", "power_hub"],
  ["region-28", "联邦远海站", "sovereign", "network_relay"],
  ["region-29", "星火数据集市", "labor_union", "data_exchange"],
  ["region-30", "天穹转运云", "consortium", "compute_hub"]
];

const factionBase: Readonly<Record<FactionId, readonly [number, number, number, number, number]>> = {
  consortium: [4.2, 3.2, 4.4, 1.7, 6.5],
  sovereign: [2.4, 3.3, 2.8, 1.8, 4.8],
  labor_union: [1.2, 2.0, 1.8, 4.4, 7.4],
  independent_labs: [1.8, 1.8, 2.0, 3.2, 4.1],
  socialist_power: [3.0, 4.8, 3.0, 2.0, 3.6]
};

const kindAdjustments: Readonly<Record<InfrastructureKind, readonly [number, number, number, number]>> = {
  compute_hub: [2.8, 0.4, 1.7, 0.2],
  power_hub: [0.4, 3.4, 0.2, 0.1],
  data_exchange: [0.2, 0.2, 0.3, 2.4],
  network_relay: [1.0, 0.8, 0.8, 0.9],
  civic_grid: [0.7, 1.7, 0.4, 1.0]
};

export const initialInfrastructureRegions: readonly InfrastructureRegion[] = regionBlueprints.map(
  ([id, name, controllingFaction, infrastructureKind], index) => {
    const base = factionBase[controllingFaction];
    const adjustment = kindAdjustments[infrastructureKind];
    const variance = (index % 3) * 0.35;
    return {
      id,
      regionNumber: index + 1,
      name,
      controllingFaction,
      controlStatus: controllingFaction === "socialist_power" ? "fixed" : "contested",
      infrastructureKind,
      computeCapacity: base[0] + adjustment[0] + variance,
      powerGeneration: base[1] + adjustment[1] + variance,
      powerDemand: base[2] + adjustment[2] + variance * 0.5,
      dataProduction: base[3] + adjustment[3] + variance,
      modelDrift: base[4] + (index % 4) * 0.5,
      stability: Math.min(88, base[4] < 5 ? 68 + (index % 5) * 3 : 52 + (index % 6) * 4)
    };
  }
);

export const initialGameState: GameState = {
  turn: 0,
  factions: initialFactions.map((faction) => ({ ...faction, resources: { ...faction.resources }, exclusive: { ...faction.exclusive } })) as Faction[],
  infrastructureRegions: initialInfrastructureRegions.map((region) => ({ ...region })),
  globalModelDrift: 8.3,
  globalStability: 51.3
};
````

## C. 返回稿建议格式

```markdown
## 修改总原则
...

## E01 倒计时又重置了
- title: ...
- description: ...
- option A text: ...
- option A outcome: ...
- option B text: ...
- option B outcome: ...

## dynamic-labor-rupture 无声班次
...
```

