import multer from 'multer';

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = file.originalname.split('.').pop();
    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
      cb(new Error("File type is not supported"));
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 500000,
  }
});