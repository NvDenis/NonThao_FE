import { callUploadImg } from "../services/api";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise(async (resolve, reject) => {
          const res = await callUploadImg(file, "hat");
          if (res.vcode == 0) {
            resolve({
              default:
                import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + res.data.fileUploaded,
            });
          } else {
            reject(res.message);
          }
        })
    );
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export { MyCustomUploadAdapterPlugin };
