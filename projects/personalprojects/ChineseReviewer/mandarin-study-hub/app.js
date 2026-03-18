const DAY = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'mandarin-study-hub-pro-v1';

const rawData = {
  L11: {
    title: "Lesson 11: 天氣",
    sets: {
      "Tomorrow's Weather Will Be Even Better!": [
        { char: "天氣", pinyin: "tiānqì", english: "weather" },
        { char: "比", pinyin: "bǐ", english: "(comparison marker); to compare" },
        { char: "下雪", pinyin: "xià xuě", english: "to snow" },
        { char: "約", pinyin: "yuē", english: "to make an appointment" },
        { char: "公園", pinyin: "gōngyuán", english: "park" },
        { char: "滑冰", pinyin: "huá bīng", english: "to ice skate" },
        { char: "會", pinyin: "huì", english: "will" },
        { char: "冷", pinyin: "lěng", english: "cold" },
        { char: "剛才", pinyin: "gāngcái", english: "just now; a moment ago" },
        { char: "網上", pinyin: "wǎngshang", english: "on the internet" },
        { char: "預報", pinyin: "yùbào", english: "to forecast" },
        { char: "更", pinyin: "gèng", english: "even more" },
        { char: "不但...而且...", pinyin: "búdàn... érqiě...", english: "not only... but also..." },
        { char: "暖和", pinyin: "nuǎnhuo", english: "warm" },
        { char: "辦", pinyin: "bàn", english: "to handle; to do" }
      ],
      "The Weather Here is Awful!": [
        { char: "那麼", pinyin: "nàme", english: "(indicating degree) so, such" },
        { char: "好玩兒", pinyin: "hǎowánr", english: "fun, amusing, interesting" },
        { char: "非常", pinyin: "fēicháng", english: "very, extremely" },
        { char: "糟糕", pinyin: "zāogāo", english: "terrible; in a mess" },
        { char: "下雨", pinyin: "xià yǔ", english: "to rain" },
        { char: "又", pinyin: "yòu", english: "again" },
        { char: "面試", pinyin: "miànshì", english: "to interview" },
        { char: "回去", pinyin: "huí qu", english: "to go back; to return" },
        { char: "冬天", pinyin: "dōngtiān", english: "winter" },
        { char: "夏天", pinyin: "xiàtiān", english: "summer" },
        { char: "熱", pinyin: "rè", english: "hot" },
        { char: "春天", pinyin: "chūntiān", english: "spring" },
        { char: "秋天", pinyin: "qiūtiān", english: "autumn; fall" },
        { char: "舒服", pinyin: "shūfu", english: "comfortable" },
        { char: "加州", pinyin: "Jiāzhōu", english: "California" }
      ]
    }
  },
  L12: {
    title: "Lesson 12: 吃飯",
    sets: {
      "Dining Out": [
        { char: "飯館兒", pinyin: "fànguǎnr", english: "restaurant" },
        { char: "好像", pinyin: "hǎoxiàng", english: "to seem; to be like" },
        { char: "位子", pinyin: "wèizi", english: "seat" },
        { char: "服務員", pinyin: "fúwùyuán", english: "waiter; attendant" },
        { char: "服務", pinyin: "fúwù", english: "to serve; service" },
        { char: "桌子", pinyin: "zhuōzi", english: "table" },
        { char: "點菜", pinyin: "diǎn cài", english: "to order food" },
        { char: "盤", pinyin: "pán", english: "plate; dish" },
        { char: "餃子", pinyin: "jiǎozi", english: "dumplings" },
        { char: "素", pinyin: "sù", english: "vegetarian; made from vegetables" },
        { char: "家常", pinyin: "jiācháng", english: "home-style" },
        { char: "豆腐", pinyin: "dòufu", english: "tofu; bean curd" },
        { char: "放", pinyin: "fàng", english: "to put; to place" },
        { char: "肉", pinyin: "ròu", english: "meat" },
        { char: "碗", pinyin: "wǎn", english: "bowl" },
        { char: "酸辣湯", pinyin: "suānlàtāng", english: "hot and sour soup" },
        { char: "酸", pinyin: "suān", english: "sour" },
        { char: "辣", pinyin: "là", english: "spicy; hot" },
        { char: "湯", pinyin: "tāng", english: "soup" },
        { char: "味精", pinyin: "wèijīng", english: "monosodium glutamate (MSG)" },
        { char: "鹽", pinyin: "yán", english: "salt" },
        { char: "小白菜", pinyin: "xiǎobáicài", english: "baby bok choy" },
        { char: "剛", pinyin: "gāng", english: "just" },
        { char: "賣完", pinyin: "mài wán", english: "to be sold out" },
        { char: "完", pinyin: "wán", english: "finished" },
        { char: "青菜", pinyin: "qīngcài", english: "green leafy vegetable" },
        { char: "冰茶", pinyin: "bīngchá", english: "iced tea" },
        { char: "冰", pinyin: "bīng", english: "ice" },
        { char: "渴", pinyin: "kě", english: "thirsty" },
        { char: "些", pinyin: "xiē", english: "(measure word for an indefinite amount); some" },
        { char: "夠", pinyin: "gòu", english: "enough" },
        { char: "餓", pinyin: "è", english: "hungry" },
        { char: "上菜", pinyin: "shàng cài", english: "to serve food" }
      ],
      "At the Dining Hall": [
        { char: "師傅", pinyin: "shīfu", english: "master worker" },
        { char: "好吃", pinyin: "hǎochī", english: "delicious" },
        { char: "糖醋魚", pinyin: "tángcùyú", english: "sweet and sour fish" },
        { char: "糖", pinyin: "táng", english: "sugar" },
        { char: "醋", pinyin: "cù", english: "vinegar" },
        { char: "甜", pinyin: "tián", english: "sweet" },
        { char: "酸", pinyin: "suān", english: "sour" },
        { char: "極", pinyin: "jí", english: "extremely" },
        { char: "紅燒", pinyin: "hóngshāo", english: "to braise in soy sauce" },
        { char: "牛肉", pinyin: "niúròu", english: "beef" },
        { char: "魚", pinyin: "yú", english: "fish" },
        { char: "涼拌", pinyin: "liángbàn", english: "(of food) cold and dressed with sauce" },
        { char: "黃瓜", pinyin: "huánggua", english: "cucumber" },
        { char: "米飯", pinyin: "mǐfàn", english: "cooked rice" },
        { char: "忘", pinyin: "wàng", english: "to forget" },
        { char: "帶", pinyin: "dài", english: "to bring; to take" },
        { char: "飯卡", pinyin: "fànkǎ", english: "meal card" },
        { char: "錯", pinyin: "cuò", english: "wrong" },
        { char: "清楚", pinyin: "qīngchu", english: "clear" },
        { char: "沒關係", pinyin: "méi guānxi", english: "it doesn't matter" },
        { char: "上海", pinyin: "Shànghǎi", english: "Shanghai" }
      ]
    }
  },
  L13: {
    title: "Lesson 13: 問路",
    sets: {
      "Where Are You Off To?": [
        { char: "上", pinyin: "shàng", english: "to go [colloq.]" },
        { char: "中心", pinyin: "zhōngxīn", english: "center" },
        { char: "聽說", pinyin: "tingshuō", english: "to be told; to hear of" },
        { char: "運動", pinyin: "yùndòng", english: "sports" },
        { char: "場", pinyin: "chǎng", english: "field" },
        { char: "旁邊", pinyin: "pángbiān", english: "side" },
        { char: "遠", pinyin: "yuǎn", english: "far" },
        { char: "離", pinyin: "lí", english: "away from" },
        { char: "近", pinyin: "jìn", english: "near" },
        { char: "活動", pinyin: "huódòng", english: "activity" },
        { char: "中間", pinyin: "zhōngjiān", english: "middle" },
        { char: "書店", pinyin: "shūdiàn", english: "bookstore" },
        { char: "地方", pinyin: "difang", english: "place" },
        { char: "裡邊", pinyin: "lǐbian", english: "inside" }
      ],
      "Going to Chinatown": [
        { char: "中國城", pinyin: "Zhōngguóchéng", english: "Chinatown" },
        { char: "城", pinyin: "chéng", english: "town; city" },
        { char: "過", pinyin: "guo", english: "(particle for past experience)" },
        { char: "地圖", pinyin: "dìtú", english: "map" },
        { char: "拿", pinyin: "ná", english: "to take; to get" },
        { char: "次", pinyin: "cì", english: "(measure word for frequency)" },
        { char: "從", pinyin: "cóng", english: "from" },
        { char: "一直", pinyin: "yìzhí", english: "straight; continuously" },
        { char: "往", pinyin: "wǎng", english: "towards" },
        { char: "南", pinyin: "nán", english: "south" },
        { char: "路口", pinyin: "lùkǒu", english: "intersection" },
        { char: "西", pinyin: "xī", english: "west" },
        { char: "拐", pinyin: "guǎi", english: "to turn" },
        { char: "哎", pinyin: "āi", english: "(exclamatory particle)" },
        { char: "東", pinyin: "dōng", english: "east" },
        { char: "北", pinyin: "běi", english: "north" },
        { char: "前", pinyin: "qián", english: "forward; ahead" },
        { char: "紅綠燈", pinyin: "hónglùdēng", english: "traffic light" },
        { char: "燈", pinyin: "dēng", english: "light" },
        { char: "右", pinyin: "yòu", english: "right" },
        { char: "左", pinyin: "zuǒ", english: "left" },
        { char: "前面", pinyin: "qiánmiàn", english: "ahead; in front of" },
        { char: "谷歌", pinyin: "Gǔgē", english: "Google" },
        { char: "日文", pinyin: "Rìwén", english: "Japanese (language)" },
        { char: "東京", pinyin: "Dōngjīng", english: "Tokyo" },
        { char: "日本", pinyin: "Rìběn", english: "Japan" }
      ]
    }
  },
  L14: {
    title: "Lesson 14: 生日晚會",
    sets: {
      "Let's Go to a Party!": [
        { char: "過", pinyin: "guò", english: "to live (a life); to celebrate; to pass" },
        { char: "舞會", pinyin: "wǔhuì", english: "dance party; ball" },
        { char: "表姐", pinyin: "biǎojiě", english: "older female cousin" },
        { char: "中學", pinyin: "zhōngxué", english: "middle school; secondary school" },
        { char: "送", pinyin: "sòng", english: "to give as a gift" },
        { char: "禮物", pinyin: "lǐwù", english: "gift; present" },
        { char: "本", pinyin: "běn", english: "(measure word for books)" },
        { char: "飲料", pinyin: "yǐnliào", english: "beverage" },
        { char: "水果", pinyin: "shuǐguǒ", english: "fruit" },
        { char: "把", pinyin: "bǎ", english: "(measure word for things with handles/handfuls)" },
        { char: "花", pinyin: "huā", english: "flower" },
        { char: "愛", pinyin: "ài", english: "to love; to like" },
        { char: "蘋果", pinyin: "píngguǒ", english: "apple" },
        { char: "梨", pinyin: "lí", english: "pear" },
        { char: "西瓜", pinyin: "xīgua", english: "watermelon" },
        { char: "住", pinyin: "zhù", english: "to live (in a certain place)" },
        { char: "重", pinyin: "zhòng", english: "heavy; serious" },
        { char: "接", pinyin: "jiē", english: "to catch; to meet; to welcome" },
        { char: "樓", pinyin: "lóu", english: "multi-story building; floor" }
      ],
      "Birthday Dash": [
        { char: "鐘頭", pinyin: "zhōngtóu", english: "hour" },
        { char: "以為", pinyin: "yǐwéi", english: "to assume erroneously" },
        { char: "聰明", pinyin: "cōngming", english: "smart; bright; clever" },
        { char: "用功", pinyin: "yònggōng", english: "hardworking; diligent; studious" },
        { char: "暑期", pinyin: "shǔqī", english: "summer term" },
        { char: "班", pinyin: "bān", english: "class" },
        { char: "長", pinyin: "zhǎng", english: "to grow; to appear" },
        { char: "可愛", pinyin: "kě'ài", english: "cute; lovable" },
        { char: "去年", pinyin: "qùnián", english: "last year" },
        { char: "屬", pinyin: "shǔ", english: "to belong to" },
        { char: "狗", pinyin: "gǒu", english: "dog" },
        { char: "臉", pinyin: "liǎn", english: "face" },
        { char: "圓", pinyin: "yuán", english: "round" },
        { char: "眼睛", pinyin: "yǎnjing", english: "eye" },
        { char: "鼻子", pinyin: "bízi", english: "nose" },
        { char: "嘴", pinyin: "zuǐ", english: "mouth" },
        { char: "像", pinyin: "xiàng", english: "to be like; to look like; to take after" },
        { char: "長大", pinyin: "zhǎng dà", english: "to grow up" },
        { char: "一定", pinyin: "yídìng", english: "certain; definite; certainly" },
        { char: "蛋糕", pinyin: "dàngāo", english: "cake" },
        { char: "最", pinyin: "zuì", english: "most; (superlative degree) -est" }
      ]
    }
  },
  L15: {
    title: "Lesson 15: 看病",
    sets: {
      "My Stomach is Killing Me!": [
        { char: "病人", pinyin: "bìngrén", english: "patient" },
        { char: "病", pinyin: "bìng", english: "illness; to get sick" },
        { char: "醫院", pinyin: "yīyuàn", english: "hospital" },
        { char: "看病", pinyin: "kàn bìng", english: "to see a doctor" },
        { char: "肚子", pinyin: "dùzi", english: "belly; abdomen; stomach" },
        { char: "疼死", pinyin: "téng sǐ", english: "really painful" },
        { char: "疼", pinyin: "téng", english: "aching" },
        { char: "死", pinyin: "sǐ", english: "to die; (extreme degree complement)" },
        { char: "夜裡", pinyin: "yè li", english: "at night" },
        { char: "好幾", pinyin: "hǎo jǐ", english: "quite a few" },
        { char: "廁所", pinyin: "cèsuǒ", english: "restroom; toilet" },
        { char: "把", pinyin: "bǎ", english: "(indicating disposition/settlement)" },
        { char: "冰箱", pinyin: "bīngxiāng", english: "refrigerator" },
        { char: "發燒", pinyin: "fā shāo", english: "to have a fever" },
        { char: "躺下", pinyin: "tǎng xia", english: "to lie down" },
        { char: "躺", pinyin: "tǎng", english: "to lie; to recline" },
        { char: "檢查", pinyin: "jiǎnchá", english: "to examine" },
        { char: "吃壞", pinyin: "chī huài", english: "to get sick because of bad food" },
        { char: "壞", pinyin: "huài", english: "bad" },
        { char: "打針", pinyin: "dǎ zhēn", english: "to get an injection" },
        { char: "針", pinyin: "zhēn", english: "needle" },
        { char: "藥", pinyin: "yào", english: "medicine" },
        { char: "片", pinyin: "piàn", english: "(measure word for tablets/slices)" },
        { char: "遍", pinyin: "biàn", english: "(measure word for complete courses of action)" },
        { char: "最好", pinyin: "zuìhǎo", english: "had better" },
        { char: "小時", pinyin: "xiǎoshí", english: "hour" },
        { char: "辦法", pinyin: "bànfǎ", english: "method; way (of doing something)" }
      ],
      "Allergies": [
        { char: "生病", pinyin: "shēng bìng", english: "to get sick" },
        { char: "感冒", pinyin: "gǎnmào", english: "to have a cold" },
        { char: "身體", pinyin: "shēntǐ", english: "body; health" },
        { char: "癢", pinyin: "yǎng", english: "itchy" },
        { char: "過敏", pinyin: "guòmǐn", english: "to be allergic to" },
        { char: "藥店", pinyin: "yàodiàn", english: "pharmacy" },
        { char: "健康", pinyin: "jiànkāng", english: "healthy; health" },
        { char: "保險", pinyin: "bǎoxiǎn", english: "insurance; secure" },
        { char: "趕快", pinyin: "gǎnkuài", english: "right away; quickly" },
        { char: "要不然", pinyin: "yàobùrán", english: "otherwise" },
        { char: "越來越", pinyin: "yuè lái yuè", english: "more and more" },
        { char: "上次", pinyin: "shàng cì", english: "last time" },
        { char: "休息", pinyin: "xiūxi", english: "to take a break; to rest" },
        { char: "懶", pinyin: "lǎn", english: "lazy" },
        { char: "再說", pinyin: "zàishuō", english: "moreover" },
        { char: "亂", pinyin: "luàn", english: "randomly; messily" }
      ]
    }
  },
  L16: {
    title: "Lesson 16: 約會",
    sets: {
      "Seeing a Movie": [
        { char: "同", pinyin: "tóng", english: "same" },
        { char: "印象", pinyin: "yìnxiàng", english: "impression" },
        { char: "成", pinyin: "chéng", english: "to become" },
        { char: "演", pinyin: "yǎn", english: "to show (a film); to perform" },
        { char: "費", pinyin: "fèi", english: "to spend; to take (effort)" },
        { char: "力氣", pinyin: "lìqi", english: "strength; effort" },
        { char: "就", pinyin: "jiù", english: "just; only (indicating a small number)" },
        { char: "倆", pinyin: "liǎ", english: "(coll.) two" },
        { char: "後天", pinyin: "hòutiān", english: "the day after tomorrow" },
        { char: "一言為定", pinyin: "yì yán wéi dìng", english: "that settles it; it's decided" }
      ],
      "Turning Down an Invitation": [
        { char: "記得", pinyin: "jìde", english: "to remember" },
        { char: "記", pinyin: "jì", english: "to record" },
        { char: "想", pinyin: "xiǎng", english: "to think" },
        { char: "想起來", pinyin: "xiǎng qi lai", english: "to remember; to recall" },
        { char: "號碼", pinyin: "hàomǎ", english: "number" },
        { char: "搬", pinyin: "bān", english: "to move" },
        { char: "打掃", pinyin: "dǎsǎo", english: "to clean up (a room/house)" },
        { char: "掃", pinyin: "sǎo", english: "to sweep" },
        { char: "整理", pinyin: "zhěnglǐ", english: "to put in order" },
        { char: "房間", pinyin: "fángjiān", english: "room" },
        { char: "旅行", pinyin: "lǚxíng", english: "to travel" },
        { char: "電", pinyin: "diàn", english: "electricity" }
      ]
    }
  },
  L17: {
    title: "Lesson 17: 租房子",
    sets: {
      "Housing Basics": [
        { char: "吵", pinyin: "chǎo", english: "to quarrel; noisy" },
        { char: "連", pinyin: "lián", english: "even" },
        { char: "做飯", pinyin: "zuò fàn", english: "to cook" },
        { char: "報紙", pinyin: "bàozhǐ", english: "newspaper" },
        { char: "廣告", pinyin: "guǎnggào", english: "advertisement" },
        { char: "附近", pinyin: "fùjìn", english: "neighborhood" },
        { char: "套", pinyin: "tào", english: "measure word for sets" },
        { char: "公寓", pinyin: "gōngyù", english: "apartment" },
        { char: "出租", pinyin: "chūzū", english: "to rent out" },
        { char: "走路", pinyin: "zǒu lù", english: "to walk" },
        { char: "分鐘", pinyin: "fēnzhōng", english: "minute" },
        { char: "臥室", pinyin: "wòshì", english: "bedroom" },
        { char: "廚房", pinyin: "chúfáng", english: "kitchen" },
        { char: "衛生間", pinyin: "wèishēngjiān", english: "bathroom" },
        { char: "客廳", pinyin: "kèting", english: "living room" },
        { char: "傢俱", pinyin: "jiājù", english: "furniture" },
        { char: "可能", pinyin: "kěnéng", english: "maybe" }
      ],
      "Furniture & Fees": [
        { char: "一房一廳", pinyin: "yì fáng yì tīng", english: "one bedroom and one living room" },
        { char: "乾淨", pinyin: "gānjìng", english: "clean" },
        { char: "沙發", pinyin: "shāfā", english: "sofa" },
        { char: "飯桌", pinyin: "fànzhuō", english: "dining table" },
        { char: "椅子", pinyin: "yǐzi", english: "chair" },
        { char: "書桌", pinyin: "shūzhuō", english: "desk" },
        { char: "書架", pinyin: "shūjià", english: "bookshelf" },
        { char: "那裡", pinyin: "nàli", english: "there" },
        { char: "安靜", pinyin: "ānjìng", english: "quiet" },
        { char: "房租", pinyin: "fángzū", english: "rent" },
        { char: "元", pinyin: "yuán", english: "Chinese currency" },
        { char: "美元", pinyin: "měiyuán", english: "U.S. currency" },
        { char: "人民幣", pinyin: "rénmínbì", english: "RMB (Chinese currency)" },
        { char: "差不多", pinyin: "chàbuduō", english: "almost; nearly" },
        { char: "費", pinyin: "fèi", english: "fee; expenses" },
        { char: "押金", pinyin: "yājīn", english: "security deposit" },
        { char: "當", pinyin: "dāng", english: "to serve as; to be" },
        { char: "還", pinyin: "huán", english: "to return (something)" },
        { char: "另外", pinyin: "lìngwài", english: "furthermore" },
        { char: "准", pinyin: "zhǔn", english: "to allow; to permit" },
        { char: "養", pinyin: "yǎng", english: "to raise (pet/child)" },
        { char: "寵物", pinyin: "chǒngwù", english: "pet" },
        { char: "興趣", pinyin: "xìngqù", english: "interest" }
      ]
    }
  },
  L18: {
    title: "Lesson 18: 運動",
    sets: {
      "Getting in Shape": [
        { char: "當然", pinyin: "dāngrán", english: "of course" },
        { char: "胖", pinyin: "pàng", english: "fat" },
        { char: "怕", pinyin: "pà", english: "to fear" },
        { char: "簡單", pinyin: "jiǎndān", english: "simple" },
        { char: "跑步", pinyin: "pǎo bù", english: "to jog" },
        { char: "跑", pinyin: "pǎo", english: "to run" },
        { char: "難受", pinyin: "nánshòu", english: "uncomfortable" },
        { char: "網球", pinyin: "wǎngqiú", english: "tennis" },
        { char: "拍", pinyin: "pāi", english: "racket" },
        { char: "籃球", pinyin: "lánqiú", english: "basketball" },
        { char: "游泳", pinyin: "yóu yǒng", english: "to swim" },
        { char: "危險", pinyin: "wēixiǎn", english: "dangerous" },
        { char: "淹死", pinyin: "yān sǐ", english: "to drown" },
        { char: "願意", pinyin: "yuànyì", english: "to be willing" }
      ],
      "Watching Football": [
        { char: "上大學", pinyin: "shàng dàxué", english: "to attend university" },
        { char: "為了", pinyin: "wèile", english: "for the sake of" },
        { char: "提高", pinyin: "tígāo", english: "to improve" },
        { char: "水平", pinyin: "shuǐpíng", english: "level; standard" },
        { char: "足球", pinyin: "zúqiú", english: "soccer; football" },
        { char: "比賽", pinyin: "bǐsài", english: "game; match" },
        { char: "國際", pinyin: "guójì", english: "international" },
        { char: "美式", pinyin: "Měishì", english: "American-style" },
        { char: "應該", pinyin: "yīnggāi", english: "should" },
        { char: "腳", pinyin: "jiǎo", english: "foot" },
        { char: "踢", pinyin: "tī", english: "to kick" },
        { char: "手", pinyin: "shǒu", english: "hand" },
        { char: "抱", pinyin: "bào", english: "to hold/carry" },
        { char: "壓", pinyin: "yā", english: "to press" },
        { char: "被", pinyin: "bèi", english: "by (passive)" },
        { char: "擔心", pinyin: "dānxīn", english: "to worry" },
        { char: "棒", pinyin: "bàng", english: "fantastic; super" },
        { char: "運動服", pinyin: "yùndòngfú", english: "sportswear" },
        { char: "半天", pinyin: "bàntiān", english: "long time" }
      ]
    }
  },
  L19: {
    title: "Lesson 19: 旅行",
    sets: {
      "Traveling to Beijing": [
        { char: "馬上", pinyin: "mǎshàng", english: "immediately; right away" },
        { char: "放假", pinyin: "fàng jià", english: "go on vacation; have time off" },
        { char: "放", pinyin: "fàng", english: "to let go; to set free" },
        { char: "假", pinyin: "jià", english: "vacation; holiday" },
        { char: "公司", pinyin: "gōngsī", english: "company" },
        { char: "實習", pinyin: "shíxí", english: "to intern" },
        { char: "打工", pinyin: "dǎ gōng", english: "to work a temporary job (part-time)" },
        { char: "計劃", pinyin: "jìhuà", english: "plan; to plan" },
        { char: "暑假", pinyin: "shǔjià", english: "summer vacation" },
        { char: "打算", pinyin: "dǎsuàn", english: "to plan; plan" },
        { char: "父母", pinyin: "fùmǔ", english: "parents; father and mother" },
        { char: "首都", pinyin: "shǒudū", english: "capital city" },
        { char: "政治", pinyin: "zhèngzhì", english: "politics" },
        { char: "文化", pinyin: "wénhuà", english: "culture" },
        { char: "名勝古蹟", pinyin: "míngshèng gǔjì", english: "famous scenic spots and historic sites" },
        { char: "有名", pinyin: "yǒumíng", english: "famous; well-known" },
        { char: "導遊", pinyin: "dǎoyóu", english: "tour guide" },
        { char: "護照", pinyin: "hùzhào", english: "passport" },
        { char: "簽證", pinyin: "qiānzhèng", english: "visa" },
        { char: "旅行社", pinyin: "lǚxíngshè", english: "travel agency" },
        { char: "訂", pinyin: "dìng", english: "to reserve; to book" },
        { char: "長城", pinyin: "Chángchéng", english: "the Great Wall" },
        { char: "香港", pinyin: "Xiānggǎng", english: "Hong Kong" },
        { char: "台北", pinyin: "Táiběi", english: "Taipei" }
      ],
      "Planning an Itinerary": [
        { char: "初", pinyin: "chū", english: "beginning" },
        { char: "單程", pinyin: "dānchéng", english: "one-way trip" },
        { char: "往返", pinyin: "wǎngfǎn", english: "make a round trip; go there and back" },
        { char: "航空", pinyin: "hángkōng", english: "aviation" },
        { char: "查", pinyin: "chá", english: "to check; to look into" },
        { char: "航班", pinyin: "hángbān", english: "scheduled flight" },
        { char: "千", pinyin: "qiān", english: "thousand" },
        { char: "直飛", pinyin: "zhí fēi", english: "fly directly" },
        { char: "打折", pinyin: "dǎ zhé", english: "to sell at a discount" },
        { char: "轉機", pinyin: "zhuǎn jī", english: "change planes" },
        { char: "靠", pinyin: "kào", english: "to lean on; to be next to" },
        { char: "窗戶", pinyin: "chuānghu", english: "window" },
        { char: "走道", pinyin: "zǒudào", english: "aisle" },
        { char: "份", pinyin: "fèn", english: "(measure word for meal orders/jobs)" },
        { char: "素餐", pinyin: "sùcān", english: "vegetarian meal" },
        { char: "旅館", pinyin: "lǚguǎn", english: "hotel" },
        { char: "租", pinyin: "zū", english: "to rent" },
        { char: "中國國際航空公司", pinyin: "Zhōngguó Guójì Hángkōng Gōngsī", english: "Air China" },
        { char: "西北航空公司", pinyin: "Xīběi Hángkōng Gōngsī", english: "Northwest Airlines" }
      ]
    }
  },
  L20: {
    title: "Lesson 20: 在機場",
    sets: {
      "Checking in at the Airport": [
        { char: "行李", pinyin: "xíngli", english: "luggage" },
        { char: "托運", pinyin: "tuōyùn", english: "to check (luggage)" },
        { char: "包", pinyin: "bāo", english: "bag; sack; bundle; package" },
        { char: "箱子", pinyin: "xiāngzi", english: "suitcase; box" },
        { char: "超重", pinyin: "chāozhòng", english: "to be overweight (of luggage)" },
        { char: "超", pinyin: "chāo", english: "to exceed; to surpass" },
        { char: "登機牌", pinyin: "dēngjīpái", english: "boarding pass" },
        { char: "牌", pinyin: "pái", english: "plate; tablet; card" },
        { char: "登機口", pinyin: "dēngjǐkǒu", english: "boarding gate" },
        { char: "口", pinyin: "kǒu", english: "opening; entrance; mouth" },
        { char: "哭", pinyin: "kū", english: "to cry; to weep" },
        { char: "地", pinyin: "de", english: "(particle to link adverbial and verb)" },
        { char: "照顧", pinyin: "zhàogu", english: "to look after; to care for" },
        { char: "起飛", pinyin: "qǐfēi", english: "(of airplanes) to take off" },
        { char: "小心", pinyin: "xiǎoxīn", english: "to be careful" },
        { char: "一路平安", pinyin: "yí lù píng'ān", english: "have a good trip; bon voyage" }
      ],
      "Arriving in Beijing": [
        { char: "歡迎", pinyin: "huānyíng", english: "to welcome" },
        { char: "瘦", pinyin: "shòu", english: "thin, slim, lean" },
        { char: "烤鴨", pinyin: "kǎoyā", english: "roast duck" },
        { char: "鴨", pinyin: "yā", english: "duck" },
        { char: "首都機場", pinyin: "Shǒudū Jīchǎng", english: "Capital Airport (Beijing)" },
        { char: "爺爺", pinyin: "yéye", english: "paternal grandfather" },
        { char: "奶奶", pinyin: "nǎinai", english: "paternal grandmother" },
        { char: "辛苦", pinyin: "xīnkǔ", english: "hard; strenuous; toilsome" }
      ]
    }
  }
};

