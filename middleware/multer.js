import multer from "multer";

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    //succcess callback
    cb(null, true);
  } else {
    //failure callback
    cb(new Error("Unsupported File Format"), false);
  }
};

// const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
  fileFilter: fileFilter,
});

export default upload;
