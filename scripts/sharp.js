const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const urlSlug = require("url-slug");

const UPLOADS = "./public/images/uploads";
const RESIZED = "./public/images/resized";
const IMAGE_ATTRIBUTES = "./public/images/attributes.json";

const WIDTHS = [768, 992, 1200, 1920, 3840];

const purgeResized = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    fs.unlinkSync(path.join(dir, file));
  }
};

const resizeDir = async (dir, destDir, sizes) => {
  // Ignore hidden files.
  const images = fs.readdirSync(dir).filter((image) => image[0] !== ".");
  const imageAttributes = {};

  await Promise.all(
    images.map(async (image) => {
      const uri = `${dir}/${image}`;
      const parsed = path.parse(uri);
      const imageNameSplit = parsed.name.split("/");
      const slugName = urlSlug(imageNameSplit[imageNameSplit.length - 1]);

      // See config.yml "public_folder".
      const publicUri = uri.replace("./public", "");

      const { width, height } = await sharp(uri).metadata();

      imageAttributes[publicUri] = {
        width,
        height,
        srcSet: WIDTHS.map(
          (width) =>
            // `/images/resized/${slugName}-${width}${parsed.ext} ${width}w`
            `/images/resized/${slugName}-${width}${parsed.ext} ${width}w`
        ).join(", "),
        src: `/images/resized/${slugName}-${WIDTHS[WIDTHS.length - 1]}${
          // parsed.ext
          parsed.ext
        }`,
      };

      return Promise.all(
        sizes.map((size) =>
          sharp(uri)
            .resize(size)
            // .toFile(`./public/images/resized/${slugName}-${size}${parsed.ext}`)
            .toFile(`./public/images/resized/${slugName}-${size}${parsed.ext}`)
        )
      );
    })
  );

  return fs.writeFile(
    IMAGE_ATTRIBUTES,
    JSON.stringify(imageAttributes),
    (err) => {
      //
    }
  );
};

const resize = async (imageDir, resizedDir, sizes, quality) => {
  await purgeResized(resizedDir);

  await resizeDir(imageDir, resizedDir, sizes, quality);
};

resize(UPLOADS, RESIZED, WIDTHS);