function inferCardMetadata(card, lessonKey) {
  const english = (card.english || '').toLowerCase();
  const sentenceLike = /to\s|will|should|had better|not only|more and more|otherwise/.test(english);
  const adjectiveLike = /cold|warm|terrible|comfortable|delicious|sweet|sour|clear|quiet|simple|fat|dangerous|thirsty|hungry|itchy|healthy|clean|famous|thin|hard/.test(english);
  const lessonTopicMap = {
    L11: 'weather',
    L12: 'food',
    L13: 'directions',
    L14: 'party',
    L15: 'health',
    L16: 'dating',
    L17: 'housing',
    L18: 'sports',
    L19: 'travel',
    L20: 'airport'
  };

  return {
    partOfSpeech: card.partOfSpeech || (sentenceLike ? 'verb' : adjectiveLike ? 'adjective' : 'noun'),
    topic: card.topic || lessonTopicMap[lessonKey] || 'general',
    hsk: card.hsk || 'Custom',
    frequency: card.frequency || 3,
    radicals: card.radicals || 'Not provided',
    decomposition: card.decomposition || `Study ${card.char} by pairing its sound (${card.pinyin}) with its meaning (${card.english}).`
  };
}

const similarWordPairs = [
  {
    key: '知道 vs 認識',
    left: '知道',
    right: '認識',
    explanation: '知道 usually means “to know a fact / be aware of something.” 認識 often means “to know / be acquainted with a person, or to recognize.”',
    examples: [
      '我知道答案。→ I know the answer.',
      '我認識那位老師。→ I know that teacher.'
    ]
  },
  {
    key: '想 vs 要',
    left: '想',
    right: '要',
    explanation: '想 often expresses desire or intention softly. 要 can be stronger, meaning want / need / will.',
    examples: [
      '我想喝茶。→ I would like tea.',
      '我要一杯茶。→ I want / I’ll take a cup of tea.'
    ]
  },
  {
    key: '還是 vs 或者',
    left: '還是',
    right: '或者',
    explanation: '還是 is usually used in questions for “or.” 或者 is commonly used in statements to present alternatives.',
    examples: [
      '你喝茶還是咖啡？',
      '你可以喝茶，或者喝咖啡。'
    ]
  }
];

