<script type="text/javascript">
// 定义一些公共的属性和方法
const model_list = [
  {
    value: "transform_to_painting",
    label: "图片手绘风格转换",
    desc: "图片手绘风格转换使用了XXX方法，可以做到XXX",
    params: [
      {
        name: "depth",
        type: "int",
        range: "[0,255]",
        default: "100",
        desc: "梯度增益系数",
      },
      {
        name: "blur",
        type: "bool",
        range: "true/false",
        default: "false",
        desc: "是否进行预模糊",
      },
      {
        name: "blur_size",
        type: "int",
        range: "[3, 5, 7, 9, ...]",
        default: "3",
        desc: "模糊窗口大小",
      },
      {
        name: "blur_std",
        type: "float",
        range: "> 0",
        default: "1",
        desc: "模糊方差",
      },
      {
        name: "denoise",
        type: "bool",
        range: "true/false",
        default: "false",
        desc: "是否进行去噪",
      },
      {
        name: "denoise_size",
        type: "int",
        range: "[3, 5, 7, 9, ...]",
        default: "3",
        desc: "去噪窗口大小",
      },
    ],
  },
  {
    value: "scanning",
    label: "文档扫描",
    desc: ".",
    params: [
      {
        name: "eight",
        type: "int",
        range: "> 0",
        default: "500",
        desc: "输出图片大小",
      },
    ],
  },
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
        default: '"brute"',
        desc: "关键点匹配算法",
      },
      {
        name: "k",
        type: "int",
        range: "> 0",
        default: "3",
        desc: "knn匹配算法的k值",
      },
      {
        name: "show_lines",
        type: "int",
        range: "> 0",
        default: "30",
        desc: "最终展示的匹配图中的连接对应关键点的连线数量",
      },
    ],
  },

  {
    value: "reconstruct",
    label: "超分辨率重建",
    desc: ".",
    params: [
      {
        name: "device",
        type: "string",
        range: '"cuda", "cpu"',
        default: "自适应",
        desc: "运算设备",
      },
      {
        name: "scale",
        type: "int",
        range: "> 2",
        default: "4",
        desc: "放大倍率",
      },
      {
        name: "outscale",
        type: "float",
        range: "> 0",
        default: "0",
        desc: "输出图像和输入图像在尺寸上的倍数关系，若为0，则outscale==scale",
      },
    ],
  },
  {
    value: "stitching",
    label: "图像拼接",
    desc: ".",
    params: [
      {
        name: "feature",
        type: "string",
        range: '"akaze", "kaze", "mser", "orb", "sift"',
        default: '"sift"',
        desc: "关键点特征",
      },
      {
        name: "ratio",
        type: "float",
        range: "> 0",
        default: "0.75",
        desc: "距离抑制值",
      },
      {
        name: "reproThreshold",
        type: "float",
        range: "> 0",
        default: "0.4",
        desc: "仿射变换投影阈值",
      },
    ],
  },
  {
    value: "detect_face",
    label: "人脸检测",
    desc: ".",
    params: [
      {
        name: "method",
        type: "string",
        range: '"dnn", "haar"',
        default: '"dnn"',
        desc: "人脸检测算法",
      },
      {
        name: "threshold",
        type: "float",
        range: "> 0",
        default: "0.4",
        desc: "bbox得分阈值",
      },
      {
        name: "nms_iou",
        type: "float",
        range: "> 0",
        default: "0.5",
        desc: "非极大值抑制采用的IOU",
      },
      {
        name: "scaleFactor",
        type: "float",
        range: "> 0",
        default: "1.3",
        desc: "haar人脸检测缩放因子",
      },
      {
        name: "minNeighbors",
        type: "int",
        range: "> 0",
        default: "5",
        desc: "haar保留预选框的bbox数量",
      },
    ],
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
    value: "equalize_hist",
    label: "直方图均衡化",
    desc: ".",
    params: [
      {
        name: "local",
        type: "bool",
        range: "true/false",
        default: "false",
        desc: "是否使用局部均衡化",
      },
      {
        name: "clipLimit",
        type: "float",
        range: "> 0",
        default: "4.0",
        desc: "local==True才有效。局部均衡化裁剪阈值",
      },
      {
        name: "tileGridSize",
        type: "int",
        range: "> 0",
        default: "4",
        desc: "local==True才有效。局部均衡化裁剪阈值格窗大小",
      },
    ],
  },
  {
    value: "OSTU_split",
    label: "大津阈值法",
    desc: ".",
    params: [
      {
        name: "blur_size",
        type: "int",
        range: "[3, 5, 7, 9, ...]",
        default: "3",
        desc: "模糊窗口大小",
      },
      {
        name: "blur_std",
        type: "float",
        range: "> 0",
        default: "1",
        desc: "模糊方差",
      },
      {
        name: "reverse",
        type: "bool",
        range: "true/false",
        default: "false",
        desc: "是否对最终的二值图像进行像素反转",
      },
    ],
  },
  {
    value: "kanji_cut",
    label: "中文分词",
    desc: ".",
    params: [
      {
        name: "spliter",
        type: "string",
        range: "any",
        default: '" "',
        desc: "输出结果的分隔符",
      },
    ],
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
    params: [
      {
        name: "out_dict_str",
        type: "bool",
        range: "true/false",
        default: "true",
        desc: "true打印全部信息，否则只输出结果",
      },
    ],
  },
  {
    value: "topic_classifier",
    label: "话题分类",
    desc: "",
    params: [
      {
        name: "out_dict_str",
        type: "bool",
        range: "true/false",
        default: "true",
        desc: "true打印全部信息，否则只输出结果",
      },
    ],
  },
];
export default {
  model_list,
};
</script>