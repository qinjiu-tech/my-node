const express = require("express");
const fs = require("fs");
const path = require("path");
const { getStat } = require("../../utils/file");
const router = express.Router();
const { asyncHandler, getError } = require("../resUtil");

// 文件资源目录
const fileRoot = path.resolve(__dirname, "./../../db/files");

// 引入multer
const multer = require("multer");

// 设置存储路径和文件名
const storage = multer.diskStorage({
  // 存储的路径
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../db/files"));
  },
  // 存储的文件名
  filename: function (req, file, cb) {
    // console.log(file.fieldname, file.originalname);
    cb(null, file.originalname);
  },
});

/**
 * 生成文件过滤器
 * @param {*} accepts
 * @returns
 */
function generateFileFilter(accepts = []) {
  return (req, file, cb) => {
    // 文件后缀名
    const extname = path.extname(file.originalname);
    // 可接收的文件格式
    if (accepts.length === 0 || accepts.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`your ext name of ${extname} is not support`));
    }
  };
}

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100M
  },
  fileFilter: generateFileFilter(),
});

// 文件上传
// form-data: { file: 文件 }
router.post(
  "/upload",
  upload.single("file"), // 文件上传中间件
  async (req, res, next) => {
    const url = `/api/file/download/${req.file.filename}`;
    res.send({
      code: 200,
      msg: "上传成功！",
      data: url,
    });
  }
);
// router.post(
//   "/upload",
//   multer().single("file"), // 文件上传中间件
//   async (req, res, next) => {
//     console.log("originalname", req.file.originalname);
//     try {
//       const filepath = path.resolve(fileRoot, req.file.originalname);
//       await fs.promises.writeFile(filepath, req.file.buffer);
//       res.send({
//         code: 200,
//         msg: "上传成功！",
//         data: req.file.originalname,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// 图片上传
// form-data: { file: 文件 }
router.post(
  "/uploadImg",
  multer({
    storage,
    fileFilter: generateFileFilter([".png", ".jpg", ".jpeg", ".gif"]),
  }).single("file"),
  async (req, res, next) => {
    const url = `/api/file/download/${req.file.filename}`;
    res.send({
      code: 200,
      msg: "上传成功！",
      data: url,
    });
  }
);

// 多文件上传
// form-data: { file: 文件 }
router.post(
  "/uploads",
  multer({
    storage,
  }).array("file", 10), // 限制10个文件
  async (req, res, next) => {
    const urls = req.files.map(file => `/api/file/download/${file.filename}`)
    res.send({
      code: 200,
      msg: "上传成功！",
      data: urls,
    });
  }
);

// 文件下载
router.get("/download/:filename", async (req, res, next) => {
  const filepath = path.resolve(fileRoot, req.params.filename);
  res.download(filepath, req.params.filename);

  // const stat = await getStat(filepath);
  // // 存在 && 不是目录
  // if (stat && !stat.isDirectory()) {
  //   // // 设置以附件的形式下载并保存到本地
  //   // res.setHeader("Content-Disposition", `attachment; filename="1.png"`);
  //   // // 文件类型MIME
  //   // res.setHeader("Content-Type", "image/png");
  //   // // 断点续传
  //   // res.setHeader("Accept-Ranges", `bytes`);
  //   // const rs = fs.createReadStream(filepath);
  //   // rs.pipe(res);

  //   // express语法糖
  //   res.download(filepath, req.params.filename);
  // }
  // // 不存在
  // else {
  //   res.status(404).send(getError("文件不存在！", 404));
  //   // next(new Error("文件不存在！"));
  // }
});

module.exports = router;