const studyModes = [
  { value: 'flashcards', label: 'Flashcards' },
  { value: 'multiple-choice', label: 'Multiple choice' },
  { value: 'typing', label: 'Typing-style recall (multiple choice)' },
  { value: 'listening', label: 'Listening' },
  { value: 'sentence-cloze', label: 'Sentence cloze' },
  { value: 'rapid-review', label: 'Rapid review' },
  { value: 'exam', label: 'Exam mode (hide pinyin)' },
  { value: 'audio-only', label: 'Audio only' }
];

const filters = [
  { value: 'all', label: 'All cards' },
  { value: 'starred', label: 'Starred only' },
  { value: 'incorrect', label: 'Incorrect recently' },
  { value: 'due', label: 'Due today' },
  { value: 'new', label: 'New only' }
];

const queueStrategies = [
  { value: 'due-first', label: 'Due first' },
  { value: 'hardest', label: 'Hardest first' },
  { value: 'lesson-mastery', label: 'By lesson mastery' },
  { value: 'random', label: 'Random mix' }
];

const dom = {
  lessonSelector: document.getElementById('lessonSelector'),
  setSelector: document.getElementById('setSelector'),
  studyModeSelector: document.getElementById('studyModeSelector'),
  filterSelector: document.getElementById('filterSelector'),
  queueSelector: document.getElementById('queueSelector'),
  autoPlayToggle: document.getElementById('autoPlayToggle'),
  smartRevealToggle: document.getElementById('smartRevealToggle'),
  mixOldNewToggle: document.getElementById('mixOldNewToggle'),
  timedModeToggle: document.getElementById('timedModeToggle'),
  lessonDisplay: document.getElementById('lessonDisplay'),
  sessionStatus: document.getElementById('sessionStatus'),
  cardContainer: document.getElementById('cardContainer'),
  card: document.getElementById('card'),
  frontPrompt: document.getElementById('frontPrompt'),
  frontHint: document.getElementById('frontHint'),
  backChar: document.getElementById('backChar'),
  backTags: document.getElementById('backTags'),
  backPinyin: document.getElementById('backPinyin'),
  backMeaning: document.getElementById('backMeaning'),
  backMeta: document.getElementById('backMeta'),
  exampleHan: document.getElementById('exampleHan'),
  examplePinyin: document.getElementById('examplePinyin'),
  exampleEnglish: document.getElementById('exampleEnglish'),
  newExampleButton: document.getElementById('newExampleButton'),
  reviewFeedback: document.getElementById('reviewFeedback'),
  quizPrompt: document.getElementById('quizPrompt'),
  quizOptions: document.getElementById('quizOptions'),
  checkQuizButton: document.getElementById('checkQuizButton'),
  skipQuizButton: document.getElementById('skipQuizButton'),
  quizFeedback: document.getElementById('quizFeedback'),
  statsGrid: document.getElementById('statsGrid'),
  heatmap: document.getElementById('heatmap'),
  starButton: document.getElementById('starButton'),
  speakButton: document.getElementById('speakButton'),
  repeatAudioButton: document.getElementById('repeatAudioButton'),
  notesInput: document.getElementById('notesInput'),
  saveNotesButton: document.getElementById('saveNotesButton'),
  clearNotesButton: document.getElementById('clearNotesButton'),
  recommendationsList: document.getElementById('recommendationsList'),
  writingCanvas: document.getElementById('writingCanvas'),
  clearCanvasButton: document.getElementById('clearCanvasButton'),
  toggleGuideButton: document.getElementById('toggleGuideButton'),
  strokeInfo: document.getElementById('strokeInfo'),
  compareSelector: document.getElementById('compareSelector'),
  compareContent: document.getElementById('compareContent'),
  shuffleButton: document.getElementById('shuffleButton'),
  resetProgressButton: document.getElementById('resetProgressButton'),
  showDashboardButton: document.getElementById('showDashboardButton')
};

