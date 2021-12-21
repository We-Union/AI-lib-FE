<script type="text/javascript">
// 定义一些公共的属性和方法
const model_list = [
  {
    value: "sift_matching",
    label: "图片匹配",
    desc: "图片匹配使用了sift特征...",
    params: [
      {
        name: "feature",
        type: "string",
        range: '"akaze", "kaze", "mser", "orb", "sift"',
        default: '"sift"',
        desc: "关键点特征",
      },
      {
        name: "match_rule",
        type: "string",
        range: '"brute", "knn"',
        default: "brute",
        desc: "关键点匹配算法",
      },
    ],
  },
  {
    value: "transform_to_painting",
    label: "图片手绘风格转换",
    desc: ".",
    params: [],
  },
  {
    value: "reconstruct",
    label: "超分辨率重建",
    desc: ".",
    params: [],
  },
  {
    value: "scanning",
    label: "文档扫描",
    desc: ".",
    params: [],
  },
  {
    value: "detect_face",
    label: "人脸检测",
    desc: ".",
    params: [],
  },
  {
    value: "equalize_hist",
    label: "直方图均衡化",
    desc: ".",
    params: [],
  },
  {
    value: "ocr_print",
    label: "打印体识别",
    desc: ".",
    params: [],
  },
  {
    value: "ocr_val",
    label: "验证码识别",
    desc: ".",
    params: [],
  },
  {
    value: "stitching",
    label: "图像拼接",
    desc: ".",
    params: [],
  },
  {
    value: "OSTU_split",
    label: "大津阈值法",
    desc: ".",
    params: [],
  },
  {
    value: "kanji_cut",
    label: "中文分词",
    desc: ".",
    params: [],
  },
  {
    value: "en2zh",
    label: "英译中",
    desc: ".",
    params: [],
  },
  {
    value: "zh2en",
    label: "中译英",
    desc: ".",
    params: [],
  },
  {
    value: "detect_mood",
    label: "情绪检测",
    desc: ".",
    params: [],
  },
  {
    value: "topic_classifier",
    label: "话题分类",
    desc: "",
    params: [],
  },
];
export default {
  model_list,
};
</script>