import fs from "fs";
import path from "path";
import markdownPdf from "markdown-pdf";
import { fileURLToPath } from "url";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const exportDocs = async (content, format = "md") => {
  const timestamp = Date.now();
  const basePath = path.join(__dirname, "..", "exports", `doc_${timestamp}`);

  if (format === "md") {
    const mdPath = basePath + ".md";
    fs.writeFileSync(mdPath, content, "utf-8");
    return mdPath;
  }

  if (format === "pdf") {
    const mdTemp = basePath + ".md";
    fs.writeFileSync(mdTemp, content, "utf-8");
    const pdfPath = basePath + ".pdf";

    await new Promise((resolve, reject) =>
      markdownPdf().from(mdTemp).to(pdfPath, (err) => (err ? reject(err) : resolve()))
    );

    return pdfPath;
  }

  if (format === "docx") {
    const docxPath = basePath + ".docx";

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Repository Documentation",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph(content),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(docxPath, buffer); // ✅ binary buffer, not plain text
    return docxPath;
  }

  throw new Error("Unsupported export format");
};