const appState = {
  cards: flattenCards(rawData),
  queue: [],
  currentCardId: null,
  currentIndex: 0,
  selectedQuizAnswer: null,
  currentQuiz: null,
  studyMode: 'flashcards',
  filterMode: 'all',
  queueStrategy: 'due-first',
  dashboardVisible: true,
  startTime: Date.now(),
  speakingText: '',
  currentExampleSeed: 0,
  guideVisible: true,
  timedSessionStartedAt: Date.now(),
  timedElapsed: 0,
  storage: loadStorage()
};

function flattenCards(data) {
  const cards = [];
  Object.entries(data).forEach(([lessonKey, lesson]) => {
    Object.entries(lesson.sets).forEach(([setName, words]) => {
      words.forEach((item, index) => {
        cards.push({
          id: `${lessonKey}-${slugify(setName)}-${index}`,
          lessonKey,
          lessonTitle: lesson.title,
          setName,
          ...item,
          ...inferCardMetadata(item, lessonKey)
        });
      });
    });
  });
  return cards;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function loadStorage() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      cards: parsed.cards || {},
      sessions: parsed.sessions || [],
      heatmap: parsed.heatmap || {},
      compareSelection: parsed.compareSelection || similarWordPairs[0].key
    };
  } catch {
    return { cards: {}, sessions: [], heatmap: {}, compareSelection: similarWordPairs[0].key };
  }
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.storage));
}

