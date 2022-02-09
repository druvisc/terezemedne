const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const urlSlug = require("url-slug");

const {
  UPLOADS_DIR,
  RESIZED_DIR,
  IMAGE_QUALITY,
  IMAGE_WIDTHS,
  IMAGE_ATTRIBUTES_URI,
  DEFAULT_IMAGE_WIDTH,
} = require("../constants");

const ImageAttributes = require(`.${IMAGE_ATTRIBUTES_URI}`);

// See config.yml "public_folder".
const getPublicUri = (uri) => uri.replace("./public", "");

const resize = async (imageDir, resizedDir, sizes, quality) => {
  // Purge previously re-sized images.
  const resizedImageFileNames = fs.readdirSync(resizedDir);
  for (const fileName of resizedImageFileNames) {
    fs.unlinkSync(path.join(resizedDir, fileName));
  }

  // Ignore hidden files.
  const imageFileNames = fs
    .readdirSync(imageDir)
    .filter((fileName) => fileName[0] !== ".");

  await Promise.all(
    imageFileNames.map(async (fileName) => {
      const uri = `${imageDir}/${fileName}`;
      const parsed = path.parse(uri);
      const split = parsed.name.split("/");
      const slug = urlSlug(split[split.length - 1]);

      const publicUri = getPublicUri(uri);

      const transformer = sharp(uri);
      const { width, height /*, format*/ } = await transformer.metadata();
      // !!! FORCE WEBP !!!
      const format = "webp";

      // Do not re-size existing images.
      // if (ImageAttributes[publicUri]) {
      //   return;
      // }

      if (format === "webp") {
        transformer.webp({ quality });
      } else if (format === "png") {
        transformer.png({ quality });
      } else if (format === "jpeg") {
        transformer.jpeg({ quality });
      }

      ImageAttributes[publicUri] = {
        width,
        height,

        // srcSet is currently not used (because of next/image).
        // srcSet: sizes.map(
        //   (width) => `/images/resized/${slug}-${width}${format} ${width}w`
        // ).join(", "),

        // Default to largest width.
        src: `${getPublicUri(
          resizedDir
        )}/${slug}-${DEFAULT_IMAGE_WIDTH}.${format}`,
      };

      return Promise.all(
        sizes.map((size) => {
          transformer.resize(size);

          return transformer.toFile(`${resizedDir}/${slug}-${size}.${format}`);
        })
      );
    })
  );

  return fs.writeFile(
    IMAGE_ATTRIBUTES_URI,
    JSON.stringify(ImageAttributes),
    (err) => {
      if (err) console.log({ err });
    }
  );
};

resize(UPLOADS_DIR, RESIZED_DIR, IMAGE_WIDTHS, IMAGE_QUALITY);
