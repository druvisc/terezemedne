const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const urlSlug = require("url-slug");

const {
  PUBLIC_FOLDER,
  UPLOADS_DIR,
  RESIZED_DIR,
  IMAGE_WIDTHS,
  IMAGE_QUALITY,
  IMAGE_ATTRIBUTES_URI,
  DEFAULT_IMAGE_WIDTH,
} = require("../constants/images");

const ImageAttributes = require(`.${IMAGE_ATTRIBUTES_URI}`);

const getPublicUri = (uri) => uri.replace(PUBLIC_FOLDER, "");

const resize = async (imageDir, resizedDir, sizes, quality) => {
  // Remove previously re-sized images.
  fs.rmSync(resizedDir, { force: true, recursive: true });
  fs.mkdirSync(resizedDir);
  //

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
      const { width, height, format } = await transformer.metadata();

      // Do not re-size existing images.
      // if (ImageAttributes[publicUri]) {
      //   return;
      // }

      // Have .png and .jpeg fallbacks for Safari & IE: https://caniuse.com/webp
      if (format === "png") {
        transformer.png({ quality, progressive: true });
      } else if (format === "jpeg") {
        transformer.jpeg({ quality, progressive: true });
      }

      ImageAttributes[publicUri] = {
        width,
        height,
        format,
        srcSet: sizes
          .map(
            (width) =>
              `${getPublicUri(
                RESIZED_DIR
              )}/${slug}-${width}.${format} ${width}w`
          )
          .join(", "),
        // Default to largest width.
        src: `${getPublicUri(
          resizedDir
        )}/${slug}-${DEFAULT_IMAGE_WIDTH}.${format}`,
      };

      await Promise.all(
        sizes.map((size) => {
          transformer.resize(size);

          return transformer.toFile(`${resizedDir}/${slug}-${size}.${format}`);
        })
      );

      transformer.webp({ quality });

      await Promise.all(
        sizes.map((size) => {
          transformer.resize(size);

          return transformer.toFile(`${resizedDir}/${slug}-${size}.webp`);
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