function getCardProgress(cardId) {
  if (!appState.storage.cards[cardId]) {
    appState.storage.cards[cardId] = {
      ease: 2.5,
      interval: 0,
      streak: 0,
      lapseCount: 0,
      correctCount: 0,
      wrongCount: 0,
      starred: false,
      notes: '',
      lastReviewedAt: null,
      nextReviewAt: null,
      avgResponseMs: 0,
      totalResponseMs: 0,
      reviewCount: 0,
      mastered: false,
      recentIncorrect: false,
      difficultyScore: 0.5
    };
  }
  return appState.storage.cards[cardId];
}

function populateSelectors() {
  dom.lessonSelector.innerHTML = Object.entries(rawData)
    .map(([key, value]) => `<option value="${key}">${value.title}</option>`)
    .join('');

  dom.studyModeSelector.innerHTML = studyModes
    .map(mode => `<option value="${mode.value}">${mode.label}</option>`)
    .join('');

  dom.filterSelector.innerHTML = filters
    .map(filter => `<option value="${filter.value}">${filter.label}</option>`)
    .join('');

  dom.queueSelector.innerHTML = queueStrategies
    .map(strategy => `<option value="${strategy.value}">${strategy.label}</option>`)
    .join('');

  dom.compareSelector.innerHTML = similarWordPairs
    .map(pair => `<option value="${pair.key}">${pair.key}</option>`)
    .join('');
  dom.compareSelector.value = appState.storage.compareSelection;

  updateSetSelector();
  updateComparePanel();
}

function updateSetSelector() {
  const lessonKey = dom.lessonSelector.value || Object.keys(rawData)[0];
  const sets = Object.keys(rawData[lessonKey].sets);
  dom.setSelector.innerHTML = sets.map(setName => `<option value="${setName}">${setName}</option>`).join('');
}

function buildQueue() {
  const lessonKey = dom.lessonSelector.value;
  const setName = dom.setSelector.value;
  const lessonCards = appState.cards.filter(card => card.lessonKey === lessonKey && card.setName === setName);
  const now = Date.now();
  let pool = lessonCards.filter(card => matchesFilter(card, now));

  if (!dom.mixOldNewToggle.checked) {
    pool = pool.filter(card => card.lessonKey === lessonKey);
  }

  if (!pool.length) {
    pool = lessonCards;
  }

  appState.queue = sortQueue(pool, now);
  appState.currentIndex = 0;
  appState.currentCardId = appState.queue[0]?.id || null;
  appState.startTime = Date.now();
  appState.currentExampleSeed = 0;
  renderCurrentCard();
  renderRecommendations();
  renderStats();
}

function matchesFilter(card, now) {
  const progress = getCardProgress(card.id);
  switch (appState.filterMode) {
    case 'starred': return progress.starred;
    case 'incorrect': return progress.recentIncorrect;
    case 'due': return !progress.nextReviewAt || progress.nextReviewAt <= now;
    case 'new': return progress.reviewCount === 0;
    default: return true;
  }
}

function sortQueue(cards, now) {
  const queue = [...cards];
  switch (appState.queueStrategy) {
    case 'hardest':
      queue.sort((a, b) => getDifficultyScore(b) - getDifficultyScore(a));
      break;
    case 'lesson-mastery':
      queue.sort((a, b) => getMasteryScore(a) - getMasteryScore(b));
      break;
    case 'random':
      queue.sort(() => Math.random() - 0.5);
      break;
    case 'due-first':
    default:
      queue.sort((a, b) => getDueWeight(a, now) - getDueWeight(b, now));
      break;
  }
  return queue;
}

function getDueWeight(card, now) {
  const progress = getCardProgress(card.id);
  return progress.nextReviewAt ? progress.nextReviewAt - now : -1;
}

