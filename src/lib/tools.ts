'use client'
import text from "png-chunk-text";
import extract from "png-chunks-extract";
export async function convertCharacterToJson(file:any) {

    if (!file) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const imageBuffer = new Uint8Array(arrayBuffer);
      const chunks = extract(imageBuffer);
      const tEXtChunks = chunks.filter(
        (chunk: { name: string }) => chunk.name === "tEXt",
      );
      const charaChunks = tEXtChunks.map((tEXtChunk: any) => ({
        chara: text.decode(tEXtChunk),
      }));
      const charaText = charaChunks[0]?.chara?.text;
      if (charaText) {
        const decoder = new TextDecoder("utf-8");
        const base64Text = atob(charaText);
        const byteArray = new Uint8Array(base64Text.length);
        for (let i = 0; i < base64Text.length; i++) {
          byteArray[i] = base64Text.charCodeAt(i);
        }
        const characterConvertorJson = decoder.decode(byteArray);
        if (characterConvertorJson) {
         return characterConvertorJson
        }
      }
    } catch (error) {
      console.log(error)
    }

}