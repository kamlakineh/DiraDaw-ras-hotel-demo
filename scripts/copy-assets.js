const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const srcDir = path.join(projectRoot, "assets", "images");
const destDir = path.join(projectRoot, "public", "assets", "images");

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  try {
    const srcExists = fs.existsSync(srcDir);
    if (!srcExists) {
      console.error("Source images directory not found:", srcDir);
      process.exitCode = 1;
      return;
    }

    await copyDir(srcDir, destDir);
    console.log("Images copied to", destDir);
  } catch (err) {
    console.error("Error copying assets:", err);
    process.exitCode = 1;
  }
})();