function getDifficultyScore(card) {
  const p = getCardProgress(card.id);
  return (p.lapseCount * 2) + (1 - Math.min(p.ease / 3.2, 1)) + (p.recentIncorrect ? 1.5 : 0);
}

function getMasteryScore(card) {
  const p = getCardProgress(card.id);
  const accuracy = p.reviewCount ? p.correctCount / p.reviewCount : 0;
  return accuracy + (p.mastered ? 1 : 0) + (p.streak / 10);
}

function currentCard() {
  return appState.queue[appState.currentIndex] || null;
}

function renderCurrentCard() {
  const card = currentCard();
  if (!card) {
    dom.frontPrompt.textContent = 'No cards found for this filter.';
    dom.frontHint.textContent = 'Try switching the filter or lesson.';
    dom.backChar.textContent = '—';
    dom.backPinyin.textContent = '';
    dom.backMeaning.textContent = '';
    dom.quizPrompt.textContent = 'No available card.';
    dom.quizOptions.innerHTML = '';
    return;
  }

  appState.currentCardId = card.id;
  const progress = getCardProgress(card.id);
  const mode = appState.studyMode;
  const revealPinyin = !(dom.smartRevealToggle.checked && ['exam', 'multiple-choice', 'typing', 'sentence-cloze'].includes(mode) && !dom.card.classList.contains('is-flipped'));

  dom.lessonDisplay.textContent = `${card.lessonTitle} • ${card.setName}`;
  dom.sessionStatus.textContent = buildSessionStatus(card, progress);
  dom.card.classList.remove('is-flipped');

  const front = buildFrontPrompt(card, mode);
  dom.frontPrompt.textContent = front.prompt;
  dom.frontHint.textContent = front.hint;

  dom.backChar.textContent = card.char;
  dom.backPinyin.textContent = revealPinyin ? card.pinyin : 'Guess before revealing';
  dom.backMeaning.textContent = card.english;
  dom.backTags.innerHTML = renderTags(card, progress).join('');
  dom.backMeta.innerHTML = buildMetaCards(card, progress).join('');
  renderExample(card);
  renderStrokeInfo(card);
  renderNotes(card);
  renderQuiz(card);
  renderStar(card);

  if (mode === 'audio-only' || mode === 'listening') {
    speakCard(card);
  }
}

function buildFrontPrompt(card, mode) {
  if (mode === 'exam') {
    return { prompt: card.char, hint: 'Exam mode: guess pinyin and meaning before flipping.' };
  }
  if (mode === 'multiple-choice' || mode === 'typing') {
    return { prompt: card.english, hint: 'Recall the Chinese, then answer below.' };
  }
  if (mode === 'listening' || mode === 'audio-only') {
    return { prompt: '🔊 Listen and identify the word', hint: 'Use the speaker and answer from audio memory.' };
  }
  if (mode === 'sentence-cloze') {
    const sentence = generateExample(card, appState.currentExampleSeed);
    return { prompt: sentence.han.replace(card.char, '____'), hint: 'Fill the missing word from context.' };
  }
  if (mode === 'rapid-review') {
    return { prompt: card.char, hint: 'Fast recall mode: answer quickly and rate honestly.' };
  }
  return { prompt: card.char, hint: 'Flip the card or use keyboard shortcuts.' };
}

function buildSessionStatus(card, progress) {
  const dueLabel = progress.nextReviewAt ? formatRelativeTime(progress.nextReviewAt) : 'new';
  return `Card ${appState.currentIndex + 1} / ${appState.queue.length} • Due ${dueLabel} • Streak ${progress.streak} • Accuracy ${getAccuracy(progress)}%`;
}

function renderTags(card, progress) {
  return [
    `<span class="tag">${card.hsk}</span>`,
    `<span class="tag">${card.partOfSpeech}</span>`,
    `<span class="tag">freq ${card.frequency}/5</span>`,
    `<span class="tag">${card.topic}</span>`,
    `<span class="tag">${progress.mastered ? 'mastered' : 'learning'}</span>`
  ];
}

function buildMetaCards(card, progress) {
  return [
    `<div class="meta-card"><div class="section-label">Lesson</div><strong>${card.lessonKey}</strong></div>`,
    `<div class="meta-card"><div class="section-label">Next review</div><strong>${progress.nextReviewAt ? new Date(progress.nextReviewAt).toLocaleDateString() : 'Today'}</strong></div>`,
    `<div class="meta-card"><div class="section-label">Lapses</div><strong>${progress.lapseCount}</strong></div>`,
    `<div class="meta-card"><div class="section-label">Avg response</div><strong>${Math.round(progress.avgResponseMs || 0)} ms</strong></div>`
  ];
}

function renderExample(card) {
  const example = generateExample(card, appState.currentExampleSeed);
  dom.exampleHan.textContent = example.han;
  dom.examplePinyin.textContent = example.pinyin;
  dom.exampleEnglish.textContent = example.english;
}

function generateExample(card, seed = 0) {
  const starters = [
    { han: `今天我想學「${card.char}」。`, pinyin: `Jīntiān wǒ xiǎng xué “${card.pinyin}”.`, english: `Today I want to learn “${card.english}.”` },
    { han: `老師說這個詞「${card.char}」很常用。`, pinyin: `Lǎoshī shuō zhège cí “${card.pinyin}” hěn chángyòng.`, english: `The teacher said this word, “${card.english},” is very common.` },
    { han: `我今天在句子裡看到了「${card.char}」。`, pinyin: `Wǒ jīntiān zài jùzi lǐ kàndào le “${card.pinyin}”.`, english: `Today I saw “${card.english}” in a sentence.` }
  ];

  const grammarTemplates = {
    noun: [
      { han: `這個${card.char}很有意思。`, pinyin: `Zhège ${card.pinyin} hěn yǒuyìsi.`, english: `This ${card.english} is interesting.` },
      { han: `我們在課本裡學過${card.char}。`, pinyin: `Wǒmen zài kèběn lǐ xué guò ${card.pinyin}.`, english: `We learned ${card.english} in the textbook.` }
    ],
    verb: [
      { han: `我想明天${card.char}一次。`, pinyin: `Wǒ xiǎng míngtiān ${card.pinyin} yí cì.`, english: `I want to ${card.english} tomorrow.` },
      { han: `他昨天沒有${card.char}，所以今天再試一次。`, pinyin: `Tā zuótiān méiyǒu ${card.pinyin}, suǒyǐ jīntiān zài shì yí cì.`, english: `He did not ${card.english} yesterday, so he will try again today.` }
    ],
    adjective: [
      { han: `今天真的很${card.char}。`, pinyin: `Jīntiān zhēnde hěn ${card.pinyin}.`, english: `Today is really ${card.english}.` },
      { han: `這個地方讓我覺得很${card.char}。`, pinyin: `Zhège dìfang ràng wǒ juéde hěn ${card.pinyin}.`, english: `This place makes me feel very ${card.english}.` }
    ],
    adverb: [
      { han: `這是我${card.char}喜歡的一課。`, pinyin: `Zhè shì wǒ ${card.pinyin} xǐhuān de yí kè.`, english: `This is the lesson I like ${card.english}.` }
    ]
  };

  const pool = [...(grammarTemplates[card.partOfSpeech] || []), ...starters];
  return pool[seed % pool.length];
}

function renderStrokeInfo(card) {
  dom.strokeInfo.innerHTML = `
    <div><strong>Character:</strong> ${card.char}</div>
    <div><strong>Radicals/components:</strong> ${card.radicals || 'N/A'}</div>
    <div><strong>Decomposition:</strong> ${card.decomposition || 'N/A'}</div>
    <div><strong>Stroke support:</strong> Use the canvas to trace the character shape while saying the pinyin aloud.</div>
  `;
}

function renderQuiz(card) {
  const mode = appState.studyMode;
  if (mode === 'flashcards') {
    dom.quizPrompt.textContent = 'Switch to a quiz mode to practice with active recall.';
    dom.quizOptions.innerHTML = '';
    dom.quizFeedback.textContent = 'Your answer accuracy and response speed will appear here.';
    appState.currentQuiz = null;
    return;
  }

  appState.currentQuiz = buildQuiz(card, mode);
  appState.selectedQuizAnswer = null;
  dom.quizPrompt.textContent = appState.currentQuiz.prompt;
  dom.quizOptions.innerHTML = appState.currentQuiz.options.map((option, index) => `
    <button type="button" class="quiz-option" data-index="${index}">${option}</button>
  `).join('');
  dom.quizFeedback.textContent = 'Choose the best answer, then check it.';
}

function buildQuiz(card, mode) {
  if (mode === 'listening' || mode === 'audio-only') {
    const distractors = pickDistractors(card, 'english');
    return {
      prompt: 'After listening, choose the correct meaning.',
      options: shuffle([card.english, ...distractors]),
      answer: card.english,
      ratingHint: 'listening comprehension'
    };
  }

  if (mode === 'sentence-cloze') {
    const example = generateExample(card, appState.currentExampleSeed);
    const distractors = pickDistractors(card, 'char');
    return {
      prompt: example.han.replace(card.char, '____'),
      options: shuffle([card.char, ...distractors]),
      answer: card.char,
      ratingHint: 'sentence cloze'
    };
  }

  if (mode === 'multiple-choice' || mode === 'typing') {
    const distractors = pickDistractors(card, 'char');
    return {
      prompt: `Which Chinese word matches “${card.english}”?`,
      options: shuffle([card.char, ...distractors]),
      answer: card.char,
      ratingHint: 'recall from English prompt'
    };
  }

  if (mode === 'exam') {
    const distractors = pickDistractors(card, 'pinyin');
    return {
      prompt: `Choose the correct pinyin for ${card.char}.`,
      options: shuffle([card.pinyin, ...distractors]),
      answer: card.pinyin,
      ratingHint: 'exam precision'
    };
  }

  if (mode === 'rapid-review') {
    const distractors = pickDistractors(card, 'english');
    return {
      prompt: `${card.char} means…`,
      options: shuffle([card.english, ...distractors]),
      answer: card.english,
      ratingHint: 'speed review'
    };
  }

  return {
    prompt: `What does ${card.char} mean?`,
    options: shuffle([card.english, ...pickDistractors(card, 'english')]),
    answer: card.english,
    ratingHint: 'general review'
  };
}

function pickDistractors(card, field) {
  return shuffle(
    appState.cards
      .filter(item => item.id !== card.id && item.topic === card.topic)
      .map(item => item[field])
  ).slice(0, 3).concat(
    shuffle(appState.cards.filter(item => item.id !== card.id).map(item => item[field])).slice(0, Math.max(0, 3 - Math.min(3, appState.cards.filter(item => item.id !== card.id && item.topic === card.topic).length)))
  ).slice(0, 3);
}

function renderStar(card) {
  const progress = getCardProgress(card.id);
  dom.starButton.textContent = progress.starred ? '★ Starred' : '☆ Star';
}

function renderNotes(card) {
  const progress = getCardProgress(card.id);
  dom.notesInput.value = progress.notes || '';
}

function renderStats() {
  const cards = appState.cards;
  const progressEntries = cards.map(card => getCardProgress(card.id));
  const today = new Date().toDateString();
  const dueToday = progressEntries.filter(p => !p.nextReviewAt || new Date(p.nextReviewAt).toDateString() === today || p.nextReviewAt < Date.now()).length;
  const mastered = progressEntries.filter(p => p.mastered).length;
  const hardest = cards
    .map(card => ({ card, score: getDifficultyScore(card) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.card.char)
    .join(', ') || '—';
  const avgResponse = average(progressEntries.map(p => p.avgResponseMs || 0));
  const streakDays = calculateStreakDays();
  const lessonAccuracy = calculateLessonAccuracy();

  dom.statsGrid.innerHTML = [
    statCard('Cards mastered', mastered),
    statCard('Due today', dueToday),
    statCard('Accuracy by lesson', lessonAccuracy),
    statCard('Hardest words', hardest),
    statCard('Avg response', `${Math.round(avgResponse)} ms`),
    statCard('Streak days', streakDays)
  ].join('');

  renderHeatmap();
}

function statCard(label, value) {
  return `<div class="stat-card"><span class="section-label">${label}</span><strong>${value}</strong></div>`;
}

function calculateLessonAccuracy() {
  const lesson = dom.lessonSelector.value;
  const lessonCards = appState.cards.filter(card => card.lessonKey === lesson);
  const total = lessonCards.reduce((sum, card) => sum + getCardProgress(card.id).reviewCount, 0);
  const correct = lessonCards.reduce((sum, card) => sum + getCardProgress(card.id).correctCount, 0);
  return total ? `${Math.round((correct / total) * 100)}%` : '—';
}

function calculateStreakDays() {
  const heatmapEntries = Object.keys(appState.storage.heatmap).sort();
  let streak = 0;
  let cursor = new Date();
  while (heatmapEntries.includes(cursor.toISOString().slice(0, 10)) && appState.storage.heatmap[cursor.toISOString().slice(0, 10)] > 0) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY);
  }
  return streak;
}

function renderHeatmap() {
  const days = [];
  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = new Date(Date.now() - offset * DAY);
    const key = date.toISOString().slice(0, 10);
    days.push(appState.storage.heatmap[key] || 0);
  }
  dom.heatmap.innerHTML = days.map(value => `<div class="heat-cell ${value ? `heat-${Math.min(value, 4)}` : ''}" title="${value} reviews"></div>`).join('');
}

function renderRecommendations() {
  const lessonCards = appState.cards.filter(card => card.lessonKey === dom.lessonSelector.value);
  const dueCards = lessonCards.filter(card => {
    const p = getCardProgress(card.id);
    return !p.nextReviewAt || p.nextReviewAt <= Date.now();
  }).length;
  const starredCards = lessonCards.filter(card => getCardProgress(card.id).starred).length;
  const weakCards = lessonCards.filter(card => getDifficultyScore(card) > 2).map(card => card.char).slice(0, 3);

  dom.recommendationsList.innerHTML = [
    `<li>${dueCards} cards are due now. Start with due-first queue for best retention.</li>`,
    `<li>${starredCards} starred cards are available for a focused cram session.</li>`,
    `<li>Weakest words right now: ${weakCards.join(', ') || 'none yet'}.</li>`,
    '<li>Use listening or audio-only mode after reviewing the flashcard once.</li>',
    '<li>Write the current character on the canvas while saying pinyin aloud to reinforce orthography.</li>'
  ].join('');
}

function flipCard() {
  if (!currentCard()) return;
  dom.card.classList.toggle('is-flipped');
  if (dom.card.classList.contains('is-flipped') && dom.autoPlayToggle.checked) {
    speakCard(currentCard());
  }
}

function moveCard(direction = 1) {
  if (!appState.queue.length) return;
  appState.currentIndex = (appState.currentIndex + direction + appState.queue.length) % appState.queue.length;
  appState.startTime = Date.now();
  appState.currentExampleSeed = 0;
  renderCurrentCard();
}

function rateCurrentCard(rating, inferredFromQuiz = false) {
  const card = currentCard();
  if (!card) return;
  const progress = getCardProgress(card.id);
  const now = Date.now();
  const responseMs = now - appState.startTime;
  const schedule = spacedRepetition(progress, rating, now);

  progress.ease = schedule.ease;
  progress.interval = schedule.interval;
  progress.nextReviewAt = schedule.nextReviewAt;
  progress.lastReviewedAt = now;
  progress.streak = schedule.streak;
  progress.lapseCount = schedule.lapseCount;
  progress.reviewCount += 1;
  progress.totalResponseMs += responseMs;
  progress.avgResponseMs = progress.totalResponseMs / progress.reviewCount;
  progress.mastered = progress.interval >= 7;
  progress.recentIncorrect = rating === 'again' || rating === 'hard';
  progress.difficultyScore = getDifficultyScore(card);

  if (rating === 'again' || rating === 'hard') {
    progress.wrongCount += 1;
  } else {
    progress.correctCount += 1;
  }

  recordSession(card, rating, responseMs, inferredFromQuiz);
  saveStorage();
  dom.reviewFeedback.textContent = `Rated “${rating}”. Next review ${formatRelativeTime(progress.nextReviewAt)}. Streak ${progress.streak}.`;
  buildQueue();
  if (appState.queue.length > 1) {
    moveCard(1);
  }
}

function spacedRepetition(progress, rating, now) {
  const easeAdjustments = { again: -0.2, hard: -0.15, good: 0.05, easy: 0.15 };
  const multipliers = { again: 0.15, hard: 0.8, good: 1.8, easy: 3.2 };
  const baseIntervals = { again: 0.04, hard: 0.5, good: 1, easy: 3 };

  const nextEase = Math.max(1.3, Math.min(3.2, (progress.ease || 2.5) + easeAdjustments[rating]));
  const currentInterval = progress.interval || 0;
  let nextInterval = currentInterval
    ? currentInterval * multipliers[rating]
    : baseIntervals[rating];

  if (rating === 'again') nextInterval = 0.04;
  if (rating === 'hard') nextInterval = Math.max(0.2, nextInterval);
  if (rating === 'good') nextInterval = Math.max(1, nextInterval);
  if (rating === 'easy') nextInterval = Math.max(4, nextInterval);

  return {
    ease: nextEase,
    interval: Number(nextInterval.toFixed(2)),
    nextReviewAt: now + nextInterval * DAY,
    streak: rating === 'again' ? 0 : (progress.streak || 0) + 1,
    lapseCount: rating === 'again' ? (progress.lapseCount || 0) + 1 : progress.lapseCount || 0
  };
}

function recordSession(card, rating, responseMs, inferredFromQuiz) {
  const key = new Date().toISOString().slice(0, 10);
  appState.storage.sessions.push({ cardId: card.id, rating, responseMs, inferredFromQuiz, at: Date.now() });
  appState.storage.heatmap[key] = Math.min(4, (appState.storage.heatmap[key] || 0) + 1);
}

function formatRelativeTime(timestamp) {
  const delta = timestamp - Date.now();
  if (delta <= 0) return 'now';
  const hours = Math.round(delta / (60 * 60 * 1000));
  if (hours < 24) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

function getAccuracy(progress) {
  return progress.reviewCount ? Math.round((progress.correctCount / progress.reviewCount) * 100) : 0;
}

function average(values) {
  const valid = values.filter(value => Number.isFinite(value) && value > 0);
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : 0;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function speakCard(card) {
  if (!('speechSynthesis' in window) || !card) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(card.char);
  utterance.lang = 'zh-TW';
  utterance.rate = 0.85;
  appState.speakingText = card.char;
  window.speechSynthesis.speak(utterance);
}

function toggleStar() {
  const card = currentCard();
  if (!card) return;
  const progress = getCardProgress(card.id);
  progress.starred = !progress.starred;
  saveStorage();
  renderStar(card);
  renderRecommendations();
}

function saveNotes() {
  const card = currentCard();
  if (!card) return;
  const progress = getCardProgress(card.id);
  progress.notes = dom.notesInput.value.trim();
  saveStorage();
  dom.reviewFeedback.textContent = 'Notes saved for this card.';
}

function clearNotes() {
  dom.notesInput.value = '';
  saveNotes();
}

function checkQuiz() {
  const card = currentCard();
  if (!card || !appState.currentQuiz) return;
  if (appState.selectedQuizAnswer === null) {
    dom.quizFeedback.textContent = 'Choose an answer first.';
    return;
  }
  const chosen = appState.currentQuiz.options[appState.selectedQuizAnswer];
  const isCorrect = chosen === appState.currentQuiz.answer;
  dom.quizFeedback.textContent = isCorrect
    ? `Correct — great ${appState.currentQuiz.ratingHint}.`
    : `Not quite. Correct answer: ${appState.currentQuiz.answer}.`;
  rateCurrentCard(isCorrect ? 'good' : 'again', true);
}

function skipQuiz() {
  dom.quizFeedback.textContent = 'Skipped. Rate honestly after flipping if needed.';
  moveCard(1);
}

function updateComparePanel() {
  const selected = similarWordPairs.find(pair => pair.key === dom.compareSelector.value) || similarWordPairs[0];
  appState.storage.compareSelection = selected.key;
  saveStorage();
  dom.compareContent.innerHTML = `
    <div><strong>${selected.left}</strong> vs <strong>${selected.right}</strong></div>
    <p>${selected.explanation}</p>
    <ul>${selected.examples.map(example => `<li>${example}</li>`).join('')}</ul>
  `;
}

function resetLessonStats() {
  const lessonKey = dom.lessonSelector.value;
  appState.cards.filter(card => card.lessonKey === lessonKey).forEach(card => {
    delete appState.storage.cards[card.id];
  });
  saveStorage();
  buildQueue();
}

function toggleDashboard() {
  appState.dashboardVisible = !appState.dashboardVisible;
  document.querySelector('.stats-panel').classList.toggle('hidden', !appState.dashboardVisible);
}

function bindEvents() {
  dom.lessonSelector.addEventListener('change', () => {
    updateSetSelector();
    buildQueue();
  });
  dom.setSelector.addEventListener('change', buildQueue);
  dom.studyModeSelector.addEventListener('change', event => {
    appState.studyMode = event.target.value;
    renderCurrentCard();
  });
  dom.filterSelector.addEventListener('change', event => {
    appState.filterMode = event.target.value;
    buildQueue();
  });
  dom.queueSelector.addEventListener('change', event => {
    appState.queueStrategy = event.target.value;
    buildQueue();
  });
  dom.cardContainer.addEventListener('click', flipCard);
  dom.newExampleButton.addEventListener('click', event => {
    event.stopPropagation();
    appState.currentExampleSeed += 1;
    renderExample(currentCard());
    renderQuiz(currentCard());
  });
  dom.speakButton.addEventListener('click', () => speakCard(currentCard()));
  dom.repeatAudioButton.addEventListener('click', () => speakCard(currentCard()));
  dom.starButton.addEventListener('click', toggleStar);
  dom.saveNotesButton.addEventListener('click', saveNotes);
  dom.clearNotesButton.addEventListener('click', clearNotes);
  dom.checkQuizButton.addEventListener('click', checkQuiz);
  dom.skipQuizButton.addEventListener('click', skipQuiz);
  dom.compareSelector.addEventListener('change', updateComparePanel);
  dom.shuffleButton.addEventListener('click', () => {
    appState.queue = shuffle(appState.queue);
    appState.currentIndex = 0;
    renderCurrentCard();
  });
  dom.resetProgressButton.addEventListener('click', resetLessonStats);
  dom.showDashboardButton.addEventListener('click', toggleDashboard);
  document.querySelectorAll('.review').forEach(button => {
    button.addEventListener('click', event => {
      rateCurrentCard(event.currentTarget.dataset.rating);
    });
  });

  dom.quizOptions.addEventListener('click', event => {
    const button = event.target.closest('.quiz-option');
    if (!button) return;
    appState.selectedQuizAnswer = Number(button.dataset.index);
    [...dom.quizOptions.querySelectorAll('.quiz-option')].forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
  });

  document.addEventListener('keydown', event => {
    if (event.key === ' ') {
      event.preventDefault();
      flipCard();
    }
    if (event.key === 'ArrowRight') moveCard(1);
    if (event.key === 'ArrowLeft') moveCard(-1);
    if (['1', '2', '3', '4'].includes(event.key)) {
      const mapping = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy' };
      rateCurrentCard(mapping[event.key]);
    }
  });

  initCanvas();
}

function initCanvas() {
  const canvas = dom.writingCanvas;
  const ctx = canvas.getContext('2d');
  let drawing = false;

  function drawGuide() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!appState.guideVisible) return;
    ctx.strokeStyle = '#d4d4d8';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function position(event) {
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    return {
      x: (point.clientX - rect.left) * (canvas.width / rect.width),
      y: (point.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(event) {
    drawing = true;
    const { x, y } = position(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function move(event) {
    if (!drawing) return;
    const { x, y } = position(event);
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stop() {
    drawing = false;
  }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', stop);
  canvas.addEventListener('touchstart', start, { passive: true });
  canvas.addEventListener('touchmove', move, { passive: true });
  window.addEventListener('touchend', stop, { passive: true });

  dom.clearCanvasButton.addEventListener('click', drawGuide);
  dom.toggleGuideButton.addEventListener('click', () => {
    appState.guideVisible = !appState.guideVisible;
    drawGuide();
  });

  drawGuide();
}

function init() {
  populateSelectors();
  dom.studyModeSelector.value = appState.studyMode;
  dom.filterSelector.value = appState.filterMode;
  dom.queueSelector.value = appState.queueStrategy;
  bindEvents();
  buildQueue();
}

init();